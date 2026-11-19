/* ============================================================
   CAP SUD — CARNET DE BORD
   ============================================================
   AJOUTER UN NOUVEL ARTICLE :
   1. Copier un bloc { ... } existant ci-dessous
   2. Modifier les champs (id unique, date, titre, image, etc.)
   3. Placer le nouvel article EN HAUT du tableau (le plus récent en premier)
   4. Enregistrer le fichier — l'article apparait automatiquement
      sur la page Cap Sud et en page d'accueil.

   CE QU'ON PEUT METTRE DANS « content » :
   - "Du texte"            -> un paragraphe
   - "## Un titre"         -> un grand titre de section
   - "### Un sous-titre"   -> un sous-titre
   - { image: "...", alt: "...", legende: "..." }   -> une photo avec sa legende
     (prevoir aussi la variante "-800" du fichier : elle est servie aux telephones)
   - { lien: "https://...", libelle: "..." }        -> un bouton vers un site externe
   - { encadre: { titre: "...", lignes: [ { intitule: "...", valeur: "..." } ] } }
                                                    -> un petit encadre « infos pratiques »

   L'ARTICLE DU MOMENT (« a la une » sur la page Cap Sud et
   « Dernier article » sur la page d'accueil) :
   -> il change TOUT SEUL chaque lundi, voir le bloc ROTATION plus bas.
   -> pour forcer un article et bloquer la rotation, ajouter dans son bloc :
      epingle: true,        (un seul article a la fois ; retirer la ligne
                             pour rendre la main a la rotation automatique)
   ============================================================ */

