const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const mapFilterInputs = mapFilter.querySelectorAll('fieldset, select');

//Функция перебирает коллекцию элементов и отключает элементы в случае если параметр state принимает значение false
const stateToggler = (elements, state) => {
  elements.forEach((element) => {element.disabled = state;});
};

//Функция вводит в неактивное состояние страницы
const getInactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  stateToggler(adFormElements, true);
  stateToggler(mapFilterInputs, true);
};

//Функция вводит в активное состояние страницы
const getActiveState = () => {
  adForm.classList.remove('ad-form--disabled');
  stateToggler(adFormElements, false);
};

// Функция активирует фильтры
const getActiveFilters = () => {
  mapFilter.classList.remove('map__filters--disabled');
  stateToggler(mapFilterInputs, false);
};

export {getInactiveState, getActiveState, getActiveFilters};
