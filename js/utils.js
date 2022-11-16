// Функция возвращает целое число из диапазона положительных чисел где max всегда >= min.

const getRandomInteger = (min, max) => {
  min = Math.ceil (min);
  max = Math.floor (max);
  if (max <= min || max < 0 || min < 0) {
    return NaN;
  }
  return Math.floor((Math.random() * (max - min + 1)) + min);
}; //Эта вроде тоже нигде не используется. Если в следующем задании не понадобится - готов удалить.

// Объявление функции валидации форм с использованием сторонней API Pristine
const adForm = document.querySelector('.ad-form');
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
}, false);

const minPriceCollection = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

export{getRandomInteger, pristine, adForm, minPriceCollection};
