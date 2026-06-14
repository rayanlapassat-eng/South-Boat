/* global React, BOATS, PORTS, fmtPrice, Star, Icon */
const { useState, useEffect, useMemo, useRef } = React;

// ============ HOME ============
function HomePage({ setPage, query, setQuery }) {
  const t = window.useT();
  const featured = BOATS.slice(0, 3);
  const latestArticle = (window.ARTICLES && window.ARTICLES.length > 0) ? window.ARTICLES[0] : null;
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=2400&q=80" alt={t("Bateau en mer", "Boat at sea")} />
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
          <div><strong>1</strong><span>{t("Bateau disponible", "Boat available")}</span></div>
          <div><strong>Mandelieu</strong><span>{t("Port de départ", "Departure port")}</span></div>
          <div><strong>4,9<Star size={12} /></strong><span>{t("Note moyenne", "Average rating")}</span></div>
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
            <p>{t("Carburant inclus jusqu'à un certain seuil, annulation flexible, conciergerie disponible 7j/7.",
                  "Fuel included up to a certain threshold, flexible cancellation, concierge available 7 days a week.")}</p>
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
              <img src={latestArticle.cover} alt={latestArticle.title} />
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
            <h2>{t("Du port aux îles", "From port to islands")}</h2>
          </div>
        </div>
        <div className="dest-grid">
          {[
          { n: t("Îles de Lérins", "Lérins Islands"), img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", c: t("Baignade & déjeuner en mer", "Swimming & lunch at sea") },
          { n: "Cannes", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80", c: t("Baie & Croisette", "Bay & Croisette") },
          { n: "Estérel", img: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80", c: t("Calanques & roches rouges", "Coves & red rocks") }].
          map((d) =>
          <button key={d.n} className="dest-card" onClick={() => setPage({ name: "catalog" })}>
              <img src={d.img} alt={d.n} />
              <div className="dest-overlay" />
              <div className="dest-info">
                <h4>{d.n}</h4>
                <span>{d.c}</span>
              </div>
            </button>
          )}
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
        <img src={boat.images[0]} alt={boat.name} />
        <div className="boat-tag">{boat.type}</div>
      </div>
      <div className="boat-body">
        <div className="boat-row">
          <h3>{boat.name}</h3>
          <span className="rating"><Star size={13} /> {boat.rating.toFixed(1)} <span className="muted">({boat.reviews})</span></span>
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
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 2500,
    minCap: 1,
    sort: "rec"
  });
  const [showFilters, setShowFilters] = useState(true);

  const available = BOATS.filter((b) => !b.comingSoon);
  const teasers = BOATS.filter((b) => b.comingSoon);

  const filtered = useMemo(() => {
    let list = available.slice();
    list = list.filter((b) => b.price >= filters.minPrice && b.price <= filters.maxPrice && b.capacity >= filters.minCap);
    if (filters.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [filters]);

  return (
    <main className="catalog">
      <Breadcrumb setPage={setPage} trail={[
        { label: "Accueil", page: { name: "home" } },
        { label: "Catalogue" },
      ]} />

      <div className="catalog-body">
        <aside className={"filters" + (showFilters ? "" : " hidden")}>
          <div className="filters-head">
            <h3>Filtres</h3>
            <button className="link" onClick={() => setFilters({ minPrice: 0, maxPrice: 2500, minCap: 1, sort: "rec" })}>Réinitialiser</button>
          </div>

          <div className="filter-block">
            <h4>Prix par jour</h4>
            <div className="range-row">
              <span>{fmtPrice(filters.minPrice)}</span>
              <span>{fmtPrice(filters.maxPrice)}</span>
            </div>
            <input type="range" min="0" max="2500" step="50" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: +e.target.value })} />
          </div>

          <div className="filter-block">
            <h4>Capacité minimum</h4>
            <div className="stepper">
              <button onClick={() => setFilters({ ...filters, minCap: Math.max(1, filters.minCap - 1) })}><Icon name="minus" size={14} /></button>
              <span>{filters.minCap} personnes</span>
              <button onClick={() => setFilters({ ...filters, minCap: Math.min(8, filters.minCap + 1) })}><Icon name="plus" size={14} /></button>
            </div>
          </div>

          <div className="filter-block">
            <h4>Trier par</h4>
            <div className="radio-list">
              {[
              { id: "rec", label: "Recommandés" },
              { id: "price-asc", label: "Prix croissant" },
              { id: "price-desc", label: "Prix décroissant" },
              { id: "rating", label: "Mieux notés" }].
              map((s) =>
              <label key={s.id} className={"radio" + (filters.sort === s.id ? " active" : "")}>
                  <input type="radio" name="sort" checked={filters.sort === s.id} onChange={() => setFilters({ ...filters, sort: s.id })} />
                  <span>{s.label}</span>
                </label>
              )}
            </div>
          </div>
        </aside>

        <section className="catalog-results">
          <div className="catalog-head">
            <div>
              <h2>{filtered.length} bateau{filtered.length > 1 ? "x" : ""} disponible{filtered.length > 1 ? "s" : ""}</h2>
              <p className="muted">Port de Mandelieu · du {fmtDate(query.from)} au {fmtDate(query.to)}</p>
            </div>
            <button className="btn btn-ghost mobile-filters" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? "Masquer" : "Afficher"} les filtres
            </button>
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
                <p>Aucun bateau ne correspond à vos critères.</p>
                <button className="btn btn-ghost" onClick={() => setFilters({ minPrice: 0, maxPrice: 2500, minCap: 1, sort: "rec" })}>Réinitialiser</button>
              </div>
            }
          </div>
        </section>
      </div>
      <Footer />
    </main>);

}

