import {adForm, minPriceCollection, pristine} from './utils.js';
import {priceElement, typeElement} from './validation.js';
import {resetSlider, sliderElement} from './slider.js';
import {resetMapState} from './map.js';
import {filterElements} from './filtration.js';
import {resetPreviews} from './preview.js';

const resetButton = adForm.querySelector('.ad-form__reset');
const resetForm = () => {
  adForm.reset();
  priceElement.placeholder = minPriceCollection[typeElement.value];
  sliderElement.noUiSlider.set(priceElement.value);
  pristine.reset();
};

resetButton.addEventListener('click', () => {
  resetForm();
  resetMapState();
  resetSlider();
  filterElements.reset();
  resetPreviews();
});

export {resetForm};
