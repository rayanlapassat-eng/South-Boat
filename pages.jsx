/* global React, BOATS, PORTS, fmtPrice, Star, Icon */
const { useState, useEffect, useMemo, useRef } = React;

// ============ HOME ============
function HomePage({ setPage, query, setQuery }) {
  const featured = BOATS.slice(0, 3);
  const latestArticle = (window.ARTICLES && window.ARTICLES.length > 0) ? window.ARTICLES[0] : null;
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=2400&q=80" alt="Bateau en mer" />
          <div className="hero-overlay hero-overlay-grad" />
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="dot" /> Côte d'Azur · Saison 2026
          </div>
          <h1 className="hero-title">
            Le large,<br />en toute simplicité.
          </h1>
          <p className="hero-sub">
            Une sélection rigoureuse de bateaux familiaux, de Saint-Tropez à Monaco. Réservation transparente, équipage à la demande.
          </p>
          <div className="hero-search">
            <SearchBar query={query} setQuery={setQuery} onSubmit={() => setPage({ name: "catalog" })} />
          </div>
        </div>
        <div className="hero-stats">
          <div><strong>40+</strong><span>Bateaux sélectionnés</span></div>
          <div><strong>6</strong><span>Ports azuréens</span></div>
          <div><strong>4,9<Star size={12} /></strong><span>Note moyenne</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-head" style={{ color: "rgb(58, 141, 222)", borderRadius: "0px", fontFamily: "-apple-system" }}>
          <div>
            <p className="eyebrow">Notre flotte</p>
            <h2>Sélection du moment</h2>
          </div>
          <button className="btn btn-ghost" onClick={() => setPage({ name: "catalog" })}>
            Voir tous les bateaux <Icon name="arrow" size={16} />
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
            <h3>Bateaux vérifiés</h3>
            <p>Chaque embarcation est inspectée et certifiée par notre équipe avant toute mise en location.</p>
          </div>
          <div className="value-card">
            <span className="value-icon"><Icon name="anchor" /></span>
            <h3>Skippers expérimentés</h3>
            <p>Optez pour un skipper local qui connaît chaque crique, chaque calanque, chaque coucher de soleil.</p>
          </div>
          <div className="value-card">
            <span className="value-icon"><Icon name="sparkle" /></span>
            <h3>Sans mauvaise surprise</h3>
            <p>Carburant inclus jusqu'à un certain seuil, annulation flexible, conciergerie disponible 7j/7.</p>
          </div>
        </div>
      </section>

      <section className="section departure">
        <div className="departure-card">
          <div className="departure-text">
            <p className="eyebrow">Point de départ</p>
            <h2>Quai visiteur de Mandelieu</h2>
            <p className="lead">
              Le départ de toutes les locations se fait depuis le quai visiteur de Mandelieu — Port de Mandelieu.
              Notre équipe vous y accueille pour le briefing avant chaque sortie.
            </p>
            <div className="departure-actions">
              <a className="btn btn-primary"
                 href="https://www.google.com/maps/search/?api=1&query=Port+de+Mandelieu+quai+visiteur"
                 target="_blank" rel="noopener noreferrer">
                <Icon name="pin" size={16} /> Ouvrir dans Google Maps
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
              <p className="eyebrow">Cap Sud · Carnet de bord</p>
              <h2>Dernier article</h2>
            </div>
            <button className="btn btn-ghost" onClick={() => setPage({ name: "capsud" })}>
              Tous les articles <Icon name="arrow" size={16} />
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
              <span className="capsud-cta">Lire l'article <Icon name="arrow" size={15} /></span>
            </div>
          </article>
        </section>
      )}

      <section className="section dest">
        <div className="section-head">
          <div>
            <p className="eyebrow">Destinations</p>
            <h2>Du port aux îles</h2>
          </div>
        </div>
        <div className="dest-grid">
          {[
          { n: "Îles de Lérins", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", c: 8 },
          { n: "Cannes", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80", c: 11 },
          { n: "Estérel", img: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80", c: 9 }].
          map((d) =>
          <button key={d.n} className="dest-card" onClick={() => {setQuery({ ...query, port: d.n });setPage({ name: "catalog" });}}>
              <img src={d.img} alt={d.n} />
              <div className="dest-overlay" />
              <div className="dest-info">
                <h4>{d.n}</h4>
                <span>{d.c} bateaux</span>
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
          <span><Icon name="users" size={14} /> {boat.capacity} pers.</span>
          <span className="dot-sep">·</span>
          <span>{boat.length}</span>
        </p>
        <div className="boat-foot">
          <div className="price">
            <strong>{fmtPrice(boat.price)}</strong>
            <span> / jour</span>
          </div>
          <span className="boat-cta">
            Découvrir <Icon name="arrow" size={15} />
          </span>
        </div>
      </div>
    </article>);

}

// ============ CATALOG ============
function CatalogPage({ setPage, query, setQuery }) {
  const [filters, setFilters] = useState({
    type: "all",
    minPrice: 0,
    maxPrice: 2500,
    minCap: 1,
    sort: "rec"
  });
  const [showFilters, setShowFilters] = useState(true);

  const filtered = useMemo(() => {
    let list = BOATS.slice();
    if (query.port) list = list.filter((b) => b.port === query.port);
    if (filters.type !== "all") list = list.filter((b) => b.type === filters.type);
    list = list.filter((b) => b.price >= filters.minPrice && b.price <= filters.maxPrice && b.capacity >= filters.minCap);
    if (filters.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, filters]);

  const types = ["all", ...Array.from(new Set(BOATS.map((b) => b.type)))];

  return (
    <main className="catalog">
      <div className="catalog-bar">
        <SearchBar query={query} setQuery={setQuery} compact onSubmit={() => {}} />
      </div>

      <div className="catalog-body">
        <aside className={"filters" + (showFilters ? "" : " hidden")}>
          <div className="filters-head">
            <h3>Filtres</h3>
            <button className="link" onClick={() => setFilters({ type: "all", minPrice: 0, maxPrice: 2500, minCap: 1, sort: "rec" })}>Réinitialiser</button>
          </div>

          <div className="filter-block">
            <h4>Type de bateau</h4>
            <div className="chips">
              {types.map((t) =>
              <button key={t} className={"chip" + (filters.type === t ? " active" : "")} onClick={() => setFilters({ ...filters, type: t })}>
                  {t === "all" ? "Tous" : t}
                </button>
              )}
            </div>
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
              <button onClick={() => setFilters({ ...filters, minCap: Math.min(12, filters.minCap + 1) })}><Icon name="plus" size={14} /></button>
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
              <h2>{filtered.length} bateaux disponibles</h2>
              <p className="muted">{query.port || "Toute la Côte d'Azur"} · du {fmtDate(query.from)} au {fmtDate(query.to)}</p>
            </div>
            <button className="btn btn-ghost mobile-filters" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? "Masquer" : "Afficher"} les filtres
            </button>
          </div>
          <div className="grid-3">
            {filtered.map((b) =>
            <BoatCard key={b.id} boat={b} onClick={() => setPage({ name: "detail", id: b.id })} />
            )}
            {filtered.length === 0 &&
            <div className="empty">
                <p>Aucun bateau ne correspond à vos critères.</p>
                <button className="btn btn-ghost" onClick={() => setFilters({ type: "all", minPrice: 0, maxPrice: 2500, minCap: 1, sort: "rec" })}>Réinitialiser</button>
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
  const boat = BOATS.find((b) => b.id === id);
  const [idx, setIdx] = useState(0);
  if (!boat) return null;

  return (
    <main className="detail">
      <div className="detail-top">
        <button className="back" onClick={() => setPage({ name: "catalog" })}>
          <Icon name="arrowL" size={16} /> Retour au catalogue
        </button>
      </div>

      <section className="gallery">
        <div className="gallery-main">
          <img src={boat.images[idx]} alt={boat.name} />
          <button className="gal-arrow left" onClick={() => setIdx((idx - 1 + boat.images.length) % boat.images.length)}><Icon name="arrowL" /></button>
          <button className="gal-arrow right" onClick={() => setIdx((idx + 1) % boat.images.length)}><Icon name="arrow" /></button>
          <div className="gal-counter">{idx + 1} / {boat.images.length}</div>
        </div>
        <div className="gallery-thumbs">
          {boat.images.map((src, i) =>
          <button key={i} className={"thumb" + (i === idx ? " active" : "")} onClick={() => setIdx(i)}>
              <img src={src} alt="" />
            </button>
          )}
        </div>
      </section>

      <section className="detail-body">
        <div className="detail-main">
          <div className="detail-head">
            <div>
              <p className="eyebrow">{boat.type} · {boat.port}</p>
              <h1>{boat.name}</h1>
              <div className="detail-meta">
                <span className="rating"><Star size={14} /> {boat.rating.toFixed(1)} <span className="muted">· {boat.reviews} avis</span></span>
                <span className="dot-sep">·</span>
                <span>{boat.length}</span>
                <span className="dot-sep">·</span>
                <span>{boat.capacity} personnes</span>
                <span className="dot-sep">·</span>
                <span>{boat.year}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>À propos du bateau</h3>
            <p className="lead">{boat.description}</p>
          </div>

          <div className="detail-section">
            <h3>Équipement</h3>
            <ul className="features">
              {boat.features.map((f) =>
              <li key={f}><Icon name="check" size={16} /> {f}</li>
              )}
            </ul>
          </div>

          <div className="detail-section">
            <h3>Inclus dans la location</h3>
            <div className="includes">
              <div><Icon name="anchor" /> {boat.crew}</div>
              <div><Icon name="shield" /> Assurance complète</div>
              <div><Icon name="sparkle" /> Carburant 1er plein</div>
              <div><Icon name="wave" /> Briefing de sécurité</div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Options à la carte</h3>
            <div className="includes">
              <div><Icon name="sparkle" /> Barbecue à bord</div>
              <div><Icon name="sparkle" /> Plateau de gourmandises</div>
              <div><Icon name="wave" /> Bouée tractée</div>
            </div>
          </div>
        </div>

        <aside className="booking-card" style={{ backgroundColor: "rgb(255, 255, 255)", borderRadius: "20px" }}>
          <div className="bk-price">
            <strong>{fmtPrice(boat.price)}</strong>
            <span> / jour</span>
          </div>
          <div className="bk-rating">
            <Star size={13} /> {boat.rating.toFixed(1)} <span className="muted">· {boat.reviews} avis</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={() => setPage({ name: "booking", id: boat.id })} style={{ borderRadius: "20px" }}>
            Réserver ce bateau
          </button>
          <button className="btn btn-outline btn-block" onClick={() => setPage({ name: "contact" })} style={{ backgroundColor: "rgb(244, 248, 251)", borderRadius: "20px" }}>
            Contacter un conseiller
          </button>
          <ul className="bk-list">
            <li><Icon name="check" size={14} /> Annulation gratuite jusqu'à 7 jours</li>
            <li><Icon name="check" size={14} /> Paiement sécurisé</li>
            <li><Icon name="check" size={14} /> Conciergerie 7j/7</li>
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

  const goNext = () => { if (validateStep()) { setStep((s) => Math.min(6, s + 1)); setErrorMsg(""); } };
  const goPrev = () => { setErrorMsg(""); setStep((s) => Math.max(1, s - 1)); };

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
      <div className="detail-top">
        <button className="back" onClick={() => setPage({ name: "detail", id: boat.id })}>
          <Icon name="arrowL" size={16} /> Retour à la fiche bateau
        </button>
      </div>

      <div className="booking-grid">
        <div className="booking-main">
          <div className="tunnel-stepper">
            {steps.map((s, i) => (
              <div key={i} className={"step" + (step > i + 1 ? " done" : "") + (step === i + 1 ? " active" : "")}>
                <span className="step-num">{step > i + 1 ? <Icon name="check" size={14} /> : i + 1}</span>
                <span className="step-label">{s}</span>
              </div>
            ))}
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
    <main className="about">
      <section className="about-hero">
        <div>
          <p className="eyebrow">Notre maison</p>
          <h1>Le sur-mesure,<br />au rythme de la mer.</h1>
          <p className="lead">South Boat est née sur les pontons Mandelieu La Napoule
. Nous sélectionnons à la main des bateaux familiaux entretenus avec soin, et accompagnons chacun de nos clients comme un proche.</p>
          <button className="btn btn-primary" onClick={() => setPage({ name: "catalog" })}>Découvrir la flotte</button>
        </div>
        <div className="about-img">
          <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1400&q=80" alt="" />
        </div>
      </section>

      <section className="section">
        <div className="manifesto">
          <div>
            <span className="big-num">01</span>
            <h3>Une flotte choisie</h3>
            <p>Pas de catalogue infini. Quelques dizaines de bateaux, tous inspectés, tous adoptés par notre équipe avant d'être proposés.</p>
          </div>
          <div>
            <span className="big-num">02</span>
            <h3>Un seul interlocuteur</h3>
            <p>De la première question au retour au port, vous échangez avec un conseiller dédié qui connaît chaque bateau de la flotte.</p>
          </div>
          <div>
            <span className="big-num">03</span>
            <h3>Le respect du large</h3>
            <p>Nos skippers privilégient les mouillages écologiques et nous reversons 1% de notre chiffre à la protection des fonds marins.</p>
          </div>
        </div>
      </section>

      <section className="section quote">
        <blockquote>
          <p>« La meilleure journée en mer est celle dont on ne se souvient que de l'horizon. »</p>
          <span>— Marine, fondatrice</span>
        </blockquote>
      </section>
      <Footer />
    </main>);
}

// ============ CONTACT ============
function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <main className="contact">
      <section className="contact-grid">
        <div className="contact-info">
          <p className="eyebrow">Contact</p>
          <h1>Parlons de votre journée en mer.</h1>
          <p className="lead">Notre conciergerie vous répond du lundi au dimanche, de 8h à 19h.</p>
          <ul className="contact-list">
            <li><Icon name="phone" /> <div><strong>+33 4 93 00 00 00</strong><span>Conciergerie 7j/7</span></div></li>
            <li><Icon name="mail" /> <div><strong>contact@southboat.fr</strong><span>Réponse sous 2 heures</span></div></li>
            <li><Icon name="pin" /> <div><strong>Av. Henry Clews,
06210 Mandelieu-la-Napoule</strong><span>Sur rendez-vous</span></div></li>
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
          <p>La location de bateaux<br />sur la Côte d'Azur.</p>
        </div>
        <div className="foot-cols">
          <div>
            <h5>Naviguer</h5>
            <a>Catalogue</a><a>Destinations</a><a>Skippers</a>
          </div>
          <div>
            <h5>Maison</h5>
            <a>À propos</a><a>Contact</a><a>Presse</a>
          </div>
          <div>
            <h5>Légal</h5>
            <a>CGV</a><a>Mentions légales</a><a>Confidentialité</a>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 South Boat — Mandelieu La Napoule, France</span>
        <span>Belle journée en mer à vous </span>
      </div>
    </footer>);

}

Object.assign(window, {
  HomePage, BoatCard, CatalogPage, DetailPage, BookingPage, AboutPage, ContactPage,
  CapSudListPage, CapSudArticlePage, Footer, Calendar, fmtArticleDate
});