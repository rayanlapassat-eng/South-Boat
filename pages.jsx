/* global React, BOATS, PORTS, fmtPrice, Star, Icon */
/* var : scripts classiques séparés partageant la portée globale (cf. app.jsx). */
var { useState, useEffect, useMemo, useRef } = React;

// ============ FAQ (SEO : résultats enrichis Google) ============
const FAQ_ITEMS = [
  {
    q_fr: "Faut-il le permis bateau pour louer chez South Boat ?",
    q_en: "Do I need a boating license to rent with South Boat?",
    a_fr: "Sans skipper, un permis bateau côtier en cours de validité est obligatoire : seul le titulaire du permis pourra conduire le bateau. Avec skipper, aucun permis n'est nécessaire, c'est notre capitaine qui pilote.",
    a_en: "Without a skipper, a valid coastal boating license is required: only the license holder may operate the boat. With a skipper, no license is needed — our captain handles the helm.",
  },
  {
    q_fr: "Quel est le prix d'une location de bateau à Mandelieu ?",
    q_en: "How much does a boat rental in Mandelieu cost?",
    a_fr: "Le Mochi (day cruiser, jusqu'à 8 personnes) est à partir de 435 € la journée complète et 320 € la demi-journée. Le skipper est en option (+150 € la demi-journée, +200 € la journée). Tarifs clairs, sans frais cachés.",
    a_en: "The Mochi (day cruiser, up to 8 people) starts at €435 for a full day and €320 for a half day. A skipper is optional (+€150 half day, +€200 full day). Clear pricing, no hidden fees.",
  },
  {
    q_fr: "D'où partent les locations de bateau ?",
    q_en: "Where do the boat rentals depart from?",
    a_fr: "Toutes nos sorties partent du quai visiteur du Port de Mandelieu, à Mandelieu-la-Napoule (06210). Notre équipe vous y accueille pour un briefing avant chaque départ.",
    a_en: "All our trips depart from the visitor dock of Port de Mandelieu, in Mandelieu-la-Napoule (06210). Our team welcomes you there for a briefing before each departure.",
  },
  {
    q_fr: "Quelles destinations peut-on rejoindre depuis Mandelieu ?",
    q_en: "Which destinations can I reach from Mandelieu?",
    a_fr: "Depuis Mandelieu, on rejoint facilement les calanques rouges du massif de l'Estérel, les îles de Lérins (Sainte-Marguerite et Saint-Honorat), le Cap d'Antibes et la baie de Cannes.",
    a_en: "From Mandelieu, you can easily reach the red coves of the Estérel massif, the Lérins Islands (Sainte-Marguerite and Saint-Honorat), Cap d'Antibes and the bay of Cannes.",
  },
  {
    q_fr: "Combien de personnes peuvent monter à bord ?",
    q_en: "How many people can come aboard?",
    a_fr: "Le Mochi accueille jusqu'à 8 personnes. Les enfants sont les bienvenus, sous la responsabilité des adultes accompagnants.",
    a_en: "The Mochi welcomes up to 8 people. Children are welcome, under the responsibility of accompanying adults.",
  },
  {
    q_fr: "Quelle est la politique d'annulation ?",
    q_en: "What is the cancellation policy?",
    a_fr: "L'annulation est gratuite jusqu'à 7 jours avant le départ. Entre 7 et 3 jours, 50 % de l'acompte est retenu ; à moins de 3 jours, l'acompte n'est pas remboursable.",
    a_en: "Cancellation is free up to 7 days before departure. Between 7 and 3 days, 50% of the deposit is retained; under 3 days, the deposit is non-refundable.",
  },
];

// ============ HOME ============
function HomePage({ setPage, query, setQuery }) {
  const t = window.useT();
  const featured = BOATS.slice(0, 3);
  const latestArticle = (window.ARTICLES && window.ARTICLES.length > 0) ? window.ARTICLES[0] : null;
  const [openFaq, setOpenFaq] = useState(0);

  // SEO : JSON-LD FAQPage (uniquement sur l'accueil, pour matcher le contenu visible)
  useEffect(() => {
    const ld = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        "name": f.q_fr,
        "acceptedAnswer": { "@type": "Answer", "text": f.a_fr },
      })),
    };
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = "ld-faq";
    tag.textContent = JSON.stringify(ld);
    const existing = document.getElementById("ld-faq");
    if (existing) existing.remove();
    document.head.appendChild(tag);
    return () => { const e = document.getElementById("ld-faq"); if (e) e.remove(); };
  }, []);

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=2400&q=80" alt={t("Bateau en mer sur la Côte d'Azur — location de bateau à Mandelieu avec South Boat", "Boat at sea on the French Riviera — South Boat rentals in Mandelieu")} fetchpriority="high" decoding="async" />
          <div className="hero-overlay hero-overlay-grad" />
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="dot" /> {t("Côte d'Azur · Saison 2026", "French Riviera · 2026 Season")}
          </div>
          <h1 className="hero-title">
            {t("Le large,", "The open sea,")}<br />{t("en toute simplicité.", "made simple.")}
          </h1>
          <p className="hero-sub">
            {t("Une sélection rigoureuse de bateaux familiaux au départ de Mandelieu. Réservation transparente, équipage à la demande.",
               "A carefully curated selection of family boats departing from Mandelieu. Transparent booking, crew on demand.")}
          </p>
          <div className="hero-cta-row">
            <button className="btn btn-primary" onClick={() => setPage({ name: "catalog" })} style={{ borderRadius: 20 }}>
              {t("Découvrir nos bateaux", "Discover our boats")} <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div><strong>Mandelieu</strong><span>{t("Port de départ", "Departure port")}</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-head" style={{ color: "rgb(58, 141, 222)", borderRadius: "0px", fontFamily: "-apple-system" }}>
          <div>
            <p className="eyebrow">{t("Notre flotte", "Our fleet")}</p>
            <h2>{t("Sélection du moment", "Current selection")}</h2>
          </div>
          <button className="btn btn-ghost" onClick={() => setPage({ name: "catalog" })}>
            {t("Voir tous les bateaux", "View all boats")} <Icon name="arrow" size={16} />
          </button>
        </div>
        <div className="grid-3">
          {featured.map((b) =>
          <BoatCard key={b.id} boat={b} onClick={() => setPage({ name: "detail", id: b.id })} />
          )}
        </div>
      </section>

      <section className="section">
        <div className="value-grid">
          <div className="value-card">
            <span className="value-icon"><Icon name="shield" /></span>
            <h3>{t("Bateaux vérifiés", "Verified boats")}</h3>
            <p>{t("Chaque embarcation est inspectée et certifiée par notre équipe avant toute mise en location.",
                  "Each boat is inspected and certified by our team before being offered for rental.")}</p>
          </div>
          <div className="value-card">
            <span className="value-icon"><Icon name="anchor" /></span>
            <h3>{t("Skippers expérimentés", "Experienced skippers")}</h3>
            <p>{t("Optez pour un skipper local qui connaît chaque crique, chaque calanque, chaque coucher de soleil.",
                  "Choose a local skipper who knows every cove, every calanque, every sunset.")}</p>
          </div>
          <div className="value-card">
            <span className="value-icon"><Icon name="sparkle" /></span>
            <h3>{t("Sans mauvaise surprise", "No nasty surprises")}</h3>
            <p>{t("Tarifs clairs, sans frais cachés. Annulation flexible et une équipe à votre écoute pour vous accompagner avant chaque sortie.",
                  "Clear pricing, no hidden fees. Flexible cancellation and a team on hand to support you before every outing.")}</p>
          </div>
        </div>
      </section>

      <section className="section departure">
        <div className="departure-card">
          <div className="departure-text">
            <p className="eyebrow">{t("Point de départ", "Departure point")}</p>
            <h2>{t("Quai visiteur de Mandelieu", "Mandelieu visitor dock")}</h2>
            <p className="lead">
              {t("Le départ de toutes les locations se fait depuis le quai visiteur de Mandelieu — Port de Mandelieu. Notre équipe vous y accueille pour le briefing avant chaque sortie.",
                 "All rentals depart from the Mandelieu visitor dock — Port de Mandelieu. Our team welcomes you there for a briefing before each outing.")}
            </p>
            <div className="departure-actions">
              <a className="btn btn-primary"
                 href="https://www.google.com/maps/search/?api=1&query=Port+de+Mandelieu+quai+visiteur"
                 target="_blank" rel="noopener noreferrer">
                <Icon name="pin" size={16} /> {t("Ouvrir dans Google Maps", "Open in Google Maps")}
              </a>
              <span className="departure-addr"><Icon name="pin" size={14} /> Port de Mandelieu, 06210 Mandelieu-la-Napoule</span>
            </div>
          </div>
          <div className="departure-map">
            <iframe
              title="Port de Mandelieu — quai visiteur"
              src="https://www.google.com/maps?q=Port+de+Mandelieu+La+Napoule&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen />
          </div>
        </div>
      </section>

      {latestArticle && (
        <section className="section capsud-feature">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t("Cap Sud · Carnet de bord", "Cap Sud · Logbook")}</p>
              <h2>{t("Dernier article", "Latest article")}</h2>
            </div>
            <button className="btn btn-ghost" onClick={() => setPage({ name: "capsud" })}>
              {t("Tous les articles", "All articles")} <Icon name="arrow" size={16} />
            </button>
          </div>
          <article className="capsud-feature-card" onClick={() => setPage({ name: "capsud-article", id: latestArticle.id })}>
            <div className="capsud-feature-img">
              <img src={latestArticle.cover} alt={latestArticle.title} loading="lazy" decoding="async" />
            </div>
            <div className="capsud-feature-body">
              <span className="capsud-date">{fmtArticleDate(latestArticle.date)}</span>
              <h3>{latestArticle.title}</h3>
              <p>{latestArticle.excerpt}</p>
              <span className="capsud-cta">{t("Lire l'article", "Read the article")} <Icon name="arrow" size={15} /></span>
            </div>
          </article>
        </section>
      )}

      <section className="section dest">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t("Destinations", "Destinations")}</p>
            <h2>{t("Les itinéraires", "The itineraries")}</h2>
          </div>
        </div>
        <div className="dest-grid">
          {[
          { id: "lerins", n: t("Îles de Lérins", "Lérins Islands"), img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", c: t("Baignade & déjeuner en mer", "Swimming & lunch at sea") },
          { id: "cap-antibes", n: t("Cap d'Antibes", "Cap d'Antibes"), img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=80", c: t("Villas & criques sauvages", "Villas & wild coves") },
          { id: "esterel", n: t("Calanques de l'Estérel", "Estérel calanques"), img: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80", c: t("Calanques & roches rouges", "Coves & red rocks") }].
          map((d) =>
          <button key={d.id} className="dest-card" onClick={() => setPage({ name: "itinerary", id: d.id })}>
              <img src={d.img} alt={d.n} loading="lazy" decoding="async" />
              <div className="dest-overlay" />
              <div className="dest-info">
                <h4>{d.n}</h4>
                <span>{d.c}</span>
              </div>
            </button>
          )}
        </div>
      </section>

      <section className="section faq">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t("Questions fréquentes", "Frequently asked questions")}</p>
            <h2>{t("Tout savoir avant d'embarquer", "Everything you need before boarding")}</h2>
          </div>
        </div>
        <div className="faq-list" style={{ maxWidth: 820 }}>
          {FAQ_ITEMS.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className={"faq-item" + (isOpen ? " open" : "")} style={{ borderBottom: "1px solid var(--line)" }}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "18px 4px", background: "none", border: "none", cursor: "pointer", textAlign: "left", font: "inherit", color: "var(--ink)" }}>
                  <span style={{ fontWeight: 600, fontSize: "1.02rem" }}>{t(f.q_fr, f.q_en)}</span>
                  <span style={{ flexShrink: 0, transition: "transform .2s", transform: isOpen ? "rotate(45deg)" : "none" }}><Icon name="plus" size={18} /></span>
                </button>
                {isOpen && (
                  <p className="faq-a" style={{ margin: "0 4px 18px", color: "var(--ink-soft)", lineHeight: 1.6 }}>{t(f.a_fr, f.a_en)}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>);

}

// ============ BOAT CARD ============
function BoatCard({ boat, onClick }) {
  const t = window.useT();
  if (boat.comingSoon) {
    return (
      <article className="boat-card coming-soon" aria-disabled="true">
        <div className="boat-img">
          <img src={boat.images[0]} alt="" style={{ filter: "blur(14px)", transform: "scale(1.1)" }} />
          <div className="coming-soon-overlay">
            <span className="coming-soon-badge">{t("Coming Soon", "Coming Soon")}</span>
            <span className="coming-soon-sub">{t("Bientôt dans la flotte", "Coming to the fleet")}</span>
          </div>
        </div>
        <div className="boat-body">
          <div className="boat-row">
            <h3 style={{ opacity: 0.6 }}>{t("Nouveau bateau", "New boat")}</h3>
          </div>
          <p className="boat-meta">
            <span><Icon name="pin" size={14} /> Mandelieu</span>
            <span className="dot-sep">·</span>
            <span>{t("Disponible prochainement", "Available soon")}</span>
          </p>
        </div>
      </article>
    );
  }
  return (
    <article className="boat-card" onClick={onClick}>
      <div className="boat-img">
        <img src={boat.images[0]} alt={`${boat.name} - Location de bateau à Mandelieu sur la Côte d'Azur`} loading="lazy" decoding="async" />
        <div className="boat-tag">{boat.type}</div>
      </div>
      <div className="boat-body">
        <div className="boat-row">
          <h3>{boat.name}</h3>
        </div>
        <p className="boat-meta">
          <span><Icon name="pin" size={14} /> {boat.port}</span>
          <span className="dot-sep">·</span>
          <span><Icon name="users" size={14} /> {boat.capacity} {t("pers.", "people")}</span>
          <span className="dot-sep">·</span>
          <span>{boat.length}</span>
        </p>
        <div className="boat-foot">
          <div className="price">
            <strong>{fmtPrice(boat.price)}</strong>
            <span> {t("/ jour", "/ day")}</span>
          </div>
          <span className="boat-cta">
            {t("Découvrir", "Discover")} <Icon name="arrow" size={15} />
          </span>
        </div>
      </div>
    </article>);

}

// ============ CATALOG ============
function CatalogPage({ setPage, query, setQuery }) {
  const t = window.useT();

  const available = BOATS.filter((b) => !b.comingSoon);
  const teasers = BOATS.filter((b) => b.comingSoon);
  const filtered = available;

  return (
    <main className="catalog">
      <Breadcrumb setPage={setPage} trail={[
        { label: t("Accueil", "Home"), page: { name: "home" } },
        { label: t("Catalogue", "Catalog") },
      ]} />

      <div className="catalog-body single">
        <section className="catalog-results" style={{ width: "100%" }}>
          <div className="catalog-head">
            <div>
              <h1 style={{ fontSize: "1.5rem", margin: 0 }}>{t(`Location de bateaux à Mandelieu — ${filtered.length} bateau${filtered.length > 1 ? "x" : ""} disponible${filtered.length > 1 ? "s" : ""}`, `Boat rentals in Mandelieu — ${filtered.length} boat${filtered.length > 1 ? "s" : ""} available`)}</h1>
              <p className="muted">{t("Port de Mandelieu", "Port de Mandelieu")}</p>
            </div>
          </div>
          <div className="grid-3">
            {filtered.map((b) =>
            <BoatCard key={b.id} boat={b} onClick={() => setPage({ name: "detail", id: b.id })} />
            )}
            {teasers.map((b) =>
            <BoatCard key={b.id} boat={b} />
            )}
            {filtered.length === 0 && teasers.length === 0 &&
            <div className="empty">
                <p>{t("Aucun bateau disponible pour le moment.", "No boats available at the moment.")}</p>
              </div>
            }
          </div>
        </section>
      </div>
      <Footer />
    </main>);

}

const fmtDate = (s, lang) => {
  if (!s) return "—";
  const [y, m, day] = s.split("-").map(Number);
  const d = new Date(y, m - 1, day);
  return d.toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "short" });
};

