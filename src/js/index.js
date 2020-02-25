import 'babel-polyfill';
import $ from 'jquery';
import { } from '../libs/slick.min.js';
import '../scss/style.scss';


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
    if ($(window).scrollTop() > 0) {
      $('.header').addClass('header--fixed');
    }
    else {
      $('.header').removeClass('header--fixed');
    }
  });

});
