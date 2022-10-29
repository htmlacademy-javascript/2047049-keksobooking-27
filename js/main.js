import {newOffers} from './data.js';
import {getPopup } from './popup.js';

const similarCards = newOffers();
const mapCanvas = document.querySelector('.map__canvas');
const card = getPopup(similarCards[1]);
mapCanvas.appendChild(card);
