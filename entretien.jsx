/* global React, Icon, Footer, Breadcrumb, asset, lienInterne, defilerVersAncre */
/* ============================================================
   entretien.jsx — Univers « South Boat Entretien »
   - /entretien-bateau        : accueil de l'univers (EntretienPage)
   - /entretien-bateau/<id>   : une page par prestation (EntretienPrestationPage)
   SOURCE JSX : à recompiler en dist/entretien.js via `npm run build`.
   Les prestations et les prix « à partir de » ne sont PAS ici :
   ils sont dans entretien-prestations.js (modifiable sans compilation).
   ============================================================ */
/* var : scripts classiques séparés partageant la portée globale (cf. app.jsx). */
var { useState } = React;

// Même service d'envoi que le formulaire de la page Contact.
const EN_WEB3FORMS_KEY = "867b6825-3025-4db9-88a7-56b7f25342f8";

const EN_FAQ = [
  {
    q_fr: "Combien coûte l'entretien de mon bateau ?",
    q_en: "How much does boat maintenance cost?",
    a_fr: "Chaque bateau est différent : le prix dépend de sa taille, de son état et des prestations choisies. Nous établissons donc chaque tarif sur devis, à partir des informations que vous nous transmettez.",
    a_en: "Every boat is different: the price depends on its size, its condition and the services you choose. Each price is therefore set on quote, based on the details you send us."
  },
  {
    q_fr: "Jusqu'à quelle taille de bateau intervenez-vous ?",
    q_en: "Up to what boat size do you work?",
    a_fr: "Pour l'entretien extérieur, nous intervenons sur les bateaux jusqu'à 42 pieds (environ 13 m), et au-delà sur demande. L'entretien intérieur concerne les bateaux de plus de 10 m disposant d'un espace de nuit.",
    a_en: "For exterior maintenance, we work on boats up to 42 ft (about 13 m), and larger on request. Interior maintenance covers boats over 10 m with sleeping quarters."
  },
  {
    q_fr: "La sortie de l'eau est-elle comprise ?",
    q_en: "Is the haul-out included?",
    a_fr: "Pour certains entretiens extérieurs, la sortie de l'eau et la remise à l'eau peuvent être comprises dans le devis, sur demande.",
    a_en: "For some exterior work, hauling the boat out and relaunching it can be included in the quote, on request."
  },
  {
    q_fr: "Où se fait le nettoyage intérieur ?",
    q_en: "Where is interior cleaning done?",
    a_fr: "À quai, directement à bord de votre bateau. En carénage, sur demande.",
    a_en: "At the dock, directly on board your boat. In the boatyard, on request."
  },
  {
    q_fr: "Quels produits utilisez-vous ?",
    q_en: "Which products do you use?",
    a_fr: "Des produits éco-responsables, choisis en accord avec le milieu marin, auprès de nos marques partenaires.",
    a_en: "Eco-friendly products, chosen to respect the marine environment, from our partner brands."
  },
  {
    q_fr: "Proposez-vous des forfaits d'entretien ?",
    q_en: "Do you offer maintenance plans?",
    a_fr: "Oui. Nous pouvons mettre en place un forfait d'entretien au mois ou à l'année, construit selon les besoins de votre bateau.",
    a_en: "Yes. We can set up a monthly or yearly maintenance plan, built around your boat's needs."
  }
];

function enDonnees() {
  const data = window.ENTRETIEN || {};
  return {
    prestations: data.prestations || [],
    niveaux: data.niveauxLustrage || [],
    partenaires: data.partenaires || [],
    forfait: data.forfait || {},
  };
}

// Texte « À partir de … » d'une prestation, ou null si aucun montant n'est
// renseigné dans entretien-prestations.js (la carte affiche alors « Sur devis »).
function enTarif(item, t) {
  const montant = item ? item.aPartirDe : null;
  if (montant == null || montant === "" || isNaN(Number(montant))) return null;
  const n = Number(montant).toLocaleString(t.lang === "en" ? "en-GB" : "fr-FR");
  const unite = (t.lang === "en" && item.unite_en) || item.unite || "€";
  return t(`À partir de ${n} ${unite}`, `From ${n} ${unite}`);
}

function EnPrix({ item }) {
  const t = window.useT();
  const tarif = enTarif(item, t);
  return (
    <div className="en-price">
      <small>{t("Tarif", "Price")}</small>
      <strong>{tarif || t("Sur devis", "On quote")}</strong>
      {tarif && <em>{t("Prix définitif sur devis", "Final price on quote")}</em>}
    </div>
  );
}

