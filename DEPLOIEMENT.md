# Déploiement & maintenance — South Boat

## 1. Mettre le site en ligne (Hostinger)

Le site doit être servi **à la racine** du domaine `south-boat.com` (hébergement PHP/Apache).

**Fichiers à téléverser** dans `public_html/` :

- `index.html`, `404.html`, `styles.css`
- `robots.txt`, `sitemap.xml`, `.htaccess`
- `cal-api.js`, `articles.js`, `entretien-prestations.js`
- `cal-proxy.php` (+ `cal-config.php` créé à partir de `cal-config.example.php`)
- le dossier **`dist/`** (JavaScript compilé — indispensable)
- le dossier **`images/`**
- le dossier **`videos/`** (vidéos drone du hero, de la fiche bateau et des feux d'artifice — ~10 Mo)

> ⚠️ Le dossier `videos/` est **obligatoire**. S'il manque, les vidéos ne
> s'affichent pas et **aucune erreur n'est visible** : le `.htaccess` renvoie
> `index.html` pour tout fichier absent, donc le navigateur reçoit du HTML à la
> place du MP4 et se contente d'afficher la photo de remplacement (`poster`).

## 1 bis. Les tailles multiples des photos (important)

Chaque photo du site existe en plusieurs largeurs, **côte à côte dans le même
dossier**, plus une version WebP de chacune :

```
location-bateau-mandelieu-south-boat.jpg           (originale)
location-bateau-mandelieu-south-boat-800.jpg       (écrans retina)
location-bateau-mandelieu-south-boat-400.jpg       (vignettes, téléphone)
+ un fichier .jpg.webp pour chacune des trois
```

Le navigateur choisit tout seul la bonne taille (`srcset`), et le `.htaccess`
sert le WebP à qui l'accepte. **Il faut donc téléverser tout le dossier
`images/`**, pas seulement les originales : sans les `-400`/`-800`, les
vignettes ne s'affichent pas du tout.

Pour ajouter une photo, générer ses variantes avec :

```bash
ffmpeg -i photo.jpg -vf "scale=800:-2:flags=lanczos" -q:v 4 photo-800.jpg
ffmpeg -i photo.jpg -vf "scale=400:-2:flags=lanczos" -q:v 4 photo-400.jpg
cwebp -q 80 photo-800.jpg -o photo-800.jpg.webp
cwebp -q 80 photo-400.jpg -o photo-400.jpg.webp
```

> ⚠️ Les images sont en cache **un an** et leurs URLs n'ont pas de `?v=`.
> Pour **remplacer** une photo, changer son nom de fichier — sinon les
> visiteurs déjà venus continueront de voir l'ancienne.

**À NE PAS téléverser :**

- `node_modules/` (très lourd, inutile en production)
- les fichiers source `*.jsx` (`app.jsx`, `pages.jsx`, `planning.jsx`, `fireworks.jsx`, `entretien.jsx`, `tweaks-panel.jsx`, `boot.jsx`) — facultatifs, seul `dist/` est utilisé
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

### « L'article du moment » : rotation automatique chaque semaine

L'article mis en avant (bandeau **« L'article du moment »** sur la page Cap Sud
et bloc **« Dernier article »** en page d'accueil) **change tout seul chaque
lundi**. Rien à faire : le calcul est fait dans le navigateur du visiteur à
partir de la date du jour, il n'y a ni serveur ni tâche planifiée à surveiller.

Avec 3 articles, chacun passe à la une une semaine sur trois. Ajouter un
article à `articles.js` suffit à l'inclure dans la rotation.

Les réglages sont en bas de `articles.js` :

| Ce que vous voulez | Ce qu'il faut écrire |
|---|---|
| Forcer un article à la une et suspendre la rotation | `epingle: true,` dans le bloc de cet article (retirer la ligne pour reprendre la rotation) |
| Qu'un article ne passe jamais à la une | `rotation: false,` dans son bloc |
| Qu'un article sorte de la rotation après une date (article d'événement) | `alaUneJusquau: "2026-09-20",` dans son bloc |
| Arrêter complètement la rotation | `active: false` dans le bloc `ROTATION` |

### Page Entretien : prestations et prix « à partir de »
La page **/entretien-bateau** lit ses prestations dans **`entretien-prestations.js`**
(fichier texte simple, comme `articles.js`). Tant qu'aucun montant n'est
renseigné, chaque carte affiche **« Sur devis »**.

Pour afficher un prix, remplacer `aPartirDe: null,` par le montant dans le bloc
de la prestation (ou du niveau de lustrage, ou du forfait), et préciser l'unité
si besoin :

```js
aPartirDe: 150,
unite: "€ / m",
```

La carte affiche alors « À partir de 150 € / m » (« From 150 € / m » en anglais).
Re-téléverser ce seul fichier, en incrémentant son `?v=` dans `index.html`.

Les demandes de devis du formulaire arrivent sur la même adresse que la page
Contact (service Web3Forms), avec l'objet « [Devis entretien South Boat] ».

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
