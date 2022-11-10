import {adForm, pristine} from './utils.js';
import {priceElement} from './validation.js';

const sliderElement = adForm.querySelector('.ad-form__slider');
const getSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 0,
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

export {executeSlider};
