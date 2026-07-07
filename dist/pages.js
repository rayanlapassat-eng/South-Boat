(() => {
  // pages.jsx
  var { useState, useEffect, useMemo, useRef } = React;
  var FAQ_ITEMS = [
    {
      q_fr: "Faut-il le permis bateau pour louer chez South Boat ?",
      q_en: "Do I need a boating license to rent with South Boat?",
      a_fr: "Sans skipper, un permis bateau c\xF4tier en cours de validit\xE9 est obligatoire : seul le titulaire du permis pourra conduire le bateau. Avec skipper, aucun permis n'est n\xE9cessaire, c'est notre capitaine qui pilote.",
      a_en: "Without a skipper, a valid coastal boating license is required: only the license holder may operate the boat. With a skipper, no license is needed \u2014 our captain handles the helm."
    },
    {
      q_fr: "Quel est le prix d'une location de bateau \xE0 Mandelieu ?",
      q_en: "How much does a boat rental in Mandelieu cost?",
      a_fr: "Le Mochi (day cruiser, jusqu'\xE0 8 personnes) est \xE0 partir de 435 \u20AC la journ\xE9e compl\xE8te et 320 \u20AC la demi-journ\xE9e. Le skipper est en option (+150 \u20AC la demi-journ\xE9e, +200 \u20AC la journ\xE9e). Tarifs clairs, sans frais cach\xE9s.",
      a_en: "The Mochi (day cruiser, up to 8 people) starts at \u20AC435 for a full day and \u20AC320 for a half day. A skipper is optional (+\u20AC150 half day, +\u20AC200 full day). Clear pricing, no hidden fees."
    },
    {
      q_fr: "D'o\xF9 partent les locations de bateau ?",
      q_en: "Where do the boat rentals depart from?",
      a_fr: "Toutes nos sorties partent du quai visiteur du Port de Mandelieu, \xE0 Mandelieu-la-Napoule (06210). Notre \xE9quipe vous y accueille pour un briefing avant chaque d\xE9part.",
      a_en: "All our trips depart from the visitor dock of Port de Mandelieu, in Mandelieu-la-Napoule (06210). Our team welcomes you there for a briefing before each departure."
    },
    {
      q_fr: "Quelles destinations peut-on rejoindre depuis Mandelieu ?",
      q_en: "Which destinations can I reach from Mandelieu?",
      a_fr: "Depuis Mandelieu, on rejoint facilement les calanques rouges du massif de l'Est\xE9rel, les \xEEles de L\xE9rins (Sainte-Marguerite et Saint-Honorat), le Cap d'Antibes et la baie de Cannes.",
      a_en: "From Mandelieu, you can easily reach the red coves of the Est\xE9rel massif, the L\xE9rins Islands (Sainte-Marguerite and Saint-Honorat), Cap d'Antibes and the bay of Cannes."
    },
    {
      q_fr: "Combien de personnes peuvent monter \xE0 bord ?",
      q_en: "How many people can come aboard?",
      a_fr: "Le Mochi accueille jusqu'\xE0 8 personnes. Les enfants sont les bienvenus, sous la responsabilit\xE9 des adultes accompagnants.",
      a_en: "The Mochi welcomes up to 8 people. Children are welcome, under the responsibility of accompanying adults."
    },
    {
      q_fr: "Quelle est la politique d'annulation ?",
      q_en: "What is the cancellation policy?",
      a_fr: "L'annulation est gratuite jusqu'\xE0 7 jours avant le d\xE9part. Entre 7 et 3 jours, 50 % de l'acompte est retenu ; \xE0 moins de 3 jours, l'acompte n'est pas remboursable.",
      a_en: "Cancellation is free up to 7 days before departure. Between 7 and 3 days, 50% of the deposit is retained; under 3 days, the deposit is non-refundable."
    }
  ];
  function HomePage({ setPage, query, setQuery }) {
    const t = window.useT();
    const featured = BOATS.slice(0, 3);
    const latestArticle = window.ARTICLES && window.ARTICLES.length > 0 ? window.ARTICLES.find((a) => a.featured) || window.ARTICLES[0] : null;
    const [openFaq, setOpenFaq] = useState(0);
    useEffect(() => {
      const ld = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map((f) => ({
          "@type": "Question",
          "name": f.q_fr,
          "acceptedAnswer": { "@type": "Answer", "text": f.a_fr }
        }))
      };
      const tag = document.createElement("script");
      tag.type = "application/ld+json";
      tag.id = "ld-faq";
      tag.textContent = JSON.stringify(ld);
      const existing = document.getElementById("ld-faq");
      if (existing) existing.remove();
      document.head.appendChild(tag);
      return () => {
        const e = document.getElementById("ld-faq");
        if (e) e.remove();
      };
    }, []);
    return /* @__PURE__ */ React.createElement("main", { className: "home" }, /* @__PURE__ */ React.createElement("section", { className: "hero" }, /* @__PURE__ */ React.createElement("div", { className: "hero-bg" }, /* @__PURE__ */ React.createElement("img", { src: asset("images/hero.jpeg"), alt: t("Bateau South Boat dans une crique de l'Est\xE9rel \u2014 location de bateau \xE0 Mandelieu", "South Boat in an Est\xE9rel cove \u2014 boat rentals in Mandelieu"), fetchpriority: "high", decoding: "async" }), /* @__PURE__ */ React.createElement("div", { className: "hero-overlay hero-overlay-grad" })), /* @__PURE__ */ React.createElement("div", { className: "hero-content" }, /* @__PURE__ */ React.createElement("div", { className: "hero-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " ", t("C\xF4te d'Azur \xB7 Saison 2026", "French Riviera \xB7 2026 Season")), /* @__PURE__ */ React.createElement("h1", { className: "hero-title" }, t("Le large,", "The open sea,"), /* @__PURE__ */ React.createElement("br", null), t("en toute simplicit\xE9.", "made simple.")), /* @__PURE__ */ React.createElement("p", { className: "hero-sub" }, t(
      "Une s\xE9lection rigoureuse de bateaux familiaux au d\xE9part de Mandelieu. R\xE9servation transparente, \xE9quipage \xE0 la demande.",
      "A carefully curated selection of family boats departing from Mandelieu. Transparent booking, crew on demand."
    )), /* @__PURE__ */ React.createElement("div", { className: "hero-cta-row" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary", onClick: () => setPage({ name: "catalog" }), style: { borderRadius: 20 } }, t("D\xE9couvrir nos bateaux", "Discover our boats"), " ", /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 16 })))), /* @__PURE__ */ React.createElement("div", { className: "hero-stats" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "Mandelieu"), /* @__PURE__ */ React.createElement("span", null, t("Port de d\xE9part", "Departure port"))))), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-head", style: { color: "rgb(58, 141, 222)", borderRadius: "0px", fontFamily: "-apple-system" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, t("Notre flotte", "Our fleet")), /* @__PURE__ */ React.createElement("h2", null, t("S\xE9lection du moment", "Current selection"))), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", onClick: () => setPage({ name: "catalog" }) }, t("Voir tous les bateaux", "View all boats"), " ", /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 16 }))), /* @__PURE__ */ React.createElement("div", { className: "grid-3" }, featured.map(
      (b) => /* @__PURE__ */ React.createElement(BoatCard, { key: b.id, boat: b, onClick: () => setPage({ name: "detail", id: b.id }) })
    ))), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "value-grid" }, /* @__PURE__ */ React.createElement("div", { className: "value-card" }, /* @__PURE__ */ React.createElement("span", { className: "value-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: "shield" })), /* @__PURE__ */ React.createElement("h3", null, t("Bateaux v\xE9rifi\xE9s", "Verified boats")), /* @__PURE__ */ React.createElement("p", null, t(
      "Chaque embarcation est inspect\xE9e et certifi\xE9e par notre \xE9quipe avant toute mise en location.",
      "Each boat is inspected and certified by our team before being offered for rental."
    ))), /* @__PURE__ */ React.createElement("div", { className: "value-card" }, /* @__PURE__ */ React.createElement("span", { className: "value-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: "anchor" })), /* @__PURE__ */ React.createElement("h3", null, t("Skippers exp\xE9riment\xE9s", "Experienced skippers")), /* @__PURE__ */ React.createElement("p", null, t(
      "Optez pour un skipper local qui conna\xEEt chaque crique, chaque calanque, chaque coucher de soleil.",
      "Choose a local skipper who knows every cove, every calanque, every sunset."
    ))), /* @__PURE__ */ React.createElement("div", { className: "value-card" }, /* @__PURE__ */ React.createElement("span", { className: "value-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: "sparkle" })), /* @__PURE__ */ React.createElement("h3", null, t("Sans mauvaise surprise", "No nasty surprises")), /* @__PURE__ */ React.createElement("p", null, t(
      "Tarifs clairs, sans frais cach\xE9s. Annulation flexible et une \xE9quipe \xE0 votre \xE9coute pour vous accompagner avant chaque sortie.",
      "Clear pricing, no hidden fees. Flexible cancellation and a team on hand to support you before every outing."
    ))))), /* @__PURE__ */ React.createElement("section", { className: "section departure" }, /* @__PURE__ */ React.createElement("div", { className: "departure-card" }, /* @__PURE__ */ React.createElement("div", { className: "departure-text" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, t("Point de d\xE9part", "Departure point")), /* @__PURE__ */ React.createElement("h2", null, t("Quai visiteur de Mandelieu", "Mandelieu visitor dock")), /* @__PURE__ */ React.createElement("p", { className: "lead" }, t(
      "Le d\xE9part de toutes les locations se fait depuis le quai visiteur de Mandelieu \u2014 Port de Mandelieu. Notre \xE9quipe vous y accueille pour le briefing avant chaque sortie.",
      "All rentals depart from the Mandelieu visitor dock \u2014 Port de Mandelieu. Our team welcomes you there for a briefing before each outing."
    )), /* @__PURE__ */ React.createElement("div", { className: "departure-actions" }, /* @__PURE__ */ React.createElement(
      "a",
      {
        className: "btn btn-primary",
        href: "https://www.google.com/maps/search/?api=1&query=Port+de+Mandelieu+quai+visiteur",
        target: "_blank",
        rel: "noopener noreferrer"
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "pin", size: 16 }),
      " ",
      t("Ouvrir dans Google Maps", "Open in Google Maps")
    ), /* @__PURE__ */ React.createElement("span", { className: "departure-addr" }, /* @__PURE__ */ React.createElement(Icon, { name: "pin", size: 14 }), " Port de Mandelieu, 06210 Mandelieu-la-Napoule"))), /* @__PURE__ */ React.createElement("div", { className: "departure-map" }, /* @__PURE__ */ React.createElement(
      "iframe",
      {
        title: "Port de Mandelieu \u2014 quai visiteur",
        src: "https://www.google.com/maps?q=Port+de+Mandelieu+La+Napoule&output=embed",
        loading: "lazy",
        referrerPolicy: "no-referrer-when-downgrade",
        allowFullScreen: true
      }
    )))), latestArticle && /* @__PURE__ */ React.createElement("section", { className: "section capsud-feature" }, /* @__PURE__ */ React.createElement("div", { className: "section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, t("Cap Sud \xB7 Carnet de bord", "Cap Sud \xB7 Logbook")), /* @__PURE__ */ React.createElement("h2", null, t("Dernier article", "Latest article"))), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", onClick: () => setPage({ name: "capsud" }) }, t("Tous les articles", "All articles"), " ", /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 16 }))), /* @__PURE__ */ React.createElement("article", { className: "capsud-feature-card", onClick: () => setPage({ name: "capsud-article", id: latestArticle.id }) }, /* @__PURE__ */ React.createElement("div", { className: "capsud-feature-img" }, /* @__PURE__ */ React.createElement("img", { src: asset(latestArticle.cover), alt: latestArticle.title, loading: "lazy", decoding: "async" })), /* @__PURE__ */ React.createElement("div", { className: "capsud-feature-body" }, /* @__PURE__ */ React.createElement("span", { className: "capsud-date" }, fmtArticleDate(latestArticle.date)), /* @__PURE__ */ React.createElement("h3", null, latestArticle.title), /* @__PURE__ */ React.createElement("p", null, latestArticle.excerpt), /* @__PURE__ */ React.createElement("span", { className: "capsud-cta" }, t("Lire l'article", "Read the article"), " ", /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 15 }))))), /* @__PURE__ */ React.createElement("section", { className: "section dest" }, /* @__PURE__ */ React.createElement("div", { className: "section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, t("Destinations", "Destinations")), /* @__PURE__ */ React.createElement("h2", null, t("Les itin\xE9raires", "The itineraries")))), /* @__PURE__ */ React.createElement("div", { className: "dest-grid" }, [
      { id: "lerins", n: t("\xCEles de L\xE9rins", "L\xE9rins Islands"), img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", c: t("Baignade & d\xE9jeuner en mer", "Swimming & lunch at sea") },
      { id: "cap-antibes", n: t("Cap d'Antibes", "Cap d'Antibes"), img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=80", c: t("Villas & criques sauvages", "Villas & wild coves") },
      { id: "esterel", n: t("Calanques de l'Est\xE9rel", "Est\xE9rel calanques"), img: asset("images/itineraire-esterel.jpeg"), c: t("Calanques & roches rouges", "Coves & red rocks") }
    ].map(
      (d) => /* @__PURE__ */ React.createElement("button", { key: d.id, className: "dest-card", onClick: () => setPage({ name: "itinerary", id: d.id }) }, /* @__PURE__ */ React.createElement("img", { src: d.img, alt: d.n, loading: "lazy", decoding: "async" }), /* @__PURE__ */ React.createElement("div", { className: "dest-overlay" }), /* @__PURE__ */ React.createElement("div", { className: "dest-info" }, /* @__PURE__ */ React.createElement("h4", null, d.n), /* @__PURE__ */ React.createElement("span", null, d.c)))
    ))), /* @__PURE__ */ React.createElement("section", { className: "section faq" }, /* @__PURE__ */ React.createElement("div", { className: "section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, t("Questions fr\xE9quentes", "Frequently asked questions")), /* @__PURE__ */ React.createElement("h2", null, t("Tout savoir avant d'embarquer", "Everything you need before boarding")))), /* @__PURE__ */ React.createElement("div", { className: "faq-list", style: { maxWidth: 820 } }, FAQ_ITEMS.map((f, i) => {
      const isOpen = openFaq === i;
      return /* @__PURE__ */ React.createElement("div", { key: i, className: "faq-item" + (isOpen ? " open" : ""), style: { borderBottom: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: "faq-q",
          "aria-expanded": isOpen,
          onClick: () => setOpenFaq(isOpen ? -1 : i),
          style: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "18px 4px", background: "none", border: "none", cursor: "pointer", textAlign: "left", font: "inherit", color: "var(--ink)" }
        },
        /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600, fontSize: "1.02rem" } }, t(f.q_fr, f.q_en)),
        /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, transition: "transform .2s", transform: isOpen ? "rotate(45deg)" : "none" } }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 18 }))
      ), isOpen && /* @__PURE__ */ React.createElement("p", { className: "faq-a", style: { margin: "0 4px 18px", color: "var(--ink-soft)", lineHeight: 1.6 } }, t(f.a_fr, f.a_en)));
    }))), /* @__PURE__ */ React.createElement(Footer, null));
  }
  function BoatCard({ boat, onClick }) {
    const t = window.useT();
    if (boat.comingSoon) {
      return /* @__PURE__ */ React.createElement("article", { className: "boat-card coming-soon", "aria-disabled": "true" }, /* @__PURE__ */ React.createElement("div", { className: "boat-img" }, /* @__PURE__ */ React.createElement("img", { src: boat.images[0], alt: "", style: { filter: "blur(14px)", transform: "scale(1.1)" } }), /* @__PURE__ */ React.createElement("div", { className: "coming-soon-overlay" }, /* @__PURE__ */ React.createElement("span", { className: "coming-soon-badge" }, t("Coming Soon", "Coming Soon")), /* @__PURE__ */ React.createElement("span", { className: "coming-soon-sub" }, t("Bient\xF4t dans la flotte", "Coming to the fleet")))), /* @__PURE__ */ React.createElement("div", { className: "boat-body" }, /* @__PURE__ */ React.createElement("div", { className: "boat-row" }, /* @__PURE__ */ React.createElement("h3", { style: { opacity: 0.6 } }, t("Nouveau bateau", "New boat"))), /* @__PURE__ */ React.createElement("p", { className: "boat-meta" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(Icon, { name: "pin", size: 14 }), " Mandelieu"), /* @__PURE__ */ React.createElement("span", { className: "dot-sep" }, "\xB7"), /* @__PURE__ */ React.createElement("span", null, t("Disponible prochainement", "Available soon")))));
    }
    return /* @__PURE__ */ React.createElement("article", { className: "boat-card", onClick }, /* @__PURE__ */ React.createElement("div", { className: "boat-img" }, /* @__PURE__ */ React.createElement("img", { src: boat.images[0], alt: `${boat.name} - Location de bateau \xE0 Mandelieu sur la C\xF4te d'Azur`, loading: "lazy", decoding: "async" }), /* @__PURE__ */ React.createElement("div", { className: "boat-tag" }, boat.type)), /* @__PURE__ */ React.createElement("div", { className: "boat-body" }, /* @__PURE__ */ React.createElement("div", { className: "boat-row" }, /* @__PURE__ */ React.createElement("h3", null, boat.name)), /* @__PURE__ */ React.createElement("p", { className: "boat-meta" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(Icon, { name: "pin", size: 14 }), " ", boat.port), /* @__PURE__ */ React.createElement("span", { className: "dot-sep" }, "\xB7"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(Icon, { name: "users", size: 14 }), " ", boat.capacity, " ", t("pers.", "people")), /* @__PURE__ */ React.createElement("span", { className: "dot-sep" }, "\xB7"), /* @__PURE__ */ React.createElement("span", null, boat.length)), /* @__PURE__ */ React.createElement("div", { className: "boat-foot" }, /* @__PURE__ */ React.createElement("div", { className: "price" }, /* @__PURE__ */ React.createElement("strong", null, fmtPrice(boat.price)), /* @__PURE__ */ React.createElement("span", null, " ", t("/ jour", "/ day"))), /* @__PURE__ */ React.createElement("span", { className: "boat-cta" }, t("D\xE9couvrir", "Discover"), " ", /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 15 })))));
  }
  function CatalogPage({ setPage, query, setQuery }) {
    const t = window.useT();
    const available = BOATS.filter((b) => !b.comingSoon);
    const teasers = BOATS.filter((b) => b.comingSoon);
    const filtered = available;
    return /* @__PURE__ */ React.createElement("main", { className: "catalog" }, /* @__PURE__ */ React.createElement(Breadcrumb, { setPage, trail: [
      { label: t("Accueil", "Home"), page: { name: "home" } },
      { label: t("Catalogue", "Catalog") }
    ] }), /* @__PURE__ */ React.createElement("div", { className: "catalog-body single" }, /* @__PURE__ */ React.createElement("section", { className: "catalog-results", style: { width: "100%" } }, /* @__PURE__ */ React.createElement("div", { className: "catalog-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { style: { fontSize: "1.5rem", margin: 0 } }, t(`Location de bateaux \xE0 Mandelieu \u2014 ${filtered.length} bateau${filtered.length > 1 ? "x" : ""} disponible${filtered.length > 1 ? "s" : ""}`, `Boat rentals in Mandelieu \u2014 ${filtered.length} boat${filtered.length > 1 ? "s" : ""} available`)), /* @__PURE__ */ React.createElement("p", { className: "muted" }, t("Port de Mandelieu", "Port de Mandelieu")))), /* @__PURE__ */ React.createElement("div", { className: "grid-3" }, filtered.map(
      (b) => /* @__PURE__ */ React.createElement(BoatCard, { key: b.id, boat: b, onClick: () => setPage({ name: "detail", id: b.id }) })
    ), teasers.map(
      (b) => /* @__PURE__ */ React.createElement(BoatCard, { key: b.id, boat: b })
    ), filtered.length === 0 && teasers.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "empty" }, /* @__PURE__ */ React.createElement("p", null, t("Aucun bateau disponible pour le moment.", "No boats available at the moment.")))))), /* @__PURE__ */ React.createElement(Footer, null));
  }
  function DetailPage({ id, setPage }) {
    const t = window.useT();
    const boat = BOATS.find((b) => b.id === id);
    const [idx, setIdx] = useState(0);
    const [lightbox, setLightbox] = useState(false);
    useEffect(() => {
      if (!lightbox || !boat) return;
      const onKey = (e) => {
        if (e.key === "Escape") setLightbox(false);
        if (e.key === "ArrowRight") setIdx((i) => (i + 1) % boat.images.length);
        if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + boat.images.length) % boat.images.length);
      };
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }, [lightbox, boat]);
    if (!boat) return null;
    const openLightbox = (i) => {
      setIdx(i);
      setLightbox(true);
    };
    const sideImgs = boat.images.slice(1, 5);
    return /* @__PURE__ */ React.createElement("main", { className: "detail" }, /* @__PURE__ */ React.createElement(Breadcrumb, { setPage, trail: [
      { label: t("Accueil", "Home"), page: { name: "home" } },
      { label: t("Catalogue", "Catalog"), page: { name: "catalog" } },
      { label: boat.name }
    ] }), /* @__PURE__ */ React.createElement("div", { className: "detail-top" }, /* @__PURE__ */ React.createElement("button", { className: "back", onClick: () => setPage({ name: "catalog" }) }, /* @__PURE__ */ React.createElement(Icon, { name: "arrowL", size: 16 }), " ", t("Retour au catalogue", "Back to catalog"))), /* @__PURE__ */ React.createElement("section", { className: `gallery-mosaic side-${sideImgs.length}` }, /* @__PURE__ */ React.createElement("button", { className: "mosaic-main", onClick: () => openLightbox(0) }, /* @__PURE__ */ React.createElement("img", { src: boat.images[0], alt: `${boat.name} - Location bateau Mandelieu C\xF4te d'Azur, port et Est\xE9rel` })), /* @__PURE__ */ React.createElement("div", { className: "mosaic-side" }, sideImgs.map(
      (src, i) => /* @__PURE__ */ React.createElement("button", { key: i, className: "mosaic-cell", onClick: () => openLightbox(i + 1) }, /* @__PURE__ */ React.createElement("img", { src, alt: `${boat.name} - Photo ${i + 2} location bateau Mandelieu` }))
    )), /* @__PURE__ */ React.createElement("button", { className: "mosaic-viewall", onClick: () => openLightbox(0) }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "7", height: "7" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "3", width: "7", height: "7" }), /* @__PURE__ */ React.createElement("rect", { x: "3", y: "14", width: "7", height: "7" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "14", width: "7", height: "7" })), t(`Voir les ${boat.images.length} photos`, `View ${boat.images.length} photos`))), lightbox && /* @__PURE__ */ React.createElement("div", { className: "lightbox", onClick: () => setLightbox(false) }, /* @__PURE__ */ React.createElement("button", { className: "lightbox-close", onClick: () => setLightbox(false), "aria-label": t("Fermer", "Close") }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6L6 18M6 6l12 12" }))), /* @__PURE__ */ React.createElement("div", { className: "lightbox-counter" }, idx + 1, " / ", boat.images.length), /* @__PURE__ */ React.createElement("button", { className: "lightbox-arrow left", onClick: (e) => {
      e.stopPropagation();
      setIdx((idx - 1 + boat.images.length) % boat.images.length);
    }, "aria-label": t("Pr\xE9c\xE9dent", "Previous") }, /* @__PURE__ */ React.createElement(Icon, { name: "arrowL", size: 24 })), /* @__PURE__ */ React.createElement("img", { className: "lightbox-img", src: boat.images[idx], alt: `${boat.name} - Location bateau Mandelieu, photo ${idx + 1}`, onClick: (e) => e.stopPropagation() }), /* @__PURE__ */ React.createElement("button", { className: "lightbox-arrow right", onClick: (e) => {
      e.stopPropagation();
      setIdx((idx + 1) % boat.images.length);
    }, "aria-label": t("Suivant", "Next") }, /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 24 }))), /* @__PURE__ */ React.createElement("section", { className: "detail-body" }, /* @__PURE__ */ React.createElement("div", { className: "detail-main" }, /* @__PURE__ */ React.createElement("div", { className: "detail-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, boat.type, " \xB7 ", boat.port), /* @__PURE__ */ React.createElement("h1", null, boat.name), /* @__PURE__ */ React.createElement("div", { className: "detail-meta" }, /* @__PURE__ */ React.createElement("span", null, boat.length), /* @__PURE__ */ React.createElement("span", { className: "dot-sep" }, "\xB7"), /* @__PURE__ */ React.createElement("span", null, boat.capacity, " ", t("personnes", "people")), boat.designCategory && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "dot-sep" }, "\xB7"), /* @__PURE__ */ React.createElement("span", null, t("Cat\xE9gorie de conception : ", "Design category: "), boat.designCategory)), boat.enginePower && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "dot-sep" }, "\xB7"), /* @__PURE__ */ React.createElement("span", null, t("Motorisation : ", "Engine: "), boat.enginePower))))), /* @__PURE__ */ React.createElement("div", { className: "detail-section" }, /* @__PURE__ */ React.createElement("h3", null, t("\xC0 propos du bateau", "About this boat")), /* @__PURE__ */ React.createElement("p", { className: "lead" }, t(boat.description, boat.description_en || boat.description))), /* @__PURE__ */ React.createElement("div", { className: "detail-section" }, /* @__PURE__ */ React.createElement("h3", null, t("\xC9quipement", "Equipment")), /* @__PURE__ */ React.createElement("ul", { className: "features" }, boat.features.map(
      (f, i) => /* @__PURE__ */ React.createElement("li", { key: f }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 16 }), " ", boat.features_en && boat.features_en[i] ? t(f, boat.features_en[i]) : f)
    ))), /* @__PURE__ */ React.createElement("div", { className: "detail-section" }, /* @__PURE__ */ React.createElement("h3", null, t("Inclus dans la location", "Included with the rental")), /* @__PURE__ */ React.createElement("div", { className: "includes" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Icon, { name: "anchor" }), " ", t(boat.crew, boat.crew_en || boat.crew)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Icon, { name: "shield" }), " ", t("Assurance compl\xE8te", "Full insurance")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Icon, { name: "wave" }), " ", t("Briefing de s\xE9curit\xE9", "Safety briefing")))), /* @__PURE__ */ React.createElement("div", { className: "detail-section" }, /* @__PURE__ */ React.createElement("h3", null, t("Options \xE0 la carte", "Optional add-ons")), /* @__PURE__ */ React.createElement("div", { className: "includes" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Icon, { name: "sparkle" }), " ", t("Plateau de gourmandises", "Gourmet platter")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Icon, { name: "wave" }), " ", t("Bou\xE9e tract\xE9e", "Towed inflatable")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Icon, { name: "wave" }), " ", t("Wakeboard", "Wakeboard")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Icon, { name: "wave" }), " ", t("Paddle board", "Paddle board")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Icon, { name: "wave" }), " ", t("Accessoires snorkeling", "Snorkeling gear"))))), /* @__PURE__ */ React.createElement("aside", { className: "booking-card", style: { backgroundColor: "rgb(255, 255, 255)", borderRadius: "20px" } }, /* @__PURE__ */ React.createElement("div", { className: "bk-price" }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "var(--muted, #5b6b7a)", display: "block", marginBottom: 2 } }, t("\xC0 partir de", "From")), /* @__PURE__ */ React.createElement("strong", null, fmtPrice(boat.priceHalfDay || boat.price))), (boat.priceHalfDay || boat.deposit || boat.preAuth || boat.options && boat.options.length) && /* @__PURE__ */ React.createElement("div", { className: "bk-tariffs", style: { marginTop: 14, padding: "12px 14px", background: "var(--surface-2, #f4f8fb)", borderRadius: 14, fontSize: 13 } }, /* @__PURE__ */ React.createElement("h4", { style: { margin: "0 0 8px", fontSize: 13, textTransform: "uppercase", letterSpacing: 0.4, color: "var(--muted, #5b6b7a)" } }, t("Tarifs", "Pricing")), boat.price && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 0" } }, /* @__PURE__ */ React.createElement("span", null, t("Journ\xE9e", "Full day")), /* @__PURE__ */ React.createElement("strong", null, fmtPrice(boat.price))), boat.priceHalfDay && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 0" } }, /* @__PURE__ */ React.createElement("span", null, t("Demi-journ\xE9e", "Half day")), /* @__PURE__ */ React.createElement("strong", null, fmtPrice(boat.priceHalfDay))), boat.deposit && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 0" } }, /* @__PURE__ */ React.createElement("span", null, t("Acompte r\xE9servation", "Booking deposit")), /* @__PURE__ */ React.createElement("strong", null, fmtPrice(boat.deposit))), boat.preAuth && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 0" } }, /* @__PURE__ */ React.createElement("span", null, t("Pr\xE9-autorisation (caution)", "Pre-authorization (deposit hold)")), /* @__PURE__ */ React.createElement("strong", null, fmtPrice(boat.preAuth))), boat.options && boat.options.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { height: 1, background: "rgba(10,37,64,0.08)", margin: "8px 0" } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--muted, #5b6b7a)", marginBottom: 4 } }, t("Options", "Add-ons")), boat.options.map((o) => /* @__PURE__ */ React.createElement("div", { key: o.id, style: { display: "flex", justifyContent: "space-between", padding: "3px 0" } }, /* @__PURE__ */ React.createElement("span", null, t(o.label, o.label_en || o.label)), /* @__PURE__ */ React.createElement("strong", null, o.onRequest ? t("\xE0 partir de " + fmtPrice(o.price), "from " + fmtPrice(o.price)) : "+" + fmtPrice(o.price))))), /* @__PURE__ */ React.createElement("div", { style: { height: 1, background: "rgba(10,37,64,0.08)", margin: "8px 0" } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--muted, #5b6b7a)", fontStyle: "italic" } }, t("Carburant \xE0 la charge du client.", "Fuel at the client's expense."))), /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary btn-block", onClick: () => setPage({ name: "booking", id: boat.id }), style: { borderRadius: "20px", marginTop: 14 } }, t("R\xE9server ce bateau", "Book this boat")), /* @__PURE__ */ React.createElement("button", { className: "btn btn-outline btn-block", onClick: () => setPage({ name: "contact" }), style: { backgroundColor: "rgb(244, 248, 251)", borderRadius: "20px" } }, t("Contacter un conseiller", "Contact an advisor")), /* @__PURE__ */ React.createElement("ul", { className: "bk-list" }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 14 }), " ", t("Annulation gratuite jusqu'\xE0 7 jours", "Free cancellation up to 7 days")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 14 }), " ", t("Paiement s\xE9curis\xE9", "Secure payment"))))), /* @__PURE__ */ React.createElement(Footer, null));
  }
  function PayLogo({ brand }) {
    const wrap = { width: 38, height: 24, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
    if (brand === "cb") {
      return /* @__PURE__ */ React.createElement("span", { style: wrap }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 38 24", width: "38", height: "24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("rect", { x: "0.5", y: "0.5", width: "37", height: "23", rx: "3.5", fill: "#fff", stroke: "#d4dae0" }), /* @__PURE__ */ React.createElement("rect", { x: "0.5", y: "6", width: "37", height: "4", fill: "#0a2540" }), /* @__PURE__ */ React.createElement("rect", { x: "5", y: "14", width: "10", height: "2", rx: "0.5", fill: "#94a3b8" }), /* @__PURE__ */ React.createElement("rect", { x: "5", y: "18", width: "6", height: "1.5", rx: "0.5", fill: "#cbd5e0" })));
    }
    if (brand === "paypal") {
      return /* @__PURE__ */ React.createElement("span", { style: wrap }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 38 24", width: "38", height: "24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("rect", { x: "0.5", y: "0.5", width: "37", height: "23", rx: "3.5", fill: "#fff", stroke: "#d4dae0" }), /* @__PURE__ */ React.createElement("text", { x: "19", y: "16", textAnchor: "middle", fontFamily: "Helvetica, Arial, sans-serif", fontSize: "9", fontWeight: "700", fontStyle: "italic", fill: "#003087" }, "Pay", /* @__PURE__ */ React.createElement("tspan", { fill: "#009cde" }, "Pal"))));
    }
    if (brand === "applepay") {
      return /* @__PURE__ */ React.createElement("span", { style: wrap }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 38 24", width: "38", height: "24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("rect", { x: "0.5", y: "0.5", width: "37", height: "23", rx: "3.5", fill: "#000", stroke: "#000" }), /* @__PURE__ */ React.createElement("path", { d: "M10.5 10.6c-.3.4-.8.7-1.3.6-.1-.5.2-1 .5-1.4.3-.4.8-.7 1.3-.7.1.5-.1 1-.5 1.5zm.5.6c-.7 0-1.3.4-1.7.4-.4 0-.9-.4-1.5-.4-.8 0-1.5.4-1.9 1.2-.8 1.4-.2 3.5.6 4.6.4.5.8 1.1 1.4 1.1.6 0 .8-.4 1.5-.4.7 0 .9.4 1.5.4.6 0 1-.5 1.4-1.1.3-.4.5-.9.7-1.4-.8-.3-1.4-1.1-1.4-2 0-.8.4-1.5 1-1.9-.4-.5-1-.7-1.6-.5z", fill: "#fff" }), /* @__PURE__ */ React.createElement("text", { x: "15", y: "16.5", fontFamily: "Helvetica, Arial, sans-serif", fontSize: "8.5", fontWeight: "600", fill: "#fff" }, "Pay")));
    }
    if (brand === "paybybank") {
      return /* @__PURE__ */ React.createElement("span", { style: wrap }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 38 24", width: "38", height: "24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("rect", { x: "0.5", y: "0.5", width: "37", height: "23", rx: "3.5", fill: "#fff", stroke: "#d4dae0" }), /* @__PURE__ */ React.createElement("path", { d: "M19 5l-7 3.5v1h14v-1L19 5z", fill: "#0a2540" }), /* @__PURE__ */ React.createElement("rect", { x: "13", y: "11", width: "1.5", height: "6", fill: "#0a2540" }), /* @__PURE__ */ React.createElement("rect", { x: "17", y: "11", width: "1.5", height: "6", fill: "#0a2540" }), /* @__PURE__ */ React.createElement("rect", { x: "21", y: "11", width: "1.5", height: "6", fill: "#0a2540" }), /* @__PURE__ */ React.createElement("rect", { x: "25", y: "11", width: "1.5", height: "6", fill: "#0a2540" }), /* @__PURE__ */ React.createElement("rect", { x: "12", y: "18", width: "14", height: "1.2", fill: "#0a2540" })));
    }
    if (brand === "virement") {
      return /* @__PURE__ */ React.createElement("span", { style: wrap }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 38 24", width: "38", height: "24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("rect", { x: "0.5", y: "0.5", width: "37", height: "23", rx: "3.5", fill: "#fff", stroke: "#d4dae0" }), /* @__PURE__ */ React.createElement("path", { d: "M19 5l-7 3.5v1h14v-1L19 5z", fill: "#1a5a32" }), /* @__PURE__ */ React.createElement("rect", { x: "13", y: "11", width: "1.5", height: "6", fill: "#1a5a32" }), /* @__PURE__ */ React.createElement("rect", { x: "17", y: "11", width: "1.5", height: "6", fill: "#1a5a32" }), /* @__PURE__ */ React.createElement("rect", { x: "21", y: "11", width: "1.5", height: "6", fill: "#1a5a32" }), /* @__PURE__ */ React.createElement("rect", { x: "25", y: "11", width: "1.5", height: "6", fill: "#1a5a32" }), /* @__PURE__ */ React.createElement("rect", { x: "12", y: "18", width: "14", height: "1.2", fill: "#1a5a32" })));
    }
    return null;
  }
  var ITINERARIES = [
    { id: "lerins", name: "\xCEles de L\xE9rins", desc: "Sainte-Marguerite, baignade et d\xE9jeuner en mer.", name_en: "L\xE9rins Islands", desc_en: "Sainte-Marguerite, swim and lunch at sea." },
    { id: "cap-antibes", name: "Cap d'Antibes", desc: "Villas, criques sauvages et eaux turquoise.", name_en: "Cap d'Antibes", desc_en: "Villas, wild coves and turquoise waters." },
    { id: "esterel", name: "Calanques de l'Est\xE9rel", desc: "Roches rouges, eaux turquoise, snorkeling.", name_en: "Est\xE9rel calanques", desc_en: "Red rocks, turquoise waters, snorkeling." }
  ];
  var itName = (it, t) => t(it.name, it.name_en || it.name);
  var itDesc = (it, t) => t(it.desc, it.desc_en || it.desc);
  function CalDatePicker({ eventKey, value, onChange, t }) {
    const today = useMemo(() => {
      const d = /* @__PURE__ */ new Date();
      d.setHours(0, 0, 0, 0);
      return d;
    }, []);
    const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
    const [slots, setSlots] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
      if (!eventKey || !window.CalAPI) return;
      let cancelled = false;
      setLoading(true);
      setError("");
      window.CalAPI.fetchAvailableSlots(eventKey, view.y, view.m).then((s) => {
        if (!cancelled) setSlots(s);
      }).catch((e) => {
        if (!cancelled) setError(String(e.message || e));
      }).finally(() => {
        if (!cancelled) setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }, [eventKey, view.y, view.m]);
    const first = new Date(view.y, view.m, 1);
    const last = new Date(view.y, view.m + 1, 0);
    const startOff = (first.getDay() + 6) % 7;
    const cells = [];
    for (let i = 0; i < startOff; i++) cells.push(null);
    for (let i = 1; i <= last.getDate(); i++) cells.push(new Date(view.y, view.m, i));
    const monthName = first.toLocaleDateString(t.lang === "en" ? "en-US" : "fr-FR", { month: "long", year: "numeric" });
    const dayNames = t.lang === "en" ? ["M", "T", "W", "T", "F", "S", "S"] : ["L", "M", "M", "J", "V", "S", "D"];
    const navMonth = (delta) => {
      const m = view.m + delta;
      setView({ y: view.y + Math.floor(m / 12), m: (m % 12 + 12) % 12 });
    };
    const btnNav = { padding: "6px 12px", border: "1px solid #d4dae0", borderRadius: 8, background: "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: 14 };
    return /* @__PURE__ */ React.createElement("div", { style: { border: "1px solid #e5e7eb", borderRadius: 14, padding: 16, background: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => navMonth(-1), style: btnNav, "aria-label": t("Mois pr\xE9c\xE9dent", "Previous month") }, "\u2039"), /* @__PURE__ */ React.createElement("strong", { style: { textTransform: "capitalize", fontSize: 15 } }, monthName), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => navMonth(1), style: btnNav, "aria-label": t("Mois suivant", "Next month") }, "\u203A")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, fontSize: 11, color: "#5b6b7a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 } }, dayNames.map((d, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { textAlign: "center", padding: 4 } }, d))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 } }, cells.map((d, i) => {
      if (!d) return /* @__PURE__ */ React.createElement("div", { key: i });
      const iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      const isPast = d < today;
      const available = !!slots[iso] && !isPast;
      const selected = value === iso;
      const base = { padding: "10px 0", border: "1px solid transparent", borderRadius: 8, fontSize: 13, fontFamily: "inherit", textAlign: "center", transition: "all .15s" };
      let style;
      if (selected) style = { ...base, background: "#0a2540", color: "#fff", borderColor: "#0a2540", cursor: "pointer", fontWeight: 600 };
      else if (available) style = { ...base, background: "#f0f7ff", color: "#0a2540", borderColor: "#cfe2f5", cursor: "pointer" };
      else style = { ...base, background: "#fafbfc", color: "#b0bcc8", cursor: "not-allowed" };
      return /* @__PURE__ */ React.createElement("button", { key: i, type: "button", disabled: !available, onClick: () => onChange(iso, slots[iso]), style }, d.getDate());
    })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, display: "flex", gap: 14, fontSize: 11, color: "#5b6b7a" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 10, height: 10, borderRadius: 3, background: "#f0f7ff", border: "1px solid #cfe2f5", display: "inline-block" } }), t("Disponible", "Available")), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 10, height: 10, borderRadius: 3, background: "#fafbfc", border: "1px solid #e5e7eb", display: "inline-block" } }), t("Indisponible", "Unavailable"))), loading && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "#5b6b7a", marginTop: 10, marginBottom: 0 } }, t("Chargement des disponibilit\xE9s\u2026", "Loading availability\u2026")), error && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "#a83232", marginTop: 10, marginBottom: 0 } }, error));
  }
  function BookingPage({ id, setPage, initialDate, initialSlot }) {
    const t = window.useT();
    const boat = BOATS.find((b) => b.id === id) || BOATS[0];
    const [step, setStep] = useState(1);
    const [errorMsg, setErrorMsg] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const presetPeriod = initialSlot === "am" || initialSlot === "pm" ? initialSlot : "";
    const [data, setData] = useState({
      date: initialDate || "",
      slot: presetPeriod ? "halfday" : "day",
      period: presetPeriod,
      extras: [],
      adults: 2,
      children: 0,
      crew: "without",
      itinerary: "",
      billing: { firstName: "", lastName: "", birthdate: "", email: "", phone: "", address: "", permitNumber: "" },
      permitDifferent: false,
      permit: { firstName: "", lastName: "", birthdate: "", email: "", phone: "", address: "", permitNumber: "" },
      preAuthDone: false,
      paymentMethod: "",
      paymentDone: false,
      transferProof: null,
      // fichier joint (preuve de virement) — obligatoire si virement
      slotConfirmed: false,
      // case à cocher : "j'ai bien sélectionné mon créneau dans le calendrier"
      calStart: ""
      // ISO 8601 du créneau choisi via le picker (pour POST /book vers Cal.com)
    });
    const [bookingError, setBookingError] = useState("");
    const [bookingPending, setBookingPending] = useState(false);
    const allExtras = boat.options && boat.options.length > 0 ? boat.options : [
      { id: "lunch", label: "Plateau-repas chef (par pers.)", price: 65 },
      { id: "snorkel", label: "Pack snorkeling (4 pers.)", price: 80 }
    ];
    const extras = allExtras.filter((o) => !o.slotOnly || o.slotOnly === data.slot);
    const toggleExtra = (x) => setData((d) => ({ ...d, extras: d.extras.includes(x) ? d.extras.filter((e) => e !== x) : [...d.extras, x] }));
    const { total, deposit, preAuth, base, extrasCost, skipperCost } = useMemo(() => {
      const dayPrice = boat.price || 0;
      const halfPrice = boat.priceHalfDay || Math.round(dayPrice * 0.6);
      const base2 = data.slot === "halfday" ? halfPrice : dayPrice;
      const extrasCost2 = data.extras.reduce((sum, eId) => {
        const ex = extras.find((x) => x.id === eId);
        if (!ex) return sum;
        if (ex.onRequest) return sum;
        if (ex.id === "lunch") return sum + ex.price * (data.adults + data.children);
        return sum + ex.price;
      }, 0);
      const skipperCost2 = data.crew === "with" ? data.slot === "halfday" ? 150 : 200 : 0;
      const total2 = base2 + extrasCost2 + skipperCost2;
      const deposit2 = boat.deposit != null ? boat.deposit : Math.round(total2 * 0.3);
      const preAuth2 = boat.preAuth != null ? boat.preAuth : 2e3;
      return { total: total2, deposit: deposit2, preAuth: preAuth2, base: base2, extrasCost: extrasCost2, skipperCost: skipperCost2 };
    }, [boat, data]);
    const steps = [
      t("Cr\xE9neau", "Time slot"),
      t("Options", "Options"),
      t("R\xE9capitulatif", "Summary"),
      t("Coordonn\xE9es", "Contact info"),
      t("Pr\xE9-autorisation", "Pre-authorization"),
      t("Paiement", "Payment"),
      t("Confirmation", "Confirmation")
    ];
    const validateStep = () => {
      setErrorMsg("");
      setFieldErrors({});
      if (step === 1) {
        if (!data.slot) {
          setErrorMsg(t("Veuillez choisir un type de cr\xE9neau.", "Please select a slot type."));
          return false;
        }
        if (data.slot === "halfday" && !data.period) {
          setErrorMsg(t("Veuillez choisir Matin ou Apr\xE8s-midi.", "Please choose Morning or Afternoon."));
          return false;
        }
        if (!data.date) {
          setErrorMsg(t("Veuillez choisir une date de r\xE9servation.", "Please choose a booking date."));
          return false;
        }
        if (!data.slotConfirmed) {
          setErrorMsg(t("Veuillez confirmer que vous avez s\xE9lectionn\xE9 votre cr\xE9neau dans le calendrier.", "Please confirm you have selected your slot in the calendar."));
          return false;
        }
      }
      if (step === 2) {
        if (data.adults < 1) {
          setErrorMsg(t("Au moins 1 adulte requis.", "At least 1 adult required."));
          return false;
        }
        if (data.adults + data.children > boat.capacity) {
          setErrorMsg(t("Capacit\xE9 maximale du bateau d\xE9pass\xE9e (" + boat.capacity + ").", "Boat maximum capacity exceeded (" + boat.capacity + ")."));
          return false;
        }
        if (data.crew === "with" && !data.itinerary) {
          setErrorMsg(t("Veuillez choisir un itin\xE9raire.", "Please choose an itinerary."));
          return false;
        }
      }
      if (step === 4) {
        const errs = {};
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        ["firstName", "lastName", "birthdate", "email", "phone", "address"].forEach((k) => {
          if (!data.billing[k] || !String(data.billing[k]).trim()) errs["billing." + k] = "Champ requis";
        });
        if (data.billing.email && !emailRe.test(data.billing.email)) errs["billing.email"] = "Email invalide";
        if (!data.permitDifferent && (!data.billing.permitNumber || !String(data.billing.permitNumber).trim())) {
          if (data.crew === "without") errs["billing.permitNumber"] = "Champ requis";
        }
        if (data.permitDifferent) {
          ["firstName", "lastName", "birthdate", "email", "phone", "address", "permitNumber"].forEach((k) => {
            if (!data.permit[k] || !String(data.permit[k]).trim()) errs["permit." + k] = "Champ requis";
          });
          if (data.permit.email && !emailRe.test(data.permit.email)) errs["permit.email"] = "Email invalide";
        }
        if (Object.keys(errs).length) {
          setFieldErrors(errs);
          setErrorMsg(t("Veuillez compl\xE9ter les champs requis.", "Please complete the required fields."));
          const firstKey = Object.keys(errs)[0];
          setTimeout(() => {
            const el = document.querySelector('[data-fkey="' + firstKey + '"]');
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
              el.focus && el.focus();
            }
          }, 50);
          return false;
        }
      }
      if (step === 5) {
        if (!data.preAuthDone) {
          setErrorMsg(t("Merci d'effectuer la pr\xE9-autorisation bancaire avant de continuer.", "Please complete the bank pre-authorization before continuing."));
          return false;
        }
      }
      if (step === 6) {
        if (!data.paymentDone) {
          setErrorMsg(t("Merci de finaliser le paiement de l'acompte avant de continuer.", "Please finalize the deposit payment before continuing."));
          return false;
        }
      }
      return true;
    };
    const goNext = async () => {
      if (!validateStep()) return;
      if (step === 6) {
        if (!data.calStart) {
          setErrorMsg(t("Cr\xE9neau introuvable. Revenez \xE0 l'\xE9tape 1 et res\xE9lectionnez la date.", "Slot not found. Go back to step 1 and reselect the date."));
          return;
        }
        const eventKey = data.slot === "day" ? "fullday" : data.period === "pm" ? "halfday-pm" : "halfday-am";
        const fullName = (data.billing.firstName + " " + data.billing.lastName).trim() || data.billing.email;
        setBookingPending(true);
        setBookingError("");
        const res = await window.CalAPI.createBooking({
          event: eventKey,
          start: data.calStart,
          name: fullName,
          email: data.billing.email,
          phone: data.billing.phone,
          metadata: {
            boat: boat.name,
            boatId: boat.id,
            slot: data.slot,
            period: data.period,
            adults: data.adults,
            children: data.children,
            crew: data.crew,
            paymentMethod: data.paymentMethod
          }
        });
        setBookingPending(false);
        if (!res.ok) {
          setBookingError(res.error || t("Impossible de r\xE9server le cr\xE9neau dans Cal.com.", "Could not book the slot in Cal.com."));
          setErrorMsg(t("Le cr\xE9neau n'a pas pu \xEAtre bloqu\xE9. Essayez une autre date.", "The slot could not be locked. Try another date."));
          return;
        }
        if (data.transferProof && data.paymentMethod === "virement") {
          try {
            const formData = new FormData();
            formData.append("access_key", "867b6825-3025-4db9-88a7-56b7f25342f8");
            formData.append("subject", `[South Boat] Justificatif de virement \u2014 ${boat.name} \u2014 ${fullName}`);
            formData.append("from_name", fullName);
            formData.append("email", data.billing.email);
            formData.append(
              "message",
              `Nouveau justificatif de virement re\xE7u.

Bateau : ${boat.name}
Date : ${data.calStart}
Cr\xE9neau : ${data.slot === "day" ? "Journ\xE9e" : "Demi-journ\xE9e (" + data.period + ")"}
Adultes : ${data.adults} \u2014 Enfants : ${data.children}
Skipper : ${data.crew === "with" ? "Oui" : "Non"}

Client : ${fullName}
Email : ${data.billing.email}
T\xE9l : ${data.billing.phone}
`
            );
            formData.append("attachment", data.transferProof, data.transferProof.name);
            await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
          } catch (_) {
          }
        }
      }
      setStep((s) => Math.min(7, s + 1));
      setErrorMsg("");
      setFieldErrors({});
    };
    const goPrev = () => {
      setErrorMsg("");
      setFieldErrors({});
      setStep((s) => Math.max(1, s - 1));
    };
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [step]);
    const setBilling = (k, v) => setData((d) => ({ ...d, billing: { ...d.billing, [k]: v } }));
    const setPermit = (k, v) => setData((d) => ({ ...d, permit: { ...d.permit, [k]: v } }));
    const selectedItinerary = ITINERARIES.find((i) => i.id === data.itinerary);
    const showSidebar = step < 6;
    if (id === void 0 || id === null) {
      return /* @__PURE__ */ React.createElement("main", { className: "booking" }, /* @__PURE__ */ React.createElement("section", { className: "step-card" }, /* @__PURE__ */ React.createElement("h2", null, t("Choisissez votre bateau", "Choose your boat")), /* @__PURE__ */ React.createElement("div", { className: "grid-3", style: { marginTop: 16 } }, BOATS.map((b) => /* @__PURE__ */ React.createElement(BoatCard, { key: b.id, boat: b, onClick: () => setPage({ name: "booking", id: b.id }) })))), /* @__PURE__ */ React.createElement(Footer, null));
    }
    return /* @__PURE__ */ React.createElement("main", { className: "booking" }, /* @__PURE__ */ React.createElement(Breadcrumb, { setPage, trail: [
      { label: t("Accueil", "Home"), page: { name: "home" } },
      { label: t("Catalogue", "Catalog"), page: { name: "catalog" } },
      { label: boat.name, page: { name: "detail", id: boat.id } },
      { label: t("R\xE9servation", "Booking") }
    ] }), /* @__PURE__ */ React.createElement("div", { className: "detail-top" }, /* @__PURE__ */ React.createElement("button", { className: "back", onClick: () => setPage({ name: "detail", id: boat.id }) }, /* @__PURE__ */ React.createElement(Icon, { name: "arrowL", size: 16 }), " ", t("Retour \xE0 la fiche bateau", "Back to boat details"))), /* @__PURE__ */ React.createElement("div", { className: "booking-grid" }, /* @__PURE__ */ React.createElement("div", { className: "booking-main" }, /* @__PURE__ */ React.createElement("div", { className: "tunnel-stepper" }, steps.map((s, i) => {
      const stepNum = i + 1;
      const canJump = stepNum < step && stepNum < 6;
      const cls = "step" + (step > stepNum ? " done" : "") + (step === stepNum ? " active" : "") + (canJump ? " clickable" : "");
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: i,
          type: "button",
          className: cls,
          onClick: canJump ? () => {
            setErrorMsg("");
            setFieldErrors({});
            setStep(stepNum);
          } : void 0,
          disabled: !canJump,
          "aria-current": step === stepNum ? "step" : void 0
        },
        /* @__PURE__ */ React.createElement("span", { className: "step-num" }, step > stepNum ? /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 14 }) : stepNum),
        /* @__PURE__ */ React.createElement("span", { className: "step-label" }, s)
      );
    })), step === 1 && (() => {
      const eventKey = data.slot === "day" ? "fullday" : data.period === "pm" ? "halfday-pm" : "halfday-am";
      const pickerReady = data.slot === "day" || data.slot === "halfday" && !!data.period;
      return /* @__PURE__ */ React.createElement("section", { className: "step-card" }, /* @__PURE__ */ React.createElement("h2", null, t("Choisissez votre cr\xE9neau", "Choose your time slot")), /* @__PURE__ */ React.createElement("h3", { className: "sub", style: { marginTop: 8 } }, t("Type de cr\xE9neau", "Slot type")), /* @__PURE__ */ React.createElement("div", { className: "seg two", style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: "seg-btn" + (data.slot === "halfday" ? " active" : ""),
          onClick: () => setData({ ...data, slot: "halfday", period: data.period || "am", extras: data.extras.filter((eId) => {
            const ex = allExtras.find((x) => x.id === eId);
            return !ex || !ex.slotOnly || ex.slotOnly === "halfday";
          }) })
        },
        /* @__PURE__ */ React.createElement("strong", null, t("Demi-journ\xE9e", "Half day")),
        /* @__PURE__ */ React.createElement("span", null, "4h \xB7 ", fmtPrice(boat.priceHalfDay || Math.round(boat.price * 0.6)))
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: "seg-btn" + (data.slot === "day" ? " active" : ""),
          onClick: () => setData({ ...data, slot: "day", period: "", extras: data.extras.filter((eId) => {
            const ex = allExtras.find((x) => x.id === eId);
            return !ex || !ex.slotOnly || ex.slotOnly === "day";
          }) })
        },
        /* @__PURE__ */ React.createElement("strong", null, t("Journ\xE9e compl\xE8te", "Full day")),
        /* @__PURE__ */ React.createElement("span", null, "9h \u2014 18h \xB7 ", fmtPrice(boat.price))
      )), data.slot === "halfday" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h3", { className: "sub", style: { marginTop: 16 } }, t("Horaire de la demi-journ\xE9e", "Half-day time")), /* @__PURE__ */ React.createElement("div", { className: "seg two", style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: "seg-btn" + (data.period === "am" ? " active" : ""),
          onClick: () => setData({ ...data, slot: "halfday", period: "am" })
        },
        /* @__PURE__ */ React.createElement("strong", null, t("Matin", "Morning")),
        /* @__PURE__ */ React.createElement("span", null, "9h \u2014 13h")
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: "seg-btn" + (data.period === "pm" ? " active" : ""),
          onClick: () => setData({ ...data, slot: "halfday", period: "pm" })
        },
        /* @__PURE__ */ React.createElement("strong", null, t("Apr\xE8s-midi", "Afternoon")),
        /* @__PURE__ */ React.createElement("span", null, "14h \u2014 18h")
      ))), pickerReady ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h3", { className: "sub", style: { marginTop: 20 } }, t("Choisissez votre date", "Choose your date")), /* @__PURE__ */ React.createElement(
        CalDatePicker,
        {
          eventKey,
          value: data.date,
          onChange: (iso, startISO) => setData({ ...data, date: iso, calStart: startISO || "", slotConfirmed: true }),
          t
        }
      ), data.date && /* @__PURE__ */ React.createElement("div", { style: { background: "#f0f7ff", border: "1px solid #cfe2f5", borderLeft: "3px solid #0a2540", padding: "12px 16px", borderRadius: 8, marginTop: 14, fontSize: 14, color: "#0a2540" } }, /* @__PURE__ */ React.createElement("strong", null, t("Cr\xE9neau s\xE9lectionn\xE9", "Selected slot"), " :"), " ", fmtLong(data.date, t.lang), " \xB7 ", data.slot === "day" ? t("Journ\xE9e compl\xE8te (9h \u2014 18h)", "Full day (9am \u2014 6pm)") : data.period === "pm" ? t("Apr\xE8s-midi (14h \u2014 18h)", "Afternoon (2pm \u2014 6pm)") : t("Matin (9h \u2014 13h)", "Morning (9am \u2014 1pm)"))) : /* @__PURE__ */ React.createElement("div", { style: { background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #0a2540", padding: "12px 16px", borderRadius: 8, marginTop: 16, color: "#3b4a5a", fontSize: 13 } }, t("Choisissez d'abord le type de cr\xE9neau (et l'horaire pour une demi-journ\xE9e) pour afficher les dates disponibles.", "First select the slot type (and time for a half day) to view available dates.")));
    })(), step === 2 && /* @__PURE__ */ React.createElement("section", { className: "step-card" }, /* @__PURE__ */ React.createElement("h2", null, t("Options & participants", "Options & guests")), /* @__PURE__ */ React.createElement("h3", { className: "sub" }, t("Options", "Add-ons")), /* @__PURE__ */ React.createElement("div", { className: "extras" }, extras.map((x) => {
      const enLabelMap = { buoy: "Towed inflatable", wake: "Wakeboard", paddle: "Paddle board", lunch: "Chef-prepared lunch (per person)", snorkel: "Snorkeling gear", "aperitif-halfday": "Gourmet aperitif + drink" };
      let priceLabel;
      if (x.onRequest) {
        priceLabel = t("Sur demande", "On request");
      } else {
        priceLabel = "+" + x.price + " \u20AC";
      }
      const note = x.pricingNote ? t(x.pricingNote, x.pricingNote_en || x.pricingNote) : null;
      return /* @__PURE__ */ React.createElement("label", { key: x.id, className: "extra" + (data.extras.includes(x.id) ? " active" : "") }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: data.extras.includes(x.id), onChange: () => toggleExtra(x.id) }), /* @__PURE__ */ React.createElement("span", { className: "extra-check" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "extra-label" }, t(x.label, enLabelMap[x.id] || x.label), note && /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontSize: 12, color: "#6b7280", marginTop: 2 } }, note)), /* @__PURE__ */ React.createElement("span", { className: "extra-price" }, priceLabel));
    })), /* @__PURE__ */ React.createElement("h3", { className: "sub" }, t("Participants", "Guests")), /* @__PURE__ */ React.createElement("div", { className: "participants-row" }, /* @__PURE__ */ React.createElement("div", { className: "stepper" }, /* @__PURE__ */ React.createElement("span", { className: "stepper-label" }, t("Adultes", "Adults")), /* @__PURE__ */ React.createElement("button", { onClick: () => setData({ ...data, adults: Math.max(1, data.adults - 1) }) }, /* @__PURE__ */ React.createElement(Icon, { name: "minus", size: 14 })), /* @__PURE__ */ React.createElement("span", null, data.adults), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      if (data.adults + data.children < boat.capacity) setData({ ...data, adults: data.adults + 1 });
    } }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 14 }))), /* @__PURE__ */ React.createElement("div", { className: "stepper" }, /* @__PURE__ */ React.createElement("span", { className: "stepper-label" }, t("Enfants", "Children")), /* @__PURE__ */ React.createElement("button", { onClick: () => setData({ ...data, children: Math.max(0, data.children - 1) }) }, /* @__PURE__ */ React.createElement(Icon, { name: "minus", size: 14 })), /* @__PURE__ */ React.createElement("span", null, data.children), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      if (data.adults + data.children < boat.capacity) setData({ ...data, children: data.children + 1 });
    } }, /* @__PURE__ */ React.createElement(Icon, { name: "plus", size: 14 })))), /* @__PURE__ */ React.createElement("div", { style: { background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #0a2540", padding: "10px 14px", borderRadius: 4, margin: "12px 0", color: "#3b4a5a", fontSize: 13 } }, t(`Les enfants sont sous la responsabilit\xE9 des adultes. Capacit\xE9 maximale du bateau : ${boat.capacity} personnes.`, `Children are under the responsibility of accompanying adults. Boat maximum capacity: ${boat.capacity} people.`)), /* @__PURE__ */ React.createElement("h3", { className: "sub" }, t("Skipper", "Skipper")), /* @__PURE__ */ React.createElement("div", { className: "seg two" }, /* @__PURE__ */ React.createElement("button", { className: "seg-btn" + (data.crew === "without" ? " active" : ""), onClick: () => setData({ ...data, crew: "without", itinerary: "" }) }, /* @__PURE__ */ React.createElement("strong", null, t("Sans skipper", "Without skipper")), /* @__PURE__ */ React.createElement("span", null, t("Permis bateau requis", "Boating license required"))), /* @__PURE__ */ React.createElement("button", { className: "seg-btn" + (data.crew === "with" ? " active" : ""), onClick: () => setData({ ...data, crew: "with" }) }, /* @__PURE__ */ React.createElement("strong", null, t("Avec skipper", "With skipper")), /* @__PURE__ */ React.createElement("span", null, t("+150 \u20AC demi-journ\xE9e \xB7 +200 \u20AC journ\xE9e", "+\u20AC150 half day \xB7 +\u20AC200 full day")))), /* @__PURE__ */ React.createElement("h3", { className: "sub" }, data.crew === "with" ? t("Itin\xE9raire", "Itinerary") : t("Destinations possibles", "Possible destinations")), /* @__PURE__ */ React.createElement("div", { className: "itinerary-list" }, ITINERARIES.map((it) => {
      const selectable = data.crew === "with";
      return /* @__PURE__ */ React.createElement("div", { key: it.id, style: { display: "flex", alignItems: "stretch", gap: 8 } }, selectable ? /* @__PURE__ */ React.createElement("label", { className: "itinerary-item" + (data.itinerary === it.id ? " active" : ""), style: { flex: 1 } }, /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "radio",
          name: "itinerary",
          checked: data.itinerary === it.id,
          onChange: () => setData({ ...data, itinerary: it.id })
        }
      ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, itName(it, t)), /* @__PURE__ */ React.createElement("span", { className: "muted", style: { display: "block", fontSize: 13 } }, itDesc(it, t)))) : /* @__PURE__ */ React.createElement("div", { className: "itinerary-item", style: { flex: 1, cursor: "default" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, itName(it, t)), /* @__PURE__ */ React.createElement("span", { className: "muted", style: { display: "block", fontSize: 13 } }, itDesc(it, t)))), /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: "btn btn-outline",
          onClick: () => setPage({ name: "itinerary", id: it.id }),
          style: { whiteSpace: "nowrap", alignSelf: "center", padding: "8px 14px" }
        },
        t("Plus d'info", "More info")
      ));
    })), data.crew === "without" && /* @__PURE__ */ React.createElement("div", { style: { background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #a83232", padding: "10px 14px", borderRadius: 4, color: "#7a1f1f", marginTop: 12, fontSize: 13 } }, t("Un permis bateau valable est obligatoire. Seul le titulaire du permis sera habilit\xE9 \xE0 conduire le bateau.", "A valid boating license is mandatory. Only the license holder will be allowed to operate the boat."))), step === 3 && /* @__PURE__ */ React.createElement("section", { className: "step-card" }, /* @__PURE__ */ React.createElement("h2", null, t("R\xE9capitulatif", "Summary")), /* @__PURE__ */ React.createElement("div", { className: "recap" }, /* @__PURE__ */ React.createElement("div", { className: "recap-row", style: { alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", null, t("Bateau", "Boat")), /* @__PURE__ */ React.createElement("strong", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("img", { src: boat.images[0], alt: boat.name, style: { width: 56, height: 40, objectFit: "cover", borderRadius: 6 } }), boat.name, " ", /* @__PURE__ */ React.createElement("span", { className: "muted", style: { fontWeight: 400 } }, "\xB7 ", boat.port))), /* @__PURE__ */ React.createElement("div", { className: "recap-row" }, /* @__PURE__ */ React.createElement("span", null, t("Date", "Date")), /* @__PURE__ */ React.createElement("strong", null, data.date ? fmtLong(data.date, t.lang) : "\u2014")), /* @__PURE__ */ React.createElement("div", { className: "recap-row" }, /* @__PURE__ */ React.createElement("span", null, t("Cr\xE9neau", "Time slot")), /* @__PURE__ */ React.createElement("strong", null, labelSlot(data.slot, t))), /* @__PURE__ */ React.createElement("div", { className: "recap-row" }, /* @__PURE__ */ React.createElement("span", null, t("Adultes / Enfants", "Adults / Children")), /* @__PURE__ */ React.createElement("strong", null, data.adults, " ", t(data.adults > 1 ? "adultes" : "adulte", data.adults > 1 ? "adults" : "adult"), data.children ? " \xB7 " + data.children + " " + t(data.children > 1 ? "enfants" : "enfant", data.children > 1 ? "children" : "child") : "")), data.crew === "with" && selectedItinerary && /* @__PURE__ */ React.createElement("div", { className: "recap-row" }, /* @__PURE__ */ React.createElement("span", null, t("Itin\xE9raire", "Itinerary")), /* @__PURE__ */ React.createElement("strong", null, itName(selectedItinerary, t))), /* @__PURE__ */ React.createElement("div", { className: "recap-row" }, /* @__PURE__ */ React.createElement("span", null, t("Skipper", "Skipper")), /* @__PURE__ */ React.createElement("strong", null, data.crew === "with" ? t(`Inclus (+${skipperCost} \u20AC)`, `Included (+\u20AC${skipperCost})`) : t("Sans skipper", "Without skipper"))), /* @__PURE__ */ React.createElement("div", { className: "recap-row" }, /* @__PURE__ */ React.createElement("span", null, t("Tarif base", "Base price")), /* @__PURE__ */ React.createElement("strong", null, fmtPrice(base))), data.extras.map((eId) => {
      const ex = extras.find((x) => x.id === eId);
      if (!ex) return null;
      const cost = ex.id === "lunch" ? ex.price * (data.adults + data.children) : ex.price;
      return /* @__PURE__ */ React.createElement("div", { className: "recap-row", key: eId }, /* @__PURE__ */ React.createElement("span", null, t(ex.label, { buoy: "Towed inflatable", wake: "Wakeboard", lunch: "Chef-prepared lunch (per person)", snorkel: "Snorkeling pack (4 people)" }[ex.id] || ex.label)), /* @__PURE__ */ React.createElement("strong", null, "+", fmtPrice(cost)));
    }), /* @__PURE__ */ React.createElement("div", { className: "recap-row total" }, /* @__PURE__ */ React.createElement("span", null, t("Total", "Total")), /* @__PURE__ */ React.createElement("strong", null, fmtPrice(total))))), step === 4 && /* @__PURE__ */ React.createElement("section", { className: "step-card" }, /* @__PURE__ */ React.createElement("h2", null, t("Vos coordonn\xE9es", "Your contact info")), /* @__PURE__ */ React.createElement("h3", { className: "sub" }, t("Personne qui r\xE9serve (facturation)", "Person booking (billing)")), /* @__PURE__ */ React.createElement("div", { className: "form-grid" }, /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, t("Pr\xE9nom", "First name")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "billing.firstName", type: "text", value: data.billing.firstName, onChange: (e) => setBilling("firstName", e.target.value) }), fieldErrors["billing.firstName"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["billing.firstName"], "Required"))), /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, t("Nom", "Last name")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "billing.lastName", type: "text", value: data.billing.lastName, onChange: (e) => setBilling("lastName", e.target.value) }), fieldErrors["billing.lastName"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["billing.lastName"], "Required"))), /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, t("Date de naissance", "Date of birth")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "billing.birthdate", type: "date", value: data.billing.birthdate, onChange: (e) => setBilling("birthdate", e.target.value) }), /* @__PURE__ */ React.createElement("small", { style: { color: "var(--muted, #5b6b7a)" } }, t("Minimum 20 ans.", "Minimum age: 20.")), fieldErrors["billing.birthdate"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["billing.birthdate"], "Required"))), /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, t("Email", "Email")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "billing.email", type: "email", value: data.billing.email, onChange: (e) => setBilling("email", e.target.value) }), fieldErrors["billing.email"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["billing.email"], fieldErrors["billing.email"] === "Email invalide" ? "Invalid email" : "Required"))), /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, t("T\xE9l\xE9phone", "Phone")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "billing.phone", type: "tel", value: data.billing.phone, onChange: (e) => setBilling("phone", e.target.value) }), fieldErrors["billing.phone"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["billing.phone"], "Required"))), /* @__PURE__ */ React.createElement("label", { className: "field full" }, /* @__PURE__ */ React.createElement("span", null, t("Adresse postale", "Postal address")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "billing.address", type: "text", value: data.billing.address, onChange: (e) => setBilling("address", e.target.value) }), fieldErrors["billing.address"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["billing.address"], "Required"))), !data.permitDifferent && /* @__PURE__ */ React.createElement("label", { className: "field full" }, /* @__PURE__ */ React.createElement("span", null, t("Num\xE9ro de permis bateau", "Boating license number"), " ", data.crew === "without" ? t("(obligatoire)", "(required)") : t("(si applicable)", "(if applicable)")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "billing.permitNumber", type: "text", value: data.billing.permitNumber || "", onChange: (e) => setBilling("permitNumber", e.target.value) }), fieldErrors["billing.permitNumber"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["billing.permitNumber"], "Required")))), /* @__PURE__ */ React.createElement("label", { className: "field", style: { marginTop: 16, flexDirection: "row", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: data.permitDifferent, onChange: (e) => setData({ ...data, permitDifferent: e.target.checked }) }), /* @__PURE__ */ React.createElement("span", null, t("Le chef de bord (titulaire du permis) est une autre personne", "The skipper (license holder) is a different person"))), data.permitDifferent && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h3", { className: "sub" }, t("Chef de bord (titulaire du permis bateau)", "Skipper (boating license holder)")), /* @__PURE__ */ React.createElement("div", { className: "form-grid" }, /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, t("Pr\xE9nom", "First name")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "permit.firstName", type: "text", value: data.permit.firstName, onChange: (e) => setPermit("firstName", e.target.value) }), fieldErrors["permit.firstName"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["permit.firstName"], "Required"))), /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, t("Nom", "Last name")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "permit.lastName", type: "text", value: data.permit.lastName, onChange: (e) => setPermit("lastName", e.target.value) }), fieldErrors["permit.lastName"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["permit.lastName"], "Required"))), /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, t("Date de naissance", "Date of birth")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "permit.birthdate", type: "date", value: data.permit.birthdate, onChange: (e) => setPermit("birthdate", e.target.value) }), fieldErrors["permit.birthdate"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["permit.birthdate"], "Required"))), /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, t("Email", "Email")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "permit.email", type: "email", value: data.permit.email, onChange: (e) => setPermit("email", e.target.value) }), fieldErrors["permit.email"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["permit.email"], fieldErrors["permit.email"] === "Email invalide" ? "Invalid email" : "Required"))), /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, t("T\xE9l\xE9phone", "Phone")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "permit.phone", type: "tel", value: data.permit.phone, onChange: (e) => setPermit("phone", e.target.value) }), fieldErrors["permit.phone"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["permit.phone"], "Required"))), /* @__PURE__ */ React.createElement("label", { className: "field full" }, /* @__PURE__ */ React.createElement("span", null, t("Adresse", "Address")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "permit.address", type: "text", value: data.permit.address, onChange: (e) => setPermit("address", e.target.value) }), fieldErrors["permit.address"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["permit.address"], "Required"))), /* @__PURE__ */ React.createElement("label", { className: "field full" }, /* @__PURE__ */ React.createElement("span", null, t("Num\xE9ro de permis bateau", "Boating license number")), /* @__PURE__ */ React.createElement("input", { "data-fkey": "permit.permitNumber", type: "text", value: data.permit.permitNumber, onChange: (e) => setPermit("permitNumber", e.target.value) }), fieldErrors["permit.permitNumber"] && /* @__PURE__ */ React.createElement("small", { style: { color: "#c00" } }, t(fieldErrors["permit.permitNumber"], "Required")))))), step === 5 && /* @__PURE__ */ React.createElement("section", { className: "step-card" }, /* @__PURE__ */ React.createElement("h2", null, t("Pr\xE9-autorisation bancaire", "Bank pre-authorization")), /* @__PURE__ */ React.createElement("p", { className: "lead" }, t(
      /* @__PURE__ */ React.createElement(React.Fragment, null, "Avant le paiement de l'acompte, nous proc\xE9dons \xE0 une ", /* @__PURE__ */ React.createElement("strong", null, "pr\xE9-autorisation bancaire de ", fmtPrice(preAuth)), " via notre partenaire Swikly. Aucun montant n'est d\xE9bit\xE9 \u2014 il s'agit d'une simple empreinte CB qui sert de caution."),
      /* @__PURE__ */ React.createElement(React.Fragment, null, "Before paying the deposit, we proceed with a ", /* @__PURE__ */ React.createElement("strong", null, "bank pre-authorization of ", fmtPrice(preAuth)), " via our partner Swikly. No amount is charged \u2014 it is simply a card hold acting as a security deposit.")
    )), /* @__PURE__ */ React.createElement("div", { className: "pay-card", style: { border: "1px solid #e5e7eb", borderRadius: 16, padding: 22, marginTop: 18, background: "var(--surface-2, #f4f8fb)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement(Icon, { name: "shield", size: 20 }), /* @__PURE__ */ React.createElement("h3", { style: { margin: 0 } }, t("Caution Swikly", "Swikly security deposit"))), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 32, fontWeight: 700, margin: "8px 0" } }, fmtPrice(preAuth)), /* @__PURE__ */ React.createElement("p", { className: "muted", style: { fontSize: 13, marginBottom: 16 } }, t("Empreinte CB s\xE9curis\xE9e \u2014 lib\xE9r\xE9e automatiquement apr\xE8s la location si aucun dommage n'est constat\xE9.", "Secure card hold \u2014 automatically released after the rental if no damage is reported.")), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "https://v2.swik.link/REpq148",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "btn btn-primary btn-block",
        onClick: () => {
          setData((d) => ({ ...d, preAuthDone: true }));
        }
      },
      t("Pr\xE9-autorisation bancaire (Swikly)", "Bank pre-authorization (Swikly)")
    )), data.preAuthDone && /* @__PURE__ */ React.createElement("div", { style: { background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #1a5a32", padding: "14px 16px", borderRadius: 4, marginTop: 18, fontSize: 14, color: "#1a3a52" } }, t("Pr\xE9-autorisation effectu\xE9e avec succ\xE8s. Vous pouvez passer au paiement de l'acompte.", "Pre-authorization successful. You can now proceed to the deposit payment."))), step === 6 && /* @__PURE__ */ React.createElement("section", { className: "step-card" }, /* @__PURE__ */ React.createElement("h2", null, t("Paiement de l'acompte", "Deposit payment")), /* @__PURE__ */ React.createElement("p", { className: "lead", style: { color: "var(--muted, #5b6b7a)" } }, t("Montant \xE0 r\xE9gler", "Amount to pay"), " : ", /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--ink)" } }, fmtPrice(deposit)), ". ", t("S\xE9lectionnez le moyen de paiement de votre choix.", "Choose your preferred payment method.")), /* @__PURE__ */ React.createElement("div", { style: { background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #0a2540", padding: "12px 14px", borderRadius: 4, marginTop: 8, marginBottom: 22, fontSize: 13, color: "#3b4a5a" } }, t("Seul le virement bancaire est disponible pour le moment. Les autres moyens de paiement seront activ\xE9s prochainement.", "Only bank transfer is available at the moment. Other payment methods will be activated shortly.")), /* @__PURE__ */ React.createElement("div", { className: "pay-methods", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 } }, [
      { id: "cb", label: t("Carte bancaire", "Credit card"), logo: /* @__PURE__ */ React.createElement(PayLogo, { brand: "cb" }) },
      { id: "paypal", label: "PayPal", logo: /* @__PURE__ */ React.createElement(PayLogo, { brand: "paypal" }) },
      { id: "applepay", label: "Apple Pay", logo: /* @__PURE__ */ React.createElement(PayLogo, { brand: "applepay" }) },
      { id: "paybybank", label: "Pay by Bank", logo: /* @__PURE__ */ React.createElement(PayLogo, { brand: "paybybank" }) },
      { id: "virement", label: t("Virement bancaire", "Bank transfer"), logo: /* @__PURE__ */ React.createElement(PayLogo, { brand: "virement" }) }
    ].map((m) => {
      const enabled = m.id === "virement";
      const active = data.paymentMethod === m.id;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: m.id,
          type: "button",
          disabled: !enabled,
          onClick: () => enabled && setData((d) => ({ ...d, paymentMethod: m.id })),
          title: !enabled ? t("Bient\xF4t disponible", "Coming soon") : void 0,
          style: {
            border: active ? "1.5px solid var(--ink, #0a2540)" : "1px solid #e5e7eb",
            borderRadius: 10,
            padding: "16px 18px",
            background: active ? "#f7f9fb" : "#fff",
            textAlign: "left",
            cursor: enabled ? "pointer" : "not-allowed",
            fontSize: 14,
            fontWeight: active ? 600 : 500,
            color: "var(--ink, #0a2540)",
            opacity: enabled ? 1 : 0.45,
            transition: "border-color .15s, background .15s",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10
          }
        },
        /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 10 } }, m.logo, /* @__PURE__ */ React.createElement("span", null, m.label)),
        /* @__PURE__ */ React.createElement("span", { style: {
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: active ? "5px solid var(--ink, #0a2540)" : "1.5px solid #cbd5e0",
          flexShrink: 0
        } })
      );
    })), data.paymentMethod && data.paymentMethod !== "virement" && /* @__PURE__ */ React.createElement("div", { style: { border: "1px solid #e5e7eb", borderRadius: 10, padding: 22, marginTop: 22, background: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, textTransform: "uppercase", letterSpacing: 0.6, color: "var(--muted, #5b6b7a)", marginBottom: 8 } }, t("R\xE9capitulatif", "Summary")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, { cb: t("Carte bancaire", "Credit card"), paypal: "PayPal", applepay: "Apple Pay", paybybank: "Pay by Bank" }[data.paymentMethod]), /* @__PURE__ */ React.createElement("strong", { style: { fontSize: 22 } }, fmtPrice(deposit))), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "#PAYMENT_LINK",
        className: "btn btn-primary btn-block",
        onClick: (e) => {
          e.preventDefault();
          setData((d) => ({ ...d, paymentDone: true }));
        }
      },
      t("Proc\xE9der au paiement", "Proceed to payment")
    ), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--muted, #5b6b7a)", marginTop: 10, marginBottom: 0, textAlign: "center" } }, t("Vous serez redirig\xE9 vers une page de paiement s\xE9curis\xE9e.", "You will be redirected to a secure payment page."))), data.paymentMethod === "virement" && /* @__PURE__ */ React.createElement("div", { style: { border: "1px solid #e5e7eb", borderRadius: 10, padding: 22, marginTop: 22, background: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, textTransform: "uppercase", letterSpacing: 0.6, color: "var(--muted, #5b6b7a)", marginBottom: 12 } }, t("Coordonn\xE9es bancaires", "Bank details")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, marginTop: 0, marginBottom: 16, color: "#3b4a5a" } }, t(
      /* @__PURE__ */ React.createElement(React.Fragment, null, "Effectuez un virement de ", /* @__PURE__ */ React.createElement("strong", null, fmtPrice(deposit)), " sur notre compte. Votre r\xE9servation sera confirm\xE9e d\xE8s r\xE9ception du virement (2 \xE0 3 jours ouvr\xE9s)."),
      /* @__PURE__ */ React.createElement(React.Fragment, null, "Send a bank transfer of ", /* @__PURE__ */ React.createElement("strong", null, fmtPrice(deposit)), " to our account. Your booking will be confirmed once the transfer is received (2 to 3 business days).")
    )), /* @__PURE__ */ React.createElement("div", { style: { background: "#fafbfc", padding: "16px 18px", borderRadius: 8, fontSize: 13, border: "1px solid #eef1f4", display: "grid", gap: 10 } }, [
      [t("B\xE9n\xE9ficiaire", "Account holder"), "South Boat", false],
      [t("Adresse", "Address"), "4 Rue des Grillons, 06130 Grasse, France", false],
      ["IBAN", "FR76 1695 8000 0145 8029 0135 156", true],
      ["BIC / SWIFT", "QNTOFRP1XXX", true],
      [t("Banque", "Bank"), "Qonto", false],
      [t("R\xE9f\xE9rence", "Reference"), `RESA-${boat.name.toUpperCase()}-${(data.date || "").replace(/-/g, "")}`, true]
    ].map(([k, v, mono], i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", flexDirection: "column", gap: 2 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--muted, #5b6b7a)", fontSize: 11.5, textTransform: "uppercase", letterSpacing: 0.4 } }, k), /* @__PURE__ */ React.createElement("strong", { style: { fontFamily: mono ? "ui-monospace, monospace" : "inherit", wordBreak: "break-all", fontSize: 13 } }, v)))), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11.5, color: "var(--muted, #5b6b7a)", marginTop: 10, marginBottom: 0, lineHeight: 1.5 } }, t(
      /* @__PURE__ */ React.createElement(React.Fragment, null, "Pour un virement SWIFT international, la banque \xE9mettrice peut demander le BIC partenaire : ", /* @__PURE__ */ React.createElement("strong", null, "TRWIBEB3XXX"), "."),
      /* @__PURE__ */ React.createElement(React.Fragment, null, "For an international SWIFT transfer, the sending bank may request the partner BIC: ", /* @__PURE__ */ React.createElement("strong", null, "TRWIBEB3XXX"), ".")
    )), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "btn btn-primary btn-block",
        style: { marginTop: 16 },
        onClick: () => setData((d) => ({ ...d, paymentDone: true }))
      },
      t("J'ai effectu\xE9 le virement", "I've made the transfer")
    ), data.paymentDone && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18, paddingTop: 18, borderTop: "1px solid #eef1f4" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, textTransform: "uppercase", letterSpacing: 0.6, color: "var(--muted, #5b6b7a)", marginBottom: 10 } }, t("Preuve de virement (obligatoire)", "Proof of transfer (required)")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "#3b4a5a", marginTop: 0, marginBottom: 12 } }, t(
      "Joignez une capture d'\xE9cran ou un PDF de votre virement pour finaliser votre r\xE9servation.",
      "Attach a screenshot or PDF of your transfer to finalize your booking."
    )), /* @__PURE__ */ React.createElement(
      "label",
      {
        htmlFor: "transfer-proof-input",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          border: "1px dashed " + (data.transferProof ? "#1a5a32" : "#cbd5e0"),
          background: data.transferProof ? "#f0f8f3" : "#fafbfc",
          borderRadius: 10,
          padding: "14px 16px",
          cursor: "pointer",
          fontSize: 13
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 10, minWidth: 0 } }, /* @__PURE__ */ React.createElement(Icon, { name: data.transferProof ? "check" : "plus", size: 16 }), /* @__PURE__ */ React.createElement("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, data.transferProof ? data.transferProof.name : t("Choisir un fichier (JPG, PNG, PDF)", "Choose a file (JPG, PNG, PDF)"))),
      data.transferProof && /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          onClick: (e) => {
            e.preventDefault();
            setData((d) => ({ ...d, transferProof: null }));
          },
          style: { background: "none", border: "none", color: "var(--muted, #5b6b7a)", cursor: "pointer", fontSize: 13, padding: 4 }
        },
        t("Retirer", "Remove")
      )
    ), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "transfer-proof-input",
        type: "file",
        accept: "image/jpeg,image/png,image/heic,application/pdf",
        style: { display: "none" },
        onChange: (e) => {
          const f = e.target.files && e.target.files[0];
          if (f) setData((d) => ({ ...d, transferProof: f }));
        }
      }
    ), data.transferProof && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--muted, #5b6b7a)", marginTop: 8, marginBottom: 0 } }, t("Fichier pr\xEAt \xE0 \xEAtre joint \xE0 votre confirmation.", "File ready to be attached to your confirmation.")))), data.paymentDone && /* @__PURE__ */ React.createElement("div", { style: { background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #1a5a32", padding: "14px 16px", borderRadius: 4, marginTop: 18, fontSize: 14, color: "#1a3a52" } }, data.paymentMethod === "virement" ? t("Virement enregistr\xE9. Vous recevrez votre confirmation de r\xE9servation d\xE8s r\xE9ception du virement (2 \xE0 3 jours ouvr\xE9s).", "Transfer registered. You will receive your booking confirmation as soon as the transfer is received (2 to 3 business days).") : t("Paiement enregistr\xE9 avec succ\xE8s. Vous pouvez valider votre r\xE9servation.", "Payment registered successfully. You can now confirm your booking."))), step === 7 && /* @__PURE__ */ React.createElement("section", { className: "step-card success" }, /* @__PURE__ */ React.createElement("div", { className: "success-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 28 })), /* @__PURE__ */ React.createElement("h2", null, t("R\xE9servation confirm\xE9e", "Booking confirmed")), /* @__PURE__ */ React.createElement("p", { className: "lead" }, t("Un email de confirmation a \xE9t\xE9 envoy\xE9 \xE0", "A confirmation email has been sent to"), " ", /* @__PURE__ */ React.createElement("strong", null, data.billing.email || t("votre adresse", "your address")), "."), /* @__PURE__ */ React.createElement("div", { style: { background: "#fdf2f2", border: "1px solid #f1c6c6", borderLeft: "4px solid #a83232", padding: "14px 18px", borderRadius: 6, margin: "20px 0", color: "#5a1a1a", fontSize: 14, lineHeight: 1.55 } }, /* @__PURE__ */ React.createElement("strong", { style: { display: "block", marginBottom: 6 } }, t("Important", "Important")), /* @__PURE__ */ React.createElement("p", { style: { margin: 0 } }, t(
      "Afin de garantir votre s\xE9curit\xE9 et de respecter les exigences de notre assurance, la pr\xE9sentation d'une pi\xE8ce d'identit\xE9 et du permis bateau en cours de validit\xE9 de la personne ayant r\xE9serv\xE9 sur le site est obligatoire avant toute prise en charge du bateau.",
      "To ensure your safety and meet our insurer's requirements, the booking holder must present a valid ID and a valid boating license before taking charge of the boat."
    )), /* @__PURE__ */ React.createElement("p", { style: { margin: "8px 0 0 0" } }, t(
      "En l'absence de ces documents, la location ne pourra \xEAtre effectu\xE9e et sera annul\xE9e.",
      "Without these documents, the rental cannot proceed and will be cancelled."
    ))), /* @__PURE__ */ React.createElement("div", { className: "recap" }, /* @__PURE__ */ React.createElement("div", { className: "recap-row" }, /* @__PURE__ */ React.createElement("span", null, t("Bateau", "Boat")), /* @__PURE__ */ React.createElement("strong", null, boat.name)), /* @__PURE__ */ React.createElement("div", { className: "recap-row" }, /* @__PURE__ */ React.createElement("span", null, t("Date", "Date")), /* @__PURE__ */ React.createElement("strong", null, data.date ? fmtLong(data.date, t.lang) : "\u2014")), /* @__PURE__ */ React.createElement("div", { className: "recap-row" }, /* @__PURE__ */ React.createElement("span", null, t("Cr\xE9neau", "Time slot")), /* @__PURE__ */ React.createElement("strong", null, labelSlot(data.slot, t))), /* @__PURE__ */ React.createElement("div", { className: "recap-row" }, /* @__PURE__ */ React.createElement("span", null, t("Participants", "Guests")), /* @__PURE__ */ React.createElement("strong", null, data.adults, " ", t(data.adults > 1 ? "adultes" : "adulte", data.adults > 1 ? "adults" : "adult"), data.children ? " \xB7 " + data.children + " " + t(data.children > 1 ? "enfants" : "enfant", data.children > 1 ? "children" : "child") : "")), selectedItinerary && /* @__PURE__ */ React.createElement("div", { className: "recap-row" }, /* @__PURE__ */ React.createElement("span", null, t("Itin\xE9raire", "Itinerary")), /* @__PURE__ */ React.createElement("strong", null, itName(selectedItinerary, t))), /* @__PURE__ */ React.createElement("div", { className: "recap-row" }, /* @__PURE__ */ React.createElement("span", null, t("Acompte pay\xE9", "Deposit paid")), /* @__PURE__ */ React.createElement("strong", null, fmtPrice(deposit))), /* @__PURE__ */ React.createElement("div", { className: "recap-row" }, /* @__PURE__ */ React.createElement("span", null, t("Reste \xE0 payer le Jour-J", "Balance due on the day")), /* @__PURE__ */ React.createElement("strong", null, fmtPrice(Math.max(0, total - deposit)))), /* @__PURE__ */ React.createElement("div", { className: "recap-row total" }, /* @__PURE__ */ React.createElement("span", null, t("Total", "Total")), /* @__PURE__ */ React.createElement("strong", null, fmtPrice(total)))), /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary btn-block", style: { marginTop: 18 }, onClick: () => setPage({ name: "home" }) }, t("Retour \xE0 l'accueil", "Back to home"))), step < 7 && (() => {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isStr = (v) => v && String(v).trim().length > 0;
      let stepIncomplete = false;
      if (step === 1) {
        stepIncomplete = !data.slot || data.slot === "halfday" && !data.period || !data.date || !data.slotConfirmed;
      } else if (step === 2) {
        stepIncomplete = data.adults < 1 || data.adults + data.children > boat.capacity || data.crew === "with" && !data.itinerary;
      } else if (step === 4) {
        const billingOk = ["firstName", "lastName", "birthdate", "email", "phone", "address"].every((k) => isStr(data.billing[k])) && emailRe.test(data.billing.email || "");
        const permitNumOk = data.permitDifferent || data.crew !== "without" || isStr(data.billing.permitNumber);
        const permitOk = !data.permitDifferent || ["firstName", "lastName", "birthdate", "email", "phone", "address", "permitNumber"].every((k) => isStr(data.permit[k])) && emailRe.test(data.permit.email || "");
        stepIncomplete = !billingOk || !permitNumOk || !permitOk;
      }
      const nextDisabled = stepIncomplete || bookingPending || step === 5 && !data.preAuthDone || step === 6 && (!data.paymentDone || data.paymentMethod === "virement" && !data.transferProof);
      return /* @__PURE__ */ React.createElement("div", { className: "step-actions", style: { flexDirection: "column", alignItems: "stretch", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-outline", onClick: goPrev, disabled: step === 1 }, t("Pr\xE9c\xE9dent", "Previous")), /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "btn btn-primary",
          onClick: goNext,
          disabled: nextDisabled,
          style: nextDisabled ? { opacity: 0.45, cursor: "not-allowed" } : void 0,
          title: nextDisabled ? step === 5 ? t("Effectuez d'abord la pr\xE9-autorisation bancaire.", "Complete the bank pre-authorization first.") : step === 6 ? t("Finalisez le paiement avant de continuer.", "Finalize the payment before continuing.") : t("Veuillez compl\xE9ter les champs requis.", "Please complete the required fields.") : void 0
        },
        step === 6 && bookingPending ? t("R\xE9servation du cr\xE9neau\u2026", "Locking the slot\u2026") : step === 3 ? t("R\xE9server", "Book") : step === 4 ? t("Aller \xE0 la caution", "Go to deposit hold") : step === 5 ? t("Aller au paiement", "Go to payment") : step === 6 ? t("Valider la r\xE9servation", "Confirm booking") : t("Continuer", "Continue"),
        " ",
        /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 16 })
      )), errorMsg && /* @__PURE__ */ React.createElement("p", { style: { color: "#c00", margin: 0, textAlign: "right" } }, errorMsg), bookingError && /* @__PURE__ */ React.createElement("p", { style: { color: "#c00", margin: 0, textAlign: "right", fontSize: 12 } }, "Cal.com : ", bookingError));
    })()), showSidebar && /* @__PURE__ */ React.createElement("aside", { className: "booking-summary" }, /* @__PURE__ */ React.createElement("img", { src: boat.images[0], alt: `${boat.name} - ${t("Location bateau Mandelieu", "Boat rental Mandelieu")}`, className: "bs-img" }), /* @__PURE__ */ React.createElement("h3", null, boat.name), /* @__PURE__ */ React.createElement("p", { className: "muted" }, t(boat.type, { "Day cruiser": "Day cruiser", "Open premium": "Open premium", "Familial": "Family" }[boat.type] || boat.type), " \xB7 ", boat.port), /* @__PURE__ */ React.createElement("div", { className: "bs-line" }, /* @__PURE__ */ React.createElement("span", null, t("Date", "Date")), /* @__PURE__ */ React.createElement("strong", null, data.date ? fmtLong(data.date, t.lang) : "\u2014")), /* @__PURE__ */ React.createElement("div", { className: "bs-line" }, /* @__PURE__ */ React.createElement("span", null, t("Cr\xE9neau", "Time slot")), /* @__PURE__ */ React.createElement("strong", null, labelSlot(data.slot, t))), /* @__PURE__ */ React.createElement("div", { className: "bs-line" }, /* @__PURE__ */ React.createElement("span", null, t("Adultes / Enfants", "Adults / Children")), /* @__PURE__ */ React.createElement("strong", null, data.adults, " / ", data.children)), data.crew === "with" && selectedItinerary && /* @__PURE__ */ React.createElement("div", { className: "bs-line" }, /* @__PURE__ */ React.createElement("span", null, t("Itin\xE9raire", "Itinerary")), /* @__PURE__ */ React.createElement("strong", null, itName(selectedItinerary, t))), data.extras.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "bs-line" }, /* @__PURE__ */ React.createElement("span", null, t("Options", "Add-ons")), /* @__PURE__ */ React.createElement("strong", null, data.extras.length)), /* @__PURE__ */ React.createElement("div", { className: "bs-divider" }), /* @__PURE__ */ React.createElement("div", { className: "bs-total" }, /* @__PURE__ */ React.createElement("span", null, t("Total estim\xE9", "Estimated total")), /* @__PURE__ */ React.createElement("strong", null, fmtPrice(total))), /* @__PURE__ */ React.createElement("p", { className: "bs-note" }, t("Annulation gratuite jusqu'\xE0 7 jours avant le d\xE9part.", "Free cancellation up to 7 days before departure.")))), /* @__PURE__ */ React.createElement(Footer, null));
  }
  var fmtLong = (s, lang) => {
    if (!s) return "\u2014";
    const [y, m, day] = s.split("-").map(Number);
    const d = new Date(y, m - 1, day);
    return d.toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };
  var labelSlot = (s, t) => {
    if (!t) return { day: "Journ\xE9e compl\xE8te", halfday: "Demi-journ\xE9e" }[s] || "\u2014";
    return s === "day" ? t("Journ\xE9e compl\xE8te", "Full day") : s === "halfday" ? t("Demi-journ\xE9e", "Half day") : "\u2014";
  };
  function Calendar({ selected, onSelect }) {
    const t = window.useT();
    const [view, setView] = useState(() => {
      const d = /* @__PURE__ */ new Date();
      return { y: d.getFullYear(), m: d.getMonth() };
    });
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const first = new Date(view.y, view.m, 1);
    const last = new Date(view.y, view.m + 1, 0);
    const startOff = (first.getDay() + 6) % 7;
    const days = [];
    for (let i = 0; i < startOff; i++) days.push(null);
    for (let i = 1; i <= last.getDate(); i++) days.push(new Date(view.y, view.m, i));
    const monthName = first.toLocaleDateString(t.lang === "en" ? "en-GB" : "fr-FR", { month: "long", year: "numeric" });
    const dows = t.lang === "en" ? ["M", "T", "W", "T", "F", "S", "S"] : ["L", "M", "M", "J", "V", "S", "D"];
    const unavailable = useMemo(() => {
      const set = /* @__PURE__ */ new Set();
      [3, 4, 12, 18, 19].forEach((d) => set.add(`${view.y}-${view.m}-${d}`));
      return set;
    }, [view]);
    return /* @__PURE__ */ React.createElement("div", { className: "cal" }, /* @__PURE__ */ React.createElement("div", { className: "cal-head" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setView({ y: view.m === 0 ? view.y - 1 : view.y, m: (view.m + 11) % 12 }) }, /* @__PURE__ */ React.createElement(Icon, { name: "arrowL", size: 16 })), /* @__PURE__ */ React.createElement("h4", null, monthName), /* @__PURE__ */ React.createElement("button", { onClick: () => setView({ y: view.m === 11 ? view.y + 1 : view.y, m: (view.m + 1) % 12 }) }, /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 16 }))), /* @__PURE__ */ React.createElement("div", { className: "cal-grid" }, dows.map((d, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "cal-dow" }, d)), days.map((d, i) => {
      if (!d) return /* @__PURE__ */ React.createElement("span", { key: i, className: "cal-cell empty" });
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const isPast = d < today;
      const isUnav = unavailable.has(`${view.y}-${view.m}-${d.getDate()}`);
      const isSel = selected === iso;
      const cls = "cal-cell" + (isSel ? " selected" : "") + (isPast || isUnav ? " disabled" : "");
      return /* @__PURE__ */ React.createElement("button", { key: i, className: cls, disabled: isPast || isUnav, onClick: () => onSelect(iso) }, d.getDate());
    })), /* @__PURE__ */ React.createElement("div", { className: "cal-legend" }, /* @__PURE__ */ React.createElement("span", { className: "lg" }, /* @__PURE__ */ React.createElement("i", { className: "lg-dot avail" }), " ", t("Disponible", "Available")), /* @__PURE__ */ React.createElement("span", { className: "lg" }, /* @__PURE__ */ React.createElement("i", { className: "lg-dot unav" }), " ", t("R\xE9serv\xE9", "Booked")), /* @__PURE__ */ React.createElement("span", { className: "lg" }, /* @__PURE__ */ React.createElement("i", { className: "lg-dot sel" }), " ", t("Votre choix", "Your choice"))));
  }
  function AboutPage({ setPage }) {
    const t = window.useT();
    return /* @__PURE__ */ React.createElement("main", { className: "about-v2" }, /* @__PURE__ */ React.createElement(Breadcrumb, { setPage, trail: [
      { label: t("Accueil", "Home"), page: { name: "home" } },
      { label: t("\xC0 propos", "About") }
    ] }), /* @__PURE__ */ React.createElement("section", { className: "ab-hero" }, /* @__PURE__ */ React.createElement("div", { className: "ab-hero-text" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, t("Notre maison", "Our house")), /* @__PURE__ */ React.createElement("h1", null, t(/* @__PURE__ */ React.createElement(React.Fragment, null, "Le sur-mesure,", /* @__PURE__ */ React.createElement("br", null), "au rythme de la mer."), /* @__PURE__ */ React.createElement(React.Fragment, null, "Bespoke service,", /* @__PURE__ */ React.createElement("br", null), "paced by the sea."))), /* @__PURE__ */ React.createElement("p", { className: "lead" }, t("South Boat est n\xE9e sur les pontons de Mandelieu-la-Napoule. Nous s\xE9lectionnons \xE0 la main des bateaux familiaux entretenus avec soin, et accompagnons chacun de nos clients comme un proche.", "South Boat was born on the docks of Mandelieu-la-Napoule. We hand-pick family boats maintained with care, and treat every guest like a close friend.")), /* @__PURE__ */ React.createElement("div", { className: "ab-hero-cta" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary", onClick: () => setPage({ name: "catalog" }) }, t("D\xE9couvrir la flotte", "Discover the fleet")), /* @__PURE__ */ React.createElement("button", { className: "btn btn-outline", onClick: () => setPage({ name: "contact" }) }, t("Nous rencontrer", "Meet us")))), /* @__PURE__ */ React.createElement("div", { className: "ab-hero-art" }, /* @__PURE__ */ React.createElement("div", { className: "ab-img main" }, /* @__PURE__ */ React.createElement("img", { src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1400&q=80", alt: t("Marina de Mandelieu-la-Napoule, port de d\xE9part South Boat sur la C\xF4te d'Azur", "Marina of Mandelieu-la-Napoule, South Boat's departure port on the French Riviera"), fetchpriority: "high", decoding: "async" })), /* @__PURE__ */ React.createElement("div", { className: "ab-img stack" }, /* @__PURE__ */ React.createElement("img", { src: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80", alt: t("Bateau au mouillage dans une calanque de l'Est\xE9rel, location South Boat", "Boat anchored in an Esterel cove, South Boat rental"), loading: "lazy", decoding: "async" })), /* @__PURE__ */ React.createElement("div", { className: "ab-badge" }, /* @__PURE__ */ React.createElement("strong", null, "Mandelieu-la-Napoule"), /* @__PURE__ */ React.createElement("span", null, t("Port de d\xE9part", "Departure port"))))), /* @__PURE__ */ React.createElement("section", { className: "ab-story" }, /* @__PURE__ */ React.createElement("div", { className: "ab-story-head" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, t("Notre histoire", "Our story")), /* @__PURE__ */ React.createElement("h2", null, t("Une amiti\xE9 devenue aventure entrepreneuriale.", "A friendship that became an entrepreneurial adventure."))), /* @__PURE__ */ React.createElement("div", { className: "ab-timeline" }, /* @__PURE__ */ React.createElement("div", { className: "ab-step" }, /* @__PURE__ */ React.createElement("span", { className: "ab-year" }, "01"), /* @__PURE__ */ React.createElement("h3", null, t("Une amiti\xE9, une passion commune", "A friendship, a shared passion")), /* @__PURE__ */ React.createElement("p", null, t("Tout a commenc\xE9 par une amiti\xE9 et une passion partag\xE9e pour l'aventure, la mer et les d\xE9couvertes.", "It all started with a friendship and a shared passion for adventure, the sea and discovery."))), /* @__PURE__ */ React.createElement("div", { className: "ab-step" }, /* @__PURE__ */ React.createElement("span", { className: "ab-year" }, "02"), /* @__PURE__ */ React.createElement("h3", null, t("Des ann\xE9es \xE0 explorer notre littoral", "Years spent exploring our coastline")), /* @__PURE__ */ React.createElement("p", null, t("Pendant des ann\xE9es, nous avons parcouru les criques, les plages et les plus beaux coins de notre r\xE9gion, \xE0 la recherche de nouvelles aventures.", "For years, we sailed through coves, beaches and the most beautiful spots of our region, always looking for new adventures."))), /* @__PURE__ */ React.createElement("div", { className: "ab-step" }, /* @__PURE__ */ React.createElement("span", { className: "ab-year" }, "03"), /* @__PURE__ */ React.createElement("h3", null, t("Une id\xE9e qui s'impose naturellement", "An idea that came naturally")), /* @__PURE__ */ React.createElement("p", null, t("Au fil de nos escapades, une \xE9vidence est n\xE9e : partager cette passion et faire d\xE9couvrir ces lieux exceptionnels au plus grand nombre.", "Along our escapades, it became obvious: share this passion and let others discover these exceptional places."))), /* @__PURE__ */ React.createElement("div", { className: "ab-step" }, /* @__PURE__ */ React.createElement("span", { className: "ab-year" }, "04"), /* @__PURE__ */ React.createElement("h3", null, t("Le lancement de notre aventure entrepreneuriale", "Launching our entrepreneurial adventure")), /* @__PURE__ */ React.createElement("p", null, t("Port\xE9s par la confiance, l'amiti\xE9 et l'envie d'entreprendre ensemble, nous avons cr\xE9\xE9 notre soci\xE9t\xE9 de location de bateaux.", "Driven by trust, friendship and the desire to build something together, we created our boat rental company."))), /* @__PURE__ */ React.createElement("div", { className: "ab-step" }, /* @__PURE__ */ React.createElement("span", { className: "ab-year" }, "05"), /* @__PURE__ */ React.createElement("h3", null, t("Aujourd'hui, bien plus que de la location", "Today, much more than rental")), /* @__PURE__ */ React.createElement("p", null, t("Nous partageons notre exp\xE9rience \xE0 travers un accompagnement personnalis\xE9, des conseils, des services d'entretien et une exigence constante en mati\xE8re de qualit\xE9, de confort et de s\xE9curit\xE9.", "We share our experience through personalized support, advice, maintenance services and a constant focus on quality, comfort and safety.")))), /* @__PURE__ */ React.createElement("div", { className: "ab-story-cta", style: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" } }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary", onClick: () => setPage({ name: "capsud-article", id: "cap-sur-histoire-south-boat" }) }, t("Cap sur notre histoire", "Set sail on our story"), " ", /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 16 })), /* @__PURE__ */ React.createElement("a", { href: "https://www.instagram.com/south_boat_/", target: "_blank", rel: "noopener noreferrer", className: "btn btn-outline", style: { textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(Icon, { name: "instagram", size: 16 }), " ", t("Suivez nos aventures sur Instagram", "Follow our adventures on Instagram"))), /* @__PURE__ */ React.createElement("div", { className: "ab-contact-quick", style: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, color: "var(--muted, #6b7280)", marginRight: 4 } }, t("Nous joindre directement", "Reach us directly"), " :"), /* @__PURE__ */ React.createElement("a", { href: "tel:+33634491621", className: "btn btn-outline", style: { textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(Icon, { name: "phone", size: 16 }), " Maxim \xB7 06 34 49 16 21"), /* @__PURE__ */ React.createElement("a", { href: "tel:+33786237848", className: "btn btn-outline", style: { textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(Icon, { name: "phone", size: 16 }), " Vincent \xB7 07 86 23 78 48"))), /* @__PURE__ */ React.createElement("section", { className: "ab-pillars" }, /* @__PURE__ */ React.createElement("div", { className: "ab-pillars-head" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, t("Notre engagement", "Our commitment")), /* @__PURE__ */ React.createElement("h2", null, t("Trois principes, jamais n\xE9goci\xE9s.", "Three principles, never compromised."))), /* @__PURE__ */ React.createElement("div", { className: "ab-pillars-grid" }, /* @__PURE__ */ React.createElement("article", { className: "ab-pillar" }, /* @__PURE__ */ React.createElement("span", { className: "ab-num" }, "01"), /* @__PURE__ */ React.createElement("h3", null, t("L'humain avant tout", "People first")), /* @__PURE__ */ React.createElement("p", null, t("Une relation fond\xE9e sur la confiance, l'\xE9coute et l'accompagnement personnalis\xE9. Chaque client doit \xEAtre accueilli avec attention, conseill\xE9 avec sinc\xE9rit\xE9 et accompagn\xE9 du premier contact jusqu'au retour au port. Nous croyons qu'une belle exp\xE9rience commence avant m\xEAme de monter \xE0 bord.", "A relationship built on trust, listening and personalized support. Every client is welcomed with care, advised honestly and accompanied from the first contact to the return to port. We believe a great experience starts before you even step on board.")), /* @__PURE__ */ React.createElement("span", { className: "ab-tag" }, t("Confiance", "Trust"))), /* @__PURE__ */ React.createElement("article", { className: "ab-pillar" }, /* @__PURE__ */ React.createElement("span", { className: "ab-num" }, "02"), /* @__PURE__ */ React.createElement("h3", null, t("La s\xE9curit\xE9 et l'excellence sans compromis", "Safety and excellence, no compromise")), /* @__PURE__ */ React.createElement("p", null, t("Des bateaux rigoureusement entretenus, des \xE9quipements v\xE9rifi\xE9s et une attention constante port\xE9e \xE0 la s\xE9curit\xE9, au confort et \xE0 la qualit\xE9 du service. La s\xE9r\xE9nit\xE9 de nos clients repose sur des standards \xE9lev\xE9s que nous nous imposons chaque jour.", "Rigorously maintained boats, checked equipment and constant attention to safety, comfort and service quality. Our clients' peace of mind relies on the high standards we set ourselves every day.")), /* @__PURE__ */ React.createElement("span", { className: "ab-tag" }, t("Exigence", "Standards"))), /* @__PURE__ */ React.createElement("article", { className: "ab-pillar" }, /* @__PURE__ */ React.createElement("span", { className: "ab-num" }, "03"), /* @__PURE__ */ React.createElement("h3", null, t("L'esprit d'aventure et de d\xE9couverte", "The spirit of adventure and discovery")), /* @__PURE__ */ React.createElement("p", null, t("La passion de la mer, des paysages et des exp\xE9riences authentiques est au c\u0153ur de notre projet. Nous souhaitons partager cet amour du littoral, de la navigation et des d\xE9couvertes qui rendent chaque sortie unique. L'aventure n'est pas une option, c'est la raison m\xEAme de notre existence.", "Passion for the sea, the landscapes and authentic experiences is at the heart of our project. We want to share this love of the coast, navigation and discoveries that make every outing unique. Adventure isn't an option \u2014 it's the very reason we exist.")), /* @__PURE__ */ React.createElement("span", { className: "ab-tag" }, t("Aventure", "Adventure"))))), /* @__PURE__ */ React.createElement("section", { className: "ab-cta" }, /* @__PURE__ */ React.createElement("div", { className: "ab-cta-inner" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, t("Une question, une envie de large ?", "A question, a longing for the open sea?")), /* @__PURE__ */ React.createElement("p", null, t("Notre \xE9quipe vous r\xE9pond du lundi au dimanche, de 8h \xE0 19h. Conseil gratuit, sans engagement.", "Our team is available Monday to Sunday, 8am to 7pm. Free advice, no commitment."))), /* @__PURE__ */ React.createElement("div", { className: "ab-cta-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary", onClick: () => setPage({ name: "catalog" }) }, t("R\xE9server un bateau", "Book a boat")), /* @__PURE__ */ React.createElement("button", { className: "btn btn-outline", onClick: () => setPage({ name: "contact" }) }, t("Parler \xE0 un conseiller", "Talk to an advisor"))))), /* @__PURE__ */ React.createElement(Footer, null));
  }
  function ContactPage({ setPage }) {
    const t = window.useT();
    const [sent, setSent] = useState(false);
    return /* @__PURE__ */ React.createElement("main", { className: "contact" }, /* @__PURE__ */ React.createElement(Breadcrumb, { setPage, trail: [
      { label: t("Accueil", "Home"), page: { name: "home" } },
      { label: t("Contact", "Contact") }
    ] }), /* @__PURE__ */ React.createElement("section", { className: "contact-grid" }, /* @__PURE__ */ React.createElement("div", { className: "contact-info" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, t("Contact", "Contact")), /* @__PURE__ */ React.createElement("h1", null, t("Parlons de votre journ\xE9e en mer.", "Let's plan your day at sea.")), /* @__PURE__ */ React.createElement("p", { className: "lead" }, t("Nous vous r\xE9pondons du lundi au dimanche, de 8h \xE0 19h.", "We reply Monday to Sunday, 8am to 7pm.")), /* @__PURE__ */ React.createElement("ul", { className: "contact-list" }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(Icon, { name: "phone" }), " ", /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, /* @__PURE__ */ React.createElement("a", { href: "tel:+33634491621", style: { color: "inherit", textDecoration: "none" } }, "06 34 49 16 21")), /* @__PURE__ */ React.createElement("span", null, t("Maxim \u2014 nous appeler", "Maxim \u2014 call us")))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(Icon, { name: "phone" }), " ", /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, /* @__PURE__ */ React.createElement("a", { href: "tel:+33786237848", style: { color: "inherit", textDecoration: "none" } }, "07 86 23 78 48")), /* @__PURE__ */ React.createElement("span", null, t("Vincent \u2014 nous appeler", "Vincent \u2014 call us")))), /* @__PURE__ */ React.createElement("li", { className: "brand-whatsapp" }, /* @__PURE__ */ React.createElement(Icon, { name: "whatsapp" }), " ", /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, /* @__PURE__ */ React.createElement("a", { href: "https://wa.me/33634491621", target: "_blank", rel: "noopener noreferrer", style: { color: "inherit", textDecoration: "none" } }, t("WhatsApp Maxim", "WhatsApp Maxim"))), /* @__PURE__ */ React.createElement("span", null, t("R\xE9ponse rapide", "Quick reply")))), /* @__PURE__ */ React.createElement("li", { className: "brand-whatsapp" }, /* @__PURE__ */ React.createElement(Icon, { name: "whatsapp" }), " ", /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, /* @__PURE__ */ React.createElement("a", { href: "https://wa.me/33786237848", target: "_blank", rel: "noopener noreferrer", style: { color: "inherit", textDecoration: "none" } }, t("WhatsApp Vincent", "WhatsApp Vincent"))), /* @__PURE__ */ React.createElement("span", null, t("R\xE9ponse rapide", "Quick reply")))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(Icon, { name: "mail" }), " ", /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, /* @__PURE__ */ React.createElement("a", { href: "mailto:contact@south-boat.com", style: { color: "inherit", textDecoration: "none" } }, "contact@south-boat.com")), /* @__PURE__ */ React.createElement("span", null, t("Nous \xE9crire", "Write to us")))), /* @__PURE__ */ React.createElement("li", { className: "brand-instagram" }, /* @__PURE__ */ React.createElement(Icon, { name: "instagram" }), " ", /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, /* @__PURE__ */ React.createElement("a", { href: "https://www.instagram.com/south_boat_/", target: "_blank", rel: "noopener noreferrer", style: { color: "inherit", textDecoration: "none" } }, "@south_boat_")), /* @__PURE__ */ React.createElement("span", null, t("Nous suivre sur Instagram", "Follow us on Instagram")))))), /* @__PURE__ */ React.createElement("form", { className: "contact-form", onSubmit: async (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const name = form.querySelector('input[type="text"]').value;
      const email = form.querySelector('input[type="email"]').value;
      const subject = form.querySelector("select").value;
      const message = form.querySelector("textarea").value;
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            access_key: "867b6825-3025-4db9-88a7-56b7f25342f8",
            subject: "[Contact South Boat] " + subject,
            from_name: name,
            email,
            name,
            sujet: subject,
            message
          })
        });
        const data = await res.json();
        if (data.success) {
          setSent(true);
        } else {
          alert(t(
            "Une erreur est survenue. Merci de r\xE9essayer ou de nous \xE9crire \xE0 contact@south-boat.com",
            "An error occurred. Please try again or email us at contact@south-boat.com"
          ));
        }
      } catch (err) {
        alert(t(
          "Une erreur est survenue. Merci de r\xE9essayer ou de nous \xE9crire \xE0 contact@south-boat.com",
          "An error occurred. Please try again or email us at contact@south-boat.com"
        ));
      }
    } }, sent ? /* @__PURE__ */ React.createElement("div", { className: "sent" }, /* @__PURE__ */ React.createElement("div", { className: "success-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 28 })), /* @__PURE__ */ React.createElement("h3", null, t("Merci pour votre message", "Thank you for your message")), /* @__PURE__ */ React.createElement("p", null, t("Nous revenons vers vous tr\xE8s vite.", "We'll get back to you very soon."))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "form-grid" }, /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, t("Nom", "Name")), /* @__PURE__ */ React.createElement("input", { type: "text", required: true })), /* @__PURE__ */ React.createElement("label", { className: "field" }, /* @__PURE__ */ React.createElement("span", null, t("Email", "Email")), /* @__PURE__ */ React.createElement("input", { type: "email", required: true })), /* @__PURE__ */ React.createElement("label", { className: "field full" }, /* @__PURE__ */ React.createElement("span", null, t("Sujet", "Subject")), /* @__PURE__ */ React.createElement("select", null, /* @__PURE__ */ React.createElement("option", null, t("Demande de r\xE9servation", "Booking request")), /* @__PURE__ */ React.createElement("option", null, t("Question sur un bateau", "Question about a boat")), /* @__PURE__ */ React.createElement("option", null, t("Privatisation / \xE9v\xE9nement", "Private charter / event")), /* @__PURE__ */ React.createElement("option", null, t("Autre", "Other")))), /* @__PURE__ */ React.createElement("label", { className: "field full" }, /* @__PURE__ */ React.createElement("span", null, t("Message", "Message")), /* @__PURE__ */ React.createElement("textarea", { rows: "5", required: true }))), /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary btn-block", type: "submit" }, t("Envoyer le message", "Send message"))))), /* @__PURE__ */ React.createElement(Footer, null));
  }
  var fmtArticleDate = (s, lang) => {
    if (!s) return "";
    const [y, m, day] = s.split("-").map(Number);
    const d = new Date(y, m - 1, day);
    return d.toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "long", year: "numeric" });
  };
  function CapSudListPage({ setPage }) {
    const t = window.useT();
    const articles = window.ARTICLES || [];
    const highlight = articles.find((a) => a.featured) || articles[0];
    const rest = articles;
    return /* @__PURE__ */ React.createElement("main", { className: "capsud" }, /* @__PURE__ */ React.createElement(Breadcrumb, { setPage, trail: [
      { label: t("Accueil", "Home"), page: { name: "home" } },
      { label: "Cap Sud" }
    ] }), /* @__PURE__ */ React.createElement("section", { className: "hero" }, /* @__PURE__ */ React.createElement("div", { className: "hero-bg" }, /* @__PURE__ */ React.createElement("img", { src: asset("images/capsud-hero.jpeg"), alt: t("Bateau au mouillage sur la C\xF4te d'Azur \u2014 Cap Sud, le blog nautisme de South Boat", "Boat at anchor on the French Riviera \u2014 Cap Sud, South Boat's nautical blog") }), /* @__PURE__ */ React.createElement("div", { className: "hero-overlay hero-overlay-grad" })), /* @__PURE__ */ React.createElement("div", { className: "hero-content" }, /* @__PURE__ */ React.createElement("div", { className: "hero-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " ", t("Carnet de bord \xB7 Saison 2026", "Logbook \xB7 2026 season")), /* @__PURE__ */ React.createElement("h1", { className: "hero-title" }, "Cap Sud"), /* @__PURE__ */ React.createElement("p", { className: "hero-sub" }, t(
      "R\xE9cits de mer, itin\xE9raires et conseils de l'\xE9quipage South Boat \u2014 pour bien pr\xE9parer vos sorties depuis Mandelieu.",
      "Sea stories, itineraries and tips from the South Boat crew \u2014 to help you plan your outings from Mandelieu."
    )))), highlight && /* @__PURE__ */ React.createElement("section", { className: "section departure" }, /* @__PURE__ */ React.createElement("div", { className: "section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, t("\xC0 la une", "Featured")), /* @__PURE__ */ React.createElement("h2", null, t("L'article du moment", "Article of the moment")))), /* @__PURE__ */ React.createElement("div", { className: "departure-card", onClick: () => setPage({ name: "capsud-article", id: highlight.id }), style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { className: "departure-map" }, /* @__PURE__ */ React.createElement("img", { src: asset(highlight.cover), alt: highlight.title, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })), /* @__PURE__ */ React.createElement("div", { className: "departure-text" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, fmtArticleDate(highlight.date, t.lang)), /* @__PURE__ */ React.createElement("h2", null, highlight.title), /* @__PURE__ */ React.createElement("p", { className: "lead" }, highlight.excerpt), /* @__PURE__ */ React.createElement("div", { className: "departure-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary", onClick: (e) => {
      e.stopPropagation();
      setPage({ name: "capsud-article", id: highlight.id });
    } }, t("Lire l'article", "Read article"), " ", /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 16 })))))), /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, t("Tous les articles", "All articles")), /* @__PURE__ */ React.createElement("h2", null, t("Le journal de l'\xE9quipage", "The crew's journal"))), /* @__PURE__ */ React.createElement("span", { className: "muted" }, rest.length, " ", t(rest.length > 1 ? "articles" : "article", rest.length > 1 ? "articles" : "article"))), rest.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "empty" }, /* @__PURE__ */ React.createElement("p", null, t("Aucun article pour le moment. Revenez bient\xF4t !", "No articles yet. Come back soon!"))) : /* @__PURE__ */ React.createElement("div", { className: "capsud-grid" }, rest.map((a) => /* @__PURE__ */ React.createElement("article", { key: a.id, className: "capsud-card", onClick: () => setPage({ name: "capsud-article", id: a.id }) }, /* @__PURE__ */ React.createElement("div", { className: "capsud-card-img" }, /* @__PURE__ */ React.createElement("img", { src: asset(a.cover), alt: a.title, loading: "lazy", decoding: "async" })), /* @__PURE__ */ React.createElement("div", { className: "capsud-card-body" }, /* @__PURE__ */ React.createElement("span", { className: "capsud-date" }, fmtArticleDate(a.date, t.lang)), /* @__PURE__ */ React.createElement("h3", null, a.title), /* @__PURE__ */ React.createElement("p", null, a.excerpt), /* @__PURE__ */ React.createElement("span", { className: "capsud-cta" }, t("Lire l'article", "Read article"), " ", /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 15 }))))))), /* @__PURE__ */ React.createElement("section", { className: "section departure" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "departure-card",
        style: { gridTemplateColumns: "1fr", background: "var(--navy)", border: "none", color: "white" }
      },
      /* @__PURE__ */ React.createElement("div", { className: "departure-text" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow", style: { color: "rgba(255,255,255,0.7)" } }, t("Lettre du large", "Sea newsletter")), /* @__PURE__ */ React.createElement("h2", { style: { color: "white" } }, t("Recevez Cap Sud dans votre bo\xEEte mail", "Get Cap Sud in your inbox")), /* @__PURE__ */ React.createElement("p", { className: "lead", style: { color: "rgba(255,255,255,0.85)" } }, t(
        "Un r\xE9cit, un itin\xE9raire et une astuce de skipper, une fois par mois. Pas de spam, juste de la mer.",
        "One story, one itinerary and one skipper's tip, once a month. No spam \u2014 just the sea."
      )), /* @__PURE__ */ React.createElement(
        "form",
        {
          className: "departure-actions",
          style: { flexDirection: "row", gap: 10, flexWrap: "wrap", marginTop: 24 },
          onSubmit: (e) => {
            e.preventDefault();
            alert(t("Merci ! Vous \xEAtes inscrit\xB7e.", "Thank you! You're subscribed."));
          }
        },
        /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "email",
            placeholder: t("votre@email.fr", "your@email.com"),
            required: true,
            style: { flex: "1 1 220px", padding: "13px 18px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "var(--radius)", fontSize: 14, background: "rgba(255,255,255,0.08)", color: "white" }
          }
        ),
        /* @__PURE__ */ React.createElement("button", { className: "btn", type: "submit", style: { background: "white", color: "var(--navy)" } }, t("S'inscrire", "Subscribe"))
      ))
    )), /* @__PURE__ */ React.createElement(Footer, null));
  }
  function CapSudArticlePage({ id, setPage }) {
    const t = window.useT();
    const articles = window.ARTICLES || [];
    const article = articles.find((a) => a.id === id) || articles[0];
    React.useEffect(() => {
      if (!article) return;
      const ld = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "image": [article.cover],
        "datePublished": article.date,
        "dateModified": article.date,
        "author": { "@type": "Person", "name": article.author || "L'\xE9quipage South Boat" },
        "publisher": {
          "@type": "Organization",
          "name": "South Boat",
          "logo": { "@type": "ImageObject", "url": "https://south-boat.com/images/mochi/location-bateau-mandelieu-south-boat.jpg" }
        },
        "description": article.excerpt || "",
        "mainEntityOfPage": "https://south-boat.com/cap-sud/" + article.id
      };
      const tag = document.createElement("script");
      tag.type = "application/ld+json";
      tag.id = "ld-article";
      tag.textContent = JSON.stringify(ld);
      const existing = document.getElementById("ld-article");
      if (existing) existing.remove();
      document.head.appendChild(tag);
      return () => {
        const e = document.getElementById("ld-article");
        if (e) e.remove();
      };
    }, [article]);
    if (!article) {
      return /* @__PURE__ */ React.createElement("main", { className: "capsud" }, /* @__PURE__ */ React.createElement("section", { className: "section" }, /* @__PURE__ */ React.createElement("p", null, t("Article introuvable.", "Article not found.")), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", onClick: () => setPage({ name: "capsud" }) }, "\u2190 ", t("Retour aux articles", "Back to articles"))), /* @__PURE__ */ React.createElement(Footer, null));
    }
    return /* @__PURE__ */ React.createElement("main", { className: "capsud-article" }, /* @__PURE__ */ React.createElement(Breadcrumb, { setPage, trail: [
      { label: t("Accueil", "Home"), page: { name: "home" } },
      { label: "Cap Sud", page: { name: "capsud" } },
      { label: article.title }
    ] }), /* @__PURE__ */ React.createElement("div", { className: "detail-top" }, /* @__PURE__ */ React.createElement("button", { className: "back", onClick: () => setPage({ name: "capsud" }) }, /* @__PURE__ */ React.createElement(Icon, { name: "arrowL", size: 16 }), " ", t("Retour \xE0 Cap Sud", "Back to Cap Sud"))), /* @__PURE__ */ React.createElement("article", { className: "article-wrap" }, /* @__PURE__ */ React.createElement("header", { className: "article-head" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, t("Cap Sud \xB7 Carnet de bord", "Cap Sud \xB7 Logbook")), /* @__PURE__ */ React.createElement("h1", null, article.title), /* @__PURE__ */ React.createElement("p", { className: "article-meta" }, /* @__PURE__ */ React.createElement("time", { dateTime: article.date }, fmtArticleDate(article.date, t.lang)), article.author && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "dot-sep" }, "\xB7"), /* @__PURE__ */ React.createElement("span", null, article.author)))), /* @__PURE__ */ React.createElement("div", { className: "article-cover" }, /* @__PURE__ */ React.createElement("img", { src: asset(article.cover), alt: `${article.title} \u2014 Cap Sud, ${t("blog nautisme South Boat", "South Boat nautical blog")}`, fetchpriority: "high", decoding: "async" })), /* @__PURE__ */ React.createElement("div", { className: "article-body" }, (article.content || []).map((p, i) => {
      if (p.startsWith("### ")) return /* @__PURE__ */ React.createElement("h3", { key: i }, p.slice(4));
      if (p.startsWith("## ")) return /* @__PURE__ */ React.createElement("h2", { key: i }, p.slice(3));
      if (p.startsWith("# ")) return /* @__PURE__ */ React.createElement("h2", { key: i }, p.slice(2));
      return /* @__PURE__ */ React.createElement("p", { key: i }, p);
    })), /* @__PURE__ */ React.createElement("div", { className: "article-foot" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-outline", onClick: () => setPage({ name: "capsud" }) }, "\u2190 ", t("Tous les articles", "All articles")), /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary", onClick: () => setPage({ name: "catalog" }), style: { borderRadius: 20 } }, t("R\xE9server un bateau", "Book a boat"), " ", /* @__PURE__ */ React.createElement(Icon, { name: "arrow", size: 16 })))), /* @__PURE__ */ React.createElement(Footer, null));
  }
  function LegalShell({ setPage, eyebrow, title, updated, children }) {
    const t = window.useT();
    return /* @__PURE__ */ React.createElement("main", { className: "legal-page" }, /* @__PURE__ */ React.createElement(Breadcrumb, { setPage, trail: [
      { label: t("Accueil", "Home"), page: { name: "home" } },
      { label: eyebrow }
    ] }), /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, eyebrow), /* @__PURE__ */ React.createElement("h1", null, title), updated && /* @__PURE__ */ React.createElement("p", { className: "legal-updated" }, updated), children, /* @__PURE__ */ React.createElement(Footer, null));
  }
  function MentionsLegalesPage({ setPage }) {
    const t = window.useT();
    return /* @__PURE__ */ React.createElement(
      LegalShell,
      {
        setPage,
        eyebrow: t("Mentions l\xE9gales", "Legal notice"),
        title: t("Mentions l\xE9gales", "Legal notice"),
        updated: t("Conform\xE9ment \xE0 la loi n\xB0 2004-575 du 21 juin 2004 (LCEN).", "Pursuant to French law n\xB0 2004-575 of 21 June 2004 (LCEN).")
      },
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 1 \u2014 \xC9diteur du site"), /* @__PURE__ */ React.createElement("div", { className: "legal-card" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "D\xE9nomination sociale :"), " SOUTH BOAT"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Si\xE8ge social :"), " 4 rue des Grillons, 06130 Grasse"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "RCS :"), " Grasse \u2014 102 042 082"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Co-dirigeants :"), " Maxim Camilo et Vincent Condo"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "T\xE9l\xE9phone :"), " 06 34 49 16 21 (Maxim) / 07 86 23 78 48 (Vincent)"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Email :"), " ", /* @__PURE__ */ React.createElement("a", { href: "mailto:contact@south-boat.com" }, "contact@south-boat.com")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Site internet :"), " ", /* @__PURE__ */ React.createElement("a", { href: "https://south-boat.com" }, "south-boat.com")))),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 2 \u2014 H\xE9bergeur"), /* @__PURE__ */ React.createElement("div", { className: "legal-card" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Hostinger International Ltd")), /* @__PURE__ */ React.createElement("p", null, "61 Lordou Vironos Street, 6023 Larnaca, Chypre"), /* @__PURE__ */ React.createElement("p", null, "Site web : ", /* @__PURE__ */ React.createElement("a", { href: "https://www.hostinger.fr", target: "_blank", rel: "noopener noreferrer" }, "www.hostinger.fr")))),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 3 \u2014 Propri\xE9t\xE9 intellectuelle"), /* @__PURE__ */ React.createElement("p", null, "L'ensemble des contenus pr\xE9sents sur le site de SOUTH BOAT (textes, images, photographies, vid\xE9os, logos, graphismes, etc.) sont prot\xE9g\xE9s par le droit de la propri\xE9t\xE9 intellectuelle et sont la propri\xE9t\xE9 exclusive de SOUTH BOAT ou de leurs auteurs respectifs."), /* @__PURE__ */ React.createElement("p", null, "Toute reproduction, repr\xE9sentation, modification, publication ou adaptation de tout ou partie de ces \xE9l\xE9ments, quel que soit le moyen ou le proc\xE9d\xE9 utilis\xE9, est interdite sans l'autorisation pr\xE9alable et \xE9crite de SOUTH BOAT, sous peine de poursuites judiciaires.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 4 \u2014 Responsabilit\xE9"), /* @__PURE__ */ React.createElement("p", null, "SOUTH BOAT s'efforce d'assurer l'exactitude et la mise \xE0 jour des informations diffus\xE9es sur son site. Toutefois, SOUTH BOAT ne peut garantir l'exactitude, la pr\xE9cision ou l'exhaustivit\xE9 des informations mises \xE0 disposition."), /* @__PURE__ */ React.createElement("p", null, "SOUTH BOAT d\xE9cline toute responsabilit\xE9 pour toute impr\xE9cision, inexactitude ou omission portant sur des informations disponibles sur le site, ainsi que pour tous dommages r\xE9sultant d'une intrusion frauduleuse d'un tiers ayant entra\xEEn\xE9 une modification des informations publi\xE9es.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 5 \u2014 Liens hypertextes"), /* @__PURE__ */ React.createElement("p", null, "Le site de SOUTH BOAT peut contenir des liens hypertextes vers d'autres sites internet. SOUTH BOAT n'exerce aucun contr\xF4le sur ces sites et d\xE9cline toute responsabilit\xE9 quant \xE0 leur contenu ou aux pratiques de ces tiers en mati\xE8re de protection des donn\xE9es personnelles."), /* @__PURE__ */ React.createElement("p", null, "La cr\xE9ation de liens hypertextes pointant vers le site de SOUTH BOAT est soumise \xE0 l'accord pr\xE9alable et \xE9crit de SOUTH BOAT.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 6 \u2014 Cookies"), /* @__PURE__ */ React.createElement("p", null, "Le site de SOUTH BOAT est susceptible d'utiliser des cookies afin d'am\xE9liorer l'exp\xE9rience utilisateur. L'utilisateur peut configurer son navigateur pour refuser les cookies ou \xEAtre alert\xE9 de leur utilisation."), /* @__PURE__ */ React.createElement("p", null, "Pour plus d'informations sur l'utilisation des cookies et des donn\xE9es personnelles, veuillez consulter notre ", /* @__PURE__ */ React.createElement("a", { onClick: () => setPage({ name: "privacy" }), style: { cursor: "pointer" } }, "Politique de Confidentialit\xE9"), ".")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 7 \u2014 Droit applicable et juridiction comp\xE9tente"), /* @__PURE__ */ React.createElement("p", null, "Les pr\xE9sentes mentions l\xE9gales sont r\xE9gies par le droit fran\xE7ais. En cas de litige, et apr\xE8s tentative de r\xE9solution amiable, les tribunaux fran\xE7ais seront seuls comp\xE9tents. Pour tout diff\xE9rend, comp\xE9tence est donn\xE9e au Tribunal de Grasse.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 8 \u2014 Contact"), /* @__PURE__ */ React.createElement("div", { className: "legal-card" }, /* @__PURE__ */ React.createElement("p", null, "Par email : ", /* @__PURE__ */ React.createElement("a", { href: "mailto:contact@south-boat.com" }, "contact@south-boat.com")), /* @__PURE__ */ React.createElement("p", null, "Par t\xE9l\xE9phone : 06 34 49 16 21 ou 07 86 23 78 48"), /* @__PURE__ */ React.createElement("p", null, "Par courrier : SOUTH BOAT \u2014 4 rue des Grillons, 06130 Grasse")))
    );
  }
  function CGVPage({ setPage }) {
    const t = window.useT();
    return /* @__PURE__ */ React.createElement(
      LegalShell,
      {
        setPage,
        eyebrow: t("Conditions G\xE9n\xE9rales de Vente", "Terms & Conditions"),
        title: t("Conditions G\xE9n\xE9rales de Vente", "Terms & Conditions"),
        updated: t("Applicables \xE0 toute r\xE9servation aupr\xE8s de SOUTH BOAT.", "Applicable to all bookings with SOUTH BOAT.")
      },
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 1 \u2014 Application des conditions"), /* @__PURE__ */ React.createElement("p", null, "Le loueur est d\xE9fini ci-dessous comme \xE9tant la Soci\xE9t\xE9 SOUTH BOAT, dont le si\xE8ge social se trouve \xE0 l'adresse suivante : 4 rue des Grillons, 06130 Grasse. Soci\xE9t\xE9 inscrite au RCS de Grasse sous le num\xE9ro 102 042 082."), /* @__PURE__ */ React.createElement("p", null, "Le locataire est d\xE9fini ci-dessous comme \xE9tant la soci\xE9t\xE9 ou la personne signataire et acceptant les pr\xE9sentes conditions g\xE9n\xE9rales de location. Le locataire reconna\xEEt avoir la capacit\xE9 de contracter aux conditions d\xE9crites ci-apr\xE8s, c'est-\xE0-dire avoir la majorit\xE9 l\xE9gale et ne pas \xEAtre sous tutelle ou curatelle. Le locataire reconna\xEEt avoir pris connaissance des pr\xE9sentes CGV avant d'avoir pass\xE9 commande."), /* @__PURE__ */ React.createElement("p", null, "Les pr\xE9sentes conditions g\xE9n\xE9rales peuvent \xEAtre modifi\xE9es \xE0 tout moment et sans pr\xE9avis par la soci\xE9t\xE9 South Boat, les modifications \xE9tant alors applicables \xE0 toutes commandes post\xE9rieures.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 2 \u2014 Tarification"), /* @__PURE__ */ React.createElement("p", null, "Le montant de la location reste acquis au loueur, que le locataire ait fait ou non usage du bateau pendant la p\xE9riode de location quel que soit le motif de cette vacance."), /* @__PURE__ */ React.createElement("p", null, "Les m\xE9thodes de paiement peuvent se faire directement sur le site de la soci\xE9t\xE9 South Boat, par virement ou lien de paiement avant toute prise en charge du bateau.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 3 \u2014 R\xE9siliation du contrat par le loueur"), /* @__PURE__ */ React.createElement("p", null, "Si suite \xE0 une avarie survenue pendant la location pr\xE9c\xE9dente ou \xE0 un emp\xEAchement ind\xE9pendant de sa volont\xE9 le loueur ne peut donner la jouissance du bateau d\xE9sign\xE9, il a pleine facult\xE9 de mettre \xE0 la disposition du locataire une unit\xE9 de taille \xE9quivalente ou plus importante. S'il ne peut le faire 48 heures apr\xE8s la date pr\xE9vue de d\xE9part, les sommes vers\xE9es sont restitu\xE9es sans que le locataire ne puisse pr\xE9tendre \xE0 des dommages et int\xE9r\xEAts.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 4 \u2014 Absence de droit de r\xE9tractation"), /* @__PURE__ */ React.createElement("p", null, "Conform\xE9ment aux dispositions de l'article L.221-28, 12\xB0 du Code de la consommation, le Client est inform\xE9 que le droit de r\xE9tractation de quatorze (14) jours pr\xE9vu pour les contrats conclus \xE0 distance ou hors \xE9tablissement ne s'applique pas aux contrats portant sur des prestations d'activit\xE9s de loisirs devant \xEAtre fournies \xE0 une date ou selon une p\xE9riode d\xE9termin\xE9e."), /* @__PURE__ */ React.createElement("p", null, "Les prestations de location de bateau propos\xE9es par SOUTH BOAT \xE9tant des activit\xE9s de loisirs ex\xE9cut\xE9es \xE0 une date et sur un cr\xE9neau horaire convenus lors de la r\xE9servation, le Client ne b\xE9n\xE9ficie d'aucun droit de r\xE9tractation apr\xE8s la conclusion du contrat."), /* @__PURE__ */ React.createElement("p", null, "Toute r\xE9servation est donc ferme et d\xE9finitive. En cas d'annulation par le Client, les conditions d'annulation et de remboursement pr\xE9vues aux pr\xE9sentes Conditions G\xE9n\xE9rales de Vente s'appliquent.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 5 \u2014 R\xE9siliation du contrat par le locataire"), /* @__PURE__ */ React.createElement("p", null, "En cas d'annulation de la r\xE9servation par le locataire, les sommes vers\xE9es restent acquises au LOUEUR au titre d'indemnit\xE9s de r\xE9siliation, sauf si l'annulation est effectu\xE9e dans un d\xE9lai de 7 jours avant la date pr\xE9vue.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 6 \u2014 Prise en charge du bateau"), /* @__PURE__ */ React.createElement("p", null, "Le loueur s'engage \xE0 confier au locataire un bateau dans un parfait \xE9tat de fonctionnement, d'ordre et de propret\xE9 ; les piles, le gaz, le carburant, ainsi que les frais de transport sont \xE0 la charge du locataire, la recharge de gaz pleine, les pleins de carburant et d'eau faits."), /* @__PURE__ */ React.createElement("p", null, "Un inventaire sign\xE9 par le locataire et le loueur vaut reconnaissance du mat\xE9riel mis \xE0 disposition. Le locataire doit d\xE8s la prise en mains du bateau contr\xF4ler cet inventaire pour v\xE9rifier le bon \xE9tat du bateau et de son \xE9quipement. En cas d'arriv\xE9e la veille au soir de la location ou de non-signature de l'inventaire, si aucune remarque ou r\xE9serve n'est faite pr\xE9alablement \xE0 son d\xE9part en location, le locataire reconna\xEEt express\xE9ment accepter l'inventaire \xE9tabli par le loueur.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 8 \u2014 Obligations du locataire"), /* @__PURE__ */ React.createElement("p", null, "Le locataire certifie que le chef de bord a les connaissances n\xE9cessaires pour accomplir la navigation envisag\xE9e."), /* @__PURE__ */ React.createElement("p", null, "Le locataire d'un bateau \xE0 moteur au-dessus de 6 CV certifie \xEAtre titulaire du permis mer (carte Mer, permis C\xF4tier ou Hauturier) dont il doit fournir une photocopie. Le locataire s'engage \xE0 n'embarquer que le nombre de personnes correspondant \xE0 la r\xE9glementation. Il s'engage \xE0 n'utiliser le bateau que pour une navigation de plaisance dans le cadre de la l\xE9gislation maritime et douani\xE8re en vigueur, en correspondance avec le type et l'armement du bateau d\xE9sign\xE9, \xE0 l'exclusion de toutes op\xE9rations de commerce, p\xEAche professionnelle, transport ou autre."), /* @__PURE__ */ React.createElement("p", null, "Le locataire d\xE9charge express\xE9ment le loueur de toute responsabilit\xE9 en qualit\xE9 d'armateur ou autre du fait d'un manquement \xE0 ces interdictions, et r\xE9pond seul vis-\xE0-vis des services maritimes ou des douanes, des proc\xE8s, poursuites, amendes et confiscations encourus par lui de ce chef m\xEAme en cas de faute involontaire de sa part."), /* @__PURE__ */ React.createElement("p", null, "En cas de saisie du bateau lou\xE9, le locataire est tenu de rembourser sa valeur dans un d\xE9lai d'un mois. Il est formellement interdit au locataire de laisser le bateau en mouillage forain ou sans surveillance, sans personne \xE0 bord capable de le man\u0153uvrer. En cas de sinistre dans de telles circonstances, la responsabilit\xE9 du locataire serait irr\xE9vocablement engag\xE9e.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 9 \u2014 Contrat de location-affr\xE8tement et assurances"), /* @__PURE__ */ React.createElement("p", null, "Le loueur est tenu de lire et de comprendre le contrat de location suivant avant le d\xE9part.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 10 \u2014 Caution"), /* @__PURE__ */ React.createElement("p", null, "La caution est vers\xE9e par le locataire au moment de la prise en charge du bateau. \xC0 hauteur de ", /* @__PURE__ */ React.createElement("strong", null, "2 000 \u20AC"), ", elle a pour objet de garantir les d\xE9t\xE9riorations du bien lou\xE9 ou les pertes d'objets imputables au locataire et non couvertes par l'assurance. Elle est restitu\xE9e entre huit et trente jours apr\xE8s le retour du bateau. En cas de d\xE9t\xE9rioration du bien lou\xE9 ou de pertes non couvertes par l'assurance imputables au locataire, ou sur lesquelles un doute subsiste, le remboursement de la caution peut \xEAtre diff\xE9r\xE9 jusqu'au r\xE8glement des frais correspondants par le locataire. Le loueur est tenu de rembourser un r\xE8glement vers\xE9 post\xE9rieurement par l'assurance."), /* @__PURE__ */ React.createElement("p", null, "La franchise, fix\xE9e \xE0 ", /* @__PURE__ */ React.createElement("strong", null, "370 \u20AC"), ", doit \xEAtre r\xE9gl\xE9e par le locataire dans un d\xE9lai de 30 jours ouvrables suivant la date du sinistre.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 11 \u2014 Avaries survenant en cours de location"), /* @__PURE__ */ React.createElement("h3", null, "1. Obligation d'information"), /* @__PURE__ */ React.createElement("p", null, "Le locataire s'engage \xE0 informer imm\xE9diatement le loueur de toute avarie, panne, anomalie de fonctionnement, \xE9chouement, collision, perte d'accessoire ou incident survenu pendant la dur\xE9e de la location, m\xEAme si celui-ci semble mineur."), /* @__PURE__ */ React.createElement("h3", null, "2. Avarie mineure"), /* @__PURE__ */ React.createElement("p", null, "En cas d'avarie ne compromettant pas la s\xE9curit\xE9 du bateau ni la poursuite de la navigation, le locataire doit contacter le loueur. Aucune r\xE9paration, remplacement de pi\xE8ce ou intervention d'un tiers ne pourra \xEAtre engag\xE9 sans l'accord pr\xE9alable du loueur, sauf en cas d'urgence absolue mettant en danger les personnes ou le navire."), /* @__PURE__ */ React.createElement("h3", null, "3. Avarie grave"), /* @__PURE__ */ React.createElement("p", null, "En cas d'avarie grave (voie d'eau, incendie, collision, \xE9chouement, perte de propulsion, perte de direction ou tout autre \xE9v\xE9nement compromettant la s\xE9curit\xE9), le locataire devra :"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "assurer en priorit\xE9 la s\xE9curit\xE9 des personnes embarqu\xE9es ;"), /* @__PURE__ */ React.createElement("li", null, "pr\xE9venir imm\xE9diatement le loueur par t\xE9l\xE9phone ;"), /* @__PURE__ */ React.createElement("li", null, "suivre les instructions donn\xE9es par le loueur ;"), /* @__PURE__ */ React.createElement("li", null, "contacter les services de secours si la situation l'exige ;"), /* @__PURE__ */ React.createElement("li", null, "ne pas abandonner le navire sauf en cas de danger imm\xE9diat.")), /* @__PURE__ */ React.createElement("h3", null, "4. Responsabilit\xE9 du locataire"), /* @__PURE__ */ React.createElement("p", null, "Le locataire est responsable de toute avarie r\xE9sultant d'une mauvaise utilisation du bateau, d'une faute de navigation, du non-respect de la r\xE9glementation maritime, d'une n\xE9gligence ou d'un usage contraire aux consignes remises lors de la prise en main."), /* @__PURE__ */ React.createElement("p", null, "Les frais de r\xE9paration, de remorquage, de r\xE9cup\xE9ration du bateau, d'immobilisation ainsi que les \xE9ventuels dommages caus\xE9s \xE0 des tiers pourront \xEAtre mis \xE0 sa charge dans la limite des dispositions du contrat, des garanties d'assurance et du d\xE9p\xF4t de garantie."), /* @__PURE__ */ React.createElement("h3", null, "5. Avarie non imputable au locataire"), /* @__PURE__ */ React.createElement("p", null, "Lorsqu'une panne ou une avarie r\xE9sulte d'un vice cach\xE9, d'une usure normale ou d'une d\xE9faillance technique ind\xE9pendante de toute faute du locataire, celui-ci ne pourra \xEAtre tenu responsable des r\xE9parations."), /* @__PURE__ */ React.createElement("h3", null, "6. Restitution"), /* @__PURE__ */ React.createElement("p", null, "Toute avarie, m\xEAme r\xE9par\xE9e pendant la location, devra \xEAtre signal\xE9e au retour du bateau. Le locataire s'engage \xE0 fournir un r\xE9cit pr\xE9cis des circonstances de l'incident afin de faciliter les d\xE9marches d'assurance si n\xE9cessaire."), /* @__PURE__ */ React.createElement("p", null, "Toute dissimulation volontaire d'une avarie pourra entra\xEEner la retenue totale ou partielle du d\xE9p\xF4t de garantie, sans pr\xE9judice des poursuites ou demandes d'indemnisation qui pourraient \xEAtre engag\xE9es. Le loueur fera alors ses meilleurs efforts pour proposer une solution adapt\xE9e (assistance, remplacement du bateau si possible ou remboursement partiel de la prestation en fonction du temps de navigation r\xE9ellement effectu\xE9).")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 12 \u2014 Restitution du bateau"), /* @__PURE__ */ React.createElement("p", null, "Le locataire est tenu de restituer le bateau au port d'embarquement au jour et \xE0 l'heure convenus. Tout retard non justifi\xE9 et non autoris\xE9 par le loueur donnera lieu \xE0 l'application d'une p\xE9nalit\xE9 forfaitaire de ", /* @__PURE__ */ React.createElement("strong", null, "50 \u20AC"), " pour la premi\xE8re heure de retard entam\xE9e. Au-del\xE0, chaque heure de retard sera factur\xE9e au double du tarif horaire de location en vigueur."), /* @__PURE__ */ React.createElement("p", null, "De plus, si ce retard entra\xEEne l'annulation ou la modification de la location du client suivant, le locataire sortant sera tenu de rembourser l'int\xE9gralit\xE9 du pr\xE9judice commercial subi par le loueur, ainsi que les frais annexes g\xE9n\xE9r\xE9s (frais de recherche, d\xE9placements, etc.). En cas de force majeure emp\xEAchant le retour \xE0 l'heure, le locataire doit imm\xE9diatement contacter le loueur pour convenir de la marche \xE0 suivre.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 13 \u2014 R\xE9serves"), /* @__PURE__ */ React.createElement("p", null, "La sous-location et le pr\xEAt sont rigoureusement interdits, sous peine de poursuites, tous frais \xE9tant alors \xE0 la charge du locataire. L'utilisation en course ou en r\xE9gate ne peut \xEAtre effectu\xE9e qu'en accord avec LE LOUEUR, avec un suppl\xE9ment au tarif, franchise et caution doubl\xE9es.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 14 \u2014 Livre de bord"), /* @__PURE__ */ React.createElement("p", null, "Le locataire du bateau est responsable, en vertu des lois et r\xE8glements sur la navigation de plaisance, de la tenue du livre de bord pendant toute la dur\xE9e de l'affr\xE8tement (en 3\u1D49, 2\u1D49 et 1\u02B3\u1D49 cat\xE9gorie). Sur ce livre de bord fourni par le loueur doivent figurer les indications sur la navigation et tous les incidents et avaries relatifs au bateau et \xE0 la navigation.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 15 \u2014 Litiges"), /* @__PURE__ */ React.createElement("p", null, "Tous frais quelconques de proc\xE9dure cons\xE9cutifs \xE0 la pr\xE9sente location seraient \xE0 la charge du locataire responsable, sauf d\xE9cision contraire du tribunal. Pour toutes contestations relatives \xE0 l'ex\xE9cution du pr\xE9sent contrat, l'attribution de juridiction est faite au tribunal de Grasse.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 16 \u2014 Cas de force majeure"), /* @__PURE__ */ React.createElement("p", null, "La Soci\xE9t\xE9 se d\xE9gage de toute responsabilit\xE9 pour tout manquement quelconque \xE0 ses obligations contractuelles dans les cas de force majeure ou fortuits, y compris et \xE0 titre non limitatif, guerre, catastrophes, incendies, gr\xE8ve interne ou externe, d\xE9faillance ou pannes internes ou externes, et d'une mani\xE8re g\xE9n\xE9rale tout \xE9v\xE9nement ne permettant pas la bonne ex\xE9cution des commandes.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 17 \u2014 Processus de m\xE9diation des litiges de consommation"), /* @__PURE__ */ React.createElement("p", null, "Conform\xE9ment \xE0 l'article L612-1 du Code de la consommation, tout consommateur a le droit de recourir gratuitement \xE0 un m\xE9diateur de la consommation en vue de la r\xE9solution amiable du litige qui l'oppose \xE0 un professionnel."), /* @__PURE__ */ React.createElement("p", null, "Apr\xE8s avoir \xE9crit \xE0 South Boat, le consommateur pourra saisir le Service du M\xE9diateur pour tout litige de consommation dont le r\xE8glement n'aurait pas abouti :"), /* @__PURE__ */ React.createElement("div", { className: "legal-card" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "MEDIATION-NET Consommation")), /* @__PURE__ */ React.createElement("p", null, "3, rue des Morillons \u2014 75015 Paris"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("a", { href: "https://www.mediation-net.com", target: "_blank", rel: "noopener noreferrer" }, "www.mediation-net.com"))), /* @__PURE__ */ React.createElement("p", null, "Conform\xE9ment \xE0 l'article 14 du R\xE8glement (UE) n\xB0 524/2013, la Commission europ\xE9enne a mis en place une plateforme de r\xE8glement en ligne des litiges (RLL), accessible \xE0 l'adresse suivante : ", /* @__PURE__ */ React.createElement("a", { href: "https://ec.europa.eu/consumers/odr", target: "_blank", rel: "noopener noreferrer" }, "ec.europa.eu/consumers/odr"), ".")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 18 \u2014 Territorialit\xE9"), /* @__PURE__ */ React.createElement("p", null, "Les pr\xE9sentes conditions g\xE9n\xE9rales sont soumises au droit fran\xE7ais. Le client peut, \xE0 tout moment, consulter ses droits sur les sites suivants : ", /* @__PURE__ */ React.createElement("a", { href: "https://www.legifrance.gouv.fr", target: "_blank", rel: "noopener noreferrer" }, "www.legifrance.gouv.fr"), " et ", /* @__PURE__ */ React.createElement("a", { href: "https://www.cnil.fr", target: "_blank", rel: "noopener noreferrer" }, "www.cnil.fr"), "."), /* @__PURE__ */ React.createElement("p", null, "Tout diff\xE9rend relatif \xE0 la validit\xE9, \xE0 l'interpr\xE9tation, \xE0 l'ex\xE9cution ou \xE0 la non-ex\xE9cution des pr\xE9sentes conditions g\xE9n\xE9rales sera soumis aux juridictions comp\xE9tentes conform\xE9ment aux dispositions du Code de la consommation et du Code de proc\xE9dure civile."), /* @__PURE__ */ React.createElement("p", null, "Conform\xE9ment \xE0 l'article R631-3 du Code de la consommation, le consommateur peut saisir, soit l'une des juridictions territorialement comp\xE9tentes en vertu du Code de proc\xE9dure civile, soit la juridiction du lieu o\xF9 il demeurait au moment de la conclusion du contrat ou de la survenance du fait dommageable.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 19 \u2014 Protection des donn\xE9es personnelles (RGPD)"), /* @__PURE__ */ React.createElement("p", null, "Conform\xE9ment au R\xE8glement (UE) 2016/679 du 27 avril 2016 (RGPD) et \xE0 la Loi Informatique et Libert\xE9s du 6 janvier 1978 modifi\xE9e, la soci\xE9t\xE9 SOUTH BOAT est responsable du traitement des donn\xE9es personnelles collect\xE9es dans le cadre des r\xE9servations et de l'ex\xE9cution du contrat de location."), /* @__PURE__ */ React.createElement("p", null, "Pour le d\xE9tail des traitements, dur\xE9es de conservation et de vos droits, consultez notre ", /* @__PURE__ */ React.createElement("a", { onClick: () => setPage({ name: "privacy" }), style: { cursor: "pointer" } }, "Politique de Confidentialit\xE9"), ".")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 20 \u2014 Conditions m\xE9t\xE9orologiques et s\xE9curit\xE9"), /* @__PURE__ */ React.createElement("p", null, "La navigation est soumise aux conditions m\xE9t\xE9orologiques et \xE0 l'appr\xE9ciation du loueur, dont la priorit\xE9 est la s\xE9curit\xE9 des personnes et des biens."), /* @__PURE__ */ React.createElement("p", null, "Le loueur se r\xE9serve le droit de refuser le d\xE9part, de retarder la prise en charge du bateau, d'interrompre ou d'annuler la location en cas de conditions m\xE9t\xE9orologiques d\xE9favorables, d'alerte \xE9mise par les autorit\xE9s comp\xE9tentes, de vent fort, de mer dangereuse ou de tout \xE9v\xE9nement susceptible de compromettre la s\xE9curit\xE9 de la navigation."), /* @__PURE__ */ React.createElement("p", null, "En cas d'annulation avant le d\xE9part pour des raisons de s\xE9curit\xE9 li\xE9es aux conditions m\xE9t\xE9orologiques, le locataire pourra, selon les disponibilit\xE9s, b\xE9n\xE9ficier soit :"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "d'un report de la location \xE0 une date ult\xE9rieure ;"), /* @__PURE__ */ React.createElement("li", null, "d'un avoir valable pendant une dur\xE9e de douze (12) mois ;"), /* @__PURE__ */ React.createElement("li", null, "ou du remboursement des sommes vers\xE9es, \xE0 l'exclusion de toute autre indemnit\xE9.")), /* @__PURE__ */ React.createElement("p", null, "Si les conditions m\xE9t\xE9orologiques se d\xE9gradent apr\xE8s le d\xE9part du bateau, aucun remboursement, total ou partiel, ne pourra \xEAtre exig\xE9 lorsque la prestation a d\xE9j\xE0 d\xE9but\xE9, sauf d\xE9cision commerciale du loueur."), /* @__PURE__ */ React.createElement("p", null, "Le chef de bord demeure responsable du respect des r\xE8gles de navigation et s'engage \xE0 suivre les consignes de s\xE9curit\xE9 donn\xE9es par SOUTH BOAT. Le port des \xE9quipements de s\xE9curit\xE9 obligatoires, le respect des limitations de navigation, des zones r\xE9glement\xE9es et des consignes des autorit\xE9s maritimes sont imp\xE9ratifs."), /* @__PURE__ */ React.createElement("p", null, "Le loueur pourra mettre fin imm\xE9diatement \xE0 la location sans indemnit\xE9 ni remboursement en cas de comportement dangereux, de non-respect des consignes de s\xE9curit\xE9, de navigation sous l'emprise de l'alcool ou de produits stup\xE9fiants, ou de toute utilisation du bateau susceptible de mettre en danger les personnes ou le mat\xE9riel."))
    );
  }
  function PrivacyPage({ setPage }) {
    const t = window.useT();
    return /* @__PURE__ */ React.createElement(
      LegalShell,
      {
        setPage,
        eyebrow: t("Confidentialit\xE9", "Privacy"),
        title: t("Politique de confidentialit\xE9", "Privacy policy"),
        updated: t("Derni\xE8re mise \xE0 jour : juillet 2026 \u2014 Conformit\xE9 RGPD.", "Last updated: July 2026 \u2014 GDPR compliant.")
      },
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 1 \u2014 Responsable du traitement"), /* @__PURE__ */ React.createElement("p", null, "Conform\xE9ment au R\xE8glement (UE) 2016/679 du 27 avril 2016 (RGPD) et \xE0 la Loi Informatique et Libert\xE9s du 6 janvier 1978 modifi\xE9e, le responsable du traitement des donn\xE9es personnelles collect\xE9es via le site et dans le cadre des contrats de location est :"), /* @__PURE__ */ React.createElement("div", { className: "legal-card" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "SOUTH BOAT")), /* @__PURE__ */ React.createElement("p", null, "4 rue des Grillons, 06130 Grasse"), /* @__PURE__ */ React.createElement("p", null, "RCS Grasse \u2014 102 042 082"), /* @__PURE__ */ React.createElement("p", null, "Email : ", /* @__PURE__ */ React.createElement("a", { href: "mailto:contact@south-boat.com" }, "contact@south-boat.com")), /* @__PURE__ */ React.createElement("p", null, "T\xE9l\xE9phone : 06 34 49 16 21 / 07 86 23 78 48"))),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 2 \u2014 Donn\xE9es collect\xE9es"), /* @__PURE__ */ React.createElement("p", null, "Dans le cadre de la r\xE9servation et de l'ex\xE9cution du contrat de location, SOUTH BOAT collecte les donn\xE9es personnelles suivantes :"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Identit\xE9 :"), " nom, pr\xE9nom, date de naissance"), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Coordonn\xE9es :"), " adresse postale, num\xE9ro de t\xE9l\xE9phone, adresse e-mail"), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Documents officiels :"), " copie du permis bateau, copie de la pi\xE8ce d'identit\xE9"), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Informations de paiement :"), " coordonn\xE9es bancaires, caution"), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Donn\xE9es de navigation :"), " adresse IP, cookies, donn\xE9es de connexion au site internet"))),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 3 \u2014 Finalit\xE9s du traitement"), /* @__PURE__ */ React.createElement("p", null, "Les donn\xE9es personnelles collect\xE9es sont utilis\xE9es exclusivement pour les finalit\xE9s suivantes :"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "La gestion des r\xE9servations et des contrats de location ;"), /* @__PURE__ */ React.createElement("li", null, "L'ex\xE9cution des prestations de location de bateau ;"), /* @__PURE__ */ React.createElement("li", null, "La gestion des paiements, cautions et franchises ;"), /* @__PURE__ */ React.createElement("li", null, "Le suivi et la gestion des sinistres et avaries ;"), /* @__PURE__ */ React.createElement("li", null, "Le respect des obligations l\xE9gales et r\xE9glementaires (autorit\xE9s maritimes, douanes, assurances) ;"), /* @__PURE__ */ React.createElement("li", null, "La gestion des litiges et des demandes de m\xE9diation ;"), /* @__PURE__ */ React.createElement("li", null, "L'am\xE9lioration de nos services et de l'exp\xE9rience utilisateur sur le site."))),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 4 \u2014 Base l\xE9gale du traitement"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Ex\xE9cution d'un contrat :"), " les donn\xE9es sont n\xE9cessaires \xE0 la r\xE9alisation de la prestation de location."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Obligation l\xE9gale :"), " certaines donn\xE9es sont collect\xE9es pour r\xE9pondre aux obligations impos\xE9es par la r\xE9glementation maritime, fiscale et administrative."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Int\xE9r\xEAt l\xE9gitime :"), " am\xE9lioration des services, gestion des sinistres et de la s\xE9curit\xE9."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Consentement :"), " pour l'utilisation de cookies non essentiels."))),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 5 \u2014 Dur\xE9e de conservation"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Donn\xE9es contractuelles :"), " 5 ans \xE0 compter de la fin du contrat de location."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Donn\xE9es de paiement :"), " conform\xE9ment aux obligations l\xE9gales en vigueur (5 ans)."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Donn\xE9es de navigation (cookies) :"), " 13 mois maximum \xE0 compter du d\xE9p\xF4t du cookie."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Documents d'identit\xE9 et permis :"), " dur\xE9e du contrat + 1 an."))),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 6 \u2014 Destinataires des donn\xE9es"), /* @__PURE__ */ React.createElement("p", null, "Vos donn\xE9es personnelles ne sont ni vendues ni c\xE9d\xE9es \xE0 des tiers \xE0 des fins commerciales. Elles peuvent \xEAtre transmises aux destinataires suivants, dans la stricte limite des finalit\xE9s d\xE9finies ci-dessus :"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Les compagnies d'assurance dans le cadre de la couverture du contrat de location ;"), /* @__PURE__ */ React.createElement("li", null, "Les autorit\xE9s maritimes, douani\xE8res et judiciaires si la r\xE9glementation l'exige ;"), /* @__PURE__ */ React.createElement("li", null, "Les prestataires techniques assurant l'h\xE9bergement du site (Hostinger International Ltd) ;"), /* @__PURE__ */ React.createElement("li", null, "Les organismes de m\xE9diation en cas de litige (MEDIATION-NET Consommation)."))),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 7 \u2014 Vos droits"), /* @__PURE__ */ React.createElement("p", null, "Conform\xE9ment au RGPD, vous disposez des droits suivants concernant vos donn\xE9es personnelles :"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Droit d'acc\xE8s :"), " obtenir une copie de vos donn\xE9es personnelles."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Droit de rectification :"), " corriger des donn\xE9es inexactes ou incompl\xE8tes."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Droit \xE0 l'effacement :"), " demander la suppression de vos donn\xE9es (sous r\xE9serve des obligations l\xE9gales)."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Droit \xE0 la limitation :"), " limiter le traitement de vos donn\xE9es."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Droit d'opposition :"), " vous opposer au traitement de vos donn\xE9es."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Droit \xE0 la portabilit\xE9 :"), " recevoir vos donn\xE9es dans un format structur\xE9 et lisible.")), /* @__PURE__ */ React.createElement("p", null, "Pour exercer ces droits, contactez SOUTH BOAT par email \xE0 ", /* @__PURE__ */ React.createElement("a", { href: "mailto:contact@south-boat.com" }, "contact@south-boat.com"), " ou par courrier \xE0 l'adresse du si\xE8ge social. Une r\xE9ponse vous sera adress\xE9e dans un d\xE9lai d'un mois.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 8 \u2014 R\xE9clamation aupr\xE8s de la CNIL"), /* @__PURE__ */ React.createElement("p", null, "Si vous estimez que le traitement de vos donn\xE9es personnelles n'est pas conforme \xE0 la r\xE9glementation, vous disposez du droit d'introduire une r\xE9clamation aupr\xE8s de l'autorit\xE9 de contr\xF4le comp\xE9tente :"), /* @__PURE__ */ React.createElement("div", { className: "legal-card" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Commission Nationale de l'Informatique et des Libert\xE9s (CNIL)")), /* @__PURE__ */ React.createElement("p", null, "3 place de Fontenoy \u2014 TSA 80715 \u2014 75334 Paris Cedex 07"), /* @__PURE__ */ React.createElement("p", null, "T\xE9l\xE9phone : 01 53 73 22 22"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("a", { href: "https://www.cnil.fr", target: "_blank", rel: "noopener noreferrer" }, "www.cnil.fr")))),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 9 \u2014 Cookies"), /* @__PURE__ */ React.createElement("p", null, "Le site de SOUTH BOAT utilise des cookies afin d'am\xE9liorer l'exp\xE9rience de navigation et d'analyser le trafic. Un cookie est un petit fichier texte d\xE9pos\xE9 sur votre terminal lors de la visite d'un site."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Types de cookies utilis\xE9s :")), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Cookies essentiels :"), " n\xE9cessaires au fonctionnement du site (session, s\xE9curit\xE9). Ils ne n\xE9cessitent pas votre consentement."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Cookies analytiques :"), " permettent d'analyser la fr\xE9quentation et l'utilisation du site (ex. : Google Analytics). D\xE9pos\xE9s avec votre consentement."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Cookies de pr\xE9f\xE9rences :"), " m\xE9morisent vos choix de navigation.")), /* @__PURE__ */ React.createElement("p", null, "Vous pouvez g\xE9rer vos pr\xE9f\xE9rences en mati\xE8re de cookies \xE0 tout moment via les param\xE8tres de votre navigateur ou via le bandeau de gestion des cookies pr\xE9sent sur notre site.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 10 \u2014 S\xE9curit\xE9 des donn\xE9es"), /* @__PURE__ */ React.createElement("p", null, "SOUTH BOAT met en \u0153uvre les mesures techniques et organisationnelles appropri\xE9es pour prot\xE9ger vos donn\xE9es personnelles contre toute perte, destruction, alt\xE9ration ou acc\xE8s non autoris\xE9."), /* @__PURE__ */ React.createElement("p", null, "En cas de violation de donn\xE9es susceptible d'engendrer un risque pour vos droits et libert\xE9s, SOUTH BOAT s'engage \xE0 notifier la CNIL dans les 72 heures et \xE0 vous en informer dans les meilleurs d\xE9lais si le risque est \xE9lev\xE9.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 11 \u2014 Modifications de la politique de confidentialit\xE9"), /* @__PURE__ */ React.createElement("p", null, "SOUTH BOAT se r\xE9serve le droit de modifier la pr\xE9sente Politique de Confidentialit\xE9 \xE0 tout moment afin de la mettre en conformit\xE9 avec la r\xE9glementation en vigueur. Les modifications prennent effet d\xE8s leur publication sur le site.")),
      /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h2", null, "Article 12 \u2014 Contact"), /* @__PURE__ */ React.createElement("div", { className: "legal-card" }, /* @__PURE__ */ React.createElement("p", null, "Par email : ", /* @__PURE__ */ React.createElement("a", { href: "mailto:contact@south-boat.com" }, "contact@south-boat.com")), /* @__PURE__ */ React.createElement("p", null, "Par t\xE9l\xE9phone : 06 34 49 16 21 ou 07 86 23 78 48"), /* @__PURE__ */ React.createElement("p", null, "Par courrier : SOUTH BOAT \u2014 4 rue des Grillons, 06130 Grasse")))
    );
  }
  function Footer() {
    const t = window.useT();
    const go = (name) => {
      if (window.__setPage) window.__setPage({ name });
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    const linkStyle = { cursor: "pointer" };
    return /* @__PURE__ */ React.createElement("footer", { className: "foot" }, /* @__PURE__ */ React.createElement("div", { className: "foot-inner" }, /* @__PURE__ */ React.createElement("div", { className: "foot-brand" }, /* @__PURE__ */ React.createElement("div", { className: "logo" }, /* @__PURE__ */ React.createElement("span", { className: "logo-mark" }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 17l9-12 9 12M5 17h14l-2 4H7z" }))), /* @__PURE__ */ React.createElement("span", { className: "logo-text" }, "South Boat", /* @__PURE__ */ React.createElement("sup", null, "\xB0"))), /* @__PURE__ */ React.createElement("p", null, t("La location de bateaux", "Boat rentals"), /* @__PURE__ */ React.createElement("br", null), t("sur la C\xF4te d'Azur.", "on the French Riviera.")), /* @__PURE__ */ React.createElement("div", { className: "foot-socials", style: { marginTop: 12, display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("a", { href: "https://www.instagram.com/south_boat_/", target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram South Boat", style: { color: "inherit", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 999, border: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement(Icon, { name: "instagram", size: 18 })))), /* @__PURE__ */ React.createElement("div", { className: "foot-cols" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h5", null, t("Naviguer", "Navigate")), /* @__PURE__ */ React.createElement("a", { style: linkStyle, onClick: () => go("catalog") }, t("Catalogue", "Catalog")), /* @__PURE__ */ React.createElement("a", { style: linkStyle, onClick: () => go("catalog") }, t("Destinations", "Destinations"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h5", null, t("Maison", "House")), /* @__PURE__ */ React.createElement("a", { style: linkStyle, onClick: () => go("about") }, t("\xC0 propos", "About")), /* @__PURE__ */ React.createElement("a", { style: linkStyle, onClick: () => go("contact") }, t("Contact", "Contact"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h5", null, t("L\xE9gal", "Legal")), /* @__PURE__ */ React.createElement("a", { style: linkStyle, onClick: () => go("cgv") }, t("CGV", "Terms")), /* @__PURE__ */ React.createElement("a", { style: linkStyle, onClick: () => go("legal") }, t("Mentions l\xE9gales", "Legal notice")), /* @__PURE__ */ React.createElement("a", { style: linkStyle, onClick: () => go("privacy") }, t("Confidentialit\xE9", "Privacy"))))), /* @__PURE__ */ React.createElement("div", { className: "foot-bottom" }, /* @__PURE__ */ React.createElement("span", null, "\xA9 2026 South Boat \u2014 Mandelieu-la-Napoule, France"), /* @__PURE__ */ React.createElement("span", null, t("Belle journ\xE9e en mer \xE0 vous", "Have a great day at sea"))));
  }
  Object.assign(window, {
    HomePage,
    BoatCard,
    CatalogPage,
    DetailPage,
    BookingPage,
    AboutPage,
    ContactPage,
    CapSudListPage,
    CapSudArticlePage,
    Footer,
    Calendar,
    fmtArticleDate,
    MentionsLegalesPage,
    CGVPage,
    PrivacyPage
  });
})();
