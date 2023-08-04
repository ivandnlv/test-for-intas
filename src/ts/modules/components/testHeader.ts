import { test, onFormClose, testStopped, onTimerStart, timer, changeIsMobile } from '../app';

// Адаптивность для хэдера

const startHeaderClientWidth = document.body.clientWidth;
const mobileWidth = 710;

const resetTextContent = 'Сбросить все ответы';

const resetElIcon = '<i class="fa-solid fa-ban fa-xl"></i>';
const closeElIcon = '<i class="fa-solid fa-square-xmark fa-xl"></i>';

window.addEventListener('resize', () => {
  const targetElement = document.body;

  const newWidth = targetElement.clientWidth;

  const resestEl = targetElement.querySelector('#resetTest');

  if (newWidth <= mobileWidth) {
    changeIsMobile(true);
    if (resestEl) {
      resestEl.innerHTML = resetElIcon;
    }
  } else {
    changeIsMobile(false);
    if (resestEl) {
      resestEl.innerHTML = '';
      resestEl.textContent = resetTextContent;
    }
  }
});

export const createTestHeader = (): HTMLDivElement => {
  // Test Header
  const testHeader = document.createElement('div');
  testHeader.classList.add('main__header');

  if (test) {
    const testClose = document.createElement('span');
    testClose.classList.add('main__header-subtitle');
    testClose.textContent = 'Выход';
    testClose.id = 'testClose';
    testClose.addEventListener('click', () => {
      onFormClose();
    });

    const testCloseMobile = document.createElement('span');
    testCloseMobile.classList.add('main__header-subtitle', '_hidden');
    testCloseMobile.id = 'testClose';
    testCloseMobile.innerHTML = closeElIcon;
    testCloseMobile.addEventListener('click', () => {
      onFormClose();
    });

    const testTitle = document.createElement('h1');
    testTitle.classList.add('main__header-title');
    testTitle.textContent = test.item.name ?? 'Тест';

    const testFuncWrapper = document.createElement('div');
    testFuncWrapper.classList.add('main__header-func');

    const testResetBtn = document.createElement('span');
    testResetBtn.classList.add('main__header-subtitle');
    testResetBtn.id = 'resetTest';

    const testCounter = document.createElement('span');
    testCounter.classList.add('main__header-subtitle');
    testCounter.id = 'testCounter';
    testCounter.textContent = `0/${test.item.questions.length}`;

    const testTimer = document.createElement('span');
    testTimer.classList.add('main__header-subtitle');
    testTimer.id = 'testTimer';
    testTimer.textContent = timer;

    if (startHeaderClientWidth >= mobileWidth) {
      testResetBtn.textContent = resetTextContent;
    } else {
      testResetBtn.innerHTML = resetElIcon;
    }

    if (!testStopped) {
      const timerStart = setInterval(() => {
        onTimerStart(testTimer);
        if (testStopped) {
          clearInterval(timerStart);
        }
      }, 1000);
    }

    testFuncWrapper.append(testCloseMobile, testResetBtn, testCounter, testTimer);
    testHeader.append(testClose, testTitle, testFuncWrapper);
  }

  return testHeader;
};
