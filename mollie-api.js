// mollie-api.js — Pont JS South Boat <-> proxy PHP Mollie
// Le proxy PHP (mollie-proxy.php) gère la clé API côté serveur.
// En local (sans PHP), un mode mock prend le relais pour que le tunnel reste testable :
//   createPayment renvoie { mock:true } (pas de redirection),
//   getStatus renvoie { paid:true } (paiement simulé réussi).
(function () {
  var PROXY = "mollie-proxy.php"; // résolu via <base href> (cf. index.html)
  var mockMode = null;

  function detectMock() {
    if (mockMode !== null) return Promise.resolve(mockMode);
    return fetch(PROXY + "?action=ping", { method: "GET" })
      .then(function (r) {
        if (!r.ok) { mockMode = true; return mockMode; }
        return r.text().then(function (txt) {
          try {
            var parsed = JSON.parse(txt);
            mockMode = !(parsed && parsed.ok === true);
          } catch (e) { mockMode = true; }
          return mockMode;
        });
      })
      .catch(function () { mockMode = true; return mockMode; });
  }

  // Crée un paiement Mollie et renvoie l'URL de redirection (checkout).
  // opts : { amount, method, boatName, boatId, returnUrl, reference }
  function createPayment(opts) {
    return detectMock().then(function (useMock) {
      if (useMock) {
        console.warn("[mollie-api] mode mock : aucun paiement réel créé", opts);
        return { ok: true, mock: true };
      }
      return fetch(PROXY + "?action=create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts),
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (body) {
          if (!r.ok || !body || !body.checkoutUrl) {
            var err = (body && body.error) || ("Erreur Mollie (" + r.status + ")");
            return { ok: false, error: err };
          }
          return { ok: true, paymentId: body.paymentId, checkoutUrl: body.checkoutUrl, status: body.status };
        });
      }).catch(function (e) {
        return { ok: false, error: String(e.message || e) };
      });
    });
  }

  // Lit le statut d'un paiement. Renvoie { paid: bool, status }.
  function getStatus(paymentId) {
    return detectMock().then(function (useMock) {
      if (useMock) {
        return { ok: true, mock: true, paid: true, status: "paid" };
      }
      return fetch(PROXY + "?action=status&id=" + encodeURIComponent(paymentId))
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (body) {
            if (!r.ok || !body) return { ok: false, paid: false, status: "unknown" };
            return { ok: true, paid: !!body.paid, status: body.status || "unknown" };
          });
        }).catch(function () { return { ok: false, paid: false, status: "unknown" }; });
    });
  }

  window.MollieAPI = {
    createPayment: createPayment,
    getStatus: getStatus,
  };
})();
