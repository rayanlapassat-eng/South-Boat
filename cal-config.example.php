<?php
/**
 * cal-config.example.php
 *
 * Copier ce fichier sous le nom "cal-config.php" et le placer
 * IDÉALEMENT UNE MARCHE AU-DESSUS de public_html (ex: /home/user/cal-config.php)
 * pour qu'il ne soit jamais accessible en HTTP.
 *
 * Si l'hébergeur l'interdit, placer le fichier à côté de cal-proxy.php
 * et bloquer son accès via .htaccess (voir bloc en bas).
 */

// Clé API Cal.com (Settings → Developer → API Keys)
define("CAL_API_KEY", "cal_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXX");

// IDs NUMÉRIQUES des event types Cal.com.
// Récupération : Cal.com → Event Types → ouvrir l'event → l'ID est dans l'URL
// (ex: https://app.cal.com/event-types/123456 → 123456).
$EVENT_TYPE_IDS = [
    "halfday-am" => 0, // ID de l'event type "Demi-journée matin (9h-13h)"
    "halfday-pm" => 0, // ID de l'event type "Demi-journée après-midi (14h-18h)"
    "fullday"    => 0, // ID de l'event type "Journée complète (9h-18h)"
];

/**
 * Si tu ne peux pas placer ce fichier hors public_html, mets ce .htaccess
 * dans le dossier qui contient cal-config.php :
 *
 *   <Files "cal-config.php">
 *     Require all denied
 *   </Files>
 */
