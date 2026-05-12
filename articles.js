/* ============================================================
   CAP SUD — CARNET DE BORD
   ============================================================
   Pour ajouter un nouvel article :
   1. Copier un bloc { ... } existant ci-dessous
   2. Modifier les champs (id unique, date, titre, image, etc.)
   3. Placer le nouvel article EN HAUT du tableau (le plus récent en premier)
   4. Enregistrer le fichier — l'article apparaîtra automatiquement
      sur la page Cap Sud et en page d'accueil.
   ============================================================ */

const ARTICLES = [
  {
    id: "iles-de-lerins-en-une-journee",
    title: "Les Îles de Lérins en une journée",
    date: "2026-05-08",
    author: "L'équipage South Boat",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    excerpt: "Sainte-Marguerite, Saint-Honorat, mouillages secrets et eaux turquoise — l'itinéraire idéal pour une journée d'évasion depuis Mandelieu.",
    content: [
      "Partir tôt, c'est la clé. Quitter le quai visiteur de Mandelieu avant 9h, c'est s'offrir une mer encore lisse et le choix des mouillages.",
      "Premier arrêt : l'anse de l'île Sainte-Marguerite, côté nord. L'eau y est claire, le fond sableux, et les pins parasols offrent une ombre bienvenue pour le déjeuner à bord.",
      "L'après-midi, cap vers Saint-Honorat. L'abbaye cistercienne, les vignes en bord de mer, et le petit tour de l'île à pied valent l'arrêt. Pensez à bien tenir votre annexe.",
      "Retour en fin de journée, le soleil dans le dos, en longeant la côte de l'Estérel. Trois heures de navigation tranquille — souvenirs garantis."
    ]
  },
  {
    id: "premiere-sortie-conseils-skipper",
    title: "Première sortie : les conseils de notre skipper",
    date: "2026-04-22",
    author: "Marine, fondatrice",
    cover: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1600&q=80",
    excerpt: "Vous louez un bateau pour la première fois ? Voici tout ce qu'il faut savoir avant de larguer les amarres depuis Mandelieu.",
    content: [
      "Avant tout : la météo. Consultez Météo Marine la veille et le matin du départ. Un vent annoncé à plus de 15 nœuds, c'est une journée à reporter.",
      "Le briefing à bord dure 20 à 30 minutes. Prenez le temps : moteur, GPS, ancrage, sécurité, contacts. Notez les numéros utiles dans votre téléphone.",
      "Préparez vos affaires en sac souple — plus facile à ranger qu'une valise. Crème solaire, casquette, lunettes polarisantes, et un coupe-vent même en juillet.",
      "Et surtout : ne vous mettez pas la pression. Le but, c'est de profiter. Notre conciergerie reste joignable toute la journée si besoin."
    ]
  }
];

window.ARTICLES = ARTICLES;
