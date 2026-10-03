/* Carte de l'unité St Priest 5000 (Leaflet + OpenStreetMap) */
document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementById("unit-map");
  if (!el || typeof L === "undefined") return;

  var position = [45.708896, 4.928153]; // 15 rue du Dauphiné, 69800 Saint-Priest (Base Adresse Nationale)
  var map = L.map(el, { scrollWheelZoom: false }).setView(position, 16);

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

  L.marker(position, { icon: icon, title: "Unité St Priest 5000" })
    .addTo(map)
    .bindPopup("<strong>Unité St Priest 5000</strong><br>15 rue du Dauphiné St Priest");

  map.on("click", function () { map.scrollWheelZoom.enable(); });
  map.on("mouseout", function () { map.scrollWheelZoom.disable(); });
});
