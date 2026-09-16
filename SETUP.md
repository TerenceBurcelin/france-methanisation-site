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

## 5. Hébergement

Le site est 100% statique : il peut être déployé tel quel sur Netlify,
Vercel, OVH, o2switch, GitHub Pages, etc. Il suffit d'y transférer tout le
contenu de ce dossier.

## 6. Déploiement vers IONOS via GitHub (mis en place)

Le site source vit sur GitHub :
[TerenceBurcelin/france-methanisation-site](https://github.com/TerenceBurcelin/france-methanisation-site)
(dépôt privé). Un workflow GitHub Actions (`.github/workflows/deploy.yml`)
publie automatiquement tout le contenu de ce dossier sur l'hébergement IONOS
par SFTP à chaque `git push` sur la branche `main`.

Le workflow retire ce fichier (`SETUP.md`) avant publication et resynchronise
exactement le dossier distant `IONOS_REMOTE_DIR` sur le contenu du dépôt
(`delete_remote_files: true`) : tout fichier supprimé du dépôt disparaît
aussi du serveur au déploiement suivant.

Concrètement : quand vous demandez une modification à Claude, il édite les
fichiers, commit et pousse sur GitHub — le site en ligne se met à jour tout
seul 30 secondes à 1 minute plus tard, sans que Claude ait jamais besoin de
vos identifiants IONOS.

### 6.1 Secrets à configurer une seule fois dans GitHub

Dans le dépôt : **Settings → Secrets and variables → Actions → New
repository secret**. Récupérez les valeurs dans le panneau IONOS
(Hébergement → votre package → FTP & SFTP → Accès SFTP) :

| Nom du secret        | Valeur                                            |
|-----------------------|---------------------------------------------------|
| `IONOS_SFTP_HOST`     | ex. `access-xxxxxxxx.webspace-host.com`           |
| `IONOS_SFTP_USER`     | votre utilisateur SFTP IONOS                       |
| `IONOS_SFTP_PASS`     | votre mot de passe SFTP IONOS                      |
| `IONOS_SFTP_PORT`     | en général `22`                                    |
| `IONOS_REMOTE_DIR`    | dossier racine du site (souvent `/`)               |

Ces valeurs sont chiffrées par GitHub, invisibles ensuite (même pour vous en
relecture), et jamais transmises à Claude.

### 6.2 Suivre les déploiements

Onglet **Actions** du dépôt GitHub : chaque push déclenche un run
« Déploiement IONOS » que vous pouvez ouvrir pour voir le détail (succès/
échec, fichiers transférés). En cas d'échec (souvent : mauvais identifiant,
port bloqué, ou chemin distant incorrect), le log indique la cause.

Vous pouvez aussi relancer un déploiement manuellement sans changer de code,
depuis l'onglet Actions → « Déploiement IONOS » → **Run workflow**.

### 6.3 Relier le nom de domaine à l'hébergement

Toujours dans le panneau IONOS :

- Si le domaine a été acheté chez IONOS : **Domaines & SSL** → sélectionner
  `france-methanisation.com` → l'assigner au package d'hébergement
  concerné (assistant en quelques clics).
- Si le domaine est enregistré ailleurs : pointer ses serveurs de noms
  (nameservers) vers IONOS, ou créer les enregistrements A / CNAME indiqués
  par IONOS dans la fiche technique du package d'hébergement.

Une fois le domaine relié, IONOS propose en général l'activation gratuite
d'un certificat SSL (Let's Encrypt) pour passer le site en HTTPS — à activer
dans **SSL** sur la fiche du domaine.
