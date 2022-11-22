const TIMEOUT_DELAY = 500;

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

const debounce = (cb) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), TIMEOUT_DELAY);
  };
};

export{pristine, adForm, minPriceCollection, debounce};
