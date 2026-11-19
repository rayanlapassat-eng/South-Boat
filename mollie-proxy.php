<?php
/**
 * mollie-proxy.php — Pont serveur South Boat <-> API Mollie v2
 *
 * La clé API vit dans mollie-config.php (idéalement HORS public_html).
 * Voir mollie-config.example.php.
 *
 * Endpoints :
 *   GET  mollie-proxy.php?action=ping
 *        -> 200 { ok: true }  (détection du mode prod côté front, comme cal-proxy)
 *
 *   POST mollie-proxy.php?action=create
 *        body JSON : { amount, method, boatName, boatId, returnUrl, reference }
 *          amount    : montant de l'acompte en euros (nombre, ex: 90)
 *          method    : "creditcard" | "applepay" | "wero"
 *          returnUrl : URL absolue de retour sur le site après paiement
 *        -> { ok:true, paymentId, checkoutUrl, status }
 *
 *   GET  mollie-proxy.php?action=status&id=tr_xxxxx
 *        -> { ok:true, paymentId, status, paid: bool }
 *
 *   POST mollie-proxy.php?action=webhook
 *        Mollie envoie "id=tr_xxxxx". On confirme le paiement côté Mollie et on
 *        répond 200. (Source de vérité recommandée par Mollie ; ici on vérifie
 *        aussi le statut au retour du client, ce webhook sert de filet.)
 */

header("Content-Type: application/json; charset=utf-8");
header("X-Content-Type-Options: nosniff");

// ---------- Chargement de la config (hors public_html en priorité) ----------
$configCandidates = [
    __DIR__ . "/../mollie-config.php",       // une marche au-dessus de public_html
    __DIR__ . "/../../mollie-config.php",     // deux marches au-dessus
    __DIR__ . "/mollie-config.php",           // fallback (protégé par .htaccess)
];
$configLoaded = false;
foreach ($configCandidates as $path) {
    if (is_file($path)) { require $path; $configLoaded = true; break; }
}
if (!$configLoaded || !defined("MOLLIE_API_KEY")) {
    http_response_code(500);
    echo json_encode(["error" => "Configuration manquante : créez mollie-config.php (voir mollie-config.example.php)"]);
    exit;
}

$action = isset($_GET["action"]) ? $_GET["action"] : "";
$method = $_SERVER["REQUEST_METHOD"];

// ---------- Ping (détection mode prod côté front) ----------
if ($action === "ping") {
    echo json_encode(["ok" => true]);
    exit;
}

// ---------- Helper cURL vers l'API Mollie ----------
function mollie_request($httpMethod, $path, $body = null) {
    $ch = curl_init("https://api.mollie.com/v2" . $path);
    $headers = [
        "Authorization: Bearer " . MOLLIE_API_KEY,
        "Content-Type: application/json",
    ];
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST  => $httpMethod,
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_TIMEOUT        => 20,
    ]);
    if ($body !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    }
    $resp = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($resp === false) {
        $err = curl_error($ch);
        curl_close($ch);
        return [502, ["error" => "Mollie injoignable : " . $err]];
    }
    curl_close($ch);
    $decoded = json_decode($resp, true);
    return [$code ?: 502, is_array($decoded) ? $decoded : ["raw" => $resp]];
}

// URL absolue de CE fichier (pour construire le webhookUrl automatiquement).
function self_base_url() {
    $https = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off")
        || (isset($_SERVER["HTTP_X_FORWARDED_PROTO"]) && $_SERVER["HTTP_X_FORWARDED_PROTO"] === "https");
    $scheme = $https ? "https" : "http";
    $host = isset($_SERVER["HTTP_HOST"]) ? $_SERVER["HTTP_HOST"] : "";
    $dir  = rtrim(str_replace("\\", "/", dirname($_SERVER["SCRIPT_NAME"])), "/");
    return $scheme . "://" . $host . $dir;
}

