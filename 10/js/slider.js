import {adForm, pristine, minPriceCollection} from './utils.js';
import {priceElement, typeElement} from './validation.js';

const sliderElement = adForm.querySelector('.ad-form__slider');
const getSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: minPriceCollection[typeElement.value],
    step: 1000,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => Number(value),
    },
  });
};

const onSliderChange = () => {
  sliderElement.noUiSlider.set(priceElement.value);
};

const executeSlider = () => {
  getSlider();
  priceElement.addEventListener('change', onSliderChange);
  sliderElement.noUiSlider.on('update', () => {
    priceElement.value = sliderElement.noUiSlider.get();
    pristine.validate(priceElement);
  });
};

const resetSlider = () => sliderElement.noUiSlider.reset();

export {executeSlider, sliderElement, resetSlider};
