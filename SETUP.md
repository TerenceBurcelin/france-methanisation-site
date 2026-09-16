# Site France Méthanisation — Notes de mise en ligne

Site statique (HTML/CSS/JS pur, aucune dépendance à installer). Il fonctionne
tel quel en ouvrant `index.html`, mais quelques points sont à finaliser avant
la mise en ligne publique.

## 1. Prévisualiser le site en local

Depuis ce dossier :

```bash
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000 dans un navigateur.

## 2. Personnaliser avant mise en ligne

- **Adresse e-mail de contact** : remplacer `contact@france-methanisation.fr`
  dans `assets/js/main.js` (constante `CONTACT_EMAIL`) et dans
  `assets/js/footer.js` par la vraie adresse une fois le nom de domaine /
  la messagerie créés.
- **Mentions légales** (`mentions-legales.html`) : compléter les champs
  marqués `[À compléter]` (forme juridique, SIREN/RCS, adresse du siège,
  hébergeur) dès l'immatriculation de la société.
- **Favicon / logo** : le site utilise pour l'instant un simple monogramme
  "FM" en CSS. Un vrai logo pourra être ajouté dans `assets/img/` et
  référencé dans le `<head>` de chaque page.

## 3. Recevoir réellement les formulaires (contact + téléchargement du pitch deck)

Le site n'a pas de serveur : par défaut, chaque formulaire enregistre la
demande dans le navigateur du visiteur et ouvre un e-mail pré-rempli à
destination de `CONTACT_EMAIL`. C'est fonctionnel, mais dépend de l'action du
visiteur (il doit envoyer l'e-mail qui s'ouvre) et ne centralise rien.

Pour capter automatiquement les leads (recommandé), deux options simples :

**Option A — Formspree (gratuit, 5 minutes, fonctionne sur n'importe quel
hébergeur)**
1. Créer un compte sur https://formspree.io et un formulaire.
2. Copier l'URL du formulaire (ex. `https://formspree.io/f/xxxxxxxx`).
3. Dans `assets/js/main.js`, renseigner :
   ```js
   const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";
   ```

**Option B — Netlify Forms (si le site est hébergé sur Netlify)**
1. Ajouter `data-netlify="true"` et un champ caché `form-name` à chaque
   `<form data-fm-form="...">` du site.
2. Netlify collecte alors automatiquement les soumissions dans son
   interface, sans code supplémentaire.

Sans configuration, le site reste utilisable : le repli par e-mail
pré-rempli fonctionne dans tous les cas.

## 4. Pitch deck téléchargeable

Le PDF servi après le formulaire investisseurs se trouve dans
`assets/downloads/France-Methanisation-Pitch-Deck.pdf`. Il a été généré à
partir de `Financement/Pitch Deck France Méthanisation V3.pptx`. Pensez à
regénérer ce PDF (export PowerPoint → PDF) à chaque mise à jour du pitch
deck, et à remplacer le fichier dans ce dossier.

## 5. Hébergement : GitHub Pages (mis en place)

Le site est hébergé directement par **GitHub Pages** — pas de serveur IONOS
pour ce site, pas de SFTP, pas d'identifiant à gérer. Le dépôt source est :
[TerenceBurcelin/france-methanisation-site](https://github.com/TerenceBurcelin/france-methanisation-site).

Concrètement : quand vous demandez une modification à Claude, il édite les
fichiers, commit et pousse sur GitHub — GitHub republie automatiquement le
site en 1 à 2 minutes. Aucune étape supplémentaire, aucun identifiant IONOS
n'est jamais nécessaire pour publier.

Le fichier `CNAME` à la racine du dépôt (contenant `france-methanisation.com`)
indique à GitHub Pages quel domaine personnalisé servir — ne pas le
supprimer.

### 5.1 Configuration one-shot déjà faite / à faire

- [x] Fichier `CNAME` ajouté au dépôt.
- [ ] Rendre le dépôt **public** (Settings → General → Danger Zone → Change
      visibility) — obligatoire pour utiliser GitHub Pages gratuitement sur
      un compte personnel. Aucune donnée sensible n'est présente dans le
      dépôt (identifiants, mots de passe) : seul le contenu du site et le
      pitch deck, déjà destiné à être diffusé aux investisseurs.
- [ ] Activer GitHub Pages : Settings → Pages → Source : **Deploy from a
      branch** → Branch : `main` / `(root)` → Save.
- [ ] Chez IONOS, pointer le domaine vers GitHub Pages en DNS (voir 5.2).
- [ ] Une fois le DNS propagé, cocher **Enforce HTTPS** dans Settings →
      Pages (le certificat SSL est généré automatiquement par GitHub, sans
      action côté IONOS).

### 5.2 DNS chez IONOS

Sur le compte IONOS qui possède le domaine, **Domaines & SSL** →
`france-methanisation.com` → onglet **DNS** (ne pas repasser par
« Connecter à un espace Web », qui pointe vers l'hébergement IONOS et non
vers GitHub).

Ajouter/modifier ces enregistrements, **sans toucher aux enregistrements MX
existants** (messagerie) :

| Type  | Nom / Hôte | Valeur                     |
|-------|------------|----------------------------|
| A     | @ (racine) | `185.199.108.153`          |
| A     | @ (racine) | `185.199.109.153`          |
| A     | @ (racine) | `185.199.110.153`          |
| A     | @ (racine) | `185.199.111.153`          |
| CNAME | www        | `terenceburcelin.github.io.` |

Ce sont les quatre adresses IP officielles de GitHub Pages (toujours les
mêmes, pour n'importe quel site GitHub Pages). Propagation généralement
rapide (quelques minutes à 1h).
