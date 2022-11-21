// Функции осуществляющие взамодействие с сервером по средством fetch()
const SERVER_URL = 'https://27.javascript.pages.academy/keksobooking';
const getData = (onSuccess, onFail) => {
  fetch(`${SERVER_URL}/data`)
    .then((response) => response.json())
    .then((ads) => onSuccess(ads))
    .catch(onFail);
};

const postData = (onSuccess, onFail, body) => {
  fetch(
    SERVER_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Что-то пошло не так. Попробуйте снова');
      }
    })
    .catch(() => {
      onFail('Что-то пошло не так. Попробуйте снова');
    });
};

export {getData, postData};
