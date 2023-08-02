import { renderInitialMain } from './modules/renders';
import { fetchAllData } from './modules/getters';
import { testNames } from './modules/getters';

import '../scss/index.scss';

window.addEventListener('DOMContentLoaded', renderInitialMain);

const asideEl = document.querySelector('.aside');
const asideBtnsEl = document.querySelectorAll('.aside__top-btn');
const asideBtnCloseEl = document.querySelector('.aside__top-btn-close');
const asideTops = document.querySelectorAll('.aside__top');
asideBtnsEl.forEach((btn) => {
  btn.addEventListener('click', () => {
    asideTops.forEach((asideTop) => {
      if (asideTop.classList.contains('_hidden')) {
        asideTop.classList.remove('_hidden');
        asideTop.classList.add('_opened');
      } else {
        asideTop.classList.remove('_opened');
        asideTop.classList.add('_hidden');
      }
    });
    asideEl.classList.toggle('_opened');
    if (!testNames) {
      fetchAllData();
    }
  });
});
