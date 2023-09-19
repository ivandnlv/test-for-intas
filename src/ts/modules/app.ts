import { asideChange } from '..';
import { ITestFormElements, TestQuestion } from '../types';
import { test, data, testNames, fetchTestById } from './queries';

import {
  renderLoadingTestDescription,
  renderLoadingTestFinished,
  renderTestFinished,
  renderTest,
  renderModal,
  renderTestDescription,
  renderInitialMain,
} from './renders';

const mobileWidth = 710;
const startWidth = document.body.clientWidth;

let testLoading = false;
let isMobile = false;

if (startWidth <= mobileWidth) {
  isMobile = true;
}

window.addEventListener('resize', () => {
  if (document.body.clientWidth <= mobileWidth) {
    isMobile = true;
  } else {
    isMobile = false;
  }
});

let timer = '00:00:00';
let testStopped = true;

let testData: TestQuestion[] | null = null;

function changeTimer(value: typeof timer) {
  timer = value;
}

function changeTestData(value: typeof testData) {
  testData = value;
}

function changeTestStopped(value: typeof testStopped) {
  testStopped = value;
}

function changeTestLoading(value: typeof testLoading) {
  testLoading = value;
}

function changeIsMobile(value: typeof isMobile) {
  isMobile = value;
}

function onFormSubmit(e: SubmitEvent, form: HTMLFormElement) {
  e.preventDefault();

  let questionsArr: TestQuestion[] = [];
  if (test) {
    test.item.questions.forEach((question, i) => {
      const key: keyof ITestFormElements = `question${i + 1}`;
      const formElements = form.elements as unknown as ITestFormElements;

      questionsArr.push({
        questionText: question.text,
        questionTrueValue: question.variants[question.trueIndex],
        // @ts-ignore
        questionValue: question.variants[formElements[key].value] ?? '',
      });
    });

    localStorage.setItem(`${test.id}`, JSON.stringify({ questionsArr, timer }));
    testData = questionsArr;
    renderTestFinished();
  }
}

function onFormReset(form: HTMLFormElement, formCount: HTMLSpanElement) {
  form.reset();
  if (test) {
    formCount.textContent = `0/${test.item.questions.length}`;
  }
}

function onTimerStart(timerElem: HTMLSpanElement) {
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
}

function onFormChange(form: HTMLFormElement, formCount: HTMLSpanElement) {
  let formValues: string[] = [];
  if (test) {
    test.item.questions.forEach((_, i) => {
      const key = `question${i + 1}`;
      //@ts-ignore
      if (form.elements[key].value) {
        //@ts-ignore
        formValues.push(form.elements[key].value);
      }
    });
    formCount.textContent = `${formValues.length}/${test.item.questions.length}`;
  }
}

function onFormClose() {
  renderModal({
    title: 'Вы уверены что хотите выйти',
    subtitle: 'Все результаты будут сброшены',
    btnText: 'Выход',
    btnMethod: renderInitialMain,
  });
}

function clearTestData() {
  if (testData && test) {
    localStorage.removeItem(`${test.id}`);
    testData = null;
    timer = '00:00:00';
    renderTest();
  }
}

export function clearTitles() {
  const titleElements = document.querySelectorAll('.aside__list-item');
  if (titleElements) {
    titleElements.forEach((title) => title.classList.remove('_active'));
  }
}

function addListenersToTitles() {
  const titleElements: NodeListOf<HTMLDivElement> = document.querySelectorAll('.aside__list-item');
  if (titleElements) {
    titleElements.forEach((title: HTMLDivElement) => {
      title.addEventListener('click', () => {
        titleElements.forEach((otherTitle) => {
          otherTitle.classList.remove('_active');
        });
        title.classList.add('_active');

        if (title.dataset.id) onTitleClick(title.dataset.id);
      });
    });
  }
}

async function onTitleClick(id: string) {
  if (!testLoading) {
    if (isMobile) asideChange();
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
  }
}

export {
  mobileWidth,
  isMobile,
  testData,
  testNames,
  data,
  test,
  testStopped,
  timer,
  addListenersToTitles,
  clearTestData,
  changeTestLoading,
  changeIsMobile,
  changeTestData,
  changeTestStopped,
  changeTimer,
  onFormChange,
  onFormClose,
  onFormReset,
  onFormSubmit,
  onTimerStart,
};
