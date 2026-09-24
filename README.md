# Portfolio — Achille AGOOSSOU

Site vitrine personnel d'Achille AGOOSSOU, formateur certifié OIF en communication et marketing
digital, directeur d'ICADES 360° et business developer, basé à Lomé (Togo).

Page unique, statique, sans build ni dépendance à installer.

## Lancer en local

```bash
npx serve .          # puis http://localhost:3000
# ou
python -m http.server 8000
```

Ouvrir `index.html` directement dans un navigateur fonctionne aussi.

## Structure

```
index.html                  page unique (contenu, sprite d'icônes, données structurées)
robots.txt
assets/
  css/johndoe.css           thème Bootstrap 4 compilé — NE PAS recompiler (voir CLAUDE.md)
  css/achille.css           couche de personnalisation, compilée depuis scss/achille.scss
  scss/achille.scss         système de design (couleurs, typo, animations) — source de vérité
  scss/…                    sources du thème d'origine
  js/ui.js                  apparitions, compteurs, état actif du menu
  js/contact-form.js        envoi du formulaire via EmailJS
  js/johndoe.js             défilement doux et filtres Isotope (thème)
  imgs/                     photos d'Achille, favicon, carte de partage
  docs/                     CV
  vendors/                  jQuery, Bootstrap, Isotope
```

## Modifier les styles

```bash
npx sass assets/scss/achille.scss assets/css/achille.css --style=expanded --no-source-map
```

Tout nouveau style va dans `assets/scss/achille.scss`. Ne jamais recompiler `johndoe.scss` :
le CSS livré a été post-traité par l'Autoprefixer et une recompilation nue supprimerait tous les
préfixes vendeurs. Le détail est dans `CLAUDE.md`.

## Formater

```bash
npx prettier@3 --write index.html assets/js/*.js assets/scss/achille.scss
```

## À compléter avant mise en ligne

1. **Réseaux sociaux** — les dix liens sont en `href="#"`. Renseigner les URL réelles (LinkedIn,
   Facebook, X, Instagram, YouTube) dans les deux listes `.social-icons` d'`index.html`.
2. **Réalisations** — la section affiche six emplacements typés. Les remplacer par de vrais
   projets à l'aide du gabarit commenté en bas de la section.
3. **Nom de domaine** — aucune URL absolue n'est codée dans la page. Quand le domaine existera,
   suivre le bloc de commentaire en haut du `<head>` d'`index.html`.
4. **Dates du parcours** — le poste D-CLIC (nov. 2025 – mars 2026) et le poste CUBE (depuis
   mai 2025, présenté comme actuel) se chevauchent ; à arbitrer.
5. **EmailJS** — vérifier que le domaine de production est autorisé dans le tableau de bord
   EmailJS, sinon le formulaire de contact sera rejeté.

## Origine

Le site part du thème « JohnDoe Landing Page » de DevCRUD (Bootstrap 4.3.1, jQuery 3.4.1),
largement réécrit. Les notes d'architecture et les pièges connus sont consignés dans `CLAUDE.md`.
