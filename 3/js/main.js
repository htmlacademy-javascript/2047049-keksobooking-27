// Функция возвращает целое число из диапазона положительных чисел где max всегда >= min.

const getRandomInteger = (min, max) => {
  min = Math.ceil (min);
  max = Math.floor (max);
  if (max <= min || max < 0 || min < 0) {
    return NaN;
  }
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

// Функция возвращает число с указанным количеством знаков после запятой из диапазона положительных чисел где max всегда >= min.

const getRandomFloatNumber = (min, max, digits) => {
  if (min < 0 || digits < 0 || max <= min) {
    return NaN;
  }
  const random = Math.random() * (max + (0.1 ** digits) - min) + min;
  return Number(random.toFixed(digits));
};

// Объявление переменных
const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const HOUSING = [
  'bungalow',
  'apartaments',
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
const getCustomerAvatar = (avatarNumber) => {
  const AvatarNumber = avatarNumber < 10 ? `0${avatarNumber}` : 10;
  return `img/avatars/user${AvatarNumber}.png`;
};

// Функция возвращает индекс элемента массива
const getArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция возвращает копию массива
const getSomeArray = (array) => {
  const someArrayLength = getRandomInteger(1, array.length);
  return array.slice(0, someArrayLength);
};

// Функция возвращает сгенерированный элемент массива из заданных объектов
const getOffer = () => {
  const latCoordinate = getRandomFloatNumber(MIN_LAT, MAX_LAT, 5);
  const lngCoordinate = getRandomFloatNumber(MIN_LNG, MAX_LNG, 5);

  return {
    author: {
      avatar: getCustomerAvatar(getRandomInteger(1, 10)),
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
const newOffers = () => Array.from({length: OFFERS_COUNT}, getOffer);

newOffers();
getOffer(getRandomInteger(1, 10));
