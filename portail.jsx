/* global React, Icon, Logo, asset, lienInterne */
/* ============================================================
   portail.jsx — Page d'accueil « / » : le portail South Boat.
   Deux grands boutons mènent aux deux univers du site :
   - South Boat Location  → /location-bateau  (réservations, catalogue…)
   - South Boat Entretien → /entretien-bateau (prestations, devis…)
   SOURCE JSX : à recompiler en dist/portail.js via `npm run build`.
   ============================================================ */
/* var : scripts classiques séparés partageant la portée globale (cf. app.jsx). */
var { useState } = React;

function PortailPage({ setPage }) {
  const t = window.useT();
  // Vidéo drone en fond sur grand écran uniquement, une fois la page chargée
  // (cf. useVideoFond dans app.jsx) ; la photo s'affiche tout de suite.
  const videoFond = window.useVideoFond();
  const [videoPrete, setVideoPrete] = useState(false);

  const univers = [
    {
      id: "location",
      page: { name: "home" },
      icone: "voile",
      nom: t("Location", "Rental"),
      resume: t("Sorties en mer, avec ou sans skipper", "Boat trips, with or without a skipper"),
      accroche: t(
        "Louez un bateau au départ de Mandelieu, avec ou sans skipper, vers l'Estérel, Cannes et les îles de Lérins.",
        "Rent a boat from Mandelieu, with or without a skipper, toward the Estérel, Cannes and the Lérins islands."
      ),
      cta: t("Réserver une sortie", "Book a trip"),
    },
    {
      id: "entretien",
      page: { name: "entretien" },
      icone: "brillance",
      nom: t("Services", "Services"),
      resume: t("Nettoyage, lustrage, antifouling", "Cleaning, polishing, antifouling"),
      accroche: t(
        "Nettoyage, lustrage, antifouling, gelcoat : nous prenons soin de votre bateau, à quai ou au sec.",
        "Cleaning, polishing, antifouling, gelcoat: we take care of your boat, afloat or ashore."
      ),
      cta: t("Voir les prestations", "See our services"),
    },
  ];

  const legal = [
    { page: { name: "legal" }, label: t("Mentions légales", "Legal notice") },
    { page: { name: "cgv" }, label: t("CGV", "Terms") },
    { page: { name: "privacy" }, label: t("Confidentialité", "Privacy") },
  ];

  return (
    <main className="portail">
      <div className="portail-fond" aria-hidden="true">
        <picture>
          <source
            media="(max-width: 700px)"
            srcSet={asset("images/drone/bateau-eau-turquoise-esterel-vue-drone-portrait-800.jpg") + " 800w, " + asset("images/drone/bateau-eau-turquoise-esterel-vue-drone-portrait.jpg") + " 900w"}
            sizes="100vw" />
          <img
            src={asset("images/drone/bateau-navigation-poster-video.jpg")}
            srcSet={asset("images/drone/bateau-navigation-poster-video-800.jpg") + " 800w, " + asset("images/drone/bateau-navigation-poster-video.jpg") + " 2000w"}
            sizes="100vw"
            alt=""
            fetchpriority="high" decoding="async" />
        </picture>
        {videoFond && (
          <video
            className={videoPrete ? "pret" : ""}
            autoPlay muted loop playsInline preload="auto"
            poster={asset("images/drone/bateau-navigation-poster-video.jpg")}
            onCanPlay={() => setVideoPrete(true)}
            tabIndex={-1}>
            <source src={asset("videos/navigation-cote-azur.mp4")} type="video/mp4" />
          </video>
        )}
        <div className="portail-voile" />
      </div>

      <div className="portail-haut">
        <button
          className="lang-toggle portail-lang"
          onClick={() => t.setLang(t.lang === "fr" ? "en" : "fr")}
          aria-label={t("Changer de langue", "Change language")}
          title={t("Changer de langue", "Change language")}>
          <span className={t.lang === "fr" ? "lang-on" : "lang-off"}>FR</span>
          <span className="lang-sep">|</span>
          <span className={t.lang === "en" ? "lang-on" : "lang-off"}>EN</span>
        </button>
      </div>

      <div className="portail-centre">
        <div className="portail-logo logo">
          <Logo taille={30} />
        </div>
        {/* Titre retiré de l'affichage à la demande du client, mais conservé
            pour Google et les lecteurs d'écran (seul h1 de la page). */}
        <h1 className="sr-only">
          {t("South Boat : location et entretien de bateaux à Mandelieu-la-Napoule", "South Boat: boat rental and maintenance in Mandelieu-la-Napoule")}
        </h1>
        <p className="portail-sous">{t("Côte d'Azur · Choisissez votre univers", "French Riviera · Choose your world")}</p>

        <nav className="portail-choix" aria-label={t("Les deux univers South Boat", "The two South Boat worlds")}>
          {univers.map((u) => (
            <a key={u.id} className={"portail-carte " + u.id} {...lienInterne(u.page, setPage)}>
              <span className="portail-icone"><Icon name={u.icone} size={26} /></span>
              <span className="portail-marque">South Boat</span>
              <strong className="portail-nom">{u.nom}</strong>
              {/* Résumé court sur téléphone, accroche complète sur grand écran */}
              <span className="portail-resume">{u.resume}</span>
              <span className="portail-accroche">{u.accroche}</span>
              <span className="portail-cta"><span className="portail-cta-texte">{u.cta}</span><Icon name="arrow" size={16} /></span>
            </a>
          ))}
        </nav>
      </div>

      <footer className="portail-pied">
        <div className="portail-contact">
          <a href="tel:+33634491621"><Icon name="phone" size={14} />06 34 49 16 21</a>
          <a href="mailto:contact@south-boat.com"><Icon name="mail" size={14} />contact@south-boat.com</a>
          <a href="https://www.instagram.com/south_boat_/" target="_blank" rel="noopener noreferrer"><Icon name="instagram" size={14} />Instagram</a>
        </div>
        <div className="portail-legal">
          {legal.map((l) => <a key={l.page.name} {...lienInterne(l.page, setPage)}>{l.label}</a>)}
        </div>
      </footer>
    </main>
  );
}

Object.assign(window, { PortailPage });
