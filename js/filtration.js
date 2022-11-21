import {getMarkers, resetMarkers, OFFERS_COUNT} from './map.js';
import {debounce} from './utils.js';

const REFRESH_DELAY = 500;
const MAX_NIGHT_PRICE = 100000;
const OFFERS_PRICE = {
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
    MAX: MAX_NIGHT_PRICE,
  },
};

const filterElements = document.querySelector('.map__filters');
const filterTypeElement = filterElements.querySelector('#housing-type');
const filterPriceElement = filterElements.querySelector('#housing-price');
const filterRoomsElement = filterElements.querySelector('#housing-rooms');
const filterGuestElement = filterElements.querySelector('#housing-guests');
const filterFeaturesElement = filterElements.querySelector('#housing-features');

//тип
const sortByType = (card) => filterTypeElement.value === 'any' || filterTypeElement.value === card.offer.type;

//цена
const sortByPrice = (card) => {
  const selectedPriceOption = filterPriceElement.value.toUpperCase();
  return filterPriceElement.value === 'any' || (
    card.offer.price > OFFERS_PRICE[selectedPriceOption].MIN && card.offer.price < OFFERS_PRICE[selectedPriceOption].MAX);
};

//комнаты
const sortByRooms = (card) => filterRoomsElement.value === 'any' || card.offer.rooms === Number(filterRoomsElement.value);

//гости
const sortByGuests = (card) => filterGuestElement.value === 'any' || card.offer.guests === Number(filterGuestElement.value);

//фичи
const sortByFeatures = (card) => {
  const SelectedFeaturesList = Array.from(filterFeaturesElement.querySelectorAll('input[type="checkbox"]:checked'));
  return card.offer.features ? SelectedFeaturesList.every((checkbox) => card.offer.features.includes(checkbox.value)) : !(SelectedFeaturesList.length > 0);
};

//получение маркеров с учетом применённых фильтров
const getFilteredMarkers = (cards) => cards.filter((card) => (
  sortByType(card) && sortByPrice(card) && sortByRooms(card) && sortByGuests(card) && sortByFeatures(card)
));

const getFilteredCards = (cards) => {
  resetMarkers();
  const newCards = getFilteredMarkers(cards);
  getMarkers(newCards.slice(0, OFFERS_COUNT));
};

const onFilterElementsChange = (data) => {
  filterElements.addEventListener('change', debounce(() => {
    getFilteredCards(data);
  }, REFRESH_DELAY));
};

const resetFilters = (cards) => {
  filterElements.addEventListener('reset', () => {
    getFilteredCards(cards);
  });
  filterElements.reset();
};

export {onFilterElementsChange, resetFilters, filterElements};
