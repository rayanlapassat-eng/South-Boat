/* global React, BOATS, PORTS, fmtPrice, Star, Heart, Icon */
const { useState, useEffect, useMemo, useRef } = React;

// ============ HOME ============
function HomePage({ setPage, query, setQuery, toggleFav, favs }) {
  const featured = BOATS.slice(0, 3);
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
          <BoatCard key={b.id} boat={b} onClick={() => setPage({ name: "detail", id: b.id })} toggleFav={toggleFav} fav={favs.includes(b.id)} />
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
function BoatCard({ boat, onClick, toggleFav, fav }) {
  return (
    <article className="boat-card" onClick={onClick}>
      <div className="boat-img">
        <img src={boat.images[0]} alt={boat.name} />
        <button className={"fav-btn" + (fav ? " active" : "")} onClick={(e) => {e.stopPropagation();toggleFav(boat.id);}} aria-label="Favori">
          <Heart filled={fav} size={18} />
        </button>
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
function CatalogPage({ setPage, query, setQuery, toggleFav, favs }) {
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
            <BoatCard key={b.id} boat={b} onClick={() => setPage({ name: "detail", id: b.id })} toggleFav={toggleFav} fav={favs.includes(b.id)} />
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
function DetailPage({ id, setPage, toggleFav, favs }) {
  const boat = BOATS.find((b) => b.id === id);
  const [idx, setIdx] = useState(0);
  if (!boat) return null;
  const fav = favs.includes(boat.id);

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
            <button className={"icon-btn-lg" + (fav ? " active" : "")} onClick={() => toggleFav(boat.id)}>
              <Heart filled={fav} size={20} />
            </button>
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
function BookingPage({ id, setPage }) {
  const boat = BOATS.find((b) => b.id === id) || BOATS[0];
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    date: "",
    duration: "day",
    crew: "with",
    people: 4,
    extras: [],
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const toggleExtra = (x) => setData((d) => ({ ...d, extras: d.extras.includes(x) ? d.extras.filter((e) => e !== x) : [...d.extras, x] }));

  const extras = [
  { id: "skipper", label: "Skipper professionnel", price: 280 },
  { id: "lunch", label: "Plateau-repas chef (par pers.)", price: 65 },
  { id: "snorkel", label: "Pack snorkeling (4 pers.)", price: 80 },
  { id: "wake", label: "Wakeboard + ski nautique", price: 120 }];


  const total = useMemo(() => {
    let t = boat.price;
    if (data.duration === "halfday") t = Math.round(boat.price * 0.6);
    if (data.duration === "weekend") t = boat.price * 2;
    if (data.duration === "week") t = Math.round(boat.price * 6.5);
    if (data.crew === "with") t += 280;
    data.extras.forEach((e) => {
      const ex = extras.find((x) => x.id === e);
      if (ex) t += ex.id === "lunch" ? ex.price * data.people : ex.price;
    });
    return t;
  }, [boat, data]);

  const steps = ["Date & options", "Vos coordonnées", "Confirmation"];

  return (
    <main className="booking">
      <div className="detail-top">
        <button className="back" onClick={() => setPage({ name: "detail", id: boat.id })}>
          <Icon name="arrowL" size={16} /> Retour à la fiche bateau
        </button>
      </div>

      <div className="booking-grid">
        <div className="booking-main">
          <div className="stepper-bar">
            {steps.map((s, i) =>
            <div key={i} className={"step" + (step > i ? " done" : "") + (step === i + 1 ? " active" : "")}>
                <span className="step-num">{step > i ? <Icon name="check" size={14} /> : i + 1}</span>
                <span className="step-label">{s}</span>
              </div>
            )}
          </div>

          {step === 1 &&
          <section className="step-card">
              <h2>Choisissez votre date</h2>
              <Calendar selected={data.date} onSelect={(d) => setData({ ...data, date: d })} />

              <h3 className="sub">Durée</h3>
              <div className="seg">
                {[
              { id: "halfday", label: "Demi-journée", note: "4h" },
              { id: "day", label: "Journée", note: "8h" },
              { id: "weekend", label: "Week-end", note: "2 jours" },
              { id: "week", label: "Semaine", note: "7 jours" }].
              map((o) =>
              <button key={o.id} className={"seg-btn" + (data.duration === o.id ? " active" : "")} onClick={() => setData({ ...data, duration: o.id })}>
                    <strong>{o.label}</strong>
                    <span>{o.note}</span>
                  </button>
              )}
              </div>

              <h3 className="sub">Skipper</h3>
              <div className="seg two">
                <button className={"seg-btn" + (data.crew === "without" ? " active" : "")} onClick={() => setData({ ...data, crew: "without" })}>
                  <strong>Sans skipper</strong>
                  <span>Permis requis</span>
                </button>
                <button className={"seg-btn" + (data.crew === "with" ? " active" : "")} onClick={() => setData({ ...data, crew: "with" })}>
                  <strong>Avec skipper</strong>
                  <span>+280 € / jour</span>
                </button>
              </div>

              <h3 className="sub">Nombre de personnes</h3>
              <div className="stepper">
                <button onClick={() => setData({ ...data, people: Math.max(1, data.people - 1) })}><Icon name="minus" size={14} /></button>
                <span>{data.people} personnes</span>
                <button onClick={() => setData({ ...data, people: Math.min(boat.capacity, data.people + 1) })}><Icon name="plus" size={14} /></button>
              </div>

              <h3 className="sub">Options</h3>
              <div className="extras">
                {extras.map((x) =>
              <label key={x.id} className={"extra" + (data.extras.includes(x.id) ? " active" : "")}>
                    <input type="checkbox" checked={data.extras.includes(x.id)} onChange={() => toggleExtra(x.id)} />
                    <span className="extra-check"><Icon name="check" size={12} /></span>
                    <span className="extra-label">{x.label}</span>
                    <span className="extra-price">+{x.price} €</span>
                  </label>
              )}
              </div>
            </section>
          }

          {step === 2 &&
          <section className="step-card">
              <h2>Vos coordonnées</h2>
              <div className="form-grid">
                <label className="field">
                  <span>Nom complet</span>
                  <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Jean Dupont" />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="jean@example.com" />
                </label>
                <label className="field">
                  <span>Téléphone</span>
                  <input type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} placeholder="+33 6 ..." />
                </label>
                <label className="field full">
                  <span>Demandes particulières (facultatif)</span>
                  <textarea rows="4" value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })} placeholder="Anniversaire à bord, régime alimentaire, point de rendez-vous..." />
                </label>
              </div>
            </section>
          }

          {step === 3 &&
          <section className="step-card success">
              <div className="success-icon"><Icon name="check" size={28} /></div>
              <h2>Votre demande est envoyée</h2>
              <p className="lead">Nous confirmons votre réservation par email sous 2 heures. Une question ? Notre conciergerie vous répond directement.</p>
              <div className="recap">
                <div className="recap-row"><span>Bateau</span><strong>{boat.name}</strong></div>
                <div className="recap-row"><span>Date</span><strong>{data.date ? fmtLong(data.date) : "À confirmer"}</strong></div>
                <div className="recap-row"><span>Personnes</span><strong>{data.people}</strong></div>
                <div className="recap-row total"><span>Total</span><strong>{fmtPrice(total)}</strong></div>
              </div>
              <button className="btn btn-primary btn-block" onClick={() => setPage({ name: "home" })}>Retour à l'accueil</button>
            </section>
          }

          {step < 3 &&
          <div className="step-actions">
              {step > 1 && <button className="btn btn-outline" onClick={() => setStep(step - 1)}>Précédent</button>}
              <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                {step === 2 ? "Confirmer la réservation" : "Continuer"} <Icon name="arrow" size={16} />
              </button>
            </div>
          }
        </div>

        <aside className="booking-summary">
          <img src={boat.images[0]} alt={boat.name} className="bs-img" />
          <h3>{boat.name}</h3>
          <p className="muted">{boat.type} · {boat.port}</p>
          <div className="bs-line">
            <span>Durée</span>
            <strong>{labelDuration(data.duration)}</strong>
          </div>
          <div className="bs-line">
            <span>Skipper</span>
            <strong>{data.crew === "with" ? "Inclus" : "Sans"}</strong>
          </div>
          <div className="bs-line">
            <span>Personnes</span>
            <strong>{data.people}</strong>
          </div>
          {data.extras.length > 0 &&
          <div className="bs-line">
              <span>Options</span>
              <strong>{data.extras.length}</strong>
            </div>
          }
          <div className="bs-divider" />
          <div className="bs-total">
            <span>Total estimé</span>
            <strong>{fmtPrice(total)}</strong>
          </div>
          <p className="bs-note">Annulation gratuite jusqu'à 7 jours avant le départ.</p>
        </aside>
      </div>
      <Footer />
    </main>);

}

const fmtLong = (s) => {
  const d = new Date(s);
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};
const labelDuration = (d) => ({ halfday: "Demi-journée", day: "Journée", weekend: "Week-end", week: "Semaine" })[d];

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

// ============ FAVORITES ============
function FavoritesPage({ favs, setPage, toggleFav }) {
  const list = BOATS.filter((b) => favs.includes(b.id));
  return (
    <main className="catalog">
      <div className="catalog-body single">
        <section className="catalog-results">
          <div className="catalog-head">
            <div>
              <h2>Vos favoris</h2>
              <p className="muted">{list.length} {list.length > 1 ? "bateaux" : "bateau"} sauvegardé{list.length > 1 ? "s" : ""}</p>
            </div>
          </div>
          {list.length === 0 ?
          <div className="empty big">
              <Heart size={32} />
              <h3>Aucun favori pour l'instant</h3>
              <p>Cliquez sur le cœur d'un bateau pour le retrouver ici.</p>
              <button className="btn btn-primary" onClick={() => setPage({ name: "catalog" })}>Voir le catalogue</button>
            </div> :

          <div className="grid-3">
              {list.map((b) =>
            <BoatCard key={b.id} boat={b} onClick={() => setPage({ name: "detail", id: b.id })} toggleFav={toggleFav} fav={true} />
            )}
            </div>
          }
        </section>
      </div>
      <Footer />
    </main>);

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
  HomePage, BoatCard, CatalogPage, DetailPage, BookingPage, FavoritesPage, AboutPage, ContactPage, Footer, Calendar
});