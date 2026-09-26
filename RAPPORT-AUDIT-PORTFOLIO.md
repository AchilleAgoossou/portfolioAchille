# Rapport d'audit — Portfolio d'Achille AGOOSSOU

| | |
|---|---|
| **Site audité** | Portfolio d'Achille AGOOSSOU (dépôt `AchilleAgoossou/portfolioAchille`) |
| **Date du rapport** | 26 septembre 2026 |
| **Angles d'analyse** | Sécurité web, développement, design / expérience utilisateur, contenu et orthographe |
| **Destinataire** | Lecteur non spécialiste : les termes techniques sont expliqués en fin de document |

---

## 1. En résumé

Le site est **propre, bien organisé et déjà soigné** sur la forme : structure claire, animations discrètes, bonne prise en compte des lecteurs d'écran, images légères. On voit qu'un vrai travail a été fait pour dépasser le modèle de départ.

Il n'est pourtant **pas prêt à être mis en ligne**, pour quatre raisons principales :

1. **Des données personnelles sont trop exposées**, notamment dans le CV téléchargeable (nom complet, date et lieu de naissance, et les numéros de téléphone de deux personnes de référence).
2. **Le site contient encore du contenu provisoire** : une section « Réalisations » vide, des liens de réseaux sociaux qui ne mènent nulle part, des textes de services marqués « à valider ».
3. **Le formulaire de contact n'est pas protégé** contre les envois automatiques.
4. **Il y a des incohérences et des fautes** qui nuisent à la crédibilité (dates qui se chevauchent, chiffres différents entre le site et le CV, erreurs d'accord).

**Bonne nouvelle :** la grande majorité des corrections sont simples et rapides. La liste des priorités est au chapitre 10.

### Tableau de synthèse

| Domaine | Note | Commentaire |
|---|:-:|---|
| Structure et code de la page | 🟢 Bonne | Propre, sémantique, pensé pour l'accessibilité |
| Design et cohérence visuelle | 🟢 Bonne | Sobre, professionnel, typographie soignée |
| Contenu et crédibilité | 🔴 À revoir | Provisoire par endroits, fautes, incohérences |
| Sécurité et vie privée | 🔴 À revoir | Données trop exposées, formulaire non protégé |
| Accessibilité | 🟠 Moyenne | Bonnes bases, mais contrastes et formulaire à corriger |
| Vitesse | 🟠 Moyenne | Beaucoup de fichiers inutiles ou non compressés |
| Référencement Google | 🟠 Moyenne | Manque le nom de domaine et quelques balises |

### Lecture des niveaux de gravité

| Gravité | Signification |
|---|---|
| 🔴 Critique | À faire avant toute mise en ligne |
| 🟠 Important | À faire rapidement |
| 🟡 Mineur | Amélioration de confort ou de finition |

---|---|:-:|
| 🔴 Critique | À faire avant toute mise en ligne | 8 |
| 🟠 Important | À faire rapidement | 19 |
| 🟡 Mineur | Amélioration de confort ou de finition | 21 |

---

## 2. Ce qui a été examiné (et ses limites)

**Fichiers lus en entier :** la page `index.html`, les scripts `contact-form.js`, `ui.js` et `johndoe.js`, la feuille de style `achille.css`, le `README.md`, le `.gitignore`, ainsi que le **contenu du CV** (`CV Ach-Brand.docx`) comparé au site. J'ai aussi vérifié les versions des bibliothèques (jQuery, Bootstrap, Isotope), la taille des fichiers, l'historique Git et calculé les contrastes de couleurs.

**Non fait, à connaître :**

- Le site n'a **pas été ouvert dans un navigateur** : les remarques d'affichage (menu, mise en page mobile) viennent de la lecture du code. Les points concernés sont signalés « à tester ».
- Le site n'étant pas en ligne (pas de nom de domaine), **les réglages du serveur** (en-têtes de sécurité, fichier `robots.txt`) n'ont pas pu être contrôlés.
- Le **tableau de bord EmailJS** n'a pas été consulté : je ne peux pas dire si les protections y sont déjà activées.
- Les fichiers des bibliothèques (`bootstrap`, `jquery`, `isotope`) ont été contrôlés par leur version, pas relus en détail. Les sources `scss/` (modèle d'origine) n'ont pas été relues ligne par ligne.

---

## 3. Sécurité et vie privée

### 3.1 Problèmes critiques 🔴

| N° | Où | Problème | Correction |
|---|---|---|---|
| **S1** | CV téléchargeable (`assets/docs/CV Ach-Brand.docx`) | Le CV contient le **nom complet à l'état civil** (Siwanou Achille Mawouéna AGOOSSOU), la **date et le lieu de naissance** (07/05/1993, Agomé-Séva), la nationalité et le téléphone. Cet ensemble (nom + date + lieu de naissance) sert souvent à répondre aux questions de sécurité des banques ou à monter une fausse identité. | Ne garder sur la version publique que le nom d'usage, le métier, l'email et la ville. Garder la version complète pour l'envoyer à un employeur précis. |
| **S2** | CV téléchargeable | Le CV publie le **nom, l'email et le téléphone de deux personnes de référence** (un consultant et le directeur de Radio Atlantic FM). Ces personnes n'ont peut-être pas donné leur accord pour être visibles de tous, et leurs numéros peuvent être récupérés par des robots. | Retirer ces coordonnées de la version publique (« références disponibles sur demande »). Vérifier aussi l'adresse email de la première référence, qui semble mal orthographiée. |
| **S3** | `index.html` (partie « Informations personnelles ») | La **date de naissance** est affichée en clair sur le site et répétée dans le CV. Elle n'apporte rien à un visiteur professionnel. | Supprimer la date de naissance de la page. |
| **S4** | `assets/js/contact-form.js` | Le formulaire envoie ses messages via **EmailJS**, dont les identifiants sont lisibles dans le code (c'est normal avec ce service). **Rien dans le site n'empêche donc quelqu'un de s'en servir** pour envoyer des milliers de messages depuis la boîte d'Achille. La protection doit être réglée dans EmailJS, et je n'ai pas pu vérifier qu'elle l'est. | Dans le tableau de bord EmailJS : n'autoriser que le domaine du site, activer un captcha, plafonner le nombre d'envois par mois. Ajouter aussi un **champ piège invisible** (anti-robot) dans le formulaire. |
| **S5** | Formulaire + tout le site | Le formulaire collecte un nom, un email et un message, sans **aucune mention** de ce qu'il en est fait. Il n'y a ni page « mentions légales » ni « politique de confidentialité ». Google Fonts, qui transmet l'adresse des visiteurs à Google, n'est pas mentionné non plus. | Ajouter une phrase sous le formulaire (« Vos informations servent uniquement à répondre à votre message ») et une page de mentions légales. |

### 3.2 Points importants 🟠

| N° | Où | Problème | Correction |
|---|---|---|---|
| **S6** | `assets/vendors/jquery` | jQuery **3.4.1 (2019)** a deux failles connues (CVE-2020-11022 et 11023), corrigées depuis. Le risque réel est faible ici car le site n'affiche pas de contenu venant des visiteurs, mais on ne publie pas un site avec une version connue pour être vulnérable. | Passer à jQuery 3.7 ou plus récent (voir aussi T7 pour s'en passer). |
| **S7** | `assets/vendors/bootstrap` | Bootstrap **4.3.1** est une version de 2019. La branche 4 n'est plus maintenue depuis janvier 2023 : les futures failles ne seront plus corrigées. | À terme, migrer vers Bootstrap 5 (qui n'a plus besoin de jQuery). |
| **S8** | `index.html`, fin de page | Le script d'envoi de messages est chargé depuis un site externe (`cdn.jsdelivr.net`) avec une **version flottante** (`@4`) et **sans vérification d'intégrité**. Si ce site externe était piraté, le script du portfolio serait piraté aussi. | Fixer une version précise (ex. `@4.4.1`), ajouter l'attribut `integrity` (empreinte de vérification), ou héberger le fichier soi-même. |
| **S9** | Serveur / hébergement | Aucune protection au niveau du serveur n'est définie (politique de sécurité du contenu, interdiction d'être affiché dans un cadre étranger, etc.). Sur GitHub Pages, ce n'est pas réglable. | Choisir un hébergeur permettant ces réglages (Netlify, Cloudflare Pages…) ou placer Cloudflare devant le site. |
| **S10** | `index.html`, en-tête | Les **polices Google** sont chargées depuis les serveurs de Google : l'adresse IP de chaque visiteur leur est transmise. Ce mode de chargement a été jugé contraire au RGPD par un tribunal allemand en 2022. | Télécharger les polices et les héberger sur le site. |
| **S11** | Fichier CV | Le format `.docx` conserve des **informations cachées** : ici l'auteur du fichier est « CUBE DEV » (le nom de l'employeur), avec l'historique des modifications. | Proposer le CV en **PDF**, généré proprement. |
| **S12** | Dépôt GitHub | L'historique du dépôt conserve tout ce qui a été publié un jour. Si le dépôt est public, l'email, le téléphone, la date de naissance et le CV y sont lisibles, même si on les retire du site ensuite. | Vérifier si le dépôt est public. Si oui, retirer les données sensibles du CV **avant** de le pousser, car les supprimer après ne les efface pas de l'historique. |
| **S13** | `index.html`, commentaires | Des notes internes sont visibles par toute personne qui affiche le code source de la page : « TODO Achille », « CONTENU PLACEHOLDER », « PAS ENCORE DE NOM DE DOMAINE »… | Retirer ces commentaires avant la mise en ligne. |

