/* global React, Icon, Footer, Breadcrumb */
/* var : scripts classiques séparés partageant la portée globale (cf. app.jsx). */
var { useState, useMemo } = React;

// ============ DATA ============
// Liste des feux d'artifice prévus sur la Côte d'Azur (été 2026).
// Pour ajouter / modifier une date : éditez ce tableau, puis lancez `npm run build`.
const FIREWORKS = [
  { date: "2026-07-04", city: "Cannes",        event: "Festival d'Art Pyrotechnique",          event_en: "Pyrotechnic Art Festival",          time: "22h00", place: "Baie de Cannes",                  place_en: "Bay of Cannes" },
  { date: "2026-07-13", city: "Antibes",       event: "Fête nationale",                         event_en: "Bastille Day",                       time: "22h00", place: "Entre le Fort Carré et la Siesta", place_en: "Between Fort Carré and La Siesta" },
  { date: "2026-07-14", city: "Juan-les-Pins", event: "Fête nationale",                         event_en: "Bastille Day",                       time: "23h00", place: "Baie de Juan-les-Pins",           place_en: "Bay of Juan-les-Pins" },
  { date: "2026-07-14", city: "Cannes",        event: "Festival d'Art Pyrotechnique",          event_en: "Pyrotechnic Art Festival",          time: "23h00", place: "Baie de Cannes",                  place_en: "Bay of Cannes" },
  { date: "2026-07-22", city: "Cannes",        event: "Festival d'Art Pyrotechnique",          event_en: "Pyrotechnic Art Festival",          time: "22h00", place: "Baie de Cannes",                  place_en: "Bay of Cannes" },
  { date: "2026-08-04", city: "Cannes",        event: "Festival d'Art Pyrotechnique",          event_en: "Pyrotechnic Art Festival",          time: "22h00", place: "Baie de Cannes",                  place_en: "Bay of Cannes" },
  { date: "2026-08-06", city: "Juan-les-Pins", event: "Festival Pyromélodique",                 event_en: "Pyromelodic Festival",               time: "22h00", place: "Baie de Juan-les-Pins",           place_en: "Bay of Juan-les-Pins" },
  { date: "2026-08-13", city: "Juan-les-Pins", event: "Festival Pyromélodique",                 event_en: "Pyromelodic Festival",               time: "22h00", place: "Baie de Juan-les-Pins",           place_en: "Bay of Juan-les-Pins" },
  { date: "2026-08-15", city: "Cannes",        event: "Festival d'Art Pyrotechnique",          event_en: "Pyrotechnic Art Festival",          time: "22h00", place: "Baie de Cannes",                  place_en: "Bay of Cannes" },
  { date: "2026-08-20", city: "Juan-les-Pins", event: "Festival Pyromélodique",                 event_en: "Pyromelodic Festival",               time: "22h00", place: "Baie de Juan-les-Pins",           place_en: "Bay of Juan-les-Pins" },
  { date: "2026-08-24", city: "Antibes",       event: "Festival Pyromélodique de clôture",      event_en: "Closing Pyromelodic Festival",       time: "22h00", place: "Route du bord de mer",            place_en: "Seafront road" },
  { date: "2026-08-24", city: "Cannes",        event: "Festival d'Art Pyrotechnique (finale)", event_en: "Pyrotechnic Art Festival (finale)", time: "22h00", place: "Baie de Cannes",                  place_en: "Bay of Cannes" },
  { date: "2026-07-15", city: "Golfe-Juan",    event: "Feu d'artifice",                         event_en: "Fireworks display",                  time: "22h15", place: "Baie de Golfe-Juan",              place_en: "Bay of Golfe-Juan" },
  { date: "2026-08-16", city: "Golfe-Juan",    event: "Feu d'artifice",                         event_en: "Fireworks display",                  time: "22h15", place: "Baie de Golfe-Juan",              place_en: "Bay of Golfe-Juan" },
];

