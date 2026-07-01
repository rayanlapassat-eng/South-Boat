/* global React, BOATS, fmtPrice, Icon, Footer, Breadcrumb */
/* var : scripts classiques séparés partageant la portée globale (cf. app.jsx). */
var { useState, useMemo } = React;

// ============ DATA ============
// Per-boat reservations keyed by ISO day. status: "booked" | "option" | "maintenance"
// Multi-boat ready : add a key per boat id, with an array of { date, status } items.
const todayMidnight = (() => { const d = new Date(); d.setHours(0,0,0,0); return d; })();
const offsetISO = (offset) => {
  const d = new Date(todayMidnight);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

// slot: "am" (matin) | "pm" (après-midi) | "full" (journée entière)
// Si slot omis, considéré comme "full" pour rétrocompatibilité.
const RESERVATIONS = {
  1: [ // Mochi
    { date: offsetISO(2), slot: "full", status: "booked", client: "Famille Lambert" },
    { date: offsetISO(3), slot: "am",   status: "booked", client: "Sortie M. Durand" },
    { date: offsetISO(4), slot: "pm",   status: "booked", client: "Couple Petit" },
    { date: offsetISO(8), slot: "full", status: "option", client: "Pré-réservation" },
    { date: offsetISO(10), slot: "am",  status: "booked", client: "Anniversaire" },
    { date: offsetISO(14), slot: "full", status: "booked", client: "Société Marlow" },
    { date: offsetISO(15), slot: "full", status: "booked", client: "Société Marlow" },
    { date: offsetISO(22), slot: "full", status: "maintenance", client: "Entretien moteur" },
    { date: offsetISO(28), slot: "pm",  status: "booked", client: "EVJF" },
  ],
};

const SLOTS = [
  { id: "am", label: "Matin", hours: "9h – 13h" },
  { id: "pm", label: "Après-midi", hours: "14h – 18h" },
  { id: "sunset", label: "Sunset", hours: "19h – 22h30" },
];

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

// ============ HELPERS ============
const startOfWeek = (d) => {
  const x = new Date(d); x.setHours(0, 0, 0, 0);
  const dow = (x.getDay() + 6) % 7; // 0 = Lundi
  x.setDate(x.getDate() - dow);
  return x;
};
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

// ============ COMPONENT ============
function PlanningPage({ setPage, initialDate }) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const initial = (() => {
    if (initialDate && /^\d{4}-\d{2}-\d{2}$/.test(initialDate)) {
      const [y, m, d] = initialDate.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    return today;
  })();
  const [view, setView] = useState({ y: initial.getFullYear(), m: initial.getMonth() });
  const [weekStart, setWeekStart] = useState(startOfWeek(initial));
  const highlightISO = initialDate && /^\d{4}-\d{2}-\d{2}$/.test(initialDate) ? initialDate : null;
  const [viewMode, setViewMode] = useState("month"); // "month" | "week"
  const bookableBoats = BOATS.filter((b) => !b.comingSoon);
  const [selectedBoatId, setSelectedBoatId] = useState(bookableBoats[0]?.id ?? null);
  const [pickerDay, setPickerDay] = useState(null); // { date, amInfo, pmInfo }

  // Build map iso -> [{boatId, status, client, slot}]
  const dayMap = useMemo(() => {
    const map = new Map();
    bookableBoats.forEach((b) => {
      (RESERVATIONS[b.id] || []).forEach((r) => {
        if (b.id !== selectedBoatId) return;
        if (!map.has(r.date)) map.set(r.date, []);
        map.get(r.date).push({ boatId: b.id, status: r.status, client: r.client, slot: r.slot || "full" });
      });
    });
    return map;
  }, [selectedBoatId]);

  const first = new Date(view.y, view.m, 1);
  const last = new Date(view.y, view.m + 1, 0);
  const startOff = (first.getDay() + 6) % 7;
  const cells = [];
  for (let i = 0; i < startOff; i++) cells.push(null);
  for (let i = 1; i <= last.getDate(); i++) cells.push(new Date(view.y, view.m, i));
  const monthName = first.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  const considered = bookableBoats.filter((b) => b.id === selectedBoatId);

  // ===== STATS =====
  const stats = useMemo(() => {
    const daysInMonth = last.getDate();
    let availableDays = 0, bookedDays = 0;
    for (let i = 1; i <= daysInMonth; i++) {
      const iso = new Date(view.y, view.m, i).toISOString().slice(0, 10);
      const items = dayMap.get(iso) || [];
      const blockedBoats = new Set(items.map((it) => it.boatId));
      const availableCount = considered.filter((b) => !blockedBoats.has(b.id)).length;
      if (availableCount > 0) availableDays += 1;
      if (availableCount < considered.length) bookedDays += 1;
    }
    return { availableDays, bookedDays, total: daysInMonth };
  }, [view, dayMap, considered, last]);

  const goPrev = () => {
    if (viewMode === "week") setWeekStart(addDays(weekStart, -7));
    else setView({ y: view.m === 0 ? view.y - 1 : view.y, m: (view.m + 11) % 12 });
  };
  const goNext = () => {
    if (viewMode === "week") setWeekStart(addDays(weekStart, 7));
    else setView({ y: view.m === 11 ? view.y + 1 : view.y, m: (view.m + 1) % 12 });
  };
  const goToday = () => {
    if (viewMode === "week") setWeekStart(startOfWeek(today));
    else setView({ y: today.getFullYear(), m: today.getMonth() });
  };

  // Week-view derived data
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekTitle = (() => {
    const end = addDays(weekStart, 6);
    const opts = { day: "numeric", month: "short" };
    const s = weekStart.toLocaleDateString("fr-FR", opts);
    const e = end.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
    return `${s} – ${e}`;
  })();

  // For a given date + slot, return list of items occupying that slot
  const itemsForSlot = (d, slotId) => {
    const iso = d.toISOString().slice(0, 10);
    const items = dayMap.get(iso) || [];
    if (slotId === "full") return items;
    return items.filter((it) => it.slot === "full" || it.slot === slotId);
  };
  const slotStatus = (d, slotId) => {
    const isPast = d < today;
    const items = itemsForSlot(d, slotId);
    const blocked = new Set(items.map((it) => it.boatId));
    const availableBoats = considered.filter((b) => !blocked.has(b.id));
    return { isPast, items, availableBoats, fullyBooked: availableBoats.length === 0 };
  };
  const handleSlotClick = (d, slotId, info) => {
    if (info.isPast || info.fullyBooked) return;
    const boat = info.availableBoats[0];
    if (boat) setPage({ name: "booking", id: boat.id, date: d.toISOString().slice(0, 10), slot: slotId });
  };

  const dayStatus = (d) => {
    if (!d) return null;
    const iso = d.toISOString().slice(0, 10);
    const items = dayMap.get(iso) || [];
    const isPast = d < today;
    const blocked = new Set(items.map((it) => it.boatId));
    const availableBoats = considered.filter((b) => !blocked.has(b.id));
    const inOption = items.some((it) => it.status === "option");
    return { iso, isPast, items, availableBoats, inOption, fullyBooked: availableBoats.length === 0 };
  };

  const handleDayClick = (info) => {
    if (!info || info.isPast || info.fullyBooked) return;
    // navigate to booking on the first available boat for that date
    const boat = info.availableBoats[0];
    if (boat) setPage({ name: "booking", id: boat.id, date: info.iso });
  };

  return (
    <main className="planning planning-v2">
      <style>{`
        .pc-grid { gap: 8px; }
        .pc-dow { font-size: 12px; font-weight: 600; letter-spacing: 0.04em; color: #6B7A8E; text-transform: uppercase; text-align: center; padding-bottom: 6px; }
        .pc-day { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 10px 6px; min-height: 76px; border-radius: 14px; border: 1px solid transparent; cursor: pointer; font-family: inherit; transition: filter .15s ease, transform .12s ease, box-shadow .18s ease; }
        .pc-day:hover:not(:disabled) { filter: brightness(0.97); transform: translateY(-2px); box-shadow: 0 6px 16px rgba(11,31,58,0.1); }
        .pc-day:disabled { cursor: not-allowed; }
        .pc-day.today { box-shadow: 0 0 0 2px var(--navy, #0B1F3A) inset; }
        .pc-day.highlight { box-shadow: 0 0 0 3px #5BAEDC inset, 0 6px 18px rgba(91,174,220,0.35); animation: pcPulse 1.6s ease-in-out 2; }
        @keyframes pcPulse { 0%, 100% { box-shadow: 0 0 0 3px #5BAEDC inset, 0 6px 18px rgba(91,174,220,0.35); } 50% { box-shadow: 0 0 0 4px #5BAEDC inset, 0 10px 26px rgba(91,174,220,0.55); } }
        .pc-day.today:hover:not(:disabled) { box-shadow: 0 0 0 2px var(--navy, #0B1F3A) inset, 0 6px 16px rgba(11,31,58,0.1); }
        .pc-day .pc-day-num { font-weight: 700; font-size: 19px; line-height: 1; }
        .pc-day .pc-day-state { font-size: 10px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; opacity: 0.9; display: inline-flex; align-items: center; gap: 4px; }
        .pc-day .pc-day-state::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; opacity: 0.85; }
        .pc-day.past .pc-day-state::before { display: none; }
        .pc-day.avail { background: #D9F0DE; color: #1B5E20; border-color: #BFE3C7; }
        .pc-day.partial { background: #FFEBC7; color: #8A5A00; border-color: #F2D49A; }
        .pc-day.booked { background: #F9CECE; color: #8A1F1F; border-color: #ECB1B1; }
        .pc-day.past { background: #F4F6F9; color: #A8B2BD; border-color: #E5E9EF; }
        .pc-legend { margin-top: 18px; flex-wrap: wrap; }
        /* Slot picker modal */
        .pc-modal-backdrop { position: fixed; inset: 0; background: rgba(11,31,58,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; animation: pc-fade .15s ease; }
        @keyframes pc-fade { from { opacity: 0; } to { opacity: 1; } }
        .pc-modal { background: #fff; border-radius: 16px; padding: 24px; max-width: 380px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .pc-modal h3 { margin: 0 0 6px; font-size: 18px; color: #0B1F3A; }
        .pc-modal .pc-modal-sub { margin: 0 0 18px; font-size: 13px; color: #6B7A8E; }
        .pc-modal-slots { display: flex; flex-direction: column; gap: 10px; }
        .pc-modal-slot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px; border-radius: 10px; border: 1px solid #E5E9EF; cursor: pointer; font-family: inherit; transition: filter .15s ease, transform .1s ease; }
        .pc-modal-slot:hover:not(:disabled) { filter: brightness(0.97); transform: translateY(-1px); }
        .pc-modal-slot:disabled { cursor: not-allowed; opacity: 0.7; }
        .pc-modal-slot.avail { background: #D4F0DA; color: #1B5E20; border-color: #B5DFBD; }
        .pc-modal-slot.booked { background: #F8C9C9; color: #8A1F1F; border-color: #E9A8A8; }
        .pc-modal-slot .ms-left { text-align: left; }
        .pc-modal-slot .ms-name { font-weight: 700; font-size: 14px; }
        .pc-modal-slot .ms-hours { font-size: 11px; opacity: 0.8; }
        .pc-modal-slot .ms-state { font-size: 12px; font-weight: 600; }
        .pc-modal-close { margin-top: 16px; width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #E5E9EF; background: #fff; color: #6B7A8E; font-weight: 500; cursor: pointer; font-family: inherit; }
        .pc-modal-close:hover { background: #F8F9FB; }
        @media (max-width: 720px) {
          .planning-calendar { padding: 0 10px !important; }
          .pc-grid { padding: 8px !important; gap: 3px !important; grid-auto-rows: 52px !important; border-radius: 12px; }
          .pc-day { padding: 4px 2px; min-height: 0; border-radius: 8px; gap: 2px; }
          .pc-day .pc-day-num { font-size: 13px; }
          .pc-day .pc-day-state { font-size: 8px; letter-spacing: 0.02em; gap: 2px; }
          .pc-day .pc-day-state::before { width: 4px; height: 4px; }
          .pc-dow { font-size: 9px; padding-bottom: 2px; }
        }
        @media (max-width: 480px) {
          .planning-calendar { padding: 0 6px !important; }
          .pc-grid { padding: 6px !important; gap: 2px !important; grid-auto-rows: 46px !important; }
          .pc-day { padding: 2px 1px; border-radius: 6px; gap: 1px; }
          .pc-day .pc-day-num { font-size: 12px; }
          .pc-day .pc-day-state { font-size: 7px; gap: 1px; }
          .pc-day .pc-day-state::before { width: 3px; height: 3px; }
        }
      `}</style>
      <Breadcrumb setPage={setPage} trail={[
        { label: "Accueil", page: { name: "home" } },
        { label: "Disponibilités" },
      ]} />

      <section className="planning-head">
        <div>
          <p className="eyebrow">Disponibilités</p>
          <h1>Repérez les dates libres en un coup d'œil</h1>
          <p className="lead">Les jours en vert sont disponibles à la réservation. Cliquez sur une date pour réserver instantanément.</p>
        </div>

        <div className="planning-stats">
          <div className="pstat">
            <span className="pstat-num">{stats.availableDays}</span>
            <span className="pstat-lbl">Jours disponibles</span>
          </div>
          <div className="pstat">
            <span className="pstat-num">{stats.bookedDays}</span>
            <span className="pstat-lbl">Jours occupés</span>
          </div>
        </div>
      </section>

      <section className="planning-toolbar v2">
        <div className="month-nav">
          <button className="icon-btn" onClick={goPrev} aria-label={viewMode === "week" ? "Semaine précédente" : "Mois précédent"}><Icon name="arrowL" size={16} /></button>
          <h2 className="month-title">{viewMode === "week" ? weekTitle : monthName}</h2>
          <button className="icon-btn" onClick={goNext} aria-label={viewMode === "week" ? "Semaine suivante" : "Mois suivant"}><Icon name="arrow" size={16} /></button>
          <button className="btn btn-ghost today-btn" onClick={goToday}>Aujourd'hui</button>
        </div>

        <div className="view-toggle" role="tablist" aria-label="Mode d'affichage">
          <button
            role="tab"
            aria-selected={viewMode === "month"}
            className={"vt-btn" + (viewMode === "month" ? " active" : "")}
            onClick={() => setViewMode("month")}>Mois</button>
          <button
            role="tab"
            aria-selected={viewMode === "week"}
            className={"vt-btn" + (viewMode === "week" ? " active" : "")}
            onClick={() => setViewMode("week")}>Semaine</button>
        </div>

        <div className="planning-legend">
          {bookableBoats.map((b) => (
            <button key={b.id} className={"chip" + (selectedBoatId === b.id ? " active" : "")} onClick={() => setSelectedBoatId(b.id)}>
              {b.name}
            </button>
          ))}
        </div>
      </section>

      {viewMode === "week" && (
        <section className="planning-week">
          <div className="pw-grid">
            <div className="pw-corner"></div>
            {weekDays.map((d, i) => {
              const isToday = d.getTime() === today.getTime();
              return (
                <div key={i} className={"pw-dayhead" + (isToday ? " today" : "")}>
                  <span className="pw-dow">{["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][i]}</span>
                  <span className="pw-date">{d.getDate()}</span>
                </div>
              );
            })}

            {SLOTS.map((slot) => (
              <React.Fragment key={slot.id}>
                <div className="pw-slotlabel">
                  <strong>{slot.label}</strong>
                  <span>{slot.hours}</span>
                </div>
                {weekDays.map((d, di) => {
                  const info = slotStatus(d, slot.id);
                  let stateCls = " avail";
                  if (info.isPast) stateCls = " past";
                  else if (info.fullyBooked) stateCls = " booked";
                  else if (info.items.length > 0) stateCls = " partial";
                  const titleText = info.items.length
                    ? info.items.map((it) => `${(BOATS.find((b) => b.id === it.boatId)?.name) || "—"} — ${STATUS_LABEL[it.status]}`).join("\n")
                    : "Disponible";
                  return (
                    <button
                      key={di}
                      className={"pw-cell" + stateCls}
                      disabled={info.isPast || info.fullyBooked}
                      onClick={() => handleSlotClick(d, slot.id, info)}
                      title={titleText}>
                      {info.fullyBooked
                        ? <span className="pw-state">{info.items[0]?.client || STATUS_LABEL[info.items[0]?.status] || "Réservé"}</span>
                        : info.items.length > 0
                          ? <span className="pw-state">{info.availableBoats.length}/{considered.length} dispo</span>
                          : <span className="pw-state">Disponible</span>}
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          <div className="pc-legend">
            <span className="pc-lg"><i className="pc-dot avail" /> Disponible</span>
            <span className="pc-lg"><i className="pc-dot partial" /> Partiellement</span>
            <span className="pc-lg"><i className="pc-dot booked" /> Réservé</span>
            <span className="pc-lg"><i className="pc-dot past" /> Passé</span>
          </div>
        </section>
      )}

      {viewMode === "month" && (
      <section className="planning-calendar">
        <div className="pc-grid">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
            <span key={d} className="pc-dow">{d}</span>
          ))}
          {cells.map((d, i) => {
            if (!d) return <span key={i} className="pc-cell empty" />;
            const isToday = d.getTime() === today.getTime();
            const amInfo = slotStatus(d, "am");
            const pmInfo = slotStatus(d, "pm");
            const isPast = amInfo.isPast;
            const amBooked = amInfo.fullyBooked;
            const pmBooked = pmInfo.fullyBooked;
            let cls = "pc-day";
            let stateLabel = "";
            if (isPast) { cls += " past"; stateLabel = ""; }
            else if (amBooked && pmBooked) { cls += " booked"; stateLabel = "Complet"; }
            else if (amBooked || pmBooked) { cls += " partial"; stateLabel = "Partiel"; }
            else { cls += " avail"; stateLabel = "Libre"; }
            if (isToday) cls += " today";
            const localIso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
            if (highlightISO && localIso === highlightISO) cls += " highlight";
            const titleText = isPast
              ? "Date passée"
              : (amBooked && pmBooked)
                ? "Matin et après-midi réservés"
                : amBooked
                  ? "Matin réservé · Après-midi disponible"
                  : pmBooked
                    ? "Matin disponible · Après-midi réservé"
                    : "Matin et après-midi disponibles";
            return (
              <button
                key={i}
                type="button"
                className={cls}
                disabled={isPast || (amBooked && pmBooked)}
                onClick={() => setPickerDay({ date: d, amInfo, pmInfo })}
                title={titleText}>
                <span className="pc-day-num">{d.getDate()}</span>
                <span className="pc-day-state">{stateLabel}</span>
              </button>
            );
          })}
        </div>

        <div className="pc-legend">
          <span className="pc-lg"><i className="pc-dot avail" /> Disponible</span>
          <span className="pc-lg"><i className="pc-dot partial" /> Partiellement</span>
          <span className="pc-lg"><i className="pc-dot booked" /> Complet</span>
          <span className="pc-lg"><i className="pc-dot past" /> Passé</span>
        </div>
      </section>
      )}

      <section className="planning-cta">
        <div>
          <h3>Une date précise en tête ?</h3>
          <p>Sélectionnez votre journée idéale et nous préparons votre sortie en mer.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setPage({ name: "catalog" })}>
          Voir les bateaux <Icon name="arrow" size={16} />
        </button>
      </section>

      <Footer />

      {pickerDay && (() => {
        const { date, amInfo, pmInfo } = pickerDay;
        const dateLabel = date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        const close = () => setPickerDay(null);
        const pick = (slotId, info) => {
          if (info.fullyBooked || info.isPast) return;
          close();
          handleSlotClick(date, slotId, info);
        };
        return (
          <div className="pc-modal-backdrop" onClick={close}>
            <div className="pc-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Choisissez votre créneau</h3>
              <p className="pc-modal-sub">{dateLabel}</p>
              <div className="pc-modal-slots">
                {[
                  { id: "am", label: "Matin", hours: "9h – 13h", info: amInfo },
                  { id: "pm", label: "Après-midi", hours: "14h – 18h", info: pmInfo },
                  { id: "sunset", label: "Sunset", hours: "19h – 22h30", info: slotStatus(date, "sunset") },
                  { id: "full", label: "Journée complète", hours: "9h – 22h30", info: slotStatus(date, "full") },
                ].map((s) => {
                  const booked = s.info.fullyBooked;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className={"pc-modal-slot " + (booked ? "booked" : "avail")}
                      disabled={booked}
                      onClick={() => pick(s.id, s.info)}>
                      <span className="ms-left">
                        <span className="ms-name">{s.label}</span>
                        <br />
                        <span className="ms-hours">{s.hours}</span>
                      </span>
                      <span className="ms-state">{booked ? "Réservé" : "Disponible"}</span>
                    </button>
                  );
                })}
              </div>
              <button className="pc-modal-close" onClick={close}>Fermer</button>
            </div>
          </div>
        );
      })()}
    </main>
  );
}

window.PlanningPage = PlanningPage;
