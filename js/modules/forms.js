import {openModal, closeModal} from './modal';

const forms = function(modalSelector, modalTimerId) {
  // FORMS

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'Загрузка',
    success: 'Спасибо, мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': "application/json",
      },
      body: data
    });
    return await res.json();
  }

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // showThanksModal(message.loading);
      // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');
      //request.setRequestHeader('Content-type', 'multipart/form-data'); // отправка полей форм не нужна при отправке FormData
      //request.setRequestHeader('Content-type', 'application/json');

      const formData = new FormData(form); //конструктор для сбора данные во всех полях

      // const object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // fetch('server.php', {
      //   method: "POST",
      //   // headers: {
      //   //   'Content-type': "multipart/form-data",
      //   // },
      //   body: formData
      // })

      postData('http://localhost:3000/requests', json)
      .then(data => {
        showThanksModal(message.success);
      })
      .catch(() => {
        showThanksModal(message.failure);
      })
      .finally(()=> {
        form.reset();
      })
      //request.send(formData);
      //request.send(json);
      // request.addEventListener('load', () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     form.reset();

      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal(modalSelector,  modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>x</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal(modalSelector);
    }, 4000)
  }
};

export default forms;