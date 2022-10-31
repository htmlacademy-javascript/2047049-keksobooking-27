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

// Функция возвращает индекс элемента массива
const getArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция возвращает копию массива
const getSomeArray = (array) => {
  const someArrayLength = getRandomInteger(1, array.length);
  return array.slice(0, someArrayLength);
};

export{getRandomInteger, getRandomFloatNumber, getArrayElement, getSomeArray};