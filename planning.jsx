/* global React, BOATS, fmtPrice, Icon, Footer, Breadcrumb */
const { useState, useMemo } = React;

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
function PlanningPage({ setPage }) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [weekStart, setWeekStart] = useState(startOfWeek(today));
  const [viewMode, setViewMode] = useState("month"); // "month" | "week"
  const [selectedBoatId, setSelectedBoatId] = useState("all");

  const bookableBoats = BOATS.filter((b) => !b.comingSoon);

  // Build map iso -> [{boatId, status, client, slot}]
  const dayMap = useMemo(() => {
    const map = new Map();
    bookableBoats.forEach((b) => {
      (RESERVATIONS[b.id] || []).forEach((r) => {
        if (selectedBoatId !== "all" && b.id !== selectedBoatId) return;
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

  const considered = selectedBoatId === "all" ? bookableBoats : bookableBoats.filter((b) => b.id === selectedBoatId);

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
    if (boat) setPage({ name: "booking", id: boat.id, date: d.toISOString().slice(0, 10) });
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
          <button className={"chip" + (selectedBoatId === "all" ? " active" : "")} onClick={() => setSelectedBoatId("all")}>
            Tous les bateaux
          </button>
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
            const info = dayStatus(d);
            const isToday = d.getTime() === today.getTime();
            let stateCls = " avail";
            if (info.isPast) stateCls = " past";
            else if (info.fullyBooked) stateCls = " booked";
            else if (info.items.length > 0) stateCls = " partial";
            const cls = "pc-cell" + stateCls + (isToday ? " today" : "");
            const label = info.fullyBooked
              ? "Complet"
              : info.availableBoats.length === considered.length
                ? (considered.length === 1 ? "Disponible" : `${info.availableBoats.length} dispo`)
                : `${info.availableBoats.length}/${considered.length} dispo`;
            return (
              <button
                key={i}
                className={cls}
                disabled={info.isPast || info.fullyBooked}
                onClick={() => handleDayClick(info)}
                title={info.items.map((it) => `${(BOATS.find((b) => b.id === it.boatId)?.name) || "—"} — ${STATUS_LABEL[it.status]}`).join("\n") || "Disponible"}>
                <span className="pc-day-num">{d.getDate()}</span>
                {!info.isPast && <span className="pc-day-state">{label}</span>}
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
    </main>
  );
}

window.PlanningPage = PlanningPage;
