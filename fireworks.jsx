/* global React, Icon, Footer, Breadcrumb */
/* var : scripts classiques séparés partageant la portée globale (cf. app.jsx). */
var { useState, useMemo } = React;

// ============ DATA ============
// Liste des feux d'artifice prévus sur la Côte d'Azur (été 2026).
// Pour ajouter / modifier une date : éditez ce tableau, puis lancez `npm run build`.
const FIREWORKS = [
  { date: "2026-07-04", city: "Cannes",        event: "Festival d'Art Pyrotechnique",          time: "22h00", place: "Baie de Cannes" },
  { date: "2026-07-13", city: "Antibes",       event: "Fête nationale",                         time: "22h00", place: "Entre le Fort Carré et la Siesta" },
  { date: "2026-07-14", city: "Juan-les-Pins", event: "Fête nationale",                         time: "23h00", place: "Baie de Juan-les-Pins" },
  { date: "2026-07-14", city: "Cannes",        event: "Festival d'Art Pyrotechnique",          time: "23h00", place: "Baie de Cannes" },
  { date: "2026-07-22", city: "Cannes",        event: "Festival d'Art Pyrotechnique",          time: "22h00", place: "Baie de Cannes" },
  { date: "2026-08-04", city: "Cannes",        event: "Festival d'Art Pyrotechnique",          time: "22h00", place: "Baie de Cannes" },
  { date: "2026-08-06", city: "Juan-les-Pins", event: "Festival Pyromélodique",                 time: "22h00", place: "Baie de Juan-les-Pins" },
  { date: "2026-08-13", city: "Juan-les-Pins", event: "Festival Pyromélodique",                 time: "22h00", place: "Baie de Juan-les-Pins" },
  { date: "2026-08-15", city: "Cannes",        event: "Festival d'Art Pyrotechnique",          time: "22h00", place: "Baie de Cannes" },
  { date: "2026-08-20", city: "Juan-les-Pins", event: "Festival Pyromélodique",                 time: "22h00", place: "Baie de Juan-les-Pins" },
  { date: "2026-08-24", city: "Antibes",       event: "Festival Pyromélodique de clôture",      time: "22h00", place: "Route du bord de mer" },
  { date: "2026-08-24", city: "Cannes",        event: "Festival d'Art Pyrotechnique (finale)", time: "22h00", place: "Baie de Cannes" },
  { date: "2026-07-15", city: "Golfe-Juan",    event: "Feu d'artifice",                         time: "22h15", place: "Baie de Golfe-Juan" },
  { date: "2026-08-16", city: "Golfe-Juan",    event: "Feu d'artifice",                         time: "22h15", place: "Baie de Golfe-Juan" },
];

const fwFmtDate = (iso) => {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};
const fwFmtShortDate = (iso) => {
  const d = new Date(iso + "T12:00:00");
  return {
    day: d.getDate(),
    month: d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", ""),
    weekday: d.toLocaleDateString("fr-FR", { weekday: "short" }).replace(".", ""),
  };
};

