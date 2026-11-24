/* global React, ReactDOM */
/* var (et non const) : ces fichiers sont chargés comme scripts classiques séparés
   qui partagent la portée globale ; var autorise la redéclaration entre fichiers. */
var { useState, useEffect, useMemo, useRef } = React;

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
  preAuth: 1500,
  options: [
    { id: "buoy", label: "Bouée tractée", label_en: "Towed inflatable", price: 30 },
    { id: "wake", label: "Wakeboard", label_en: "Wakeboard", price: 30 },
    { id: "paddle", label: "Paddle board", label_en: "Paddle board", price: 20 },
    { id: "snorkel", label: "Accessoires snorkeling", label_en: "Snorkeling gear", price: 20 },
    { id: "aperitif-halfday", label: "Apéritif Gourmand + Boisson", label_en: "Gourmet aperitif + drink", price: 25, slotOnly: "halfday", onRequest: true }
  ],
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
  "images/mochi/marina-port-mandelieu-location-bateau.jpg",
  "images/drone/bateau-vue-drone-zenith-mandelieu.jpg",
  "images/drone/bateau-mouillage-coucher-soleil-theoule.jpg",
  "images/drone/bateau-navigation-poster-video.jpg"],

  // Vidéo drone du bateau en navigation (fiche bateau, section « En navigation »).
  video: "videos/navigation-cote-azur.mp4",
  videoPoster: "images/drone/bateau-navigation-poster-video.jpg",

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

// ============ ROUTING (clean URLs) ============
// Repo subfolder when hosted on GitHub Pages (ex: /South-Boat). Empty "" once on a real domain (Hostinger, etc).
const BASE_PATH = window.location.pathname.startsWith("/South-Boat") ? "/South-Boat" : "";

