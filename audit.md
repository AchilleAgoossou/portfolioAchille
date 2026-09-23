# Audit du projet portfolioAchille

## À quoi sert ce projet

Ce projet est un portfolio personnel statique pour présenter Achille AGOOSSOU : identité, profil, compétences, parcours, services, réalisations, articles/actualités et informations de contact.

Il s'agit très probablement d'un template Bootstrap déjà préparé, basé sur le thème "JohnDoe Landing page" de DevCRUD. Le projet n'a pas encore été totalement personnalisé : plusieurs textes, images, chiffres, tarifs et coordonnées viennent encore du modèle d'origine.

## Structure actuelle

- `index.html` : page principale du portfolio. C'est le fichier à modifier en priorité pour changer les textes visibles, les sections, les liens et les informations personnelles.
- `components.html` : page de démonstration des composants du template. Elle sert surtout de référence visuelle Bootstrap et n'est pas indispensable au portfolio public.
- `assets/css/johndoe.css` : feuille de style principale compilée. Elle contient Bootstrap 4, les couleurs, la typographie et le style du thème.
- `assets/scss/` : sources SCSS du thème, avec Bootstrap 4.3.1 et les styles personnalisés.
- `assets/js/johndoe.js` : JavaScript du portfolio. Il gère le défilement doux, les filtres du portfolio avec Isotope et la carte Google Maps.
- `assets/imgs/` : images du template : avatar, image d'en-tête, portfolio, blog, branding, publicité, web.
- `assets/vendors/` : dépendances locales : jQuery, Bootstrap, Isotope et Themify Icons.

## Technologies utilisées

- HTML statique.
- CSS/SCSS avec Bootstrap 4.3.1.
- JavaScript avec jQuery.
- Isotope pour filtrer les réalisations.
- Themify Icons pour les icônes.
- Google Maps API pour la carte de contact.

## Ce qui a été fait dans cette première passe

- Passage de la page principale en français avec `lang="fr"`.
- Traduction des textes visibles de `index.html` : navigation, titres, boutons, sections, stats, tarifs, filtres, blog et formulaire de contact.
- Conservation des paragraphes génériques de type `Lorem ipsum`, comme demandé, pour repérer facilement les contenus à remplacer.
- Remplacement des textes alternatifs promotionnels du template par des descriptions françaises à personnaliser.
- Correction d'une erreur HTML dans le champ `textarea` du formulaire de contact.

## Points importants à personnaliser ensuite

- Remplacer les coordonnées fictives : email, téléphone, Skype, adresse.
- Mettre les vraies dates de formation et d'expérience.
- Remplacer les intitulés génériques : `Ullam`, `Asperiores`, `Tempora`, `Provident`, etc.
- Remplacer ou supprimer la section tarifs si elle ne correspond pas à ton activité.
- Remplacer les images du template par tes vraies photos, captures de projets ou visuels professionnels.
- Mettre à jour les liens des réseaux sociaux.
- Remplacer les chiffres exagérés du template : `50K` projets, `200K` clients, etc.
- Vérifier si la section blog doit rester. Si tu n'as pas d'articles, elle peut devenir une section "Projets", "Expériences" ou être supprimée.
- Configurer ou supprimer Google Maps. La clé API visible dans le template ne doit pas rester telle quelle en production.

## Risques ou défauts repérés

- Le projet expose encore une clé Google Maps dans `index.html`.
- Le formulaire de contact n'a pas de vraie destination : `action=""`. Il ne permettra pas encore d'envoyer un message.
- Le thème dépend de bibliothèques anciennes : Bootstrap 4.3.1 et jQuery 3.4.1.
- Le nom interne des fichiers reste `johndoe`, signe que le template n'a pas encore été renommé proprement.
- `components.html` peut être utile en développement, mais inutile pour un portfolio publié.
- Le contenu actuel mélange français, anglais et faux textes du template. Après cette passe, les libellés principaux sont en français, mais le vrai contenu métier reste à écrire.

## Recommandation de suite

La prochaine étape idéale est de remplacer les informations fictives par tes vraies données : présentation courte, coordonnées, compétences, expériences, formations, services, projets et liens sociaux. Ensuite, on pourra nettoyer les sections inutiles, améliorer le design et supprimer les traces trop visibles du template.
