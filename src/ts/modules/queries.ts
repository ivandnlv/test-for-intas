import { renderTitles, renderLoadingTitle, renderErrorTitle } from './renders';
import { changeTestLoading } from './app';
import { Data, ITest } from '../types';

export let data: Data | null = null;
export let testNames: string[] | null = null;
export let test: ITest | null = null;

const URL = 'https://64bf6c1e5ee688b6250d63ba.mockapi.io/tests/items';

export async function fetchAllData() {
  try {
    renderLoadingTitle();
    changeTestLoading(true);
    const items: Data = await fetch(URL).then((items) => items.json());

    if (items) {
      data = items;
      testNames = data.map((item) => item.item.name);
      renderTitles();
    }
  } catch (error) {
    renderErrorTitle();
    console.log('Произошла ошибка: ', error);
  } finally {
    changeTestLoading(false);
  }
}

export async function fetchTestById(id: string) {
  try {
    const item: ITest = await fetch(`${URL}/${id}`).then((item) => {
      return item.json();
    });

    if (item) {
      test = item;
    }
  } catch (error) {
    console.log('Произошла ошибка!', error);
  }
}
