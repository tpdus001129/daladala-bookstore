import Swiper from 'swiper';

new Swiper(".swiper", {
  autoplay: {
    delay: 5000,
  },
  loop: true,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
});