import { TestQuestion } from '../types';
import { test, data, testNames, fetchTestById } from './getters';

const mainEl = document.querySelector('.main');

let timer = '00:00:00';
let testStopped = true;

let testData: TestQuestion[] | null = null;

const onFormSubmit = (e: SubmitEvent, form: HTMLFormElement) => {
  e.preventDefault();

  let questionsArr: TestQuestion[] = [];
  if (test) {
    test.item.questions.forEach((question, i) => {
      questionsArr.push({
        questionText: question.text,
        questionTrueValue: question.variants[question.trueIndex],
        questionValue: question.variants[form.elements[`question${i + 1}`].value] ?? '',
      });
    });
  }

  localStorage.setItem(`${test.id}`, JSON.stringify({ questionsArr, timer }));
  testData = questionsArr;
  renderTestFinished();
};

const onFormReset = (form: HTMLFormElement, formCount: HTMLSpanElement) => {
  form.reset();
  formCount.textContent = `0/${test.item.questions.length}`;
};

const onTimerStart = (timerElem: HTMLSpanElement) => {
  const timerArr = timer.split(':');
  const seconds = timerArr[2];
  const minutes = timerArr[1];
  const hours = timerArr[0];
  if (Number(seconds) < 60) {
    timerArr[2] = Number(seconds) < 9 ? `0${Number(seconds) + 1}` : `${Number(seconds) + 1}`;
  } else if (Number(minutes) < 60) {
    timerArr[2] = '00';
    timerArr[1] = Number(minutes) < 9 ? `0${Number(minutes) + 1}` : `${Number(minutes) + 1}`;
  } else {
    timerArr[0] = Number(minutes) < 9 ? `0${Number(hours) + 1}` : `${Number(hours) + 1}`;
  }

  timer = timerArr.join(':');

  timerElem.textContent = timer;
};

const onFormChange = (form: HTMLFormElement, formCount: HTMLSpanElement) => {
  let formValues: string[] = [];
  if (test) {
    test.item.questions.forEach((_, i) => {
      if (form.elements[`question${i + 1}`].value) {
        formValues.push(form.elements[`question${i + 1}`].value);
      }
    });
  }
  formCount.textContent = `${formValues.length}/${test.item.questions.length}`;
};

const onFormClose = () => {
  renderModal('Вы уверены что хотите выйти?', 'Все результаты будут сброшены');
};

const clearTestData = () => {
  if (testData) {
    localStorage.removeItem(`${test.id}`);
    testData = null;
    timer = '00:00:00';
    renderTest();
  }
};

const renderTestFinished = () => {
  testStopped = true;
  if (testData) {
    const mainFinishedContentEl = document.createElement('div');
    mainFinishedContentEl.classList.add('main-finished__content');

    const completedQuestionsCount = testData.filter(
      (question) => question.questionValue.length,
    ).length;
    const allQuestionsCount = testData.length;

    const mainFinishedEl = document.createElement('div');
    mainFinishedEl.classList.add('main__wrapper', 'main-finished');

    const mainFinishedHeader = createTestHeader();

    const closeBtn = mainFinishedHeader.querySelector('#testClose');
    closeBtn.addEventListener('click', renderInitialMain);

    const testCounter = mainFinishedHeader.querySelector('#testCounter');
    testCounter.textContent = `${
      completedQuestionsCount < 10
        ? '0' + completedQuestionsCount.toString()
        : completedQuestionsCount
    }/${allQuestionsCount < 10 ? '0' + allQuestionsCount.toString() : allQuestionsCount}`;

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
              question.questionValue.length ? question.questionValue : 'не ответили'
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
    repeatBtn.addEventListener('click', clearTestData);

    mainFinishedEl.append(repeatBtn);

    mainEl.innerHTML = '';
    mainEl.append(mainFinishedEl);
  } else {
    renderInitialMain();
  }
};

const createTestHeader = (): HTMLDivElement => {
  // Test Header

  const testHeader = document.createElement('div');
  testHeader.classList.add('main__header');

  const testClose = document.createElement('span');
  testClose.classList.add('main__header-subtitle');
  testClose.id = 'testClose';
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

  testFuncWrapper.append(testResetBtn, testCounter, testTimer);
  testHeader.append(testClose, testTitle, testFuncWrapper);

  return testHeader;
};

