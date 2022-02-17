const slider = function({sliders, sliderItem, prevArrow, nextArrow, currentNum, sliderWrap, sliderInner }) {
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
  
  if(currentSlide < 10) {
    current.textContent = `0${currentSlide}`;
  } else {
    current.textContent = currentSlide;
  }

  sliderContainer.style.position = 'relative';
   
  let indicators =  document.createElement('ol'),
      dots = [];
  indicators.classList.add('carousel-indicators');
  sliderContainer.append(indicators);

  for(let i = 0; i < slider.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if(currentSlide == i + 1) {
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
    if(n < 10) {
      current.textContent = `0${n}`;
    } else {
      current.textContent = n;
    } 
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g,'')
  }
  
  nextBtn.addEventListener('click', () => {

    if(offset == (slider.length - 1) * deleteNotDigits(width)) {
      offset = 0;
    } else {
      offset += +width.replace(/\D/g,'');
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    
    if(currentSlide === slider.length) {
      currentSlide = 1;
    } else {
      currentSlide++;
    }

    setCurrentCount(currentSlide);
    setActiveDot(currentSlide);
  
  });

  prevBtn.addEventListener('click', () => {

    if(offset == 0 ) {
      offset = (slider.length - 1) * deleteNotDigits(width);
    } else {
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if(currentSlide === 1) {
      currentSlide = slider.length;
    } else {
      currentSlide--;
    }

    setCurrentCount(currentSlide);
    setActiveDot(currentSlide);
    
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      currentSlide = +slideTo;

      offset = deleteNotDigits(width) * (currentSlide - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

   
      setCurrentCount(currentSlide);
      setActiveDot(currentSlide);
      
    })
  });
};

export default slider;