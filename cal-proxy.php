<?php
/**
 * cal-proxy.php — Pont serveur South Boat ↔ Cal.com API v2
 *
 * Endpoints :
 *   GET  cal-proxy.php?action=ping
 *        → 200 { ok: true } (utilisé par cal-api.js pour détecter le mode prod)
 *
 *   GET  cal-proxy.php?action=slots&event=<key>&from=<ISO>&to=<ISO>
 *        → JSON brut Cal.com : { data: { 'YYYY-MM-DD': [{ time: 'ISO' }, ...] } }
 *
 *   POST cal-proxy.php?action=book
 *        body JSON : { event, start, name, email, phone, metadata }
 *        → JSON brut Cal.com (réservation créée)
 *
 * <key> : "halfday-am" | "halfday-pm" | "fullday"
 *
 * La clé API et les IDs d'event types vivent dans cal-config.php, placé
 * idéalement HORS du dossier public_html. Voir cal-config.example.php.
 */

header("Content-Type: application/json; charset=utf-8");
header("X-Content-Type-Options: nosniff");

// ---------- Chargement de la config (hors public_html en priorité) ----------
$configCandidates = [
    __DIR__ . "/../cal-config.php",          // une marche au-dessus de public_html
    __DIR__ . "/../../cal-config.php",       // deux marches au-dessus
    __DIR__ . "/cal-config.php",             // fallback (à éviter en prod)
];
$configLoaded = false;
foreach ($configCandidates as $path) {
    if (is_file($path)) { require $path; $configLoaded = true; break; }
}
if (!$configLoaded) {
    http_response_code(500);
    echo json_encode(["error" => "Configuration manquante : créez cal-config.php (voir cal-config.example.php)"]);
    exit;
}

if (!defined("CAL_API_KEY") || !isset($EVENT_TYPE_IDS) || !is_array($EVENT_TYPE_IDS)) {
    http_response_code(500);
    echo json_encode(["error" => "Configuration invalide : CAL_API_KEY ou EVENT_TYPE_IDS manquants"]);
    exit;
}

$action = isset($_GET["action"]) ? $_GET["action"] : "";
$method = $_SERVER["REQUEST_METHOD"];

// ---------- Ping (détection mode prod côté front) ----------
if ($action === "ping") {
    echo json_encode(["ok" => true]);
    exit;
}

// ---------- Normalisation téléphone → format international E.164 ----------
// Cal.com exige un numéro au format international (+33...) ; un « 06... » brut
// serait rejeté (invalid_number) et bloquerait la réservation.
function normalize_phone($raw) {
    $p = preg_replace('/[\s.\-()]/', '', (string) $raw);
    if ($p === "") return "";
    if (strpos($p, "00") === 0) { $p = "+" . substr($p, 2); }        // 0033... → +33...
    if (isset($p[0]) && $p[0] === "+") {
        return "+" . preg_replace('/\D/', "", substr($p, 1));         // garde + et chiffres
    }
    if (preg_match('/^0\d{9}$/', $p)) { return "+33" . substr($p, 1); } // FR 10 chiffres
    return $p;                                                        // au mieux : tel quel
}

// ---------- Helper cURL ----------
function cal_request($method, $path, $body = null, $apiVersion = "2024-09-04") {
    $ch = curl_init("https://api.cal.eu/v2" . $path);
    $headers = [
        "Authorization: Bearer " . CAL_API_KEY,
        "Content-Type: application/json",
        "cal-api-version: " . $apiVersion,
    ];
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST  => $method,
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_TIMEOUT        => 15,
    ]);
    if ($body !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    }
    $resp = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($resp === false) {
        $err = curl_error($ch);
        curl_close($ch);
        return [502, json_encode(["error" => "Cal.com unreachable: " . $err])];
    }
    curl_close($ch);
    return [$code ?: 502, $resp];
}

// ---------- /slots ----------
if ($action === "slots" && $method === "GET") {
    $key  = isset($_GET["event"]) ? $_GET["event"] : "";
    $from = isset($_GET["from"])  ? $_GET["from"]  : "";
    $to   = isset($_GET["to"])    ? $_GET["to"]    : "";

    if (!isset($EVENT_TYPE_IDS[$key]) || $from === "" || $to === "") {
        http_response_code(400);
        echo json_encode(["error" => "Paramètres invalides"]);
        exit;
    }
    $q = http_build_query([
        "eventTypeId" => $EVENT_TYPE_IDS[$key],
        "start"       => $from,
        "end"         => $to,
        "timeZone"    => "Europe/Paris",
    ]);
    list($code, $resp) = cal_request("GET", "/slots?" . $q);
    http_response_code($code);
    echo $resp;
    exit;
}

// ---------- /book ----------
if ($action === "book" && $method === "POST") {
    $raw = file_get_contents("php://input");
    $input = json_decode($raw, true);
    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["error" => "JSON invalide"]);
        exit;
    }
    $key = isset($input["event"]) ? $input["event"] : "";
    if (!isset($EVENT_TYPE_IDS[$key])) {
        http_response_code(400);
        echo json_encode(["error" => "Event type inconnu"]);
        exit;
    }
    if (empty($input["start"]) || empty($input["email"]) || empty($input["name"])) {
        http_response_code(400);
        echo json_encode(["error" => "Champs requis manquants (start, email, name)"]);
        exit;
    }

    // Cal.com v2 exige des métadonnées dont TOUTES les valeurs sont des chaînes.
    // On stringifie donc chaque valeur (les nombres comme boatId/adults échoueraient sinon).
    $metadata = new stdClass();
    if (isset($input["metadata"]) && is_array($input["metadata"]) && count($input["metadata"]) > 0) {
        $metadata = [];
        foreach ($input["metadata"] as $k => $v) {
            if (is_bool($v))        { $metadata[$k] = $v ? "true" : "false"; }
            elseif (is_scalar($v))  { $metadata[$k] = (string) $v; }
            else                    { $metadata[$k] = json_encode($v); }
        }
    }

    $body = [
        "eventTypeId" => $EVENT_TYPE_IDS[$key],
        "start"       => $input["start"], // ISO 8601 UTC
        "attendee"    => [
            "name"        => $input["name"],
            "email"       => $input["email"],
            "timeZone"    => "Europe/Paris",
            "language"    => "fr",
            "phoneNumber" => normalize_phone(isset($input["phone"]) ? $input["phone"] : ""),
        ],
        "metadata"    => $metadata,
    ];
    list($code, $resp) = cal_request("POST", "/bookings", $body, "2024-08-13");
    http_response_code($code);
    echo $resp;
    exit;
}

http_response_code(404);
echo json_encode(["error" => "Action inconnue"]);
