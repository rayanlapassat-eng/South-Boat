// cal-api.js — Pont JS South Boat ↔ proxy PHP Cal.com
// Le proxy PHP (cal-proxy.php) gère la clé API côté serveur.
// En local (sans PHP), un mode mock prend le relais pour que le tunnel reste testable.
(function () {
  // Chemin relatif : résolu via <base href> (cf. index.html) → marche en racine et en sous-dossier.
  var PROXY = "cal-proxy.php";
  var mockMode = null;

  function detectMock() {
    if (mockMode !== null) return Promise.resolve(mockMode);
    return fetch(PROXY + "?action=ping", { method: "GET" })
      .then(function (r) {
        if (!r.ok) { mockMode = true; return mockMode; }
        return r.text().then(function (txt) {
          // Si le serveur ne sait pas exécuter PHP, il renvoie le source en texte
          // (commence par "<?php"). On bascule alors en mode mock.
          try {
            var parsed = JSON.parse(txt);
            mockMode = !(parsed && parsed.ok === true);
          } catch (e) {
            mockMode = true;
          }
          return mockMode;
        });
      })
      .catch(function () { mockMode = true; return mockMode; });
  }

  // Renvoie { 'YYYY-MM-DD': 'ISO start time' } pour le mois demandé
  function fetchAvailableSlots(eventKey, year, month) {
    var first = new Date(year, month, 1);
    var last = new Date(year, month + 1, 0, 23, 59, 59, 999);
    return detectMock().then(function (useMock) {
      if (useMock) {
        var out = {};
        var today = new Date(); today.setHours(0, 0, 0, 0);
        for (var d = new Date(first); d <= last; d.setDate(d.getDate() + 1)) {
          if (d < today) continue;
          var dow = d.getDay();
          // Mock simple : indispo le mardi, dispo sinon
          if (dow === 2) continue;
          var iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
          var hour = eventKey === "halfday-pm" ? 14 : 9;
          var dt = new Date(d); dt.setHours(hour, 0, 0, 0);
          out[iso] = dt.toISOString();
        }
        return out;
      }
      var params = new URLSearchParams({
        action: "slots",
        event: eventKey,
        from: first.toISOString(),
        to: last.toISOString(),
      });
      return fetch(PROXY + "?" + params.toString()).then(function (r) {
        if (!r.ok) throw new Error("Cal.com slots fetch failed (" + r.status + ")");
        return r.json();
      }).then(function (data) {
        // L'API Cal.com v2 renvoie { data: { 'YYYY-MM-DD': [{ time: 'ISO' }, ...] } }
        var slots = (data && data.data) || {};
        var out = {};
        Object.keys(slots).forEach(function (day) {
          var arr = slots[day];
          if (Array.isArray(arr) && arr.length > 0) out[day] = arr[0].time;
        });
        return out;
      });
    });
  }

  function createBooking(payload) {
    return detectMock().then(function (useMock) {
      if (useMock) {
        console.warn("[cal-api] mode mock : aucun booking créé côté Cal.com", payload);
        return { ok: true, mock: true };
      }
      return fetch(PROXY + "?action=book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (body) {
          if (!r.ok) {
            var err = (body && (body.error || body.message)) || ("Erreur Cal.com (" + r.status + ")");
            return { ok: false, error: err, status: r.status, raw: body };
          }
          return { ok: true, data: body };
        });
      }).catch(function (e) {
        return { ok: false, error: String(e.message || e) };
      });
    });
  }

  window.CalAPI = {
    fetchAvailableSlots: fetchAvailableSlots,
    createBooking: createBooking,
  };
})();