const ARTICLES = [
  {
    id: "cannes-yachting-festival-2026",
    title: "Cannes Yachting Festival 2026 : tout ce qu'il faut savoir avant de se rendre au salon",
    date: "2026-09-07",
    author: "L'équipage South Boat",
    cover: "/images/mochi/yachting-cote-azur-bateau-location-mandelieu.jpg",
    excerpt: "Du 8 au 13 septembre 2026, le salon nautique de Cannes réunit plus de 680 exposants et 700 bateaux entre le Vieux Port et Port Canto. Ce que l'on y découvre, et ce que cette proximité change pour les plaisanciers de Mandelieu.",
    content: [
      "Du 8 au 13 septembre 2026, Cannes va une nouvelle fois devenir la capitale du nautisme sur la Côte d'Azur. Pendant six jours, le Cannes Yachting Festival, fondé en 1977, réunira les professionnels du secteur, les passionnés de bateaux et les visiteurs venus découvrir les nouveautés de la saison.",
      "Avec plus de 680 exposants, plus de 700 bateaux et yachts présentés et près de 56 600 visiteurs attendus, le salon s'impose comme l'un des grands rendez-vous nautiques de la rentrée. Des embarcations de quelques mètres aux yachts de plusieurs dizaines de mètres, les pontons cannois permettent de découvrir une impressionnante diversité de bateaux et les dernières évolutions du marché.",
      "Et pour les plaisanciers de Mandelieu, de la baie de Cannes et plus largement des Alpes-Maritimes, le Festival est aussi l'occasion de prendre le temps de regarder ce qui se fait de nouveau dans le nautisme, de comparer les modèles et, pourquoi pas, de trouver quelques idées pour sa prochaine sortie en mer.",

      "## Un salon nautique entre le Vieux Port et Port Canto",
      "Le Cannes Yachting Festival possède une particularité que l'on apprécie beaucoup : il se découvre à pied, au fil de la Croisette, entre deux ports qui proposent chacun une atmosphère différente.",
      "Le Vieux Port, situé au pied du Suquet, fait la part belle aux bateaux à moteur et aux yachts. Port Canto, à l'autre extrémité de la Croisette, s'intéresse davantage à l'univers de la voile, du brokerage et de la plaisance.",
      "Cette répartition permet de passer facilement d'un univers à l'autre et de découvrir une quantité impressionnante de bateaux en une seule journée.",
      "Pour les passionnés, c'est aussi l'occasion de prendre le temps de monter à bord, de discuter avec les constructeurs et les professionnels présents sur place et de découvrir des équipements que l'on ne voit pas forcément lors d'une simple sortie en mer.",

      "## Que peut-on voir au Cannes Yachting Festival ?",
      "Le Festival rassemble des bateaux très différents, ce qui fait aussi son intérêt.",
      "On y retrouve notamment des yachts à moteur, des dayboats, des voiliers, des catamarans, des bateaux de plaisance et des yachts d'occasion, ainsi qu'un grand nombre d'équipements et de solutions dédiés à la navigation.",
      "Les constructeurs profitent traditionnellement du salon pour présenter leurs nouveaux modèles. Pour l'édition 2026, plus de 150 nouveautés sont annoncées en première mondiale.",
      "Au-delà de l'esthétique des bateaux, le salon permet surtout de voir concrètement comment évolue le nautisme : nouvelles motorisations, équipements embarqués, solutions destinées à améliorer le confort à bord, innovations technologiques ou encore nouvelles façons de profiter de la mer.",
      "Certains modèles peuvent également être essayés en mer. Une différence importante lorsque l'on souhaite réellement se faire une idée d'un bateau : une fiche technique et une visite à quai ne donnent jamais tout à fait la même impression qu'une navigation dans la baie de Cannes.",

      "## Le Vieux Port : les nouveautés du yachting à moteur",
      "Si vous aimez les bateaux à moteur, commencez votre visite par le Vieux Port de Cannes.",
      "Installé au pied du Suquet, il accueille une importante partie des yachts et bateaux à moteur exposés pendant le Festival. Les grands chantiers navals y présentent leurs dernières réalisations et profitent du salon pour dévoiler certains de leurs nouveaux modèles.",
      "C'est également un endroit intéressant pour découvrir les équipements et technologies qui accompagnent aujourd'hui la plaisance : navigation, électronique, confort à bord, motorisation ou encore solutions permettant de profiter plus facilement de son bateau.",
      "Même sans projet d'achat immédiat, une promenade entre les pontons vaut le détour. C'est souvent en découvrant les bateaux « en vrai » que l'on se rend compte des différences de taille, d'aménagement ou de conception entre les modèles.",

      "## Port Canto : la voile et une autre vision de la plaisance",
      "Direction ensuite Port Canto, à l'est de la Croisette.",
      "L'ambiance y est différente, avec une place importante accordée à la voile, mais aussi aux yachts d'occasion, aux dayboats et aux bateaux à moteur de taille plus modeste.",
      "Le site accueille notamment un espace dédié au brokerage, intéressant pour celles et ceux qui souhaitent découvrir le marché du bateau d'occasion. Les visiteurs peuvent également y retrouver différents équipements et « toys » nautiques qui viennent compléter l'expérience à bord.",
      "Port Canto donne finalement une vision assez large de la plaisance : posséder un bateau, naviguer à la journée, partir plusieurs jours en mer ou simplement profiter du littoral avec ses proches.",

      "## Une bonne occasion de réfléchir à sa prochaine sortie en mer",
      {
        image: "/images/drone/crique-esterel-bateau-mouillage-mandelieu-v2.jpg",
        alt: "Bateau au mouillage dans une crique du massif de l'Estérel, à quelques milles de Mandelieu-la-Napoule",
        legende: "À quelques milles du Port de Mandelieu, les criques de l'Estérel restent l'un des plus beaux terrains de navigation de la Côte d'Azur."
      },
      "Un salon comme le Cannes Yachting Festival peut donner envie de changer de bateau… mais aussi tout simplement de prendre la mer.",
      "C'est d'ailleurs une bonne manière de découvrir la Côte d'Azur : depuis Mandelieu, les possibilités de navigation sont nombreuses et la baie de Cannes offre un terrain de jeu particulièrement agréable pour une journée en bateau.",
      "Pas besoin pour autant d'être propriétaire pour en profiter. La location de bateau à Mandelieu permet de prendre le large à la journée ou pour quelques heures, selon ses envies, et de profiter de la Méditerranée sans avoir à gérer les contraintes liées à la possession d'une embarcation.",
      "Chez South Boat, nous accompagnons les plaisanciers qui souhaitent profiter de la mer depuis Mandelieu et ses environs. Que ce soit pour une sortie entre amis, une journée en famille ou simplement pour retrouver le plaisir de naviguer, louer un bateau peut être une excellente façon de découvrir ou redécouvrir le littoral.",

      "## Un bateau, c'est aussi du temps passé à l'entretenir",
      {
        image: "/images/mochi/entretien-nettoyage-bateau-mandelieu.jpg",
        alt: "Cockpit et selleries d'un bateau South Boat entretenus au Port de Mandelieu",
        legende: "Selleries, pont, console de pilotage : entre deux sorties, ce sont les surfaces exposées au sel et au soleil qui marquent le plus vite."
      },
      "Le Festival rappelle une chose que les passionnés connaissent bien : un beau bateau, c'est avant tout un bateau dont on prend soin.",
      "Entre deux navigations, l'entretien fait partie intégrante de la vie d'un bateau. Sel, soleil, humidité, traces de passage et embruns finissent rapidement par laisser leur marque sur les surfaces, les selleries et les équipements.",
      "Un nettoyage régulier permet de conserver un bateau agréable à utiliser, mais aussi de préserver son état dans le temps. Cela concerne aussi bien le pont et les extérieurs que les selleries, les surfaces intérieures ou les différents éléments soumis aux conditions marines.",
      "Pour les propriétaires qui n'ont pas toujours le temps de s'en occuper eux-mêmes, faire appel à un professionnel peut donc être une solution simple pour retrouver un bateau propre et prêt à naviguer.",
      "C'est également un point à ne pas négliger avant de mettre un bateau en location ou de le présenter à de futurs acquéreurs : l'état général et la propreté donnent immédiatement une première impression.",

      "## La SNSM : un rappel essentiel sur la sécurité en mer",
      "Le nautisme, c'est avant tout le plaisir de naviguer, mais la sécurité reste évidemment indispensable.",
      "Le Cannes Yachting Festival soutient la Société Nationale de Sauvetage en Mer (SNSM), qui joue un rôle essentiel auprès des plaisanciers et des usagers de la mer.",
      "En 2025, les Sauveteurs en Mer ont réalisé près de 9 000 interventions et pris en charge environ 26 000 personnes au cours de leurs différentes missions. Leur action repose en grande partie sur l'engagement de bénévoles formés pour intervenir dans des situations parfois complexes.",
      "Sur le littoral, le 196 permet de joindre les secours en mer. En navigation, le canal 16 de la VHF reste la fréquence internationale d'appel et de détresse.",
      { lien: "https://www.snsm.org/", libelle: "En savoir plus sur la SNSM" },

      "## Cannes depuis Mandelieu : une proximité qui fait la différence",
      {
        image: "/images/drone/baie-mandelieu-drone-coucher-soleil.jpg",
        alt: "Le port de La Napoule et la baie de Mandelieu au coucher du soleil, vus du ciel",
        legende: "Le port de La Napoule au coucher du soleil. La baie de Cannes et ses pontons commencent juste de l'autre côté de la pointe."
      },
      "Pour les plaisanciers installés à Mandelieu-la-Napoule, le Cannes Yachting Festival est particulièrement facile à intégrer à une journée sur la Côte d'Azur.",
      "En quelques kilomètres, on passe de l'univers nautique de Mandelieu à l'effervescence des pontons cannois. Une proximité qui permet de profiter du salon, de découvrir les nouveautés et de revenir ensuite vers son port ou son bateau sans transformer la sortie en véritable expédition.",
      "Pour South Boat, cette proximité avec Cannes est aussi l'occasion de rester au contact de l'actualité du nautisme et des attentes des plaisanciers de la région.",
      "Que vous soyez propriétaire, futur acquéreur ou simplement amateur de sorties en mer, le Festival constitue un bon prétexte pour venir découvrir les nouveautés et échanger avec les professionnels du secteur.",
      "Et si la visite des pontons vous donne envie de passer de la découverte à la navigation, South Boat à Mandelieu est là pour vous accompagner, que ce soit pour une location de bateau ou pour l'entretien et le nettoyage de votre embarcation.",

      {
        encadre: {
          titre: "Cannes Yachting Festival 2026 — les informations essentielles",
          lignes: [
            { intitule: "Dates", valeur: "Du mardi 8 au dimanche 13 septembre 2026" },
            { intitule: "Lieu", valeur: "Cannes — Vieux Port et Port Canto" },
            { intitule: "Sur place", valeur: "Les deux sites se rejoignent à pied, par la Croisette" },
            { intitule: "Depuis Mandelieu", valeur: "Une dizaine de kilomètres depuis le Port de Mandelieu" }
          ]
        }
      },
      "Si vous êtes à Mandelieu ou dans les environs, le Cannes Yachting Festival est certainement l'un des rendez-vous nautiques à ne pas manquer cette année."
    ]
  },
  {
    id: "cap-sur-histoire-south-boat",
    title: "Cap sur l'histoire de South Boat",
    date: "2026-06-22",
    author: "Maxim & Vincent",
    cover: "/images/capsud-feature.jpeg",
    excerpt: "Deux amis, une passion commune pour la mer et l'aventure : découvrez comment est née South Boat, entre amitié, confiance et envie d'entreprendre ensemble.",
    content: [
      "Nous sommes Maxim et Vincent, les deux capitaines du navire, mais aussi deux amis unis autour des mêmes passions : l'aventure, les découvertes et les souvenirs qu'elles créent.",
      "## Une amitié, une passion commune",
      "Depuis plusieurs années, nous passons une grande partie de notre temps libre à explorer les criques, les plages et les plus beaux coins de notre belle région. Que ce soit en mer ou en pleine nature, nous sommes mordus d'activités en plein air et de sports nautiques.",
      "Au fil de nos escapades, une idée est devenue une évidence : partager cette passion avec le plus grand nombre car nous avons à cœur de vous faire vivre des moments uniques qui se transformeront en souvenirs inoubliables. C'est ainsi qu'est née notre société de location de bateaux. Une aventure qui débute avant tout par une histoire d'amitié, de confiance et d'envie d'entreprendre ensemble.",
      "## Une même volonté : la création de souvenirs uniques",
      "Notre volonté va au-delà d'une simple location de bateau, elle s'ouvre à une dimension bien plus profonde : offrir à chaque client une expérience unique, des conseils personnalisés, le partage de nos meilleurs spots et un service de qualité, du premier contact, jusqu'au retour au port. Parce que l'accompagnement et le conseil sont pour nous l'essence même de notre entreprise.",
      "Nous-mêmes passionnés de navigation, nous avons conscience de la valeur des souvenirs qui peuvent être créés lors d'une journée en mer. Alors, que vous soyez en famille, entre amis, ou en couple, soyez sûrs que nous mettrons tout en œuvre pour rendre votre sortie bateau inoubliable et qu'elle soit synonyme de plaisir, de découverte et de sérénité.",
      "## Une exigence au service de votre expérience",
      "L'entretien de nos bateaux, la sécurité de nos passagers et la qualité de l'accueil que nous réservons à chacun de nos clients font l'objet d'une attention toute particulière.",
      "Aujourd'hui nous sommes fiers de partager notre passion et de faire découvrir la beauté de notre littoral à travers des expériences authentiques et mémorables, à bord de bateaux soigneusement sélectionnés et entretenus pour votre confort. Au-delà de la location, nous vous accompagnons aussi dans l'entretien et le nettoyage de votre bateau avec le même niveau d'exigence, de soin et d'attention que nous accordons à notre propre flotte.",
      "Au plaisir de vous accueillir à bord et de vous faire vivre votre prochaine aventure en mer !"
    ]
  },
  {
    id: "location-bateau-mandelieu-guide-esterel",
    title: "Location de bateau à Mandelieu : le guide pour découvrir l'Estérel par la mer",
    date: "2026-06-19",
    author: "L'équipage South Boat",
    cover: "/images/drone/corniche-or-esterel-panorama.jpg",
    excerpt: "Criques cachées, falaises rouges et eaux turquoise — partez à la découverte du massif de l'Estérel depuis Mandelieu-la-Napoule.",
    content: [
      "Quand on visite la Côte d'Azur, on pense souvent aux plages, aux villages perchés ou aux routes qui longent le littoral. Pourtant, une partie des plus beaux paysages se découvre depuis la mer. En choisissant une location de bateau à Mandelieu, vous accédez rapidement aux criques du massif de l'Estérel, à ses falaises rouges et à des coins bien plus difficiles à rejoindre par la terre.",
      "Chez South Boat, nous proposons des bateaux à louer au départ de Mandelieu-la-Napoule pour une sortie en mer simple, sécurisée et adaptée aussi bien aux vacanciers qu'aux habitants de la région.",
      "## Pourquoi louer un bateau à Mandelieu pour découvrir l'Estérel ?",
      "La grande question que tout futur matelot se pose : où louer un bateau pour une excursion en mer réussie ?",
      "Le choix du port de départ joue un rôle important dans la réussite d'une journée en mer. Située entre Cannes et le massif de l'Estérel, Mandelieu-la-Napoule bénéficie d'un emplacement particulièrement pratique pour rejoindre rapidement les plus beaux sites du littoral.",
      "La commune possède une véritable culture maritime et plusieurs ports réputés, dont le port de La Napoule, le port de La Rague et le port du Riou de l'Argentière. Depuis ces ports, il est possible de naviguer vers les îles de Lérins, les côtes sauvages de l'Estérel ou encore de petites criques préservées accessibles principalement par bateau.",
      "## Les plus belles criques de l'Estérel accessibles en bateau",
      "L'un des grands avantages d'une excursion en bateau au départ de Mandelieu est de pouvoir rejoindre des endroits parfois difficiles d'accès depuis la côte. Voici quelques sites particulièrement appréciés des plaisanciers.",
      "### Le Cap Roux",
      "Le secteur du Cap Roux abrite plusieurs petites anses rocheuses aux eaux claires, idéales pour la baignade et le snorkeling.",
      "### La baie d'Agay",
      "En s'éloignant des plages les plus fréquentées, on découvre des criques plus calmes où l'on peut profiter d'une pause loin de l'agitation estivale.",
      "### Le Trayas",
      "Entre Mandelieu et Saint-Raphaël, cette portion de côte offre certains des paysages les plus sauvages du massif de l'Estérel, avec de nombreux mouillages agréables pour une halte baignade.",
      "### La calanque de Maubois",
      "Entourée des célèbres roches rouges de l'Estérel, la calanque de Maubois séduit par la clarté de son eau et son décor spectaculaire. Son accès terrestre limité contribue à préserver son charme.",
      "### La calanque des Anglais",
      "Plus discrète, cette crique bordée de falaises rocheuses est appréciée pour son calme et son caractère naturel.",
      "### L'île des Vieilles",
      "Situé au large du Cap Dramont, ce petit îlot rocheux offre un cadre remarquable pour une pause au mouillage, notamment hors des périodes de forte affluence.",
      "## Bon à savoir / Navigation responsable",
      "Certaines zones du massif de l'Estérel sont réglementées afin de protéger les herbiers de posidonie et les écosystèmes marins. Avant de jeter l'ancre, il est recommandé de vérifier les règles de mouillage en vigueur, surtout en été.",
      "## Une journée bateau entre falaises rouges et eaux méditerranéennes",
      "Que ce soit pour une demi-journée, une journée complète ou une simple balade au coucher du soleil, louer un bateau à Mandelieu reste l'une des meilleures façons de découvrir l'Estérel à son rythme.",
      "Alors embarquez avec nous pour une balade flottante à bord de l'un de nos bateaux afin de longer ces superbes falaises rouges de l'Estérel et de naviguer entre ces eaux turquoise de la Méditerranée. Des calanques et criques secrètes qui vous dévoilent leurs plus belles couleurs mais vous marqueront aussi de leurs plus beaux souvenirs."
    ]
  }
];

