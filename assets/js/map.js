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

  var icon = fmPinIcon();

  L.marker(position, { icon: icon, title: "Unité St Priest 5000" })
    .addTo(map)
    .bindPopup("<strong>Unité St Priest 5000</strong><br>15 rue du Dauphiné St Priest");

  map.on("click", function () { map.scrollWheelZoom.enable(); });
  map.on("mouseout", function () { map.scrollWheelZoom.disable(); });
});
