/* ============================================================
   ENTRETIEN — PRESTATIONS ET TARIFS
   (univers « South Boat Entretien » : https://south-boat.com/entretien-bateau)
   ============================================================
   Fichier texte simple, comme articles.js : après modification,
   re-téléverser CE SEUL fichier. Aucune compilation nécessaire.

   AFFICHER UN PRIX « À PARTIR DE » :
   Dans le bloc concerné, remplacer      aPartirDe: null,
   par le montant, par exemple           aPartirDe: 150,
   et, si besoin, préciser l'unité       unite: "€ / m",
   (sans unité, le site affiche « € »).
   -> la carte affiche « À partir de 150 € / m » au lieu de « Sur devis ».
   Remettre  null  pour revenir à « Sur devis ».

   Les textes existent en français et en anglais (champs « _en »).

   CHAQUE PRESTATION A SA PROPRE PAGE :
   https://south-boat.com/entretien-bateau/<id>   (ex. /entretien-bateau/antifouling)
   Ne pas modifier les « id » : ils servent d'adresse aux pages (Google).
   - court   : libellé du bouton sur la page Entretien (« Entretien extérieur »)
   - titre   : titre complet, affiché en haut de la page de la prestation
   - icone   : goutte, brillance, carene, outil, cabine
   - photo   : null (visuel coloré) ou le chemin d'une photo, par exemple
               photo: "images/entretien/antifouling.jpg",
               (prévoir aussi la version « -800.jpg » à côté, cf. DEPLOIEMENT.md)
   ============================================================ */