const fwLocale = (lang) => (lang === "en" ? "en-GB" : "fr-FR");
const fwFmtDate = (iso, lang) => {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString(fwLocale(lang), { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};
const fwFmtShortDate = (iso, lang) => {
  const d = new Date(iso + "T12:00:00");
  return {
    day: d.getDate(),
    month: d.toLocaleDateString(fwLocale(lang), { month: "short" }).replace(".", ""),
    weekday: d.toLocaleDateString(fwLocale(lang), { weekday: "short" }).replace(".", ""),
  };
};

// ============ COMPONENT ============
function FireworksPage({ setPage }) {
  const t = window.useT();
  const [cityFilter, setCityFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  // Vidéo du spectacle en fond du bandeau (grand écran uniquement).
  const videoFond = window.useVideoFond();
  const [videoPrete, setVideoPrete] = useState(false);
  // SEO : VideoObject du spectacle vu depuis la mer.
  window.useJsonLd("ld-video-feux", window.ficheVideo({
    nom: "Feux d'artifice de la Côte d'Azur vus depuis la mer",
    description: "Spectacle pyrotechnique filmé depuis un bateau au mouillage dans la baie, au large de Cannes. Sorties en bateau les soirs de feux d'artifice avec South Boat.",
    fichier: "videos/feux-artifice-mer.mp4",
    vignette: "images/drone/feux-artifice-poster-video.jpg",
    duree: "PT9S",
  }));

  // Nom d'événement / lieu selon la langue (fallback FR si l'anglais manque)
  const evName = (f) => t(f.event, f.event_en || f.event);
  const plName = (f) => t(f.place, f.place_en || f.place);

  const cities = useMemo(() => {
    const set = new Set(FIREWORKS.map((f) => f.city));
    return ["all", ...Array.from(set)];
  }, []);

  const todayISO = new Date().toISOString().slice(0, 10);

  const upcoming = useMemo(() => {
    return FIREWORKS
      .filter((f) => f.date >= todayISO)
      .filter((f) => cityFilter === "all" || f.city === cityFilter)
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [cityFilter, todayISO]);

  const stats = useMemo(() => {
    const future = FIREWORKS.filter((f) => f.date >= todayISO);
    return {
      total: future.length,
      cities: new Set(future.map((f) => f.city)).size,
    };
  }, [todayISO]);

  return (
    <main className="planning planning-v2">
      <style>{`
        .fw-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .fw-card { display: flex; gap: 14px; align-items: stretch; padding: 16px; border-radius: 16px; background: var(--surface, #fff); border: 1px solid var(--line, rgba(10,37,64,0.08)); box-shadow: 0 1px 2px rgba(11,31,58,0.04); transition: transform .15s ease, box-shadow .18s ease; }
        .fw-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(11,31,58,0.1); }
        .fw-date { flex: 0 0 64px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding: 10px 6px; border-radius: 12px; background: linear-gradient(160deg, #0A2540 0%, #163E68 100%); color: #fff; text-align: center; }
        .fw-date .fw-d-weekday { font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.75; }
        .fw-date .fw-d-day { font-size: 26px; font-weight: 800; line-height: 1; }
        .fw-date .fw-d-month { font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.9; }
        .fw-body { display: flex; flex-direction: column; gap: 4px; min-width: 0; flex: 1; }
        .fw-city { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #5BAEDC; }
        .fw-event { font-size: 15px; font-weight: 700; color: var(--ink, #0A2540); line-height: 1.25; }
        .fw-meta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 6px; font-size: 12.5px; color: var(--ink-soft, #3B5872); }
        .fw-meta span { display: inline-flex; align-items: center; gap: 4px; }
        .fw-meta svg { color: #5BAEDC; }

        .fw-toolbar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: space-between; margin-top: 40px; margin-bottom: 18px; }
        .fw-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .fw-chip { padding: 7px 14px; border-radius: 999px; border: 1px solid var(--line, rgba(10,37,64,0.12)); background: transparent; font-family: inherit; font-size: 13px; font-weight: 500; color: var(--ink-soft, #3B5872); cursor: pointer; transition: background .15s ease, color .15s ease, border-color .15s ease; }
        .fw-chip:hover { border-color: var(--ink, #0A2540); color: var(--ink, #0A2540); }
        .fw-chip.active { background: var(--navy, #0A2540); color: #fff; border-color: var(--navy, #0A2540); }

        .fw-empty { padding: 36px 20px; text-align: center; color: var(--ink-muted, #7C92A8); border: 1px dashed var(--line, rgba(10,37,64,0.12)); border-radius: 14px; }

        .fw-pricing { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 36px; }
        .fw-price-card { position: relative; padding: 22px 22px 20px; border-radius: 18px; background: var(--surface, #fff); border: 1px solid var(--line, rgba(10,37,64,0.10)); box-shadow: 0 1px 2px rgba(11,31,58,0.04); display: flex; flex-direction: column; gap: 10px; }
        .fw-price-card.featured { background: linear-gradient(160deg, #0A2540 0%, #163E68 100%); color: #fff; border-color: transparent; }
        .fw-price-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: #5BAEDC; }
        .fw-price-card.featured .fw-price-eyebrow { color: #9CD0F0; }
        .fw-price-title { font-size: 19px; font-weight: 700; line-height: 1.2; color: var(--ink, #0A2540); }
        .fw-price-card.featured .fw-price-title { color: #fff; }
        .fw-price-hours { font-size: 13px; color: var(--ink-soft, #3B5872); display: inline-flex; align-items: center; gap: 6px; }
        .fw-price-card.featured .fw-price-hours { color: rgba(255,255,255,0.78); }
        .fw-price-amount { font-size: 34px; font-weight: 800; letter-spacing: -0.01em; line-height: 1; margin-top: 4px; color: var(--ink, #0A2540); }
        .fw-price-card.featured .fw-price-amount { color: #fff; }
        .fw-price-from { display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.72; margin-bottom: 3px; }
        .fw-price-list { list-style: none; padding: 0; margin: 6px 0 0; display: flex; flex-direction: column; gap: 6px; font-size: 13.5px; color: var(--ink-soft, #3B5872); }
        .fw-price-card.featured .fw-price-list { color: rgba(255,255,255,0.85); }
        .fw-price-list li { display: flex; align-items: flex-start; gap: 8px; }
        .fw-price-list li::before { content: "✓"; color: #5BAEDC; font-weight: 700; margin-top: 1px; }
        .fw-price-card.featured .fw-price-list li::before { color: #9CD0F0; }

        .fw-modal-backdrop { position: fixed; inset: 0; background: rgba(11,31,58,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; animation: fw-fade .15s ease; }
        @keyframes fw-fade { from { opacity: 0 } to { opacity: 1 } }
        .fw-modal { background: #fff; border-radius: 18px; padding: 24px; max-width: 420px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-height: 90vh; overflow-y: auto; }
        .fw-modal-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: #5BAEDC; margin-bottom: 4px; }
        .fw-modal-title { margin: 0 0 4px; font-size: 18px; color: #0B1F3A; line-height: 1.25; }
        .fw-modal-date { margin: 0 0 16px; font-size: 13px; color: #6B7A8E; }
        .fw-modal-slots { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
        .fw-modal-hours { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; padding: 12px 14px; background: #F4F8FB; border-radius: 10px; }
        .fw-modal-hours-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; font-size: 13px; }
        .fw-modal-hours-row .fmh-label { color: #5b6b7a; font-weight: 500; }
        .fw-modal-hours-row .fmh-val { color: #0A2540; font-weight: 700; }
        .fw-modal-slot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 14px; border-radius: 10px; border: 1px solid #E5E9EF; cursor: pointer; font-family: inherit; background: #fff; text-align: left; transition: filter .15s ease, transform .1s ease, border-color .15s ease; }
        .fw-modal-slot:hover { border-color: #0B1F3A; transform: translateY(-1px); }
        .fw-modal-slot.active { background: #0A2540; color: #fff; border-color: #0A2540; }
        .fw-modal-slot .fms-name { font-weight: 700; font-size: 14px; }
        .fw-modal-slot .fms-hours { font-size: 11.5px; opacity: 0.75; }
        .fw-modal-contact { margin-top: 6px; padding: 14px; background: #F4F8FB; border-radius: 12px; }
        .fw-modal-contact-head { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #5b6b7a; margin-bottom: 10px; }
        .fw-modal-phones { display: flex; flex-direction: column; gap: 8px; }
        .fw-modal-phone { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: #fff; border-radius: 10px; border: 1px solid #E5E9EF; text-decoration: none; color: #0A2540; font-weight: 600; }
        .fw-modal-phone:hover { border-color: #0A2540; }
        .fw-modal-phone svg { color: #5BAEDC; flex-shrink: 0; }
        .fw-modal-phone .fmp-name { font-size: 12.5px; color: #6B7A8E; font-weight: 500; }
        .fw-modal-phone .fmp-num { font-size: 14.5px; }
        .fw-modal-note { margin-top: 12px; padding: 10px 12px; background: #FFF8E6; border: 1px solid #F2D49A; border-radius: 10px; font-size: 12.5px; color: #8A5A00; line-height: 1.45; }
        .fw-modal-close { margin-top: 14px; width: 100%; padding: 10px; border-radius: 10px; border: 1px solid #E5E9EF; background: #fff; color: #6B7A8E; font-weight: 500; cursor: pointer; font-family: inherit; font-size: 13px; }
        .fw-modal-close:hover { background: #F8F9FB; }

        @media (max-width: 480px) {
          .fw-card { padding: 12px; gap: 10px; }
          .fw-date { flex-basis: 56px; padding: 8px 4px; }
          .fw-date .fw-d-day { font-size: 22px; }
        }
      `}</style>

      <Breadcrumb setPage={setPage} trail={[
        { label: t("Accueil", "Home"), page: { name: "home" } },
        { label: t("Feux d'artifice", "Fireworks") },
      ]} />

      {/* Bandeau : vraies images du spectacle vu depuis la baie. La photo
          s'affiche tout de suite, la vidéo prend le relais en fondu sur
          grand écran uniquement. */}
      <section className="fw-hero">
        <div className="fw-hero-media">
          <img src={asset("images/drone/feux-artifice-cannes-bateau-mer.jpg")}
               alt={t("Feux d'artifice au-dessus de la baie, vus depuis un bateau au mouillage", "Fireworks above the bay, seen from a boat at anchor")}
               fetchpriority="high" decoding="async" />
          {videoFond && (
            <video
              className={videoPrete ? "pret" : ""}
              autoPlay muted loop playsInline preload="auto"
              poster={asset("images/drone/feux-artifice-poster-video.jpg")}
              onCanPlay={() => setVideoPrete(true)}
              aria-hidden="true" tabIndex={-1}>
              <source src={asset("videos/feux-artifice-mer.mp4")} type="video/mp4" />
            </video>
          )}
        </div>

      <section className="planning-head">
        <div>
          <p className="eyebrow">{t("Feux d'artifice", "Fireworks")}</p>
          <h1>{t("Vivez les feux d'artifice depuis la mer", "Experience the fireworks from the sea")}</h1>
          <p className="lead">{t(
            "Le calendrier des grands rendez-vous pyrotechniques de la Côte d'Azur — Cannes, Antibes, Juan-les-Pins. Réservez votre bateau pour les admirer depuis la baie.",
            "The calendar of the French Riviera's great fireworks nights — Cannes, Antibes, Juan-les-Pins. Book your boat to watch them from the bay."
          )}</p>
        </div>

        <div className="planning-stats">
          <div className="pstat">
            <span className="pstat-num">{stats.total}</span>
            <span className="pstat-lbl">{t("Soirées à venir", "Upcoming nights")}</span>
          </div>
          <div className="pstat">
            <span className="pstat-num">{stats.cities}</span>
            <span className="pstat-lbl">{t("Villes", "Towns")}</span>
          </div>
        </div>
      </section>
      </section>

      <section className="planning-calendar">
        <div className="fw-pricing">
          <article className="fw-price-card">
            <span className="fw-price-eyebrow">{t("Sortie Sunset", "Sunset trip")}</span>
            <span className="fw-price-title">{t("Coucher de soleil en mer", "Sunset at sea")}</span>
            <span className="fw-price-hours"><Icon name="cal" size={14} /> 19h00 — 22h30</span>
            <span className="fw-price-amount">250 €</span>
            <ul className="fw-price-list">
              <li>{t("Essence incluse", "Fuel included")}</li>
              <li>{t("Boissons incluses (sur demande)", "Drinks included (on request)")}</li>
            </ul>
          </article>
          <article className="fw-price-card featured">
            <span className="fw-price-eyebrow">{t("Soirée Feu d'artifice", "Fireworks evening")}</span>
            <span className="fw-price-title">{t("Spectacle pyrotechnique depuis la baie", "Fireworks show from the bay")}</span>
            <span className="fw-price-hours"><Icon name="cal" size={14} /> 19h00 — 23h00</span>
            <span className="fw-price-amount"><small className="fw-price-from">{t("à partir de", "from")}</small>390 €</span>
            <ul className="fw-price-list">
              <li>{t("Forfait 4 personnes — 390 €", "4-person package — €390")}</li>
              <li>{t("Forfait 6 personnes — 490 €", "6-person package — €490")}</li>
              <li>{t("Skipper inclus", "Skipper included")}</li>
              <li>{t("Essence incluse", "Fuel included")}</li>
              <li>{t("Boissons incluses (sur demande)", "Drinks included (on request)")}</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="planning-calendar">
        <div className="fw-toolbar">
          <div className="fw-chips" role="tablist" aria-label={t("Filtrer par ville", "Filter by town")}>
            {cities.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cityFilter === c}
                className={"fw-chip" + (cityFilter === c ? " active" : "")}
                onClick={() => setCityFilter(c)}>
                {c === "all" ? t("Toutes les villes", "All towns") : c}
              </button>
            ))}
          </div>
        </div>

        {upcoming.length === 0 ? (
          <div className="fw-empty">{t("Aucun feu d'artifice à venir pour ce filtre.", "No upcoming fireworks for this filter.")}</div>
        ) : (
          <div className="fw-grid">
            {upcoming.map((f, i) => {
              const sd = fwFmtShortDate(f.date, t.lang);
              return (
                <article key={i} className="fw-card" title={t("Réserver pour le ", "Book for ") + fwFmtDate(f.date, t.lang)} role="button" tabIndex={0} onClick={() => setSelected(f)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(f); } }} style={{ cursor: "pointer" }}>
                  <div className="fw-date" aria-hidden="true">
                    <span className="fw-d-weekday">{sd.weekday}</span>
                    <span className="fw-d-day">{sd.day}</span>
                    <span className="fw-d-month">{sd.month}</span>
                  </div>
                  <div className="fw-body">
                    <span className="fw-city">{f.city}</span>
                    <span className="fw-event">{evName(f)}</span>
                    <div className="fw-meta">
                      <span><Icon name="cal" size={14} /> {f.time}</span>
                      <span><Icon name="pin" size={14} /> {plName(f)}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="planning-cta">
        <div>
          <h3>{t("Une soirée feu d'artifice en mer ?", "A fireworks evening at sea?")}</h3>
          <p>{t("Réservez votre bateau pour profiter du spectacle depuis la baie, loin de la foule.", "Book your boat to enjoy the show from the bay, away from the crowds.")}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setPage({ name: "catalog" })}>
          {t("Voir les bateaux", "See the boats")} <Icon name="arrow" size={16} />
        </button>
      </section>

      <Footer />

      {selected && (
        <div className="fw-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="fw-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="fw-modal-eyebrow">{selected.city}</div>
            <h3 className="fw-modal-title">{evName(selected)}</h3>
            <p className="fw-modal-date">{fwFmtDate(selected.date, t.lang)} · {selected.time} · {plName(selected)}</p>

            <div className="fw-modal-hours">
              <div className="fw-modal-hours-row"><span className="fmh-label">{t("Soirée feu d'artifice", "Fireworks evening")}</span><span className="fmh-val">19h00 — 23h00</span></div>
            </div>

            <div className="fw-modal-contact">
              <div className="fw-modal-contact-head">{t("Réserver par téléphone", "Book by phone")}</div>
              <div className="fw-modal-phones">
                <a href="tel:+33634491621" className="fw-modal-phone">
                  <Icon name="phone" size={18} />
                  <span><span className="fmp-name">Maxim</span><br /><span className="fmp-num">06 34 49 16 21</span></span>
                </a>
                <a href="tel:+33786237848" className="fw-modal-phone">
                  <Icon name="phone" size={18} />
                  <span><span className="fmp-name">Vincent</span><br /><span className="fmp-num">07 86 23 78 48</span></span>
                </a>
              </div>
              <div className="fw-modal-note">
                {t("Les réservations se font par téléphone ou directement sur place, dans la limite des places disponibles.",
                   "Bookings are made by phone or directly on site, subject to availability.")}
              </div>
            </div>

            <button className="fw-modal-close" onClick={() => setSelected(null)}>{t("Fermer", "Close")}</button>
          </div>
        </div>
      )}
    </main>
  );
}

window.FireworksPage = FireworksPage;
