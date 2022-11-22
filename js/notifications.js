const ALERT_DELAY = 5000;
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const onEscapeDown = (evt) => evt.key === 'Escape';

const getMessage = (element) => {
  document.body.appendChild(element);
  const onDocumentKeydown = (evt) => {
    if (onEscapeDown(evt)) {
      element.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };
  element.addEventListener('click', () => {
    element.remove();
  });
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  getMessage(successMessage);
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  getMessage(errorMessage);
};

const showAlert = () => {
  const alertContainerElement = document.createElement('section');
  const alertTextElement = document.createElement('span');
  alertContainerElement.classList.add('error-container');
  alertTextElement.classList.add('error-container__notification');
  alertTextElement.textContent = 'Что-то пошло не так =(. Проверьте соединение и попробуйте снова';
  alertContainerElement.appendChild(alertTextElement);
  document.body.appendChild(alertContainerElement);
  setTimeout(() => {
    alertContainerElement.remove();
  }, ALERT_DELAY);
};

export {showSuccessMessage, showErrorMessage, showAlert};
