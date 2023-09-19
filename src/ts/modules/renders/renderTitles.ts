import { addListenersToTitles, testNames, data } from '../app';

export function renderTitles() {
  const titlesContainer = document.querySelector('.aside__list');
  if (titlesContainer && testNames) {
    titlesContainer.innerHTML = '';

    testNames.forEach((name, i) => {
      if (testNames && data) {
        const title = document.createElement('li');
        title.classList.add('aside__list-item');
        title.dataset.id = data[i].id;
        title.textContent = name;
        titlesContainer.appendChild(title);
        if (i === testNames.length - 1) addListenersToTitles();
      }
    });
  }
}
