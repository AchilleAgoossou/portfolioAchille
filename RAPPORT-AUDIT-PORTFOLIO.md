# Audit du portfolio d'Achille AGOOSSOU

*Audit réalisé en tant que développeur web et UX/UI designer, le 26 septembre 2026. Analyse du code source (HTML, CSS, JS, bibliothèques, CV joint). Le site n'a pas été testé en ligne : les points marqués (*) sont à confirmer dans un navigateur.*

## 1. Résumé

Le site est propre et bien structuré, mais **il n'est pas prêt à être publié**. Trois blocages : des **données personnelles trop exposées** (surtout dans le CV), du **contenu encore provisoire** (réalisations vides, liens sociaux morts), et un **template ancien** dont plusieurs composants ne sont plus maintenus.

## 2. Sécurité du template

Le site repose sur le template gratuit **« JohnDoe Landing Page »** (DevCRUD, 2019).

**Verdict :** aucun code malveillant trouvé (pas de code masqué, pas d'appel vers des domaines inconnus dans les fichiers du template). Le problème est l'**âge des composants**.

| Composant | Version | Constat | Action |
|---|---|---|---|
| jQuery | 3.4.1 (2019) | Deux failles XSS connues (CVE-2020-11022 et 11023), corrigées depuis la 3.5.0. Risque faible ici (le site n'affiche pas de contenu saisi par les visiteurs), mais à ne pas publier tel quel. | Passer à 3.7+ |
| Bootstrap | 4.3.1 (2019) | Version abandonnée depuis 2023 : plus aucun correctif. Faille connue sur le carrousel (CVE-2024-6531), **non exploitable ici** car le site n'a pas de carrousel. | Migrer vers Bootstrap 5 |
| Plugin « affix » | Bootstrap 3.3.6 (2016) | Plugin de l'ancienne génération, mélangé avec Bootstrap 4. Source de bugs de menu. | Le remplacer par `position: sticky` (déjà utilisé) |
| Isotope | 3.0.6 | Pas de faille connue. **Licence payante pour un usage commercial.** Utilisé pour filtrer 6 cartes vides. | Le retirer ou acheter la licence |
| Themify Icons | — | Dossier de 468 Ko **non utilisé** (remplacé par des icônes SVG). | Supprimer |
| Google Maps | — | Code de carte inutilisé dans `johndoe.js`. | Supprimer |

Les fichiers ont été contrôlés par leur version et par recherche de code suspect, pas comparés octet par octet aux originaux. Un `npm audit` ou l'outil *retire.js* le confirmerait.

## 3. Failles et risques propres au site

| Gravité | Problème | Correction |
|---|---|---|
| 🔴 | **CV public trop détaillé** : nom complet à l'état civil, date et lieu de naissance, coordonnées de deux personnes de référence (sans leur accord probable). | Version publique allégée, références « sur demande ». |
| 🔴 | **Formulaire non protégé.** Les identifiants EmailJS sont visibles dans le code (normal), donc n'importe qui peut envoyer des messages à la place du site. Aucun captcha ni champ anti-robot. | Dans EmailJS : domaine autorisé, captcha, quota. Ajouter un champ piège. |
| 🔴 | **Date de naissance, téléphone et email** en clair sur la page. | Retirer la date de naissance. |
| 🟠 | Script EmailJS chargé depuis un site externe, **version flottante, sans vérification d'intégrité**. | Fixer la version et ajouter `integrity`. |
| 🟠 | **Aucun en-tête de sécurité** (CSP, etc.). Impossible sur GitHub Pages. | Hébergeur type Netlify ou Cloudflare Pages. |
| 🟠 | **Polices Google** chargées depuis leurs serveurs (adresse IP des visiteurs transmise, problème RGPD). | Les héberger localement. |
| 🟠 | Aucune **mention légale ni politique de confidentialité**, alors que le formulaire collecte des données. | Ajouter les deux. |
| 🟠 | CV en `.docx` : métadonnées cachées (auteur « CUBE DEV »). | Fournir un PDF propre. |
| 🟡 | Notes internes visibles dans le code source (« TODO », « PLACEHOLDER »). Téléphone du développeur dans le pied de page. | Retirer. |

## 4. Ce qui ne fonctionne pas

- **10 liens de réseaux sociaux** pointent vers `#` (ils ramènent en haut de page).
- **Section « Réalisations » vide** : 6 cases provisoires, et les filtres filtrent du vide.
- **Menu mobile** (*) : reste ouvert après un clic sur un lien, le code ne le referme pas.
- **Bouton « Retour »** (*) : chaque clic du menu ajoute une entrée d'historique.
- **Barre de menu** : le seuil de changement d'aspect est fixé à 510 px alors que la hauteur de l'en-tête varie. La hauteur du menu est supposée à 88/92 px, mais le logo fait 170 px (*).
- **Aperçu de partage** (WhatsApp, LinkedIn) : les images de partage sont en adresse relative, **aucune image ne s'affichera**.
- **Formulaire** : le fonctionnement réel dépend de la configuration EmailJS (non vérifiée). Sans JavaScript, il ne marche pas et rien ne l'indique.
- **Services** : le code indique « contenu placeholder, à valider par Achille ».
- **Fichiers absents** : `robots.txt` est exclu par le `.gitignore` et n'est donc jamais publié.
- **Code mort** : carte Google Maps, style « flèche de défilement » sans la flèche, dossier d'icônes inutilisé.

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

## 6. UX / UI et accessibilité

- **Contrastes insuffisants** (norme : 4,5 minimum). Corail sur blanc : **3,1** (dates, petits titres, liens). Blanc sur bouton corail : **3,1**. Gris des légendes : **3,9**. Texte d'aide des champs : **2,2**.
- **Formulaire** : titres des champs cachés, seul le texte gris (qui disparaît à la saisie) indique quoi écrire. Messages d'erreur généraux, sans lien avec le champ fautif.
- **Menu coupé en deux** autour d'un grand logo (170 px), donc peu clair, lourd en mobile (*).
- **Bouton de menu** étiqueté en anglais (« Toggle navigation »). Logo placé directement dans une liste (code invalide).
- **Filtres** codés comme des liens, pas des boutons. **Aucune preuve sociale** (témoignages, logos de partenaires).
- **Paragraphe « Qui suis-je ? »** : un bloc de 10 lignes.
- **Chiffres clés** sans période ni source. **Pas de bouton WhatsApp**, alors que c'est le canal principal au Togo.

## 7. Vitesse et référencement

- Bibliothèques chargées **non compressées** (jQuery 291 Ko au lieu de 88 Ko), alors que les versions `.min` sont dans le dossier. Fichiers inutiles (`slim`, `.map`, Themify), 254 Ko de CSS, images en JPG (WebP recommandé).
- **Pas de nom de domaine** : pas d'adresse canonique, pas de sitemap. `<title>` trop long (65 caractères).

## 8. Plan d'action

**Avant toute publication**
1. Alléger le CV public et retirer la date de naissance du site.
2. Protéger le formulaire (domaine, captcha, quota, champ piège).
3. Faire valider par Achille les services, les dates et les chiffres.

**Avant la mise en ligne**
4. Remplir ou masquer les réalisations. Mettre les vrais liens sociaux.
5. Acheter un domaine, corriger les images de partage.
6. Corriger fautes et contrastes. Ajouter mentions légales.
7. Mettre à jour jQuery, fixer la version du script externe, retirer Isotope, Google Maps et Themify.

**Ensuite**
8. Corriger le menu mobile, alléger le site, héberger les polices.
9. Ajouter WhatsApp, témoignages, CV PDF.
10. Migrer vers Bootstrap 5 ou du code natif.

## 9. Points à confirmer avec Achille

Dates du poste « Senior Commercial Manager », statut d'ICADES 360°, périodes de D-CLIC, orthographe d'« Emmergelead », signification du numéro dans le CV, accord des références, dépôt GitHub public ou privé, protections EmailJS déjà actives ou non.
