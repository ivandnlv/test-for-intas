import { mainEl } from '../../index';
import { clearTitles, changeTestData, changeTestStopped, changeTimer } from '../app';

export const renderInitialMain = () => {
  changeTimer('00:00:00');
  changeTestStopped(true);
  changeTestData(null);
  clearTitles();
  const mainText = 'Выберите тест из списка';
  const mainDescription = 'Для этого кликните на меню в левом верхнем углу';
  if (mainEl) {
    mainEl.innerHTML = '';
    mainEl.innerHTML = `
            <div class="main__wrapper main-initial">
              <span class="main-intital__text">${mainText}</span>
              <p class="main-initial__descr">${mainDescription}</p>
            </div>
    `;
  }
};
