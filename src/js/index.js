import 'babel-polyfill';
import $ from 'jquery';
import { } from '../libs/slick.min.js';
import '../scss/style.scss';
import anime from 'animejs/lib/anime.es.js';

let desktopMinWidth = 992;

$(document).ready(function () {
  let animation = function () {
    let scrollTop = $(window).scrollTop();
    let windowHeight = $(window).height();
    $(".baner, .icon-blocks, .text-section--animated, .text-section__animated-block, .reviews__animated-block").each(function (_, element) {
      let offset = $(element).offset().top;
      let windowOffset = scrollTop + .9 * windowHeight;
      windowOffset > offset && $(element).attr("data-anim", "true");
    });
  }

  animation();

  $(window).scroll(function () {
    animation();
    // if ($(window).scrollTop() > 0) {
    //   $('.header').addClass('header--fixed');
    // }
    // else {
    //   $('.header').removeClass('header--fixed');
    // }
  });

  anime.timeline({ loop: false }).add({
    targets: '.baner-title__letter',
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (_, i) => 150 * (i + 1)
  }).add({
    targets: '.baner__button',
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 500,
    delay: 0,
  });

  let animationTimeout;

  const onChangeSlide = (categoryId) => {
    if (!!animationTimeout) {
      clearTimeout(animationTimeout)
    }

    $('.slider-images__animate-item--show').addClass('slider-images__animate-item--hide');
    $('.sub-menu-items__item').removeClass('sub-menu-items__item--show');
    $('.slider-images__animate-item').removeClass('slider-images__animate-item--show');
    $(categoryId).addClass('sub-menu-items__item--show');
    $(categoryId + '-image').addClass('slider-images__animate-item--show');

    animationTimeout = setTimeout(function () {
      $('.slider-images__animate-item').removeClass('slider-images__animate-item--hide');
    }, 400)
  }


  if ($(window).width() >= desktopMinWidth) {

    $('.slider-main-menu-item').on('focus mouseover', function () {
      const categoryId = '#' + $(this).attr('data-category');
      if ($(categoryId).hasClass('sub-menu-items__item--show')) {
        return
      }
      $('.slider-main-menu-item').removeClass('nav-list__link--active');
      $(this).addClass('nav-list__link--active');
      onChangeSlide(categoryId);
    })

    $('.navbar-nav__item').on('focus mouseover', function () {
      const category = $(this).attr('data-category');
      const categoryId = '#' + category;
      $('.over-slider').addClass('over-slider--opened');
      $('body').addClass('over-slider-opened');
      $('.slider-main-menu-item[data-category=' + category + ']').addClass('nav-list__link--active');

      onChangeSlide(categoryId);
    });


    $('.close-over-slider').on('click', function () {
      $('.over-slider').removeClass('over-slider--opened');
      $('body').removeClass('over-slider-opened');
      $('.slider-main-menu-item').removeClass('nav-list__link--active');

    })
  }
  else {

    $('.navbar-nav__item').click(function (e) {
      e.stopPropagation();
      $('.sub-nav-list').removeClass('sub-nav-list--show');
      $(this).parent().find('.sub-nav-list').addClass('sub-nav-list--show');
    });

    $(document).click(function () {
      $('.sub-nav-list').removeClass('sub-nav-list--show');
    });

    $('.sub-nav-list').click(function (e) {
      e.stopPropagation();
    })
  }



  $('.scroll-down-button').click(function () {
    $('html, body').animate({
      scrollTop: $(".second-section").offset().top
    }, 1000);
  })

});
