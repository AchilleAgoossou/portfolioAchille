/* =============================================================================
   Interface — animations et comportements
   -----------------------------------------------------------------------------
   Trois comportements, tous degradables : sans JavaScript la page reste
   entierement lisible (les styles d'apparition sont conditionnes a la classe
   `js` posee sur <html> des le <head>).

     1. Apparition au defilement (IntersectionObserver)
     2. Compteurs des chiffres cles
     3. Etat actif de la navigation

   Toutes les animations sont desactivees si l'utilisateur a demande une
   reduction des animations dans les preferences de son systeme.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ---------------------------------------------------------------- 1. Apparition */

  function setupReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    Array.prototype.forEach.call(items, function (el) {
      // Un decalage progressif entre elements voisins donne le rythme, sans
      // depasser 240 ms pour ne jamais faire attendre le lecteur.
      var group = el.parentNode
        ? el.parentNode.querySelectorAll(":scope > [data-reveal]")
        : [];
      var index = Array.prototype.indexOf.call(group, el);
      if (index > 0) {
        el.style.setProperty(
          "--reveal-delay",
          Math.min(index * 80, 240) + "ms",
        );
      }
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------------- 2. Compteurs */

  function animateCount(el) {
    var raw = el.getAttribute("data-count-to") || el.textContent;
    var match = String(raw).match(/^(\d+)(.*)$/);
    if (!match) return;

    var target = parseInt(match[1], 10);
    var suffix = match[2] || "";

    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }

    var duration = 1400;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      // Courbe d'amortissement : demarre vite, se pose doucement.
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function setupCounters() {
    var values = document.querySelectorAll(".stat-value");
    if (!values.length) return;

    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(values, animateCount);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );

    Array.prototype.forEach.call(values, function (el) {
      el.setAttribute("data-count-to", el.textContent.trim());
      observer.observe(el);
    });
  }

  /* -------------------------------------------------- 3. Navigation : etat actif */

  function setupNavState() {
    var links = document.querySelectorAll(".navbar .nav-link[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    var sections = [];
    // « Accueil » pointe sur #home, qui est porte par <body> : l'element est
    // donc toujours a l'ecran et serait perpetuellement actif. On le traite
    // a part, en fonction de la position de defilement.
    var homeLink = null;

    Array.prototype.forEach.call(links, function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = id ? document.getElementById(id) : null;
      if (!section) return;
      if (section === document.body || section === document.documentElement) {
        homeLink = link;
        return;
      }
      map[id] = link;
      sections.push(section);
    });

    if (!sections.length) return;

    function clear() {
      Array.prototype.forEach.call(links, function (l) {
        l.classList.remove("active");
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = map[entry.target.id];
          if (!link || !entry.isIntersecting) return;
          clear();
          link.classList.add("active");
        });
      },
      // La bande active se situe sous la navbar, au tiers superieur de l'ecran.
      { rootMargin: "-88px 0px -62% 0px" },
    );

    sections.forEach(function (s) {
      observer.observe(s);
    });

    if (!homeLink) return;

    var ticking = false;
    function syncHome() {
      ticking = false;
      var first = sections[0];
      var atTop = first
        ? first.getBoundingClientRect().top > window.innerHeight * 0.4
        : window.pageYOffset < 200;
      if (atTop) {
        clear();
        homeLink.classList.add("active");
      } else {
        homeLink.classList.remove("active");
      }
    }

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(syncHome);
      },
      { passive: true },
    );
    syncHome();
  }

  /* ------------------------------------------------------------------ Demarrage */

  function init() {
    setupReveal();
    setupCounters();
    setupNavState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