/* ============================================================
   ROTATION HEBDOMADAIRE DE « L'ARTICLE DU MOMENT »
   ============================================================
   Chaque LUNDI, le site met automatiquement un autre article en avant
   (page d'accueil + bandeau « L'article du moment » sur la page Cap Sud).
   Aucune manipulation a faire : le calcul se fait tout seul dans le
   navigateur du visiteur, a partir de la date du jour.

   Avec 3 articles, chacun passe a la une une semaine sur trois.
   Ajouter un article suffit a l'inclure dans la rotation.

   POUR FORCER UN ARTICLE EN PARTICULIER (et suspendre la rotation) :
   ajouter la ligne   epingle: true,   dans le bloc de cet article.

   POUR RETIRER UN ARTICLE DE LA ROTATION (il reste visible dans la
   liste, mais ne passe plus a la une) : ajouter dans son bloc
     rotation: false,                 -> jamais a la une
   ou, pour un article lie a un evenement date :
     alaUneJusquau: "2026-09-20",     -> sort de la rotation apres cette date
   ============================================================ */

const ROTATION = {
  active: true,          // false = pas de rotation (on garde le plus recent)
  premierLundi: "2026-09-07",  // lundi de reference : semaine n°0 de la rotation
};

// Renvoie le lundi 00h00 de la semaine contenant la date donnee.
function _lundiDeLaSemaine(d) {
  var x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  var jour = (x.getDay() + 6) % 7;   // 0 = lundi ... 6 = dimanche
  x.setDate(x.getDate() - jour);
  return x;
}

