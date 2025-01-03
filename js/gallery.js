'use strict';

// Масив об'єктів, який містить дані про зображення.
// Кожен об'єкт представляє одне зображення і має три властивості
const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// Отримуємо посилання на елемент DOM із класом `.gallery`.
// Це контейнер, у якому будуть розміщені всі зображення.
const gallery = document.querySelector('.gallery');

// Додаємо створену розмітку до контейнера `.gallery` за допомогою `insertAdjacentHTML`.
// Другим аргументом викликаємо функцію `createMarkup` для створення HTML-розмітки з масиву `images`.
gallery.insertAdjacentHTML('beforeend', createMarkup(images));

// Функція, яка створює HTML-розмітку для кожного зображення у масиві.
function createMarkup(arr) {
  // Використовуємо метод `map`, щоб перетворити кожен об'єкт у масиві `arr` у рядок HTML.
  // Кожне зображення обгорнуте у <li> для списку
  // <a class="gallery-link"> - посилання на велике зображення
  // <img class="gallery-image">:
  // - src: URL для попереднього перегляду
  // - data-source: URL для великого зображення, збережений у data-атрибуті
  // - alt: опис зображення
  return arr
    .map(
      item => `
      <li class="gallery-item"> 
        <a class="gallery-link" href="${item.original}">
          <img class="gallery-image" src="${item.preview}" data-source="${item.original}" alt="${item.description}" />
        </a>
      </li>
      `
    )
    .join(''); // Об'єднуємо всі рядки в один рядок для вставки в DOM.
}

// Додаємо слухач подій до галереї, який викликається при кліку.
gallery.addEventListener('click', handleClick);

// Функція обробки кліків по галереї.
function handleClick(event) {
  event.preventDefault(); // Забороняємо стандартну поведінку браузера (перехід за посиланням).

  // Перевіряємо, якщо клік було зроблено не на зображенні, а десь на галереї
  // Припиняємо виконання функції (return), щоб запобігти відкриттю модального вікна.
  if (event.target === event.currentTarget) {
    return; // Якщо клацнули на фон галереї (поза картинкою), зупиняємо виконання.
  }

  // Отримуємо значення атрибута `data-source` з об'єкта `dataset` цільового елемента.
  const imageLink = event.target.dataset.source; // URL великого зображення.
  const imageAlt = event.target.alt; // Опис зображення.

  // Створюємо модальне вікно для перегляду великого зображення за допомогою бібліотеки `basicLightbox`.
  // - imageLink: велике зображення
  const instance = basicLightbox.create(`
      <div class="modal">
        <img src="${imageLink}" alt="${imageAlt}">
      </div>
      `);

  instance.show(); // Відображаємо модальне вікно.
}