const enCourt = (p, t) => t(p.court || p.titre, p.court_en || p.titre_en);
const enCote = (p, t) => (p.cote === "interieur" ? t("Intérieur", "Interior") : t("Extérieur", "Exterior"));
// Libellé de bouton : « Entretien intérieur (sur demande) » pour une prestation surDemande.
const enLibelle = (p, t) => enCourt(p, t) + (p.surDemande ? t(" (sur demande)", " (on request)") : "");

// ---------- Bouton « Devis » d'une prestation (accueil Services) ----------
// Coche la prestation dans le formulaire de devis puis y fait défiler la page,
// sans passer par la page de détail.
function EnBoutonDevis({ p, onDevis }) {
  const t = window.useT();
  const nom = enCourt(p, t);
  return (
    <button
      type="button"
      className="en-btn-devis"
      onClick={() => onDevis(p.id)}
      aria-label={t("Demander un devis : " + nom, "Request a quote: " + nom)}>
      {t("Devis", "Quote")}
    </button>
  );
}

// Les cartes ne sont plus des <a> d'un seul bloc : un lien ne peut pas contenir
// de bouton. Le lien (sur le titre) couvre toute la carte via .en-tuile-lien::after,
// et le bouton « Devis » passe au-dessus.

// ---------- Bouton simple d'une prestation « sur demande » (accueil Services) ----------
function EnBoutonSurDemande({ p, setPage, onDevis }) {
  const t = window.useT();
  return (
    <div className="en-tuile-option">
      <span className="en-tuile-icone"><Icon name={p.icone || "sparkle"} size={18} /></span>
      <a className="en-tuile-option-texte en-tuile-lien" {...lienInterne({ name: "entretien-prestation", id: p.id }, setPage)}>
        {enCourt(p, t)} <em>{t("(sur demande)", "(on request)")}</em>
      </a>
      <EnBoutonDevis p={p} onDevis={onDevis} />
    </div>
  );
}

// ---------- Photo(s) d'une prestation : une seule, ou avant / après ----------
// Réglées dans entretien-prestations.js : `photo` seule = une photo ;
// `photoAvant` + `photo` = deux photos côte à côte, étiquetées Avant / Après.
// Sans `photo`, rien ne s'affiche (la carte et la page gardent l'icône).
// taille : "carte" (page Services) ou "page" (haut de la page de la prestation).
function EnPhotos({ p, taille, alt, priorite }) {
  const t = window.useT();
  if (!p.photo) return null;
  const page = taille === "page";
  const chargement = priorite ? { fetchpriority: "high" } : { loading: "lazy" };
  const image = (chemin, texteAlt, moitie) => {
    const vignettes = window.srcSetVignette(asset(chemin));
    // Grande photo seule en haut de page : 800 px + originale. Sinon 400 / 800 px.
    const srcs = !vignettes ? { src: asset(chemin) }
      : page && !moitie ? { src: asset(chemin), srcSet: asset(window.photoTaille(chemin, 800)) + " 800w, " + asset(chemin) + " 1600w" }
      : { src: asset(window.photoTaille(chemin, 800)), srcSet: vignettes };
    const sizes = page
      ? (moitie ? "(max-width: 1024px) 45vw, 23vw" : "(max-width: 1024px) 90vw, 45vw")
      : (moitie ? "(max-width: 700px) 45vw, (max-width: 1100px) 23vw, 13vw" : "(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 25vw");
    return <img {...srcs} sizes={sizes} alt={texteAlt} decoding="async" {...chargement} />;
  };
  if (!p.photoAvant) return image(p.photo, alt, false);
  return (
    <span className="en-avant-apres">
      <span className="en-aa-moitie">
        {image(p.photoAvant, alt + t(" — avant", " — before"), true)}
        <span className="en-aa-tag">{t("Avant", "Before")}</span>
      </span>
      <span className="en-aa-moitie">
        {image(p.photo, alt + t(" — après", " — after"), true)}
        <span className="en-aa-tag">{t("Après", "After")}</span>
      </span>
    </span>
  );
}

