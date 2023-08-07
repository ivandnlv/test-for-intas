import { mobileWidth, test, testData, onFormClose, testStopped, onTimerStart, timer } from '../app';
import { renderInitialMain } from '../renders';

// Адаптивность для хэдера

const resetTextContent = 'Сбросить все ответы';

const resetElIcon = '<i class="fa-solid fa-ban fa-xl"></i>';
const closeElIcon = '<i class="fa-solid fa-square-xmark fa-xl"></i>';

const startHeaderClientWidth = document.body.clientWidth;

const changeResetEl = (width: number, resetEl: HTMLSpanElement) => {
  if (width <= mobileWidth) {
    if (resetEl) {
      resetEl.innerHTML = resetElIcon;
    }
  } else {
    if (resetEl) {
      resetEl.innerHTML = '';
      resetEl.textContent = resetTextContent;
    }
  }
};

window.addEventListener('resize', () => {
  const targetElement = document.body;

  const newWidth = targetElement.clientWidth;

  const resetEl = targetElement.querySelector('#resetTest') as HTMLSpanElement;

  if (resetEl) {
    changeResetEl(newWidth, resetEl);
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
    if (!testData) {
      testClose.addEventListener('click', () => {
        onFormClose();
      });
    } else {
      testClose.addEventListener('click', renderInitialMain);
    }

    const testCloseMobile = document.createElement('span');
    testCloseMobile.classList.add('main__header-subtitle', '_hidden');
    testCloseMobile.id = 'testClose';
    testCloseMobile.innerHTML = closeElIcon;
    if (!testData) {
      testCloseMobile.addEventListener('click', () => {
        onFormClose();
      });
    } else {
      testCloseMobile.addEventListener('click', renderInitialMain);
    }

    const testTitle = document.createElement('h1');
    testTitle.classList.add('main__header-title');
    testTitle.textContent = test.item.name ?? 'Тест';

    const testFuncWrapper = document.createElement('div');
    testFuncWrapper.classList.add('main__header-func');

    const testResetBtn = document.createElement('span');
    testResetBtn.classList.add('main__header-subtitle');
    testResetBtn.id = 'resetTest';

    changeResetEl(startHeaderClientWidth, testResetBtn);

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