// ============ ASSET URL ============
// Résout les chemins d'images locaux en URL absolue (racine du site) pour qu'ils
// fonctionnent quelle que soit la profondeur de la route (ex: /bateau/1, /reservation/1).
// Les URLs externes (https://, //, data:) sont laissées telles quelles.
const asset = (p) =>
  (!p || /^(https?:)?\/\//.test(p) || p.startsWith("data:")) ? p : BASE_PATH + "/" + p.replace(/^\/+/, "");
// On normalise les images des bateaux une seule fois au chargement.
BOATS.forEach((b) => { if (Array.isArray(b.images)) b.images = b.images.map(asset); });

// ============ VIGNETTES ============
// Chaque photo de galerie a deux petites versions générées à côté d'elle :
// « -400 » et « -800 » (voir DEPLOIEMENT.md). Les vignettes de la mosaïque
// n'affichent que ~180 px sur téléphone et ~270 px sur ordinateur : y charger
// la photo pleine taille faisait télécharger 2,5× trop de données.
// Renvoie undefined pour les URLs externes (Unsplash), qui n'ont pas de jumeau.
window.srcSetVignette = function (p) {
  const m = /^(.*)(\.(?:jpe?g|png))$/i.exec(p || "");
  if (!m || /^(https?:)?\/\//.test(p)) return undefined;
  return m[1] + "-400" + m[2] + " 400w, " + m[1] + "-800" + m[2] + " 800w";
};
// Chemin d'une taille précise, quand la balise ne sait pas gérer un srcset
// (l'attribut « poster » d'une vidéo, une vignette de récapitulatif).
window.photoTaille = function (p, largeur) {
  const m = /^(.*)(\.(?:jpe?g|png))$/i.exec(p || "");
  return m && !/^(https?:)?\/\//.test(p) ? m[1] + "-" + largeur + m[2] : p;
};

// ============ VIDÉOS DE FOND ============
// Dit si l'on doit afficher une vidéo de fond décorative. Faux sur petit écran
// (on ne consomme pas la data des visiteurs mobiles : la photo suffit) et faux
// pour qui a demandé à réduire les animations. Quand c'est faux, la balise
// <video> n'est pas rendue du tout — le fichier n'est donc jamais téléchargé.
// La vidéo n'est montée qu'APRÈS le chargement complet de la page : elle ne
// dispute jamais la bande passante à l'image du hero, aux polices ni au script.
// L'affichage reste donc aussi rapide qu'avec une simple photo, et la vidéo
// vient se superposer ensuite.
window.useVideoFond = function useVideoFond() {
  var [actif, setActif] = useState(false);
  useEffect(() => {
    if (!window.matchMedia) return;
    const grandEcran = window.matchMedia("(min-width: 901px)");
    const animDouces = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Connexion bridée ou visiteur en mode « économie de données » : pas de vidéo.
    const co = navigator.connection;
    const reseauFaible = !!co && (co.saveData === true || /^(slow-)?2g$/.test(co.effectiveType || ""));
    let pretPourLaVideo = false;
    const maj = () => setActif(pretPourLaVideo && !reseauFaible && grandEcran.matches && !animDouces.matches);
    const demarrer = () => { pretPourLaVideo = true; maj(); };

    if (document.readyState === "complete") {
      // Un cran après le rendu, pour laisser respirer le fil principal.
      setTimeout(demarrer, 350);
    } else {
      window.addEventListener("load", () => setTimeout(demarrer, 350), { once: true });
    }
    grandEcran.addEventListener("change", maj);
    animDouces.addEventListener("change", maj);
    return () => {
      grandEcran.removeEventListener("change", maj);
      animDouces.removeEventListener("change", maj);
    };
  }, []);
  return actif;
};

// ============ DONNÉES STRUCTURÉES ============
// Injecte (et retire à la sortie de page) un bloc JSON-LD identifié par `id`.
window.useJsonLd = function useJsonLd(id, donnees) {
  const serialise = donnees ? JSON.stringify(donnees) : "";
  useEffect(() => {
    if (!serialise) return;
    const ancien = document.getElementById(id);
    if (ancien) ancien.remove();
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = id;
    tag.textContent = serialise;
    document.head.appendChild(tag);
    return () => { const e = document.getElementById(id); if (e) e.remove(); };
  }, [id, serialise]);
};

// Fiche VideoObject : permet à Google d'afficher la vidéo en résultat enrichi.
// Les URL doivent être absolues sur le domaine canonique.
window.ficheVideo = function ficheVideo({ nom, description, fichier, vignette, duree }) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: nom,
    description: description,
    thumbnailUrl: ["https://south-boat.com/" + vignette],
    contentUrl: "https://south-boat.com/" + fichier,
    uploadDate: "2026-07-30",
    duration: duree,
    isFamilyFriendly: true,
    publisher: { "@type": "Organization", name: "South Boat", "@id": "https://south-boat.com/#business" },
  };
};

// Démarre une vidéo quand elle approche de l'écran, la met en pause quand elle
// en sort. C'est ici le MÉCANISME DE DÉMARRAGE : la balise n'a volontairement
// plus d'attribut autoplay, qui lui faisait télécharger ses mégaoctets dès
// l'ouverture de la page même si le visiteur ne descendait jamais jusqu'à elle.
// `actif` à faux (téléphone, connexion bridée) : on ne lance rien du tout, la
// balise affiche son image et ses contrôles, et rien ne part sans un clic.
// Comme plus rien ne repose sur autoplay, tout échec de démarrage doit rester
// rattrapable : on affiche alors les contrôles plutôt que de laisser une image
// figée sans moyen de la lire.
window.usePauseHorsEcran = function usePauseHorsEcran(actif) {
  var ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (actif === false || !el) return;
    const secours = () => { el.controls = true; };
    if (!("IntersectionObserver" in window)) { secours(); return; }
    const obs = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => {
        if (e.isIntersecting) {
          // AbortError = lecture interrompue par notre propre pause() quand la
          // vidéo ressort de l'écran : ce n'est pas un échec, on l'ignore.
          if (el.paused) el.play().catch((err) => { if (!err || err.name !== "AbortError") secours(); });
        } else if (!el.paused) { el.pause(); }
      });
      // rootMargin : on démarre un écran avant que la vidéo n'arrive, le temps
      // qu'elle se charge — sinon le visiteur voit l'affiche figée un instant.
    }, { threshold: 0.2, rootMargin: "300px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [actif]);
  return ref;
};

