const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const offerTypeCollection = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

// Функция добавляющая фото к шаблону
const getPhotos = (block, photos, template) => {
  if (photos.length !== 0) {
    photos.forEach((photo) => {
      const imageElement = template.cloneNode(true);
      imageElement.src = photo;
      block.appendChild(imageElement);
    });
  } else {
    block.remove();
  }
};

// Функция добавляющая features к шаблону
const getFeatures = (featureList, featuresArray, featuresListParent) => {
  if (featuresArray.length !== 0) {
    featureList.forEach((featureListItem) => {
      const isNecessary = featuresArray.some((feature) => featureListItem.classList.contains(`popup__feature--${feature}`));
      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  } else {
    featuresListParent.remove();
  }
};

// Функция генерирует DOM-Элемент с объявлением
const getPopup = (popup) => {
  const cardElement = cardTemplate.cloneNode(true);
  const {
    author: { avatar },
    offer: {
      title,
      address,
      type,
      price,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos,
    }
  } = popup;

  cardElement.querySelector('.popup__avatar').src = avatar;
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerTypeCollection[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  const featuresListParent = cardElement.querySelector('.popup__features');
  const featureList = featuresListParent.querySelectorAll('.popup__feature');
  const popupPhotosElement = cardElement.querySelector('.popup__photos');
  const popupPhotoTemplate = popupPhotosElement.querySelector('.popup__photo');
  const descriptionItem = cardElement.querySelector('.popup__description');

  if (description.length !== 0) {
    descriptionItem.textContent = description;
  } else {
    descriptionItem.remove();
  }

  getFeatures(featureList, features, featuresListParent);

  popupPhotosElement.innerHTML = '';
  getPhotos(popupPhotosElement, photos, popupPhotoTemplate);

  return cardElement;
};

export {getPopup};
