/**
 *
 */
/**
 * ui.js
 *
 * Common Component UI Script
 */
var UI = (function () {
  let returnFocusBtn = null;

  window.addEventListener('DOMContentLoaded', e => {

  });

  return {
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
        if (returnFocusBtn) {
          returnFocusBtn.focus();
        }
      }

      targetPopop.classList.remove('open');
    },
  };
})();