// ---------- Carte d'une prestation (accueil Services) ----------
// Avec une photo renseignée, la photo remplace l'icône en haut de la carte.
function EnTuile({ p, num, setPage, onDevis }) {
  const t = window.useT();
  const tarif = enTarif(p, t);
  return (
    <article className="en-tuile">
      {p.photo && (
        <span className="en-tuile-photo">
          <EnPhotos p={p} taille="carte" alt={t(p.titre, p.titre_en) + " — South Boat Services, Mandelieu"} />
        </span>
      )}
      <span className="en-tuile-haut">
        {!p.photo && <span className="en-tuile-icone"><Icon name={p.icone || "sparkle"} size={24} /></span>}
        <span className="en-num">{String(num).padStart(2, "0")} · {enCote(p, t)}</span>
      </span>
      <h3 className="en-tuile-titre">
        <a className="en-tuile-lien" {...lienInterne({ name: "entretien-prestation", id: p.id }, setPage)}>{enCourt(p, t)}</a>
      </h3>
      <span className="en-tuile-texte">{t(p.intro, p.intro_en)}</span>
      {/* Sans montant renseigné, pas de « Sur devis » : le bouton Devis le dit déjà. */}
      {tarif && <span className="en-tuile-prix">{tarif}</span>}
      <span className="en-tuile-pied">
        <EnBoutonDevis p={p} onDevis={onDevis} />
        <span className="en-tuile-voir" aria-hidden="true">{t("Voir le détail", "See details")}<Icon name="arrow" size={15} /></span>
      </span>
    </article>
  );
}

