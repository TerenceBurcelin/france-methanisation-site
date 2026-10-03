/* Panneau latéral « profil » de la section équipe (page Investisseurs) */
(function () {
  var panel = document.querySelector(".side-panel");
  if (!panel) return;

  var overlay = document.querySelector(".side-overlay");
  var body = panel.querySelector(".side-panel-body");
  var contact = panel.querySelector("#side-panel-contact");
  var closeBtn = panel.querySelector(".side-panel-close");
  var lastTrigger = null;

  function open(id, trigger) {
    var tpl = document.getElementById("member-" + id);
    if (!tpl) return;
    body.replaceChildren(tpl.content.cloneNode(true));
    contact.href =
      "/contact?objet=" + encodeURIComponent("À l'attention de Monsieur " + tpl.dataset.name);
    var title = body.querySelector("h3");
    if (title) {
      title.id = "side-panel-title";
      panel.removeAttribute("aria-label");
      panel.setAttribute("aria-labelledby", "side-panel-title");
    }
    lastTrigger = trigger;
    body.scrollTop = 0;
    panel.classList.add("is-open");
    overlay.classList.add("is-open");
    document.documentElement.classList.add("no-scroll");
    closeBtn.focus({ preventScroll: true });
  }

  function close() {
    panel.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.documentElement.classList.remove("no-scroll");
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  }

  document.querySelectorAll("[data-member]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      open(btn.getAttribute("data-member"), btn);
    });
  });
  overlay.addEventListener("click", close);
  closeBtn.addEventListener("click", close);

  document.addEventListener("keydown", function (e) {
    if (!panel.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key !== "Tab") return;
    var focusables = panel.querySelectorAll("button, a[href]");
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();
