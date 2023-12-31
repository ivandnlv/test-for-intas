import { mainEl } from '../..';

function renderLoadingTitle() {
  const titlesContainer = document.querySelector('.aside__list');
  if (titlesContainer) {
    titlesContainer.innerHTML = `<p>Тесты загружаются...</p>`;
  }
}

function renderLoadingTestDescription() {
  const testEl = document.createElement('div');
  testEl.classList.add('main__wrapper');
  testEl.classList.add('main-selected');
  testEl.innerHTML = `
		<header class="main__header">
            <span class="main__header-subtitle">Описание</span>
        </header>
        <div class="divider main-selected__divider"></div>
        <div class="main-selected__test">
        	<p class="main-selected__test-description">
            	Загрузка теста...
            </p>
		    </div>
	`;
  if (mainEl) {
    mainEl.innerHTML = '';
    mainEl.appendChild(testEl);
  }
}

function renderLoadingTestFinished() {
  const testFinished = document.createElement('div');
  testFinished.classList.add('main__wrapper');
  testFinished.classList.add('main-finished');
  testFinished.innerHTML = `

    <header class="main__header">
      <h1 class="main__header-title">Загрузка...</h1>
    </header>
    <div class="divider"></div>
    <div class="main-finished__content">
      <div class="main-finished__content-top">
        <h2>Загрузка результатов...</h2>
      </div>
    </div>
  `;
  if (mainEl) {
    mainEl.innerHTML = '';
    mainEl.appendChild(testFinished);
  }
}

export { renderLoadingTestDescription, renderLoadingTestFinished, renderLoadingTitle };
