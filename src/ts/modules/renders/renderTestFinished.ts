import { mainEl } from '../..';
import { createTestHeader } from '../components';
import { renderInitialMain, renderModal } from './';
import { changeTestStopped, testData, clearTestData } from '../app';

function onResetClick() {
  renderModal({
    title: 'Сбросить ответы',
    subtitle: 'Вы уверены что хотите сбросить ответы?',
    btnText: 'Сбросить',
    btnMethod: clearTestData,
  });
}

export function renderTestFinished() {
  changeTestStopped(true);
  if (testData) {
    const mainFinishedContentEl = document.createElement('div');
    mainFinishedContentEl.classList.add('main-finished__content');

    const completedQuestionsCount = testData.filter(
      (question) => question.questionValue && question.questionValue.length,
    ).length;
    const allQuestionsCount = testData.length;

    const mainFinishedEl = document.createElement('div');
    mainFinishedEl.classList.add('main__wrapper', 'main-finished');

    const mainFinishedHeader = createTestHeader();

    const testResetBtn = mainFinishedHeader.querySelector('#resetTest');
    if (testResetBtn) {
      testResetBtn.addEventListener('click', onResetClick);
    }

    const testCounter = mainFinishedHeader.querySelector('#testCounter');
    if (testCounter) {
      testCounter.textContent = `${
        completedQuestionsCount < 10
          ? '0' + completedQuestionsCount.toString()
          : completedQuestionsCount
      }/${allQuestionsCount < 10 ? '0' + allQuestionsCount.toString() : allQuestionsCount}`;
    }

    const dividerEl = document.createElement('div');
    dividerEl.classList.add('divider');

    mainFinishedEl.append(mainFinishedHeader, dividerEl);

    const mainFinishedContentTopEl = document.createElement('div');
    mainFinishedContentTopEl.classList.add('main-finished__content-top');
    mainFinishedContentTopEl.innerHTML = `
      <h2>Тест завершен</h2>
      <p>Вы ответили на ${completedQuestionsCount} из ${allQuestionsCount} вопросов.</p>
    `;
    const mainFinishedContentTitleEl = document.createElement('span');
    mainFinishedContentTitleEl.classList.add('main-finished__content-title');
    mainFinishedContentTitleEl.textContent = 'Ваши ответы';

    const mainFinishedListEl = document.createElement('ol');
    mainFinishedListEl.classList.add('main-finished__list');

    testData.forEach((question, i) => {
      const mainFinishedListItemEl = document.createElement('li');
      mainFinishedListItemEl.classList.add('main-finished__list-item');
      mainFinishedListItemEl.innerHTML = `
        <span class="main-finished__list-item-title">${i + 1}. ${question.questionText}</span>
        <div class="main-finished__list-item-answers">
            <span>Правильный ответ: ${question.questionTrueValue}</span>
            <span>Вы ответили: ${
              question.questionValue && question.questionValue.length
                ? question.questionValue
                : 'не ответили'
            }</span>
        </div>
      `;
      mainFinishedListEl.append(mainFinishedListItemEl);
    });

    mainFinishedContentEl.append(
      mainFinishedContentTopEl,
      mainFinishedContentTitleEl,
      mainFinishedListEl,
    );

    const dividerEl2 = document.createElement('div');
    dividerEl2.classList.add('divider');

    mainFinishedEl.append(mainFinishedContentEl, dividerEl2);

    const repeatBtn = document.createElement('button');
    repeatBtn.classList.add('btn', 'red', 'outlined', 'main-finished__btn');
    repeatBtn.textContent = 'Пройти тест еще раз';
    repeatBtn.addEventListener('click', onResetClick);

    mainFinishedEl.append(repeatBtn);

    if (mainEl) {
      mainEl.innerHTML = '';
      mainEl.append(mainFinishedEl);
    }
  } else {
    renderInitialMain();
  }
}