// ============ DETAIL ============
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
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox, boat]);
  if (!boat) return null;
  const openLightbox = (i) => { setIdx(i); setLightbox(true); };
  const sideImgs = boat.images.slice(1, 5);

  return (
    <main className="detail">
      <Breadcrumb setPage={setPage} trail={[
        { label: t("Accueil", "Home"), page: { name: "home" } },
        { label: t("Catalogue", "Catalog"), page: { name: "catalog" } },
        { label: boat.name },
      ]} />
      <div className="detail-top">
        <button className="back" onClick={() => setPage({ name: "catalog" })}>
          <Icon name="arrowL" size={16} /> {t("Retour au catalogue", "Back to catalog")}
        </button>
      </div>

      <section className={`gallery-mosaic side-${sideImgs.length}`}>
        <button className="mosaic-main" onClick={() => openLightbox(0)}>
          <img src={boat.images[0]} alt={`${boat.name} - Location bateau Mandelieu Côte d'Azur, port et Estérel`} />
        </button>
        <div className="mosaic-side">
          {sideImgs.map((src, i) =>
            <button key={i} className="mosaic-cell" onClick={() => openLightbox(i + 1)}>
              <img src={src} alt={`${boat.name} - Photo ${i + 2} location bateau Mandelieu`} />
            </button>
          )}
        </div>
        <button className="mosaic-viewall" onClick={() => openLightbox(0)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
          </svg>
          {t(`Voir les ${boat.images.length} photos`, `View ${boat.images.length} photos`)}
        </button>
      </section>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <button className="lightbox-close" onClick={() => setLightbox(false)} aria-label={t("Fermer", "Close")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div className="lightbox-counter">{idx + 1} / {boat.images.length}</div>
          <button className="lightbox-arrow left" onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + boat.images.length) % boat.images.length); }} aria-label={t("Précédent", "Previous")}>
            <Icon name="arrowL" size={24} />
          </button>
          <img className="lightbox-img" src={boat.images[idx]} alt={`${boat.name} - Location bateau Mandelieu, photo ${idx + 1}`} onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-arrow right" onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % boat.images.length); }} aria-label={t("Suivant", "Next")}>
            <Icon name="arrow" size={24} />
          </button>
        </div>
      )}

      <section className="detail-body">
        <div className="detail-main">
          <div className="detail-head">
            <div>
              <p className="eyebrow">{boat.type} · {boat.port}</p>
              <h1>{boat.name}</h1>
              <div className="detail-meta">
                <span>{boat.length}</span>
                <span className="dot-sep">·</span>
                <span>{boat.capacity} {t("personnes", "people")}</span>
                <span className="dot-sep">·</span>
                <span>{boat.year}</span>
                {boat.designCategory && (
                  <>
                    <span className="dot-sep">·</span>
                    <span>{t("Catégorie de conception : ", "Design category: ")}{boat.designCategory}</span>
                  </>
                )}
                {boat.enginePower && (
                  <>
                    <span className="dot-sep">·</span>
                    <span>{t("Motorisation : ", "Engine: ")}{boat.enginePower}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>{t("À propos du bateau", "About this boat")}</h3>
            <p className="lead">{t(boat.description, boat.description_en || boat.description)}</p>
          </div>

          <div className="detail-section">
            <h3>{t("Équipement", "Equipment")}</h3>
            <ul className="features">
              {boat.features.map((f, i) =>
              <li key={f}><Icon name="check" size={16} /> {(boat.features_en && boat.features_en[i]) ? t(f, boat.features_en[i]) : f}</li>
              )}
            </ul>
          </div>

          <div className="detail-section">
            <h3>{t("Inclus dans la location", "Included with the rental")}</h3>
            <div className="includes">
              <div><Icon name="anchor" /> {t(boat.crew, boat.crew_en || boat.crew)}</div>
              <div><Icon name="shield" /> {t("Assurance complète", "Full insurance")}</div>
              <div><Icon name="wave" /> {t("Briefing de sécurité", "Safety briefing")}</div>
            </div>
          </div>

          <div className="detail-section">
            <h3>{t("Options à la carte", "Optional add-ons")}</h3>
            <div className="includes">
              <div><Icon name="sparkle" /> {t("Plateau de gourmandises", "Gourmet platter")}</div>
              <div><Icon name="wave" /> {t("Bouée tractée", "Towed inflatable")}</div>
              <div><Icon name="wave" /> {t("Wakeboard", "Wakeboard")}</div>
              <div><Icon name="wave" /> {t("Paddle board", "Paddle board")}</div>
              <div><Icon name="wave" /> {t("Accessoires snorkeling", "Snorkeling gear")}</div>
            </div>
          </div>
        </div>

        <aside className="booking-card" style={{ backgroundColor: "rgb(255, 255, 255)", borderRadius: "20px" }}>
          <div className="bk-price">
            <strong>{fmtPrice(boat.price)}</strong>
            <span> {t("/ jour", "/ day")}</span>
          </div>
          {(boat.priceHalfDay || boat.deposit || boat.preAuth || (boat.options && boat.options.length)) && (
            <div className="bk-tariffs" style={{ marginTop: 14, padding: "12px 14px", background: "var(--surface-2, #f4f8fb)", borderRadius: 14, fontSize: 13 }}>
              <h4 style={{ margin: "0 0 8px", fontSize: 13, textTransform: "uppercase", letterSpacing: 0.4, color: "var(--muted, #5b6b7a)" }}>{t("Tarifs", "Pricing")}</h4>
              {boat.price && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                  <span>{t("Journée", "Full day")}</span><strong>{fmtPrice(boat.price)}</strong>
                </div>
              )}
              {boat.priceHalfDay && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                  <span>{t("Demi-journée", "Half day")}</span><strong>{fmtPrice(boat.priceHalfDay)}</strong>
                </div>
              )}
              {boat.deposit && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                  <span>{t("Acompte réservation", "Booking deposit")}</span><strong>{fmtPrice(boat.deposit)}</strong>
                </div>
              )}
              {boat.preAuth && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                  <span>{t("Pré-autorisation (caution)", "Pre-authorization (deposit hold)")}</span><strong>{fmtPrice(boat.preAuth)}</strong>
                </div>
              )}
              {boat.options && boat.options.length > 0 && (
                <>
                  <div style={{ height: 1, background: "rgba(10,37,64,0.08)", margin: "8px 0" }} />
                  <div style={{ fontSize: 12, color: "var(--muted, #5b6b7a)", marginBottom: 4 }}>{t("Options", "Add-ons")}</div>
                  {boat.options.map((o) => (
                    <div key={o.id} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
                      <span>{t(o.label, o.label_en || o.label)}</span><strong>+{fmtPrice(o.price)}</strong>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          <button className="btn btn-primary btn-block" onClick={() => setPage({ name: "booking", id: boat.id })} style={{ borderRadius: "20px", marginTop: 14 }}>
            {t("Réserver ce bateau", "Book this boat")}
          </button>
          <button className="btn btn-outline btn-block" onClick={() => setPage({ name: "contact" })} style={{ backgroundColor: "rgb(244, 248, 251)", borderRadius: "20px" }}>
            {t("Contacter un conseiller", "Contact an advisor")}
          </button>
          <ul className="bk-list">
            <li><Icon name="check" size={14} /> {t("Annulation gratuite jusqu'à 7 jours", "Free cancellation up to 7 days")}</li>
            <li><Icon name="check" size={14} /> {t("Paiement sécurisé", "Secure payment")}</li>
            <li><Icon name="check" size={14} /> {t("Conciergerie", "Concierge")}</li>
          </ul>
        </aside>
      </section>
      <Footer />
    </main>);

}

// ============ BOOKING ============
function PayLogo({ brand }) {
  const wrap = { width: 38, height: 24, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
  if (brand === "cb") {
    return (
      <span style={wrap}>
        <svg viewBox="0 0 38 24" width="38" height="24" aria-hidden="true">
          <rect x="0.5" y="0.5" width="37" height="23" rx="3.5" fill="#fff" stroke="#d4dae0" />
          <rect x="0.5" y="6" width="37" height="4" fill="#0a2540" />
          <rect x="5" y="14" width="10" height="2" rx="0.5" fill="#94a3b8" />
          <rect x="5" y="18" width="6" height="1.5" rx="0.5" fill="#cbd5e0" />
        </svg>
      </span>
    );
  }
  if (brand === "paypal") {
    return (
      <span style={wrap}>
        <svg viewBox="0 0 38 24" width="38" height="24" aria-hidden="true">
          <rect x="0.5" y="0.5" width="37" height="23" rx="3.5" fill="#fff" stroke="#d4dae0" />
          <text x="19" y="16" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="9" fontWeight="700" fontStyle="italic" fill="#003087">Pay<tspan fill="#009cde">Pal</tspan></text>
        </svg>
      </span>
    );
  }
  if (brand === "applepay") {
    return (
      <span style={wrap}>
        <svg viewBox="0 0 38 24" width="38" height="24" aria-hidden="true">
          <rect x="0.5" y="0.5" width="37" height="23" rx="3.5" fill="#000" stroke="#000" />
          <path d="M10.5 10.6c-.3.4-.8.7-1.3.6-.1-.5.2-1 .5-1.4.3-.4.8-.7 1.3-.7.1.5-.1 1-.5 1.5zm.5.6c-.7 0-1.3.4-1.7.4-.4 0-.9-.4-1.5-.4-.8 0-1.5.4-1.9 1.2-.8 1.4-.2 3.5.6 4.6.4.5.8 1.1 1.4 1.1.6 0 .8-.4 1.5-.4.7 0 .9.4 1.5.4.6 0 1-.5 1.4-1.1.3-.4.5-.9.7-1.4-.8-.3-1.4-1.1-1.4-2 0-.8.4-1.5 1-1.9-.4-.5-1-.7-1.6-.5z" fill="#fff"/>
          <text x="15" y="16.5" fontFamily="Helvetica, Arial, sans-serif" fontSize="8.5" fontWeight="600" fill="#fff">Pay</text>
        </svg>
      </span>
    );
  }
  if (brand === "paybybank") {
    return (
      <span style={wrap}>
        <svg viewBox="0 0 38 24" width="38" height="24" aria-hidden="true">
          <rect x="0.5" y="0.5" width="37" height="23" rx="3.5" fill="#fff" stroke="#d4dae0" />
          <path d="M19 5l-7 3.5v1h14v-1L19 5z" fill="#0a2540"/>
          <rect x="13" y="11" width="1.5" height="6" fill="#0a2540"/>
          <rect x="17" y="11" width="1.5" height="6" fill="#0a2540"/>
          <rect x="21" y="11" width="1.5" height="6" fill="#0a2540"/>
          <rect x="25" y="11" width="1.5" height="6" fill="#0a2540"/>
          <rect x="12" y="18" width="14" height="1.2" fill="#0a2540"/>
        </svg>
      </span>
    );
  }
  if (brand === "virement") {
    return (
      <span style={wrap}>
        <svg viewBox="0 0 38 24" width="38" height="24" aria-hidden="true">
          <rect x="0.5" y="0.5" width="37" height="23" rx="3.5" fill="#fff" stroke="#d4dae0" />
          <path d="M19 5l-7 3.5v1h14v-1L19 5z" fill="#1a5a32"/>
          <rect x="13" y="11" width="1.5" height="6" fill="#1a5a32"/>
          <rect x="17" y="11" width="1.5" height="6" fill="#1a5a32"/>
          <rect x="21" y="11" width="1.5" height="6" fill="#1a5a32"/>
          <rect x="25" y="11" width="1.5" height="6" fill="#1a5a32"/>
          <rect x="12" y="18" width="14" height="1.2" fill="#1a5a32"/>
        </svg>
      </span>
    );
  }
  return null;
}

const ITINERARIES = [
  { id: "lerins", name: "Îles de Lérins", desc: "Sainte-Marguerite, baignade et déjeuner en mer.", name_en: "Lérins Islands", desc_en: "Sainte-Marguerite, swim and lunch at sea." },
  { id: "cap-antibes", name: "Cap d'Antibes", desc: "Villas, criques sauvages et eaux turquoise.", name_en: "Cap d'Antibes", desc_en: "Villas, wild coves and turquoise waters." },
  { id: "esterel", name: "Calanques de l'Estérel", desc: "Roches rouges, eaux turquoise, snorkeling.", name_en: "Estérel calanques", desc_en: "Red rocks, turquoise waters, snorkeling." },
];
const itName = (it, t) => t(it.name, it.name_en || it.name);
const itDesc = (it, t) => t(it.desc, it.desc_en || it.desc);

const EMAIL_TEMPLATE = {
  subject: "Confirmation de votre réservation — South Boat",
  body: ({ firstName, boatName, dateLong, slot, adults, children, itinerary, total, deposit, balance, refundPolicy }) => `
Bonjour ${firstName},

Nous vous confirmons votre réservation auprès de South Boat.

— RÉCAPITULATIF —
Bateau : ${boatName}
Date : ${dateLong}
Créneau : ${slot}
Participants : ${adults} adulte(s)${children ? ", " + children + " enfant(s)" : ""}
${itinerary ? "Itinéraire : " + itinerary + "\n" : ""}
— MONTANTS —
Total : ${total}
Acompte payé : ${deposit}
Reste à payer le Jour-J : ${balance}

— CONDITIONS DE REMBOURSEMENT —
${refundPolicy}

À très bientôt sur les flots,
L'équipe South Boat
`,
  refundPolicy: "Annulation gratuite jusqu'à 7 jours avant le départ. Entre 7 et 3 jours : 50% retenu. Moins de 3 jours : non remboursable.",
};

// Mail interne envoyé à contact@south-boat.com avec les coordonnées complètes
// pour pré-remplir le contrat le Jour-J
const INTERNAL_EMAIL_TEMPLATE = {
  to: "contact@south-boat.com",
  subject: "Nouvelle réservation — coordonnées chef de bord & client",
  body: ({ boatName, dateLong, slot, adults, children, itinerary, total, deposit, preAuth, paymentMethod, billing, permit, permitDifferent }) => `
NOUVELLE RÉSERVATION — South Boat
==================================

— DÉTAILS DE LA RÉSERVATION —
Bateau : ${boatName}
Date : ${dateLong}
Créneau : ${slot}
Participants : ${adults} adulte(s)${children ? ", " + children + " enfant(s)" : ""}
${itinerary ? "Itinéraire : " + itinerary + "\n" : ""}
— MONTANTS —
Total : ${total}
Acompte payé : ${deposit}
Pré-autorisation : ${preAuth}
Moyen de paiement : ${paymentMethod || "—"}

— COORDONNÉES CLIENT (PERSONNE QUI RÉSERVE) —
Nom / prénom : ${billing.lastName || "—"} / ${billing.firstName || "—"}
Date de naissance : ${billing.birthdate || "—"}
Email : ${billing.email || "—"}
Téléphone : ${billing.phone || "—"}
Adresse postale : ${billing.address || "—"}

— COORDONNÉES CHEF DE BORD (TITULAIRE DU PERMIS) —
${permitDifferent ? `Nom / prénom : ${permit.lastName || "—"} / ${permit.firstName || "—"}
Date de naissance : ${permit.birthdate || "—"}
Email : ${permit.email || "—"}
Téléphone : ${permit.phone || "—"}
Adresse postale : ${permit.address || "—"}
Numéro de permis bateau : ${permit.permitNumber || "—"}` : `Identique au client.
Numéro de permis bateau : ${billing.permitNumber || "—"}`}

— ACTION —
Pré-remplir le contrat avec ces informations pour le Jour-J.
`
};

// ============ CAL.COM DATE PICKER ============
// Sélecteur de date "maison" alimenté par cal-api.js (proxy PHP → Cal.com).
// En l'absence de proxy (dev local), cal-api.js bascule en mode mock.
function CalDatePicker({ eventKey, value, onChange, t }) {
  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [slots, setSlots] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventKey || !window.CalAPI) return;
    let cancelled = false;
    setLoading(true); setError("");
    window.CalAPI.fetchAvailableSlots(eventKey, view.y, view.m)
      .then((s) => { if (!cancelled) setSlots(s); })
      .catch((e) => { if (!cancelled) setError(String(e.message || e)); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [eventKey, view.y, view.m]);

  const first = new Date(view.y, view.m, 1);
  const last = new Date(view.y, view.m + 1, 0);
  const startOff = (first.getDay() + 6) % 7;
  const cells = [];
  for (let i = 0; i < startOff; i++) cells.push(null);
  for (let i = 1; i <= last.getDate(); i++) cells.push(new Date(view.y, view.m, i));
  const monthName = first.toLocaleDateString(t.lang === "en" ? "en-US" : "fr-FR", { month: "long", year: "numeric" });

  const dayNames = t.lang === "en" ? ["M","T","W","T","F","S","S"] : ["L","M","M","J","V","S","D"];
  const navMonth = (delta) => {
    const m = view.m + delta;
    setView({ y: view.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 });
  };

  const btnNav = { padding: "6px 12px", border: "1px solid #d4dae0", borderRadius: 8, background: "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: 14 };

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 14, padding: 16, background: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <button type="button" onClick={() => navMonth(-1)} style={btnNav} aria-label={t("Mois précédent", "Previous month")}>‹</button>
        <strong style={{ textTransform: "capitalize", fontSize: 15 }}>{monthName}</strong>
        <button type="button" onClick={() => navMonth(1)} style={btnNav} aria-label={t("Mois suivant", "Next month")}>›</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, fontSize: 11, color: "#5b6b7a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
        {dayNames.map((d, i) => <div key={i} style={{ textAlign: "center", padding: 4 }}>{d}</div>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
          const isPast = d < today;
          const available = !!slots[iso] && !isPast;
          const selected = value === iso;
          const base = { padding: "10px 0", border: "1px solid transparent", borderRadius: 8, fontSize: 13, fontFamily: "inherit", textAlign: "center", transition: "all .15s" };
          let style;
          if (selected) style = { ...base, background: "#0a2540", color: "#fff", borderColor: "#0a2540", cursor: "pointer", fontWeight: 600 };
          else if (available) style = { ...base, background: "#f0f7ff", color: "#0a2540", borderColor: "#cfe2f5", cursor: "pointer" };
          else style = { ...base, background: "#fafbfc", color: "#b0bcc8", cursor: "not-allowed" };
          return (
            <button key={i} type="button" disabled={!available} onClick={() => onChange(iso, slots[iso])} style={style}>
              {d.getDate()}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 14, fontSize: 11, color: "#5b6b7a" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: "#f0f7ff", border: "1px solid #cfe2f5", display: "inline-block" }} />{t("Disponible", "Available")}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: "#fafbfc", border: "1px solid #e5e7eb", display: "inline-block" }} />{t("Indisponible", "Unavailable")}</span>
      </div>
      {loading && <p style={{ fontSize: 12, color: "#5b6b7a", marginTop: 10, marginBottom: 0 }}>{t("Chargement des disponibilités…", "Loading availability…")}</p>}
      {error && <p style={{ fontSize: 12, color: "#a83232", marginTop: 10, marginBottom: 0 }}>{error}</p>}
    </div>
  );
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
    transferProof: null, // fichier joint (preuve de virement) — obligatoire si virement
    slotConfirmed: false, // case à cocher : "j'ai bien sélectionné mon créneau dans le calendrier"
    calStart: "", // ISO 8601 du créneau choisi via le picker (pour POST /book vers Cal.com)
  });
  const [bookingError, setBookingError] = useState("");
  const [bookingPending, setBookingPending] = useState(false);

  // Options dynamiques par bateau (sinon defaults génériques) — filtrées par type de créneau
  const allExtras = boat.options && boat.options.length > 0
    ? boat.options
    : [
        { id: "lunch", label: "Plateau-repas chef (par pers.)", price: 65 },
        { id: "snorkel", label: "Pack snorkeling (4 pers.)", price: 80 },
      ];
  const extras = allExtras.filter((o) => !o.slotOnly || o.slotOnly === data.slot);

  const toggleExtra = (x) =>
    setData((d) => ({ ...d, extras: d.extras.includes(x) ? d.extras.filter((e) => e !== x) : [...d.extras, x] }));

  const { total, deposit, preAuth, base, extrasCost, skipperCost } = useMemo(() => {
    const dayPrice = boat.price || 0;
    const halfPrice = boat.priceHalfDay || Math.round(dayPrice * 0.6);
    const base = data.slot === "halfday" ? halfPrice : dayPrice;
    const extrasCost = data.extras.reduce((sum, eId) => {
      const ex = extras.find((x) => x.id === eId);
      if (!ex) return sum;
      if (ex.onRequest) return sum;
      if (ex.id === "lunch") return sum + ex.price * (data.adults + data.children);
      if (ex.id === "aperitif-day") {
        const pax = data.adults + data.children;
        return sum + (pax <= 2 ? 30 : 45);
      }
      return sum + ex.price;
    }, 0);
    const skipperCost = data.crew === "with" ? (data.slot === "halfday" ? 150 : 200) : 0;
    const total = base + extrasCost + skipperCost;
    // Acompte et caution : valeurs définies par le bateau (Mochi : 90€ / 2000€)
    const deposit = boat.deposit != null ? boat.deposit : Math.round(total * 0.3);
    const preAuth = boat.preAuth != null ? boat.preAuth : 2000;
    return { total, deposit, preAuth, base, extrasCost, skipperCost };
  }, [boat, data]);

  const steps = [
    t("Créneau", "Time slot"),
    t("Options", "Options"),
    t("Récapitulatif", "Summary"),
    t("Coordonnées", "Contact info"),
    t("Pré-autorisation", "Pre-authorization"),
    t("Paiement", "Payment"),
    t("Confirmation", "Confirmation"),
  ];

  const validateStep = () => {
    setErrorMsg("");
    setFieldErrors({});
    if (step === 1) {
      if (!data.slot) { setErrorMsg(t("Veuillez choisir un type de créneau.", "Please select a slot type.")); return false; }
      if (data.slot === "halfday" && !data.period) { setErrorMsg(t("Veuillez choisir Matin ou Après-midi.", "Please choose Morning or Afternoon.")); return false; }
      if (!data.date) { setErrorMsg(t("Veuillez choisir une date de réservation.", "Please choose a booking date.")); return false; }
      if (!data.slotConfirmed) { setErrorMsg(t("Veuillez confirmer que vous avez sélectionné votre créneau dans le calendrier.", "Please confirm you have selected your slot in the calendar.")); return false; }
    }
    if (step === 2) {
      if (data.adults < 1) { setErrorMsg(t("Au moins 1 adulte requis.", "At least 1 adult required.")); return false; }
      if (data.adults + data.children > boat.capacity) {
        setErrorMsg(t("Capacité maximale du bateau dépassée (" + boat.capacity + ").", "Boat maximum capacity exceeded (" + boat.capacity + ")."));
        return false;
      }
      if (data.crew === "with" && !data.itinerary) {
        setErrorMsg(t("Veuillez choisir un itinéraire.", "Please choose an itinerary."));
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
      // Si le client conduit lui-même, le n° de permis est obligatoire ici
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
        setErrorMsg(t("Veuillez compléter les champs requis.", "Please complete the required fields."));
        const firstKey = Object.keys(errs)[0];
        setTimeout(() => {
          const el = document.querySelector('[data-fkey="' + firstKey + '"]');
          if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.focus && el.focus(); }
        }, 50);
        return false;
      }
    }
    if (step === 5) {
      if (!data.preAuthDone) { setErrorMsg(t("Merci d'effectuer la pré-autorisation bancaire avant de continuer.", "Please complete the bank pre-authorization before continuing.")); return false; }
    }
    if (step === 6) {
      if (!data.paymentDone) { setErrorMsg(t("Merci de finaliser le paiement de l'acompte avant de continuer.", "Please finalize the deposit payment before continuing.")); return false; }
    }
    return true;
  };

  const goNext = async () => {
    if (!validateStep()) return;
    // À l'étape 6 → 7, on crée la réservation dans Cal.com pour bloquer le créneau.
    if (step === 6) {
      if (!data.calStart) {
        setErrorMsg(t("Créneau introuvable. Revenez à l'étape 1 et resélectionnez la date.", "Slot not found. Go back to step 1 and reselect the date."));
        return;
      }
      const eventKey = data.slot === "day" ? "fullday" : (data.period === "pm" ? "halfday-pm" : "halfday-am");
      const fullName = (data.billing.firstName + " " + data.billing.lastName).trim() || data.billing.email;
      setBookingPending(true); setBookingError("");
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
          paymentMethod: data.paymentMethod,
        },
      });
      setBookingPending(false);
      if (!res.ok) {
        setBookingError(res.error || t("Impossible de réserver le créneau dans Cal.com.", "Could not book the slot in Cal.com."));
        setErrorMsg(t("Le créneau n'a pas pu être bloqué. Essayez une autre date.", "The slot could not be locked. Try another date."));
        return;
      }
    }
    setStep((s) => Math.min(7, s + 1)); setErrorMsg(""); setFieldErrors({});
  };
  const goPrev = () => { setErrorMsg(""); setFieldErrors({}); setStep((s) => Math.max(1, s - 1)); };

  // Scroll back to top whenever we change step (fixes "Options" not scrolling up)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const setBilling = (k, v) => setData((d) => ({ ...d, billing: { ...d.billing, [k]: v } }));
  const setPermit = (k, v) => setData((d) => ({ ...d, permit: { ...d.permit, [k]: v } }));

  const selectedItinerary = ITINERARIES.find((i) => i.id === data.itinerary);

  const showSidebar = step < 6;

  // Boat picker if no id provided
  if (id === undefined || id === null) {
    return (
      <main className="booking">
        <section className="step-card">
          <h2>{t("Choisissez votre bateau", "Choose your boat")}</h2>
          <div className="grid-3" style={{ marginTop: 16 }}>
            {BOATS.map((b) => (
              <BoatCard key={b.id} boat={b} onClick={() => setPage({ name: "booking", id: b.id })} />
            ))}
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="booking">
      <Breadcrumb setPage={setPage} trail={[
        { label: t("Accueil", "Home"), page: { name: "home" } },
        { label: t("Catalogue", "Catalog"), page: { name: "catalog" } },
        { label: boat.name, page: { name: "detail", id: boat.id } },
        { label: t("Réservation", "Booking") },
      ]} />
      <div className="detail-top">
        <button className="back" onClick={() => setPage({ name: "detail", id: boat.id })}>
          <Icon name="arrowL" size={16} /> {t("Retour à la fiche bateau", "Back to boat details")}
        </button>
      </div>

      <div className="booking-grid">
        <div className="booking-main">
          <div className="tunnel-stepper">
            {steps.map((s, i) => {
              const stepNum = i + 1;
              const canJump = stepNum < step && stepNum < 6; // peut revenir avant la pré-autorisation
              const cls = "step" + (step > stepNum ? " done" : "") + (step === stepNum ? " active" : "") + (canJump ? " clickable" : "");
              return (
                <button
                  key={i}
                  type="button"
                  className={cls}
                  onClick={canJump ? () => { setErrorMsg(""); setFieldErrors({}); setStep(stepNum); } : undefined}
                  disabled={!canJump}
                  aria-current={step === stepNum ? "step" : undefined}>
                  <span className="step-num">{step > stepNum ? <Icon name="check" size={14} /> : stepNum}</span>
                  <span className="step-label">{s}</span>
                </button>
              );
            })}
          </div>

          {step === 1 && (() => {
            const eventKey = data.slot === "day" ? "fullday" : (data.period === "pm" ? "halfday-pm" : "halfday-am");
            const pickerReady = data.slot === "day" || (data.slot === "halfday" && !!data.period);
            return (
              <section className="step-card">
                <h2>{t("Choisissez votre créneau", "Choose your time slot")}</h2>

                <h3 className="sub" style={{ marginTop: 8 }}>{t("Type de créneau", "Slot type")}</h3>
                <div className="seg two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <button
                    type="button"
                    className={"seg-btn" + (data.slot === "halfday" ? " active" : "")}
                    onClick={() => setData({ ...data, slot: "halfday", period: data.period || "am", extras: data.extras.filter((eId) => { const ex = allExtras.find((x) => x.id === eId); return !ex || !ex.slotOnly || ex.slotOnly === "halfday"; }) })}>
                    <strong>{t("Demi-journée", "Half day")}</strong>
                    <span>4h · {fmtPrice(boat.priceHalfDay || Math.round(boat.price * 0.6))}</span>
                  </button>
                  <button
                    type="button"
                    className={"seg-btn" + (data.slot === "day" ? " active" : "")}
                    onClick={() => setData({ ...data, slot: "day", period: "", extras: data.extras.filter((eId) => { const ex = allExtras.find((x) => x.id === eId); return !ex || !ex.slotOnly || ex.slotOnly === "day"; }) })}>
                    <strong>{t("Journée complète", "Full day")}</strong>
                    <span>9h — 18h · {fmtPrice(boat.price)}</span>
                  </button>
                </div>

                {data.slot === "halfday" && (
                  <>
                    <h3 className="sub" style={{ marginTop: 16 }}>{t("Horaire de la demi-journée", "Half-day time")}</h3>
                    <div className="seg two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <button
                        type="button"
                        className={"seg-btn" + (data.period === "am" ? " active" : "")}
                        onClick={() => setData({ ...data, slot: "halfday", period: "am" })}>
                        <strong>{t("Matin", "Morning")}</strong>
                        <span>9h — 13h</span>
                      </button>
                      <button
                        type="button"
                        className={"seg-btn" + (data.period === "pm" ? " active" : "")}
                        onClick={() => setData({ ...data, slot: "halfday", period: "pm" })}>
                        <strong>{t("Après-midi", "Afternoon")}</strong>
                        <span>14h — 18h</span>
                      </button>
                    </div>
                  </>
                )}

                {pickerReady ? (
                  <>
                    <h3 className="sub" style={{ marginTop: 20 }}>{t("Choisissez votre date", "Choose your date")}</h3>
                    <CalDatePicker
                      eventKey={eventKey}
                      value={data.date}
                      onChange={(iso, startISO) => setData({ ...data, date: iso, calStart: startISO || "", slotConfirmed: true })}
                      t={t}
                    />
                    {data.date && (
                      <div style={{ background: "#f0f7ff", border: "1px solid #cfe2f5", borderLeft: "3px solid #0a2540", padding: "12px 16px", borderRadius: 8, marginTop: 14, fontSize: 14, color: "#0a2540" }}>
                        <strong>{t("Créneau sélectionné", "Selected slot")} :</strong>{" "}
                        {fmtLong(data.date, t.lang)}
                        {" · "}
                        {data.slot === "day"
                          ? t("Journée complète (9h — 18h)", "Full day (9am — 6pm)")
                          : data.period === "pm"
                            ? t("Après-midi (14h — 18h)", "Afternoon (2pm — 6pm)")
                            : t("Matin (9h — 13h)", "Morning (9am — 1pm)")}
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #0a2540", padding: "12px 16px", borderRadius: 8, marginTop: 16, color: "#3b4a5a", fontSize: 13 }}>
                    {t("Choisissez d'abord le type de créneau (et l'horaire pour une demi-journée) pour afficher les dates disponibles.", "First select the slot type (and time for a half day) to view available dates.")}
                  </div>
                )}
              </section>
            );
          })()}

          {step === 2 && (
            <section className="step-card">
              <h2>{t("Options & participants", "Options & guests")}</h2>

              <h3 className="sub">{t("Options", "Add-ons")}</h3>
              <div className="extras">
                {extras.map((x) => {
                  const enLabelMap = { buoy: "Towed inflatable", wake: "Wakeboard", paddle: "Paddle board", lunch: "Chef-prepared lunch (per person)", snorkel: "Snorkeling gear", "aperitif-day": "Gourmet aperitif + non-alcoholic drink", "aperitif-halfday": "Gourmet aperitif + drink" };
                  let priceLabel;
                  if (x.onRequest) {
                    priceLabel = t("Sur demande", "On request");
                  } else if (x.id === "aperitif-day") {
                    const pax = data.adults + data.children;
                    priceLabel = "+" + (pax <= 2 ? 30 : 45) + " €";
                  } else {
                    priceLabel = "+" + x.price + " €";
                  }
                  const note = x.pricingNote ? t(x.pricingNote, x.pricingNote_en || x.pricingNote) : null;
                  return (
                    <label key={x.id} className={"extra" + (data.extras.includes(x.id) ? " active" : "")}>
                      <input type="checkbox" checked={data.extras.includes(x.id)} onChange={() => toggleExtra(x.id)} />
                      <span className="extra-check"><Icon name="check" size={12} /></span>
                      <span className="extra-label">
                        {t(x.label, enLabelMap[x.id] || x.label)}
                        {note && <span style={{ display: "block", fontSize: 12, color: "#6b7280", marginTop: 2 }}>{note}</span>}
                      </span>
                      <span className="extra-price">{priceLabel}</span>
                    </label>
                  );
                })}
              </div>

              <h3 className="sub">{t("Participants", "Guests")}</h3>
              <div className="participants-row">
                <div className="stepper">
                  <span className="stepper-label">{t("Adultes", "Adults")}</span>
                  <button onClick={() => setData({ ...data, adults: Math.max(1, data.adults - 1) })}><Icon name="minus" size={14} /></button>
                  <span>{data.adults}</span>
                  <button onClick={() => {
                    if (data.adults + data.children < boat.capacity) setData({ ...data, adults: data.adults + 1 });
                  }}><Icon name="plus" size={14} /></button>
                </div>
                <div className="stepper">
                  <span className="stepper-label">{t("Enfants", "Children")}</span>
                  <button onClick={() => setData({ ...data, children: Math.max(0, data.children - 1) })}><Icon name="minus" size={14} /></button>
                  <span>{data.children}</span>
                  <button onClick={() => {
                    if (data.adults + data.children < boat.capacity) setData({ ...data, children: data.children + 1 });
                  }}><Icon name="plus" size={14} /></button>
                </div>
              </div>
              <div style={{ background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #0a2540", padding: "10px 14px", borderRadius: 4, margin: "12px 0", color: "#3b4a5a", fontSize: 13 }}>
                {t(`Les enfants sont sous la responsabilité des adultes. Capacité maximale du bateau : ${boat.capacity} personnes.`, `Children are under the responsibility of accompanying adults. Boat maximum capacity: ${boat.capacity} people.`)}
              </div>

              <h3 className="sub">{t("Skipper", "Skipper")}</h3>
              <div className="seg two">
                <button className={"seg-btn" + (data.crew === "without" ? " active" : "")} onClick={() => setData({ ...data, crew: "without", itinerary: "" })}>
                  <strong>{t("Sans skipper", "Without skipper")}</strong>
                  <span>{t("Permis bateau requis", "Boating license required")}</span>
                </button>
                <button className={"seg-btn" + (data.crew === "with" ? " active" : "")} onClick={() => setData({ ...data, crew: "with" })}>
                  <strong>{t("Avec skipper", "With skipper")}</strong>
                  <span>{t("+150 € demi-journée · +200 € journée", "+€150 half day · +€200 full day")}</span>
                </button>
              </div>

              <h3 className="sub">{data.crew === "with" ? t("Itinéraire", "Itinerary") : t("Destinations possibles", "Possible destinations")}</h3>
              <div className="itinerary-list">
                {ITINERARIES.map((it) => {
                  const selectable = data.crew === "with";
                  return (
                    <div key={it.id} style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
                      {selectable ? (
                        <label className={"itinerary-item" + (data.itinerary === it.id ? " active" : "")} style={{ flex: 1 }}>
                          <input
                            type="radio"
                            name="itinerary"
                            checked={data.itinerary === it.id}
                            onChange={() => setData({ ...data, itinerary: it.id })}
                          />
                          <div>
                            <strong>{itName(it, t)}</strong>
                            <span className="muted" style={{ display: "block", fontSize: 13 }}>{itDesc(it, t)}</span>
                          </div>
                        </label>
                      ) : (
                        <div className="itinerary-item" style={{ flex: 1, cursor: "default" }}>
                          <div>
                            <strong>{itName(it, t)}</strong>
                            <span className="muted" style={{ display: "block", fontSize: 13 }}>{itDesc(it, t)}</span>
                          </div>
                        </div>
                      )}
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setPage({ name: "itinerary", id: it.id })}
                        style={{ whiteSpace: "nowrap", alignSelf: "center", padding: "8px 14px" }}>
                        {t("Plus d'info", "More info")}
                      </button>
                    </div>
                  );
                })}
              </div>

              {data.crew === "without" && (
                <div style={{ background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #a83232", padding: "10px 14px", borderRadius: 4, color: "#7a1f1f", marginTop: 12, fontSize: 13 }}>
                  {t("Un permis bateau valable est obligatoire. Seul le titulaire du permis sera habilité à conduire le bateau.", "A valid boating license is mandatory. Only the license holder will be allowed to operate the boat.")}
                </div>
              )}
            </section>
          )}

          {step === 3 && (
            <section className="step-card">
              <h2>{t("Récapitulatif", "Summary")}</h2>
              <div className="recap">
                <div className="recap-row" style={{ alignItems: "center" }}>
                  <span>{t("Bateau", "Boat")}</span>
                  <strong style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={boat.images[0]} alt={boat.name} style={{ width: 56, height: 40, objectFit: "cover", borderRadius: 6 }} />
                    {boat.name} <span className="muted" style={{ fontWeight: 400 }}>· {boat.port}</span>
                  </strong>
                </div>
                <div className="recap-row"><span>{t("Date", "Date")}</span><strong>{data.date ? fmtLong(data.date, t.lang) : "—"}</strong></div>
                <div className="recap-row"><span>{t("Créneau", "Time slot")}</span><strong>{labelSlot(data.slot, t)}</strong></div>
                <div className="recap-row"><span>{t("Adultes / Enfants", "Adults / Children")}</span><strong>{data.adults} {t(data.adults > 1 ? "adultes" : "adulte", data.adults > 1 ? "adults" : "adult")}{data.children ? " · " + data.children + " " + t(data.children > 1 ? "enfants" : "enfant", data.children > 1 ? "children" : "child") : ""}</strong></div>
                {data.crew === "with" && selectedItinerary && (
                  <div className="recap-row"><span>{t("Itinéraire", "Itinerary")}</span><strong>{itName(selectedItinerary, t)}</strong></div>
                )}
                <div className="recap-row"><span>{t("Skipper", "Skipper")}</span><strong>{data.crew === "with" ? t(`Inclus (+${skipperCost} €)`, `Included (+€${skipperCost})`) : t("Sans skipper", "Without skipper")}</strong></div>
                <div className="recap-row"><span>{t("Tarif base", "Base price")}</span><strong>{fmtPrice(base)}</strong></div>
                {data.extras.map((eId) => {
                  const ex = extras.find((x) => x.id === eId);
                  if (!ex) return null;
                  const cost = ex.id === "lunch" ? ex.price * (data.adults + data.children) : ex.price;
                  return (
                    <div className="recap-row" key={eId}>
                      <span>{t(ex.label, ({ buoy: "Towed inflatable", wake: "Wakeboard", lunch: "Chef-prepared lunch (per person)", snorkel: "Snorkeling pack (4 people)" })[ex.id] || ex.label)}</span>
                      <strong>+{fmtPrice(cost)}</strong>
                    </div>
                  );
                })}
                <div className="recap-row total"><span>{t("Total", "Total")}</span><strong>{fmtPrice(total)}</strong></div>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="step-card">
              <h2>{t("Vos coordonnées", "Your contact info")}</h2>
              <h3 className="sub">{t("Personne qui réserve (facturation)", "Person booking (billing)")}</h3>
              <div className="form-grid">
                <label className="field">
                  <span>{t("Prénom", "First name")}</span>
                  <input data-fkey="billing.firstName" type="text" value={data.billing.firstName} onChange={(e) => setBilling("firstName", e.target.value)} />
                  {fieldErrors["billing.firstName"] && <small style={{ color: "#c00" }}>{t(fieldErrors["billing.firstName"], "Required")}</small>}
                </label>
                <label className="field">
                  <span>{t("Nom", "Last name")}</span>
                  <input data-fkey="billing.lastName" type="text" value={data.billing.lastName} onChange={(e) => setBilling("lastName", e.target.value)} />
                  {fieldErrors["billing.lastName"] && <small style={{ color: "#c00" }}>{t(fieldErrors["billing.lastName"], "Required")}</small>}
                </label>
                <label className="field">
                  <span>{t("Date de naissance", "Date of birth")}</span>
                  <input data-fkey="billing.birthdate" type="date" value={data.billing.birthdate} onChange={(e) => setBilling("birthdate", e.target.value)} />
                  <small style={{ color: "var(--muted, #5b6b7a)" }}>{t("Minimum 20 ans.", "Minimum age: 20.")}</small>
                  {fieldErrors["billing.birthdate"] && <small style={{ color: "#c00" }}>{t(fieldErrors["billing.birthdate"], "Required")}</small>}
                </label>
                <label className="field">
                  <span>{t("Email", "Email")}</span>
                  <input data-fkey="billing.email" type="email" value={data.billing.email} onChange={(e) => setBilling("email", e.target.value)} />
                  {fieldErrors["billing.email"] && <small style={{ color: "#c00" }}>{t(fieldErrors["billing.email"], fieldErrors["billing.email"] === "Email invalide" ? "Invalid email" : "Required")}</small>}
                </label>
                <label className="field">
                  <span>{t("Téléphone", "Phone")}</span>
                  <input data-fkey="billing.phone" type="tel" value={data.billing.phone} onChange={(e) => setBilling("phone", e.target.value)} />
                  {fieldErrors["billing.phone"] && <small style={{ color: "#c00" }}>{t(fieldErrors["billing.phone"], "Required")}</small>}
                </label>
                <label className="field full">
                  <span>{t("Adresse postale", "Postal address")}</span>
                  <input data-fkey="billing.address" type="text" value={data.billing.address} onChange={(e) => setBilling("address", e.target.value)} />
                  {fieldErrors["billing.address"] && <small style={{ color: "#c00" }}>{t(fieldErrors["billing.address"], "Required")}</small>}
                </label>
                {!data.permitDifferent && (
                  <label className="field full">
                    <span>{t("Numéro de permis bateau", "Boating license number")} {data.crew === "without" ? t("(obligatoire)", "(required)") : t("(si applicable)", "(if applicable)")}</span>
                    <input data-fkey="billing.permitNumber" type="text" value={data.billing.permitNumber || ""} onChange={(e) => setBilling("permitNumber", e.target.value)} />
                    {fieldErrors["billing.permitNumber"] && <small style={{ color: "#c00" }}>{t(fieldErrors["billing.permitNumber"], "Required")}</small>}
                  </label>
                )}
              </div>

              <label className="field" style={{ marginTop: 16, flexDirection: "row", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={data.permitDifferent} onChange={(e) => setData({ ...data, permitDifferent: e.target.checked })} />
                <span>{t("Le chef de bord (titulaire du permis) est une autre personne", "The skipper (license holder) is a different person")}</span>
              </label>

              {data.permitDifferent && (
                <>
                  <h3 className="sub">{t("Chef de bord (titulaire du permis bateau)", "Skipper (boating license holder)")}</h3>
                  <div className="form-grid">
                    <label className="field">
                      <span>{t("Prénom", "First name")}</span>
                      <input data-fkey="permit.firstName" type="text" value={data.permit.firstName} onChange={(e) => setPermit("firstName", e.target.value)} />
                      {fieldErrors["permit.firstName"] && <small style={{ color: "#c00" }}>{t(fieldErrors["permit.firstName"], "Required")}</small>}
                    </label>
                    <label className="field">
                      <span>{t("Nom", "Last name")}</span>
                      <input data-fkey="permit.lastName" type="text" value={data.permit.lastName} onChange={(e) => setPermit("lastName", e.target.value)} />
                      {fieldErrors["permit.lastName"] && <small style={{ color: "#c00" }}>{t(fieldErrors["permit.lastName"], "Required")}</small>}
                    </label>
                    <label className="field">
                      <span>{t("Date de naissance", "Date of birth")}</span>
                      <input data-fkey="permit.birthdate" type="date" value={data.permit.birthdate} onChange={(e) => setPermit("birthdate", e.target.value)} />
                      {fieldErrors["permit.birthdate"] && <small style={{ color: "#c00" }}>{t(fieldErrors["permit.birthdate"], "Required")}</small>}
                    </label>
                    <label className="field">
                      <span>{t("Email", "Email")}</span>
                      <input data-fkey="permit.email" type="email" value={data.permit.email} onChange={(e) => setPermit("email", e.target.value)} />
                      {fieldErrors["permit.email"] && <small style={{ color: "#c00" }}>{t(fieldErrors["permit.email"], fieldErrors["permit.email"] === "Email invalide" ? "Invalid email" : "Required")}</small>}
                    </label>
                    <label className="field">
                      <span>{t("Téléphone", "Phone")}</span>
                      <input data-fkey="permit.phone" type="tel" value={data.permit.phone} onChange={(e) => setPermit("phone", e.target.value)} />
                      {fieldErrors["permit.phone"] && <small style={{ color: "#c00" }}>{t(fieldErrors["permit.phone"], "Required")}</small>}
                    </label>
                    <label className="field full">
                      <span>{t("Adresse", "Address")}</span>
                      <input data-fkey="permit.address" type="text" value={data.permit.address} onChange={(e) => setPermit("address", e.target.value)} />
                      {fieldErrors["permit.address"] && <small style={{ color: "#c00" }}>{t(fieldErrors["permit.address"], "Required")}</small>}
                    </label>
                    <label className="field full">
                      <span>{t("Numéro de permis bateau", "Boating license number")}</span>
                      <input data-fkey="permit.permitNumber" type="text" value={data.permit.permitNumber} onChange={(e) => setPermit("permitNumber", e.target.value)} />
                      {fieldErrors["permit.permitNumber"] && <small style={{ color: "#c00" }}>{t(fieldErrors["permit.permitNumber"], "Required")}</small>}
                    </label>
                  </div>
                </>
              )}
            </section>
          )}

          {step === 5 && (
            <section className="step-card">
              <h2>{t("Pré-autorisation bancaire", "Bank pre-authorization")}</h2>
              <p className="lead">
                {t(<>Avant le paiement de l'acompte, nous procédons à une <strong>pré-autorisation bancaire de {fmtPrice(preAuth)}</strong> via notre partenaire Swikly.
                Aucun montant n'est débité — il s'agit d'une simple empreinte CB qui sert de caution.</>,
                <>Before paying the deposit, we proceed with a <strong>bank pre-authorization of {fmtPrice(preAuth)}</strong> via our partner Swikly.
                No amount is charged — it is simply a card hold acting as a security deposit.</>)}
              </p>
              <div className="pay-card" style={{ border: "1px solid #e5e7eb", borderRadius: 16, padding: 22, marginTop: 18, background: "var(--surface-2, #f4f8fb)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <Icon name="shield" size={20} />
                  <h3 style={{ margin: 0 }}>{t("Caution Swikly", "Swikly security deposit")}</h3>
                </div>
                <p style={{ fontSize: 32, fontWeight: 700, margin: "8px 0" }}>{fmtPrice(preAuth)}</p>
                <p className="muted" style={{ fontSize: 13, marginBottom: 16 }}>
                  {t("Empreinte CB sécurisée — libérée automatiquement après la location si aucun dommage n'est constaté.", "Secure card hold — automatically released after the rental if no damage is reported.")}
                </p>
                <a
                  href="https://v2.swik.link/REpq148"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    setData((d) => ({ ...d, preAuthDone: true }));
                  }}>
                  {t("Pré-autorisation bancaire (Swikly)", "Bank pre-authorization (Swikly)")}
                </a>
              </div>
              {data.preAuthDone && (
                <div style={{ background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #1a5a32", padding: "14px 16px", borderRadius: 4, marginTop: 18, fontSize: 14, color: "#1a3a52" }}>
                  {t("Pré-autorisation effectuée avec succès. Vous pouvez passer au paiement de l'acompte.", "Pre-authorization successful. You can now proceed to the deposit payment.")}
                </div>
              )}
            </section>
          )}

          {step === 6 && (
            <section className="step-card">
              <h2>{t("Paiement de l'acompte", "Deposit payment")}</h2>
              <p className="lead" style={{ color: "var(--muted, #5b6b7a)" }}>
                {t("Montant à régler", "Amount to pay")} : <strong style={{ color: "var(--ink)" }}>{fmtPrice(deposit)}</strong>. {t("Sélectionnez le moyen de paiement de votre choix.", "Choose your preferred payment method.")}
              </p>

              <div style={{ background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #0a2540", padding: "12px 14px", borderRadius: 4, marginTop: 8, marginBottom: 22, fontSize: 13, color: "#3b4a5a" }}>
                {t("Seul le virement bancaire est disponible pour le moment. Les autres moyens de paiement seront activés prochainement.", "Only bank transfer is available at the moment. Other payment methods will be activated shortly.")}
              </div>

              <div className="pay-methods" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                {[
                  { id: "cb", label: t("Carte bancaire", "Credit card"), logo: <PayLogo brand="cb" /> },
                  { id: "paypal", label: "PayPal", logo: <PayLogo brand="paypal" /> },
                  { id: "applepay", label: "Apple Pay", logo: <PayLogo brand="applepay" /> },
                  { id: "paybybank", label: "Pay by Bank", logo: <PayLogo brand="paybybank" /> },
                  { id: "virement", label: t("Virement bancaire", "Bank transfer"), logo: <PayLogo brand="virement" /> },
                ].map((m) => {
                  const enabled = m.id === "virement";
                  const active = data.paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      disabled={!enabled}
                      onClick={() => enabled && setData((d) => ({ ...d, paymentMethod: m.id }))}
                      title={!enabled ? t("Bientôt disponible", "Coming soon") : undefined}
                      style={{
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
                        gap: 10,
                      }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {m.logo}
                        <span>{m.label}</span>
                      </span>
                      <span style={{
                        width: 16, height: 16, borderRadius: "50%",
                        border: active ? "5px solid var(--ink, #0a2540)" : "1.5px solid #cbd5e0",
                        flexShrink: 0,
                      }} />
                    </button>
                  );
                })}
              </div>

              {data.paymentMethod && data.paymentMethod !== "virement" && (
                <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 22, marginTop: 22, background: "#fff" }}>
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.6, color: "var(--muted, #5b6b7a)", marginBottom: 8 }}>
                    {t("Récapitulatif", "Summary")}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                    <span style={{ fontSize: 14 }}>{({ cb: t("Carte bancaire", "Credit card"), paypal: "PayPal", applepay: "Apple Pay", paybybank: "Pay by Bank" })[data.paymentMethod]}</span>
                    <strong style={{ fontSize: 22 }}>{fmtPrice(deposit)}</strong>
                  </div>
                  <a
                    href="#PAYMENT_LINK"
                    className="btn btn-primary btn-block"
                    onClick={(e) => { e.preventDefault(); setData((d) => ({ ...d, paymentDone: true })); }}>
                    {t("Procéder au paiement", "Proceed to payment")}
                  </a>
                  <p style={{ fontSize: 12, color: "var(--muted, #5b6b7a)", marginTop: 10, marginBottom: 0, textAlign: "center" }}>
                    {t("Vous serez redirigé vers une page de paiement sécurisée.", "You will be redirected to a secure payment page.")}
                  </p>
                </div>
              )}

              {data.paymentMethod === "virement" && (
                <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 22, marginTop: 22, background: "#fff" }}>
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.6, color: "var(--muted, #5b6b7a)", marginBottom: 12 }}>
                    {t("Coordonnées bancaires", "Bank details")}
                  </div>
                  <p style={{ fontSize: 14, marginTop: 0, marginBottom: 16, color: "#3b4a5a" }}>
                    {t(<>Effectuez un virement de <strong>{fmtPrice(deposit)}</strong> sur notre compte. Votre réservation sera confirmée dès réception du virement (2 à 3 jours ouvrés).</>,
                       <>Send a bank transfer of <strong>{fmtPrice(deposit)}</strong> to our account. Your booking will be confirmed once the transfer is received (2 to 3 business days).</>)}
                  </p>
                  <div style={{ background: "#fafbfc", padding: "16px 18px", borderRadius: 8, fontSize: 13, border: "1px solid #eef1f4", display: "grid", gap: 10 }}>
                    {[
                      [t("Bénéficiaire", "Account holder"), "South Boat", false],
                      [t("Adresse", "Address"), "4 Rue des Grillons, 06130 Grasse, France", false],
                      ["IBAN", "FR76 1695 8000 0145 8029 0135 156", true],
                      ["BIC / SWIFT", "QNTOFRP1XXX", true],
                      [t("Banque", "Bank"), "Qonto", false],
                      [t("Référence", "Reference"), `RESA-${boat.name.toUpperCase()}-${(data.date || "").replace(/-/g, "")}`, true],
                    ].map(([k, v, mono], i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ color: "var(--muted, #5b6b7a)", fontSize: 11.5, textTransform: "uppercase", letterSpacing: 0.4 }}>{k}</span>
                        <strong style={{ fontFamily: mono ? "ui-monospace, monospace" : "inherit", wordBreak: "break-all", fontSize: 13 }}>{v}</strong>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 11.5, color: "var(--muted, #5b6b7a)", marginTop: 10, marginBottom: 0, lineHeight: 1.5 }}>
                    {t(<>Pour un virement SWIFT international, la banque émettrice peut demander le BIC partenaire : <strong>TRWIBEB3XXX</strong>.</>,
                       <>For an international SWIFT transfer, the sending bank may request the partner BIC: <strong>TRWIBEB3XXX</strong>.</>)}
                  </p>
                  <button
                    className="btn btn-primary btn-block"
                    style={{ marginTop: 16 }}
                    onClick={() => setData((d) => ({ ...d, paymentDone: true }))}>
                    {t("J'ai effectué le virement", "I've made the transfer")}
                  </button>

                  {data.paymentDone && (
                    <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid #eef1f4" }}>
                      <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.6, color: "var(--muted, #5b6b7a)", marginBottom: 10 }}>
                        {t("Preuve de virement (obligatoire)", "Proof of transfer (required)")}
                      </div>
                      <p style={{ fontSize: 13, color: "#3b4a5a", marginTop: 0, marginBottom: 12 }}>
                        {t("Joignez une capture d'écran ou un PDF de votre virement pour finaliser votre réservation.",
                           "Attach a screenshot or PDF of your transfer to finalize your booking.")}
                      </p>
                      <label
                        htmlFor="transfer-proof-input"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 12,
                          border: "1px dashed " + (data.transferProof ? "#1a5a32" : "#cbd5e0"),
                          background: data.transferProof ? "#f0f8f3" : "#fafbfc",
                          borderRadius: 10,
                          padding: "14px 16px",
                          cursor: "pointer",
                          fontSize: 13,
                        }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                          <Icon name={data.transferProof ? "check" : "plus"} size={16} />
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {data.transferProof
                              ? data.transferProof.name
                              : t("Choisir un fichier (JPG, PNG, PDF)", "Choose a file (JPG, PNG, PDF)")}
                          </span>
                        </span>
                        {data.transferProof && (
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setData((d) => ({ ...d, transferProof: null })); }}
                            style={{ background: "none", border: "none", color: "var(--muted, #5b6b7a)", cursor: "pointer", fontSize: 13, padding: 4 }}>
                            {t("Retirer", "Remove")}
                          </button>
                        )}
                      </label>
                      <input
                        id="transfer-proof-input"
                        type="file"
                        accept="image/jpeg,image/png,image/heic,application/pdf"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const f = e.target.files && e.target.files[0];
                          if (f) setData((d) => ({ ...d, transferProof: f }));
                        }}
                      />
                      {data.transferProof && (
                        <p style={{ fontSize: 12, color: "var(--muted, #5b6b7a)", marginTop: 8, marginBottom: 0 }}>
                          {t("Fichier prêt à être joint à votre confirmation.", "File ready to be attached to your confirmation.")}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {data.paymentDone && (
                <div style={{ background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #1a5a32", padding: "14px 16px", borderRadius: 4, marginTop: 18, fontSize: 14, color: "#1a3a52" }}>
                  {data.paymentMethod === "virement"
                    ? t("Virement enregistré. Vous recevrez votre confirmation de réservation dès réception du virement (2 à 3 jours ouvrés).", "Transfer registered. You will receive your booking confirmation as soon as the transfer is received (2 to 3 business days).")
                    : t("Paiement enregistré avec succès. Vous pouvez valider votre réservation.", "Payment registered successfully. You can now confirm your booking.")}
                </div>
              )}
            </section>
          )}

          {step === 7 && (
            <section className="step-card success">
              <div className="success-icon"><Icon name="check" size={28} /></div>
              <h2>{t("Réservation confirmée", "Booking confirmed")}</h2>
              <p className="lead">{t("Un email de confirmation a été envoyé à", "A confirmation email has been sent to")} <strong>{data.billing.email || t("votre adresse", "your address")}</strong>.</p>

              <div style={{ background: "#fdf2f2", border: "1px solid #f1c6c6", borderLeft: "4px solid #a83232", padding: "14px 18px", borderRadius: 6, margin: "20px 0", color: "#5a1a1a", fontSize: 14, lineHeight: 1.55 }}>
                <strong style={{ display: "block", marginBottom: 6 }}>{t("Important", "Important")}</strong>
                <p style={{ margin: 0 }}>
                  {t(
                    "Afin de garantir votre sécurité et de respecter les exigences de notre assurance, la présentation d'une pièce d'identité et du permis bateau en cours de validité de la personne ayant réservé sur le site est obligatoire avant toute prise en charge du bateau.",
                    "To ensure your safety and meet our insurer's requirements, the booking holder must present a valid ID and a valid boating license before taking charge of the boat."
                  )}
                </p>
                <p style={{ margin: "8px 0 0 0" }}>
                  {t(
                    "En l'absence de ces documents, la location ne pourra être effectuée et sera annulée.",
                    "Without these documents, the rental cannot proceed and will be cancelled."
                  )}
                </p>
              </div>

              <div className="recap">
                <div className="recap-row"><span>{t("Bateau", "Boat")}</span><strong>{boat.name}</strong></div>
                <div className="recap-row"><span>{t("Date", "Date")}</span><strong>{data.date ? fmtLong(data.date, t.lang) : "—"}</strong></div>
                <div className="recap-row"><span>{t("Créneau", "Time slot")}</span><strong>{labelSlot(data.slot, t)}</strong></div>
                <div className="recap-row"><span>{t("Participants", "Guests")}</span><strong>{data.adults} {t(data.adults > 1 ? "adultes" : "adulte", data.adults > 1 ? "adults" : "adult")}{data.children ? " · " + data.children + " " + t(data.children > 1 ? "enfants" : "enfant", data.children > 1 ? "children" : "child") : ""}</strong></div>
                {selectedItinerary && <div className="recap-row"><span>{t("Itinéraire", "Itinerary")}</span><strong>{itName(selectedItinerary, t)}</strong></div>}
                <div className="recap-row"><span>{t("Acompte payé", "Deposit paid")}</span><strong>{fmtPrice(deposit)}</strong></div>
                <div className="recap-row"><span>{t("Reste à payer le Jour-J", "Balance due on the day")}</span><strong>{fmtPrice(Math.max(0, total - deposit))}</strong></div>
                <div className="recap-row total"><span>{t("Total", "Total")}</span><strong>{fmtPrice(total)}</strong></div>
              </div>

              {/* Mail client + mail interne envoyés en arrière-plan à contact@south-boat.com — aperçu non affiché au client.
                  Les templates EMAIL_TEMPLATE et INTERNAL_EMAIL_TEMPLATE sont utilisés côté backend lorsqu'il sera branché. */}

              <button className="btn btn-primary btn-block" style={{ marginTop: 18 }} onClick={() => setPage({ name: "home" })}>{t("Retour à l'accueil", "Back to home")}</button>
            </section>
          )}

          {step < 7 && (() => {
            // Le bouton suivant est désactivé tant que tous les champs requis de l'étape ne sont pas remplis
            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isStr = (v) => v && String(v).trim().length > 0;
            let stepIncomplete = false;
            if (step === 1) {
              stepIncomplete = !data.slot || (data.slot === "halfday" && !data.period) || !data.date || !data.slotConfirmed;
            } else if (step === 2) {
              stepIncomplete = data.adults < 1 || (data.adults + data.children > boat.capacity) || (data.crew === "with" && !data.itinerary);
            } else if (step === 4) {
              const billingOk = ["firstName", "lastName", "birthdate", "email", "phone", "address"].every((k) => isStr(data.billing[k])) && emailRe.test(data.billing.email || "");
              const permitNumOk = data.permitDifferent || data.crew !== "without" || isStr(data.billing.permitNumber);
              const permitOk = !data.permitDifferent || (
                ["firstName", "lastName", "birthdate", "email", "phone", "address", "permitNumber"].every((k) => isStr(data.permit[k])) &&
                emailRe.test(data.permit.email || "")
              );
              stepIncomplete = !billingOk || !permitNumOk || !permitOk;
            }
            const nextDisabled =
              stepIncomplete ||
              bookingPending ||
              (step === 5 && !data.preAuthDone) ||
              (step === 6 && (!data.paymentDone || (data.paymentMethod === "virement" && !data.transferProof)));
            return (
              <div className="step-actions" style={{ flexDirection: "column", alignItems: "stretch", gap: 8 }}>
                <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                  <button className="btn btn-outline" onClick={goPrev} disabled={step === 1}>{t("Précédent", "Previous")}</button>
                  <button
                    className="btn btn-primary"
                    onClick={goNext}
                    disabled={nextDisabled}
                    style={nextDisabled ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
                    title={nextDisabled
                      ? (step === 5
                          ? t("Effectuez d'abord la pré-autorisation bancaire.", "Complete the bank pre-authorization first.")
                          : step === 6
                            ? t("Finalisez le paiement avant de continuer.", "Finalize the payment before continuing.")
                            : t("Veuillez compléter les champs requis.", "Please complete the required fields."))
                      : undefined}>
                    {step === 6 && bookingPending
                      ? t("Réservation du créneau…", "Locking the slot…")
                      : (step === 3 ? t("Réserver", "Book") : step === 4 ? t("Aller à la caution", "Go to deposit hold") : step === 5 ? t("Aller au paiement", "Go to payment") : step === 6 ? t("Valider la réservation", "Confirm booking") : t("Continuer", "Continue"))} <Icon name="arrow" size={16} />
                  </button>
                </div>
                {errorMsg && <p style={{ color: "#c00", margin: 0, textAlign: "right" }}>{errorMsg}</p>}
                {bookingError && <p style={{ color: "#c00", margin: 0, textAlign: "right", fontSize: 12 }}>Cal.com : {bookingError}</p>}
              </div>
            );
          })()}
        </div>

        {showSidebar && (
          <aside className="booking-summary">
            <img src={boat.images[0]} alt={`${boat.name} - ${t("Location bateau Mandelieu", "Boat rental Mandelieu")}`} className="bs-img" />
            <h3>{boat.name}</h3>
            <p className="muted">{t(boat.type, ({ "Day cruiser": "Day cruiser", "Open premium": "Open premium", "Familial": "Family" })[boat.type] || boat.type)} · {boat.port}</p>
            <div className="bs-line">
              <span>{t("Date", "Date")}</span>
              <strong>{data.date ? fmtLong(data.date, t.lang) : "—"}</strong>
            </div>
            <div className="bs-line">
              <span>{t("Créneau", "Time slot")}</span>
              <strong>{labelSlot(data.slot, t)}</strong>
            </div>
            <div className="bs-line">
              <span>{t("Adultes / Enfants", "Adults / Children")}</span>
              <strong>{data.adults} / {data.children}</strong>
            </div>
            {data.crew === "with" && selectedItinerary && (
              <div className="bs-line">
                <span>{t("Itinéraire", "Itinerary")}</span>
                <strong>{itName(selectedItinerary, t)}</strong>
              </div>
            )}
            {data.extras.length > 0 && (
              <div className="bs-line">
                <span>{t("Options", "Add-ons")}</span>
                <strong>{data.extras.length}</strong>
              </div>
            )}
            <div className="bs-divider" />
            <div className="bs-total">
              <span>{t("Total estimé", "Estimated total")}</span>
              <strong>{fmtPrice(total)}</strong>
            </div>
            <p className="bs-note">{t("Annulation gratuite jusqu'à 7 jours avant le départ.", "Free cancellation up to 7 days before departure.")}</p>
          </aside>
        )}
      </div>
      <Footer />
    </main>
  );
}

const fmtLong = (s, lang) => {
  if (!s) return "—";
  const [y, m, day] = s.split("-").map(Number);
  const d = new Date(y, m - 1, day);
  return d.toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};
const labelSlot = (s, t) => {
  if (!t) return ({ day: "Journée complète", halfday: "Demi-journée" })[s] || "—";
  return s === "day" ? t("Journée complète", "Full day") : s === "halfday" ? t("Demi-journée", "Half day") : "—";
};

// ============ CALENDAR ============
function Calendar({ selected, onSelect }) {
  const t = window.useT();
  const [view, setView] = useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const today = new Date();today.setHours(0, 0, 0, 0);
  const first = new Date(view.y, view.m, 1);
  const last = new Date(view.y, view.m + 1, 0);
  const startOff = (first.getDay() + 6) % 7;
  const days = [];
  for (let i = 0; i < startOff; i++) days.push(null);
  for (let i = 1; i <= last.getDate(); i++) days.push(new Date(view.y, view.m, i));

  const monthName = first.toLocaleDateString(t.lang === "en" ? "en-GB" : "fr-FR", { month: "long", year: "numeric" });
  const dows = t.lang === "en" ? ["M", "T", "W", "T", "F", "S", "S"] : ["L", "M", "M", "J", "V", "S", "D"];

  // randomly mark some as unavailable for realism
  const unavailable = useMemo(() => {
    const set = new Set();
    [3, 4, 12, 18, 19].forEach((d) => set.add(`${view.y}-${view.m}-${d}`));
    return set;
  }, [view]);

  return (
    <div className="cal">
      <div className="cal-head">
        <button onClick={() => setView({ y: view.m === 0 ? view.y - 1 : view.y, m: (view.m + 11) % 12 })}><Icon name="arrowL" size={16} /></button>
        <h4>{monthName}</h4>
        <button onClick={() => setView({ y: view.m === 11 ? view.y + 1 : view.y, m: (view.m + 1) % 12 })}><Icon name="arrow" size={16} /></button>
      </div>
      <div className="cal-grid">
        {dows.map((d, i) => <span key={i} className="cal-dow">{d}</span>)}
        {days.map((d, i) => {
          if (!d) return <span key={i} className="cal-cell empty" />;
          const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
          const isPast = d < today;
          const isUnav = unavailable.has(`${view.y}-${view.m}-${d.getDate()}`);
          const isSel = selected === iso;
          const cls = "cal-cell" + (isSel ? " selected" : "") + (isPast || isUnav ? " disabled" : "");
          return (
            <button key={i} className={cls} disabled={isPast || isUnav} onClick={() => onSelect(iso)}>
              {d.getDate()}
            </button>);

        })}
      </div>
      <div className="cal-legend">
        <span className="lg"><i className="lg-dot avail" /> {t("Disponible", "Available")}</span>
        <span className="lg"><i className="lg-dot unav" /> {t("Réservé", "Booked")}</span>
        <span className="lg"><i className="lg-dot sel" /> {t("Votre choix", "Your choice")}</span>
      </div>
    </div>);

}

// ============ ABOUT ============
function AboutPage({ setPage }) {
  const t = window.useT();
  return (
    <main className="about-v2">
      <Breadcrumb setPage={setPage} trail={[
        { label: t("Accueil", "Home"), page: { name: "home" } },
        { label: t("À propos", "About") },
      ]} />

      {/* HERO */}
      <section className="ab-hero">
        <div className="ab-hero-text">
          <p className="eyebrow">{t("Notre maison", "Our house")}</p>
          <h1>{t(<>Le sur-mesure,<br />au rythme de la mer.</>, <>Bespoke service,<br />paced by the sea.</>)}</h1>
          <p className="lead">{t("South Boat est née sur les pontons de Mandelieu-la-Napoule. Nous sélectionnons à la main des bateaux familiaux entretenus avec soin, et accompagnons chacun de nos clients comme un proche.", "South Boat was born on the docks of Mandelieu-la-Napoule. We hand-pick family boats maintained with care, and treat every guest like a close friend.")}</p>
          <div className="ab-hero-cta">
            <button className="btn btn-primary" onClick={() => setPage({ name: "catalog" })}>{t("Découvrir la flotte", "Discover the fleet")}</button>
            <button className="btn btn-outline" onClick={() => setPage({ name: "contact" })}>{t("Nous rencontrer", "Meet us")}</button>
          </div>
        </div>
        <div className="ab-hero-art">
          <div className="ab-img main">
            <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1400&q=80" alt={t("Marina de Mandelieu-la-Napoule, port de départ South Boat sur la Côte d'Azur", "Marina of Mandelieu-la-Napoule, South Boat's departure port on the French Riviera")} fetchpriority="high" decoding="async" />
          </div>
          <div className="ab-img stack">
            <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80" alt={t("Bateau au mouillage dans une calanque de l'Estérel, location South Boat", "Boat anchored in an Esterel cove, South Boat rental")} loading="lazy" decoding="async" />
          </div>
          <div className="ab-badge">
            <strong>Mandelieu-la-Napoule</strong>
            <span>{t("Port de départ", "Departure port")}</span>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="ab-story">
        <div className="ab-story-head">
          <p className="eyebrow">{t("Notre histoire", "Our story")}</p>
          <h2>{t("Une amitié devenue aventure entrepreneuriale.", "A friendship that became an entrepreneurial adventure.")}</h2>
        </div>
        <div className="ab-timeline">
          <div className="ab-step">
            <span className="ab-year">01</span>
            <h3>{t("Une amitié, une passion commune", "A friendship, a shared passion")}</h3>
            <p>{t("Tout a commencé par une amitié et une passion partagée pour l'aventure, la mer et les découvertes.", "It all started with a friendship and a shared passion for adventure, the sea and discovery.")}</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">02</span>
            <h3>{t("Des années à explorer notre littoral", "Years spent exploring our coastline")}</h3>
            <p>{t("Pendant des années, nous avons parcouru les criques, les plages et les plus beaux coins de notre région, à la recherche de nouvelles aventures.", "For years, we sailed through coves, beaches and the most beautiful spots of our region, always looking for new adventures.")}</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">03</span>
            <h3>{t("Une idée qui s'impose naturellement", "An idea that came naturally")}</h3>
            <p>{t("Au fil de nos escapades, une évidence est née : partager cette passion et faire découvrir ces lieux exceptionnels au plus grand nombre.", "Along our escapades, it became obvious: share this passion and let others discover these exceptional places.")}</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">04</span>
            <h3>{t("Le lancement de notre aventure entrepreneuriale", "Launching our entrepreneurial adventure")}</h3>
            <p>{t("Portés par la confiance, l'amitié et l'envie d'entreprendre ensemble, nous avons créé notre société de location de bateaux.", "Driven by trust, friendship and the desire to build something together, we created our boat rental company.")}</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">05</span>
            <h3>{t("Aujourd'hui, bien plus que de la location", "Today, much more than rental")}</h3>
            <p>{t("Nous partageons notre expérience à travers un accompagnement personnalisé, des conseils, des services d'entretien et une exigence constante en matière de qualité, de confort et de sécurité.", "We share our experience through personalized support, advice, maintenance services and a constant focus on quality, comfort and safety.")}</p>
          </div>
        </div>
        <div className="ab-story-cta" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <button className="btn btn-primary" onClick={() => setPage({ name: "capsud-article", id: "cap-sur-histoire-south-boat" })}>
            {t("Cap sur notre histoire", "Set sail on our story")} <Icon name="arrow" size={16} />
          </button>
          <a href="https://www.instagram.com/south_boat_/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Icon name="instagram" size={16} /> {t("Suivez nos aventures sur Instagram", "Follow our adventures on Instagram")}
          </a>
        </div>

        <div className="ab-contact-quick" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--line)" }}>
          <span style={{ fontSize: 14, color: "var(--muted, #6b7280)", marginRight: 4 }}>{t("Nous joindre directement", "Reach us directly")} :</span>
          <a href="tel:+33634491621" className="btn btn-outline" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Icon name="phone" size={16} /> Maxime · 06 34 49 16 21
          </a>
          <a href="tel:+33786237848" className="btn btn-outline" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Icon name="phone" size={16} /> Vincent · 07 86 23 78 48
          </a>
        </div>
      </section>

      {/* PILLARS */}
      <section className="ab-pillars">
        <div className="ab-pillars-head">
          <p className="eyebrow">{t("Notre engagement", "Our commitment")}</p>
          <h2>{t("Trois principes, jamais négociés.", "Three principles, never compromised.")}</h2>
        </div>
        <div className="ab-pillars-grid">
          <article className="ab-pillar">
            <span className="ab-num">01</span>
            <h3>{t("L'humain avant tout", "People first")}</h3>
            <p>{t("Une relation fondée sur la confiance, l'écoute et l'accompagnement personnalisé. Chaque client doit être accueilli avec attention, conseillé avec sincérité et accompagné du premier contact jusqu'au retour au port. Nous croyons qu'une belle expérience commence avant même de monter à bord.", "A relationship built on trust, listening and personalized support. Every client is welcomed with care, advised honestly and accompanied from the first contact to the return to port. We believe a great experience starts before you even step on board.")}</p>
            <span className="ab-tag">{t("Confiance", "Trust")}</span>
          </article>
          <article className="ab-pillar">
            <span className="ab-num">02</span>
            <h3>{t("La sécurité et l'excellence sans compromis", "Safety and excellence, no compromise")}</h3>
            <p>{t("Des bateaux rigoureusement entretenus, des équipements vérifiés et une attention constante portée à la sécurité, au confort et à la qualité du service. La sérénité de nos clients repose sur des standards élevés que nous nous imposons chaque jour.", "Rigorously maintained boats, checked equipment and constant attention to safety, comfort and service quality. Our clients' peace of mind relies on the high standards we set ourselves every day.")}</p>
            <span className="ab-tag">{t("Exigence", "Standards")}</span>
          </article>
          <article className="ab-pillar">
            <span className="ab-num">03</span>
            <h3>{t("L'esprit d'aventure et de découverte", "The spirit of adventure and discovery")}</h3>
            <p>{t("La passion de la mer, des paysages et des expériences authentiques est au cœur de notre projet. Nous souhaitons partager cet amour du littoral, de la navigation et des découvertes qui rendent chaque sortie unique. L'aventure n'est pas une option, c'est la raison même de notre existence.", "Passion for the sea, the landscapes and authentic experiences is at the heart of our project. We want to share this love of the coast, navigation and discoveries that make every outing unique. Adventure isn't an option — it's the very reason we exist.")}</p>
            <span className="ab-tag">{t("Aventure", "Adventure")}</span>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <div className="ab-cta-inner">
          <div>
            <h2>{t("Une question, une envie de large ?", "A question, a longing for the open sea?")}</h2>
            <p>{t("Notre équipe vous répond du lundi au dimanche, de 8h à 19h. Conseil gratuit, sans engagement.", "Our team is available Monday to Sunday, 8am to 7pm. Free advice, no commitment.")}</p>
          </div>
          <div className="ab-cta-actions">
            <button className="btn btn-primary" onClick={() => setPage({ name: "catalog" })}>{t("Réserver un bateau", "Book a boat")}</button>
            <button className="btn btn-outline" onClick={() => setPage({ name: "contact" })}>{t("Parler à un conseiller", "Talk to an advisor")}</button>
          </div>
        </div>
      </section>

      <Footer />
    </main>);
}

// ============ CONTACT ============
function ContactPage({ setPage }) {
  const t = window.useT();
  const [sent, setSent] = useState(false);
  return (
    <main className="contact">
      <Breadcrumb setPage={setPage} trail={[
        { label: t("Accueil", "Home"), page: { name: "home" } },
        { label: t("Contact", "Contact") },
      ]} />
      <section className="contact-grid">
        <div className="contact-info">
          <p className="eyebrow">{t("Contact", "Contact")}</p>
          <h1>{t("Parlons de votre journée en mer.", "Let's plan your day at sea.")}</h1>
          <p className="lead">{t("Nous vous répondons du lundi au dimanche, de 8h à 19h.", "We reply Monday to Sunday, 8am to 7pm.")}</p>
          <ul className="contact-list">
            <li><Icon name="phone" /> <div><strong><a href="tel:+33634491621" style={{ color: "inherit", textDecoration: "none" }}>06 34 49 16 21</a></strong><span>{t("Maxime — nous appeler", "Maxime — call us")}</span></div></li>
            <li><Icon name="phone" /> <div><strong><a href="tel:+33786237848" style={{ color: "inherit", textDecoration: "none" }}>07 86 23 78 48</a></strong><span>{t("Vincent — nous appeler", "Vincent — call us")}</span></div></li>
            <li><Icon name="whatsapp" /> <div><strong><a href="https://wa.me/33634491621" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>{t("WhatsApp Maxime", "WhatsApp Maxime")}</a></strong><span>{t("Réponse rapide", "Quick reply")}</span></div></li>
            <li><Icon name="whatsapp" /> <div><strong><a href="https://wa.me/33786237848" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>{t("WhatsApp Vincent", "WhatsApp Vincent")}</a></strong><span>{t("Réponse rapide", "Quick reply")}</span></div></li>
            <li><Icon name="mail" /> <div><strong><a href="mailto:contact@south-boat.com" style={{ color: "inherit", textDecoration: "none" }}>contact@south-boat.com</a></strong><span>{t("Nous écrire", "Write to us")}</span></div></li>
            <li><Icon name="instagram" /> <div><strong><a href="https://www.instagram.com/south_boat_/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>@south_boat_</a></strong><span>{t("Nous suivre sur Instagram", "Follow us on Instagram")}</span></div></li>
          </ul>
        </div>
        <form className="contact-form" onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const name = form.querySelector('input[type="text"]').value;
          const email = form.querySelector('input[type="email"]').value;
          const subject = form.querySelector('select').value;
          const message = form.querySelector('textarea').value;
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
                message,
              }),
            });
            const data = await res.json();
            if (data.success) {
              setSent(true);
            } else {
              alert(t("Une erreur est survenue. Merci de réessayer ou de nous écrire à contact@south-boat.com",
                      "An error occurred. Please try again or email us at contact@south-boat.com"));
            }
          } catch (err) {
            alert(t("Une erreur est survenue. Merci de réessayer ou de nous écrire à contact@south-boat.com",
                    "An error occurred. Please try again or email us at contact@south-boat.com"));
          }
        }}>
          {sent ? <div className="sent">
              <div className="success-icon"><Icon name="check" size={28} /></div>
              <h3>{t("Merci pour votre message", "Thank you for your message")}</h3>
              <p>{t("Nous revenons vers vous très vite.", "We'll get back to you very soon.")}</p>
            </div> :

          <>
              <div className="form-grid">
                <label className="field"><span>{t("Nom", "Name")}</span><input type="text" required /></label>
                <label className="field"><span>{t("Email", "Email")}</span><input type="email" required /></label>
                <label className="field full"><span>{t("Sujet", "Subject")}</span>
                  <select>
                    <option>{t("Demande de réservation", "Booking request")}</option>
                    <option>{t("Question sur un bateau", "Question about a boat")}</option>
                    <option>{t("Privatisation / événement", "Private charter / event")}</option>
                    <option>{t("Autre", "Other")}</option>
                  </select>
                </label>
                <label className="field full"><span>{t("Message", "Message")}</span><textarea rows="5" required /></label>
              </div>
              <button className="btn btn-primary btn-block" type="submit">{t("Envoyer le message", "Send message")}</button>
            </>
          }
        </form>
      </section>
      <Footer />
    </main>);

}

