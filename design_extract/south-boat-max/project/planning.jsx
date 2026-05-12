/* global React, BOATS, fmtPrice, Icon, Footer */
const { useState, useMemo } = React;

// ============ DATA ============
// Month-view reservations: day-range based
const RESERVATIONS = {
  1: [
    { start: 3, end: 5, status: "booked", client: "Famille Lambert" },
    { start: 9, end: 12, status: "option", client: "Pré-réservation" },
    { start: 18, end: 22, status: "booked", client: "Société Marlow" },
    { start: 28, end: 30, status: "booked", client: "Anniversaire 30 ans" },
  ],
  2: [
    { start: 1, end: 4, status: "booked", client: "M. Dubois" },
    { start: 7, end: 8, status: "maintenance", client: "Entretien moteur" },
    { start: 13, end: 19, status: "booked", client: "Croisière Bertrand" },
    { start: 24, end: 27, status: "option", client: "Pré-réservation" },
  ],
  3: [
    { start: 5, end: 7, status: "booked", client: "Famille Garcia" },
    { start: 14, end: 17, status: "booked", client: "Mariage Léa & Tom" },
    { start: 21, end: 23, status: "option", client: "Pré-réservation" },
  ],
  4: [
    { start: 2, end: 9, status: "booked", client: "Croisière Caron" },
    { start: 15, end: 16, status: "maintenance", client: "Carénage" },
    { start: 20, end: 25, status: "booked", client: "Événement Veolia" },
  ],
  5: [
    { start: 6, end: 7, status: "booked", client: "M. Petit" },
    { start: 11, end: 13, status: "booked", client: "Famille Roche" },
    { start: 17, end: 18, status: "option", client: "Pré-réservation" },
    { start: 25, end: 26, status: "booked", client: "Anniversaire" },
  ],
  6: [
    { start: 4, end: 5, status: "booked", client: "Mme Laurent" },
    { start: 10, end: 14, status: "booked", client: "Famille Vidal" },
    { start: 22, end: 24, status: "option", client: "Pré-réservation" },
  ],
};

// Week-view reservations: keyed by ISO date (yyyy-mm-dd)
// slot: "morning" (8h-13h), "afternoon" (14h-19h), "day" (8h-19h)
// We anchor to the current week so the demo always shows live-looking data.
const baseMonday = (() => {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
})();
const dayISO = (offset) => {
  const d = new Date(baseMonday);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

const WEEK_RESERVATIONS = {
  1: [
    { date: dayISO(0), slot: "morning", status: "booked", client: "M. Lambert" },
    { date: dayISO(1), slot: "afternoon", status: "option", client: "Pré-rés." },
    { date: dayISO(3), slot: "day", status: "booked", client: "Famille Roche" },
    { date: dayISO(5), slot: "morning", status: "booked", client: "M. Petit" },
    { date: dayISO(5), slot: "afternoon", status: "option", client: "Pré-rés." },
  ],
  2: [
    { date: dayISO(0), slot: "day", status: "booked", client: "Société Marlow" },
    { date: dayISO(2), slot: "afternoon", status: "maintenance", client: "Entretien" },
    { date: dayISO(4), slot: "morning", status: "booked", client: "M. Dubois" },
    { date: dayISO(6), slot: "day", status: "booked", client: "Anniv. 40 ans" },
  ],
  3: [
    { date: dayISO(1), slot: "morning", status: "booked", client: "Famille Garcia" },
    { date: dayISO(2), slot: "morning", status: "booked", client: "Famille Garcia" },
    { date: dayISO(4), slot: "afternoon", status: "option", client: "Pré-rés." },
    { date: dayISO(6), slot: "afternoon", status: "booked", client: "Couple Léa" },
  ],
  4: [
    { date: dayISO(0), slot: "afternoon", status: "booked", client: "Croisière Caron" },
    { date: dayISO(1), slot: "day", status: "booked", client: "Croisière Caron" },
    { date: dayISO(3), slot: "morning", status: "maintenance", client: "Carénage" },
    { date: dayISO(5), slot: "day", status: "booked", client: "Événement Veolia" },
  ],
  5: [
    { date: dayISO(2), slot: "morning", status: "booked", client: "Mme Laurent" },
    { date: dayISO(2), slot: "afternoon", status: "option", client: "Pré-rés." },
    { date: dayISO(4), slot: "day", status: "booked", client: "Famille Vidal" },
  ],
  6: [
    { date: dayISO(0), slot: "afternoon", status: "option", client: "Pré-rés." },
    { date: dayISO(3), slot: "day", status: "booked", client: "M. Bertrand" },
    { date: dayISO(6), slot: "morning", status: "booked", client: "M. Renaud" },
  ],
};

// Hours displayed in week view (8h → 19h)
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8);
const SLOT_RANGE = {
  morning: { startH: 8, endH: 13, label: "Matin (8h–13h)" },
  afternoon: { startH: 14, endH: 19, label: "Après-midi (14h–19h)" },
  day: { startH: 8, endH: 19, label: "Journée (8h–19h)" },
};

