import { getRandomInteger, getRandomFloatNumber, getArrayElement, getSomeArray } from './utils.js';

// Объявление переменных
const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const HOUSING = [
  'bungalow',
  'flat',
  'hotel',
  'house',
  'palace',
];

const FACILITIES = [
  'wifi',
  'kitchen',
  'parking',
  'washer',
  'elevator',
  'А/С',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg ',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;

const OFFERS_COUNT = 10; // количество сгенированных объектов

// Функция по созданию аватара заказчика
const createCustomerAvatar = () => {
  const avatarCount = getRandomInteger(1, 11);
  return function () {
    const AvatarNumber = avatarCount < 10 ? `0${avatarCount}` : 10;
    return `img/avatars/user${AvatarNumber}.png`;
  };
};

const getCustomerAvatar = createCustomerAvatar();

// Функция возвращает сгенерированный элемент массива из заданных объектов
const getOffer = () => {
  const latCoordinate = getRandomFloatNumber(MIN_LAT, MAX_LAT, 5);
  const lngCoordinate = getRandomFloatNumber(MIN_LNG, MAX_LNG, 5);

  return {
    author: {
      avatar: getCustomerAvatar(),
    },
    offer: {
      title: 'Удобное укрытие для резервистов 18-55',
      address: `${latCoordinate}, ${lngCoordinate}`,
      price: getRandomInteger(1, 50000),
      type: getArrayElement(HOUSING),
      rooms: getRandomInteger(1, 100),
      guests: getRandomInteger(1, 3),
      checkin: getArrayElement(TIME),
      checkout: getArrayElement(TIME),
      features: getSomeArray(FACILITIES),
      description: 'Заставь себя поискать',
      photos: getSomeArray(PHOTOS),
    },
    location: {
      lat: latCoordinate,
      lng: lngCoordinate,
    },
  };
};

// Функция формирует массив из 10 сгенерированных элементов
const newOffers = () => Array.from({ length: OFFERS_COUNT }, getOffer);

export { newOffers };