const renderModal = (title: string, subtitle: string) => {
  const modalEl = document.createElement('div');
  modalEl.classList.add('modal');
  modalEl.innerHTML = `
	<div class="modal__wrapper">
          <span class="modal__title">${title}</span>
          <p class="modal__description">${subtitle}</p>
          <div class="modal__btns">
            <button class="btn outlined red modal__btns-close">Выход</button>
            <button class="btn red modal__btns-cancel">Отмена</button>
          </div>
        </div>
	`;
  const closeBtnEl = modalEl.querySelector('.modal__btns-close');
  const cancelBtnEl = modalEl.querySelector('.modal__btns-cancel');

  closeBtnEl.addEventListener('click', () => {
    modalEl.parentNode.removeChild(modalEl);
    renderInitialMain();
  });

  cancelBtnEl.addEventListener('click', () => modalEl.parentNode.removeChild(modalEl));

  document.body.prepend(modalEl);
};

const renderTestDescription = () => {
  timer = '00:00:00';
  testStopped = true;
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

  testContainerEl.append(btnsContainerEl);

  mainEl.innerHTML = '';
  mainEl.append(testEl);
};

const renderTest = () => {
  timer = '00:00:00';
  testStopped = false;
  const testEl = document.createElement('div');
  testEl.classList.add('main__wrapper', 'main-started');
  const testHeader = createTestHeader();

  testEl.append(testHeader);

  const testClose = testHeader.querySelector('#testClose');
  const testResetBtn = testHeader.querySelector('#resetTest');
  const testCounter = testHeader.querySelector('#testCounter') as HTMLSpanElement;

  // Test Form

  const formContainer = document.createElement('div');
  formContainer.classList.add('main-started__content');

  const testForm = document.createElement('form');
  testForm.action = '#';
  testForm.classList.add('main-started__form');

  testClose.addEventListener('click', onFormClose);
  testResetBtn.addEventListener('click', () => onFormReset(testForm, testCounter));

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
          <input type="radio" value="${i}" name="question${questionItem.id}" id=${id}/>
          <label for=${id}>${variant}</label>
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

  mainEl.innerHTML = '';
  mainEl.append(testEl);
};

const renderInitialMain = () => {
  timer = '00:00:00';
  testStopped = true;
  testData = null;
  clearTitles();
  mainEl.innerHTML = '';
  mainEl.innerHTML = `
          <div class="main__wrapper main-initial">
            <span class="main__intital-text">Выберите тест из списка</span>
          </div>
  `;
};

const renderLoadingTitle = () => {
  const titlesContainer = document.querySelector('.aside__list');
  titlesContainer.innerHTML = `<p>Тесты загружаются...</p>`;
};

const renderLoadingTestDescription = () => {
  const testEl = document.createElement('div');
  testEl.classList.add('main__wrapper', 'main-selected');
  testEl.innerHTML = `
		<header class="main__header">
            <span class="main__header-subtitle">Описание</span>
        </header>
        <div class="divider main-selected__divider"></div>
        <div class="main-selected__test">
        	<p class="main-selected__test-description">
            	Загрузка теста...
            </p>
		    </div>
	`;
  mainEl.innerHTML = '';
  mainEl.append(testEl);
};

const renderLoadingTestFinished = () => {
  const testFinished = document.createElement('div');
  testFinished.classList.add('main__wrapper', 'main-finished');
  testFinished.innerHTML = `

  <header class="main__header">
            <h1 class="main__header-title">Загрузка...</h1>
          </header>
          <div class="divider"></div>
          <div class="main-finished__content">
            <div class="main-finished__content-top">
              <h2>Загрузка результатов...</h2>
            </div>
          </div>
  `;
  mainEl.innerHTML = '';
  mainEl.append(testFinished);
};

const renderTitles = () => {
  const titlesContainer = document.querySelector('.aside__list');
  titlesContainer.innerHTML = '';
  testNames.forEach((name, i) => {
    const title = document.createElement('li');
    title.classList.add('aside__list-item');
    title.dataset.id = data[i].id;
    title.textContent = name;
    titlesContainer.append(title);
    if (i === testNames.length - 1) addListenersToTitles();
  });
};

const clearTitles = () => {
  const titleElements = document.querySelectorAll('.aside__list-item');
  titleElements.forEach((title) => title.classList.remove('_active'));
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

const onTitleClick = async (id: string) => {
  const localTest = localStorage.getItem(`${id}`);
  if (localTest) {
    testData = JSON.parse(localTest).questionsArr;
    timer = JSON.parse(localTest).timer;
    renderLoadingTestFinished();
    await fetchTestById(id);
    renderTestFinished();
  } else {
    renderLoadingTestDescription();
    await fetchTestById(id);
    renderTestDescription();
  }
};

export { renderInitialMain, renderLoadingTitle, renderTest, renderTitles, renderTestDescription };
