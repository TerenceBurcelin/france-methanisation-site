/* Repère de carte aux couleurs de France Méthanisation (logo), partagé par les deux cartes */
window.fmPinIcon = function () {
  return L.divIcon({
    className: "fm-pin",
    html: '<div class="fm-marker"><img src="/assets/img/logo.png" alt="" width="34" height="38"></div>',
    iconSize: [48, 58],
    iconAnchor: [24, 58],
    popupAnchor: [0, -54],
  });
};
