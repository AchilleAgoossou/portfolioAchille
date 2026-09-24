/* =============================================================================
   Formulaire de contact — envoi via EmailJS
   -----------------------------------------------------------------------------
   Branche sur le formulaire de #contact, qui etait reste desactive.

   Les trois identifiants ci-dessous sont des identifiants PUBLICS cote client :
   EmailJS les expose par conception dans le navigateur. Ils ne constituent pas
   un secret. Inutile de les sortir dans un fichier de configuration : un site
   statique ne saurait de toute facon pas le lire. La protection contre les abus
   se configure dans le tableau de bord EmailJS : domaines autorises, quota,
   captcha.
   ========================================================================== */

(function () {
  "use strict";

  var EMAILJS_PUBLIC_KEY = "dUrLjb8AW57c4XUB-";
  var EMAILJS_SERVICE_ID = "service_1v9ju3c";
  var EMAILJS_TEMPLATE_ID = "template_atp2mfe";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusBox = document.getElementById("form-status");
  var submitBtn = document.getElementById("contact-submit");
  var submitLabel = submitBtn ? submitBtn.textContent.trim() : "Envoyer";

  function showStatus(message, kind) {
    if (!statusBox) return;
    statusBox.hidden = false;
    statusBox.textContent = message;
    statusBox.className =
      "mb-3 alert " + (kind === "success" ? "alert-success" : "alert-danger");
  }

  function setBusy(isBusy) {
    if (!submitBtn) return;
    submitBtn.disabled = isBusy;
    submitBtn.textContent = isBusy ? "Envoi en cours…" : submitLabel;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Le formulaire porte novalidate : on declenche la validation nous-memes
    // afin de garder la main sur les messages affiches.
    if (!form.checkValidity()) {
      showStatus(
        "Merci de renseigner votre nom, une adresse email valide et un message.",
        "error",
      );
      var firstInvalid = form.querySelector(":invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (typeof window.emailjs === "undefined") {
      showStatus(
        "Le service d'envoi n'a pas pu être chargé. Merci de m'écrire directement à achilleagoossou@gmail.com.",
        "error",
      );
      return;
    }

    setBusy(true);
    if (statusBox) statusBox.hidden = true;

    window.emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(function () {
        showStatus(
          "Message envoyé. Merci, je reviens vers vous rapidement.",
          "success",
        );
        form.reset();
      })
      .catch(function (error) {
        showStatus(
          "L'envoi a échoué. Merci de réessayer ou de m'écrire à achilleagoossou@gmail.com.",
          "error",
        );
        console.error("EmailJS :", error);
      })
      .finally(function () {
        setBusy(false);
      });
  });
})();
