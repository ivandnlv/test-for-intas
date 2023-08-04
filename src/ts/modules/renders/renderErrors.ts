export const renderErrorTitle = () => {
  const titlesContainer = document.querySelector('.aside__list');
  if (titlesContainer) {
    titlesContainer.innerHTML = `<p>Произошла ошибка при загрузке тестов, попробуйте перезагрузить страницу и проверьте, есть ли у вас доступ в интернет</p>`;
  }
};
