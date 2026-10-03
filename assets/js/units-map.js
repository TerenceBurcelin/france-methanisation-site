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

  var pin =
    '<svg viewBox="0 0 40 52" aria-hidden="true">' +
    '<path d="M20 2C10.6 2 3 9.4 3 18.5 3 31 20 50 20 50s17-19 17-31.5C37 9.4 29.4 2 20 2z" fill="#1f4b3c" stroke="#fff" stroke-width="2.5"/>' +
    '<path transform="translate(5.6 5.9) scale(1.2)" d="M12 2c-4 5.5-6 8.8-6 11a6 6 0 0 0 12 0c0-2.2-2-5.5-6-11z" fill="#c68a2e"/>' +
    "</svg>";

  var icon = L.divIcon({
    className: "fm-pin",
    html: pin,
    iconSize: [40, 52],
    iconAnchor: [20, 50],
    popupAnchor: [0, -46],
  });

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
