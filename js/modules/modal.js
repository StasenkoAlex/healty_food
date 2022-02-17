
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if(modalTimerId) {
    clearInterval(modalTimerId);
  }

}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

export default function modal(modalTrigger, modalSelector, modalTimerId) {

  const btnsOpenModal = document.querySelectorAll(modalTrigger),
        modal = document.querySelector(modalSelector);

  btnsOpenModal.forEach((btn) => {
    btn.addEventListener('click', () => openModal(modalSelector,  modalTimerId));
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') === '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });


  window.addEventListener('scroll', showModalByScroll);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal(modalSelector);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }


};

export {openModal};
export {closeModal};