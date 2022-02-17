/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const calc = function () {
  // Calculation
  const result = document.querySelector('.calculating__result span');
  let sex = localStorage.getItem('gender') || 'female',
      height,
      weight,
      age,
      rote = localStorage.getItem('rote') || '1.375';

  function checkStorage(elem, activeClass) {
    let elements = document.querySelectorAll(elem);
    elements.forEach(item => {
      if (item.getAttribute('data-rote') === rote) {
        elements.forEach(elem => elem.classList.remove(activeClass));
        item.classList.add(activeClass);
        return;
      }

      if (item.getAttribute('id') === sex) {
        elements.forEach(elem => elem.classList.remove(activeClass));
        item.classList.add(activeClass);
      }
    });
  }

  checkStorage('#gender div', 'calculating__choose-item_active');
  checkStorage('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcResult() {
    if (!sex || !height || !weight || !age || !rote) {
      result.textContent = '_____';
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * rote);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * rote);
    }
  }

  calcResult();

  function getStaticData(element, activeClass) {
    const elements = document.querySelectorAll(element);
    elements.forEach(item => {
      item.addEventListener('click', e => {
        if (e.target.getAttribute('data-rote')) {
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
  }

  ;
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

      switch (input.getAttribute('id')) {
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
    });
  }

  ;
  getDynamicData('#height');
  getDynamicData('#weight');
  getDynamicData('#age');
};

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const cards = function () {
  //MENU CARDS
  class MenuCard {
    constructor(imgSrc, altimg, title, text, price) {
      let parentElement = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '.menu__field .container';
      this.imgSrc = imgSrc;
      this.altimg = this.altimg;
      this.title = title;
      this.text = text;
      this.currency = 27;
      this.price = price;
      this.parentElement = document.querySelector(parentElement);
      this.convertUAH();

      for (var _len = arguments.length, rest = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        rest[_key - 6] = arguments[_key];
      }

      this.classes = rest;
    }

    convertUAH() {
      this.price = this.price * this.currency;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length > 0) {
        element.classList.add('menu__item');
        this.classes.forEach(i => element.classList.add(i));
      } else {
        element.classList.add('menu__item');
      }

      element.innerHTML = `<img src="${this.imgSrc}" alt="${this.altimg}">
                                <h3 class="menu__item-subtitle">${this.title}</h3>
                                <div class="menu__item-descr">
                                    ${this.text}
                                </div>
                                <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                    <div class="menu__item-cost">Цена:</div>
                                    <div class="menu__item-total"><span> ${this.price}</span> грн/день</div>
                                </div>`;
      this.parentElement.append(element);
    }

  }

  const getResource = async url => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url} and status ${res.status}`);
    }

    return await res.json();
  };

  getResource('http://localhost:3000/menu').then(data => {
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


const forms = function (modalSelector, modalTimerId) {
  // FORMS
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'Загрузка',
    success: 'Спасибо, мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': "application/json"
      },
      body: data
    });
    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault(); // showThanksModal(message.loading);
      // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');
      //request.setRequestHeader('Content-type', 'multipart/form-data'); // отправка полей форм не нужна при отправке FormData
      //request.setRequestHeader('Content-type', 'application/json');

      const formData = new FormData(form); //конструктор для сбора данные во всех полях
      // const object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });

      const json = JSON.stringify(Object.fromEntries(formData.entries())); // fetch('server.php', {
      //   method: "POST",
      //   // headers: {
      //   //   'Content-type': "multipart/form-data",
      //   // },
      //   body: formData
      // })

      postData('http://localhost:3000/requests', json).then(data => {
        showThanksModal(message.success);
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      }); //request.send(formData);
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
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector, modalTimerId);
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
    }, 4000);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ modal; },
/* harmony export */   "openModal": function() { return /* binding */ openModal; },
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; }
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

function modal(modalTrigger, modalSelector, modalTimerId) {
  const btnsOpenModal = document.querySelectorAll(modalTrigger),
        modal = document.querySelector(modalSelector);
  btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') === '') {
      closeModal(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });
  window.addEventListener('scroll', showModalByScroll);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
}
;



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const slider = function (_ref) {
  let {
    sliders,
    sliderItem,
    prevArrow,
    nextArrow,
    currentNum,
    sliderWrap,
    sliderInner
  } = _ref;
  // slider
  const sliderContainer = document.querySelector(sliders),
        slider = document.querySelectorAll(sliderItem),
        prevBtn = document.querySelector(prevArrow),
        nextBtn = document.querySelector(nextArrow),
        current = document.querySelector(currentNum),
        slidesWrapper = document.querySelector(sliderWrap),
        slidesField = slidesWrapper.querySelector(sliderInner),
        width = window.getComputedStyle(slidesWrapper).width;
  let currentSlide = 1,
      offset = 0;
  slidesField.style.width = 100 * slider.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = 'all 0.5s';
  slidesWrapper.style.overflow = 'hidden';
  slider.forEach(slide => {
    slide.style.width = width;
  });

  if (currentSlide < 10) {
    current.textContent = `0${currentSlide}`;
  } else {
    current.textContent = currentSlide;
  }

  sliderContainer.style.position = 'relative';
  let indicators = document.createElement('ol'),
      dots = [];
  indicators.classList.add('carousel-indicators');
  sliderContainer.append(indicators);

  for (let i = 0; i < slider.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    if (currentSlide == i + 1) {
      dot.classList.add('dot--active');
    }

    indicators.append(dot);
    dots.push(dot);
  }

  function setActiveDot(n) {
    dots.forEach(item => item.classList.remove('dot--active'));
    dots[n - 1].classList.add('dot--active');
  }

  function setCurrentCount(n) {
    if (n < 10) {
      current.textContent = `0${n}`;
    } else {
      current.textContent = n;
    }
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  nextBtn.addEventListener('click', () => {
    if (offset == (slider.length - 1) * deleteNotDigits(width)) {
      offset = 0;
    } else {
      offset += +width.replace(/\D/g, '');
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (currentSlide === slider.length) {
      currentSlide = 1;
    } else {
      currentSlide++;
    }

    setCurrentCount(currentSlide);
    setActiveDot(currentSlide);
  });
  prevBtn.addEventListener('click', () => {
    if (offset == 0) {
      offset = (slider.length - 1) * deleteNotDigits(width);
    } else {
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (currentSlide === 1) {
      currentSlide = slider.length;
    } else {
      currentSlide--;
    }

    setCurrentCount(currentSlide);
    setActiveDot(currentSlide);
  });
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      currentSlide = +slideTo;
      offset = deleteNotDigits(width) * (currentSlide - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      setCurrentCount(currentSlide);
      setActiveDot(currentSlide);
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const tabs = function () {
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      //item.style.display = 'none';
      item.classList.add('hide', 'fade');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    //tabsContent[i].style.display = 'block';
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      console.log(target);
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const timer = function () {
  // TIMER
  function setTimer(endtime, elem) {
    const timer = document.querySelector(elem),
          daysWrap = timer.querySelector('#days'),
          hoursWrap = timer.querySelector('#hours'),
          minutesWrap = timer.querySelector('#minutes'),
          secondsWrap = timer.querySelector('#seconds');
    updateClock();

    function calculateTime() {
      let timeHandler = setInterval(updateClock, 1000);
      let delta = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(delta / (24 * 60 * 60 * 1000)),
          hours = Math.floor(delta / (1000 * 60 * 60) % 24),
          minutes = Math.floor(delta / (1000 * 60) % 60),
          seconds = Math.floor(delta / 1000 % 60);

      if (delta <= 0) {
        clearInterval(timeHandler);
      }

      return {
        days: days,
        hours: hours,
        miutes: minutes,
        seconds: seconds
      };
    }

    function updateClock() {
      daysWrap.innerHTML = format(calculateTime().days);
      hoursWrap.innerHTML = format(calculateTime().hours);
      minutesWrap.innerHTML = format(calculateTime().miutes);
      secondsWrap.innerHTML = format(calculateTime().seconds);
    }

    function format(t) {
      if (t >= 0 && t < 10) {
        return `0${t}`;
      } else {
        return t;
      }
    }
  }

  setTimer('2022-02-30 20:19', '.timer');
};

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");










window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimerId), 3000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', modalTimerId);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('.modal', modalTimerId);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    sliders: '.offer__slider',
    sliderItem: '.offer__slide',
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    currentNum: '#current',
    sliderWrap: '.offer__slider-wrapper',
    sliderInner: '.offer__slider-inner'
  }); // FIRST VARIANT SLIDER
  // showSlide(currentSlide);
  // if(slider.length < 10) {
  //   total.textContent = `0${slider.length}`;
  // } else {
  //   total.textContent = slider.length;
  // }
  // function showSlide(n) {
  //   if (n < 1) {
  //     currentSlide = slider.length;
  //   }
  //   if (n > slider.length) {
  //     currentSlide = 1;
  //   }
  //   slider.forEach(item => {
  //     item.style.display = 'none';
  //   });
  //   slider[currentSlide - 1].style.display = 'block';
  //   if(slider.length < 10) {
  //     current.textContent = `0${currentSlide}`;
  //   } else {
  //     current.textContent = currentSlide;
  //   }
  // }
  // function changeSlide(n) {
  //   console.log('do');
  //   currentSlide += n;
  //   showSlide(currentSlide);
  // }
  // prevBtn.addEventListener('click', changeSlide.bind( null, -1));
  // prevBtn.addEventListener('click', () => {
  //   changeSlide(-1)
  // });
  // nextBtn.addEventListener('click', () => {
  //   changeSlide(1)
  // });
}); // function showThis(a, b) {
//     console.log(this);
//     function sun() {
//         console.log(this)
//         return a + b;
//     }
//     console.log(sun());
// }
// showThis(2, 10);
// const obj = {
//     old: 2,
//     name: 3,
//     show: function() {
//         console.log(this)
//       function a () {
//           console.log(this);
//       }
//       a();
//     }
// }
// console.log(obj.show());
// function createUser(name, id) {
//   this.name = name;
//   this.id = id;
//   this.human =  true;
//   this.hello =  () => {
//       console.log('hello' + this.name);
//   }
// }
// let ivan = new createUser('Ivan',1);
// console.log(ivan.hello())
//  function sayName(surname) {
//      console.log(this.name + surname);
//      console.log(this.ex)
//  }
//  const user = {
//      name: 'john',
//      ex: 'girl'
//  }
//  sayName.call(user, 'Smith');
//  function count(num) {
//      return this*num;
//  }
//  const double = count.bind(2); //- this==2;
//  console.log(double(4));
//JSON

const persone = {
  name: 'Alex',
  tel: '+7444444444'
};
console.log(JSON.stringify(persone)); // JSON.parse(JSONFILE) -  object
// deep object copy

const clone = JSON.parse(JSON.stringify(persone));
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map