// ============ UNIVERS (South Boat Location / South Boat Entretien) ============
// La page d'accueil « / » est un portail qui mène à deux univers, chacun avec
// son menu et son code couleur (attribut data-univers sur <html>, cf. styles.css).
// Les pages communes (À propos, Contact, pages légales) gardent l'univers d'où
// vient le visiteur.
const PAGES_ENTRETIEN = ["entretien", "entretien-prestation"];
const PAGES_LOCATION = ["home", "catalog", "planning", "fireworks", "detail", "booking", "capsud", "capsud-article", "itinerary"];
function universDePage(name) {
  if (name === "accueil") return "portail";
  if (PAGES_ENTRETIEN.includes(name)) return "entretien";
  if (PAGES_LOCATION.includes(name)) return "location";
  return null;
}

// Défilement doux vers une ancre (respecte « réduire les animations »).
function defilerVersAncre(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  const doux = !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  el.scrollIntoView({ behavior: doux ? "smooth" : "auto", block: "start" });
  return true;
}

// Navigation interne. Une page peut porter une ancre ({ name: "entretien",
// ancre: "devis" }) : si l'on est déjà sur cette page, on y défile directement.
function naviguerVers(page) {
  const courante = window.__pageCourante;
  if (page.ancre && courante && courante.name === page.name && String(courante.id || "") === String(page.id || "")) {
    if (defilerVersAncre(page.ancre)) return;
  }
  if (window.__setPage) window.__setPage(page);
}

// Props d'un vrai lien <a href> (lisible par Google, ouvrable dans un nouvel
// onglet) qui navigue sans recharger la page sur un clic simple.
function lienInterne(page, onNaviguer) {
  return {
    href: pageToPath(page),
    onClick: (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      (onNaviguer || naviguerVers)(page);
    },
  };
}

function pageToPath(page) {
  let path = "/";
  switch (page.name) {
    case "accueil": path = "/"; break;
    case "home": path = "/location-bateau"; break;
    case "catalog": path = "/catalogue"; break;
    case "planning": {
      path = "/disponibilites";
      if (page.date) return BASE_PATH + path + "?date=" + encodeURIComponent(page.date);
      return BASE_PATH + path;
    }
    case "fireworks": path = "/feux-artifice"; break;
    case "entretien": path = "/entretien-bateau"; break;
    case "entretien-prestation": path = `/entretien-bateau/${page.id}`; break;
    case "detail": path = `/bateau/${page.id}`; break;
    case "booking": {
      path = `/reservation/${page.id}`;
      const params = new URLSearchParams();
      if (page.date) params.set("date", page.date);
      if (page.slot) params.set("slot", page.slot);
      const qs = params.toString();
      return BASE_PATH + path + (qs ? `?${qs}` : "");
    }
    case "about": path = "/a-propos"; break;
    case "contact": path = "/contact"; break;
    case "capsud": path = "/cap-sud"; break;
    case "capsud-article": path = `/cap-sud/${page.id}`; break;
    case "itinerary": path = `/itineraire/${page.id}`; break;
    case "cgv": path = "/cgv"; break;
    case "legal": path = "/mentions-legales"; break;
    case "privacy": path = "/confidentialite"; break;
    default: path = "/"; break;
  }
  return BASE_PATH + path;
}