const STATUS_COLOR = {
  booked: "var(--navy)",
  option: "#5BAEDC",
  maintenance: "#C9D5E2",
};
const STATUS_LABEL = {
  booked: "Réservé",
  option: "En option",
  maintenance: "Indisponible",
};

// ============ COMPONENT ============
function PlanningPage({ setPage }) {
  const today = new Date();
  const [mode, setMode] = useState("month"); // "month" | "week"
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [weekOffset, setWeekOffset] = useState(0); // weeks from baseMonday
  const [statusFilter, setStatusFilter] = useState("all");
  const [hoverRes, setHoverRes] = useState(null);

  // ===== MONTH HELPERS =====
  const first = new Date(view.y, view.m, 1);
  const last = new Date(view.y, view.m + 1, 0);
  const daysInMonth = last.getDate();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthName = first.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const isWeekend = (d) => {
    const day = new Date(view.y, view.m, d).getDay();
    return day === 0 || day === 6;
  };

  // ===== WEEK HELPERS =====
  const weekStart = useMemo(() => {
    const d = new Date(baseMonday);
    d.setDate(d.getDate() + weekOffset * 7);
    return d;
  }, [weekOffset]);
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  }), [weekStart]);
  const weekLabel = useMemo(() => {
    const e = new Date(weekStart); e.setDate(e.getDate() + 6);
    const sm = weekStart.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
    const em = e.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
    return `${sm} → ${em}`;
  }, [weekStart]);

  // ===== FILTERS =====
  const matchStatus = (s) => statusFilter === "all" || s === statusFilter;
  const filteredMonthRes = (boatId) => (RESERVATIONS[boatId] || []).filter((r) => matchStatus(r.status));
  const filteredWeekRes = (boatId) => (WEEK_RESERVATIONS[boatId] || []).filter((r) => matchStatus(r.status));

  // ===== STATS =====
  const totals = useMemo(() => {
    if (mode === "month") {
      let booked = 0, option = 0;
      Object.values(RESERVATIONS).forEach((arr) => arr.forEach((r) => {
        const len = r.end - r.start + 1;
        if (r.status === "booked") booked += len;
        if (r.status === "option") option += len;
      }));
      const total = BOATS.length * daysInMonth;
      return { booked, option, rate: Math.round((booked / total) * 100), unit: "Jours" };
    }
    // week
    const slotHours = (s) => SLOT_RANGE[s].endH - SLOT_RANGE[s].startH;
    let bookedH = 0, optionH = 0;
    Object.values(WEEK_RESERVATIONS).forEach((arr) => arr.forEach((r) => {
      const h = slotHours(r.slot);
      if (r.status === "booked") bookedH += h;
      if (r.status === "option") optionH += h;
    }));
    const total = BOATS.length * 7 * 11; // 11 hours/day window
    return { booked: bookedH, option: optionH, rate: Math.round((bookedH / total) * 100), unit: "Heures" };
  }, [mode, daysInMonth]);

  // ===== HEADER =====
  const goPrev = () => {
    if (mode === "month") setView({ y: view.m === 0 ? view.y - 1 : view.y, m: (view.m + 11) % 12 });
    else setWeekOffset((w) => w - 1);
  };
  const goNext = () => {
    if (mode === "month") setView({ y: view.m === 11 ? view.y + 1 : view.y, m: (view.m + 1) % 12 });
    else setWeekOffset((w) => w + 1);
  };
  const goToday = () => {
    if (mode === "month") setView({ y: today.getFullYear(), m: today.getMonth() });
    else setWeekOffset(0);
  };

  return (
    <main className="planning">
      <section className="planning-head">
        <div>
          <p className="eyebrow">Disponibilités</p>
          <h1>Planning de la flotte</h1>
          <p className="lead">Vue d'ensemble des réservations en temps réel. Choisissez la vue mensuelle ou semaine par tranches horaires.</p>
        </div>

        <div className="planning-stats">
          <div className="pstat">
            <span className="pstat-num">{totals.rate}%</span>
            <span className="pstat-lbl">Taux d'occupation</span>
          </div>
          <div className="pstat">
            <span className="pstat-num">{totals.booked}</span>
            <span className="pstat-lbl">{totals.unit} réservés</span>
          </div>
          <div className="pstat">
            <span className="pstat-num">{totals.option}</span>
            <span className="pstat-lbl">{totals.unit} en option</span>
          </div>
        </div>
      </section>

      <section className="planning-toolbar">
        <div className="month-nav">
          <div className="view-switch">
            <button className={"vs-btn" + (mode === "month" ? " active" : "")} onClick={() => setMode("month")}>Mois</button>
            <button className={"vs-btn" + (mode === "week" ? " active" : "")} onClick={() => setMode("week")}>Semaine</button>
          </div>
          <button className="icon-btn" onClick={goPrev}><Icon name="arrowL" size={16} /></button>
          <h2 className="month-title">{mode === "month" ? monthName : weekLabel}</h2>
          <button className="icon-btn" onClick={goNext}><Icon name="arrow" size={16} /></button>
          <button className="btn btn-ghost today-btn" onClick={goToday}>Aujourd'hui</button>
        </div>

        <div className="planning-legend">
          {[
            { id: "all", label: "Tout" },
            { id: "booked", label: "Réservé" },
            { id: "option", label: "En option" },
            { id: "maintenance", label: "Indisponible" },
          ].map((f) => (
            <button key={f.id} className={"chip" + (statusFilter === f.id ? " active" : "")} onClick={() => setStatusFilter(f.id)}>
              {f.id !== "all" && <span className="chip-dot" style={{ background: STATUS_COLOR[f.id] }} />}
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {mode === "month" ? (
        <section className="planning-grid-wrap">
          <div className="planning-grid" style={{ "--days": daysInMonth }}>
            <div className="pg-corner"><span>Bateau</span></div>
            <div className="pg-days">
              {monthDays.map((d) => (
                <div key={d} className={"pg-day" + (isWeekend(d) ? " weekend" : "")}>
                  <span className="pg-day-num">{d}</span>
                  <span className="pg-day-dow">{["D","L","M","M","J","V","S"][new Date(view.y, view.m, d).getDay()]}</span>
                </div>
              ))}
            </div>

            {BOATS.map((boat) => (
              <React.Fragment key={boat.id}>
                <button className="pg-boat" onClick={() => setPage({ name: "detail", id: boat.id })}>
                  <img src={boat.images[0]} alt={boat.name} />
                  <div className="pg-boat-info">
                    <strong>{boat.name}</strong>
                    <span>{boat.port} · {fmtPrice(boat.price)}/j</span>
                  </div>
                </button>
                <div className="pg-row">
                  {monthDays.map((d) => (
                    <div key={d} className={"pg-cell" + (isWeekend(d) ? " weekend" : "")} onClick={() => setPage({ name: "booking", id: boat.id })} />
                  ))}
                  {filteredMonthRes(boat.id).map((r, i) => (
                    <div key={i} className="pg-block" style={{
                      left: `calc((${r.start - 1} / ${daysInMonth}) * 100%)`,
                      width: `calc(((${r.end - r.start + 1}) / ${daysInMonth}) * 100% - 2px)`,
                      background: STATUS_COLOR[r.status],
                    }}
                    onMouseEnter={() => setHoverRes({ ...r, boat: boat.name, range: `du ${r.start} au ${r.end}` })}
                    onMouseLeave={() => setHoverRes(null)}>
                      <span className="pg-block-label">{r.client}</span>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>

          {hoverRes && (
            <div className="pg-tooltip">
              <span className="pg-tip-dot" style={{ background: STATUS_COLOR[hoverRes.status] }} />
              <strong>{hoverRes.boat}</strong>
              <span>· {hoverRes.client}</span>
              <span className="muted">· {hoverRes.range} · {STATUS_LABEL[hoverRes.status]}</span>
            </div>
          )}
        </section>
      ) : (
        <section className="planning-grid-wrap week">
          <div className="week-grid" style={{ "--hours": HOURS.length }}>
            <div className="wk-corner">
              <span>Bateau</span>
            </div>
            <div className="wk-days">
              {weekDays.map((d, i) => {
                const isToday = d.toDateString() === today.toDateString();
                return (
                  <div key={i} className={"wk-day" + (isToday ? " today" : "")}>
                    <span className="wk-day-dow">{d.toLocaleDateString("fr-FR", { weekday: "short" })}</span>
                    <span className="wk-day-num">{d.getDate()}</span>
                    <div className="wk-hours">
                      {HOURS.map((h) => (
                        <span key={h} className={"wk-hour" + (h === 12 ? " noon" : "")}>{h}h</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {BOATS.map((boat) => (
              <React.Fragment key={boat.id}>
                <button className="pg-boat" onClick={() => setPage({ name: "detail", id: boat.id })}>
                  <img src={boat.images[0]} alt={boat.name} />
                  <div className="pg-boat-info">
                    <strong>{boat.name}</strong>
                    <span>{boat.port} · {fmtPrice(boat.price)}/j</span>
                  </div>
                </button>
                <div className="wk-row">
                  {weekDays.map((d, di) => {
                    const iso = d.toISOString().slice(0, 10);
                    const dayRes = filteredWeekRes(boat.id).filter((r) => r.date === iso);
                    return (
                      <div key={di} className="wk-day-col" onClick={() => setPage({ name: "booking", id: boat.id })}>
                        {/* hour grid lines */}
                        <div className="wk-hour-lines">
                          {HOURS.map((h) => <span key={h} className={h === 12 ? "noon" : ""} />)}
                        </div>
                        {/* mid-day separator */}
                        <div className="wk-noon-sep" />
                        {dayRes.map((r, i) => {
                          const range = SLOT_RANGE[r.slot];
                          const total = HOURS[HOURS.length - 1] - HOURS[0] + 1;
                          const left = ((range.startH - HOURS[0]) / total) * 100;
                          const width = ((range.endH - range.startH) / total) * 100;
                          return (
                            <div key={i} className="wk-block" style={{
                              left: `${left}%`,
                              width: `calc(${width}% - 2px)`,
                              background: STATUS_COLOR[r.status],
                            }}
                            onMouseEnter={() => setHoverRes({ ...r, boat: boat.name, range: range.label })}
                            onMouseLeave={() => setHoverRes(null)}>
                              <span className="wk-block-slot">{r.slot === "morning" ? "Matin" : r.slot === "afternoon" ? "Après-midi" : "Journée"}</span>
                              <span className="wk-block-client">{r.client}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            ))}
          </div>

          {hoverRes && (
            <div className="pg-tooltip">
              <span className="pg-tip-dot" style={{ background: STATUS_COLOR[hoverRes.status] }} />
              <strong>{hoverRes.boat}</strong>
              <span>· {hoverRes.client}</span>
              <span className="muted">· {hoverRes.range} · {STATUS_LABEL[hoverRes.status]}</span>
            </div>
          )}
        </section>
      )}

      <section className="planning-cta">
        <div>
          <h3>Une date précise en tête ?</h3>
          <p>Trouvez le bateau parfait en quelques secondes via le moteur de recherche.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setPage({ name: "catalog" })}>
          Lancer une recherche <Icon name="arrow" size={16} />
        </button>
      </section>

      <Footer />
    </main>
  );
}

window.PlanningPage = PlanningPage;
