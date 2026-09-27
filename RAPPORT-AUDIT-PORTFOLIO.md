# Audit du portfolio d'Achille AGOOSSOU

*Audit réalisé en tant que développeur web et UX/UI designer, le 27 septembre 2026. Analyse du code source (HTML, CSS, JS, bibliothèques, CV joint) et test en conditions réelles : site lancé sur un serveur local et piloté avec un navigateur Chromium automatisé (Playwright), en résolution desktop (1440×900) et mobile (375×812), avec captures d'écran et lecture de la console du navigateur.*

**Incident survenu pendant le test :** la soumission du formulaire de contact a reçu la réponse « Message envoyé », ce qui indique qu'un message de test a probablement été transmis à la vraie boîte mail d'Achille. À vérifier et supprimer si nécessaire. Ce test confirme aussi en conditions réelles qu'aucune protection anti-spam n'est active (voir §3).

## 1. Résumé

Le site est propre et bien structuré, mais **il n'est pas prêt à être publié**. Trois blocages : des **données personnelles trop exposées** (surtout dans le CV), du **contenu encore provisoire** (réalisations vides, liens sociaux morts), et un **template ancien** dont plusieurs composants ne sont plus maintenus. Le test en navigateur confirme un bug réel sur le menu mobile et deux défauts d'affichage supplémentaires.

## 2. Sécurité du template

Le site repose sur le template gratuit **« JohnDoe Landing Page »** (DevCRUD, 2019).

