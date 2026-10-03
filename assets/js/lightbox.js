/* Agrandissement des photos (modal). Le bouton retour du navigateur ferme la fenêtre
   sans quitter la page : l'ouverture ajoute une entrée d'historique, la fermeture la retire. */
(function () {
  var triggers = document.querySelectorAll("[data-lightbox]");
  if (!triggers.length) return;

  var root = document.documentElement;
  var box = null;
  var lastTrigger = null;
  var isOpen = false;

  function build() {
    box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Photo agrandie");
    box.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Fermer la photo"><span aria-hidden="true">✕</span></button>' +
      '<figure class="lightbox-figure"><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(box);
    box.addEventListener("click", function (e) {
      if (e.target.tagName !== "IMG") requestClose();
    });
  }

  function open(trigger) {
    if (isOpen) return;
    if (!box) build();
    var img = box.querySelector("img");
    img.src = trigger.getAttribute("data-lightbox");
    img.alt = trigger.getAttribute("alt") || "";
    box.querySelector("figcaption").textContent = trigger.getAttribute("data-caption") || "";
    lastTrigger = trigger;
    box.classList.add("is-open");
    root.classList.add("no-scroll");
    isOpen = true;
    history.pushState({ lightbox: true }, "");
    box.querySelector("button").focus({ preventScroll: true });
  }

  function hide() {
    if (!isOpen) return;
    box.classList.remove("is-open");
    root.classList.remove("no-scroll");
    isOpen = false;
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  }

  function requestClose() {
    if (!isOpen) return;
    if (history.state && history.state.lightbox) history.back();
    else hide();
  }

  window.addEventListener("popstate", hide);
  document.addEventListener("keydown", function (e) {
    if (isOpen && e.key === "Escape") requestClose();
  });

  triggers.forEach(function (el) {
    el.addEventListener("click", function () { open(el); });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(el);
      }
    });
  });
})();
