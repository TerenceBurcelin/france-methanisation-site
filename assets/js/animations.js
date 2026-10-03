/* Apparition progressive des blocs au défilement (sobre : fondu + léger déplacement). */
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var SKIP = ".hero, header, footer, .side-panel, .lightbox, .cookie-banner, .dropdown";

  function mark(el, variant, delay) {
    if (!el || el.closest(SKIP)) return;
    if (el.classList.contains("reveal")) return;
    if (el.parentElement && el.parentElement.closest(".reveal")) return;
    el.classList.add("reveal");
    if (variant) el.classList.add("reveal--" + variant);
    if (delay) el.style.setProperty("--reveal-delay", delay + "ms");
  }

  function stagger(container, step) {
    Array.prototype.forEach.call(container.children, function (child, i) {
      mark(child, null, Math.min(i, 5) * step);
    });
  }

  // Les parents d'abord : un bloc déjà animé n'anime pas ses enfants.
  document.querySelectorAll(".two-col").forEach(function (row) {
    mark(row.children[0], "left", 0);
    mark(row.children[1], "right", 120);
  });
  document.querySelectorAll(".cta-banner, .form-card, .pill-nav, .unit-map, .france-map").forEach(function (el) {
    mark(el, null, 0);
  });
  document.querySelectorAll(".section-head").forEach(function (el) { mark(el, null, 0); });
  document.querySelectorAll(".grid-2, .grid-3, .grid-4, .steps, .team-grid, .compare").forEach(function (g) {
    stagger(g, 90);
  });
  document.querySelectorAll(".timeline").forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (child, i) { mark(child, "left", i * 130); });
  });
  document.querySelectorAll(".list-check").forEach(function (g) { stagger(g, 80); });
  document.querySelectorAll(".faq-item").forEach(function (el, i) { mark(el, null, Math.min(i, 4) * 60); });

  var targets = document.querySelectorAll(".reveal");
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  targets.forEach(function (el) { io.observe(el); });
})();
