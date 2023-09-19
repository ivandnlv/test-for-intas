interface IRenderModalOptions {
  title: string;
  subtitle: string;
  btnText: string;
  btnMethod: () => void;
}

export function renderModal({ title, subtitle, btnText, btnMethod }: IRenderModalOptions) {
  const modalEl = document.createElement('div');
  modalEl.classList.add('modal');
  modalEl.innerHTML = `
	<div class="modal__wrapper">
          <span class="modal__title">${title}</span>
          <p class="modal__description">${subtitle}</p>
          <div class="modal__btns">
            <button class="btn outlined red modal__btns-close">${btnText}</button>
            <button class="btn red modal__btns-cancel">Отмена</button>
          </div>
        </div>
	`;
  const closeBtnEl = modalEl.querySelector('.modal__btns-close');
  const cancelBtnEl = modalEl.querySelector('.modal__btns-cancel');

  if (closeBtnEl && modalEl) {
    closeBtnEl.addEventListener('click', () => {
      if (modalEl.parentNode) {
        modalEl.parentNode.removeChild(modalEl);
        btnMethod();
      }
    });
  }

  if (cancelBtnEl) {
    cancelBtnEl.addEventListener(
      'click',
      () => modalEl.parentNode && modalEl.parentNode.removeChild(modalEl),
    );
  }

  document.body.prepend(modalEl);
}