const fmtDate = (s) => {
  if (!s) return "—";
  const d = new Date(s);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
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
          <img src={boat.images[0]} alt={boat.name} />
        </button>
        <div className="mosaic-side">
          {sideImgs.map((src, i) =>
            <button key={i} className="mosaic-cell" onClick={() => openLightbox(i + 1)}>
              <img src={src} alt="" />
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
          <img className="lightbox-img" src={boat.images[idx]} alt={boat.name} onClick={(e) => e.stopPropagation()} />
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
                <span className="rating"><Star size={14} /> {boat.rating.toFixed(1)} <span className="muted">· {boat.reviews} {t("avis", "reviews")}</span></span>
                <span className="dot-sep">·</span>
                <span>{boat.length}</span>
                <span className="dot-sep">·</span>
                <span>{boat.capacity} {t("personnes", "people")}</span>
                <span className="dot-sep">·</span>
                <span>{boat.year}</span>
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
              <div><Icon name="sparkle" /> {t("Carburant 1er plein", "First tank of fuel")}</div>
              <div><Icon name="wave" /> {t("Briefing de sécurité", "Safety briefing")}</div>
            </div>
          </div>

          <div className="detail-section">
            <h3>{t("Options à la carte", "Optional add-ons")}</h3>
            <div className="includes">
              <div><Icon name="sparkle" /> {t("Barbecue à bord", "Onboard barbecue")}</div>
              <div><Icon name="sparkle" /> {t("Plateau de gourmandises", "Gourmet platter")}</div>
              <div><Icon name="wave" /> {t("Bouée tractée", "Towed inflatable")}</div>
            </div>
          </div>
        </div>

        <aside className="booking-card" style={{ backgroundColor: "rgb(255, 255, 255)", borderRadius: "20px" }}>
          <div className="bk-price">
            <strong>{fmtPrice(boat.price)}</strong>
            <span> {t("/ jour", "/ day")}</span>
          </div>
          <div className="bk-rating">
            <Star size={13} /> {boat.rating.toFixed(1)} <span className="muted">· {boat.reviews} {t("avis", "reviews")}</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={() => setPage({ name: "booking", id: boat.id })} style={{ borderRadius: "20px" }}>
            {t("Réserver ce bateau", "Book this boat")}
          </button>
          <button className="btn btn-outline btn-block" onClick={() => setPage({ name: "contact" })} style={{ backgroundColor: "rgb(244, 248, 251)", borderRadius: "20px" }}>
            {t("Contacter un conseiller", "Contact an advisor")}
          </button>
          <ul className="bk-list">
            <li><Icon name="check" size={14} /> {t("Annulation gratuite jusqu'à 7 jours", "Free cancellation up to 7 days")}</li>
            <li><Icon name="check" size={14} /> {t("Paiement sécurisé", "Secure payment")}</li>
            <li><Icon name="check" size={14} /> {t("Conciergerie 7j/7", "Concierge 7 days a week")}</li>
          </ul>
        </aside>
      </section>
      <Footer />
    </main>);

}

// ============ BOOKING ============
const ITINERARIES = [
  { id: "lerins", name: "Îles de Lérins", desc: "Sainte-Marguerite, baignade et déjeuner en mer." },
  { id: "esterel", name: "Calanques de l'Estérel", desc: "Roches rouges, eaux turquoise, snorkeling." },
  { id: "saint-tropez", name: "Baie de Saint-Tropez & Pampelonne", desc: "Plages mythiques et villages perchés." },
  { id: "monaco", name: "Cap Ferrat & Monaco", desc: "Yachts, villas et Rocher monégasque." },
  { id: "porquerolles", name: "Îles d'Or — Porquerolles", desc: "Eaux cristallines et pinèdes protégées." },
];

const EMAIL_TEMPLATE = {
  subject: "Confirmation de votre réservation — South Boat",
  body: ({ firstName, boatName, dateLong, slot, adults, children, itinerary, total, deposit, refundPolicy }) => `
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

— CONDITIONS DE REMBOURSEMENT —
${refundPolicy}

À très bientôt sur les flots,
L'équipe South Boat
`,
  refundPolicy: "Annulation gratuite jusqu'à 7 jours avant le départ. Entre 7 et 3 jours : 50% retenu. Moins de 3 jours : non remboursable.",
};

function BookingPage({ id, setPage, initialDate }) {
  const boat = BOATS.find((b) => b.id === id) || BOATS[0];
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [data, setData] = useState({
    date: initialDate || "",
    slot: "day",
    extras: [],
    adults: 2,
    children: 0,
    crew: "with",
    itinerary: "",
    billing: { firstName: "", lastName: "", email: "", phone: "", address: "" },
    permitDifferent: false,
    permit: { firstName: "", lastName: "", email: "", phone: "", address: "", permitNumber: "" },
  });

  const extras = [
    { id: "lunch", label: "Plateau-repas chef (par pers.)", price: 65 },
    { id: "snorkel", label: "Pack snorkeling (4 pers.)", price: 80 },
    { id: "wake", label: "Wakeboard + ski nautique", price: 120 },
  ];

  const toggleExtra = (x) =>
    setData((d) => ({ ...d, extras: d.extras.includes(x) ? d.extras.filter((e) => e !== x) : [...d.extras, x] }));

  const { total, deposit, base, extrasCost, skipperCost } = useMemo(() => {
    const base = data.slot === "halfday" ? Math.round(boat.price * 0.6) : boat.price;
    const extrasCost = data.extras.reduce((sum, eId) => {
      const ex = extras.find((x) => x.id === eId);
      if (!ex) return sum;
      return sum + (ex.id === "lunch" ? ex.price * (data.adults + data.children) : ex.price);
    }, 0);
    const skipperCost = data.crew === "with" ? 280 : 0;
    const total = base + extrasCost + skipperCost;
    const deposit = Math.round(total * 0.3);
    return { total, deposit, base, extrasCost, skipperCost };
  }, [boat, data]);

  const steps = ["Créneau", "Options", "Récapitulatif", "Coordonnées", "Paiement", "Confirmation"];

  const validateStep = () => {
    setErrorMsg("");
    setFieldErrors({});
    if (step === 1) {
      if (!data.date) { setErrorMsg("Veuillez choisir une date."); return false; }
      if (!data.slot) { setErrorMsg("Veuillez choisir un créneau."); return false; }
    }
    if (step === 2) {
      if (data.adults < 1) { setErrorMsg("Au moins 1 adulte requis."); return false; }
      if (data.adults + data.children > boat.capacity) {
        setErrorMsg("Capacité maximale du bateau dépassée (" + boat.capacity + ").");
        return false;
      }
      if (data.crew === "with" && !data.itinerary) {
        setErrorMsg("Veuillez choisir un itinéraire.");
        return false;
      }
    }
    if (step === 4) {
      const errs = {};
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      ["firstName", "lastName", "email", "phone", "address"].forEach((k) => {
        if (!data.billing[k] || !String(data.billing[k]).trim()) errs["billing." + k] = "Champ requis";
      });
      if (data.billing.email && !emailRe.test(data.billing.email)) errs["billing.email"] = "Email invalide";
      if (data.permitDifferent) {
        ["firstName", "lastName", "email", "phone", "address", "permitNumber"].forEach((k) => {
          if (!data.permit[k] || !String(data.permit[k]).trim()) errs["permit." + k] = "Champ requis";
        });
        if (data.permit.email && !emailRe.test(data.permit.email)) errs["permit.email"] = "Email invalide";
      }
      if (Object.keys(errs).length) {
        setFieldErrors(errs);
        setErrorMsg("Veuillez compléter les champs requis.");
        const firstKey = Object.keys(errs)[0];
        setTimeout(() => {
          const el = document.querySelector('[data-fkey="' + firstKey + '"]');
          if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.focus && el.focus(); }
        }, 50);
        return false;
      }
    }
    return true;
  };

  const goNext = () => { if (validateStep()) { setStep((s) => Math.min(6, s + 1)); setErrorMsg(""); setFieldErrors({}); } };
  const goPrev = () => { setErrorMsg(""); setFieldErrors({}); setStep((s) => Math.max(1, s - 1)); };

  // Scroll back to top whenever we change step (fixes "Options" not scrolling up)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const setBilling = (k, v) => setData((d) => ({ ...d, billing: { ...d.billing, [k]: v } }));
  const setPermit = (k, v) => setData((d) => ({ ...d, permit: { ...d.permit, [k]: v } }));

  const selectedItinerary = ITINERARIES.find((i) => i.id === data.itinerary);

  const showSidebar = step < 5;

  // Boat picker if no id provided
  if (id === undefined || id === null) {
    return (
      <main className="booking">
        <section className="step-card">
          <h2>Choisissez votre bateau</h2>
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
        { label: "Accueil", page: { name: "home" } },
        { label: "Catalogue", page: { name: "catalog" } },
        { label: boat.name, page: { name: "detail", id: boat.id } },
        { label: "Réservation" },
      ]} />
      <div className="detail-top">
        <button className="back" onClick={() => setPage({ name: "detail", id: boat.id })}>
          <Icon name="arrowL" size={16} /> Retour à la fiche bateau
        </button>
      </div>

      <div className="booking-grid">
        <div className="booking-main">
          <div className="tunnel-stepper">
            {steps.map((s, i) => {
              const stepNum = i + 1;
              const canJump = stepNum < step && stepNum < 5; // can revisit prior, but not after payment
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

          {step === 1 && (
            <section className="step-card">
              <h2>Choisissez votre créneau</h2>
              <Calendar selected={data.date} onSelect={(d) => setData({ ...data, date: d })} />

              <h3 className="sub">Créneau</h3>
              <div className="seg two">
                <button
                  className={"seg-btn" + (data.slot === "day" ? " active" : "")}
                  onClick={() => setData({ ...data, slot: "day" })}>
                  <strong>Journée complète</strong>
                  <span>8h · {fmtPrice(boat.price)}</span>
                </button>
                <button
                  className={"seg-btn" + (data.slot === "halfday" ? " active" : "")}
                  onClick={() => setData({ ...data, slot: "halfday" })}>
                  <strong>Demi-journée</strong>
                  <span>4h · {fmtPrice(Math.round(boat.price * 0.6))}</span>
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="step-card">
              <h2>Options & participants</h2>

              <h3 className="sub">Options</h3>
              <div className="extras">
                {extras.map((x) => (
                  <label key={x.id} className={"extra" + (data.extras.includes(x.id) ? " active" : "")}>
                    <input type="checkbox" checked={data.extras.includes(x.id)} onChange={() => toggleExtra(x.id)} />
                    <span className="extra-check"><Icon name="check" size={12} /></span>
                    <span className="extra-label">{x.label}</span>
                    <span className="extra-price">+{x.price} €</span>
                  </label>
                ))}
              </div>

              <h3 className="sub">Participants</h3>
              <div className="participants-row">
                <div className="stepper">
                  <span className="stepper-label">Adultes</span>
                  <button onClick={() => setData({ ...data, adults: Math.max(1, data.adults - 1) })}><Icon name="minus" size={14} /></button>
                  <span>{data.adults}</span>
                  <button onClick={() => {
                    if (data.adults + data.children < boat.capacity) setData({ ...data, adults: data.adults + 1 });
                  }}><Icon name="plus" size={14} /></button>
                </div>
                <div className="stepper">
                  <span className="stepper-label">Enfants</span>
                  <button onClick={() => setData({ ...data, children: Math.max(0, data.children - 1) })}><Icon name="minus" size={14} /></button>
                  <span>{data.children}</span>
                  <button onClick={() => {
                    if (data.adults + data.children < boat.capacity) setData({ ...data, children: data.children + 1 });
                  }}><Icon name="plus" size={14} /></button>
                </div>
              </div>
              <div className="tunnel-info" style={{ background: "var(--accent-soft, #EAF4FB)", padding: "12px 14px", borderRadius: 10, margin: "12px 0", color: "#1a3a52" }}>
                👥 Les enfants sont sous la responsabilité des adultes. Capacité max du bateau : {boat.capacity} personnes.
              </div>

              <h3 className="sub">Skipper</h3>
              <div className="seg two">
                <button className={"seg-btn" + (data.crew === "with" ? " active" : "")} onClick={() => setData({ ...data, crew: "with" })}>
                  <strong>Avec skipper</strong>
                  <span>+280 € / jour</span>
                </button>
                <button className={"seg-btn" + (data.crew === "without" ? " active" : "")} onClick={() => setData({ ...data, crew: "without", itinerary: "" })}>
                  <strong>Sans skipper</strong>
                  <span>Permis bateau requis</span>
                </button>
              </div>

              {data.crew === "with" && (
                <>
                  <h3 className="sub">Itinéraire</h3>
                  <div className="itinerary-list">
                    {ITINERARIES.map((it) => (
                      <label key={it.id} className={"itinerary-item" + (data.itinerary === it.id ? " active" : "")}>
                        <input
                          type="radio"
                          name="itinerary"
                          checked={data.itinerary === it.id}
                          onChange={() => setData({ ...data, itinerary: it.id })}
                        />
                        <div>
                          <strong>{it.name}</strong>
                          <span className="muted" style={{ display: "block", fontSize: 13 }}>{it.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {data.crew === "without" && (
                <div className="tunnel-warn" style={{ background: "#FEE", border: "1px solid #F88", color: "#8a1f1f", padding: "12px 14px", borderRadius: 10, marginTop: 12 }}>
                  ⚠️ Un permis bateau valable est obligatoire. La seule personne habilitée à conduire le bateau sera le titulaire du permis.
                </div>
              )}
            </section>
          )}

          {step === 3 && (
            <section className="step-card">
              <h2>Récapitulatif</h2>
              <div className="recap">
                <div className="recap-row" style={{ alignItems: "center" }}>
                  <span>Bateau</span>
                  <strong style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={boat.images[0]} alt={boat.name} style={{ width: 56, height: 40, objectFit: "cover", borderRadius: 6 }} />
                    {boat.name} <span className="muted" style={{ fontWeight: 400 }}>· {boat.port}</span>
                  </strong>
                </div>
                <div className="recap-row"><span>Date</span><strong>{data.date ? fmtLong(data.date) : "—"}</strong></div>
                <div className="recap-row"><span>Créneau</span><strong>{labelSlot(data.slot)}</strong></div>
                <div className="recap-row"><span>Adultes / Enfants</span><strong>{data.adults} adulte(s){data.children ? " · " + data.children + " enfant(s)" : ""}</strong></div>
                {data.crew === "with" && selectedItinerary && (
                  <div className="recap-row"><span>Itinéraire</span><strong>{selectedItinerary.name}</strong></div>
                )}
                <div className="recap-row"><span>Skipper</span><strong>{data.crew === "with" ? "Inclus (+280 €)" : "Sans skipper"}</strong></div>
                <div className="recap-row"><span>Tarif base</span><strong>{fmtPrice(base)}</strong></div>
                {data.extras.map((eId) => {
                  const ex = extras.find((x) => x.id === eId);
                  if (!ex) return null;
                  const cost = ex.id === "lunch" ? ex.price * (data.adults + data.children) : ex.price;
                  return (
                    <div className="recap-row" key={eId}>
                      <span>{ex.label}</span>
                      <strong>+{fmtPrice(cost)}</strong>
                    </div>
                  );
                })}
                {skipperCost > 0 && (
                  <div className="recap-row"><span>Skipper</span><strong>+{fmtPrice(skipperCost)}</strong></div>
                )}
                <div className="recap-row total"><span>Total</span><strong>{fmtPrice(total)}</strong></div>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="step-card">
              <h2>Vos coordonnées</h2>
              <h3 className="sub">Personne qui réserve (facturation)</h3>
              <div className="form-grid">
                <label className="field">
                  <span>Prénom</span>
                  <input data-fkey="billing.firstName" type="text" value={data.billing.firstName} onChange={(e) => setBilling("firstName", e.target.value)} />
                  {fieldErrors["billing.firstName"] && <small style={{ color: "#c00" }}>{fieldErrors["billing.firstName"]}</small>}
                </label>
                <label className="field">
                  <span>Nom</span>
                  <input data-fkey="billing.lastName" type="text" value={data.billing.lastName} onChange={(e) => setBilling("lastName", e.target.value)} />
                  {fieldErrors["billing.lastName"] && <small style={{ color: "#c00" }}>{fieldErrors["billing.lastName"]}</small>}
                </label>
                <label className="field">
                  <span>Email</span>
                  <input data-fkey="billing.email" type="email" value={data.billing.email} onChange={(e) => setBilling("email", e.target.value)} />
                  {fieldErrors["billing.email"] && <small style={{ color: "#c00" }}>{fieldErrors["billing.email"]}</small>}
                </label>
                <label className="field">
                  <span>Téléphone</span>
                  <input data-fkey="billing.phone" type="tel" value={data.billing.phone} onChange={(e) => setBilling("phone", e.target.value)} />
                  {fieldErrors["billing.phone"] && <small style={{ color: "#c00" }}>{fieldErrors["billing.phone"]}</small>}
                </label>
                <label className="field full">
                  <span>Adresse</span>
                  <input data-fkey="billing.address" type="text" value={data.billing.address} onChange={(e) => setBilling("address", e.target.value)} />
                  {fieldErrors["billing.address"] && <small style={{ color: "#c00" }}>{fieldErrors["billing.address"]}</small>}
                </label>
              </div>

              <label className="field" style={{ marginTop: 16, flexDirection: "row", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={data.permitDifferent} onChange={(e) => setData({ ...data, permitDifferent: e.target.checked })} />
                <span>Le titulaire du permis est une autre personne</span>
              </label>

              {data.permitDifferent && (
                <>
                  <h3 className="sub">Titulaire du permis bateau</h3>
                  <div className="form-grid">
                    <label className="field">
                      <span>Prénom</span>
                      <input data-fkey="permit.firstName" type="text" value={data.permit.firstName} onChange={(e) => setPermit("firstName", e.target.value)} />
                      {fieldErrors["permit.firstName"] && <small style={{ color: "#c00" }}>{fieldErrors["permit.firstName"]}</small>}
                    </label>
                    <label className="field">
                      <span>Nom</span>
                      <input data-fkey="permit.lastName" type="text" value={data.permit.lastName} onChange={(e) => setPermit("lastName", e.target.value)} />
                      {fieldErrors["permit.lastName"] && <small style={{ color: "#c00" }}>{fieldErrors["permit.lastName"]}</small>}
                    </label>
                    <label className="field">
                      <span>Email</span>
                      <input data-fkey="permit.email" type="email" value={data.permit.email} onChange={(e) => setPermit("email", e.target.value)} />
                      {fieldErrors["permit.email"] && <small style={{ color: "#c00" }}>{fieldErrors["permit.email"]}</small>}
                    </label>
                    <label className="field">
                      <span>Téléphone</span>
                      <input data-fkey="permit.phone" type="tel" value={data.permit.phone} onChange={(e) => setPermit("phone", e.target.value)} />
                      {fieldErrors["permit.phone"] && <small style={{ color: "#c00" }}>{fieldErrors["permit.phone"]}</small>}
                    </label>
                    <label className="field full">
                      <span>Adresse</span>
                      <input data-fkey="permit.address" type="text" value={data.permit.address} onChange={(e) => setPermit("address", e.target.value)} />
                      {fieldErrors["permit.address"] && <small style={{ color: "#c00" }}>{fieldErrors["permit.address"]}</small>}
                    </label>
                    <label className="field full">
                      <span>Numéro de permis bateau</span>
                      <input data-fkey="permit.permitNumber" type="text" value={data.permit.permitNumber} onChange={(e) => setPermit("permitNumber", e.target.value)} />
                      {fieldErrors["permit.permitNumber"] && <small style={{ color: "#c00" }}>{fieldErrors["permit.permitNumber"]}</small>}
                    </label>
                  </div>
                </>
              )}
            </section>
          )}

          {step === 5 && (
            <section className="step-card">
              <h2>Paiement</h2>
              <p className="lead">Réglez l'acompte et préautorisez la caution pour finaliser votre réservation.</p>
              <div className="pay-cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                <div className="pay-card" style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 18 }}>
                  <h3>Acompte (30%)</h3>
                  <p style={{ fontSize: 28, fontWeight: 700, margin: "8px 0" }}>{fmtPrice(deposit)}</p>
                  <a href="#PAYMENT_LINK_ACOMPTE" className="btn btn-primary btn-block">Payer l'acompte</a>
                  <p className="muted" style={{ fontSize: 12, marginTop: 8 }}>Lien de paiement — à configurer</p>
                </div>
                <div className="pay-card" style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 18 }}>
                  <h3>Caution (préautorisation)</h3>
                  <p style={{ fontSize: 28, fontWeight: 700, margin: "8px 0" }}>Empreinte CB</p>
                  <a href="#PAYMENT_LINK_CAUTION" className="btn btn-outline btn-block">Préautoriser la caution</a>
                  <p className="muted" style={{ fontSize: 12, marginTop: 8 }}>Lien de paiement — à configurer</p>
                </div>
              </div>
              <button className="btn btn-primary btn-block" style={{ marginTop: 20 }} onClick={() => setStep(6)}>
                J'ai effectué les deux paiements
              </button>
            </section>
          )}

          {step === 6 && (
            <section className="step-card success">
              <div className="success-icon"><Icon name="check" size={28} /></div>
              <h2>Réservation confirmée</h2>
              <p className="lead">Un email de confirmation a été envoyé à <strong>{data.billing.email || "votre adresse"}</strong>.</p>
              <div className="recap">
                <div className="recap-row"><span>Bateau</span><strong>{boat.name}</strong></div>
                <div className="recap-row"><span>Date</span><strong>{data.date ? fmtLong(data.date) : "—"}</strong></div>
                <div className="recap-row"><span>Créneau</span><strong>{labelSlot(data.slot)}</strong></div>
                <div className="recap-row"><span>Participants</span><strong>{data.adults} adulte(s){data.children ? " · " + data.children + " enfant(s)" : ""}</strong></div>
                {selectedItinerary && <div className="recap-row"><span>Itinéraire</span><strong>{selectedItinerary.name}</strong></div>}
                <div className="recap-row"><span>Acompte payé</span><strong>{fmtPrice(deposit)}</strong></div>
                <div className="recap-row total"><span>Total</span><strong>{fmtPrice(total)}</strong></div>
              </div>

              <details className="email-preview" style={{ marginTop: 18, border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
                <summary style={{ cursor: "pointer", fontWeight: 600 }}>Aperçu du mail de confirmation</summary>
                <p style={{ marginTop: 10 }}><strong>Objet :</strong> {EMAIL_TEMPLATE.subject}</p>
                <pre style={{ whiteSpace: "pre-wrap", fontFamily: "ui-monospace, monospace", fontSize: 13, background: "#f8fafc", padding: 12, borderRadius: 8 }}>
{EMAIL_TEMPLATE.body({
  firstName: data.billing.firstName || "—",
  boatName: boat.name,
  dateLong: data.date ? fmtLong(data.date) : "—",
  slot: labelSlot(data.slot),
  adults: data.adults,
  children: data.children,
  itinerary: selectedItinerary ? selectedItinerary.name : "",
  total: fmtPrice(total),
  deposit: fmtPrice(deposit),
  refundPolicy: EMAIL_TEMPLATE.refundPolicy,
})}
                </pre>
              </details>

              <button className="btn btn-primary btn-block" style={{ marginTop: 18 }} onClick={() => setPage({ name: "home" })}>Retour à l'accueil</button>
            </section>
          )}

          {step < 6 && (
            <div className="step-actions" style={{ flexDirection: "column", alignItems: "stretch", gap: 8 }}>
              <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
                <button className="btn btn-outline" onClick={goPrev} disabled={step === 1}>Précédent</button>
                <button className="btn btn-primary" onClick={goNext}>
                  {step === 3 ? "Réserver" : step === 4 ? "Aller au paiement" : "Continuer"} <Icon name="arrow" size={16} />
                </button>
              </div>
              {errorMsg && <p style={{ color: "#c00", margin: 0, textAlign: "right" }}>{errorMsg}</p>}
            </div>
          )}
        </div>

        {showSidebar && (
          <aside className="booking-summary">
            <img src={boat.images[0]} alt={boat.name} className="bs-img" />
            <h3>{boat.name}</h3>
            <p className="muted">{boat.type} · {boat.port}</p>
            <div className="bs-line">
              <span>Date</span>
              <strong>{data.date ? fmtLong(data.date) : "—"}</strong>
            </div>
            <div className="bs-line">
              <span>Créneau</span>
              <strong>{labelSlot(data.slot)}</strong>
            </div>
            <div className="bs-line">
              <span>Adultes / Enfants</span>
              <strong>{data.adults} / {data.children}</strong>
            </div>
            {data.crew === "with" && selectedItinerary && (
              <div className="bs-line">
                <span>Itinéraire</span>
                <strong>{selectedItinerary.name}</strong>
              </div>
            )}
            {data.extras.length > 0 && (
              <div className="bs-line">
                <span>Options</span>
                <strong>{data.extras.length}</strong>
              </div>
            )}
            <div className="bs-divider" />
            <div className="bs-total">
              <span>Total estimé</span>
              <strong>{fmtPrice(total)}</strong>
            </div>
            <p className="bs-note">Annulation gratuite jusqu'à 7 jours avant le départ.</p>
          </aside>
        )}
      </div>
      <Footer />
    </main>
  );
}

const fmtLong = (s) => {
  const d = new Date(s);
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};
const labelSlot = (s) => ({ day: "Journée complète", halfday: "Demi-journée" })[s] || "—";

// ============ CALENDAR ============
function Calendar({ selected, onSelect }) {
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

  const monthName = first.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

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
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => <span key={i} className="cal-dow">{d}</span>)}
        {days.map((d, i) => {
          if (!d) return <span key={i} className="cal-cell empty" />;
          const iso = d.toISOString().slice(0, 10);
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
        <span className="lg"><i className="lg-dot avail" /> Disponible</span>
        <span className="lg"><i className="lg-dot unav" /> Réservé</span>
        <span className="lg"><i className="lg-dot sel" /> Votre choix</span>
      </div>
    </div>);

}

// ============ ABOUT ============
function AboutPage({ setPage }) {
  return (
    <main className="about-v2">
      <Breadcrumb setPage={setPage} trail={[
        { label: "Accueil", page: { name: "home" } },
        { label: "À propos" },
      ]} />

      {/* HERO */}
      <section className="ab-hero">
        <div className="ab-hero-text">
          <p className="eyebrow">Notre maison</p>
          <h1>Le sur-mesure,<br />au rythme de la mer.</h1>
          <p className="lead">South Boat est née sur les pontons de Mandelieu-la-Napoule. Nous sélectionnons à la main des bateaux familiaux entretenus avec soin, et accompagnons chacun de nos clients comme un proche.</p>
          <div className="ab-hero-cta">
            <button className="btn btn-primary" onClick={() => setPage({ name: "catalog" })}>Découvrir la flotte</button>
            <button className="btn btn-outline" onClick={() => setPage({ name: "contact" })}>Nous rencontrer</button>
          </div>
        </div>
        <div className="ab-hero-art">
          <div className="ab-img main">
            <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1400&q=80" alt="Marina de Mandelieu" />
          </div>
          <div className="ab-img stack">
            <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80" alt="Bateau au mouillage" />
          </div>
          <div className="ab-badge">
            <strong>Depuis 2018</strong>
            <span>Mandelieu-la-Napoule</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="ab-stats">
        <div className="ab-stat"><strong>+12 000</strong><span>Journées en mer organisées</span></div>
        <div className="ab-stat"><strong>1</strong><span>Bateau au catalogue</span></div>
        <div className="ab-stat"><strong>4,9 / 5</strong><span>Note moyenne des clients</span></div>
        <div className="ab-stat"><strong>Mandelieu</strong><span>Port de départ</span></div>
      </section>

      {/* STORY */}
      <section className="ab-story">
        <div className="ab-story-head">
          <p className="eyebrow">Notre histoire</p>
          <h2>Huit ans sur la même ligne d'horizon.</h2>
        </div>
        <div className="ab-timeline">
          <div className="ab-step">
            <span className="ab-year">2018</span>
            <h3>Les débuts</h3>
            <p>Marine quitte la Marine Marchande et lance South Boat avec un seul bateau, un Cap Camarat 6.5, amarré à Mandelieu.</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">2020</span>
            <h3>L'équipage s'étoffe</h3>
            <p>Trois skippers rejoignent l'aventure. La flotte grandit, mais la promesse reste la même : un seul interlocuteur, une attention sur-mesure.</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">2023</span>
            <h3>Cap sur l'Azur</h3>
            <p>Ouverture des bases de Cannes, Antibes et Nice. South Boat couvre désormais l'ensemble de la côte, du Cap Roux à Monaco.</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">2026</span>
            <h3>Aujourd'hui</h3>
            <p>Mochi, notre bateau familial au départ de Mandelieu, et la même obsession qu'au premier jour : que chaque sortie soit un souvenir précieux.</p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="ab-pillars">
        <div className="ab-pillars-head">
          <p className="eyebrow">Notre engagement</p>
          <h2>Trois principes, jamais négociés.</h2>
        </div>
        <div className="ab-pillars-grid">
          <article className="ab-pillar">
            <span className="ab-num">01</span>
            <h3>Une flotte choisie</h3>
            <p>Pas de catalogue infini. Un bateau soigneusement sélectionné, inspecté et adopté par notre équipe avant d'être proposé.</p>
            <span className="ab-tag">Sélection</span>
          </article>
          <article className="ab-pillar">
            <span className="ab-num">02</span>
            <h3>Un seul interlocuteur</h3>
            <p>De la première question au retour au port, vous échangez avec un conseiller dédié qui connaît chaque bateau de la flotte.</p>
            <span className="ab-tag">Accompagnement</span>
          </article>
          <article className="ab-pillar">
            <span className="ab-num">03</span>
            <h3>Le respect du large</h3>
            <p>Nos skippers privilégient les mouillages écologiques. Nous reversons 1% de notre chiffre à la protection des fonds marins.</p>
            <span className="ab-tag">Engagement</span>
          </article>
        </div>
      </section>

      {/* TEAM */}
      <section className="ab-team">
        <div className="ab-team-head">
          <p className="eyebrow">L'équipage</p>
          <h2>Les visages derrière chaque sortie.</h2>
        </div>
        <div className="ab-team-grid">
          <article className="ab-member">
            <div className="ab-portrait"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80" alt="Marine Caron" /></div>
            <h4>Marine Caron</h4>
            <span>Fondatrice &amp; capitaine</span>
            <p>Vingt ans en mer, dont huit à South Boat. Marine connaît chaque amer de la côte par son prénom.</p>
          </article>
          <article className="ab-member">
            <div className="ab-portrait"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80" alt="Théo Vidal" /></div>
            <h4>Théo Vidal</h4>
            <span>Skipper en chef</span>
            <p>Brevet 200 UMS, formé à La Rochelle. Théo a une passion : les couchers de soleil au large de l'Estérel.</p>
          </article>
          <article className="ab-member">
            <div className="ab-portrait"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80" alt="Léa Bertrand" /></div>
            <h4>Léa Bertrand</h4>
            <span>Conciergerie &amp; relations clients</span>
            <p>Le sourire au bout du fil, sept jours sur sept. Léa orchestre vos sorties dans le moindre détail.</p>
          </article>
        </div>
      </section>

      {/* QUOTE */}
      <section className="ab-quote">
        <div className="ab-quote-inner">
          <span className="ab-quote-mark">&ldquo;</span>
          <blockquote>
            <p>La meilleure journée en mer est celle dont on ne se souvient que de l'horizon.</p>
            <footer>
              <strong>Marine Caron</strong>
              <span>Fondatrice</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <div className="ab-cta-inner">
          <div>
            <h2>Une question, une envie de large ?</h2>
            <p>Notre équipe vous répond du lundi au dimanche, de 8h à 21h. Conseil gratuit, sans engagement.</p>
          </div>
          <div className="ab-cta-actions">
            <button className="btn btn-primary" onClick={() => setPage({ name: "catalog" })}>Réserver un bateau</button>
            <button className="btn btn-outline" onClick={() => setPage({ name: "contact" })}>Parler à un conseiller</button>
          </div>
        </div>
      </section>

      <Footer />
    </main>);
}

// ============ CONTACT ============
function ContactPage({ setPage }) {
  const [sent, setSent] = useState(false);
  return (
    <main className="contact">
      <Breadcrumb setPage={setPage} trail={[
        { label: "Accueil", page: { name: "home" } },
        { label: "Contact" },
      ]} />
      <section className="contact-grid">
        <div className="contact-info">
          <p className="eyebrow">Contact</p>
          <h1>Parlons de votre journée en mer.</h1>
          <p className="lead">Notre conciergerie vous répond du lundi au dimanche, de 8h à 19h.</p>
          <ul className="contact-list">
            <li><Icon name="phone" /> <div><strong>+33 4 93 00 00 00</strong><span>Conciergerie 7j/7</span></div></li>
          </ul>
        </div>
        <form className="contact-form" onSubmit={(e) => {e.preventDefault();setSent(true);}}>
          {sent ? <div className="sent">
              <div className="success-icon"><Icon name="check" size={28} /></div>
              <h3>Merci pour votre message</h3>
              <p>Nous revenons vers vous très vite.</p>
            </div> :

          <>
              <div className="form-grid">
                <label className="field"><span>Nom</span><input type="text" required /></label>
                <label className="field"><span>Email</span><input type="email" required /></label>
                <label className="field full"><span>Sujet</span>
                  <select>
                    <option>Demande de réservation</option>
                    <option>Question sur un bateau</option>
                    <option>Privatisation / événement</option>
                    <option>Autre</option>
                  </select>
                </label>
                <label className="field full"><span>Message</span><textarea rows="5" required /></label>
              </div>
              <button className="btn btn-primary btn-block" type="submit">Envoyer le message</button>
            </>
          }
        </form>
      </section>
      <Footer />
    </main>);

}

// ============ CAP SUD — BLOG ============
const fmtArticleDate = (s) => {
  if (!s) return "";
  const d = new Date(s);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
};

function CapSudListPage({ setPage }) {
  const articles = window.ARTICLES || [];
  const highlight = articles[0];
  const rest = articles.slice(1);

  return (
    <main className="capsud">
      <Breadcrumb setPage={setPage} trail={[
        { label: "Accueil", page: { name: "home" } },
        { label: "Cap Sud" },
      ]} />
      <section className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=2400&q=80" alt="Bateau en mer" />
          <div className="hero-overlay hero-overlay-grad" />
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="dot" /> Carnet de bord · Saison 2026
          </div>
          <h1 className="hero-title">Cap Sud</h1>
          <p className="hero-sub">
            Récits de mer, itinéraires et conseils de l'équipage South Boat — pour bien préparer vos sorties depuis Mandelieu.
          </p>
        </div>
      </section>

      {highlight && (
        <section className="section departure">
          <div className="section-head">
            <div>
              <p className="eyebrow">À la une</p>
              <h2>L'article du moment</h2>
            </div>
          </div>
          <div className="departure-card" onClick={() => setPage({ name: "capsud-article", id: highlight.id })} style={{ cursor: "pointer" }}>
            <div className="departure-map" style={{ minHeight: 320 }}>
              <img src={highlight.cover} alt={highlight.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div className="departure-text">
              <p className="eyebrow">{fmtArticleDate(highlight.date)}</p>
              <h2>{highlight.title}</h2>
              <p className="lead">{highlight.excerpt}</p>
              <div className="departure-actions">
                <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); setPage({ name: "capsud-article", id: highlight.id }); }}>
                  Lire l'article <Icon name="arrow" size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Tous les articles</p>
            <h2>Le journal de l'équipage</h2>
          </div>
          <span className="muted">{rest.length} article{rest.length > 1 ? "s" : ""}</span>
        </div>

        {rest.length === 0 ? (
          <div className="empty">
            <p>{articles.length === 0 ? "Aucun article pour le moment. Revenez bientôt !" : "Aucun autre article pour l'instant."}</p>
          </div>
        ) : (
          <div className="capsud-grid">
            {rest.map((a) => (
              <article key={a.id} className="capsud-card" onClick={() => setPage({ name: "capsud-article", id: a.id })}>
                <div className="capsud-card-img">
                  <img src={a.cover} alt={a.title} />
                </div>
                <div className="capsud-card-body">
                  <span className="capsud-date">{fmtArticleDate(a.date)}</span>
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                  <span className="capsud-cta">Lire l'article <Icon name="arrow" size={15} /></span>
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
            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>Lettre du large</p>
            <h2 style={{ color: "white" }}>Recevez Cap Sud dans votre boîte mail</h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.85)" }}>
              Un récit, un itinéraire et une astuce de skipper, une fois par mois. Pas de spam, juste de la mer.
            </p>
            <form
              className="departure-actions"
              style={{ flexDirection: "row", gap: 10, flexWrap: "wrap", marginTop: 24 }}
              onSubmit={(e) => { e.preventDefault(); alert("Merci ! Vous êtes inscrit·e."); }}
            >
              <input
                type="email"
                placeholder="votre@email.fr"
                required
                style={{ flex: "1 1 220px", padding: "13px 18px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "var(--radius)", fontSize: 14, background: "rgba(255,255,255,0.08)", color: "white" }}
              />
              <button className="btn" type="submit" style={{ background: "white", color: "var(--navy)" }}>S'inscrire</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function CapSudArticlePage({ id, setPage }) {
  const articles = window.ARTICLES || [];
  const article = articles.find((a) => a.id === id) || articles[0];
  if (!article) {
    return (
      <main className="capsud">
        <section className="section">
          <p>Article introuvable.</p>
          <button className="btn btn-ghost" onClick={() => setPage({ name: "capsud" })}>← Retour aux articles</button>
        </section>
        <Footer />
      </main>
    );
  }
  return (
    <main className="capsud-article">
      <Breadcrumb setPage={setPage} trail={[
        { label: "Accueil", page: { name: "home" } },
        { label: "Cap Sud", page: { name: "capsud" } },
        { label: article.title },
      ]} />
      <div className="detail-top">
        <button className="back" onClick={() => setPage({ name: "capsud" })}>
          <Icon name="arrowL" size={16} /> Retour à Cap Sud
        </button>
      </div>
      <article className="article-wrap">
        <header className="article-head">
          <p className="eyebrow">Cap Sud · Carnet de bord</p>
          <h1>{article.title}</h1>
          <p className="article-meta">
            <span>{fmtArticleDate(article.date)}</span>
            {article.author && <><span className="dot-sep">·</span><span>{article.author}</span></>}
          </p>
        </header>
        <div className="article-cover">
          <img src={article.cover} alt={article.title} />
        </div>
        <div className="article-body">
          {(article.content || []).map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="article-foot">
          <button className="btn btn-outline" onClick={() => setPage({ name: "capsud" })}>← Tous les articles</button>
        </div>
      </article>
      <Footer />
    </main>
  );
}

// ============ FOOTER ============
function Footer() {
  const t = window.useT();
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
        </div>
        <div className="foot-cols">
          <div>
            <h5>{t("Naviguer", "Navigate")}</h5>
            <a>{t("Catalogue", "Catalog")}</a><a>{t("Destinations", "Destinations")}</a><a>{t("Skippers", "Skippers")}</a>
          </div>
          <div>
            <h5>{t("Maison", "House")}</h5>
            <a>{t("À propos", "About")}</a><a>{t("Contact", "Contact")}</a><a>{t("Presse", "Press")}</a>
          </div>
          <div>
            <h5>{t("Légal", "Legal")}</h5>
            <a>{t("CGV", "Terms")}</a><a>{t("Mentions légales", "Legal notice")}</a><a>{t("Confidentialité", "Privacy")}</a>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 South Boat — Mandelieu La Napoule, France</span>
        <span>{t("Belle journée en mer à vous", "Have a great day at sea")}</span>
      </div>
    </footer>);

}

Object.assign(window, {
  HomePage, BoatCard, CatalogPage, DetailPage, BookingPage, AboutPage, ContactPage,
  CapSudListPage, CapSudArticlePage, Footer, Calendar, fmtArticleDate
});