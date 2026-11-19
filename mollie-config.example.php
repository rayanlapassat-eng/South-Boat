<?php
/**
 * mollie-config.example.php
 *
 * Copier ce fichier sous le nom "mollie-config.php" et y coller la clé API Mollie.
 * IDÉALEMENT UNE MARCHE AU-DESSUS de public_html (ex: /home/user/mollie-config.php)
 * pour qu'elle ne soit jamais accessible en HTTP.
 *
 * Si l'hébergeur l'interdit, placer le fichier à côté de mollie-proxy.php ET
 * bloquer son accès via .htaccess (bloc <Files> déjà présent dans .htaccess).
 *
 * Clé API : dashboard Mollie → Développeurs → Jetons d'accès API → Clé API standard.
 *   - test_...  = mode test (aucun vrai paiement) — pour valider l'intégration
 *   - live_...  = mode réel (vrais paiements) — à mettre UNIQUEMENT une fois testé
 */

// Clé API Mollie (test_... pendant les essais, live_... en production)
define("MOLLIE_API_KEY", "test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

// Garde-fou : bornes du montant d'acompte accepté (en euros) pour refuser
// toute valeur aberrante envoyée au serveur. Ajuster si besoin.
define("MOLLIE_MIN_AMOUNT", 1);      // minimum 1 €
define("MOLLIE_MAX_AMOUNT", 10000);  // maximum 10 000 €
