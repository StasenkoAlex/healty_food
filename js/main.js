'use strict';
import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import calc from './modules/calc';
import slider from './modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 3000);

  tabs();
  timer();
  modal('[data-modal]', '.modal', modalTimerId);
  cards();
  forms('.modal', modalTimerId);
  calc();
  slider({
    sliders: '.offer__slider',
    sliderItem: '.offer__slide',
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    currentNum: '#current',
    sliderWrap: '.offer__slider-wrapper',
    sliderInner: '.offer__slider-inner'
  });

  // FIRST VARIANT SLIDER

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

});

// function showThis(a, b) {
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
  tel: '+7444444444',
};

console.log(JSON.stringify(persone)); // JSON.parse(JSONFILE) -  object

// deep object copy
const clone = JSON.parse(JSON.stringify(persone));
