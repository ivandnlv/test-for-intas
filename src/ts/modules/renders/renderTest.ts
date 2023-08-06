import { mainEl } from '../../';
import {
  changeTestStopped,
  changeTimer,
  test,
  onFormReset,
  onFormSubmit,
  onFormChange,
} from '../app';
import { createTestHeader } from '../components';

const wrapperMaxHeight = 60;

export const renderTest = () => {
  // Функция проверки на то помещаются ли все варианты ответа в одну строку,
  // если нет, то добавляем flex-direction: 'column', если да то обратно 'row'

  const changeQuestionWrapperFlexDirection = () => {
    const questionItemEls: NodeListOf<HTMLDivElement> | null = document.querySelectorAll(
      '.main-started__form-question__wrapper',
    );

    if (questionItemEls) {
      questionItemEls.forEach((questionItemEl) => {
        if (questionItemEl) {
          questionItemEl.style.flexDirection = 'row';
          if (questionItemEl.clientHeight >= wrapperMaxHeight) {
            questionItemEl.style.flexDirection = 'column';
          } else {
            questionItemEl.style.flexDirection = 'row';
          }
        }
      });
    }
  };

  window.addEventListener('resize', changeQuestionWrapperFlexDirection);

  changeTimer('00:00:00');
  changeTestStopped(false);
  const testEl = document.createElement('div');
  testEl.classList.add('main__wrapper', 'main-started');
  const testHeader = createTestHeader();

  testEl.append(testHeader);

  const testResetBtn = testHeader.querySelector('#resetTest');
  const testCounter = testHeader.querySelector('#testCounter') as HTMLSpanElement;

  // Test Form
  const formContainer = document.createElement('div');
  formContainer.classList.add('main-started__content');

  const testForm = document.createElement('form');
  testForm.action = '#';
  testForm.classList.add('main-started__form');

  if (testResetBtn) {
    testResetBtn.addEventListener('click', () => onFormReset(testForm, testCounter));
  }

  if (test) {
    test.item.questions.forEach((questionItem) => {
      const questionItemEl = document.createElement('fieldset');
      questionItemEl.classList.add('main-started__form-question');
      const questionItemWrapperEl = document.createElement('div');
      questionItemWrapperEl.classList.add('main-started__form-question__wrapper');
      questionItem.variants.forEach((variant, i) => {
        const variantEl = document.createElement('div');
        variantEl.classList.add('main-started__form-question__answer');
        const id = `question${questionItem.id}answer${i + 1}`;
        variantEl.innerHTML = `
          <input type="radio" value="${i}" name="question${questionItem.id}" id="${id}" />
          <label for="${id}">${variant}</label>
        `;
        questionItemWrapperEl.append(variantEl);
      });
      questionItemEl.innerHTML = `
       <legend class="main-started__form-question__title">${questionItem.id}. ${questionItem.text}</legend>
      `;

      questionItemEl.append(questionItemWrapperEl);
      testForm.append(questionItemEl);
    });
  }
  const dividerEl = document.createElement('div');
  dividerEl.classList.add('divider');
  const btnEl = document.createElement('button');
  btnEl.classList.add('btn', 'outlined', 'red');
  btnEl.textContent = 'Завершить';
  testForm.append(dividerEl, btnEl);
  formContainer.append(testForm);
  testEl.append(formContainer);

  testForm.addEventListener('submit', (e) => onFormSubmit(e, testForm));
  testForm.addEventListener('change', () => onFormChange(testForm, testCounter));

  if (mainEl) {
    mainEl.innerHTML = '';
    mainEl.append(testEl);
  }

  changeQuestionWrapperFlexDirection();
};