function pathToPage(pathname, search) {
  let p = pathname;
  if (BASE_PATH && p.startsWith(BASE_PATH)) p = p.slice(BASE_PATH.length);
  const parts = p.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  const params = new URLSearchParams(search || "");
  if (parts.length === 0) return { name: "accueil" };
  switch (parts[0]) {
    case "location-bateau": return { name: "home" };
    case "catalogue": return { name: "catalog" };
    case "disponibilites": {
      const page = { name: "planning" };
      if (params.get("date")) page.date = params.get("date");
      return page;
    }
    case "feux-artifice": return { name: "fireworks" };
    case "entretien-bateau": return parts[1] ? { name: "entretien-prestation", id: parts[1] } : { name: "entretien" };
    case "bateau": return parts[1] ? { name: "detail", id: +parts[1] || parts[1] } : { name: "catalog" };
    case "reservation": {
      if (!parts[1]) return { name: "catalog" };
      const page = { name: "booking", id: +parts[1] || parts[1] };
      if (params.get("date")) page.date = params.get("date");
      if (params.get("slot")) page.slot = params.get("slot");
      return page;
    }
    case "a-propos": return { name: "about" };
    case "contact": return { name: "contact" };
    case "cap-sud": return parts[1] ? { name: "capsud-article", id: parts[1] } : { name: "capsud" };
    case "itineraire": return parts[1] ? { name: "itinerary", id: parts[1] } : { name: "home" };
    case "cgv": return { name: "cgv" };
    case "mentions-legales": return { name: "legal" };
    case "confidentialite": return { name: "privacy" };
    default: return { name: "accueil" };
  }
}

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
    // Univers & prestations d'entretien
    voile: <path d="M3 17l9-12 9 12M5 17h14l-2 4H7z" />,
    goutte: <><path d="M12 2.7l5.66 5.66a8 8 0 1 1-11.32 0z" /><path d="M8.5 14.5a3.5 3.5 0 0 0 3.5 3.5" /></>,
    brillance: <><path d="M10 3l1.9 5.1L17 10l-5.1 1.9L10 17l-1.9-5.1L3 10l5.1-1.9z" /><path d="M18.5 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" /></>,
    carene: <><path d="M2 9h20l-3 8H5z" /><path d="M7 9V6h7l3 3" /><path d="M2 21c2-1.3 4-1.3 6 0s4 1.3 6 0 4-1.3 6 0" /></>,
    outil: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
    cabine: <><path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" /><path d="M3 16h18" /><path d="M7 10V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" /></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><path d="M17.5 6.5h.01" /></>,
    whatsapp: <><path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.84 11.84 0 0 0 5.64 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.44z" /><path d="M17.4 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" fill="currentColor" stroke="none" /></>
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
// Le logo South Boat (pictogramme voile + nom), avec en dessous le nom de
// l'univers en cours (« Location » / « Services ») dans sa couleur.
function Logo({ univers, taille = 22 }) {
  const t = window.useT();
  return (
    <>
      <span className="logo-mark">
        <svg width={taille} height={taille} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l9-12 9 12M5 17h14l-2 4H7z" />
        </svg>
      </span>
      <span className="logo-words">
        <span className="logo-text">South Boat<sup>°</sup></span>
        {univers === "location" && <span className="logo-univers">{t("Location", "Rental")}</span>}
        {univers === "entretien" && <span className="logo-univers">{t("Services", "Services")}</span>}
      </span>
    </>
  );
}

