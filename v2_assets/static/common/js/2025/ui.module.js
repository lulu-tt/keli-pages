/**
 * ui.module.js
 *
 * subPage Component Module UI Script
 */

// 검색 탭 메뉴
export function searchTabMenu() {
  const tab = document.querySelectorAll('.edu-search-tab button');

  tab.forEach(ele => {
    ele.addEventListener('click', () => {
      const panelId = ele.getAttribute('aria-controls');
      const btnSib = UI.GetAllSiblings(ele.parentNode);
      const panelSib = UI.GetAllSiblings(document.querySelector(`#${panelId}`));

      btnSib.forEach(ele => {
        ele.children[0].setAttribute('aria-selected', 'false');
        ele.querySelector('i').classList.remove('active');
      });

      panelSib.forEach(ele => {
        ele.classList.add('hidden');
      });

      ele.setAttribute('aria-selected', 'true');
      ele.children[0].classList.add('active');
      document.querySelector(`#${panelId}`).classList.remove('hidden');
    });
  });
}

// 게시물 목록 스타일 변경 버튼
export function boardStyleChange() {
  const btn = document.querySelectorAll('.list-mode > a');

  btn.forEach(ele => {
    ele.addEventListener('click', function (e) {
      const btnSib = UI.GetAllSiblings(ele);
      const btnDataSet = this.dataset.board;

      if (btnDataSet === 'grid-board') {
        document.querySelector('.edu-list-board').classList.remove('hidden');
        document.querySelector('.bull-list-board').classList.add('hidden');
      } else {
        document.querySelector('.edu-list-board').classList.add('hidden');
        document.querySelector('.bull-list-board').classList.remove('hidden');
      }
      btnSib.forEach(ele => {
        ele.classList.remove('active');
      });
      ele.classList.add('active');
      e.preventDefault();
    });
  });
}

// 상세 내용 레이어 활성화
export function MouseOverViewLayer(ele) {
  const targetMn = document.querySelectorAll('.t-a');
  const targetLayer = document.querySelectorAll('.detailView');
  const mouseOutTarget = document.querySelectorAll(`.${ele} > ul > li`);

  function closeViewLayer(e) {
    const target = document.querySelectorAll('.detailView');
    target.forEach(ele => {
      if (ele.classList.contains('open-l')) {
        ele.classList.remove('open-l');
      } else {
        ele.classList.remove('open-r');
      }
    });
  }

  function layerViewBox(e) {
    const targetParent = e.target.parentElement.nodeName === 'LI' ? e.target.parentElement : e.target.parentElement.parentElement.parentElement;
    const layerBox = targetParent.children[1];
    const menuWidth = targetParent.offsetWidth;
    const left = targetParent.offsetLeft;
    const screenWidth = document.querySelector('#content').offsetWidth;

    targetLayer.forEach(ele => {
      if (ele.classList.contains('open-l')) {
        ele.classList.remove('open-l');
      } else {
        ele.classList.remove('open-r');
      }
    });

    if (left + menuWidth > screenWidth) {
      layerBox.classList.add('open-r');
    } else {
      layerBox.classList.add('open-l');
    }
  }

  function checkDevice() {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      // PC 환경에서 이벤트 추가
      targetMn.forEach(ele => {
        ele.addEventListener('mouseenter', layerViewBox);
      });
      mouseOutTarget.forEach(ele => {
        ele.addEventListener('mouseleave', closeViewLayer);
      });
    } else {
      // 모바일 환경에서 이벤트 제거
      targetMn.forEach(ele => {
        ele.removeEventListener('mouseenter', layerViewBox);
      });
      mouseOutTarget.forEach(ele => {
        ele.removeEventListener('mouseleave', closeViewLayer);
      });
    }
  }

  checkDevice();

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        checkDevice();
      } else {
        checkDevice();
      }
    }, 50);
  });
}

// 게시판 상세페이지 swiper
export function viewPageSwiper(ele) {
  new Swiper(`.${ele} .swiper`, {
    slidesPerView: 1,
    spaceBetween: 30,
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드',
      slideLabelMessage: '총 {{slidesLength}}번째 슬라이드 중 {{index}}번째 슬라이드',
    },
    navigation: {
      nextEl: `.${ele} .btn-slide-next`,
      prevEl: `.${ele} .btn-slide-prev`,
    },
    breakpoints: {
      370: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  return Swiper;
}

// 주제별 자료 슬라이드 설정
export function cateDataSwiper(ele) {
  new Swiper(`.${ele} .swiper`, {
    slidesPerView: 1,
    spaceBetween: 30,
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드',
      slideLabelMessage: '총 {{slidesLength}}번째 슬라이드 중 {{index}}번째 슬라이드',
    },
    navigation: {
      nextEl: `.${ele} .btn-data-next`,
      prevEl: `.${ele} .btn-data-prev`,
    },
    breakpoints: {
      370: {
        slidesPerView: 1,
        spaceBetween: 4,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  return Swiper;
}
