const ALLOWED_FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoElement = document.querySelector('#images');
const photoPreviewElement = document.querySelector('.ad-form__photo');

avatarElement.addEventListener('change', () => {
  const userAvatar = avatarElement.files[0];
  const fileName = userAvatar.name.toLowerCase();
  const compare = ALLOWED_FILE_TYPES.some((type) => fileName.endsWith(type));
  if (compare) {
    avatarPreviewElement.src = URL.createObjectURL(userAvatar);
  }
});

photoElement.addEventListener('change', () => {
  const file = photoElement.files[0];
  const fileName = file.name.toLowerCase();
  const compare = ALLOWED_FILE_TYPES.some((type) => fileName.endsWith(type));
  if (compare) {
    photoPreviewElement.innerHTML = '';
    const photo = document.createElement('img');
    photo.src = URL.createObjectURL(file);
    photo.style.objectFit = 'cover';
    photoPreviewElement.append(photo);
  }
});

const resetPreviews = () => {
  avatarPreviewElement.src = DEFAULT_AVATAR;
  photoPreviewElement.innerHTML = '';
};

export {resetPreviews};
