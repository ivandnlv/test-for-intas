import { Data, ITest, IQuestion } from './types/index';

import '../scss/index.scss';
import svgIcon from '../icons/bar.svg';

const url = 'https://64bf6c1e5ee688b6250d63ba.mockapi.io/tests/items';

const mainEl = document.querySelector('.main');

let data: Data | null = null;
let testNames: string[] | null = null;
let test: ITest | null = null;

const fetchAllData = async () => {
  try {
    renderLoadingTitle();
    const items: Data = await fetch(url).then((items) => items.json());

    if (items) {
      data = items;
      testNames = data.map((item) => item.item.name);
      renderTitles();
    }
  } catch (error) {
    console.log('Произошла ошибка: ', error);
  }
};

const fetchTestById = async (id: string) => {
  try {
    const item: ITest = await fetch(`${url}/${id}`).then((item) => {
      return item.json();
    });

    if (item) {
      test = item;
      console.log(test);
      renderTest();
    }
  } catch (error) {
    console.log('Произошла ошибка!', error);
  }
};

const renderLoadingTitle = () => {
  const titlesContainer = document.querySelector('.aside__list');
  titlesContainer.innerHTML = `<p>Тесты загружаются...</p>`;
};

const renderTitles = () => {
  const titlesContainer = document.querySelector('.aside__list');
  titlesContainer.innerHTML = '';
  testNames.forEach((name, i) => {
    const title = document.createElement('li');
    title.classList.add('aside__list-item');
    title.dataset.id = data[i].id;
    console.log(name);
    title.textContent = name;
    titlesContainer.append(title);
    if (i === testNames.length - 1) addListenersToTitles();
  });
};

const onFormSubmit = (e: SubmitEvent, form: HTMLFormElement) => {
  e.preventDefault();
};

const renderTest = () => {
  let testCount = 0;
  let timer = '00:00:00';

  const testEl = document.createElement('div');
  testEl.classList.add('main__wrapper', 'main-started');

  // Test Header

  const testHeader = document.createElement('header');
  testHeader.classList.add('main__header');

  const testClose = document.createElement('span');
  testClose.classList.add('main__header-subtitle');
  testClose.textContent = 'Выход';

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
  testCounter.textContent = testCount.toString();

  const testTimer = document.createElement('span');
  testTimer.classList.add('main__header-subtitle');
  testTimer.id = 'testTimer';
  testTimer.textContent = timer;

  testFuncWrapper.append(testResetBtn, testCounter, testTimer);
  testHeader.append(testClose, testTitle, testFuncWrapper);
  testEl.append(testHeader);

  // Test Form

  const formContainer = document.createElement('div');
  formContainer.classList.add('main-started__content');

  const testForm = document.createElement('form');
  testForm.action = '#';
  testForm.classList.add('main-started__form');

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
          <input type="radio" value="${i}" name="question${questionItem.id}" id=${id} required/>
          <label for=${id}>${variant}</label>
        `;
        questionItemWrapperEl.append(variantEl);
      });
      questionItemEl.innerHTML = `
       <legend class="main-started__form-question__title">${questionItem.text}</legend>
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
  testForm.addEventListener('submit', (e) => onFormSubmit(e, testForm));
  formContainer.append(testForm);
  testEl.append(formContainer);

  mainEl.innerHTML = '';
  mainEl.append(testEl);
};

const renderInitialMain = () => {
  mainEl.innerHTML = '';
  mainEl.innerHTML = `
          <div class="main__wrapper main-initial">
            <span class="main__intital-text">Выберите тест из списка</span>
          </div>
        <div class="main__wrapper main-selected">
            <header class="main__header">
              <span class="main__header-subtitle">Описание</span>
            </header>
            <div class="divider main-selected__divider"></div>
            <div class="main-selected__test">
              <p class="main-selected__test-description">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos placeat quisquam
                consequatur repudiandae repellendus possimus, cupiditate molestias officia ab?
                Accusantium.
              </p>
              <div class="main-selected__test-btns">
                <button class="btn main-selected__test-btn">Начать</button>
                <button class="btn outlined main-selected__test-btn">Отмена</button>
              </div>
            </div>
          </div>
  `;
};

const addListenersToTitles = () => {
  const titleElements = document.querySelectorAll('.aside__list-item');
  titleElements.forEach((title: HTMLDivElement) => {
    title.addEventListener('click', () => {
      titleElements.forEach((otherTitle) => {
        otherTitle.classList.remove('_active');
      });
      title.classList.add('_active');
      onTitleClick(title.dataset.id);
    });
  });
};

const onTitleClick = (id: string) => {
  fetchTestById(id);
};

// const renderQuestion = (question: IQuestion): HTMLDivElement => {
//   const questionContainer = document.createElement('div');
//   questionContainer.classList.add('main-started__form-question');
//   questionContainer.innerHTML = `
//                  <div class="main-started__form-question__title">${question.text}</div>
//                 <div class="main-started__form-question__wrapper">

//                </div>
//   `;
//   const wrapper = questionContainer.querySelector('.main-started__form-question__wrapper');
//   question.variants.forEach((answer, i) => {
//     const variant = document.createElement('div');
//     variant.classList.add('.main-started__form-question__answer');
//     variant.innerHTML = `
//       <input type="radio" value="${i}" name="question" id="question${question.id}answer${i + 1}" />
//       <label for="question${question.id}answer${i + 1}">${answer}</label>
//     `;
//     wrapper.append(variant);
//   });
//   return questionContainer;
// };

window.addEventListener('DOMContentLoaded', renderInitialMain);

const asideEl = document.querySelector('.aside');
const asideBtnEl = document.querySelector('.aside__top-btn');
const asideTops = document.querySelectorAll('.aside__top');
asideBtnEl.addEventListener('click', () => {
  asideTops.forEach((asideTop, i) => {
    if (asideTop.classList.contains('_hidden')) {
      asideTop.classList.remove('_hidden');
      asideTop.classList.add('_opened');
    } else {
      asideTop.classList.remove('_opened');
      asideTop.classList.add('_hidden');
    }
  });
  asideEl.classList.toggle('_opened');
  fetchAllData();
});
