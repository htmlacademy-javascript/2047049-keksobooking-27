import {adForm, minPriceCollection} from './utils.js';
import {priceElement, typeElement} from './validation.js';
import {resetSlider, sliderElement} from './slider.js';
import {resetMapState} from './map.js';

const resetButton = adForm.querySelector('.ad-form__reset');
const resetForm = () => {
  adForm.reset();
  priceElement.placeholder = minPriceCollection[typeElement.value];
  sliderElement.noUiSlider.set(priceElement.value);
};

resetButton.addEventListener('click', () => {
  resetForm();
  resetMapState();
  resetSlider();
});

export {resetForm};