function Nav({ page, setPage, univers }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = window.useT();
  const entretien = univers === "entretien";

  // Chaque univers a son propre menu. `actif` dit quand le lien est surligné.
  const items = entretien ? [
    { id: "entretien", label: t("Accueil", "Home"), page: { name: "entretien" }, actif: page.name === "entretien" },
    { id: "prestations", label: t("Prestations", "Services"), page: { name: "entretien", ancre: "prestations" }, actif: page.name === "entretien-prestation" },
    { id: "forfaits", label: t("Forfaits", "Plans"), page: { name: "entretien", ancre: "forfaits" }, actif: false },
    { id: "about", label: t("À propos", "About"), page: { name: "about" } },
    { id: "contact", label: t("Contact", "Contact"), page: { name: "contact" } },
  ] : [
    { id: "home", label: t("Accueil", "Home"), page: { name: "home" } },
    { id: "catalog", label: t("Catalogue", "Catalog"), page: { name: "catalog" } },
    { id: "planning", label: t("Disponibilités", "Availability"), page: { name: "planning" } },
    { id: "fireworks", label: t("Feux d'artifice", "Fireworks"), page: { name: "fireworks" } },
    { id: "capsud", label: "Cap Sud", page: { name: "capsud" } },
    { id: "about", label: t("À propos", "About"), page: { name: "about" } },
    { id: "contact", label: t("Contact", "Contact"), page: { name: "contact" } },
  ];
  const estActif = (it) => (it.actif != null ? it.actif : page.name === it.page.name);
  // Le menu mobile occupe de la hauteur dans la page : on le referme AVANT de
  // défiler vers une ancre, sinon la cible remonte d'autant pendant le défilement.
  const aller = (p) => {
    if (!mobileOpen) { naviguerVers(p); return; }
    setMobileOpen(false);
    setTimeout(() => naviguerVers(p), 0);
  };

  // Passerelle vers l'autre univers.
  const autre = entretien
    ? { id: "location", page: { name: "home" }, label: t("Location", "Rental"), titre: t("Aller à South Boat Location", "Go to South Boat Rental") }
    : { id: "entretien", page: { name: "entretien" }, label: t("Services", "Services"), titre: t("Aller à South Boat Services", "Go to South Boat Services") };
  const cta = entretien
    ? { page: { name: "entretien", ancre: "devis" }, label: t("Devis", "Quote") }
    : { page: { name: "catalog" }, label: t("Réserver", "Book") };

  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="logo" {...lienInterne({ name: "accueil" }, aller)} aria-label={t("South Boat — accueil", "South Boat — home")}>
          <Logo univers={univers} />
        </a>
        <nav className="nav-links" aria-label={t("Menu principal", "Main menu")}>
          {items.map((it) =>
          <a
            key={it.id}
            className={"nav-link" + (estActif(it) ? " active" : "")}
            aria-current={estActif(it) ? "page" : undefined}
            {...lienInterne(it.page, aller)}>
              {it.label}
            </a>
          )}
          {!entretien &&
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
          </a>}
        </nav>
        <div className="nav-actions">
          <a className={"univers-switch vers-" + autre.id} title={autre.titre} {...lienInterne(autre.page, aller)}>
            <span className="univers-switch-dot" aria-hidden="true" />
            {autre.label}
            <Icon name="arrow" size={13} />
          </a>
          <button
            className="lang-toggle"
            onClick={() => t.setLang(t.lang === "fr" ? "en" : "fr")}
            aria-label={t("Changer de langue", "Change language")}
            title={t("Changer de langue", "Change language")}>
            <span className={t.lang === "fr" ? "lang-on" : "lang-off"}>FR</span>
            <span className="lang-sep">|</span>
            <span className={t.lang === "en" ? "lang-on" : "lang-off"}>EN</span>
          </button>
          <a className="btn btn-primary nav-cta" {...lienInterne(cta.page, aller)} style={{ borderRadius: "20px" }}>
            {cta.label}
          </a>
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
          <a
            key={it.id}
            className={"mobile-menu-link" + (estActif(it) ? " active" : "")}
            {...lienInterne(it.page, aller)}>
              {it.label}
            </a>
          )}
          {!entretien &&
          <a
            className="mobile-menu-link"
            href="https://marine.meteoconsult.fr/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}>
            Météo Marine ↗
          </a>}
          <a className={"mobile-univers vers-" + autre.id} {...lienInterne(autre.page, aller)}>
            <span>
              <small>{t("Changer d'univers", "Switch to")}</small>
              South Boat {autre.label}
            </span>
            <Icon name="arrow" size={18} />
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
  // SEO : JSON-LD BreadcrumbList (fil d'Ariane enrichi dans les résultats Google)
  const trailKey = trail.map((i) => i.label).join(">");
  useEffect(() => {
    const origin = window.location.origin;
    const ld = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": trail.map((item, i) => {
        const el = { "@type": "ListItem", "position": i + 1, "name": item.label };
        if (item.page) el.item = origin + window.pageToPath(item.page);
        return el;
      }),
    };
    const existing = document.getElementById("ld-breadcrumb");
    if (existing) existing.remove();
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = "ld-breadcrumb";
    tag.textContent = JSON.stringify(ld);
    document.head.appendChild(tag);
    return () => { const e = document.getElementById("ld-breadcrumb"); if (e) e.remove(); };
  }, [trailKey]);

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

Object.assign(window, { BOATS, PORTS, fmtPrice, Star, Heart, Icon, applyTheme, Nav, Logo, SearchBar, Breadcrumb, TWEAK_DEFAULTS, pageToPath, pathToPage, BASE_PATH, asset, universDePage, naviguerVers, lienInterne, defilerVersAncre });