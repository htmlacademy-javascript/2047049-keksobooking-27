import {offerTypeCollection} from './popup.js';
import {pristine, adForm, minPriceCollection} from './utils.js';
import {showSuccessMessage, showErrorMessage} from './notifications.js';
import {resetMapState} from './map.js';
import {resetForm} from './reset-button.js';
import {postData} from './fetch.js';
import {filterElements} from './filtration.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_NIGHT_PRICE = 100000;
const priceElement = adForm.querySelector('#price');
const titleElement = adForm.querySelector('#title');
const roomsElement = adForm.querySelector('#room_number');
const capacityElement = adForm.querySelector('#capacity');
const typeElement = adForm.querySelector('#type');
const checkInElement = adForm.querySelector('#timein');
const checkOutElement = adForm.querySelector('#timeout');
const addressElement = adForm.querySelector('#address');
const submitElement = adForm.querySelector('.ad-form__submit');

const roomsToPersonsComparison = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0'],
};
const roomsToPersonsInfo = '1 комната для 1 гостя.<br>2 комнаты для 1-2 гостей.<br> 3 комнаты для 1-3 гостей.<br>100 комнат - не для гостей.<br>¯|_(ツ)_|¯';

//Функции вызывающие валидацию соответствующих значений в соответствующих полях
const validateTitle = () => titleElement.value.length >= MIN_TITLE_LENGTH && titleElement.value.length <= MAX_TITLE_LENGTH;
const validatePrice = () => priceElement.value >= minPriceCollection[typeElement.value] && priceElement.value <= MAX_NIGHT_PRICE;
const validateComparison = () => roomsToPersonsComparison[roomsElement.value].includes(capacityElement.value);

const onTypeChange = () => {
  priceElement.min = minPriceCollection[typeElement.value];
  priceElement.placeholder = minPriceCollection[typeElement.value];
  pristine.validate(priceElement);
};
const showPriceError = () => `Минимальная стоимость для ${offerTypeCollection[typeElement.value]} - ${minPriceCollection[typeElement.value]} руб.`;

const inactiveSubmitElement = () => {
  submitElement.disabled = true;
  submitElement.textContent = 'Опубликовано';
};

const activeSubmitElement = () => {
  submitElement.disabled = false;
  submitElement.textContent = 'Опубликовать';
};

const onPostData = () => {
  showSuccessMessage();
  resetMapState();
  resetForm();
  activeSubmitElement();
  filterElements.reset();
};


const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValidationTrue = pristine.validate();
  if (isValidationTrue) {
    postData(onPostData, () => {showErrorMessage(); activeSubmitElement();}, new FormData(adForm));
    inactiveSubmitElement();
  }
};

//Функция вызывает валидацию формы
const executeValidation = () => {
  pristine.addValidator(titleElement, validateTitle);
  pristine.addValidator(priceElement, validatePrice);
  pristine.addValidator(roomsElement, validateComparison, roomsToPersonsInfo);
  pristine.addValidator(priceElement, validatePrice, showPriceError);
  capacityElement.addEventListener('change', () => pristine.validate(roomsElement));
  roomsElement.addEventListener('change', () => pristine.validate(capacityElement));
  typeElement.addEventListener('change', onTypeChange);
  checkInElement.addEventListener('change', () => {
    checkOutElement.value = checkInElement.value;
  });
  checkOutElement.addEventListener('change', () => {
    checkInElement.value = checkOutElement.value;
  });
  adForm.addEventListener('submit', onFormSubmit);
  addressElement.readOnly = true;
};

export {executeValidation, priceElement, typeElement};
