/* global React, ReactDOM */
const { useState, useEffect, useMemo, useRef } = React;

// ============ TWEAKS DEFAULTS ============
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "radius": 999,
  "darkMode": false
} /*EDITMODE-END*/;

// ============ DATA ============
const BOATS = [
{
  id: 1,
  name: "Mochi",
  type: "Day cruiser",
  capacity: 8,
  length: "7,15 m",
  year: 2013,
  designCategory: "Classe C",
  enginePower: "150 chevaux",
  port: "Mandelieu",
  price: 435,
  priceHalfDay: 320,
  deposit: 90,
  preAuth: 2000,
  options: [
    { id: "buoy", label: "Bouée tractée", label_en: "Towed inflatable", price: 30 },
    { id: "wake", label: "Wakeboard", label_en: "Wakeboard", price: 40 },
    { id: "paddle", label: "Paddle board", label_en: "Paddle board", price: 30 },
    { id: "snorkel", label: "Accessoires snorkeling", label_en: "Snorkeling gear", price: 20 }
  ],
  rating: 4.9,
  reviews: 47,
  crew: "Avec ou sans skipper",
  crew_en: "With or without skipper",
  images: [
  "images/mochi/location-bateau-mandelieu-south-boat.jpg",
  "images/mochi/bateau-mer-cote-azur.jpg",
  "images/mochi/interieur-bateau-mochi-location.jpg",
  "images/mochi/coucher-soleil-bateau-esterel.jpg",
  "images/mochi/bateau-port-mandelieu.jpg",
  "images/mochi/bateau-coucher-soleil-cote-azur.jpg",
  "images/mochi/yachts-marina-mandelieu.jpg",
  "images/mochi/cockpit-bateau-location-mandelieu.jpg",
  "images/mochi/moteur-bateau-south-boat.jpg",
  "images/mochi/marina-port-mandelieu-location-bateau.jpg"],

  description: "Élégance méditerranéenne et confort à bord. Idéal pour une journée en famille au large des calanques.",
  description_en: "Mediterranean elegance and onboard comfort. Perfect for a family day out off the coves.",
  features: ["Bain de soleil", "Sono Bluetooth", "Bimini", "GPS", "Échelle de bain"],
  features_en: ["Sun deck", "Bluetooth sound system", "Bimini top", "GPS", "Swim ladder"]
},
{
  id: 2,
  name: "Bateau à venir",
  type: "Open premium",
  capacity: 8,
  length: "—",
  year: 2026,
  port: "Mandelieu",
  price: 0,
  rating: 0,
  reviews: 0,
  crew: "—",
  comingSoon: true,
  images: ["https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1600&q=80"],
  description: "",
  features: []
},
{
  id: 3,
  name: "Bateau à venir",
  type: "Familial",
  capacity: 8,
  length: "—",
  year: 2026,
  port: "Mandelieu",
  price: 0,
  rating: 0,
  reviews: 0,
  crew: "—",
  comingSoon: true,
  images: ["https://images.unsplash.com/photo-1542902093-d55926049754?w=1600&q=80"],
  description: "",
  features: []
}];


const PORTS = ["Mandelieu"];

// ============ HELPERS ============
const fmtPrice = (n) => `${n.toLocaleString("fr-FR")} €`;

