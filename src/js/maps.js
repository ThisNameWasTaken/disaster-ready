import { mapsStyle } from './maps.style';

let latitude = 150.644, longitude = 150.644;
let geocoder;

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

const searchCountryForm = document.getElementById('search-country');
const searchCountryInput = document.getElementById('country-input');

searchCountryInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        if (!searchCountryInput.value) {
            return;
        }
        getLocationByCountry(searchCountryInput.value);
    }
});

const mapElement = document.getElementById('map');

function getLocationByCountry(country) {
    if (!('geolocation' in navigator)) {
        return;
    }

    geocoder.geocode({ 'address': country }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            self.map.setCenter(results[0].geometry.location);
        }
    });
}

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

    geocoder = new google.maps.Geocoder();
}