### 3.3 Points mineurs 🟡

| N° | Problème | Correction |
|---|---|---|
| **S14** | `contact-form.js` affiche l'erreur technique dans la console du navigateur (`console.error`). | Retirer en production. |
| **S15** | Le formulaire n'a pas de limite de longueur sur les champs. | Ajouter des limites raisonnables (ex. 2 000 caractères pour le message). |
| **S16** | Le pied de page affiche le **téléphone du développeur** (99-68-04-69), donc une information privée d'un tiers. | Garder le nom avec un lien, retirer le numéro. |
| **S17** | Le `.gitignore` liste `robots.txt` et `CLAUDE.md`, qui ne seront donc **jamais publiés** avec le site, alors que le README les cite. | Retirer `robots.txt` du `.gitignore` (il doit être publié) et corriger le README. |

---

## 4. Contenu, fautes et incohérences

### 4.1 Fautes d'orthographe et de style 🟠

| N° | Où | Texte actuel | Correction proposée |
|---|---|---|---|
| **C1** | À propos, « Mes expertises » | « +5 ans d'expériences » | « Plus de 5 ans d'expérience » (« expérience » reste au singulier) |
| **C2** | Idem | « +10 ans d'expériences » | « Plus de 10 ans d'expérience » |
| **C3** | Idem | « Gestion des projets de grandes envergures alignés sur les objectifs de Développement durable » | « Gestion de projets de grande envergure alignés sur les objectifs de développement durable » (« envergure » reste au singulier ; pas de majuscule à « développement »). |
| **C4** | Chiffres clés | « ONG & Associations de collaboration » | « ONG et associations partenaires » |
| **C5** | À propos, premier paragraphe | « Directeur d'entreprise et **brandeur**, j'**excelle** dans… » | « Brandeur » est un anglicisme peu courant ; préférer « spécialiste de l'image de marque ». « J'excelle » est une auto-louange qui sonne moins crédible qu'un fait mesurable (« j'ai formé plus de 140 apprenants »). |
| **C6** | À propos | « Expert en communication & marketing digital » | Trop affirmatif sans preuve visible. Préférer « Formateur certifié OIF en communication et marketing digital ». |
| **C7** | Partout | **Majuscules incohérentes** : « Communication Stratégique », « Marketing Digital » dans les étiquettes, mais « Communication stratégique », « Marketing digital » ailleurs. | Choisir une règle (minuscules après la première lettre, selon l'usage français) et l'appliquer partout. |
| **C8** | Partout | **Deux sortes d'apostrophes** mélangées : `'` et `’` (« d'entreprise » / « d’entreprise »). | Uniformiser (préférer l'apostrophe typographique `’`). |
| **C9** | « Mes expertises », 1re ligne | « Certifié OIF en Communication & Marketing Digital. » avec un `&` non protégé dans le code | Écrire `&amp;` dans le code (et « et » dans le texte). |
| **C10** | Coordonnées | « BP 01, Togo 2000 — Lomé, Togo » | Le mot « Togo » est répété deux fois et « Togo 2000 » est ambigu. Vérifier l'adresse exacte (ex. « BP 01, Lomé — Togo »). |
| **C11** | Leadership | « Emmergelead Togo » | Vérifier l'orthographe du nom de l'organisation (il s'écrit peut-être « Emergelead »). Même remarque pour « AEGIS Halo International ». |
| **C12** | Section Réalisations | « Cette section se remplit au fil des projets publiés. » | Phrase de développeur destinée à l'auteur, pas au visiteur. Retirer (voir U1). |
| **C13** | Bandeau sombre | « Je suis disponible pour des missions freelance » | Manque de précision. Ex. : « Disponible pour vos formations, ateliers et missions de conseil en communication ». |
| **C14** | Langues | « Courant / Intermédiaire / Notions de base » | Peu précis. Utiliser les niveaux européens (A1 à C2), ce que comprennent les recruteurs. |

### 4.2 Le texte de services est provisoire 🔴

| N° | Où | Problème | Correction |
|---|---|---|---|
| **C15** | Section « Mes services » | Le code contient la note : « **CONTENU PLACEHOLDER** STRUCTURÉ — titres plausibles, textes **à valider/réécrire par Achille** ». Le texte publié est donc un brouillon, non validé par la personne concernée. | Faire relire et valider chaque service par Achille avant publication. |

### 4.3 Incohérences avec le CV 🟠

En comparant le site avec le CV téléchargeable, plusieurs éléments ne concordent pas. Un recruteur qui lit les deux les remarquera.

| N° | Élément | Site | CV | Recommandation |
|---|---|---|---|---|
| **C16** | **ICADES 360°** | Cité dans le titre de la section « À propos », dans le partage réseaux sociaux et dans les données Google : « directeur d'ICADES 360° » | **Absent du CV** (« Directeur d'entreprise et Brandeur » sans nom). Aucune ligne « ICADES 360° » dans le parcours du site non plus. | Ajouter ICADES 360° au parcours (date de création, activité) sur le site **et** dans le CV, ou ne plus le citer. |
| **C17** | **Poste « Senior Commercial Manager »** | 2013–2017 | 2013–2017 | Ces dates sont **exactement celles du baccalauréat**. Être lycéen à plein temps et responsable commercial sénior en même temps est peu crédible. Vérifier les dates ou préciser (« job étudiant à temps partiel »). |
| **C18** | **Années d'expérience en gestion d'associations** | « +10 ans » (expertises), « 8+ années d'expérience » (chiffres clés) | « Plus de 08 ans » (en-tête du CV) puis « plus de 10 ans » (compétences) | Le CV se contredit lui-même. Choisir un chiffre juste (2013–2026 = 13 ans, ou 2010–2025 selon le CV) et l'utiliser partout. |
| **C19** | **Expérience radio** | « +5 ans d'expériences » | Animateur août 2018 – mars 2021, puis poste administratif jusqu'en décembre 2022 : **environ 4 ans et 4 mois** au total | Écrire « plus de 4 ans » ou compter autrement. Éviter d'exagérer. |
| **C20** | **Période du projet D-CLIC** | « nov. 2025 – mars 2026 » | Deux dates différentes : « Janvier-Avril 2025 » (partenaires) et « Nov 2025 – Mars 2026 » (expériences) | Deux éditions ? Préciser, ou corriger. Le README note aussi que D-CLIC et CUBE se chevauchent. |
| **C21** | **AIESEC** | « Responsable Partenariats & Développement, 2020–2023 » | Le CV liste des postes **différents et non continus** : manager des événements (2020–2021), manager des relations publiques (2021), président du comité de Kara (août–nov. 2021), directeur partenariats (fév. 2022 – fév. 2023) | Le site fusionne plusieurs postes en un seul et étend la période. Reprendre les intitulés et dates du CV. |
| **C22** | **Niveaux de langue** | Français « Courant », anglais « Intermédiaire » | Français **3/5**, anglais **3/4/4 sur 5**, avec une échelle où « 1 = excellent, 5 = basique » | Le CV est trompeur : un français noté 3 sur 5 pour un formateur francophone donne une mauvaise image. Revoir l'échelle et les notes. Le site ne mentionne pas la note. |
| **C23** | **Allemand** | « Notions de base » | Absent du CV | Ajouter au CV ou retirer du site. |
| **C24** | **Chronologie** | CUBE « depuis mai 2025 » listé avant D-CLIC (nov. 2025 – mars 2026) | — | Les postes doivent suivre l'ordre le plus récent en premier. Si D-CLIC est terminé, il devrait passer avant CUBE ou être clairement séparé. |
| **C25** | **Numéro inconnu dans le CV** | — | En pied de page du CV : « 35807656223000 14/04/2026 ». Ce numéro n'est pas expliqué (il ressemble à un numéro d'identification d'entreprise). | Vérifier ce que c'est. Si c'est un numéro d'entreprise, il n'a pas sa place dans un CV public. Si c'est une erreur, le retirer. |

### 4.4 Fautes et défauts dans le CV lui-même 🟡

| N° | Problème |
|---|---|
| **C26** | Certaines phrases sont incorrectes ou incomplètes : « Nombre d'années d'expérience et domaines d'expériences : » (suivi de rien), « en levé de fonds » (« en levée de fonds »), « l'implémentation **de du** système », « Animateur et **Journaleux** » (terme familier), « **Mail - Site** » (aucun site n'est indiqué). |
| **C27** | Plusieurs chiffres sans espace (« 5ans », « 4ans », « 10ans ») et « plus de **08** ans ». |
| **C28** | Le nom du fichier contient un **espace** (« CV Ach-Brand.docx ») : les liens de téléchargement sont moins fiables. Renommer en `CV-Achille-Agoossou.pdf`. |

---

## 5. Défauts techniques (code)

### 5.1 À corriger 🟠

| N° | Où | Problème | Correction |
|---|---|---|---|
| **T1** | `johndoe.js`, `nav` mobile | Sur téléphone, quand on touche un lien du menu, la page défile **mais le menu reste ouvert** : le code ne le referme pas. Il recouvre alors le contenu. *(À tester.)* | Fermer le menu après un clic sur un lien. |
| **T2** | `index.html` (menu) | Le bouton du menu mobile a une étiquette en **anglais** (« Toggle navigation »). Un lecteur d'écran francophone lira de l'anglais. | « Ouvrir le menu ». |
| **T3** | `index.html` (menu) | Le logo est une `<img>` placée **directement dans une liste** `<ul>`, ce qui est invalide (une liste ne doit contenir que des éléments de liste). Certains navigateurs ou lecteurs d'écran réagissent mal. | Placer l'image dans un `<li>` ou hors de la liste. |
| **T4** | `index.html` : `data-offset-top="510"` | Le moment où la barre de menu change d'aspect est fixé à **510 pixels**. Or la hauteur de l'en-tête varie selon l'écran (jusqu'à 840 px). Le changement se déclenche donc au mauvais endroit. | Calculer la valeur à partir de la hauteur réelle de l'en-tête. |
| **T5** | `johndoe.js` (défilement doux) | Après chaque clic, le code **modifie l'adresse de la page** (`window.location.hash`). Le bouton « Retour » doit alors être pressé plusieurs fois pour quitter le site, et un petit saut de quelques pixels est possible car la marge de 92 px du CSS s'ajoute au calcul. *(À tester.)* | Utiliser `history.replaceState` ou le défilement natif du CSS. |
| **T6** | Chiffres fixés dans le code | Le menu est supposé faire 88 px (`ui.js`) ou 92 px (`achille.css`), mais l'image du logo mesure 170 px de haut. Ces valeurs risquent de ne pas correspondre à la vraie hauteur du menu. *(À tester.)* | Mesurer la hauteur réelle du menu au chargement. |
| **T7** | Bibliothèques | **jQuery, Bootstrap et Isotope** sont chargés pour trois usages très simples : un défilement doux, un menu déroulant, un filtre sur 6 cartes. Tout cela existe en code natif. | À moyen terme, remplacer par du code natif : le site s'allège d'environ 400 Ko. |
| **T8** | `johndoe.js` | Le fichier contient encore le code d'une **carte Google Maps** (fonction `initMap`) qui n'est plus utilisée, avec les coordonnées de New York. | Supprimer. |
| **T9** | Licence Isotope | Isotope est gratuit en licence libre (GPLv3), mais **payant pour un usage commercial**. Le site est un portfolio de freelance. | Vérifier le cadre ; sinon supprimer Isotope (voir T7). |

### 5.2 Mineurs 🟡

| N° | Où | Problème |
|---|---|---|
| **T10** | `achille.css` | Le style `.scroll-cue` (flèche « défiler ») est défini mais la flèche n'existe pas dans la page. Code mort à retirer ou fonctionnalité à remettre. |
| **T11** | `index.html` | Le lien « Accueil » pointe vers `#home` sur la balise `<body>` : le code contient un contournement spécial pour cela. Un lien vers le haut de page ou un identifiant sur l'en-tête serait plus simple. |
| **T12** | `index.html` | Un fichier `apple-touch-icon` est un JPG de 400 px : les iPhone attendent un PNG de 180 px. |
| **T13** | `index.html` | Aucun message `<noscript>` : sans JavaScript, le formulaire ne fonctionne pas et rien ne l'explique. |
| **T14** | `README.md` | Il cite des fichiers qui ne sont pas dans le dépôt (`CLAUDE.md`, `robots.txt`). |

---

## 6. Accessibilité et lisibilité

L'accessibilité veut dire : le site est utilisable par des personnes qui voient mal, ne peuvent pas utiliser de souris ou utilisent un lecteur d'écran.

### 6.1 Contrastes de couleurs (mesurés) 🟠

Le rapport doit atteindre **au moins 4,5 pour 1** pour le texte courant (norme WCAG AA).

| N° | Combinaison | Rapport mesuré | Verdict | Où |
|---|---|:-:|:-:|---|
| **A1** | Rose-corail `#f85c70` sur blanc | **3,11 : 1** | ❌ | Dates du parcours, petits titres, « Mes », liens |
| **A2** | Texte blanc sur bouton corail | **3,11 : 1** | ❌ | Boutons « Télécharger mon CV », « Envoyer », « Me contacter » |
| **A3** | Gris `#79828b` sur blanc | **3,9 : 1** | ❌ | Sous-titres, descriptions, légendes |
| **A4** | Gris `#79828b` sur fond beige | **3,69 : 1** | ❌ | Idem sur fond de section alternée |
| **A5** | Texte d'aide des champs `#a7aeb5` sur blanc | **2,24 : 1** | ❌❌ | « Nom * », « Email * », « Message * » |
| A6 | Corail sur fond sombre | 5,32 : 1 | ✅ | Chiffres clés |
| A7 | Texte courant `#4a525a` sur blanc | 7,94 : 1 | ✅ | Paragraphes |
| A8 | Blanc sur corail foncé `#e0405a` | 4,16 : 1 | ⚠️ | Presque : suffisant seulement pour gros texte |

👉 **Correction :** assombrir le corail (viser au moins 4,5 : 1 avec du blanc) et le gris des légendes.

### 6.2 Autres points 🟠

| N° | Où | Problème | Correction |
|---|---|---|---|
| **A9** | Formulaire | Les champs n'ont **pas de titre visible** : seul le texte gris dans le champ indique quoi écrire, et il disparaît dès qu'on tape. Les titres existent mais sont cachés (`sr-only`) pour tous les yeux. | Afficher les titres au-dessus des champs. |
| **A10** | Formulaire | En cas d'erreur, le message général « Merci de renseigner votre nom… » ne dit pas **quel champ** est en cause. Les champs invalides ne sont pas signalés à un lecteur d'écran. | Message individuel sous chaque champ, avec `aria-invalid` et `aria-describedby`. |
| **A11** | Filtres des réalisations | Les boutons de filtre sont des **liens** (`<a href="#">`). Un lecteur d'écran annonce « lien » au lieu de « bouton », et rien n'indique le filtre actif. | Utiliser des `<button>` avec `aria-pressed`. |
| **A12** | Liens réseaux sociaux | Dix liens `href="#"` : un lecteur d'écran annonce des liens vers rien. | Mettre les vrais liens (voir U2). |
| **A13** | Compteurs animés | Le chiffre défile de 0 à 140 : un lecteur d'écran peut annoncer chaque valeur intermédiaire. | Ajouter la valeur finale dans un attribut invisible et masquer l'animation aux lecteurs d'écran. |

### 6.3 Mineurs 🟡

| N° | Problème |
|---|---|
| **A14** | Le texte des petits titres est en majuscules et très petit (11 px, `0,66 rem`), ce qui gêne la lecture. |
| **A15** | Les focus (contour au clavier) sont visibles, c'est bien, mais leur couleur (corail) a le même problème de contraste. |
| **A16** | Le lien « Aller au contenu principal » existe (très bien). Vérifier qu'il apparaît bien au premier appui sur Tab. |

---

## 7. Design et expérience utilisateur

### 7.1 Important 🟠

| N° | Où | Problème | Correction |
|---|---|---|---|
| **U1** | Section « Mes réalisations » | **Six cases vides** avec bordures pointillées et des descriptions du type « Visuel, commanditaire et nombre de participants formés. » C'est le point qui donne le plus l'impression d'un site inachevé. | Publier 2 à 3 vraies réalisations (photos de formations, affiches, vidéos, résultats chiffrés), **ou cacher la section** tant qu'elle est vide. |
| **U2** | En-tête et « Informations personnelles » | Les dix boutons de réseaux sociaux mènent tous à `#` (haut de page). | Mettre les vrais liens ou retirer les réseaux inutilisés. |
| **U3** | Toute la page | **Aucune preuve sociale** : pas de témoignage, pas de logo des organisations citées (OIF, UNFPA, PNUD…), pas de recommandation. Le site affirme, mais ne prouve rien. | Ajouter 2–3 témoignages courts et les logos (avec accord). |
| **U4** | Barre de menu | Le menu est **coupé en deux autour d'un grand logo** : Accueil, À propos, Parcours à gauche ; Services, Réalisations, Contact à droite. Un visiteur ne comprend pas d'emblée qu'il s'agit d'un seul menu, et sur écran étroit l'ordre devient étrange. | Regrouper les liens du même côté. |
| **U5** | Barre de menu | La photo du logo mesure **170 px de haut** dans une barre qui reste collée en haut de l'écran. Sur un petit écran, cela peut occuper une part importante de la hauteur. *(À tester.)* | Réduire la barre collée (80 px maximum). |
| **U6** | Bloc « Qui suis-je ? » | Un **paragraphe unique de 10 lignes**, très dense. Personne ne le lit en entier. | Le découper en 3 paragraphes courts avec un fait marquant par paragraphe. |
| **U7** | Toute la page | Aucun bouton **WhatsApp**, alors qu'au Togo c'est le moyen de contact le plus utilisé. | Ajouter un bouton `wa.me/22890866866` près du formulaire. |
| **U8** | Chiffres clés | « 140+ apprenants », « 40+ entrepreneurs » : **sans période ni source**, donc peu crédibles. | Ajouter le contexte : « 140+ apprenants formés depuis 2023 ». |

### 7.2 Mineurs 🟡

| N° | Problème | Correction |
|---|---|---|
| **U9** | « Communication & Marketing · Business Development » est répété **3 fois** en peu d'espace (en-tête, menu, pied). | Varier ou garder une seule fois. |
| **U10** | Le bandeau « disponible pour des missions freelance » apparaît au milieu, avant les réalisations. | Le déplacer vers la fin, avant le contact. |
| **U11** | Les étiquettes de compétences ont un effet au survol qui ressemble à un bouton, mais elles ne sont pas cliquables. | Retirer l'effet ou les rendre utiles. |
| **U12** | Un visiteur qui hésite n'a aucun **parcours guidé**. | Ajouter, après les services, un bouton « Demander un devis » ou « Prendre rendez-vous ». |
| **U13** | Pas de version claire pour l'**impression** ou un **mode sombre**. | Optionnel. |

---

## 8. Vitesse et référencement

### 8.1 Vitesse 🟠

| N° | Où | Problème | Correction |
|---|---|---|---|
| **P1** | `index.html` | Le site charge les versions **non compressées** des bibliothèques (jQuery 291 Ko, Isotope 95 Ko, Bootstrap complet), alors que les versions compressées (`.min.js`) sont déjà dans le dossier : jQuery 88 Ko au lieu de 291 Ko. | Charger les fichiers `.min.js`. |
| **P2** | Dossier `assets/vendors` | Contient des fichiers **jamais utilisés** : versions `slim`, fichiers `.map`, et le dossier **`themify-icons` (468 Ko)**, l'ancienne police d'icônes remplacée par le sprite SVG. | Supprimer tout ce qui n'est pas utilisé. |
| **P3** | `assets/css/johndoe.css` | **254 Ko** de style, presque tout Bootstrap, alors que le site n'en utilise qu'une petite partie. | Passer un outil de nettoyage (PurgeCSS). |
| **P4** | `assets/scss` | Le dossier des sources contient 469 Ko de fichiers du modèle d'origine. Il n'a pas à être publié. | Ne pas le déployer (l'exclure). |
| **P5** | Images | Toutes en JPG. | Convertir en **WebP** (souvent 30 % plus léger) avec une version JPG de secours. |
| **P6** | `index.html` | Scripts en bas de page, chargés les uns après les autres et de façon bloquante (jQuery, Bootstrap, Isotope, `johndoe.js`). | Ajouter `defer`. |

### 8.2 Référencement (SEO) 🟠

| N° | Où | Problème | Correction |
|---|---|---|---|
| **P7** | Toute la page | **Pas de nom de domaine.** Les balises « adresse canonique » et `og:url` ont été retirées faute de domaine (choix raisonnable), mais le site ne peut pas être bien référencé sans. | Acheter un domaine propre (`achilleagoossou.com` ou `.tg`). |
| **P8** | `og:image`, `twitter:image` | Les adresses des images de partage sont **relatives** (`assets/imgs/...`). WhatsApp, LinkedIn et Facebook les **ignorent** : le partage du lien n'affichera aucune image. | Utiliser l'adresse complète (`https://votre-domaine/...`). |
| **P9** | Données pour Google (JSON-LD) | L'`image` y est également en adresse relative, donc invalide pour Google. | Même correction. |
| **P10** | `<title>` | 65 caractères : Google coupe autour de 60. | Raccourcir (ex. « Achille AGOOSSOU — Formateur Communication & Marketing digital »). |
| **P11** | Racine du site | Pas de `robots.txt` (ignoré par Git, voir S17), pas de `sitemap.xml`, pas de page d'erreur 404 personnalisée. | Les créer une fois le domaine connu. |
| **P12** | JSON-LD | L'email, le téléphone et la ville sont fournis directement aux moteurs de recherche. | Cohérent avec la décision de garder ou non ces données (voir S3). |
| **P13** | Contenu | Un site d'une seule page se positionne difficilement. | Voir F5 (blog ou pages dédiées). |

---

## 9. Fonctionnalités à ajouter

### 9.1 Recommandées 🟠

| N° | Fonctionnalité | Intérêt | Effort |
|---|---|---|:-:|
| **F1** | **Bouton WhatsApp** (lien direct pré-rempli) | Canal n°1 au Togo | Faible |
| **F2** | **Témoignages** (3 à 5) + logos des organisations partenaires | Preuve sociale, c'est ce qui convainc | Moyen |
| **F3** | **Vraies réalisations** avec photo, contexte et résultat | Section actuellement vide | Moyen |
| **F4** | **Page mentions légales et confidentialité** | Obligation légale et confiance | Faible |
| **F5** | **Bouton « Télécharger le CV en PDF »** propre et à jour | Format universel | Faible |
| **F6** | **Protection anti-spam** du formulaire (captcha, champ piège) | Voir S4 | Faible |

### 9.2 Utiles 🟡

| N° | Fonctionnalité | Intérêt |
|---|---|---|
| **F7** | **Prise de rendez-vous en ligne** (Calendly, Cal.com) | Simplifie la prise de contact pour un formateur |
| **F8** | **Brochure ou programme de formation** à télécharger | Aide un décideur à valider une commande |
| **F9** | **Section « vidéo »** : extrait d'animation, formation, voix off | Pour un animateur, entendre et voir vaut mille mots |
| **F10** | **Blog ou actualités** (conseils en communication) | Référencement et crédibilité |
| **F11** | **Version anglaise** | Ouvre les organisations internationales (OIF, ONU…) |
| **F12** | **Mesure d'audience** respectueuse de la vie privée (Plausible, Umami) | Savoir qui vient et d'où, sans bandeau de cookies |
| **F13** | **Bouton « retour en haut »** et lien « Voir plus » sur le paragraphe long | Confort |
| **F14** | **Page d'erreur 404** personnalisée | Finition |
| **F15** | **Mode sombre** et **feuille d'impression** | Confort, optionnel |
| **F16** | **Mise à jour automatique de l'année** du pied de page | Déjà en place, à conserver |

---

## 10. Plan d'action recommandé

### Étape 1 — Avant toute publication (1 journée)

1. Retirer du CV : nom complet à l'état civil, lieu de naissance, coordonnées des références, numéro inconnu (S1, S2, C25).
2. Retirer la date de naissance du site (S3).
3. Configurer EmailJS : domaines autorisés, captcha, quota (S4) + champ piège (S4).
4. Valider les textes de la section Services avec Achille (C15).
5. Corriger les incohérences de dates et de chiffres avec Achille (C16 à C24).
6. Retirer les notes internes du code (S13).

### Étape 2 — Avant la mise en ligne (2 à 3 jours)

7. Remplir ou cacher la section Réalisations (U1).
8. Mettre les vrais liens de réseaux sociaux (U2).
9. Acheter un domaine et corriger les adresses d'images de partage (P7, P8, P9).
10. Corriger les fautes d'orthographe (C1 à C14).
11. Corriger les contrastes (A1 à A5) et le formulaire (A9, A10).
12. Mettre à jour jQuery, fixer la version du script externe (S6, S8).
13. Ajouter les mentions légales (S5, F4).

### Étape 3 — Amélioration continue (le mois suivant)

14. Menu : fermeture sur mobile, étiquette française, regroupement des liens (T1 à T3, U4, U5).
15. Alléger le site : versions `.min`, suppression des fichiers inutiles, images WebP (P1 à P6).
16. Ajouter WhatsApp, témoignages, CV en PDF (F1, F2, F5).
17. Choisir un hébergeur avec en-têtes de sécurité (S9).
18. Héberger les polices soi-même (S10).

### Étape 4 — À plus long terme

19. Migrer vers Bootstrap 5 ou du code natif (S7, T7).
20. Version anglaise, vidéo, blog (F9 à F11).

---

## 11. Points à confirmer avec Achille

Le rapport ne peut pas trancher ces questions sans lui :

1. Les **dates exactes** du poste « Senior Commercial Manager » et celles du baccalauréat.
2. **ICADES 360°** : dans quel cadre, depuis quand, et pourquoi n'est-elle pas dans le CV ?
3. Les **deux périodes du projet D-CLIC** (janvier–avril 2025 et nov. 2025 – mars 2026).
4. La bonne **orthographe** de « Emmergelead » et d'« AEGIS Halo ».
5. Ce que représente le numéro **35807656223000** en bas du CV.
6. L'accord des **personnes de référence** pour publier leurs coordonnées (ou non).
7. Si le **dépôt GitHub est public**.
8. Le **nombre exact d'années d'expérience** en associations (8, 10 ou 13) et en radio (4 ou 5).
9. Si le **captcha et la limitation d'envois** sont déjà activés dans EmailJS.

---

## 12. Ce qui est bien fait

- Un seul titre principal par page, des sections bien annoncées, un lien « Aller au contenu » : de bonnes bases pour l'accessibilité.
- Les **animations respectent les préférences** des personnes gênées par le mouvement.
- Le site **reste lisible sans JavaScript** (le contenu ne disparaît pas).
- Les **icônes sont intégrées en SVG** : nettes à toutes les tailles, sans fichier supplémentaire.
- Les **images sont redimensionnées** (l'original faisait 6,7 Mo).
- Une **image d'en-tête préchargée** pour un affichage plus rapide.
- Une palette et une typographie **cohérentes** (couple serif/sans-serif).
- Un **formulaire qui vérifie les champs** et annonce le résultat aux lecteurs d'écran.
- Des **commentaires clairs** dans le code, qui aideront la reprise du projet.
- Le choix **honnête** de retirer les fausses réalisations du modèle plutôt que de les faire passer pour vraies.

---

## 13. Glossaire (mots techniques expliqués)

| Terme | Explication |
|---|---|
| **Captcha** | Petit test (« je ne suis pas un robot ») qui empêche les envois automatiques. |
| **CDN** | Serveur externe qui héberge des fichiers utilisés par le site (ici, un script). |
| **Contraste** | Différence entre la couleur du texte et celle du fond ; trop faible, le texte se lit mal. |
| **CSP / en-têtes de sécurité** | Consignes envoyées par le serveur au navigateur pour limiter les attaques. |
| **CVE** | Numéro officiel donné à une faille de sécurité connue. |
| **EmailJS** | Service qui envoie les messages du formulaire par email sans serveur. |
| **Isotope** | Bibliothèque de code qui sert ici à filtrer les cartes de réalisations. |
| **JSON-LD** | Données cachées dans la page, lisibles par Google pour comprendre qui est la personne. |
| **jQuery / Bootstrap** | Bibliothèques de code très répandues, ici anciennes. |
| **Lecteur d'écran** | Logiciel qui lit la page à voix haute pour les personnes aveugles ou malvoyantes. |
| **RGPD** | Règlement européen sur la protection des données personnelles. |
| **SEO** | Référencement : faire apparaître le site dans Google. |
| **SRI (`integrity`)** | Empreinte qui permet au navigateur de vérifier qu'un fichier externe n'a pas été modifié. |
| **WCAG AA** | Norme internationale d'accessibilité web (niveau courant à atteindre). |
| **WebP** | Format d'image plus léger que le JPG. |

---

*Rapport basé sur la lecture des fichiers du dépôt et du CV joint. Aucune modification n'a été apportée aux fichiers du site.*
