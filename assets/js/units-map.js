/* Carte de France des unités France Méthanisation.
   Pour ajouter une unité : ajouter un objet dans la liste UNITS ci-dessous. */
document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementById("france-map");
  if (!el || typeof L === "undefined") return;

  var UNITS = [
    {
      name: "Unité St Priest 5000",
      address: "15 rue du Dauphiné, Saint-Priest",
      lat: 45.708896,
      lng: 4.928153,
      tonnage: "5 000 t/an",
      gas: "30 Nm³/h",
      url: "/unites/saint-priest-5000",
    },
  ];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var map = L.map(el, { scrollWheelZoom: false, minZoom: 5 });
  map.fitBounds([[41.2, -5.5], [51.3, 9.8]]);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var icon = fmPinIcon();

  UNITS.forEach(function (u) {
    var html =
      '<div class="fm-popup">' +
      "<strong>" + esc(u.name) + "</strong>" +
      "<span>" + esc(u.address) + "</span>" +
      "<dl>" +
      "<div><dt>Tonnage</dt><dd>" + esc(u.tonnage) + "</dd></div>" +
      "<div><dt>Production de gaz</dt><dd>" + esc(u.gas) + "</dd></div>" +
      "</dl>" +
      '<a href="' + esc(u.url) + '">Voir la page de l\'unité →</a>' +
      "</div>";
    L.marker([u.lat, u.lng], { icon: icon, title: u.name }).addTo(map).bindPopup(html, { minWidth: 230 });
  });

  map.on("click", function () { map.scrollWheelZoom.enable(); });
  map.on("mouseout", function () { map.scrollWheelZoom.disable(); });
});
