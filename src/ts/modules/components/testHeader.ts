import { test, onFormClose, testStopped, onTimerStart, timer, changeIsMobile } from '../app';

// Адаптивность для хэдера

window.addEventListener('resize', () => {
  const targetElement = document.body;

  const newWidth = targetElement.clientWidth;
  const mobileWidth = 560;

  const closeTextContent = 'Выход';
  const resetTextContent = 'Сбросить все ответы';

  const resestEl = targetElement.querySelector('#resetTest');
  const closeEl = targetElement.querySelector('#testClose');

  if (newWidth <= mobileWidth) {
    changeIsMobile(true);
    if (resestEl && closeEl) {
      resestEl.innerHTML = `<i class="fa-solid fa-ban fa-xl"></i>`;
      closeEl.innerHTML = `<i class="fa-solid fa-square-xmark fa-xl"></i>`;
    }
  } else {
    changeIsMobile(false);
    if (resestEl && closeEl) {
      resestEl.innerHTML = '';
      closeEl.innerHTML = '';
      resestEl.textContent = resetTextContent;
      closeEl.textContent = closeTextContent;
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
    testClose.id = 'testClose';
    testClose.textContent = 'Выход';
    testClose.addEventListener('click', () => {
      onFormClose();
    });

    const testCloseMobile = document.createElement('span');
    testCloseMobile.classList.add('main__header-subtitle', '_hidden');
    testCloseMobile.id = 'testClose';
    testCloseMobile.textContent = 'Выход';
    testCloseMobile.addEventListener('click', () => {
      onFormClose();
    });

    const testTitle = document.createElement('h1');
    testTitle.classList.add('main__header-title');
    testTitle.textContent = test.item.name ?? 'Тест';

    const testFuncWrapper = document.createElement('div');
    testFuncWrapper.classList.add('main__header-func');

    const testResetBtn = document.createElement('span');
    testResetBtn.textContent = 'Сбросить все ответы';
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