// Nombre de semaines ecoulees depuis le lundi de reference (peut etre negatif).
function _numeroDeSemaine(aujourdhui) {
  var parts = ROTATION.premierLundi.split("-").map(Number);
  var ref = _lundiDeLaSemaine(new Date(parts[0], parts[1] - 1, parts[2]));
  var cur = _lundiDeLaSemaine(aujourdhui);
  // Math.round absorbe le decalage d'une heure des changements d'heure.
  return Math.round((cur - ref) / (7 * 24 * 60 * 60 * 1000));
}

/**
 * L'article a mettre en avant aujourd'hui.
 * Ordre de priorite : article epingle > rotation hebdomadaire > plus recent.
 */
function articleDuMoment(aujourdhui) {
  var today = aujourdhui || new Date();
  if (!ARTICLES.length) return null;

  var epingle = ARTICLES.find(function (a) { return a.epingle; });
  if (epingle) return epingle;

  if (ROTATION.active) {
    var eligibles = ARTICLES.filter(function (a) {
      if (a.rotation === false) return false;
      if (a.alaUneJusquau) {
        var p = a.alaUneJusquau.split("-").map(Number);
        // valable jusqu'a la fin de la journee indiquee
        if (today > new Date(p[0], p[1] - 1, p[2], 23, 59, 59)) return false;
      }
      return true;
    });
    if (eligibles.length) {
      var n = _numeroDeSemaine(today);
      var i = ((n % eligibles.length) + eligibles.length) % eligibles.length;
      return eligibles[i];
    }
  }

  return ARTICLES[0];
}

window.ARTICLES = ARTICLES;
window.articleDuMoment = articleDuMoment;
