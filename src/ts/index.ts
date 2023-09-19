import { renderInitialMain } from './modules/renders';
import { fetchAllData, testNames } from './modules/queries';

import '../scss/index.scss';

const mainEl = document.createElement('div');
mainEl.classList.add('main');

const wrapperEl = document.querySelector('.wrapper');

if (wrapperEl) wrapperEl.append(mainEl);

window.addEventListener('DOMContentLoaded', renderInitialMain);

const asideEl = document.querySelector('.aside');
const asideBtnsEl = document.querySelectorAll('.aside__top-btn');
const asideTops = document.querySelectorAll('.aside__top');

asideBtnsEl.forEach((btn) => {
  btn.addEventListener('click', () => {
    asideChange();
  });
});

function asideChange() {
  asideTops.forEach((asideTop) => {
    if (asideTop.classList.contains('_hidden')) {
      asideTop.classList.remove('_hidden');
      asideTop.classList.add('_opened');
    } else {
      asideTop.classList.remove('_opened');
      asideTop.classList.add('_hidden');
    }
  });
  if (asideEl) {
    asideEl.classList.toggle('_opened');
    if (!testNames) {
      fetchAllData();
    }
  }
}

export { asideChange, mainEl };
