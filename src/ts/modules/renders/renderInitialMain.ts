import { mainEl } from '../../index';
import { clearTitles, changeTestData, changeTestStopped, changeTimer } from '../app';

export const renderInitialMain = () => {
  changeTimer('00:00:00');
  changeTestStopped(true);
  changeTestData(null);
  clearTitles();
  if (mainEl) {
    mainEl.innerHTML = '';
    mainEl.innerHTML = `
            <div class="main__wrapper main-initial">
              <span class="main__intital-text">Выберите тест из списка</span>
            </div>
    `;
  }
};
