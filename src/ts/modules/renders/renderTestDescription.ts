import { mainEl } from '../..';
import { changeTimer, changeTestStopped, test } from '../app';
import { renderTest, renderInitialMain } from './';

export function renderTestDescription() {
  changeTimer('00:00:00');
  changeTestStopped(true);
  if (test) {
    const testEl = document.createElement('div');
    testEl.classList.add('main__wrapper', 'main-selected');
    testEl.innerHTML = `
      <header class="main__header">
              <span class="main__header-subtitle">Описание</span>
          </header>
          <div class="divider main-selected__divider"></div>
          <div class="main-selected__test">
            <p class="main-selected__test-description">
                ${test.item.description}
              </p>
      </div>
    `;
    const testContainerEl = testEl.querySelector('.main-selected__test');
    const btnsContainerEl = document.createElement('div');
    btnsContainerEl.classList.add('main-selected__test-btns');
    const startBtnEl = document.createElement('button');
    startBtnEl.classList.add('btn', 'main-selected__test-btn');
    startBtnEl.textContent = 'Начать';
    const closeBtnEl = document.createElement('button');
    closeBtnEl.classList.add('btn', 'outlined', 'main-selected__test-btn');
    closeBtnEl.textContent = 'Отмена';

    startBtnEl.addEventListener('click', renderTest);
    closeBtnEl.addEventListener('click', renderInitialMain);

    btnsContainerEl.append(startBtnEl, closeBtnEl);

    if (testContainerEl) testContainerEl.append(btnsContainerEl);

    if (mainEl) {
      mainEl.innerHTML = '';
      mainEl.append(testEl);
    }
  }
}