var ENTRETIEN = {

  // ---------- Prestations (cartes de la section « Nos prestations ») ----------
  // cote : "exterieur" ou "interieur" (le groupe où la carte apparaît)
  prestations: [
    {
      id: "nettoyage-exterieur",
      court: "Entretien extérieur",
      court_en: "Exterior care",
      icone: "goutte",
      photo: null,
      cote: "exterieur",
      titre: "Entretien & nettoyage extérieur",
      titre_en: "Exterior care & cleaning",
      intro: "Pont, coque, selleries : tout ce qui reste exposé au sel et au soleil, remis au propre après vos sorties.",
      intro_en: "Deck, hull, upholstery: everything exposed to salt and sun, cleaned up after your outings.",
      points: [
        "Nettoyage complet du pont, du fly bridge et des espaces détente.",
        "Nettoyage des passavants.",
        "Nettoyage des francs-bords.",
        "Nettoyage des coques au-dessus de la ligne de flottaison.",
        "Nettoyage des coffres extérieurs.",
        "Nettoyage des sièges et banquettes.",
        "Nettoyage des selleries extérieures.",
        "Nettoyage des pare-battages.",
        "Nettoyage des tauds et protections.",
        "Rinçage à l'eau douce après utilisation.",
        "Élimination des traces de sel.",
        "Nettoyage des inox et chromes."
      ],
      points_en: [
        "Full cleaning of the deck, flybridge and lounge areas.",
        "Cleaning of the side decks.",
        "Cleaning of the topsides.",
        "Hull cleaning above the waterline.",
        "Cleaning of exterior lockers.",
        "Cleaning of seats and benches.",
        "Cleaning of exterior upholstery.",
        "Cleaning of fenders.",
        "Cleaning of covers and canvas.",
        "Fresh-water rinse after use.",
        "Salt residue removal.",
        "Cleaning of stainless steel and chrome."
      ],
      aPartirDe: null,
      unite: ""
    },
    {
      id: "lustrage",
      court: "Lustrage & polish",
      court_en: "Polishing",
      icone: "brillance",
      photo: null,
      cote: "exterieur",
      titre: "Lustrage & rénovation esthétique",
      titre_en: "Polishing & cosmetic restoration",
      intro: "Pour redonner de l'éclat à la coque et aux surfaces extérieures. Trois niveaux au choix, selon l'état de votre coque.",
      intro_en: "To bring the shine back to the hull and exterior surfaces. Three levels to choose from, depending on your hull's condition.",
      points: [
        "Décontamination des surfaces.",
        "Nettoyage approfondi du gelcoat.",
        "Suppression des traces d'oxydation.",
        "Polissage du gelcoat.",
        "Lustrage de la coque.",
        "Rénovation des surfaces ternies.",
        "Suppression des micro-rayures superficielles.",
        "Rénovation des surfaces en polyester.",
        "Traitement des inox.",
        "Protection des surfaces après polissage."
      ],
      points_en: [
        "Surface decontamination.",
        "Deep gelcoat cleaning.",
        "Oxidation removal.",
        "Gelcoat polishing.",
        "Hull buffing.",
        "Restoration of dull surfaces.",
        "Removal of light micro-scratches.",
        "Restoration of polyester surfaces.",
        "Stainless steel treatment.",
        "Surface protection after polishing."
      ],
      aPartirDe: null,
      unite: ""
    },
    {
      id: "antifouling",
      court: "Antifouling",
      court_en: "Antifouling",
      icone: "carene",
      photo: null,
      cote: "exterieur",
      titre: "Traitement antifouling",
      titre_en: "Antifouling treatment",
      intro: "Ponçage et peinture de la carène pour la protéger des salissures marines.",
      intro_en: "Sanding and painting of the hull bottom to protect it from marine fouling.",
      points: [
        "Nettoyage de la coque avant traitement.",
        "Élimination des anciennes salissures.",
        "Préparation du support.",
        "Ponçage léger si nécessaire et autorisé.",
        "Application d'antifouling.",
        "Application de produits adaptés au type de coque.",
        "Nettoyage des zones immergées.",
        "Entretien périodique de la carène lorsque le bateau est accessible."
      ],
      points_en: [
        "Hull cleaning before treatment.",
        "Removal of old fouling.",
        "Surface preparation.",
        "Light sanding where needed and permitted.",
        "Antifouling application.",
        "Products suited to your hull type.",
        "Cleaning of submerged areas.",
        "Periodic hull-bottom maintenance when the boat is accessible."
      ],
      note: "Sortie de l'eau et remise à l'eau possibles, comprises dans le devis.",
      note_en: "Haul-out and relaunch available, included in the quote.",
      aPartirDe: null,
      unite: ""
    },
    {
      id: "gelcoat-chromes",
      court: "Gelcoat & chromes",
      court_en: "Gelcoat & chrome",
      icone: "outil",
      photo: null,
      cote: "exterieur",
      titre: "Gelcoat & chromes",
      titre_en: "Gelcoat & chrome",
      intro: "Les petits dégâts qui ternissent l'allure d'un bateau : nous les réparons pour lui rendre un aspect soigné.",
      intro_en: "The small damage that spoils a boat's looks: we repair it to restore a neat finish.",
      points: [
        "Réfection des éclats de gelcoat.",
        "Réparation des trous et impacts.",
        "Réfection de l'ensemble des chromes."
      ],
      points_en: [
        "Gelcoat chip repair.",
        "Repair of holes and impacts.",
        "Restoration of all chrome fittings."
      ],
      aPartirDe: null,
      unite: ""
    },
    {
      id: "nettoyage-interieur",
      court: "Entretien intérieur",
      court_en: "Interior care",
      icone: "cabine",
      photo: null,
      cote: "interieur",
      titre: "Entretien & nettoyage intérieur",
      titre_en: "Interior care & cleaning",
      intro: "Un intérieur net et frais pour profiter pleinement de la vie à bord.",
      intro_en: "A clean, fresh interior to fully enjoy life on board.",
      points: [
        "Nettoyage des pièces de vie : cabines, séjour, cuisine.",
        "Nettoyage des vitres et des hublots.",
        "Nettoyage des rangements et des coffres.",
        "Aspiration complète du bateau."
      ],
      points_en: [
        "Cleaning of living areas: cabins, saloon, galley.",
        "Cleaning of windows and portholes.",
        "Cleaning of storage and lockers.",
        "Full vacuuming of the boat."
      ],
      note: "Pour les bateaux de plus de 10 m avec espace de nuit. Intervention à quai.",
      note_en: "For boats over 10 m with sleeping quarters. Done at the dock.",
      aPartirDe: null,
      unite: ""
    }
  ],

  // ---------- Les trois niveaux de lustrage ----------
  niveauxLustrage: [
    {
      niveau: 1,
      titre: "Lustrage simple",
      titre_en: "Simple polish",
      passes: "1 passe",
      passes_en: "1 pass",
      texte: "Pour raviver l'éclat d'une coque déjà en bon état.",
      texte_en: "To revive the shine of a hull already in good condition.",
      aPartirDe: null,
      unite: ""
    },
    {
      niveau: 2,
      titre: "Polissage et rénovation",
      titre_en: "Polishing & restoration",
      passes: "2 passes",
      passes_en: "2 passes",
      texte: "Pour un gelcoat terni ou oxydé : on retire l'oxydation et les micro-rayures avant de lustrer.",
      texte_en: "For dull or oxidised gelcoat: oxidation and micro-scratches are removed before buffing.",
      aPartirDe: null,
      unite: ""
    },
    {
      niveau: 3,
      titre: "Polissage complet + protection céramique",
      titre_en: "Full polish + ceramic coating",
      passes: "3 passes",
      passes_en: "3 passes",
      texte: "La rénovation la plus complète, scellée par une protection céramique.",
      texte_en: "The most complete restoration, sealed with a ceramic coating.",
      aPartirDe: null,
      unite: ""
    }
  ],

  // ---------- Forfaits d'entretien au mois ou à l'année ----------
  // Avec un montant, le bandeau « Forfaits » affiche « À partir de … ».
  forfait: {
    aPartirDe: null,
    unite: "€ / mois",
    unite_en: "€ / month"
  }
};

window.ENTRETIEN = ENTRETIEN;