const Star = ({ size = 14, filled = true }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>;


const Heart = ({ size = 18, filled = false }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>;


const Icon = ({ name, size = 18 }) => {
  const map = {
    pin: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
    cal: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    search: <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>,
    arrow: <><path d="M5 12h14M13 5l7 7-7 7" /></>,
    arrowL: <><path d="M19 12H5M11 5l-7 7 7 7" /></>,
    check: <path d="M20 6L9 17l-5-5" />,
    anchor: <><circle cx="12" cy="5" r="3" /><path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3" /></>,
    shield: <path d="M12 2L4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z" />,
    sparkle: <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4" />,
    close: <><path d="M18 6L6 18M6 6l18 18" /></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
    chev: <path d="M9 18l6-6-6-6" />,
    minus: <path d="M5 12h14" />,
    plus: <path d="M12 5v14M5 12h14" />,
    sun: <><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    wave: <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 6c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></>
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {map[name]}
    </svg>);

};

// ============ THEME ============
function applyTheme(dark) {
  const root = document.documentElement;
  if (dark) {
    root.style.setProperty("--bg", "#06121F");
    root.style.setProperty("--bg-soft", "#0B1B2D");
    root.style.setProperty("--surface", "#0F2237");
    root.style.setProperty("--surface-2", "#15304B");
    root.style.setProperty("--ink", "#EAF2FB");
    root.style.setProperty("--ink-soft", "#9BB3CC");
    root.style.setProperty("--ink-muted", "#6B819A");
    root.style.setProperty("--line", "rgba(255,255,255,0.09)");
    root.style.setProperty("--line-strong", "rgba(255,255,255,0.16)");
    root.style.setProperty("--navy", "#0A2540");
    root.style.setProperty("--accent", "#5BAEDC");
    root.style.setProperty("--accent-soft", "rgba(91,174,220,0.18)");
    root.style.setProperty("--btn-fg", "#FFFFFF");
  } else {
    root.style.setProperty("--bg", "#FBFCFD");
    root.style.setProperty("--bg-soft", "#F2F7FB");
    root.style.setProperty("--surface", "#FFFFFF");
    root.style.setProperty("--surface-2", "#F4F8FB");
    root.style.setProperty("--ink", "#0A2540");
    root.style.setProperty("--ink-soft", "#3B5872");
    root.style.setProperty("--ink-muted", "#7C92A8");
    root.style.setProperty("--line", "rgba(10,37,64,0.08)");
    root.style.setProperty("--line-strong", "rgba(10,37,64,0.16)");
    root.style.setProperty("--navy", "#0A2540");
    root.style.setProperty("--accent", "#3A8DDE");
    root.style.setProperty("--accent-soft", "rgba(58,141,222,0.12)");
    root.style.setProperty("--btn-fg", "#FFFFFF");
  }
}

// ============ NAV ============
function Nav({ page, setPage, dark }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = window.useT();
  const items = [
  { id: "home", label: t("Accueil", "Home") },
  { id: "catalog", label: t("Catalogue", "Catalog") },
  { id: "planning", label: t("Disponibilités", "Availability") },
  { id: "capsud", label: "Cap Sud" },
  { id: "about", label: t("À propos", "About") },
  { id: "contact", label: t("Contact", "Contact") }];

  const navigate = (id) => { setPage({ name: id }); setMobileOpen(false); };

  return (
    <header className="nav">
      <div className="nav-inner" style={{ opacity: "10", color: "rgb(255, 255, 255)" }}>
        <button className="logo" onClick={() => navigate("home")}>
          <span className="logo-mark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l9-12 9 12M5 17h14l-2 4H7z" />
            </svg>
          </span>
          <span className="logo-text">South Boat<sup>°</sup></span>
        </button>
        <nav className="nav-links">
          {items.map((it) =>
          <button
            key={it.id}
            className={"nav-link" + (page.name === it.id ? " active" : "")}
            onClick={() => navigate(it.id)}>
              {it.label}
            </button>
          )}
          <a
            className="nav-link nav-link-ext"
            href="https://marine.meteoconsult.fr/"
            target="_blank"
            rel="noopener noreferrer"
            title={t("Météo Marine (ouvre dans un nouvel onglet)", "Marine weather (opens in a new tab)")}>
            {t("Météo Marine", "Marine Weather")}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4, verticalAlign: "middle" }}>
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </nav>
        <div className="nav-actions">
          <button
            className="lang-toggle"
            onClick={() => t.setLang(t.lang === "fr" ? "en" : "fr")}
            aria-label={t("Changer de langue", "Change language")}
            title={t("Changer de langue", "Change language")}>
            <span className={t.lang === "fr" ? "lang-on" : "lang-off"}>FR</span>
            <span className="lang-sep">|</span>
            <span className={t.lang === "en" ? "lang-on" : "lang-off"}>EN</span>
          </button>
          <button className="btn btn-primary nav-cta" onClick={() => setPage({ name: "catalog" })} style={{ borderRadius: "20px" }}>
            {t("Réserver", "Book")}
          </button>
          <button className="hamburger-btn" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu" aria-expanded={mobileOpen}>
            {mobileOpen
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            }
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="mobile-menu">
          {items.map((it) =>
          <button
            key={it.id}
            className={"mobile-menu-link" + (page.name === it.id ? " active" : "")}
            onClick={() => navigate(it.id)}>
              {it.label}
            </button>
          )}
          <a
            className="mobile-menu-link"
            href="https://marine.meteoconsult.fr/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}>
            Météo Marine ↗
          </a>
        </div>
      )}
    </header>);

}

// ============ SEARCH BAR ============
function SearchBar({ query, setQuery, onSubmit, compact }) {
  const today = new Date().toISOString().slice(0, 10);
  const tmrw = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  return (
    <form className={"searchbar" + (compact ? " compact" : "")} onSubmit={(e) => {e.preventDefault();onSubmit && onSubmit();}} style={{ borderRadius: "15px" }}>
      <div className="search-field">
        <Icon name="cal" />
        <div className="search-col">
          <label>Du</label>
          <input type="date" value={query.from || today} onChange={(e) => setQuery({ ...query, from: e.target.value })} />
        </div>
      </div>
      <div className="search-divider" />
      <div className="search-field">
        <Icon name="cal" />
        <div className="search-col">
          <label>Au</label>
          <input type="date" value={query.to || tmrw} onChange={(e) => setQuery({ ...query, to: e.target.value })} />
        </div>
      </div>
      <div className="search-divider" />
      <div className="search-field">
        <Icon name="users" />
        <div className="search-col">
          <label>Personnes</label>
          <select value={query.people} onChange={(e) => setQuery({ ...query, people: +e.target.value })}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n} {n > 1 ? "personnes" : "personne"}</option>)}
          </select>
        </div>
      </div>
      <button className="btn btn-primary search-btn" type="submit" style={{ borderRadius: "20px" }}>
        <Icon name="search" size={18} />
        <span>Rechercher</span>
      </button>
    </form>);

}

// ============ BREADCRUMB ============
function Breadcrumb({ trail, setPage }) {
  return (
    <nav className="breadcrumb" aria-label="Fil d'Ariane">
      <div className="breadcrumb-inner">
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1;
          return (
            <React.Fragment key={i}>
              {i > 0 && <span className="bc-sep" aria-hidden="true">›</span>}
              {item.page && !isLast ? (
                <button className="bc-link" onClick={() => setPage(item.page)}>{item.label}</button>
              ) : (
                <span className="bc-current" aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}

Object.assign(window, { BOATS, PORTS, fmtPrice, Star, Heart, Icon, applyTheme, Nav, SearchBar, Breadcrumb, TWEAK_DEFAULTS });