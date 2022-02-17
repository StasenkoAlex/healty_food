const calc = function() {
  // Calculation

  const result = document.querySelector('.calculating__result span');
  let sex =  localStorage.getItem('gender') || 'female',
      height, weight, age, 
      rote = localStorage.getItem('rote') || '1.375';

  function checkStorage(elem, activeClass) {
    let elements = document.querySelectorAll(elem);
    elements.forEach(item => {
      if(item.getAttribute('data-rote') === rote) {
        elements.forEach(elem => elem.classList.remove(activeClass));
        item.classList.add(activeClass);
        return;
      }

      if(item.getAttribute('id') === sex) {
        elements.forEach(elem => elem.classList.remove(activeClass));
        item.classList.add(activeClass);
      }
    })
  }
  
  checkStorage('#gender div', 'calculating__choose-item_active');
  checkStorage('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcResult() {

    if (!sex || !height || !weight || !age || !rote) {
      result.textContent = '_____';
      return;
    }

    if(sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * rote);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * rote);
    }
  }

  calcResult();

  function getStaticData(element, activeClass) {
    const elements = document.querySelectorAll(element);

    elements.forEach(item => {
      item.addEventListener('click', (e) => {

        if(e.target.getAttribute('data-rote')) {
          rote = +e.target.getAttribute('data-rote');
          localStorage.setItem('rote', e.target.getAttribute('data-rote'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('gender', e.target.getAttribute('id'));
        }

        elements.forEach(elem => elem.classList.remove(activeClass));
        e.target.classList.add(activeClass);
    
        calcResult();
      });
     
    });
  };

  getStaticData('#gender div', 'calculating__choose-item_active');
  getStaticData('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicData(el) {
    const input = document.querySelector(el);

    input.addEventListener('input', () => {

      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch(input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcResult();
    })
  };

  getDynamicData('#height');
  getDynamicData('#weight');
  getDynamicData('#age');
};

export default calc;