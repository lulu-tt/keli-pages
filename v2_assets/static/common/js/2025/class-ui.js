/**
 * ui.js
 *
 * Common Component UI Script
 */
var UI = (function () {
  window.addEventListener('DOMContentLoaded', e => {
    if (document.querySelector('#header').getAttribute('data-include')) {
      setTimeout(() => {
        UI.DeviceCheck();
        UI.MobileAllMenu();
        UI.MobileAllMenuClose();
        UI.DropBoxOutSideClick();
        UI.DropDown();
        UI.AllMenu();
        UI.Resize();
        UI.Lnb();
        UI.ListAccodian();
        UI.LayerPopupFocus();
        UI.SwiperTabMenu();
        console.log('Pub_Server');
      }, 650);
    } else {
      UI.DeviceCheck();
      UI.MobileAllMenu();
      UI.MobileAllMenuClose();
      UI.DropBoxOutSideClick();
      UI.DropDown();
      UI.AllMenu();
      UI.Resize();
      UI.Lnb();
      UI.ListAccodian();
      UI.LayerPopupFocus();
      UI.SwiperTabMenu();
    }
  });

  return {
    DeviceCheck() {
      if (window.matchMedia('(min-width: 1024px)').matches === false) {
        UI.MobileAllMenuInit();
      }
    },
    Lnb() {
      if (document.querySelector('.lnb-list')) {
        const lnbSubMenu = document.querySelectorAll('.lnb-list > li');
        let lnbIndex = null;

        lnbSubMenu.forEach((ele, index) => {
          if (ele.children.length >= 2) {
            ele.classList.add('ac');
            ele.children[0].classList.add('sub-mn');
            ele.children[0].classList.add('ac-trigger');
          }

          if (ele.children[0].classList.contains('active') && ele.children.length == 2) {
            // lnbIndex = index;
            ele.children[0].classList.remove('sub-mn');
            ele.children[0].classList.add('sub-mn-open');
          }
        });

        document.querySelectorAll('.lnb-list .ac').forEach((ele, index) => {
          if (ele.children[0].classList.contains('sub-mn-open')) {
            // console.log(index);
            lnbIndex = index;
          }
        });

        new Accordion(['.lnb-list'], {
          openOnInit: [lnbIndex],
          duration: 300,
          beforeOpen: function (currentElement) {
            currentElement.children[0].classList.add('active', 'sub-mn-open');
            currentElement.children[0].classList.remove('sub-mn');
          },
          beforeClose: function (currentElement) {
            currentElement.children[0].classList.remove('active');
            currentElement.children[0].classList.add('sub-mn');
          },
        });
      }
    },
    HandleClass(node, className, action = 'add') {
      node.classList[action](className);
    },
    GetAllSiblings(ele) {
      const siblings = [];
      let sibling = ele.parentNode.firstChild;

      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== ele) {
          // Check for element node and not the original element
          siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
      }
      return siblings;
    },
    childPopupOpen(parentPop, childPop) {
      const targetParentPop = document.querySelector(`#${parentPop}`);
      const targetChildPopup = document.querySelector(`#${childPop}`);
      const targetFocus = document.querySelector(`#${childPop} .pop-tit`);
      const targetPopupClose = document.querySelector(`#${childPop} .btn-pop-close`);

      targetParentPop.style.display = 'none';
      targetParentPop.classList.remove('open');
      targetChildPopup.classList.add('open');

      setTimeout(() => {
        targetFocus.focus();
        targetParentPop.removeAttribute('style');
      }, 50);

      targetPopupClose.addEventListener('keydown', e => {
        if (!e.shiftKey && e.keyCode === 9) {
          e.preventDefault();
          e.target.parentNode.children[0].focus();
        }
      });
      targetFocus.addEventListener('keydown', e => {
        if (e.shiftKey && e.keyCode === 9 && e.target.classList.contains('pop-tit')) {
          e.preventDefault();
          e.target.parentNode.lastElementChild.focus();
        }
      });
    },
    PopupOpen(popup) {
      // const targetBtn = document.querySelector(`[data-focus=${btn}]`);
      const targetPopup = document.querySelector(`#${popup}`);
      const targetPopupClose = document.querySelector(`#${popup} .btn-pop-close`);
      const targetFocus = document.querySelector(`#${popup} .pop-tit`);

      targetPopup.classList.add('open');
      setTimeout(() => {
        targetFocus.focus();
      }, 50);

      targetPopupClose.addEventListener('keydown', e => {
        if (!e.shiftKey && e.keyCode === 9) {
          e.preventDefault();
          e.target.parentNode.children[0].focus();
        }
      });
      // targetPopupClose.addEventListener('click', () => {
      //   targetPopup.classList.remove('open');
      //   targetBtn.focus();
      // });
      targetFocus.addEventListener('keydown', e => {
        if (e.shiftKey && e.keyCode === 9 && e.target.classList.contains('pop-tit')) {
          e.preventDefault();
          e.target.parentNode.lastElementChild.focus();
        }
      });
    },
    PopupClose(btn, popup) {
      const targetPopop = document.querySelector(`#${popup}`);
      const targetBtn = btn ? document.querySelector(`[data-focus=${btn}]`) : null;

      if (targetBtn) {
        targetBtn.focus();
      } else {
        // returnFocusBtn.focus();
      }

      targetPopop.classList.remove('open');
    },
    AllMenu() {
      const btn = document.querySelector('.btn-all-menu');

      btn.addEventListener('click', () => {
        document.querySelector('.mobile-all-memu').classList.add('open');
        btn.setAttribute('aria-label', '전체 메뉴 닫기');
        btn.setAttribute('aria-expanded', 'true');
      });
    },
    MobileAllMenu() {
      const menu = document.querySelectorAll('.all-menu > li > a');

      menu.forEach(ele => {
        ele.addEventListener('click', e => {
          const menuAllSiblings = UI.GetAllSiblings(ele.parentNode);
          menuAllSiblings.forEach(ele => {
            ele.children[0].classList.remove('active');
            ele.children[1].classList.remove('open');
          });

          ele.classList.add('active');
          ele.parentElement.children[1].classList.remove('open');
          ele.nextElementSibling.classList.add('open');
          e.preventDefault();
        });
      });

      UI.subDetpMenu();
    },
    subDetpMenu() {
      const subMenu = document.querySelectorAll('.mo-menu-list > li > a');
      const container = document.querySelectorAll('.accordion-mo');

      subMenu.forEach(ele => {
        const mn = ele.parentNode;
        const mnLength = mn.children.length;
        if (mnLength < 2) {
          ele.classList.add('none');
        } else {
          ele.parentElement.classList.add('ac');
          ele.classList.add('ac-trigger');
        }

        // ele.addEventListener('click', e => {
        //   if (mnLength === 2) {
        //     if (ele.parentElement.classList.contains('active')) {
        //       ele.parentElement.classList.remove('active');
        //     } else {
        //       const menuAllSiblings = UI.GetAllSiblings(ele.parentNode);
        //       menuAllSiblings.forEach(ele => {
        //         ele.classList.remove('active');
        //       });
        //       ele.parentElement.classList.add('active');
        //     }
        //     e.preventDefault();
        //   }
        // });
      });

      container.forEach(ele => {
        new Accordion(ele, {
          duration: 300,
          beforeOpen: function (currentElement) {
            currentElement.classList.add('active');
          },
          beforeClose: function (currentElement) {
            currentElement.classList.remove('active');
          },
        });
      });
    },
    MobileAllMenuClose() {
      const closeBtn = document.querySelector('.mo-allmenu-close');
      const openBtn = document.querySelector('.btn-all-menu');

      closeBtn.addEventListener('click', () => {
        document.querySelector('.mobile-all-memu').classList.remove('open');
        openBtn.classList.remove('on');
        openBtn.setAttribute('aria-label', '전체 메뉴 열기');
        openBtn.setAttribute('aria-expanded', 'false');
      });
    },
    AllMenuInit() {
      const btn = document.querySelector('.btn-all-menu');
      btn.setAttribute('aria-label', '전체 메뉴 열기');
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('on');
    },
    DropDown() {
      const btn = document.querySelectorAll('.drop-box > button');

      btn.forEach(ele => {
        ele.addEventListener('click', () => {
          if (ele.parentNode.classList.contains('active')) {
            ele.parentNode.classList.remove('active');
            ele.parentNode.children[1].inert = true;
            ele.parentNode.children[1].setAttribute('aria-hidden', 'true');
            ele.parentNode.children[1].setAttribute('aria-expanded', 'fasle');
          } else {
            btn.forEach(ele => {
              ele.parentNode.classList.remove('active');
              ele.parentNode.children[1].inert = true;
              ele.parentNode.children[1].setAttribute('aria-hidden', 'true');
              ele.parentNode.children[1].setAttribute('aria-expanded', 'false');
            });
            ele.parentNode.classList.add('active');
            ele.parentNode.children[1].inert = false;
            ele.parentNode.children[1].setAttribute('aria-hidden', 'false');
            ele.parentNode.children[1].setAttribute('aria-expanded', 'true');
          }
        });
      });
    },
    Dropbox() {
      const dropBox = document.querySelectorAll('.drop-box');
      const dropListAll = document.querySelectorAll('.drop-list');
      dropBox.forEach(ele => {
        const btn = ele.querySelector('.drop-box > button');
        const dropList = ele.querySelector('.drop-list');
        const originalHeight = dropList.offsetHeight;
        dropList.style.height = 0;

        btn.addEventListener('click', () => {
          if (btn.parentNode.classList.contains('active')) {
            btn.parentNode.classList.remove('active');
            dropList.inert = true;
            dropList.setAttribute('aria-hidden', 'true');
            dropList.setAttribute('aria-expanded', 'fasle');
            dropList.style.height = '0';
          } else {
            dropListAll.forEach(ele => {
              ele.parentNode.classList.remove('active');
              ele.style.height = '0';
            });
            btn.parentNode.classList.add('active');
            dropList.inert = false;
            dropList.setAttribute('aria-hidden', 'false');
            dropList.setAttribute('aria-expanded', 'true');
            dropList.style.height = originalHeight + 'px';
          }
        });
      });
    },
    DropBoxOutSideClick() {
      document.addEventListener('click', e => {
        const dropList = document.querySelectorAll('.drop-list');
        if (!e.target.closest('.active')) {
          dropList.forEach(ele => {
            ele.parentNode.classList.remove('active');
            ele.inert = true;
            ele.setAttribute('aria-hidden', 'true');
            ele.setAttribute('aria-expanded', 'fasle');
          });
        }
      });
    },
    MobileAllMenuInit() {
      const mobile = document.querySelector('.mobile-all-memu');

      if (mobile.classList.contains('open')) {
        mobile.classList.remove('open');
      }
    },
    Resize() {
      let resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {
          UI.DeviceCheck('delay');
        }, 50);
      });
    },
    ListAccodian() {
      const target = document.querySelector('.que-list');
      if (target) {
        new Accordion('.que-list');
      }
    },
    CurrentPage(num1, num2) {
      const lnb = document.querySelector('.lnb-list');
      lnb.children[num1 - 1].children[0].classList.add('active');

      if (num2) {
        lnb.children[num1 - 1].children[1].querySelector('ul').children[num2 - 1].children[0].classList.add('active');
      }
    },
    HideSwipe(ele) {
      ele.classList.add('hide');
    },
    LayerPopupFocus() {
      const btn = document.querySelectorAll('*[aria-haspopup="true"]');

      btn.forEach(ele => {
        ele.addEventListener('click', e => {
          returnFocusBtn = e.target;
        });
      });
    },
    SwiperTabMenu() {
      const swiper = new Swiper('.swipe-tab-menu', {
        slidesPerView: 'auto',
        spaceBetween: 12,
        freemode: true,
        on: {
          init: function () {
            const target = document.querySelectorAll('.swiper-slide');

            target.forEach((ele, index) => {
              if (ele.querySelector('.active')) {
                this.slideTo(index, 500);
              }
            });
          },
        },
        a11y: {
          prevSlideMessage: '이전 슬라이드',
          nextSlideMessage: '다음 슬라이드',
          slideLabelMessage: '총 {{slidesLength}}번째 슬라이드 중 {{index}}번째 슬라이드',
        },
        resistanceRatio: 0,
        navigation: {
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        },
      });
    },
    Meters() {
      const meters = document.querySelectorAll('svg[data-value] .meter');

      meters.forEach(path => {
        let length = path.getTotalLength();
        let value = parseInt(path.parentNode.getAttribute('data-value'));
        let to = length * ((100 - value) / 100);

        if (value === 0) {
          path.style.strokeWidth = 0;
        }

        path.getBoundingClientRect();
        path.style.strokeDashoffset = Math.max(0, to);
      });
    },
    onPrint(ele) {
      const html = document.querySelector('html');
      const printContents = document.querySelector(`#${ele} .popup-cont`).innerHTML;
      const printDiv = document.createElement('DIV');
      printDiv.className = 'print-div';

      html.appendChild(printDiv);
      printDiv.innerHTML = printContents;
      document.body.style.display = 'none';
      window.print();
      document.body.style.display = 'block';
      printDiv.style.display = 'none';
    },
  };
})();
