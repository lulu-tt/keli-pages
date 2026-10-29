/**
 * main.js
 *
 * Main Page UI Script
 */

var mainUI = (function () {
  window.addEventListener('DOMContentLoaded', () => {
    mainUI.init();
    mainUI.visualSwiper();
    mainUI.menuSwiper();
    mainUI.TabHorizSwiper();
    mainUI.newsBoardSwiper();
    mainUI.verHorTabSwiper();
    mainUI.cardListSwiper();
    mainUI.cardListSwiper2();
    mainUI.rollngBannerWiepr();
    mainUI.themeAccodian();
    mainUI.mainPopupZone();
  });

  let lenis = null;
  let newsSwiper = null;
  let cardSwiper = null;
  let visualSwiperControlsBound = false;

  return {
    PublicVarLenis() {
      return lenis;
    },
    PublicVarNewsSwiper() {
      return newsSwiper;
    },
    PublicVarCardSwiper() {
      return cardSwiper;
    },
    init() {
      lenis = new Lenis();

      lenis.on('scroll', e => {});

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      // mainUI.PublicVarLenis().destroy()
      requestAnimationFrame(raf);

      AOS.init({
        once: true,
      });
    },
    visualSwiper() {
      const swiperEl = document.querySelector('.visual-swiper');
      if (!swiperEl) return;

      const pagingText = document.querySelectorAll('.swiper-pg-list > p');
      const progressCircle = document.querySelector('.autoplay-progress svg');
      const playPauseButton = document.querySelector('.visual-button-play-pause');
      const slideWrapper = swiperEl.querySelector('.swiper-wrapper');
      const fractionEl = document.querySelector('.visual-wrap .pg');

      // AJAX로 배너를 다시 그리면서 visualSwiper()가 재호출되는 경우를 대비해
      // 기존 인스턴스를 먼저 정리한다. (안 하면 같은 DOM에 인스턴스가 중첩되어
      // autoplay/터치/네비게이션 리스너가 중복 등록되고, prev/next 버튼의
      // disabled 상태가 서로 충돌하는 원인이 된다)
      if (swiperEl.swiper) {
        swiperEl.swiper.destroy(true, true);
      }

      const formatFraction = number => (number < 10 ? '0' + number : String(number));

      if (fractionEl && !fractionEl.querySelector('.current')) {
        fractionEl.innerHTML =
          '<strong class="current" aria-label="현재 페이지 :"></strong>' +
          '<i aria-hidden="true"></i>' +
          '<span class="total" aria-label="총 페이지 수:"></span>';
      }

      function updateFraction(swiper) {
        if (!fractionEl) return;
        const currentEl = fractionEl.querySelector('.current');
        const totalEl = fractionEl.querySelector('.total');
        if (currentEl) currentEl.textContent = formatFraction(swiper.activeIndex + 1);
        if (totalEl) totalEl.textContent = formatFraction(swiper.slides.length);
      }

      function updateInertAttribute(swiper) {
        swiper.slides.forEach((slide, index) => {
          if (index === swiper.activeIndex) {
            slide.removeAttribute('inert');
          } else {
            slide.setAttribute('inert', '');
          }
        });
      }

      new Swiper('.visual-swiper', {
        spaceBetween: 0,
        speed: 1400,
        resistanceRatio: 0,
        a11y: {
          prevSlideMessage: '이전 슬라이드',
          nextSlideMessage: '다음 슬라이드',
          slideLabelMessage: '총 {{slidesLength}}번째 슬라이드 중 {{index}}번째 슬라이드',
        },
        navigation: {
          nextEl: '.visual-wrap .button-next',
          prevEl: '.visual-wrap .button-prev',
        },
        pagination: {
          el: '.visual-swiper .swiper-pg-list',
          clickable: true,
          renderBullet: function (index, className) {
            return `<a href="#n" class="${className}">${pagingText[index].innerHTML}</a>`;
          },
        },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          //   disableOnInteraction: false,
        },
        on: {
          autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty('--progress', 1 - progress);
          },
          init: function (ele) {
            if (slideWrapper.children.length <= 1) {
              document.querySelector('.autoplay-progress').style.display = 'none';
              ele.autoplay.running = false;
            }
            updateFraction(ele);
            updateInertAttribute(ele);
          },
          slideChange: function (ele) {
            updateFraction(ele);
            updateInertAttribute(ele);
          },
        },
      });

      if (!visualSwiperControlsBound) {
        visualSwiperControlsBound = true;

        // 포커스
        swiperEl.addEventListener('focusin', () => {
          if (swiperEl.swiper) swiperEl.swiper.autoplay.stop();
        });

        swiperEl.addEventListener('focusout', () => {
          const mode = document.querySelector('.visual-button-play-pause');
          if (swiperEl.swiper && mode.classList.contains('active') === false) {
            swiperEl.swiper.autoplay.start();
          }
        });

        // 정지,시작
        playPauseButton.addEventListener('click', function () {
          if (!swiperEl.swiper) return;
          if (swiperEl.swiper.autoplay.running) {
            swiperEl.swiper.autoplay.stop();
            this.setAttribute('aria-label', '슬라이드 재생');
            this.classList.add('active');
          } else {
            swiperEl.swiper.autoplay.start();
            this.setAttribute('aria-label', '슬라이드 정지');
            this.classList.remove('active');
          }
        });
      }
    },
    menuSwiper() {
      let menuSwiper = new Swiper('.menu-go-swiper', {
        slidesPerView: 8,
        spaceBetween: 16,
        resistanceRatio: 0,
        a11y: {
          prevSlideMessage: '이전 슬라이드',
          nextSlideMessage: '다음 슬라이드',
          slideLabelMessage: '총 {{slidesLength}}번째 슬라이드 중 {{index}}번째 슬라이드',
        },
        navigation: {
          nextEl: '.menu-go-wrap .menu-next',
          prevEl: '.menu-go-wrap .menu-prev',
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          450: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
          1400: {
            slidesPerView: 8,
            spaceBetween: 16,
          },
        },
      });
    },
    TabHorizSwiper() {
      let tabHorSwiper = new Swiper('.horiz-tab-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        freemode: true,
        resistanceRatio: 0,
        a11y: {
          slideLabelMessage: false,
        },
        breakpoints: {
          320: {
            spaceBetween: 16,
          },
          1024: {
            spaceBetween: 50,
          },
        },
      });
    },
    newsBoardSwiper() {
      newsSwiper = new Swiper('.news-board-swiper', {
        // slidesPerView: 'auto',
        slidesPerView: 3,
        spaceBetween: 15,
        freemode: true,
        observer: true,
        observeParents: true,
        resistanceRatio: 0,
        a11y: {
          prevSlideMessage: '이전 슬라이드',
          nextSlideMessage: '다음 슬라이드',
          slideLabelMessage: '총 {{slidesLength}}번째 슬라이드 중 {{index}}번째 슬라이드',
        },
        navigation: {
          nextEl: '.news-board .menu-next',
          prevEl: '.news-board .menu-prev',
        },
        breakpoints: {
          320: {
            slidesPerView: 'auto',
          },
          1024: {
            slidesPerView: 2,
          },
          1300: {
            slidesPerView: 3,
          },
        },
      });
    },
    verHorTabSwiper() {
      let verhorSwiper = new Swiper('.ver-hor-tab', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        freemode: true,
        resistanceRatio: 0,
        a11y: {
          slideLabelMessage: false,
        },
        breakpoints: {
          320: {
            spaceBetween: 16,
          },
          1024: {
            spaceBetween: 50,
          },
        },
      });
    },
    cardListSwiper() {
      cardSwiper = new Swiper('.card-list-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 15,
        freeMode: true,
        observer: true,
        observeParents: true,
        resistanceRatio: 0,
        a11y: {
          slideLabelMessage: '총 {{slidesLength}}번째 슬라이드 중 {{index}}번째 슬라이드',
        },
        scrollbar: {
          el: '.card-list-swiper .swiper-scrollbar',
          hide: false,
          draggable: true,
        },
        breakpoints: {
          1024: {
            spaceBetween: 20,
          },
        },
      });

      const scrollBar = cardSwiper.scrollbar.el;

      if (scrollBar) {
        scrollBar.addEventListener('focus', () => {
          cardSwiper.keyboard.enable();
        });
        scrollBar.addEventListener('focusout', () => {
          cardSwiper.keyboard.disable();
        });
      }

      // swiper.update()
    },
    cardListSwiper2() {
      let cardSwiper = new Swiper('.card-list-swiper2', {
        slidesPerView: 'auto',
        spaceBetween: 15,
        freeMode: true,
        observer: true,
        observeParents: true,
        resistanceRatio: 0,
        a11y: {
          slideLabelMessage: '총 {{slidesLength}}번째 슬라이드 중 {{index}}번째 슬라이드',
        },
        scrollbar: {
          el: '.card-list-swiper2 .swiper-scrollbar',
          hide: false,
          draggable: true,
        },
        breakpoints: {
          1024: {
            spaceBetween: 20,
          },
        },
      });

      const scrollBar = cardSwiper.scrollbar.el;

      if (scrollBar) {
        scrollBar.addEventListener('focus', () => {
          cardSwiper.keyboard.enable();
        });
        scrollBar.addEventListener('focusout', () => {
          cardSwiper.keyboard.disable();
        });
      }

      // swiper.update()
    },
    rollngBannerWiepr() {
      const bannerPauseButton = document.querySelector('.rolling-banner .btn-play-pause');
      let bannerSwiper = new Swiper('.rolling-banner .swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        resistanceRatio: 0,
        a11y: {
          slideLabelMessage: '총 {{slidesLength}}번째 슬라이드 중 {{index}}번째 슬라이드',
        },
        navigation: {
          nextEl: '.rolling-banner .btn-next',
          prevEl: '.rolling-banner .btn-prev',
        },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: '.banner-controll .pg',
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return `
            <strong class="current ${currentClass}" aria-label="현재 페이지 :"></strong>
            /
            <span class="${totalClass}" aria-label="총 페이지 수:"></span>`;
          },
          formatFractionCurrent: function (number) {
            return number < 10 ? '0' + number : number;
          },

          formatFractionTotal: function (number) {
            return number < 10 ? '0' + number : number;
          },
        },
      });

      bannerPauseButton.addEventListener('click', function () {
        if (bannerSwiper.autoplay.running) {
          bannerSwiper.autoplay.stop();
          this.setAttribute('aria-label', '슬라이드 재생');
          this.classList.add('active');
        } else {
          bannerSwiper.autoplay.start();
          this.setAttribute('aria-label', '슬라이드 정지');
          this.classList.remove('active');
        }
      });
    },
    themeAccodian() {
      const eduBtn = document.querySelectorAll('.edu-menu');

      eduBtn.forEach(ele => {
        ele.addEventListener('click', e => {
          const menuAllSiblings = UI.GetAllSiblings(ele.parentNode);
          menuAllSiblings.forEach(ele => {
            ele.classList.remove('active');
          });
          ele.parentElement.classList.add('active');
          e.preventDefault();
        });
      });
    },
    mainPopupZone() {
      const popup = document.querySelector('.main-layer-popzone');
      const targetPopupClose = document.querySelector('.btn-pozone-close');
      const targetFocus = popup;
      const btn = document.querySelector('.popzon-button-play-pause');

      if (popup) {
        setTimeout(() => {
          popup.focus();
        }, 100);

/*
        if (mainUI.popupGetCookie('oneday') || mainUI.popupGetCookie('week')) {
          popup.classList.remove('open');
        } else {
          popup.classList.add('open');
        }
*/

        targetPopupClose.addEventListener('keydown', e => {
          if (!e.shiftKey && e.keyCode === 9) {
            e.preventDefault();
            e.target.parentNode.parentNode.parentNode.parentNode.focus();
          }
        });

        targetFocus.addEventListener('keydown', e => {
          if (e.shiftKey && e.keyCode === 9 && e.target.classList.contains('main-layer-popzone')) {
            e.preventDefault();
            targetPopupClose.focus();
          }
        });
      }

      let mainPopzone = new Swiper('.main-popzone', {
        slidesPerView: 2,
        spaceBetween: 25,
        centeredSlides: true,
        resistanceRatio: 0,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          //   disableOnInteraction: false,
        },
        pagination: {
          el: '.popzone-pagination',
          // clickable: true,
        },
        navigation: {
          nextEl: '.main-layer-popzone .popzone-button-next',
          prevEl: '.main-layer-popzone .popzone-button-prev',
        },
        a11y: {
          prevSlideMessage: '이전 슬라이드',
          nextSlideMessage: '다음 슬라이드',
          slideLabelMessage: '총 {{slidesLength}}번째 슬라이드 중 {{index}}번째 슬라이드',
        },
        breakpoints: {
          1024: {
            centeredSlides: false,
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },
        on: {
          init: function (ele) {
            const length = ele.el.querySelector('.swiper-wrapper').children.length;

            if (length > 0 && length <= 2) {
              ele.el.querySelector('.swiper-wrapper').classList.add('swiper-center');
            }
          },
        },
      });

      // 포커스
      mainPopzone.el.addEventListener('focusin', () => {
        mainPopzone.autoplay.stop();
      });

      mainPopzone.el.addEventListener('focusout', () => {
        const mode = document.querySelector('.popzon-button-play-pause');
        if (mode.classList.contains('active') === false) {
          mainPopzone.autoplay.start();
        }
      });

      btn.addEventListener('click', function () {
        if (mainPopzone.autoplay.running) {
          mainPopzone.autoplay.stop();
          //   swiperWrapper.setAttribute('aria-live', 'polite');
          this.setAttribute('aria-label', '슬라이드 재생');
          this.classList.add('active');
        } else {
          mainPopzone.autoplay.start();
          //   swiperWrapper.setAttribute('aria-live', 'off');
          this.setAttribute('aria-label', '슬라이드 정지');
          this.classList.remove('active');
        }
      });

      mainUI.popZoneClose();
    },
    popZoneClose() {
      const btn = document.querySelector('.btn-pozone-close');
      const popup = document.querySelector('.main-layer-popzone');
      const closeCheck = document.querySelectorAll('.bot input[type=checkbox]');
      const focusTarget = document.querySelector('.accessibility');

      btn.addEventListener('click', () => {
        if (btn.dataset.close === 'oneday') {
          mainUI.mainPopupSetCookie('oneday', 'done', 1);
        } else if (btn.dataset.close === 'week') {
          mainUI.mainPopupSetCookie('week', 'done', 7);
        }

        popup.classList.remove('open');
        focusTarget.setAttribute('tabindex', '0');
        focusTarget.focus();
      });

      closeCheck.forEach(ele => {
        ele.addEventListener('change', e => {
          const checkbox = UI.GetAllSiblings(ele.parentNode);
          checkbox[0].children[0].checked = false;

          if (e.target.checked === false && checkbox[0].children[0].checked === false) {
            btn.dataset.close = '';
            return false;
          }

          if (e.target.value === 'oneday') {
            btn.dataset.close = 'oneday';
          } else {
            btn.dataset.close = 'week';
          }
        });
      });
    },
    popupGetCookie(name) {
      let nameOfCookie = name + '=';
      let x = 0;
      while (x <= document.cookie.length) {
        let y = x + nameOfCookie.length;
        if (document.cookie.substring(x, y) == nameOfCookie) {
          if ((endOfCookie = document.cookie.indexOf(';', y)) == -1) endOfCookie = document.cookie.length;
          return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(' ', x) + 1;
        if (x == 0) break;
      }
      return '';
    },
    mainPopupSetCookie(name, value, expiredays) {
      let todayDate = new Date();
      todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
      if (todayDate > new Date()) {
        expiredays = expiredays - 1;
      }
      todayDate.setDate(todayDate.getDate() + expiredays);
      document.cookie = name + '=' + escape(value) + '; path=/; expires=' + todayDate.toGMTString() + ';';
    },
  };
})();
