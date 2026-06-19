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
          <img src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=2400&q=80" alt={t("Bateau en mer sur la Côte d'Azur — location de bateau à Mandelieu avec South Boat", "Boat at sea on the French Riviera — South Boat rentals in Mandelieu")} />
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
        <img src={boat.images[0]} alt={`${boat.name} - Location de bateau à Mandelieu sur la Côte d'Azur`} />
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

      <div className="catalog-body">
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
          <img src={boat.images[0]} alt={`${boat.name} - Location bateau Mandelieu Côte d'Azur, port et Esterel`} />
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
const ITINERARIES = [
  { id: "lerins", name: "Îles de Lérins", desc: "Sainte-Marguerite, baignade et déjeuner en mer." },
  { id: "esterel", name: "Calanques de l'Estérel", desc: "Roches rouges, eaux turquoise, snorkeling." },
  { id: "saint-tropez", name: "Baie de Saint-Tropez & Pampelonne", desc: "Plages mythiques et villages perchés." },
  { id: "monaco", name: "Cap Ferrat & Monaco", desc: "Yachts, villas et Rocher monégasque." },
  { id: "porquerolles", name: "Îles d'Or — Porquerolles", desc: "Eaux cristallines et pinèdes protégées." },
];

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
    crew: "with",
    itinerary: "",
    billing: { firstName: "", lastName: "", birthdate: "", email: "", phone: "", address: "", permitNumber: "" },
    permitDifferent: false,
    permit: { firstName: "", lastName: "", birthdate: "", email: "", phone: "", address: "", permitNumber: "" },
    preAuthDone: false,
    paymentMethod: "",
    paymentDone: false,
    transferProof: null, // fichier joint (preuve de virement) — obligatoire si virement
  });

  // Options dynamiques par bateau (sinon defaults génériques)
  const extras = boat.options && boat.options.length > 0
    ? boat.options.map((o) => ({ id: o.id, label: o.label, price: o.price }))
    : [
        { id: "lunch", label: "Plateau-repas chef (par pers.)", price: 65 },
        { id: "snorkel", label: "Pack snorkeling (4 pers.)", price: 80 },
      ];

  const toggleExtra = (x) =>
    setData((d) => ({ ...d, extras: d.extras.includes(x) ? d.extras.filter((e) => e !== x) : [...d.extras, x] }));

  const { total, deposit, preAuth, base, extrasCost, skipperCost } = useMemo(() => {
    const dayPrice = boat.price || 0;
    const halfPrice = boat.priceHalfDay || Math.round(dayPrice * 0.6);
    const base = data.slot === "halfday" ? halfPrice : dayPrice;
    const extrasCost = data.extras.reduce((sum, eId) => {
      const ex = extras.find((x) => x.id === eId);
      if (!ex) return sum;
      return sum + (ex.id === "lunch" ? ex.price * (data.adults + data.children) : ex.price);
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
      if (!data.date) { setErrorMsg(t("Veuillez choisir une date.", "Please select a date.")); return false; }
      if (!data.slot) { setErrorMsg(t("Veuillez choisir un créneau.", "Please select a time slot.")); return false; }
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

  const goNext = () => { if (validateStep()) { setStep((s) => Math.min(7, s + 1)); setErrorMsg(""); setFieldErrors({}); } };
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

          {step === 1 && (
            <section className="step-card">
              <h2>{t("Choisissez votre créneau", "Choose your time slot")}</h2>

              {false && (
                <div className="cal-embed" style={{ marginBottom: 16, border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", minHeight: 600 }}>
                  <iframe
                    title={t("Réservez votre créneau", "Book your time slot")}
                    src="https://cal.com/CAL_USERNAME/EVENT_TYPE?embed=true"
                    style={{ width: "100%", height: 600, border: 0 }}
                    loading="lazy"
                  />
                </div>
              )}
              <div style={{ background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #0a2540", padding: "10px 14px", borderRadius: 4, marginBottom: 14, color: "#3b4a5a", fontSize: 13 }}>
                {t("Calendrier synchronisé en cours d'activation. Sélectionnez votre date ci-dessous.", "Synced calendar coming soon. Please select your date below.")}
              </div>

              <Calendar selected={data.date} onSelect={(d) => setData({ ...data, date: d })} />

              <h3 className="sub">{t("Créneau", "Time slot")}</h3>
              <div className="seg two">
                <button
                  className={"seg-btn" + (data.slot === "day" ? " active" : "")}
                  onClick={() => setData({ ...data, slot: "day" })}>
                  <strong>{t("Journée complète", "Full day")}</strong>
                  <span>{t("8h", "8h")} · {fmtPrice(boat.price)}</span>
                </button>
                <button
                  className={"seg-btn" + (data.slot === "halfday" ? " active" : "")}
                  onClick={() => setData({ ...data, slot: "halfday" })}>
                  <strong>{t("Demi-journée", "Half day")}</strong>
                  <span>{t("4h", "4h")} · {fmtPrice(boat.priceHalfDay || Math.round(boat.price * 0.6))}</span>
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="step-card">
              <h2>{t("Options & participants", "Options & guests")}</h2>

              <h3 className="sub">{t("Options", "Add-ons")}</h3>
              <div className="extras">
                {extras.map((x) => (
                  <label key={x.id} className={"extra" + (data.extras.includes(x.id) ? " active" : "")}>
                    <input type="checkbox" checked={data.extras.includes(x.id)} onChange={() => toggleExtra(x.id)} />
                    <span className="extra-check"><Icon name="check" size={12} /></span>
                    <span className="extra-label">{t(x.label, ({ buoy: "Towed inflatable", wake: "Wakeboard", lunch: "Chef-prepared lunch (per person)", snorkel: "Snorkeling pack (4 people)" })[x.id] || x.label)}</span>
                    <span className="extra-price">+{x.price} €</span>
                  </label>
                ))}
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
                <button className={"seg-btn" + (data.crew === "with" ? " active" : "")} onClick={() => setData({ ...data, crew: "with" })}>
                  <strong>{t("Avec skipper", "With skipper")}</strong>
                  <span>{t("+150 € demi-journée · +200 € journée", "+€150 half day · +€200 full day")}</span>
                </button>
                <button className={"seg-btn" + (data.crew === "without" ? " active" : "")} onClick={() => setData({ ...data, crew: "without", itinerary: "" })}>
                  <strong>{t("Sans skipper", "Without skipper")}</strong>
                  <span>{t("Permis bateau requis", "Boating license required")}</span>
                </button>
              </div>

              {data.crew === "without" && (
                <div style={{ background: "#fafbfc", border: "1px solid #e5e7eb", borderLeft: "3px solid #0a2540", padding: "10px 14px", borderRadius: 4, color: "#3b4a5a", marginTop: 12, fontSize: 13 }}>
                  {t("Les destinations vous seront proposées le jour de la location.", "Destinations will be suggested to you on the day of the rental.")}
                </div>
              )}

              {data.crew === "with" && (
                <>
                  <h3 className="sub">{t("Itinéraire", "Itinerary")}</h3>
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
                          <strong>{t(it.name, ({ lerins: "Lérins Islands", esterel: "Estérel calanques", "saint-tropez": "Bay of Saint-Tropez & Pampelonne", monaco: "Cap Ferrat & Monaco", porquerolles: "Golden Isles — Porquerolles" })[it.id] || it.name)}</strong>
                          <span className="muted" style={{ display: "block", fontSize: 13 }}>{t(it.desc, ({ lerins: "Sainte-Marguerite, swim and lunch at sea.", esterel: "Red rocks, turquoise waters, snorkeling.", "saint-tropez": "Iconic beaches and hilltop villages.", monaco: "Yachts, villas and the Monégasque Rock.", porquerolles: "Crystal-clear waters and protected pine forests." })[it.id] || it.desc)}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </>
              )}

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
                  <div className="recap-row"><span>{t("Itinéraire", "Itinerary")}</span><strong>{t(selectedItinerary.name, ({ lerins: "Lérins Islands", esterel: "Estérel calanques", "saint-tropez": "Bay of Saint-Tropez & Pampelonne", monaco: "Cap Ferrat & Monaco", porquerolles: "Golden Isles — Porquerolles" })[selectedItinerary.id] || selectedItinerary.name)}</strong></div>
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
                  href="#SWIKLY_LINK"
                  className="btn btn-primary btn-block"
                  aria-disabled="true"
                  onClick={(e) => {
                    e.preventDefault();
                    setData((d) => ({ ...d, preAuthDone: true }));
                  }}
                  style={{ opacity: 0.95 }}>
                  {t("Pré-autorisation bancaire (Swikly)", "Bank pre-authorization (Swikly)")}
                </a>
                <p className="muted" style={{ fontSize: 12, marginTop: 10 }}>
                  {t("Lien Swikly en cours de configuration — bouton actif en mode démonstration.", "Swikly link being set up — button active in demo mode.")}
                </p>
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
                {t("Les liens de paiement sont actuellement en cours de configuration. La fonctionnalité sera activée prochainement.", "Payment links are currently being set up. This feature will be activated shortly.")}
              </div>

              <div className="pay-methods" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                {[
                  { id: "cb", label: t("Carte bancaire", "Credit card") },
                  { id: "paypal", label: "PayPal" },
                  { id: "applepay", label: "Apple Pay" },
                  { id: "paybybank", label: "Pay by Bank" },
                  { id: "virement", label: t("Virement bancaire", "Bank transfer") },
                ].map((m) => {
                  const active = data.paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setData((d) => ({ ...d, paymentMethod: m.id }))}
                      style={{
                        border: active ? "1.5px solid var(--ink, #0a2540)" : "1px solid #e5e7eb",
                        borderRadius: 10,
                        padding: "16px 18px",
                        background: active ? "#f7f9fb" : "#fff",
                        textAlign: "left",
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: active ? 600 : 500,
                        color: "var(--ink, #0a2540)",
                        transition: "border-color .15s, background .15s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>
                      <span>{m.label}</span>
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
              <div className="recap">
                <div className="recap-row"><span>{t("Bateau", "Boat")}</span><strong>{boat.name}</strong></div>
                <div className="recap-row"><span>{t("Date", "Date")}</span><strong>{data.date ? fmtLong(data.date, t.lang) : "—"}</strong></div>
                <div className="recap-row"><span>{t("Créneau", "Time slot")}</span><strong>{labelSlot(data.slot, t)}</strong></div>
                <div className="recap-row"><span>{t("Participants", "Guests")}</span><strong>{data.adults} {t(data.adults > 1 ? "adultes" : "adulte", data.adults > 1 ? "adults" : "adult")}{data.children ? " · " + data.children + " " + t(data.children > 1 ? "enfants" : "enfant", data.children > 1 ? "children" : "child") : ""}</strong></div>
                {selectedItinerary && <div className="recap-row"><span>{t("Itinéraire", "Itinerary")}</span><strong>{t(selectedItinerary.name, ({ lerins: "Lérins Islands", esterel: "Estérel calanques", "saint-tropez": "Bay of Saint-Tropez & Pampelonne", monaco: "Cap Ferrat & Monaco", porquerolles: "Golden Isles — Porquerolles" })[selectedItinerary.id] || selectedItinerary.name)}</strong></div>}
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
              stepIncomplete = !data.date || !data.slot;
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
                    {step === 3 ? t("Réserver", "Book") : step === 4 ? t("Aller à la caution", "Go to deposit hold") : step === 5 ? t("Aller au paiement", "Go to payment") : step === 6 ? t("Valider la réservation", "Confirm booking") : t("Continuer", "Continue")} <Icon name="arrow" size={16} />
                  </button>
                </div>
                {errorMsg && <p style={{ color: "#c00", margin: 0, textAlign: "right" }}>{errorMsg}</p>}
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
                <strong>{t(selectedItinerary.name, ({ lerins: "Lérins Islands", esterel: "Estérel calanques", "saint-tropez": "Bay of Saint-Tropez & Pampelonne", monaco: "Cap Ferrat & Monaco", porquerolles: "Golden Isles — Porquerolles" })[selectedItinerary.id] || selectedItinerary.name)}</strong>
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
            <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1400&q=80" alt={t("Marina de Mandelieu-La-Napoule, port de départ South Boat sur la Côte d'Azur", "Marina of Mandelieu-La-Napoule, South Boat's departure port on the French Riviera")} />
          </div>
          <div className="ab-img stack">
            <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80" alt={t("Bateau au mouillage dans une calanque de l'Esterel, location South Boat", "Boat anchored in an Esterel cove, South Boat rental")} />
          </div>
          <div className="ab-badge">
            <strong>{t("Depuis 2018", "Since 2018")}</strong>
            <span>Mandelieu-la-Napoule</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="ab-stats">
        <div className="ab-stat"><strong>Mandelieu</strong><span>{t("Port de départ", "Departure port")}</span></div>
      </section>

      {/* STORY */}
      <section className="ab-story">
        <div className="ab-story-head">
          <p className="eyebrow">{t("Notre histoire", "Our story")}</p>
          <h2>{t("Huit ans sur la même ligne d'horizon.", "Eight years on the same horizon line.")}</h2>
        </div>
        <div className="ab-timeline">
          <div className="ab-step">
            <span className="ab-year">2018</span>
            <h3>{t("Les débuts", "The beginnings")}</h3>
            <p>{t("Marine quitte la Marine Marchande et lance South Boat avec un seul bateau, un Cap Camarat 6.5, amarré à Mandelieu.", "Marine leaves the Merchant Navy and launches South Boat with a single boat, a Cap Camarat 6.5, moored in Mandelieu.")}</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">2020</span>
            <h3>{t("L'équipage s'étoffe", "The crew grows")}</h3>
            <p>{t("Trois skippers rejoignent l'aventure. La flotte grandit, mais la promesse reste la même : un seul interlocuteur, une attention sur-mesure.", "Three skippers join the adventure. The fleet grows, but the promise stays the same: one dedicated contact, tailored care.")}</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">2023</span>
            <h3>{t("Cap sur l'Azur", "Heading for the Riviera")}</h3>
            <p>{t("Ouverture des bases de Cannes, Antibes et Nice. South Boat couvre désormais l'ensemble de la côte, du Cap Roux à Monaco.", "Opening of the Cannes, Antibes and Nice bases. South Boat now covers the entire coast, from Cap Roux to Monaco.")}</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">2026</span>
            <h3>{t("Aujourd'hui", "Today")}</h3>
            <p>{t("Mochi, notre bateau familial au départ de Mandelieu, et la même obsession qu'au premier jour : que chaque sortie soit un souvenir précieux.", "Mochi, our family boat departing from Mandelieu, with the same obsession as on day one: that every outing becomes a precious memory.")}</p>
          </div>
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
            <h3>{t("Une flotte choisie", "A curated fleet")}</h3>
            <p>{t("Pas de catalogue infini. Un bateau soigneusement sélectionné, inspecté et adopté par notre équipe avant d'être proposé.", "No endless catalog. One boat carefully selected, inspected and adopted by our team before being offered.")}</p>
            <span className="ab-tag">{t("Sélection", "Selection")}</span>
          </article>
          <article className="ab-pillar">
            <span className="ab-num">02</span>
            <h3>{t("Un seul interlocuteur", "One dedicated contact")}</h3>
            <p>{t("De la première question au retour au port, vous échangez avec un conseiller dédié qui connaît chaque bateau de la flotte.", "From your first question to your return to port, you talk with a dedicated advisor who knows every boat in the fleet.")}</p>
            <span className="ab-tag">{t("Accompagnement", "Support")}</span>
          </article>
          <article className="ab-pillar">
            <span className="ab-num">03</span>
            <h3>{t("Le respect du large", "Respect for the sea")}</h3>
            <p>{t("Nos skippers privilégient les mouillages écologiques. Nous reversons 1% de notre chiffre à la protection des fonds marins.", "Our skippers favor eco-friendly anchorages. We donate 1% of our revenue to marine ecosystem protection.")}</p>
            <span className="ab-tag">{t("Engagement", "Commitment")}</span>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <div className="ab-cta-inner">
          <div>
            <h2>{t("Une question, une envie de large ?", "A question, a longing for the open sea?")}</h2>
            <p>{t("Notre équipe vous répond du lundi au dimanche, de 8h à 21h. Conseil gratuit, sans engagement.", "Our team is available Monday to Sunday, 8am to 9pm. Free advice, no commitment.")}</p>
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
            <li><Icon name="phone" /> <div><strong>06 34 49 16 21</strong><span>{t("Nous appeler", "Call us")}</span></div></li>
            <li><Icon name="mail" /> <div><strong><a href="mailto:contact@south-boat.com" style={{ color: "inherit", textDecoration: "none" }}>contact@south-boat.com</a></strong><span>{t("Nous écrire", "Write to us")}</span></div></li>
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
                  <img src={a.cover} alt={a.title} />
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
        "logo": { "@type": "ImageObject", "url": "https://rayanlapassat-eng.github.io/South-Boat/images/mochi/location-bateau-mandelieu-south-boat.jpg" }
      },
      "description": article.excerpt || "",
      "mainEntityOfPage": "https://rayanlapassat-eng.github.io/South-Boat/#capsud-article/" + article.id
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
          <img src={article.cover} alt={`${article.title} — Cap Sud, ${t("blog nautisme South Boat", "South Boat nautical blog")}`} />
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