// ---------- /create : création d'un paiement ----------
if ($action === "create" && $method === "POST") {
    $raw = file_get_contents("php://input");
    $input = json_decode($raw, true);
    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["error" => "JSON invalide"]);
        exit;
    }

    $amount    = isset($input["amount"]) ? (float) $input["amount"] : 0;
    $payMethod = isset($input["method"]) ? $input["method"] : "";
    $returnUrl = isset($input["returnUrl"]) ? trim($input["returnUrl"]) : "";
    $boatName  = isset($input["boatName"]) ? $input["boatName"] : "";
    $reference = isset($input["reference"]) ? $input["reference"] : "";

    // Méthodes autorisées (celles validées par Mollie pour ce compte).
    $allowedMethods = ["creditcard", "applepay", "wero"];
    if (!in_array($payMethod, $allowedMethods, true)) {
        http_response_code(400);
        echo json_encode(["error" => "Moyen de paiement non autorisé : " . $payMethod]);
        exit;
    }

    // Garde-fou montant.
    $min = defined("MOLLIE_MIN_AMOUNT") ? MOLLIE_MIN_AMOUNT : 1;
    $max = defined("MOLLIE_MAX_AMOUNT") ? MOLLIE_MAX_AMOUNT : 10000;
    if ($amount < $min || $amount > $max) {
        http_response_code(400);
        echo json_encode(["error" => "Montant hors limites (" . $min . "–" . $max . " €)"]);
        exit;
    }

    // returnUrl doit être une URL http(s) absolue.
    if (!preg_match('#^https?://#i', $returnUrl)) {
        http_response_code(400);
        echo json_encode(["error" => "returnUrl invalide"]);
        exit;
    }

    $webhookUrl = self_base_url() . "/mollie-proxy.php?action=webhook";
    // Mollie refuse un webhook en localhost : on ne l'envoie que si l'hôte est public.
    $host = isset($_SERVER["HTTP_HOST"]) ? $_SERVER["HTTP_HOST"] : "";
    $isLocal = preg_match('/(localhost|127\.0\.0\.1|::1)/i', $host);

    $description = "South Boat - acompte" . ($boatName !== "" ? " " . $boatName : "");
    if ($reference !== "") { $description .= " (" . $reference . ")"; }
    // Mollie limite la description ; on tronque par prudence.
    $description = mb_substr($description, 0, 100);

    $body = [
        "amount"      => ["currency" => "EUR", "value" => number_format($amount, 2, ".", "")],
        "description" => $description,
        "redirectUrl" => $returnUrl,
        "method"      => $payMethod,
        "metadata"    => ["boat" => (string) $boatName, "reference" => (string) $reference],
    ];
    if (!$isLocal) { $body["webhookUrl"] = $webhookUrl; }

    list($code, $data) = mollie_request("POST", "/payments", $body);
    if ($code < 200 || $code >= 300) {
        http_response_code($code);
        $msg = isset($data["detail"]) ? $data["detail"] : (isset($data["error"]) ? $data["error"] : "Erreur Mollie");
        echo json_encode(["error" => $msg, "status" => $code]);
        exit;
    }

    $checkout = isset($data["_links"]["checkout"]["href"]) ? $data["_links"]["checkout"]["href"] : "";
    echo json_encode([
        "ok"          => true,
        "paymentId"   => isset($data["id"]) ? $data["id"] : "",
        "checkoutUrl" => $checkout,
        "status"      => isset($data["status"]) ? $data["status"] : "",
    ]);
    exit;
}

// ---------- /status : lecture du statut d'un paiement ----------
if ($action === "status" && $method === "GET") {
    $id = isset($_GET["id"]) ? $_GET["id"] : "";
    if ($id === "" || !preg_match('/^tr_[A-Za-z0-9]+$/', $id)) {
        http_response_code(400);
        echo json_encode(["error" => "Identifiant de paiement invalide"]);
        exit;
    }
    list($code, $data) = mollie_request("GET", "/payments/" . rawurlencode($id));
    if ($code < 200 || $code >= 300) {
        http_response_code($code);
        echo json_encode(["error" => "Paiement introuvable", "status" => $code]);
        exit;
    }
    $status = isset($data["status"]) ? $data["status"] : "";
    echo json_encode([
        "ok"        => true,
        "paymentId" => $id,
        "status"    => $status,
        "paid"      => ($status === "paid"),
    ]);
    exit;
}

// ---------- /webhook : notification serveur-à-serveur de Mollie ----------
if ($action === "webhook" && $method === "POST") {
    $id = isset($_POST["id"]) ? $_POST["id"] : "";
    if ($id !== "" && preg_match('/^tr_[A-Za-z0-9]+$/', $id)) {
        // On relit le paiement pour confirmer (bonne pratique Mollie).
        mollie_request("GET", "/payments/" . rawurlencode($id));
    }
    // Toujours 200 pour que Mollie n'insiste pas.
    echo json_encode(["ok" => true]);
    exit;
}

http_response_code(404);
echo json_encode(["error" => "Action inconnue"]);
