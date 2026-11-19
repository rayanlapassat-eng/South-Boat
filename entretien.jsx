/* global React, Icon, Footer, Breadcrumb, asset */
/* ============================================================
   entretien.jsx — Page « Entretien & nettoyage de bateaux »
   URL : /entretien-bateau
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
    a_fr: "Pour l'entretien extérieur, nous intervenons sur les bateaux jusqu'à ~25 m, et au-delà sur demande. L'entretien intérieur concerne les bateaux de plus de 10 m disposant d'un espace de nuit.",
    a_en: "For exterior maintenance, we work on boats up to ~25 m, and larger on request. Interior maintenance covers boats over 10 m with sleeping quarters."
  },
  {
    q_fr: "La sortie de l'eau est-elle comprise ?",
    q_en: "Is the haul-out included?",
    a_fr: "Pour les entretiens extérieurs, la sortie de l'eau et la remise à l'eau du bateau peuvent être comprises dans le devis.",
    a_en: "For exterior work, hauling the boat out and relaunching it can be included in the quote."
  },
  {
    q_fr: "Où se fait le nettoyage intérieur ?",
    q_en: "Where is interior cleaning done?",
    a_fr: "À quai, directement à bord de votre bateau.",
    a_en: "At the dock, directly on board your boat."
  },
  {
    q_fr: "Quels produits utilisez-vous ?",
    q_en: "Which products do you use?",
    a_fr: "Des produits éco-responsables, choisis en accord avec le milieu marin, auprès de marques partenaires comme RUPES, NAUTICLEAN ou 3M.",
    a_en: "Eco-friendly products, chosen to respect the marine environment, from partner brands such as RUPES, NAUTICLEAN and 3M."
  },
  {
    q_fr: "Proposez-vous des forfaits d'entretien ?",
    q_en: "Do you offer maintenance plans?",
    a_fr: "Oui. Nous pouvons mettre en place un forfait d'entretien au mois ou à l'année, construit selon les besoins de votre bateau.",
    a_en: "Yes. We can set up a monthly or yearly maintenance plan, built around your boat's needs."
  }
];

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

function EnCarte({ p, num, large, onDevis }) {
  const t = window.useT();
  const points = (t.lang === "en" && p.points_en) || p.points || [];
  return (
    <article className={"en-card" + (large ? " wide" : "")}>
      <span className="en-num">{String(num).padStart(2, "0")}</span>
      <h3>{t(p.titre, p.titre_en)}</h3>
      <p>{t(p.intro, p.intro_en)}</p>
      <ul className="en-list">
        {points.map((pt, i) => <li key={i}><Icon name="check" size={16} />{pt}</li>)}
      </ul>
      {p.note && <p className="en-note">{t(p.note, p.note_en)}</p>}
      <div className="en-card-foot">
        <EnPrix item={p} />
        <button type="button" className="en-link" onClick={() => onDevis(p.id)}>
          {t("Demander un devis", "Request a quote")} <Icon name="arrow" size={15} />
        </button>
      </div>
    </article>
  );
}

function defilerVers(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const doux = !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  el.scrollIntoView({ behavior: doux ? "smooth" : "auto", block: "start" });
}

function EntretienPage({ setPage }) {
  const t = window.useT();
  const data = window.ENTRETIEN || {};
  const prestations = data.prestations || [];
  const niveaux = data.niveauxLustrage || [];
  const forfait = data.forfait || {};
  const exterieur = prestations.filter((p) => p.cote !== "interieur");
  const interieur = prestations.filter((p) => p.cote === "interieur");

  const [choix, setChoix] = useState([]);
  const [etat, setEtat] = useState("idle"); // idle | envoi | envoye | erreur
  const [openFaq, setOpenFaq] = useState(0);

  // Cases à cocher du formulaire : les prestations + le forfait.
  const options = [
    ...prestations.map((p) => ({ id: p.id, fr: p.titre, en: p.titre_en })),
    { id: "forfait", fr: "Forfait d'entretien (mois / année)", en: "Maintenance plan (monthly / yearly)" },
  ];

  window.useJsonLd("ld-service-entretien", {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Entretien et nettoyage de bateaux",
    serviceType: "Entretien de bateaux",
    url: "https://south-boat.com/entretien-bateau",
    description: "Nettoyage extérieur et intérieur, lustrage et polish, traitement antifouling, réfection du gelcoat et des chromes. Bateaux jusqu'à ~25 m, tarifs sur devis, forfaits au mois ou à l'année.",
    provider: { "@id": "https://south-boat.com/#business" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations d'entretien",
      itemListElement: prestations.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.titre, description: p.intro },
      })),
    },
  });

  const allerAuDevis = (id) => {
    if (id) setChoix((c) => (c.includes(id) ? c : [...c, id]));
    if (etat === "envoye" || etat === "erreur") setEtat("idle");
    defilerVers("devis");
  };
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

  const tarifForfait = enTarif(forfait, t);

  return (
    <main className="about-v2 entretien">
      <Breadcrumb setPage={setPage} trail={[
        { label: t("Accueil", "Home"), page: { name: "home" } },
        { label: t("Entretien", "Maintenance") },
      ]} />

      {/* HERO */}
      <section className="ab-hero en-hero">
        <div className="ab-hero-text">
          <p className="eyebrow">{t("Entretien & nettoyage de bateaux", "Boat maintenance & cleaning")}</p>
          <h1>{t(<>Votre bateau,<br />soigné comme le nôtre.</>, <>Your boat,<br />cared for like our own.</>)}</h1>
          <p className="lead">{t(
            "Nettoyage extérieur et intérieur, lustrage, antifouling, gelcoat et chromes : nous entretenons votre bateau avec la même exigence que notre propre flotte. Chaque prestation est établie sur devis, selon votre bateau et vos besoins.",
            "Exterior and interior cleaning, polishing, antifouling, gelcoat and chrome: we look after your boat with the same care as our own fleet. Every service is priced on quote, based on your boat and your needs."
          )}</p>
          <div className="ab-hero-cta">
            <button className="btn btn-primary" onClick={() => allerAuDevis()}>{t("Demander un devis", "Request a quote")}</button>
            <button className="btn btn-outline" onClick={() => defilerVers("prestations")}>{t("Voir les prestations", "See our services")}</button>
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
            <strong>{t("Entretien extérieur", "Exterior care")}</strong>
            <span>{t("plus sur demande", "larger on request")}</span>
          </div>
        </div>
      </section>

      {/* INFOS CLÉS */}
      <section className="en-facts" aria-label={t("À savoir", "Good to know")}>
        <div className="en-fact">
          <strong>~25 m</strong>
          <span>{t("Entretien extérieur des bateaux jusqu'à ~25 m, plus sur demande.", "Exterior maintenance for boats up to ~25 m, larger on request.")}</span>
        </div>
        <div className="en-fact">
          <strong>{t("10 m et +", "10 m +")}</strong>
          <span>{t("Entretien intérieur des bateaux avec espace de nuit, à quai.", "Interior maintenance for boats with sleeping quarters, at the dock.")}</span>
        </div>
        <div className="en-fact">
          <strong>{t("Mise à l'eau", "Haul-out")}</strong>
          <span>{t("Sortie et remise à l'eau possibles, comprises dans le devis extérieur.", "Haul-out and relaunch available, included in the exterior quote.")}</span>
        </div>
        <div className="en-fact">
          <strong>{t("Éco-responsable", "Eco-friendly")}</strong>
          <span>{t("Des produits choisis en accord avec le milieu marin.", "Products chosen to respect the marine environment.")}</span>
        </div>
      </section>

      {/* PRESTATIONS */}
      <section className="en-section en-anchor" id="prestations">
        <div className="en-head">
          <p className="eyebrow">{t("Nos prestations", "Our services")}</p>
          <h2>{t("Du pont à la carène, tout l'entretien de votre bateau.", "From deck to hull bottom, complete care for your boat.")}</h2>
          <p className="lead">{t("Des prestations à la carte, à combiner selon l'état de votre bateau et l'usage que vous en faites.", "À la carte services, to combine according to your boat's condition and how you use it.")}</p>
        </div>

        <div className="en-group">
          <h3>{t("À l'extérieur", "Exterior")}</h3>
          <span>{t("Bateaux jusqu'à ~25 m, plus sur demande", "Boats up to ~25 m, larger on request")}</span>
        </div>
        <div className="en-grid">
          {exterieur.map((p, i) => (
            <EnCarte key={p.id} p={p} num={i + 1} large={exterieur.length % 2 === 1 && i === exterieur.length - 1} onDevis={allerAuDevis} />
          ))}
        </div>

        {interieur.length > 0 && <>
          <div className="en-group">
            <h3>{t("À l'intérieur", "Interior")}</h3>
            <span>{t("Bateaux de plus de 10 m avec espace de nuit, à quai", "Boats over 10 m with sleeping quarters, at the dock")}</span>
          </div>
          <div className="en-grid">
            {interieur.map((p, i) => (
              <EnCarte key={p.id} p={p} num={exterieur.length + i + 1} large={interieur.length % 2 === 1 && i === interieur.length - 1} onDevis={allerAuDevis} />
            ))}
          </div>
        </>}
      </section>

      {/* NIVEAUX DE LUSTRAGE */}
      {niveaux.length > 0 && (
        <section className="en-levels-wrap">
          <div className="en-levels-inner">
            <div className="en-head">
              <p className="eyebrow">{t("Lustrage & polish", "Polishing")}</p>
              <h2>{t("Trois niveaux, selon l'état de votre coque.", "Three levels, depending on your hull's condition.")}</h2>
              <p className="lead">{t("De l'entretien régulier à la rénovation complète : nous vous conseillons le niveau le plus adapté à votre bateau.", "From regular upkeep to full restoration: we advise you on the level best suited to your boat.")}</p>
            </div>
            <div className="en-levels">
              {niveaux.map((n) => (
                <article className="en-level" key={n.niveau}>
                  <div className="en-level-top">
                    <span className="en-level-bars" aria-hidden="true">
                      {[1, 2, 3].map((k) => <i key={k} className={k <= n.niveau ? "on" : ""} />)}
                    </span>
                    <span className="en-level-tag">{t("Niveau", "Level")} {n.niveau} · {t(n.passes, n.passes_en)}</span>
                  </div>
                  <h3>{t(n.titre, n.titre_en)}</h3>
                  <p>{t(n.texte, n.texte_en)}</p>
                  <div className="en-card-foot">
                    <EnPrix item={n} />
                    <button type="button" className="en-link" onClick={() => allerAuDevis("lustrage")}>
                      {t("Devis", "Quote")} <Icon name="arrow" size={15} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FORFAITS */}
      <section className="en-plan">
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
            <button className="btn en-btn-light" onClick={() => allerAuDevis("forfait")}>{t("Composer mon forfait", "Build my plan")}</button>
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
            <p>{t("Décrivez votre bateau et les prestations souhaitées, via le formulaire, par téléphone ou sur WhatsApp. Quelques photos nous aident à bien évaluer.", "Describe your boat and the services you need, via the form, by phone or on WhatsApp. A few photos help us assess it properly.")}</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">02</span>
            <h3>{t("Votre devis", "Your quote")}</h3>
            <p>{t("Nous vous adressons un devis détaillé, établi selon la taille, l'état du bateau et les prestations choisies.", "We send you a detailed quote, based on the boat's size, its condition and the services chosen.")}</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">03</span>
            <h3>{t("L'intervention", "The work")}</h3>
            <p>{t("À quai pour l'intérieur. Pour l'extérieur, la sortie et la remise à l'eau du bateau peuvent être comprises dans le devis.", "At the dock for interiors. For exterior work, hauling out and relaunching the boat can be included in the quote.")}</p>
          </div>
          <div className="ab-step">
            <span className="ab-year">04</span>
            <h3>{t("Le bateau prêt à naviguer", "Ready to sail")}</h3>
            <p>{t("Chaque prestation est contrôlée avant de vous rendre un bateau propre, protégé et prêt pour vos prochaines sorties.", "Every job is checked before we hand back a clean, protected boat, ready for your next outings.")}</p>
          </div>
        </div>
      </section>

      {/* PRODUITS & PARTENAIRES */}
      <section className="en-section en-eco">
        <div>
          <p className="eyebrow">{t("Produits & partenaires", "Products & partners")}</p>
          <h2>{t("Des produits professionnels, respectueux de la mer.", "Professional products that respect the sea.")}</h2>
          <p className="lead">{t(
            "Nous travaillons avec des produits éco-responsables, choisis en accord avec le milieu marin, auprès de marques reconnues du nautisme.",
            "We work with eco-friendly products, chosen to respect the marine environment, from well-known boating brands."
          )}</p>
        </div>
        <div className="en-brands">
          <span className="en-brand-label">{t("Nos marques partenaires", "Our partner brands")}</span>
          <div className="en-brand-list">
            <span className="en-brand">RUPES</span>
            <span className="en-brand">NAUTICLEAN</span>
            <span className="en-brand">3M</span>
            <span className="en-brand more">{t("et d'autres…", "and more…")}</span>
          </div>
        </div>
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
      <section className="en-quote en-anchor" id="devis">
        <div className="contact-info">
          <p className="eyebrow">{t("Devis", "Quote")}</p>
          <h2>{t("Parlez-nous de votre bateau.", "Tell us about your boat.")}</h2>
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
                          {t(o.fr, o.en)}
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

      <Footer />
    </main>
  );
}

Object.assign(window, { EntretienPage });
