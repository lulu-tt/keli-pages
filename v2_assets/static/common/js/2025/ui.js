/**
 * ui.js
 *
 * Common Component UI Script
 */
var UI = (function () {
  let returnFocusBtn = null;

  window.addEventListener('DOMContentLoaded', e => {
    if (document.querySelector('#header').getAttribute('data-include')) {
      setTimeout(() => {
        UI.DeviceCheck();
        //UI.setGnbHeight();
        UI.Gnb();
        UI.MobileAllMenu();
        UI.MobileAllMenuClose();
        UI.DropBoxOutSideClick();
        // UI.Dropbox();
        UI.DropDown();
        UI.AllMenu();
        UI.Resize();
        UI.Lnb();
        UI.ImgCapture();
        UI.MobileShare();
        UI.PagePrint();
        UI.UrlCopy();
        UI.ListAccodian();
        UI.LayerPopupFocus();
        UI.LoadPopupFocus();
        console.log('Pub_Server');
      }, 650);
    } else {
      UI.DeviceCheck();
      //UI.setGnbHeight();
      UI.Gnb();
      UI.MobileAllMenu();
      UI.MobileAllMenuClose();
      UI.DropBoxOutSideClick();
      // UI.Dropbox();
      UI.DropDown();
      UI.AllMenu();
      UI.Resize();
      UI.Lnb();
      UI.ImgCapture();
      UI.MobileShare();
      UI.PagePrint();
      UI.UrlCopy();
      UI.ListAccodian();
      UI.LayerPopupFocus();
      UI.LoadPopupFocus();
    }
  });

  return {
    DeviceCheck(delay) {
      const pc = document.querySelector('.pc-gnb');
      const mobile = document.querySelector('.mobile-all-memu');

      if (window.matchMedia('(min-width: 1024px)').matches) {
        // mobile.style.display = 'none';
        // pc.style.display = 'block';

        if (delay) {
          setTimeout(() => {
            UI.setGnbHeight();
          }, 50);
        } else {
          UI.setGnbHeight();
        }
      } else {
        // mobile.style.display = 'block';
        // pc.style.display = 'none';
        UI.MobileAllMenuInit();
        UI.RemoveGnbHeight();
      }
    },
    setGnbHeight() {
      let h = [];
      const depMenuHeight = document.querySelectorAll('.dep-menu');
      const gnbLayer = document.querySelector('.gnb-layer');

      setTimeout(() => {
        depMenuHeight.forEach(ele => {
          h.push(ele.offsetHeight);
        });
        depMenuHeight.forEach(ele => {
          ele.style.height = `${Math.max.apply(null, h) + 50}px`;
        });
        gnbLayer.style.height = `${Math.max.apply(null, h) + 50}px`;
      }, 100);
    },
    RemoveGnbHeight() {
      const depMenuHeight = document.querySelectorAll('.dep-menu');
      const gnbLayer = document.querySelector('.gnb-layer');

      depMenuHeight.forEach(ele => {
        ele.style.height = 'auto';
      });
      gnbLayer.style.height = 'auto';
    },
    Gnb() {
      const header = document.querySelector('#header');
      const gnbArea = document.querySelector('#header .btm');
      const gnbMenu = document.querySelectorAll('.gnb > li > a');
      const depth2 = document.querySelectorAll('.gnb > li > .dep-menu');
      const navLast = document.querySelector('.gnb').lastElementChild.children[1].lastElementChild.lastElementChild.children[0];

      depth2.forEach((ele, index) => {
        ele.style.left = `${index * (100 / depth2.length)}%`;
        ele.style.width = `${100 / depth2.length}%`;
      });

      gnbMenu.forEach(ele => {
        ele.addEventListener('mouseenter', () => {
          UI.GnbOpen(header);
        });
        ele.addEventListener('focus', () => {
          header.classList.add('open');
        });
      });

      gnbArea.addEventListener('mouseleave', () => {
        UI.GnbClose(header);
      });
      UI.A11yGnbHidden(navLast);
    },
    GnbOpen(hdr) {
      hdr.classList.add('open');
    },
    GnbClose(hdr) {
      UI.AllMenuInit();
      hdr.classList.remove('open');
    },
    A11yGnbHidden(navLast) {
      navLast.addEventListener('keydown', e => {
        const header = document.querySelector('#header');

        if ((e.which == 9) != e.shiftKey && e.which == 9) {
          header.classList.remove('open');
          UI.AllMenuInit();
        }
      });
    },
    Lnb() {
      if (document.querySelector('.lnb')) {
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
      const focusTarget = document.querySelector('.accessibility');

      if (targetBtn) {
        targetBtn.focus();
      } else {
        if (returnFocusBtn) {
          returnFocusBtn.focus();
        } else {
          focusTarget.setAttribute('tabindex', '0');
          focusTarget.focus();
        }
      }

      targetPopop.classList.remove('open');
    },
    AllMenu() {
      const btn = document.querySelector('.btn-all-menu');

      btn.addEventListener('click', () => {
        const ariaExp = btn.getAttribute('aria-expanded');
        const header = document.querySelector('#header');
        const navFirst = document.querySelector('.gnb').firstElementChild.children[0];

        if (window.matchMedia('(min-width: 1024px)').matches) {
          btn.classList.toggle('on');
          if (ariaExp === 'false') {
            btn.setAttribute('aria-label', '전체 메뉴 닫기');
            btn.setAttribute('aria-expanded', 'true');
            navFirst.focus();
            UI.GnbOpen(header);
          } else {
            UI.AllMenuInit();
            UI.GnbClose(header);
          }
        } else {
          document.querySelector('.mobile-all-memu').classList.add('open');
          btn.setAttribute('aria-label', '전체 메뉴 닫기');
          btn.setAttribute('aria-expanded', 'true');
        }
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
            ele.setAttribute('aria-expanded', 'fasle');
          } else {
            btn.forEach(ele => {
              ele.parentNode.classList.remove('active');
              ele.parentNode.children[1].inert = true;
              ele.parentNode.children[1].setAttribute('aria-hidden', 'true');
              ele.setAttribute('aria-expanded', 'false');
            });
            ele.parentNode.classList.add('active');
            ele.parentNode.children[1].inert = false;
            ele.parentNode.children[1].setAttribute('aria-hidden', 'false');
            ele.setAttribute('aria-expanded', 'true');
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
            dropList.style.height = '0';
          } else {
            dropListAll.forEach(ele => {
              ele.parentNode.classList.remove('active');
              ele.style.height = '0';
            });
            btn.parentNode.classList.add('active');
            dropList.inert = false;
            dropList.setAttribute('aria-hidden', 'false');
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
    MobileShare() {
      if (document.querySelector('.sns-wrap')) {
        const btn = document.querySelector('.btn-share');
        const snsList = document.querySelector('.btn-sns-fn');

        btn.addEventListener('click', () => {
          snsList.previousElementSibling.classList.toggle('open');
          if (snsList.previousElementSibling.getAttribute('aria-expanded') === 'false') {
            snsList.previousElementSibling.setAttribute('aria-expanded', 'true');
          } else {
            snsList.previousElementSibling.setAttribute('aria-expanded', 'false');
          }
        });
      }
    },
    Resize() {
      let resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {
          if (window.matchMedia('(min-width: 1024px)').matches) {
            UI.RemoveGnbHeight();
            UI.MobileAllMenuInit();
          } else {
          }
          UI.DeviceCheck('delay');
        }, 150);
      });
    },
    ImgCapture() {
      if (document.querySelector('.sns-wrap')) {
        const btn = document.querySelector('#btn-capture');
        const title = document.querySelector('.tit-sns > h2').textContent;

        btn.addEventListener('click', e => {
          html2canvas(document.querySelector('#content')).then(canvas => {
            const url_base64jp = canvas.toDataURL('image/jpg');
            // document.body.appendChild(canvas);
            const downloadLink = document.createElement('a');
            downloadLink.href = url_base64jp;
            downloadLink.download = `${title}.jpg`;
            downloadLink.click();
          });
          e.preventDefault();
        });
      }
    },
    PagePrint() {
      if (document.querySelector('.sns-wrap')) {
        const btn = document.querySelector('#btn-print');

        btn.addEventListener('click', () => {
          window.print();
        });
      }
    },
    UrlCopy() {
      if (document.querySelector('.sns-wrap')) {
        const btn = document.querySelector('#btn-url-copy');

        btn.addEventListener('click', () => {
          const url = window.location.href;
          const tempInput = document.createElement('textarea');
          tempInput.value = url;
          document.body.appendChild(tempInput);
          tempInput.select(); // 내용 선택
          document.execCommand('copy'); // 복사
          document.body.removeChild(tempInput);
          alert('URL이 복사되었습니다.');
        });
      }
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
    LoadPopupFocus() {
      const loadPopup = document.querySelector('.layer-popup-wrap.open');

      if (loadPopup) {
        loadPopup.querySelector('.pop-tit').focus();
        UI.PopupOpen(loadPopup.getAttribute('id'));
      }
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