// ---------- Les niveaux de prestations (lustrage) ----------
function EnNiveaux({ onDevis }) {
  const t = window.useT();
  const { niveaux } = enDonnees();
  if (!niveaux.length) return null;
  return (
    <section className="en-levels-wrap">
      <div className="en-levels-inner">
        <div className="en-head">
          <p className="eyebrow">{t("Les différents niveaux de prestations", "Service levels")}</p>
          <h2>{t("Du lustrage à la rénovation, selon l'état de votre coque.", "From polishing to restoration, depending on your hull's condition.")}</h2>
          <p className="lead">{t("Trois niveaux de travail et une protection en option : nous vous conseillons la formule la plus adaptée à votre bateau.", "Three levels of work plus an optional protection: we advise you on the option best suited to your boat.")}</p>
        </div>
        <div className="en-levels">
          {niveaux.map((n) => {
            const lignes = (t.lang === "en" && n.lignes_en) || n.lignes || [];
            return (
            <article className="en-level" key={n.niveau}>
              <div className="en-level-top">
                <span className="en-level-bars" aria-hidden="true">
                  {niveaux.map((x) => <i key={x.niveau} className={x.niveau <= n.niveau ? "on" : ""} />)}
                </span>
                <span className="en-level-tag">{t("Niveau", "Level")} {n.niveau} · {t(n.passes, n.passes_en)}</span>
              </div>
              <h3>{t(n.titre, n.titre_en)}</h3>
              <ul className="en-level-lignes">
                {lignes.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
              <div className="en-card-foot">
                <EnPrix item={n} />
                <button type="button" className="en-link" onClick={() => onDevis("lustrage")}>
                  {t("Devis", "Quote")} <Icon name="arrow" size={15} />
                </button>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Formulaire de devis (accueil Entretien + chaque prestation) ----------
// `choix` / `setChoix` viennent de la page : un bouton « Devis » ailleurs sur
// la page peut ainsi cocher une prestation avant de faire défiler jusqu'ici.
function EnDevis({ choix, setChoix, etat, setEtat, titre }) {
  const t = window.useT();
  const { prestations } = enDonnees();
  const options = [
    ...prestations.map((p) => ({ id: p.id, fr: p.titre, court: enCourt(p, t) })),
    { id: "forfait", fr: "Forfait d'entretien (mois / année)", court: t("Forfait mois / année", "Monthly / yearly plan") },
  ];
  const basculer = (id) => setChoix((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const envoyer = async (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const v = (nom) => ((f.elements[nom] && f.elements[nom].value) || "").trim();
    // L'e-mail reçu par South Boat est toujours en français, quelle que soit la langue du visiteur.
    const prestationsFr = options.filter((o) => choix.includes(o.id)).map((o) => o.fr);
    setEtat("envoi");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: EN_WEB3FORMS_KEY,
          subject: "[Devis entretien South Boat] " + (v("bateau") || v("nom")),
          from_name: v("nom"),
          name: v("nom"),
          email: v("email"),
          telephone: v("tel") || "Non renseigné",
          bateau: v("bateau") || "Non renseigné",
          longueur: v("longueur") ? v("longueur") + " m" : "Non renseignée",
          port: v("port") || "Non renseigné",
          prestations: prestationsFr.length ? prestationsFr.join(", ") : "Non précisées",
          message: v("message") || "—",
          langue: t.lang === "en" ? "Anglais" : "Français",
        }),
      });
      const d = await res.json();
      setEtat(d.success ? "envoye" : "erreur");
    } catch (err) {
      setEtat("erreur");
    }
  };

  return (
    <section className="en-quote en-anchor" id="devis">
      <div className="contact-info">
        <p className="eyebrow">{t("Devis", "Quote")}</p>
        <h2>{titre || t("Parlez-nous de votre bateau.", "Tell us about your boat.")}</h2>
        <p className="lead">{t(
          "Nos tarifs sont établis sur devis : ils dépendent de la taille du bateau, de son état et des prestations choisies. Décrivez votre besoin, nous revenons vers vous rapidement.",
          "Our prices are set on quote: they depend on the boat's size, its condition and the services chosen. Describe what you need and we'll get back to you quickly."
        )}</p>
        <ul className="contact-list">
          <li><Icon name="phone" /> <div><strong><a href="tel:+33634491621" style={{ color: "inherit", textDecoration: "none" }}>06 34 49 16 21</a></strong><span>{t("Maxim — nous appeler", "Maxim — call us")}</span></div></li>
          <li><Icon name="phone" /> <div><strong><a href="tel:+33786237848" style={{ color: "inherit", textDecoration: "none" }}>07 86 23 78 48</a></strong><span>{t("Vincent — nous appeler", "Vincent — call us")}</span></div></li>
          <li className="brand-whatsapp"><Icon name="whatsapp" /> <div><strong><a href="https://wa.me/33634491621" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>WhatsApp</a></strong><span>{t("Idéal pour nous envoyer des photos", "Ideal for sending us photos")}</span></div></li>
          <li><Icon name="mail" /> <div><strong><a href="mailto:contact@south-boat.com" style={{ color: "inherit", textDecoration: "none" }}>contact@south-boat.com</a></strong><span>{t("Nous écrire", "Write to us")}</span></div></li>
        </ul>
      </div>

      <form className="contact-form" onSubmit={envoyer}>
        {etat === "envoye" ? (
          <div className="sent">
            <div className="success-icon"><Icon name="check" size={28} /></div>
            <h3>{t("Merci, votre demande est envoyée", "Thank you, your request has been sent")}</h3>
            <p>{t("Nous revenons vers vous très vite avec votre devis. Vous pouvez déjà nous envoyer des photos du bateau par WhatsApp.", "We'll get back to you very soon with your quote. Feel free to send us photos of the boat on WhatsApp.")}</p>
          </div>
        ) : (
          <>
            <div className="form-grid">
              <label className="field"><span>{t("Nom", "Name")} *</span><input name="nom" type="text" autoComplete="name" required /></label>
              <label className="field"><span>{t("Email", "Email")} *</span><input name="email" type="email" autoComplete="email" required /></label>
              <label className="field"><span>{t("Téléphone", "Phone")}</span><input name="tel" type="tel" autoComplete="tel" /></label>
              <label className="field"><span>{t("Bateau (marque, modèle)", "Boat (make, model)")}</span><input name="bateau" type="text" /></label>
              <label className="field"><span>{t("Longueur (m)", "Length (m)")}</span><input name="longueur" type="text" inputMode="decimal" placeholder={t("ex. 12", "e.g. 12")} /></label>
              <label className="field"><span>{t("Port d'amarrage", "Home port")}</span><input name="port" type="text" /></label>
              <fieldset className="field full en-fieldset">
                <legend>{t("Prestations souhaitées", "Services needed")}</legend>
                <div className="en-chips">
                  {options.map((o) => {
                    const on = choix.includes(o.id);
                    return (
                      <label key={o.id} className={"en-chip" + (on ? " on" : "")}>
                        <input type="checkbox" checked={on} onChange={() => basculer(o.id)} />
                        {on && <Icon name="check" size={14} />}
                        {o.court}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <label className="field full"><span>{t("Votre message", "Your message")}</span><textarea name="message" rows="4" placeholder={t("État du bateau, période souhaitée, questions…", "Boat condition, preferred dates, questions…")} /></label>
            </div>
            {etat === "erreur" && (
              <p className="field-error en-form-error" role="alert">{t("L'envoi n'a pas abouti. Merci de réessayer, ou de nous écrire à contact@south-boat.com.", "Sending failed. Please try again, or email us at contact@south-boat.com.")}</p>
            )}
            <button className="btn btn-primary btn-block" type="submit" disabled={etat === "envoi"}>
              {etat === "envoi" ? t("Envoi en cours…", "Sending…") : t("Envoyer ma demande de devis", "Send my quote request")}
            </button>
            <p className="en-form-legal">{t("* Champs obligatoires. Vos informations servent uniquement à établir votre devis.", "* Required fields. Your details are only used to prepare your quote.")}</p>
          </>
        )}
      </form>
    </section>
  );
}

// État partagé du devis + « aller au devis en cochant telle prestation ».
function useDevis(initial) {
  const [choix, setChoix] = useState(initial || []);
  const [etat, setEtat] = useState("idle"); // idle | envoi | envoye | erreur
  const allerAuDevis = (id) => {
    if (id) setChoix((c) => (c.includes(id) ? c : [...c, id]));
    if (etat === "envoye" || etat === "erreur") setEtat("idle");
    defilerVersAncre("devis");
  };
  return { choix, setChoix, etat, setEtat, allerAuDevis };
}

// =====================================================================
// ACCUEIL DE L'UNIVERS ENTRETIEN — /entretien-bateau
// =====================================================================
function EntretienPage({ setPage }) {
  const t = window.useT();
  const { prestations, partenaires, forfait } = enDonnees();
  const devis = useDevis();
  const [openFaq, setOpenFaq] = useState(0);

  window.useJsonLd("ld-service-entretien", {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "South Boat Services — Entretien et nettoyage de bateaux",
    serviceType: "Entretien de bateaux",
    url: "https://south-boat.com/entretien-bateau",
    description: "Nettoyage extérieur, lustrage et rénovation du gelcoat, traitement antifouling, nettoyage intérieur sur demande. Bateaux jusqu'à 42 pieds (environ 13 m), tarifs sur devis, forfaits au mois ou à l'année.",
    provider: { "@id": "https://south-boat.com/#business" },
    areaServed: "Mandelieu-la-Napoule, Cannes, Côte d'Azur",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations d'entretien",
      itemListElement: prestations.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.titre, description: p.intro, url: "https://south-boat.com/entretien-bateau/" + p.id },
      })),
    },
  });

  const tarifForfait = enTarif(forfait, t);
  const tuiles = prestations.filter((p) => !p.surDemande);
  const surDemande = prestations.filter((p) => p.surDemande);

  return (
    <main className="about-v2 entretien">
      <Breadcrumb setPage={setPage} trail={[
        { label: "South Boat", page: { name: "accueil" } },
        { label: t("Services", "Services") },
      ]} />

      {/* HERO */}
      <section className="ab-hero en-hero">
        <div className="ab-hero-text">
          <p className="eyebrow">{t("South Boat Services · Mandelieu", "South Boat Services · Mandelieu")}</p>
          <h1>{t(<>Votre bateau,<br />soigné comme le nôtre.</>, <>Your boat,<br />cared for like our own.</>)}</h1>
          <p className="lead">{t(
            "Nettoyage extérieur, lustrage et rénovation du gelcoat, antifouling : nous entretenons votre bateau avec la même exigence que notre propre flotte. Chaque prestation est établie sur devis, selon votre bateau et vos besoins.",
            "Exterior cleaning, polishing and gelcoat restoration, antifouling: we look after your boat with the same care as our own fleet. Every service is priced on quote, based on your boat and your needs."
          )}</p>
          <div className="ab-hero-cta">
            <button className="btn btn-primary" onClick={() => defilerVersAncre("prestations")}>{t("Voir les prestations", "See our services")}</button>
            <button className="btn btn-outline" onClick={() => devis.allerAuDevis()}>{t("Demander un devis", "Request a quote")}</button>
          </div>
        </div>
        <div className="ab-hero-art">
          <div className="ab-img main">
            <img
              src={asset("images/mochi/entretien-nettoyage-bateau-mandelieu.jpg")}
              srcSet={asset("images/mochi/entretien-nettoyage-bateau-mandelieu-800.jpg") + " 800w, " + asset("images/mochi/entretien-nettoyage-bateau-mandelieu.jpg") + " 1600w"}
              sizes="(max-width: 1024px) 90vw, 45vw"
              alt={t("Poste de pilotage et sièges d'un bateau entretenu par South Boat au port de Mandelieu", "Helm station and seats of a boat maintained by South Boat in Mandelieu harbour")}
              fetchpriority="high" decoding="async" />
          </div>
          <div className="ab-img stack">
            <img
              src={asset("images/mochi/interieur-bateau-mochi-location-800.jpg")}
              srcSet={window.srcSetVignette(asset("images/mochi/interieur-bateau-mochi-location.jpg"))}
              sizes="(max-width: 1024px) 45vw, 25vw"
              alt={t("Le bateau Mochi de South Boat, propre et lustré, amarré au ponton devant des yachts", "South Boat's Mochi, clean and polished, moored at the pontoon in front of yachts")}
              loading="lazy" decoding="async" />
          </div>
          <div className="ab-badge en-badge">
            <strong>{t("À quai ou en carénage", "At the dock or ashore")}</strong>
            <span>{t("selon les prestations", "depending on the service")}</span>
          </div>
        </div>
      </section>

      {/* INFOS CLÉS (sans tailles de bateaux, à la demande du client) */}
      <section className="en-facts" aria-label={t("À savoir", "Good to know")}>
        <div className="en-fact">
          <strong>{t("Sur devis", "On quote")}</strong>
          <span>{t("Chaque tarif est établi selon votre bateau, son état et les prestations choisies.", "Each price is set according to your boat, its condition and the services chosen.")}</span>
        </div>
        <div className="en-fact">
          <strong>{t("Mise à l'eau", "Haul-out")}</strong>
          <span>{t("Sortie de l'eau et remise à l'eau possibles sur demande.", "Haul-out and relaunch available on request.")}</span>
        </div>
        <div className="en-fact">
          <strong>{t("Éco-responsable", "Eco-friendly")}</strong>
          <span>{t("Des produits choisis en accord avec le milieu marin.", "Products chosen to respect the marine environment.")}</span>
        </div>
      </section>

      {/* PRESTATIONS : un bouton par prestation, le détail est sur sa page */}
      <section className="en-section en-anchor" id="prestations">
        <div className="en-head">
          <p className="eyebrow">{t("Nos prestations", "Our services")}</p>
          <h2>{t("Du pont à la carène, tout l'entretien de votre bateau.", "From deck to hull bottom, complete care for your boat.")}</h2>
          <p className="lead">{t("Choisissez une prestation pour en découvrir le détail. Elles se combinent à la carte, selon l'état de votre bateau et l'usage que vous en faites.", "Pick a service to see the details. They can be combined à la carte, depending on your boat's condition and how you use it.")}</p>
        </div>
        <div className="en-tuiles">
          {/* Les prestations « surDemande » (entretien intérieur) n'ont pas de
              grande carte : un simple bouton à la suite de l'entretien extérieur. */}
          {tuiles.map((p, i) => (
            p.id === "nettoyage-exterieur" && surDemande.length ? (
              <div key={p.id} className="en-tuile-groupe">
                <EnTuile p={p} num={i + 1} setPage={setPage} onDevis={devis.allerAuDevis} />
                {surDemande.map((x) => <EnBoutonSurDemande key={x.id} p={x} setPage={setPage} onDevis={devis.allerAuDevis} />)}
              </div>
            ) : <EnTuile key={p.id} p={p} num={i + 1} setPage={setPage} onDevis={devis.allerAuDevis} />
          ))}
          {!tuiles.some((p) => p.id === "nettoyage-exterieur") && surDemande.map((x) => <EnBoutonSurDemande key={x.id} p={x} setPage={setPage} onDevis={devis.allerAuDevis} />)}
          <button type="button" className="en-tuile en-tuile-devis" onClick={() => devis.allerAuDevis()}>
            <span className="en-tuile-haut">
              <span className="en-tuile-icone"><Icon name="mail" size={24} /></span>
            </span>
            <strong className="en-tuile-titre">{t("Un besoin particulier ?", "Something specific?")}</strong>
            <span className="en-tuile-texte">{t("Décrivez-nous votre bateau : nous vous conseillons et établissons un devis sur mesure.", "Tell us about your boat: we'll advise you and prepare a tailored quote.")}</span>
            <span className="en-tuile-pied">
              <span className="en-tuile-voir">{t("Demander un devis", "Request a quote")}<Icon name="arrow" size={15} /></span>
            </span>
          </button>
        </div>
      </section>

      {/* FORFAITS */}
      <section className="en-plan en-anchor" id="forfaits">
        <div className="en-plan-inner">
          <div>
            <p className="eyebrow">{t("Forfaits d'entretien", "Maintenance plans")}</p>
            <h2>{t("Un entretien régulier, au mois ou à l'année.", "Regular care, monthly or yearly.")}</h2>
            <p>{t(
              "Nous construisons avec vous un forfait adapté à l'usage de votre bateau : nettoyages réguliers, lustrage, antifouling… Vous n'avez plus à y penser.",
              "We build a plan with you, tailored to how you use your boat: regular cleaning, polishing, antifouling… You no longer have to think about it."
            )}</p>
            {tarifForfait && <p className="en-plan-price">{tarifForfait}</p>}
          </div>
          <div className="en-plan-actions">
            <button className="btn en-btn-light" onClick={() => devis.allerAuDevis("forfait")}>{t("Composer mon forfait", "Build my plan")}</button>
            <a className="btn en-btn-ghost" href="tel:+33634491621"><Icon name="phone" size={16} /> 06 34 49 16 21</a>
          </div>
        </div>
      </section>

      {/* DÉROULEMENT */}
      <section className="ab-story en-steps">
        <div className="ab-story-head">
          <p className="eyebrow">{t("Comment ça se passe", "How it works")}</p>
          <h2>{t("Quatre étapes, sans surprise.", "Four steps, no surprises.")}</h2>
        </div>
        <div className="ab-timeline">
          <div className="ab-step">
            <span className="ab-year">01</span>
            <h3>{t("Votre demande", "Your request")}</h3>
            <p>{t("Décrivez-nous votre bateau et les prestations souhaitées via notre formulaire, par téléphone ou sur WhatsApp. Quelques photos et un rendez-vous sur place nous permettront d'évaluer précisément l'état du bateau et vos besoins.", "Tell us about your boat and the services you need via our form, by phone or on WhatsApp. A few photos and an on-site visit let us accurately assess the boat's condition and your needs.")}</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">02</span>
            <h3>{t("Votre devis", "Your quote")}</h3>
            <p>{t("Nous vous adressons un devis détaillé, établi selon la taille, l'état du bateau et les prestations choisies.", "We send you a detailed quote, based on the boat's size, its condition and the services chosen.")}</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">03</span>
            <h3>{t("L'intervention", "The work")}</h3>
            <p>{t("L'intervention peut se faire à quai ou en carénage, selon les prestations demandées.", "The work can be done at the dock or in the boatyard, depending on the services requested.")}</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">04</span>
            <h3>{t("Le bateau prêt à naviguer", "Ready to sail")}</h3>
            <p>{t("Chaque prestation est contrôlée avant de vous rendre le bateau, protégé et prêt pour vos prochaines sorties.", "Every job is checked before we hand the boat back to you, protected and ready for your next outings.")}</p>
          </div>
        </div>
      </section>

      {/* PRODUITS & PARTENAIRES */}
      {/* Logos et noms : liste dans entretien-prestations.js (« partenaires »). */}
      <section className="en-section en-partenaires">
        <div className="en-head">
          <p className="eyebrow">{t("Produits & partenaires", "Products & partners")}</p>
          <h2>{t("Des produits professionnels, respectueux de la mer.", "Professional products that respect the sea.")}</h2>
          <p className="lead">{t(
            "Nous travaillons avec des produits éco-responsables, choisis en accord avec le milieu marin, auprès de marques reconnues du nautisme.",
            "We work with eco-friendly products, chosen to respect the marine environment, from well-known boating brands."
          )}</p>
        </div>
        {partenaires.length > 0 && (
          <ul className="en-partenaires-grille" aria-label={t("Nos marques partenaires", "Our partner brands")}>
            {partenaires.map((m) => (
              <li key={m.nom} className="en-partenaire">
                {/* Sans logo, le nom s'affiche en grand à la place du logo. */}
                <span className={"en-partenaire-logo" + (m.logo ? "" : " sans-logo")}>
                  {m.logo
                    ? <img src={asset(m.logo)} alt="" loading="lazy" decoding="async" />
                    : <strong>{m.nom}</strong>}
                </span>
                {m.logo && <strong className="en-partenaire-nom">{m.nom}</strong>}
                {m.precision && <span className="en-partenaire-precision">{t(m.precision, m.precision_en || m.precision)}</span>}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* FAQ */}
      <section className="en-section en-faq">
        <div className="en-head">
          <p className="eyebrow">{t("Questions fréquentes", "Frequently asked questions")}</p>
          <h2>{t("L'entretien, en pratique.", "Maintenance, in practice.")}</h2>
        </div>
        <div className="faq-list" style={{ maxWidth: 820 }}>
          {EN_FAQ.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className={"faq-item" + (isOpen ? " open" : "")} style={{ borderBottom: "1px solid var(--line)" }}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "18px 4px", background: "none", border: "none", cursor: "pointer", textAlign: "left", font: "inherit", color: "var(--ink)" }}>
                  <span style={{ fontWeight: 600, fontSize: "1.02rem" }}>{t(f.q_fr, f.q_en)}</span>
                  <span style={{ flexShrink: 0, transition: "transform .2s", transform: isOpen ? "rotate(45deg)" : "none" }}><Icon name="plus" size={18} /></span>
                </button>
                {isOpen && (
                  <p className="faq-a" style={{ margin: "0 4px 18px", color: "var(--ink-soft)", lineHeight: 1.6 }}>{t(f.a_fr, f.a_en)}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* DEVIS */}
      <EnDevis {...devis} />

      <Footer />
    </main>
  );
}

// =====================================================================
// PAGE D'UNE PRESTATION — /entretien-bateau/<id>
// =====================================================================
function EntretienPrestationPage({ id, setPage }) {
  const { prestations } = enDonnees();
  const p = prestations.find((x) => x.id === id);
  // Adresse inconnue (ancien lien, faute de frappe) : accueil Entretien.
  if (!p) return <EntretienPage setPage={setPage} />;
  // key : on repart d'un formulaire neuf (prestation pré-cochée) à chaque prestation.
  return <EnPrestation key={p.id} p={p} setPage={setPage} />;
}

function EnPrestation({ p, setPage }) {
  const t = window.useT();
  const { prestations } = enDonnees();
  const devis = useDevis([p.id]);
  const index = prestations.indexOf(p);
  const autres = prestations.filter((x) => x.id !== p.id);
  const points = (t.lang === "en" && p.points_en) || p.points || [];

  window.useJsonLd("ld-service-prestation", {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.titre,
    serviceType: p.titre,
    description: p.intro,
    url: "https://south-boat.com/entretien-bateau/" + p.id,
    provider: { "@id": "https://south-boat.com/#business" },
    areaServed: "Mandelieu-la-Napoule, Cannes, Côte d'Azur",
    brand: { "@type": "Brand", name: "South Boat Services" },
  });

  return (
    <main className="about-v2 entretien en-detail">
      <Breadcrumb setPage={setPage} trail={[
        { label: "South Boat", page: { name: "accueil" } },
        { label: t("Services", "Services"), page: { name: "entretien" } },
        { label: enCourt(p, t) },
      ]} />

      <section className="en-d-hero">
        <div className="en-d-hero-text">
          <a className="en-retour" {...lienInterne({ name: "entretien", ancre: "prestations" }, setPage)}>
            <Icon name="arrowL" size={15} /> {t("Toutes les prestations", "All services")}
          </a>
          <p className="eyebrow">{t("Prestation", "Service")} {String(index + 1).padStart(2, "0")} · {enCote(p, t)}</p>
          <h1>
            {t(p.titre, p.titre_en)}
            {p.surDemande && <span className="en-sur-demande">{t("Sur demande", "On request")}</span>}
          </h1>
          <p className="lead">{t(p.intro, p.intro_en)}</p>
          <div className="ab-hero-cta">
            <button className="btn btn-primary" onClick={() => devis.allerAuDevis(p.id)}>{t("Demander un devis", "Request a quote")}</button>
            <a className="btn btn-outline" href="tel:+33634491621"><Icon name="phone" size={16} /> 06 34 49 16 21</a>
          </div>
        </div>
        <div className={"en-d-visuel" + (p.photo ? " avec-photo" : "")}>
          {p.photo ? (
            <EnPhotos p={p} taille="page" priorite alt={t(p.titre, p.titre_en) + " — South Boat Services, Mandelieu"} />
          ) : (
            <span className="en-d-icone" aria-hidden="true"><Icon name={p.icone || "sparkle"} size={64} /></span>
          )}
          <div className="en-d-prix"><EnPrix item={p} /></div>
        </div>
      </section>

      <section className="en-section en-d-contenu">
        <div className="en-head">
          <p className="eyebrow">{t("Le détail", "In detail")}</p>
          <h2>{t("Ce que comprend la prestation", "What the service includes")}</h2>
        </div>
        <ul className="en-list en-d-liste">
          {points.map((pt, i) => <li key={i}><Icon name="check" size={16} />{pt}</li>)}
        </ul>
        {p.note && <p className="en-note en-d-note">{t(p.note, p.note_en)}</p>}
      </section>

      {p.id === "lustrage" && <EnNiveaux onDevis={devis.allerAuDevis} />}

      <section className="en-section en-d-autres">
        <div className="en-head">
          <p className="eyebrow">{t("Les autres prestations", "Other services")}</p>
          <h2>{t("À combiner selon vos besoins.", "Combine them as you need.")}</h2>
        </div>
        <div className="en-d-autres-liste">
          {autres.map((x) => (
            <a key={x.id} className="en-d-autre" {...lienInterne({ name: "entretien-prestation", id: x.id }, setPage)}>
              <span className="en-tuile-icone"><Icon name={x.icone || "sparkle"} size={20} /></span>
              <span>{enLibelle(x, t)}</span>
              <Icon name="arrow" size={15} />
            </a>
          ))}
        </div>
      </section>

      <EnDevis {...devis} titre={t(`Votre devis : ${enCourt(p, t).toLowerCase()}.`, `Your quote: ${enCourt(p, t).toLowerCase()}.`)} />

      <Footer />
    </main>
  );
}

Object.assign(window, { EntretienPage, EntretienPrestationPage });
