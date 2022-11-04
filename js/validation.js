const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_NIGHT_PRICE = 100000;

const adForm = document.querySelector('.ad-form');
const price = adForm.querySelector('#price');
const title = adForm.querySelector('#title');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
});


const roomsToPersonsComparison = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0'],
};

const roomsToPersonsInfo = '1 комната для 1 гостя.<br>2 комнаты для 1-2 гостей.<br> 3 комнаты для 1-3 гостей.<br>100 комнат - не для гостей.<br>¯|_(ツ)_|¯';

//Функции вызывающие валидацию соответствующих значений в соответствующих полях
const validateTitle = () => title.value.length >= MIN_TITLE_LENGTH && title.value.length <= MAX_TITLE_LENGTH;
const validatePrice = () => price.value >= 0 && price.value <= MAX_NIGHT_PRICE;
const validateComparison = () => roomsToPersonsComparison[rooms.value].includes(capacity.value);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

//Функция вызывает валидацию формы
const executeValidation = () => {
  pristine.addValidator(title, validateTitle);
  pristine.addValidator(price, validatePrice);
  pristine.addValidator(rooms, validateComparison, roomsToPersonsInfo);
  capacity.addEventListener('change', () => pristine.validate(rooms));
  adForm.addEventListener('submit', onFormSubmit);
};

export {executeValidation};
