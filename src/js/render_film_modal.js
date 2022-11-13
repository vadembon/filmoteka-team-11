// import renderModal from '../templates/modal.hbs';
import FilmApiService from './movie_database_api';
import { refs } from './refs';
import renderFilmCart from '../templates/film_cart.hbs';
import Notiflix, { Notify } from 'notiflix';
import FilmApiService from './movie_database_api';
import { modalLanguage } from './languageSwitcher';
import {
  renderModal,
  queueString,
  watchedString,
  removeString,
} from './render_modal';
import { transformLibrary } from './render_modal';

const apiRequest = new FilmApiService();

refs.filmList.addEventListener('click', openModal);

function openModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  refs.addQueueBtn.addEventListener('click', onClickAddQueueBtn);
  refs.addWatchedBtn.addEventListener('click', onClickAddWatchedBtn);
  refs.closeModalBtn.addEventListener('click', closeModal);
  refs.backdrop.addEventListener('click', closeModal);
  refs.backdrop.classList.remove('visually-hidden');
  const queue = JSON.parse(localStorage.getItem('queue'));
  const watched = JSON.parse(localStorage.getItem('watched'));

  if (watched) {
    const her = JSON.parse(localStorage.getItem('watched'));
    if (her.map(el => el.id).includes(+evt.path[2].id)) {
      refs.addWatchedBtn.textContent = removeString;
      refs.addWatchedBtn.classList.add('button-remove');
    } else {
      refs.addWatchedBtn.textContent = watchedString;
      refs.addWatchedBtn.classList.remove('button-remove');
    }
  }

  if (queue) {
    const her = JSON.parse(localStorage.getItem('queue'));
    if (her.map(el => el.id).includes(+evt.path[2].id)) {
      refs.addQueueBtn.textContent = removeString;
      refs.addQueueBtn.classList.add('button-remove');
    } else {
      refs.addQueueBtn.textContent = queueString;
      refs.addQueueBtn.classList.remove('button-remove');
    }
  }
  apiRequest.language = localStorage.getItem('language');
  const details = apiRequest.fetchMoviesDetails(evt.path[2].id);
  details.then(res => {
    refs.backdrop.setAttribute(
      'style',
      `background-image: url("https://image.tmdb.org/t/p/original/${res.backdrop_path}"); background-size: cover; background-position: 50% 50%;`
    );
    console.log(res);
    renderModal(res);
    // modalLanguage();
  });
}

// function render(movie) {
//   console.log(movie);
//   localStorage.setItem('movie', JSON.stringify(movie));
//   const markup = renderModal(movie);
//   refs.modal.innerHTML = markup;
// }

function closeModal(evt) {
  if (!evt.target.classList.contains('backdrop')) {
    return;
  }
  refs.backdrop.classList.add('visually-hidden');
  refs.addQueueBtn.removeEventListener('click', onClickAddQueueBtn);
  refs.addWatchedBtn.removeEventListener('click', onClickAddWatchedBtn);
}

function onClickAddWatchedBtn(evt) {
  evt.preventDefault();
  const watched = JSON.parse(localStorage.getItem('watched'));
  const arrCardWatched = watched ? watched : [];
  const savedCardWatched = localStorage.getItem('movie');
  const parsedCardWatched = JSON.parse(savedCardWatched);

  if (refs.addWatchedBtn.textContent === removeString) {
    refs.addWatchedBtn.textContent = watchedString;
    const newArr = arrCardWatched.filter(el => el.id !== parsedCardWatched.id);
    localStorage.removeItem('watched');

    console.log('newArr', newArr);
    localStorage.setItem('watchedFilter', JSON.stringify(newArr));
    const parseFilter = JSON.parse(localStorage.getItem('watchedFilter'));
    localStorage.setItem('watched', JSON.stringify(parseFilter));
  } else {
    refs.addWatchedBtn.textContent = removeString;
    arrCardWatched.push(parsedCardWatched);
    // console.log('saved', parsedCardWatched.id);
    localStorage.setItem('watched', JSON.stringify(arrCardWatched));
  }
}

function onClickAddQueueBtn(evt) {
  evt.preventDefault();
  const queue = JSON.parse(localStorage.getItem('queue'));
  const arrCardQueue = queue ? queue : [];
  const savedCardQueue = localStorage.getItem('movie');
  const parsedCardQueue = JSON.parse(savedCardQueue);

  if (refs.addQueueBtn.textContent === removeString) {
    refs.addQueueBtn.textContent = queueString;
    const newArr = arrCardQueue.filter(el => el.id !== parsedCardQueue.id);
    localStorage.removeItem('queue');

    console.log('newArr', newArr);
    localStorage.setItem('queueFilter', JSON.stringify(newArr));
    const parseFilter = JSON.parse(localStorage.getItem('queueFilter'));
    localStorage.setItem('queue', JSON.stringify(parseFilter));
  } else {
    refs.addQueueBtn.textContent = removeString;
    arrCardQueue.push(parsedCardQueue);
    // console.log('saved', parsedCardQueue.id);
    localStorage.setItem('queue', JSON.stringify(arrCardQueue));

    // queue = JSON.parse(localStorage.getItem('queue'));
  }
}

export function onClickWatchedBtn(evt) {
  evt.preventDefault();
  renderLibrary('watched');
  Notiflix.Loading.remove();
}

export function onClickQueueBtn(evt) {
  evt.preventDefault();
  renderLibrary('queue');
  Notiflix.Loading.remove();
}

function renderLibrary(page) {
  Notiflix.Loading.standard();
  const lang = localStorage.getItem('language');
  const arrObj = JSON.parse(localStorage.getItem(page));
  const obj = transformLibrary(arrObj, lang);
  console.log(arrObj, obj);
  const markup = renderFilmCart(obj);
  refs.filmList.innerHTML = markup;
  Notiflix.Loading.remove();
}

// function transformLibrary(object, lang) {
//   // console.log('transform', arrObj);
//   if (lang === 'en-US') {
//     object.map(object => {
//       let i = 0;
//       object.genres_name = object.genres
//         .map(el => {
//           i += 1;
//           return i >= 3 ? 'Other' : el.name;
//         })
//         .slice(0, 3);
//       object.release_date = object.release_date.slice(0, 4);
//       object.poster_path = ` https://image.tmdb.org/t/p/w500${object.poster_path}`;
//       object.vote_average = !object.vote_average
//         ? ''
//         : object.vote_average.toFixed(1);
//       console.log(object.genres_name);
//     });
//     return object;
//   }

//   if (lang === 'uk-UA') {
//     object.map(object => {
//       let i = 0;
//       object.genres_name = object.genres
//         .map(el => {
//           i += 1;
//           return i >= 3 ? 'Інші' : el.name;
//         })
//         .slice(0, 3);
//       object.release_date = object.release_date.slice(0, 4);
//       object.poster_path = ` https://image.tmdb.org/t/p/w500${object.poster_path}`;
//       object.vote_average = !object.vote_average
//         ? ''
//         : object.vote_average.toFixed(1);
//     });
//     // console.log('TRANSFORM', arrObj);
//     return object;
//   }
// }
