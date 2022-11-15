import {getActiveState, getActiveFilters} from './form.js';
import {getPopup} from './popup.js';
import {getData} from './fetch.js';
import {showAlert } from './notifications.js';

const TOKIO_LAT = 35.68950;
const TOKIO_LNG = 139.69171;
const ZOOM = 12;
const MAX_ZOOM = 30;
const TILELAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILELAYER_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const address = document.querySelector('#address');
const map = L.map('map-canvas');
const OFFERS_COUNT = 10;

L.tileLayer(TILELAYER_URL, {
  maxZoom: MAX_ZOOM,
  attribution: TILELAYER_ATTRIBUTION
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const defaultAddress = `${TOKIO_LAT}, ${TOKIO_LNG}`;
address.value = defaultAddress;


const onMarkerMove = (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const renderMarkers = (advertisements) => {
  advertisements.forEach((element) => {
    const marker = L.marker(
      {
        lat: element.location.lat,
        lng: element.location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(getPopup(element));
  });
};

const isDataExist = (cards) => {
  renderMarkers(cards.slice(0, OFFERS_COUNT));
  getActiveFilters();
};

const executeMap = () => {
  map.on('load', () => {
    getActiveState();
    getData(isDataExist, showAlert);
  })
    .setView({
      lat: TOKIO_LAT,
      lng: TOKIO_LNG,
    }, ZOOM);

  mainMarker.addTo(map);
  mainMarker.on('move', onMarkerMove);
};

const resetMapState = () => {
  map.setView([TOKIO_LAT, TOKIO_LNG]);
  mainMarker.setLatLng([TOKIO_LAT, TOKIO_LNG]);
  address.value = defaultAddress; // Тут не могу понять. При нажатии "Очистить". Стирается поле адреса.
};

export {executeMap, resetMapState};
