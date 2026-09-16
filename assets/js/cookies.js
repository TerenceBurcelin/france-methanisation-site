/* Bannière de consentement cookies — RGPD
   Le site ne dépose aujourd'hui aucun cookie de mesure d'audience ni
   publicitaire. Ce mécanisme reste nécessaire pour informer les visiteurs
   et sert de base si un outil de mesure d'audience était ajouté plus tard :
   dans ce cas, appeler window.fmHasAnalyticsConsent() avant de charger le
   script correspondant.
*/
(function () {
  var STORAGE_KEY = "fm_cookie_consent"; // "all" | "essential"

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (err) {
      /* stockage indisponible : le bandeau réapparaîtra, sans conséquence */
    }
  }

  window.fmHasAnalyticsConsent = function () {
    return getConsent() === "all";
  };

  function injectBanner() {
    var el = document.createElement("div");
    el.className = "cookie-banner";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Gestion des cookies");
    el.innerHTML =
      '<div class="cookie-banner-text">' +
      "<strong>Respect de votre vie privée.</strong> Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie de mesure d'audience ou publicitaire n'est déposé sans votre accord. " +
      '<a href="mentions-legales.html#cookies">En savoir plus</a>' +
      "</div>" +
      '<div class="cookie-banner-actions">' +
      '<button type="button" class="btn btn-ghost" data-cookie-choice="essential">Cookies essentiels uniquement</button>' +
      '<button type="button" class="btn btn-primary" data-cookie-choice="all">Tout accepter</button>' +
      "</div>";
    document.body.appendChild(el);

    el.querySelectorAll("[data-cookie-choice]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setConsent(btn.getAttribute("data-cookie-choice"));
        el.classList.add("is-hidden");
        window.setTimeout(function () {
          el.remove();
        }, 250);
      });
    });

    window.requestAnimationFrame(function () {
      el.classList.add("is-visible");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!getConsent()) {
      injectBanner();
    }
  });
})();
