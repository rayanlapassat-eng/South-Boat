/* ============================================================
   CAP SUD — CARNET DE BORD
   ============================================================
   Pour ajouter un nouvel article :
   1. Copier un bloc { ... } existant ci-dessous
   2. Modifier les champs (id unique, date, titre, image, etc.)
   3. Placer le nouvel article EN HAUT du tableau (le plus récent en premier)
   4. Enregistrer le fichier — l'article apparaîtra automatiquement
      sur la page Cap Sud et en page d'accueil.

   Pour mettre un article EN AVANT (« à la une » sur la page Cap Sud
   et « Dernier article » sur la page d'accueil) :
   → ajouter la ligne   featured: true,   dans le bloc de l'article.
   Un seul article doit porter ce drapeau. Si aucun ne l'a, le plus
   récent (le premier du tableau) est mis en avant par défaut.
   ============================================================ */

const ARTICLES = [
  {
    id: "cap-sur-histoire-south-boat",
    featured: true,
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
    cover: "/images/article-guide-esterel.jpeg",
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

window.ARTICLES = ARTICLES;