**Verdict :** aucun code malveillant trouvé (pas de code masqué, pas d'appel vers des domaines inconnus dans les fichiers du template). Le problème est l'**âge des composants**.

| Composant | Version | Constat | Action |
|---|---|---|---|
| jQuery | 3.4.1 (2019) | Deux failles XSS connues (CVE-2020-11022 et 11023), corrigées depuis la 3.5.0. Risque faible ici (le site n'affiche pas de contenu saisi par les visiteurs), mais à ne pas publier tel quel. | Passer à 3.7+ |
| Bootstrap | 4.3.1 (2019) | Version abandonnée depuis 2023 : plus aucun correctif. | Migrer vers Bootstrap 5 |
| Plugin « affix » | Bootstrap 3.3.6 (2016) | Plugin de l'ancienne génération, mélangé avec Bootstrap 4. Fonctionne (testé : la classe `affix` s'ajoute bien au défilement), mais source de dette technique. | Remplacer par `position: sticky` |
| Isotope | 3.0.6 | Pas de faille connue. Fonctionne (filtre testé, voir §4). **Licence payante pour un usage commercial.** Utilisé pour filtrer 6 cartes vides. | Le retirer ou acheter la licence |
| Themify Icons | — | Dossier de 468 Ko **non utilisé** (remplacé par des icônes SVG). | Supprimer |
| Google Maps | — | Code de carte inutilisé dans `johndoe.js`. | Supprimer |

Les fichiers ont été contrôlés par leur version et par recherche de code suspect, pas comparés octet par octet aux originaux. Un `npm audit` ou l'outil *retire.js* le confirmerait.

## 3. Failles et risques propres au site

| Gravité | Problème | Correction |
|---|---|---|
| 🔴 | **CV public trop détaillé** : nom complet à l'état civil, date et lieu de naissance, coordonnées de deux personnes de référence (sans leur accord probable). | Version publique allégée, références « sur demande ». |
| 🔴 | **Formulaire non protégé — confirmé en test réel.** Un envoi automatisé avec de fausses données a été accepté et semble avoir déclenché un vrai email, sans captcha ni vérification. | Dans EmailJS : domaine autorisé, captcha, quota. Ajouter un champ piège. |
| 🔴 | **Date de naissance, téléphone et email** en clair sur la page. | Retirer la date de naissance. |
| 🟠 | Script EmailJS chargé depuis un site externe, **version flottante, sans vérification d'intégrité**. | Fixer la version et ajouter `integrity`. |
| 🟠 | **Aucun en-tête de sécurité** (CSP, etc.). Impossible sur GitHub Pages. | Hébergeur type Netlify ou Cloudflare Pages. |
| 🟠 | **Polices Google** chargées depuis leurs serveurs (adresse IP des visiteurs transmise, problème RGPD). | Les héberger localement. |
| 🟠 | Aucune **mention légale ni politique de confidentialité**, alors que le formulaire collecte des données. | Ajouter les deux. |
| 🟠 | CV en `.docx` : métadonnées cachées (auteur « CUBE DEV »). | Fournir un PDF propre. |
| 🟡 | Notes internes visibles dans le code source (« TODO », « PLACEHOLDER »). Téléphone du développeur dans le pied de page. | Retirer. |

## 4. Ce qui ne fonctionne pas — testé en navigateur

| Constat | Preuve |
|---|---|
| **Le menu mobile ne se referme pas après un clic sur un lien.** Après avoir touché « À propos », le menu reste grand ouvert au-dessus de la section, l'utilisateur doit le refermer lui-même. Classe CSS `show` toujours présente après le clic. | Capture avant/après clic, propriété `class` du menu relevée dans les deux états |
| **10 liens de réseaux sociaux** mènent à `#` (haut de page), confirmé sur les deux jeux d'icônes (en-tête et bloc « Informations personnelles »). | 10 attributs `href="#"` relevés directement sur la page |
| **Section « Réalisations » vide**, avec ses 6 cases provisoires ; le filtre « Formation » fonctionne techniquement mais ne trie que du vide. | Testé : clic sur le filtre, l'affichage change bien, mais le contenu reste vide de sens |
| **Formulaire de contact** : la validation empêche bien un envoi vide (« Merci de renseigner votre nom… »), mais un envoi rempli avec de fausses données passe sans aucun contrôle. | Testé (voir alerte en tête de rapport) |
| **Aucune erreur dans la console du navigateur**, ni sur desktop ni sur mobile : le site ne plante pas techniquement. | Console lue pendant tout le parcours de test |
| **Barre de menu collante** : fonctionne (la classe `affix` s'ajoute bien au défilement, la barre reste visible en haut). | Testé |
| **Aperçu de partage** (WhatsApp, LinkedIn) : l'image de partage est en adresse relative (`assets/imgs/...`). Sans nom de domaine, **aucune image ne peut s'afficher** au partage du lien. | Valeur lue dans la page |
| **Services** : le code indique « contenu placeholder, à valider par Achille ». | Lecture du code |
| **`robots.txt`** exclu du dépôt par le `.gitignore` : ne sera jamais publié avec le site. | Lecture du `.gitignore` |
| **Code mort** : carte Google Maps jamais appelée, style « flèche de défilement » sans la flèche correspondante dans la page, dossier d'icônes Themify non chargé. | Lecture du code |

## 5. Contenu : fautes et incohérences

**Fautes**

| Actuel | Correct |
|---|---|
| « +5 ans d'expériences », « +10 ans d'expériences » | « Plus de 5 ans d'expérience » |
| « projets de grandes envergures » | « projets de grande envergure » |
| « objectifs de Développement durable » | « objectifs de développement durable » |
| « ONG & Associations de collaboration » | « ONG et associations partenaires » |
| « brandeur », « j'excelle » | Reformuler : anglicisme et auto-louange |
| « Communication Stratégique » / « Communication stratégique » | Une seule règle de majuscules |
| Apostrophes `'` et `’` mélangées | Uniformiser |
| « Emmergelead » | Vérifier l'orthographe (Emergelead ?) |
| « BP 01, Togo 2000 — Lomé, Togo » | Adresse ambiguë, « Togo » en double |

**Incohérences entre le site et le CV**

- **ICADES 360°** est citée comme entreprise dirigée par Achille (titre, partage, Google), mais **absente du CV et du parcours**.
- **« Senior Commercial Manager » 2013–2017** : mêmes dates que le baccalauréat. Peu crédible, à vérifier.
- **Années d'expérience en associations** : 8 ans, 10 ans ou 13 ans selon l'endroit.
- **Expérience radio** annoncée « +5 ans », le CV donne environ 4 ans et 4 mois.
- **AIESEC** : plusieurs postes du CV fusionnés en un seul sur 2020–2023.
- **D-CLIC** : deux périodes différentes dans le CV (janvier–avril 2025 et nov. 2025 – mars 2026).
- **Langues** : le CV note le français 3/5 sur une échelle où 1 est le meilleur. L'allemand est sur le site mais pas dans le CV.
- Un **numéro inexpliqué** en bas du CV (35807656223000).

## 6. UX / UI et accessibilité — confirmé visuellement

- **Contrastes insuffisants** (norme : 4,5 minimum), confirmés par lecture des couleurs réellement affichées. Corail `rgb(248,92,112)` sur blanc : **3,1:1** (dates, petits titres, liens, texte des boutons). Gris des légendes et texte d'aide des champs : sous le seuil également.
- **Formulaire** : titres des champs cachés visuellement, seul le texte gris (qui disparaît à la saisie) indique quoi écrire. Message d'erreur général, sans lien avec le champ fautif — confirmé en testant un envoi vide.
- **Photo circulaire du menu (170 px)** chevauche la limite entre la photo d'en-tête et la barre de menu ; sur desktop, elle recouvre en partie la main du portrait en arrière-plan. Effet probablement volontaire, mais à valider avec Achille tant l'overlap est prononcé.
- **Menu mobile** : bouton étiqueté en anglais (« Toggle navigation »). Une fois ouvert, il occupe environ 350 px de hauteur, soit près de la moitié d'un écran de téléphone.
- **Filtres** codés comme des liens, pas des boutons. **Aucune preuve sociale** (témoignages, logos de partenaires).
- **Paragraphe « Qui suis-je ? »** : un bloc de 10 lignes.
- **Chiffres clés** sans période ni source. **Pas de bouton WhatsApp**, alors que c'est le canal principal au Togo.
- Sur mobile, la **photo du logo dans le menu déroulant disparaît** (masquée par le CSS responsive) : cohérent, pas un bug.

## 7. Vitesse et référencement

- Bibliothèques chargées **non compressées** (jQuery 291 Ko au lieu de 88 Ko), alors que les versions `.min` sont dans le dossier. Fichiers inutiles (`slim`, `.map`, Themify), 254 Ko de CSS, images en JPG (WebP recommandé).
- **`<title>` mesuré à 65 caractères** : Google le coupera dans les résultats de recherche.
- **Pas de nom de domaine** : pas d'adresse canonique, pas de sitemap.

## 8. Plan d'action

**Avant toute publication**
1. Alléger le CV public et retirer la date de naissance du site.
2. Protéger le formulaire (domaine, captcha, quota, champ piège) — priorité absolue vu le test réalisé.
3. Faire valider par Achille les services, les dates et les chiffres.

**Avant la mise en ligne**
4. Remplir ou masquer les réalisations. Mettre les vrais liens sociaux.
5. Corriger le menu mobile (fermeture automatique après un clic).
6. Acheter un domaine, corriger les images de partage.
7. Corriger fautes et contrastes. Ajouter mentions légales.
8. Mettre à jour jQuery, fixer la version du script externe, retirer Isotope, Google Maps et Themify.

**Ensuite**
9. Alléger le site (fichiers `.min`, suppression des inutilisés, images WebP), héberger les polices.
10. Ajouter WhatsApp, témoignages, CV PDF.
11. Migrer vers Bootstrap 5 ou du code natif.

## 9. Points à confirmer avec Achille

Dates du poste « Senior Commercial Manager », statut d'ICADES 360°, périodes de D-CLIC, orthographe d'« Emmergelead », signification du numéro dans le CV, accord des références, dépôt GitHub public ou privé, effet réel du message de test envoyé pendant cet audit.
