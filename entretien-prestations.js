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
   - surDemande : true -> la prestation n'a pas de grande carte sur la page
               Entretien : simple bouton « … (sur demande) » à la suite de
               l'entretien extérieur, et mention « Sur demande » à côté du
               titre de sa page.
   ============================================================ */

var ENTRETIEN = {

  // ---------- Prestations (cartes de la section « Nos prestations ») ----------
  // cote : "exterieur" ou "interieur"
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
      // Ordre : nettoyage général, surfaces et équipements, traces de sel, rinçage.
      points: [
        "Nettoyage complet du pont, du fly bridge et des espaces détente.",
        "Nettoyage des passavants.",
        "Nettoyage des francs-bords.",
        "Nettoyage des coffres extérieurs.",
        "Nettoyage des selleries extérieures.",
        "Nettoyage des pare-battages.",
        "Nettoyage tauds et protections.",
        "Nettoyage des inox et chromes.",
        "Élimination des traces de sel.",
        "Rinçage à l'eau douce après intervention."
      ],
      points_en: [
        "Full cleaning of the deck, flybridge and lounge areas.",
        "Cleaning of the side decks.",
        "Cleaning of the topsides.",
        "Cleaning of exterior lockers.",
        "Cleaning of exterior upholstery.",
        "Cleaning of fenders.",
        "Cleaning of covers and canvas.",
        "Cleaning of stainless steel and chrome.",
        "Salt residue removal.",
        "Fresh-water rinse after the work."
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
      intro: "Pour redonner de l'éclat à la coque et aux surfaces extérieures. Trois niveaux au choix selon l'état de votre coque, et une protection en option.",
      intro_en: "To bring the shine back to the hull and exterior surfaces. Three levels to choose from depending on your hull's condition, plus an optional protection.",
      points: [
        "Décontamination des surfaces.",
        "Nettoyage approfondi du gelcoat.",
        "Suppression des rayures superficielles.",
        "Réparation du gelcoat (impacts superficiels).",
        "Rénovation des surfaces ternies.",
        "Rénovation des surfaces en polyester.",
        "Polissage du gelcoat.",
        "Lustrage du gelcoat.",
        "Traitement des inox.",
        "Protection des surfaces (céramique / Wax)."
      ],
      points_en: [
        "Surface decontamination.",
        "Deep gelcoat cleaning.",
        "Removal of light surface scratches.",
        "Gelcoat repair (minor surface impacts).",
        "Restoration of dull surfaces.",
        "Restoration of polyester surfaces.",
        "Gelcoat polishing.",
        "Gelcoat buffing.",
        "Stainless steel treatment.",
        "Surface protection (ceramic / wax)."
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
        "Nettoyage de la coque avec traitement, incluant le nettoyage des zones immergées.",
        "Élimination des anciennes salissures.",
        "Protection et masquage du bateau.",
        "Ponçage si nécessaire et autorisé.",
        "Préparation du support si nécessaire.",
        "Application de l'antifouling selon la nature de la coque.",
        "Entretien périodique."
      ],
      points_en: [
        "Hull cleaning with treatment, including the submerged areas.",
        "Removal of old fouling.",
        "Protection and masking of the boat.",
        "Sanding where needed and permitted.",
        "Surface preparation where needed.",
        "Antifouling application suited to the hull type.",
        "Periodic maintenance."
      ],
      note: "Sortie de l'eau et remise à l'eau possibles sur demande.",
      note_en: "Haul-out and relaunch available on request.",
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
      surDemande: true,
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
      note: "Pour les bateaux de plus de 10 m avec espace de nuit. Intervention à quai, ou en carénage sur demande.",
      note_en: "For boats over 10 m with sleeping quarters. Done at the dock, or in the boatyard on request.",
      aPartirDe: null,
      unite: ""
    }
  ],

  // ---------- Les niveaux de prestations (page Lustrage) ----------
  // lignes : une ligne par phrase affichée sur la carte du niveau.
  niveauxLustrage: [
    {
      niveau: 1,
      titre: "Lustrage",
      titre_en: "Polish",
      passes: "1 passe",
      passes_en: "1 pass",
      lignes: [
        "Forfait lustrage.",
        "Objectif : raviver l'état et l'éclat de la coque."
      ],
      lignes_en: [
        "Polishing package.",
        "Goal: revive the condition and shine of the hull."
      ],
      aPartirDe: null,
      unite: ""
    },
    {
      niveau: 2,
      titre: "Polissage et lustrage",
      titre_en: "Polishing & buffing",
      passes: "2 passes",
      passes_en: "2 passes",
      lignes: [
        "Polissage suivi d'un lustrage.",
        "Prestation adaptée selon l'état de la coque."
      ],
      lignes_en: [
        "Polishing followed by buffing.",
        "Tailored to the condition of the hull."
      ],
      aPartirDe: null,
      unite: ""
    },
    {
      niveau: 3,
      titre: "Rénovation",
      titre_en: "Restoration",
      passes: "3 passes",
      passes_en: "3 passes",
      lignes: [
        "Rénovation comprenant polissage et lustrage.",
        "Travail adapté selon l'état de la coque.",
        "Rénovation par ponçage, polissage mécanique et lustrage de finition pour un éclat optimal."
      ],
      lignes_en: [
        "Restoration including polishing and buffing.",
        "Work tailored to the condition of the hull.",
        "Restoration by sanding, machine polishing and finishing buff for optimal shine."
      ],
      aPartirDe: null,
      unite: ""
    },
    {
      niveau: 4,
      titre: "Protection",
      titre_en: "Protection",
      passes: "En option",
      passes_en: "Optional",
      lignes: [
        "Option de protection des surfaces avec application d'une protection céramique ou Wax."
      ],
      lignes_en: [
        "Optional surface protection with a ceramic coating or wax."
      ],
      aPartirDe: null,
      unite: ""
    }
  ],

  // ---------- Produits & partenaires (logos + noms) ----------
  // logo : null (le nom s'affiche en toutes lettres à la place) ou le chemin
  //        du logo, par exemple  logo: "images/partenaires/hempel.png",
  //        (PNG ou SVG sur fond transparent, ~300 px de large suffisent).
  // precision : petite mention sous le nom (« Antifouling »), ou "".
  partenaires: [
    { nom: "Rupes Marine", precision: "", precision_en: "", logo: null },
    { nom: "International", precision: "Antifouling", precision_en: "Antifouling", logo: null },
    { nom: "3M", precision: "", precision_en: "", logo: null },
    { nom: "Nautic Clean", precision: "", precision_en: "", logo: null },
    { nom: "Hempel", precision: "Antifouling", precision_en: "Antifouling", logo: null },
    { nom: "Revival Marine Care", precision: "", precision_en: "", logo: null }
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
