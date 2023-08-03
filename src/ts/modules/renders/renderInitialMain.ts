import { TestQuestion } from '../../types';
import { clearTitles } from '../renders';

interface IRenderInitialMainOptions {
  timer: string;
  testStopped: boolean;
  testData: TestQuestion[] | null;
  mainEl: HTMLDivElement | null;
}

const renderInitialMain = ({ mainEl, testData, testStopped, timer }: IRenderInitialMainOptions) => {
  timer = '00:00:00';
  testStopped = true;
  testData = null;
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
