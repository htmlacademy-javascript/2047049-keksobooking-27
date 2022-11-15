// Функции осуществляющие взамодействие с сервером по средством fetch()
const getData = (onSuccess, onFail) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => onSuccess(ads))
    .catch(onFail);
};

const postData = (onSuccess, onFail, body) => {
  fetch(
    'https://27.javascript.pages.academy/keksobooking',
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
