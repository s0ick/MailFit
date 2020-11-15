document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const countrys = [
    {country: 'Италия', city: 'Милан'},
    {country: 'Греция', city: 'Афины'},
    {country: 'Германия', city: 'Фрайбург'},
    {country: 'Турция', city: 'Каш'},
    {country: 'Португалия', city: 'Лиссабон'},
    {country: 'Испания', city: 'Мадрид'},
    {country: 'Италия', city: 'Виченца'},
    {country: 'Германия', city: 'Брелин'},
    {country: 'Испания', city: 'Барселона'},
    {country: 'Турция', city: 'Анталия'},
    {country: 'Португалия', city: 'Порту'},
    {country: 'Италия', city: 'Венеция'},
    {country: 'Италия', city: 'Генуя'},
    {country: 'Португалия', city: 'Гуарда'},
    {country: 'Испания', city: 'Валенсия'},
    {country: 'Италия', city: 'Падуя'},
    {country: 'Греция', city: 'Салоники'},
    {country: 'Турция', city: 'Стамбул'},
  ];

  const updateSlides = (array, style) => {
    const slides = document.querySelectorAll('.hero-slider__slide');
    let activeSlide = mySwiper.realIndex;
    for(let i = 0; i < array.length; i++) slides[activeSlide + array[i]].classList.add(style);
  };
  
  const addingClassLastSlide = (slides) => {
    
    if (window.innerWidth > 1439) {
      updateSlides([4,5,13,14], 'last-slide');
    } else if (window.innerWidth > 991) {
      updateSlides([2,3,11,12], 'openCard-schema', slides);
    }
  };

  const clearOpenCard = (i) => {
    const slides = document.querySelectorAll('.hero-slider__slide');
    slides.forEach((elem, index) => {
      if(i !== index) elem.classList.remove('openCard');
      elem.classList.remove('openCard-last');
      elem.style.cssText = `
        margin-left: 0px;
        margin-top: 0px;
      `;
    });
  };

  // Open card
  const openCard = () => {
    const slides = document.querySelectorAll('.hero-slider__slide');
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    const findLastSlide = (slide, index) => {
      let activeSlide = mySwiper.realIndex;
      const imgClose = slide.querySelector('.close');
      if(window.innerWidth > 991 && (
          activeSlide + 2 === index ||
          activeSlide + 3 === index ||
          activeSlide + 11 === index ||
          activeSlide + 12 === index)) {
          slide.classList.toggle('openCard-last');
      } else if (window.innerWidth < 991 && window.innerWidth > 768) {
        slide.style.marginLeft = `-${slide.getBoundingClientRect().left - 130}px`;
      }  else if (window.innerWidth < 991 && window.innerWidth > 575) {
        slide.style.marginLeft = `-${slide.getBoundingClientRect().left - 40}px`;
      } else if(window.innerWidth < 991 && window.innerWidth > 374) {
        const swiperContainer = document.querySelector('.swiper-container');
        slide.style.marginLeft = `-${slide.getBoundingClientRect().left - 20}px`;
        slide.style.marginTop = `-${slide.getBoundingClientRect().top - 155}px`;
        if(slide.offsetWidth === 150) {
          swiperContainer.offsetHeight < 300 ? swiperContainer.style.height = '475px' : '';
          slide.style.width = `${swiperContainer.offsetWidth - 16}px`;
          slide.style.height = `${swiperContainer.offsetHeight - 35}px`;
          imgClose.style.display = `block`;
        } else {
          slide.style.width = `150px`;
          slide.style.height = `230px`;
          imgClose.style.display = `none`;
          swiperContainer.style.height = 'auto';
        }
      }
    };

    slides.forEach((elem, index) => {
      elem.addEventListener('click', () => {
        clearOpenCard(index);
        elem.classList.toggle('openCard'); 
        findLastSlide(elem, index);
      });
    });
  };

  const createSlide = ({city, country}, index) => {
    // Creating Elements
    const swiperSlide = document.createElement('div'),
          heroSliderSlide = document.createElement('div'),
          heroSliderFace = document.createElement('div'),
          img = document.createElement('img'),
          spanCity = document.createElement('span'),
          spanCountry = document.createElement('span'),
          heroSliderCard = document.createElement('div'),
          heroSliderText = document.createElement('p'),
          heroSliderLink = document.createElement('a'),
          imgClose = document.createElement('img');

    // Adding classes
    swiperSlide.classList.add('swiper-slide');
    heroSliderSlide.classList.add('hero-slider__slide');
    heroSliderFace .classList.add('hero-slider-face');
    img.classList.add('hero-slider__image');
    spanCity.classList.add('hero-slider__city');
    spanCountry.classList.add('hero-slider__country');
    heroSliderCard.classList.add('hero-slider__card');
    heroSliderText.classList.add('hero-slider__text');
    heroSliderLink.classList.add('hero-slider__link');
    imgClose.classList.add('close');
    
    // Adding Attributes
    heroSliderLink.href = '#';
    img.alt = city;
    img.src = `./img/default/slide-${index + 1}.jpg`;
    imgClose.alt = 'close';
    imgClose.src = './img/interface/close.svg';
    // If you need Retina displays
    //img.src = `./img/Retina/slide-${index + 1}.jpg`;

    // Adding Text content
    heroSliderLink.textContent = 'Подробнее';
    heroSliderText.textContent = 'Фрайбург-им-Брайсгау – оживленный университетский город в горах Шварцвальд на юго-западе Германии, известный своим умеренным климатом.';
    spanCity.textContent = city;
    spanCountry.textContent = country;

    // Building a DOM element
    heroSliderFace.append(img);
    heroSliderFace.append(spanCity);
    heroSliderFace.append(spanCountry);

    heroSliderCard.append(heroSliderText);
    heroSliderCard.append(heroSliderLink);

    heroSliderSlide.append(heroSliderFace);
    heroSliderSlide.append(heroSliderCard);
    heroSliderSlide.append(imgClose); 

    swiperSlide.append(heroSliderSlide);
    return swiperSlide;
  };

  const setSlides = (props) => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    let count = 0;
    swiperWrapper.textContent = '';

    const addSlide = (elem, index, count) => {
      let slide = createSlide(elem, index);
      mySwiper.addSlide(count, slide);
    }; 

    countrys.forEach((elem, index) => {
      if(props === 'start') {
        addSlide(elem, index, count);
        count++;
      } else if (props === elem.country) {
        addSlide(elem, index, count);
        count++;
      }
    });
    addingClassLastSlide();
    if(window.innerWidth < 1440) openCard();
  };
  setSlides('start');

  // Toggle active element
  const toggleFilterItem = () => {
    const items = document.querySelectorAll('.hero-filter__item'),
          filter1 = document.getElementById('filter-1'),
          filter2 = document.getElementById('filter-2');
    let filter = '';      

    const setActiveClass = (event) => {
      let target = event.target;
      if(target.classList.contains('hero-filter__item')) {
        items.forEach(elem => {
          elem.classList.remove('active__item');
        });
        target.classList.add('active__item');
        if(target.textContent === 'Все страны' || target.textContent === 'Все направления') {
          filter = 'start';
        } else filter = target.textContent;
      }

      setSlides(filter);
    }      

    filter1.addEventListener('click', (event) => {
      setActiveClass(event);
    });
    filter2.addEventListener('click', (event) => {
      setActiveClass(event);

      const spanChange = document.querySelector('.hero-filter-select__change');
      let target = event.target;
      if(target.classList.contains('hero-filter__item')) {
        spanChange.textContent = target.textContent;
      }

    });       
  };
  toggleFilterItem();

  // Adding class last-slide
  const setClass = () => {
    const slides = document.querySelectorAll('.hero-slider__slide'),
          arrowPrev = document.querySelector('.swiper-arrow-prev'),
          arrowNext = document.querySelector('.swiper-arrow-next');

    const clearClasses = () => {
      slides.forEach(elem => {
        elem.classList.remove('last-slide');
        elem.classList.remove('openCard-schema');
      });
    };

    arrowNext.addEventListener('click', () => {
      clearClasses();
      addingClassLastSlide();
    });
    arrowPrev.addEventListener('click', () => {
      clearClasses();
      addingClassLastSlide();
    });
    mySwiper.on('slideChangeTransitionEnd', function() {
      clearClasses();
      addingClassLastSlide();
      clearOpenCard();
    });
  };
  setClass();

  // Activate list
  const activateList = () => {
    const select = document.querySelector('.hero-filter-select__face'),
          list = document.querySelector('.hero-filter-select__list'),
          arrowLeft = document.querySelector('.arrow__line-1'),
          arrowRight = document.querySelector('.arrow__line-2');
    select.addEventListener('click', () => {
      list.classList.toggle('display');
      arrowLeft.classList.toggle('transformUp');
      arrowRight.classList.toggle('transformDown');
    });      
  };
  activateList();
});