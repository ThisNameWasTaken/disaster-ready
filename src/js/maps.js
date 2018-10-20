import { mapsStyle } from './maps.style';

let latitude = 150.644, longitude = 150.644;

(function getLocation() {
    if (!('geolocation' in navigator)) {
        return;
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        self.initMap();
    });
})();

self.initMap = function () {
    if (typeof google === 'undefined') {
        return;
    }

    console.log('init map called', latitude, longitude);
    self.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: 8,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        styles: mapsStyle
    });
}