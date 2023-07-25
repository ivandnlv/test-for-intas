import { Data, ITest } from './types/index';

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

const renderTest = () => {};

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