// ============ COMPONENT ============
function FireworksPage({ setPage }) {
  const [cityFilter, setCityFilter] = useState("all");
  const [selected, setSelected] = useState(null);

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

        .fw-toolbar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: space-between; margin-bottom: 18px; }
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
        { label: "Accueil", page: { name: "home" } },
        { label: "Feux d'artifice" },
      ]} />

      <section className="planning-head">
        <div>
          <p className="eyebrow">Feux d'artifice</p>
          <h1>Vivez les feux d'artifice depuis la mer</h1>
          <p className="lead">Le calendrier des grands rendez-vous pyrotechniques de la Côte d'Azur — Cannes, Antibes, Juan-les-Pins. Réservez votre bateau pour les admirer depuis la baie.</p>
        </div>

        <div className="planning-stats">
          <div className="pstat">
            <span className="pstat-num">{stats.total}</span>
            <span className="pstat-lbl">Soirées à venir</span>
          </div>
          <div className="pstat">
            <span className="pstat-num">{stats.cities}</span>
            <span className="pstat-lbl">Villes</span>
          </div>
        </div>
      </section>

      <section className="planning-calendar">
        <div className="fw-toolbar">
          <div className="fw-chips" role="tablist" aria-label="Filtrer par ville">
            {cities.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cityFilter === c}
                className={"fw-chip" + (cityFilter === c ? " active" : "")}
                onClick={() => setCityFilter(c)}>
                {c === "all" ? "Toutes les villes" : c}
              </button>
            ))}
          </div>
        </div>

        {upcoming.length === 0 ? (
          <div className="fw-empty">Aucun feu d'artifice à venir pour ce filtre.</div>
        ) : (
          <div className="fw-grid">
            {upcoming.map((f, i) => {
              const sd = fwFmtShortDate(f.date);
              return (
                <article key={i} className="fw-card" title={"Réserver pour le " + fwFmtDate(f.date)} role="button" tabIndex={0} onClick={() => setSelected(f)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(f); } }} style={{ cursor: "pointer" }}>
                  <div className="fw-date" aria-hidden="true">
                    <span className="fw-d-weekday">{sd.weekday}</span>
                    <span className="fw-d-day">{sd.day}</span>
                    <span className="fw-d-month">{sd.month}</span>
                  </div>
                  <div className="fw-body">
                    <span className="fw-city">{f.city}</span>
                    <span className="fw-event">{f.event}</span>
                    <div className="fw-meta">
                      <span><Icon name="cal" size={14} /> {f.time}</span>
                      <span><Icon name="pin" size={14} /> {f.place}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="planning-calendar">
        <div className="fw-pricing">
          <article className="fw-price-card">
            <span className="fw-price-eyebrow">Sortie Sunset</span>
            <span className="fw-price-title">Coucher de soleil en mer</span>
            <span className="fw-price-hours"><Icon name="cal" size={14} /> 19h00 — 22h30</span>
            <span className="fw-price-amount">250 €</span>
            <ul className="fw-price-list">
              <li>Essence incluse</li>
              <li>Boissons incluses (sur demande)</li>
            </ul>
          </article>
          <article className="fw-price-card featured">
            <span className="fw-price-eyebrow">Soirée Feu d'artifice</span>
            <span className="fw-price-title">Spectacle pyrotechnique depuis la baie</span>
            <span className="fw-price-hours"><Icon name="cal" size={14} /> 19h00 — 23h00</span>
            <span className="fw-price-amount">350 €</span>
            <ul className="fw-price-list">
              <li>Essence incluse</li>
              <li>Boissons incluses (sur demande)</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="planning-cta">
        <div>
          <h3>Une soirée feu d'artifice en mer ?</h3>
          <p>Réservez votre bateau pour profiter du spectacle depuis la baie, loin de la foule.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setPage({ name: "catalog" })}>
          Voir les bateaux <Icon name="arrow" size={16} />
        </button>
      </section>

      <Footer />

      {selected && (
        <div className="fw-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="fw-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="fw-modal-eyebrow">{selected.city}</div>
            <h3 className="fw-modal-title">{selected.event}</h3>
            <p className="fw-modal-date">{fwFmtDate(selected.date)} · {selected.time} · {selected.place}</p>

            <div className="fw-modal-hours">
              <div className="fw-modal-hours-row"><span className="fmh-label">Soirée feu d'artifice</span><span className="fmh-val">19h00 — 23h00</span></div>
            </div>

            <div className="fw-modal-contact">
              <div className="fw-modal-contact-head">Réserver par téléphone</div>
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
                Les réservations se font par téléphone ou directement sur place, dans la limite des places disponibles.
              </div>
            </div>

            <button className="fw-modal-close" onClick={() => setSelected(null)}>Fermer</button>
          </div>
        </div>
      )}
    </main>
  );
}

window.FireworksPage = FireworksPage;