// ============ CAP SUD — BLOG ============
const fmtArticleDate = (s, lang) => {
  if (!s) return "";
  const [y, m, day] = s.split("-").map(Number);
  const d = new Date(y, m - 1, day);
  return d.toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "long", year: "numeric" });
};

function CapSudListPage({ setPage }) {
  const t = window.useT();
  const articles = window.ARTICLES || [];
  const highlight = articles[0];
  const rest = articles.slice(1);

  return (
    <main className="capsud">
      <Breadcrumb setPage={setPage} trail={[
        { label: t("Accueil", "Home"), page: { name: "home" } },
        { label: "Cap Sud" },
      ]} />
      <section className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=2400&q=80" alt={t("Bateau au mouillage sur la Côte d'Azur — Cap Sud, le blog nautisme de South Boat", "Boat at anchor on the French Riviera — Cap Sud, South Boat's nautical blog")} />
          <div className="hero-overlay hero-overlay-grad" />
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="dot" /> {t("Carnet de bord · Saison 2026", "Logbook · 2026 season")}
          </div>
          <h1 className="hero-title">Cap Sud</h1>
          <p className="hero-sub">
            {t("Récits de mer, itinéraires et conseils de l'équipage South Boat — pour bien préparer vos sorties depuis Mandelieu.",
               "Sea stories, itineraries and tips from the South Boat crew — to help you plan your outings from Mandelieu.")}
          </p>
        </div>
      </section>

      {highlight && (
        <section className="section departure">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t("À la une", "Featured")}</p>
              <h2>{t("L'article du moment", "Article of the moment")}</h2>
            </div>
          </div>
          <div className="departure-card" onClick={() => setPage({ name: "capsud-article", id: highlight.id })} style={{ cursor: "pointer" }}>
            <div className="departure-map" style={{ minHeight: 320 }}>
              <img src={highlight.cover} alt={highlight.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div className="departure-text">
              <p className="eyebrow">{fmtArticleDate(highlight.date, t.lang)}</p>
              <h2>{highlight.title}</h2>
              <p className="lead">{highlight.excerpt}</p>
              <div className="departure-actions">
                <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); setPage({ name: "capsud-article", id: highlight.id }); }}>
                  {t("Lire l'article", "Read article")} <Icon name="arrow" size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t("Tous les articles", "All articles")}</p>
            <h2>{t("Le journal de l'équipage", "The crew's journal")}</h2>
          </div>
          <span className="muted">{rest.length} {t(rest.length > 1 ? "articles" : "article", rest.length > 1 ? "articles" : "article")}</span>
        </div>

        {rest.length === 0 ? (
          <div className="empty">
            <p>{articles.length === 0 ? t("Aucun article pour le moment. Revenez bientôt !", "No articles yet. Come back soon!") : t("Aucun autre article pour l'instant.", "No other articles for now.")}</p>
          </div>
        ) : (
          <div className="capsud-grid">
            {rest.map((a) => (
              <article key={a.id} className="capsud-card" onClick={() => setPage({ name: "capsud-article", id: a.id })}>
                <div className="capsud-card-img">
                  <img src={a.cover} alt={a.title} loading="lazy" decoding="async" />
                </div>
                <div className="capsud-card-body">
                  <span className="capsud-date">{fmtArticleDate(a.date, t.lang)}</span>
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                  <span className="capsud-cta">{t("Lire l'article", "Read article")} <Icon name="arrow" size={15} /></span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="section departure">
        <div
          className="departure-card"
          style={{ gridTemplateColumns: "1fr", background: "var(--navy)", border: "none", color: "white" }}
        >
          <div className="departure-text">
            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>{t("Lettre du large", "Sea newsletter")}</p>
            <h2 style={{ color: "white" }}>{t("Recevez Cap Sud dans votre boîte mail", "Get Cap Sud in your inbox")}</h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.85)" }}>
              {t("Un récit, un itinéraire et une astuce de skipper, une fois par mois. Pas de spam, juste de la mer.",
                 "One story, one itinerary and one skipper's tip, once a month. No spam — just the sea.")}
            </p>
            <form
              className="departure-actions"
              style={{ flexDirection: "row", gap: 10, flexWrap: "wrap", marginTop: 24 }}
              onSubmit={(e) => { e.preventDefault(); alert(t("Merci ! Vous êtes inscrit·e.", "Thank you! You're subscribed.")); }}
            >
              <input
                type="email"
                placeholder={t("votre@email.fr", "your@email.com")}
                required
                style={{ flex: "1 1 220px", padding: "13px 18px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "var(--radius)", fontSize: 14, background: "rgba(255,255,255,0.08)", color: "white" }}
              />
              <button className="btn" type="submit" style={{ background: "white", color: "var(--navy)" }}>{t("S'inscrire", "Subscribe")}</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function CapSudArticlePage({ id, setPage }) {
  const t = window.useT();
  const articles = window.ARTICLES || [];
  const article = articles.find((a) => a.id === id) || articles[0];

  // SEO : injection JSON-LD Article pour Google Discover / Top Stories
  React.useEffect(() => {
    if (!article) return;
    const ld = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "image": [article.cover],
      "datePublished": article.date,
      "dateModified": article.date,
      "author": { "@type": "Person", "name": article.author || "L'équipage South Boat" },
      "publisher": {
        "@type": "Organization",
        "name": "South Boat",
        "logo": { "@type": "ImageObject", "url": "https://south-boat.com/images/mochi/location-bateau-mandelieu-south-boat.jpg" }
      },
      "description": article.excerpt || "",
      "mainEntityOfPage": "https://south-boat.com/cap-sud/" + article.id
    };
    const tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.id = 'ld-article';
    tag.textContent = JSON.stringify(ld);
    const existing = document.getElementById('ld-article');
    if (existing) existing.remove();
    document.head.appendChild(tag);
    return () => { const e = document.getElementById('ld-article'); if (e) e.remove(); };
  }, [article]);

  if (!article) {
    return (
      <main className="capsud">
        <section className="section">
          <p>{t("Article introuvable.", "Article not found.")}</p>
          <button className="btn btn-ghost" onClick={() => setPage({ name: "capsud" })}>← {t("Retour aux articles", "Back to articles")}</button>
        </section>
        <Footer />
      </main>
    );
  }
  return (
    <main className="capsud-article">
      <Breadcrumb setPage={setPage} trail={[
        { label: t("Accueil", "Home"), page: { name: "home" } },
        { label: "Cap Sud", page: { name: "capsud" } },
        { label: article.title },
      ]} />
      <div className="detail-top">
        <button className="back" onClick={() => setPage({ name: "capsud" })}>
          <Icon name="arrowL" size={16} /> {t("Retour à Cap Sud", "Back to Cap Sud")}
        </button>
      </div>
      <article className="article-wrap">
        <header className="article-head">
          <p className="eyebrow">{t("Cap Sud · Carnet de bord", "Cap Sud · Logbook")}</p>
          <h1>{article.title}</h1>
          <p className="article-meta">
            <time dateTime={article.date}>{fmtArticleDate(article.date, t.lang)}</time>
            {article.author && <><span className="dot-sep">·</span><span>{article.author}</span></>}
          </p>
        </header>
        <div className="article-cover">
          <img src={article.cover} alt={`${article.title} — Cap Sud, ${t("blog nautisme South Boat", "South Boat nautical blog")}`} fetchpriority="high" decoding="async" />
        </div>
        <div className="article-body">
          {(article.content || []).map((p, i) => {
            if (p.startsWith("### ")) return <h3 key={i}>{p.slice(4)}</h3>;
            if (p.startsWith("## ")) return <h2 key={i}>{p.slice(3)}</h2>;
            if (p.startsWith("# ")) return <h2 key={i}>{p.slice(2)}</h2>;
            return <p key={i}>{p}</p>;
          })}
        </div>
        <div className="article-foot">
          <button className="btn btn-outline" onClick={() => setPage({ name: "capsud" })}>← {t("Tous les articles", "All articles")}</button>
          <button className="btn btn-primary" onClick={() => setPage({ name: "catalog" })} style={{ borderRadius: 20 }}>
            {t("Réserver un bateau", "Book a boat")} <Icon name="arrow" size={16} />
          </button>
        </div>
      </article>
      <Footer />
    </main>
  );
}

// ============ ITINERARY DETAIL ============
const ITINERARY_DETAILS = {
  "lerins": {
    hero: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    duration_fr: "Journée complète", duration_en: "Full day",
    distance_fr: "≈ 30 min de navigation depuis Mandelieu", distance_en: "≈ 30 min cruise from Mandelieu",
    intro_fr: "À une trentaine de minutes de navigation du Port de Mandelieu, au large de Cannes, les îles de Lérins forment l'une des plus belles escales de la Côte d'Azur. Deux îles, deux ambiances : la nature préservée de Sainte-Marguerite et le calme monastique de Saint-Honorat, séparées par un plan d'eau turquoise idéal pour le mouillage et la baignade.",
    intro_en: "About thirty minutes' cruise from Port de Mandelieu, off Cannes, the Lérins Islands are one of the finest stops on the French Riviera. Two islands, two moods: the unspoilt nature of Sainte-Marguerite and the monastic calm of Saint-Honorat, separated by turquoise water perfect for anchoring and swimming.",
    sections: [
      { h_fr: "Île Sainte-Marguerite", h_en: "Sainte-Marguerite Island", p_fr: "La plus grande des deux îles abrite le Fort Royal — où fut emprisonné le célèbre Masque de fer — et un réseau de sentiers ombragés sous les pins et les eucalyptus. Ses criques aux eaux translucides, comme la pointe du Dragon, sont parfaites pour une baignade au mouillage.", p_en: "The larger of the two islands is home to Fort Royal — where the famous Man in the Iron Mask was held — and a network of shaded trails beneath pines and eucalyptus. Its translucent coves, such as Pointe du Dragon, are perfect for a swim at anchor." },
      { h_fr: "Île Saint-Honorat", h_en: "Saint-Honorat Island", p_fr: "Propriété des moines cisterciens depuis des siècles, Saint-Honorat séduit par son atmosphère paisible, son monastère fortifié et son vignoble. On en fait le tour au mouillage, à l'écart de l'agitation, dans une eau d'un bleu profond.", p_en: "Owned by Cistercian monks for centuries, Saint-Honorat charms visitors with its peaceful atmosphere, fortified monastery and vineyard. You can cruise around it at anchor, away from the crowds, in deep blue water." },
      { h_fr: "Mouillage & baignade", h_en: "Anchoring & swimming", p_fr: "Le plateau du Milieu, entre les deux îles, offre des fonds clairs parfaits pour le snorkeling et le déjeuner à bord. Pensez à arriver tôt en été : c'est un spot prisé.", p_en: "The 'Plateau du Milieu' between the two islands offers clear shallows ideal for snorkeling and lunch on board. Arrive early in summer — it's a popular spot." },
    ],
  },
  "cap-antibes": {
    hero: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1600&q=80",
    duration_fr: "Journée complète", duration_en: "Full day",
    distance_fr: "≈ 45 min de navigation depuis Mandelieu", distance_en: "≈ 45 min cruise from Mandelieu",
    intro_fr: "Cap au sud-est vers la presqu'île du Cap d'Antibes, l'un des littoraux les plus prestigieux de la Côte d'Azur. Villas d'exception cachées dans la pinède, criques sauvages et eaux d'un bleu profond se découvrent bien mieux depuis la mer que depuis la terre.",
    intro_en: "Head south-east to the Cap d'Antibes peninsula, one of the most prestigious shorelines on the French Riviera. Exceptional villas hidden in the pines, wild coves and deep blue water are far better seen from the sea than from land.",
    sections: [
      { h_fr: "La baie de la Garoupe", h_en: "Garoupe Bay", p_fr: "Une grande baie abritée aux eaux claires, bordée d'une plage de sable réputée. Un mouillage de carte postale pour la baignade et la pause déjeuner.", p_en: "A large, sheltered bay with clear water, lined by a renowned sandy beach. A postcard anchorage for swimming and a lunch break." },
      { h_fr: "Villas & sentier du littoral", h_en: "Villas & coastal path", p_fr: "Depuis l'eau, on longe les demeures mythiques du Cap et le célèbre sentier de Tire-Poil qui serpente entre les rochers — une perspective réservée aux plaisanciers.", p_en: "From the water, you cruise past the Cap's legendary mansions and the famous Tire-Poil coastal path winding between the rocks — a view reserved for boaters." },
      { h_fr: "Criques sauvages", h_en: "Wild coves", p_fr: "La côte ouest du Cap cache de petites anses rocheuses, plus confidentielles, parfaites pour s'arrêter à l'écart de la foule et profiter du snorkeling.", p_en: "The Cap's western coast hides small, more secluded rocky inlets, perfect for stopping away from the crowds and enjoying some snorkeling." },
    ],
  },
  "esterel": {
    hero: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&q=80",
    duration_fr: "Demi-journée ou journée", duration_en: "Half day or full day",
    distance_fr: "≈ 15 min de navigation depuis Mandelieu", distance_en: "≈ 15 min cruise from Mandelieu",
    intro_fr: "C'est l'escale la plus proche de Mandelieu, et l'une des plus spectaculaires : le massif de l'Estérel plonge dans la mer ses roches rouges de porphyre, créant un contraste saisissant avec le bleu turquoise de la Méditerranée. Idéal pour une demi-journée comme pour une journée complète.",
    intro_en: "It's the closest stop to Mandelieu, and one of the most spectacular: the Estérel massif plunges its red porphyry rocks into the sea, creating a striking contrast with the turquoise Mediterranean. Perfect for a half day or a full day.",
    sections: [
      { h_fr: "Le Cap Roux", h_en: "Cap Roux", p_fr: "Sous la silhouette du pic du Cap Roux, plusieurs petites anses rocheuses aux eaux limpides sont idéales pour la baignade et le snorkeling, loin des plages bondées.", p_en: "Beneath the peak of Cap Roux, several small rocky inlets with crystal-clear water are ideal for swimming and snorkeling, far from the crowded beaches." },
      { h_fr: "Le Cap Dramont & l'Île d'Or", h_en: "Cap Dramont & Île d'Or", p_fr: "Au large du Dramont, le petit îlot rocheux de l'Île d'Or et sa tour intriguent. Un cadre remarquable pour une halte au mouillage, surtout hors période de forte affluence.", p_en: "Off Dramont, the small rocky islet of Île d'Or and its tower are intriguing. A remarkable setting for a stop at anchor, especially outside peak times." },
      { h_fr: "Calanques rouges & navigation responsable", h_en: "Red coves & responsible boating", p_fr: "Les calanques d'Anthéor et de Maubois dévoilent leurs roches flamboyantes. Certaines zones sont réglementées pour protéger les herbiers de posidonie : nous mouillons toujours dans le respect des fonds marins.", p_en: "The coves of Anthéor and Maubois reveal their flaming red rocks. Some areas are regulated to protect the posidonia seagrass: we always anchor with respect for the seabed." },
    ],
  },
};

function ItineraryPage({ id, setPage }) {
  const t = window.useT();
  const it = ITINERARIES.find((x) => x.id === id) || ITINERARIES[0];
  const detail = ITINERARY_DETAILS[it.id] || {};
  const sections = detail.sections || [];

  // SEO : JSON-LD TouristTrip (itinéraire touristique en bateau)
  useEffect(() => {
    const ld = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": itName(it, t) + " — itinéraire en bateau au départ de Mandelieu",
      "description": detail.intro_fr || itDesc(it, t),
      "image": detail.hero,
      "touristType": "Plaisance, baignade, snorkeling",
      "provider": { "@type": "Organization", "name": "South Boat", "url": "https://south-boat.com/" },
      "itinerary": {
        "@type": "ItemList",
        "itemListElement": sections.map((s, i) => ({
          "@type": "ListItem", "position": i + 1, "name": s.h_fr,
        })),
      },
    };
    const existing = document.getElementById("ld-trip");
    if (existing) existing.remove();
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = "ld-trip";
    tag.textContent = JSON.stringify(ld);
    document.head.appendChild(tag);
    return () => { const e = document.getElementById("ld-trip"); if (e) e.remove(); };
  }, [it.id]);

  return (
    <main className="capsud-article">
      <Breadcrumb setPage={setPage} trail={[
        { label: t("Accueil", "Home"), page: { name: "home" } },
        { label: t("Itinéraires", "Itineraries") },
        { label: itName(it, t) },
      ]} />

      <section style={{ maxWidth: 920, margin: "0 auto", padding: "20px 24px 48px" }}>
        <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 28, aspectRatio: "16/9", background: "#eef1f5" }}>
          {detail.hero && <img src={detail.hero} alt={t("Itinéraire en bateau " + itName(it, t) + " depuis Mandelieu sur la Côte d'Azur", "Boat itinerary " + itName(it, t) + " from Mandelieu on the French Riviera")} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
        </div>

        <p className="eyebrow">{t("Itinéraire en bateau", "Boat itinerary")}</p>
        <h1 style={{ marginTop: 6 }}>{itName(it, t)}</h1>

        {(detail.duration_fr || detail.distance_fr) && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "14px 0 0" }}>
            {detail.duration_fr && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ink-soft)", background: "var(--surface-2, #f4f8fb)", border: "1px solid var(--line)", borderRadius: 999, padding: "6px 12px" }}>
                <Icon name="cal" size={14} /> {t(detail.duration_fr, detail.duration_en)}
              </span>
            )}
            {detail.distance_fr && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ink-soft)", background: "var(--surface-2, #f4f8fb)", border: "1px solid var(--line)", borderRadius: 999, padding: "6px 12px" }}>
                <Icon name="pin" size={14} /> {t(detail.distance_fr, detail.distance_en)}
              </span>
            )}
          </div>
        )}

        <p className="lead" style={{ marginTop: 18 }}>{t(detail.intro_fr || itDesc(it, t), detail.intro_en || itDesc(it, t))}</p>

        <div className="article-body" style={{ marginTop: 8 }}>
          {sections.map((s, i) => (
            <React.Fragment key={i}>
              <h2>{t(s.h_fr, s.h_en)}</h2>
              <p>{t(s.p_fr, s.p_en)}</p>
            </React.Fragment>
          ))}
        </div>

        <div style={{ background: "var(--surface-2, #f4f8fb)", border: "1px solid var(--line)", borderLeft: "3px solid var(--accent, #3a8dde)", padding: "16px 18px", borderRadius: 8, margin: "28px 0", color: "var(--ink-soft)", fontSize: 14 }}>
          {t("Bon à savoir : l'itinéraire exact est adapté à la météo, à la mer et à vos envies. Avec un skipper, profitez pleinement du paysage ; sans skipper, un permis bateau est requis.", "Good to know: the exact route is adapted to the weather, the sea and your wishes. With a skipper, simply enjoy the scenery; without a skipper, a boating license is required.")}
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
          <button className="btn btn-primary" onClick={() => setPage({ name: "booking", id: 1 })} style={{ borderRadius: 20 }}>
            {t("Réserver cette sortie", "Book this trip")} <Icon name="arrow" size={16} />
          </button>
          <button className="btn btn-outline" onClick={() => setPage({ name: "catalog" })}>
            {t("Voir le bateau", "View the boat")}
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ============ FOOTER ============
function Footer() {
  const t = window.useT();
  const go = (name) => {
    if (window.__setPage) window.__setPage({ name });
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const linkStyle = { cursor: "pointer" };
  return (
    <footer className="foot">
      <div className="foot-inner">
        <div className="foot-brand">
          <div className="logo">
            <span className="logo-mark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l9-12 9 12M5 17h14l-2 4H7z" />
              </svg>
            </span>
            <span className="logo-text">South Boat<sup>°</sup></span>
          </div>
          <p>{t("La location de bateaux", "Boat rentals")}<br />{t("sur la Côte d'Azur.", "on the French Riviera.")}</p>
          <div className="foot-socials" style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <a href="https://www.instagram.com/south_boat_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram South Boat" style={{ color: "inherit", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 999, border: "1px solid var(--line)" }}>
              <Icon name="instagram" size={18} />
            </a>
          </div>
        </div>
        <div className="foot-cols">
          <div>
            <h5>{t("Naviguer", "Navigate")}</h5>
            <a style={linkStyle} onClick={() => go("catalog")}>{t("Catalogue", "Catalog")}</a>
            <a style={linkStyle} onClick={() => go("catalog")}>{t("Destinations", "Destinations")}</a>
            <a style={linkStyle} onClick={() => go("catalog")}>{t("Skippers", "Skippers")}</a>
          </div>
          <div>
            <h5>{t("Maison", "House")}</h5>
            <a style={linkStyle} onClick={() => go("about")}>{t("À propos", "About")}</a>
            <a style={linkStyle} onClick={() => go("contact")}>{t("Contact", "Contact")}</a>
            <a style={linkStyle} onClick={() => go("contact")}>{t("Presse", "Press")}</a>
          </div>
          <div>
            <h5>{t("Légal", "Legal")}</h5>
            <a style={linkStyle} onClick={() => go("contact")}>{t("CGV", "Terms")}</a>
            <a style={linkStyle} onClick={() => go("contact")}>{t("Mentions légales", "Legal notice")}</a>
            <a style={linkStyle} onClick={() => go("contact")}>{t("Confidentialité", "Privacy")}</a>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 South Boat — Mandelieu-la-Napoule, France</span>
        <span>{t("Belle journée en mer à vous", "Have a great day at sea")}</span>
      </div>
    </footer>);

}

Object.assign(window, {
  HomePage, BoatCard, CatalogPage, DetailPage, BookingPage, AboutPage, ContactPage,
  CapSudListPage, CapSudArticlePage, Footer, Calendar, fmtArticleDate
});