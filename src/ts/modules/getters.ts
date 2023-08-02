import { renderLoadingTitle, renderTestDescription, renderTitles } from './renders';
import { Data, ITest } from '../types';

export let data: Data | null = null;
export let testNames: string[] | null = null;
export let test: ITest | null = null;

const url = 'https://64bf6c1e5ee688b6250d63ba.mockapi.io/tests/items';

export const fetchAllData = async () => {
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

export const fetchTestById = async (id: string) => {
  try {
    const item: ITest = await fetch(`${url}/${id}`).then((item) => {
      return item.json();
    });

    if (item) {
      test = item;
      renderTestDescription();
    }
  } catch (error) {
    console.log('Произошла ошибка!', error);
  }
};
