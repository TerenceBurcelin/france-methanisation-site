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

## 6. Déploiement vers IONOS (hébergement retenu)

Le domaine `france-methanisation.com` et l'hébergement web sont chez IONOS.
La publication se fait par SFTP grâce au script `deploy.py` de ce dossier —
Claude peut le relancer à chaque modification pour republier le site.

### 6.1 Récupérer les accès SFTP (une seule fois)

Dans le panneau IONOS (Kundencenter / espace client) :

1. Aller dans **Hébergement** → votre package → **FTP & SFTP** (ou
   « Accès FTP »).
2. Activer/relever l'**accès SFTP** (à privilégier, plus sécurisé que le FTP
   classique) : noter l'**hôte** (ex. `access-xxxxxxxx.webspace-host.com`),
   le **port** (22 par défaut), le **nom d'utilisateur**, et définir/relever
   le **mot de passe**.
3. Repérer le **dossier racine du site** : si le package n'héberge que
   `france-methanisation.com`, c'est en général `/`. S'il héberge plusieurs
   domaines, IONOS crée un sous-dossier par domaine (ex.
   `/france-methanisation.com/`) — c'est ce chemin qu'il faut utiliser.

### 6.2 Enregistrer ces accès en local (jamais dans OneDrive, jamais partagés avec Claude)

Un fichier modèle a été créé à l'emplacement `~/.france-metha-deploy.env`
(dans votre dossier utilisateur macOS, **hors OneDrive**, lisible par vous
seul). Ouvrez-le et remplacez les valeurs `REMPLACEZ_MOI` :

```bash
open -e ~/.france-metha-deploy.env
```

```
IONOS_SFTP_HOST=access-xxxxxxxx.webspace-host.com
IONOS_SFTP_PORT=22
IONOS_SFTP_USER=votre_utilisateur_sftp
IONOS_SFTP_PASS=votre_mot_de_passe
IONOS_REMOTE_DIR=/
```

Enregistrez. Ce fichier ne doit jamais être copié dans le dossier du site,
ni envoyé à qui que ce soit.

### 6.3 Publier le site

Depuis ce dossier :

```bash
/usr/bin/python3 deploy.py
```

Le script envoie tous les fichiers nouveaux ou modifiés vers IONOS. Options
utiles :

- `--dry-run` : simule le déploiement sans rien transférer (pour vérifier).
- `--delete` : supprime aussi sur le serveur les fichiers qui n'existent
  plus en local (à utiliser une fois que vous êtes à l'aise avec le
  fonctionnement — cela ne touche jamais `.well-known/` ni `cgi-bin/`).

**À chaque nouvelle modification demandée depuis Claude, il suffit de
redemander la publication** : Claude relance `deploy.py` et le site en ligne
est mis à jour en quelques secondes.

### 6.4 Relier le nom de domaine à l'hébergement

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
