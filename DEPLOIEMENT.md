# Déploiement & maintenance — South Boat

## 1. Mettre le site en ligne (Hostinger)

Le site doit être servi **à la racine** du domaine `south-boat.com` (hébergement PHP/Apache).

**Fichiers à téléverser** dans `public_html/` :

- `index.html`, `404.html`, `styles.css`
- `robots.txt`, `sitemap.xml`, `.htaccess`
- `cal-api.js`, `articles.js`
- `cal-proxy.php` (+ `cal-config.php` créé à partir de `cal-config.example.php`)
- le dossier **`dist/`** (JavaScript compilé — indispensable)
- le dossier **`images/`**

**À NE PAS téléverser :**

- `node_modules/` (très lourd, inutile en production)
- les fichiers source `*.jsx` (`app.jsx`, `pages.jsx`, `planning.jsx`, `tweaks-panel.jsx`, `boot.jsx`) — facultatifs, seul `dist/` est utilisé
- `South-Boat-standalone.html` et `South Boat.html` (anciennes versions — risque de contenu dupliqué)
- `package.json`, `package-lock.json`, ce fichier

## 2. Les deux domaines (south-boat.com + south-boat.fr)

Faites pointer **les deux** noms de domaine (DNS) vers le même hébergement.
Le fichier `.htaccess` redirige automatiquement en 301 :

- `south-boat.fr` → `south-boat.com`
- `www.south-boat.com` → `south-boat.com`
- `http://` → `https://`

→ Tout le référencement est concentré sur **une seule URL canonique** : `https://south-boat.com`.

## 3. Modifier le site

### Ajouter / modifier un article (cas courant)
Éditer **`articles.js`** directement (fichier texte simple), puis re-téléverser ce seul fichier.
Aucune compilation nécessaire.

### Modifier le code des pages (rare)
Si vous modifiez un fichier **`.jsx`** (`pages.jsx`, `app.jsx`, etc.), il faut **recompiler** :

```bash
npm install      # une seule fois
npm run build    # régénère le dossier dist/
```

Puis re-téléverser le dossier `dist/`.

> ⚠️ Important : modifier un `.jsx` sans lancer `npm run build` n'a **aucun effet** en ligne (le site charge `dist/`, pas les `.jsx`). Pensez aussi à incrémenter le `?v=...` dans `index.html` pour forcer le rafraîchissement du cache.

## 4. Après la mise en ligne — référencement

1. Créer/valider la propriété **Google Search Console** pour `https://south-boat.com`.
2. Y soumettre le sitemap : `https://south-boat.com/sitemap.xml`.
3. Créer/réclamer la fiche **Google Business Profile** (Mandelieu) — cohérente avec le JSON-LD (nom, téléphone, adresse).
4. À faire encore : pages **Mentions légales / CGV / Politique de confidentialité (RGPD)** — obligatoires en France.
