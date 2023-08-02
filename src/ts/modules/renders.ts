import { test, data, testNames, fetchTestById } from './getters';

const mainEl = document.querySelector('.main');

let timer = '00:00:00';

const onFormSubmit = (e: SubmitEvent, form: HTMLFormElement) => {
  e.preventDefault();
};

const onFormReset = (form: HTMLFormElement, formCount: HTMLSpanElement) => {
  form.reset();
  formCount.textContent = `0/${test.item.questions.length}`;
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
  const testEl = document.createElement('div');
  testEl.classList.add('main__wrapper', 'main-started');

  // Test Header

  const testHeader = document.createElement('header');
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

  testFuncWrapper.append(testResetBtn, testCounter, testTimer);
  testHeader.append(testClose, testTitle, testFuncWrapper);
  testEl.append(testHeader);

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
          <input type="radio" value="${i}" name="question${questionItem.id}" id=${id} required/>
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

const onTitleClick = (id: string) => {
  fetchTestById(id);
};

export { renderInitialMain, renderLoadingTitle, renderTest, renderTitles, renderTestDescription };
