import { Data, ITest, IQuestion } from './types/index';

const url = 'https://64bf6c1e5ee688b6250d63ba.mockapi.io/tests/items';

let data: Data | null = null;
let testNames: string[] | null = null;
let test: ITest | null = null;

const fetchAllData = async () => {
  try {
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

const fetchTestById = async (id: number) => {
  try {
    const item: ITest = await fetch(`${url}/${id}`).then((item) => item.json());

    if (item) {
      test = item;
    }
  } catch (error) {
    console.log('Произошла ошибка!', error);
  }
};

window.addEventListener('DOMContentLoaded', fetchAllData);

const renderTitles = () => {
  const titlesContainer = document.querySelector('.aside__list');
  testNames.forEach((name, i) => {
    const title = document.createElement('li');
    title.classList.add('aside__list-item');
    title.dataset.id = data[i].id;
    title.textContent = name;
    titlesContainer.append(title);
    if (i === testNames.length - 1) addListenersToTitles();
  });
};

const renderTest = () => {
  const test = document.createElement('div');
};

const addListenersToTitles = () => {
  const titleElements = document.querySelectorAll('.aside__list-item');
  titleElements.forEach((title) => {
    title.addEventListener('click', () => {
      titleElements.forEach((otherTitle) => {
        otherTitle.classList.remove('_active');
      });
      title.classList.add('_active');
    });
  });
};

const renderQuestion = (question: IQuestion): HTMLDivElement => {
  const questionContainer = document.createElement('div');
  questionContainer.classList.add('main-started__form-question');
  questionContainer.innerHTML = `
                 <div class="main-started__form-question__title">${question.text}</div>
                <div class="main-started__form-question__wrapper">
                  
               </div>
  `;
  const wrapper = questionContainer.querySelector('.main-started__form-question__wrapper');
  question.variants.forEach((answer, i) => {
    const variant = document.createElement('div');
    variant.classList.add('.main-started__form-question__answer');
    variant.innerHTML = `
      <input type="radio" value="${i}" name="question" id="question${question.id}answer${i + 1}" />
      <label for="question${question.id}answer${i + 1}">${answer}</label>
    `;
    wrapper.append(variant);
  });
  return questionContainer;
};
