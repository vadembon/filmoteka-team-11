import renderModal from '../templates/modal.hbs';
import FilmApiService from './movie_database_api';
import { refs } from './refs';
import renderFilmCart from '../templates/film_cart.hbs';
import Notiflix, { Notify } from 'notiflix';
import FilmApiService from './movie_database_api';

const apiRequest = new FilmApiService();

refs.filmList.addEventListener('click', openModal);
refs.headerLibrBtnWatched.addEventListener('click', onClickWatchedBtn);
refs.headerLibrBtnQueue.addEventListener('click', onClickQueueBtn);

function openModal(evt) {
  evt.preventDefault();
  refs.addQueueBtn.addEventListener('click', onClickAddQueueBtn);
  refs.addWatchedBtn.addEventListener('click', onClickAddWatchedBtn);
  refs.closeModalBtn.addEventListener('click', closeModal);
  refs.backdrop.classList.remove('visually-hidden');
  const queue = JSON.parse(localStorage.getItem('queue'));
  const watched = JSON.parse(localStorage.getItem('watched'));

  if (watched) {
    const her = JSON.parse(localStorage.getItem('watched'));
    if (her.map(el => el.id).includes(+evt.path[2].id)) {
      refs.addWatchedBtn.textContent = 'remove';
      refs.addWatchedBtn.classList.add('button-remove');
    } else {
      refs.addWatchedBtn.textContent = 'add to watched';
      refs.addWatchedBtn.classList.remove('button-remove');
    }
  }

  if (queue) {
    const her = JSON.parse(localStorage.getItem('queue'));
    if (her.map(el => el.id).includes(+evt.path[2].id)) {
      refs.addQueueBtn.textContent = 'remove';
      refs.addQueueBtn.classList.add('button-remove');
    } else {
      refs.addQueueBtn.textContent = 'add to queue';
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
    render(res);
  });
}

function render(movie) {
  console.log(movie);
  localStorage.setItem('movie', JSON.stringify(movie));
  const markup = renderModal(movie);
  refs.modal.innerHTML = markup;
}

function closeModal() {
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

  if (refs.addWatchedBtn.textContent === 'remove') {
    refs.addWatchedBtn.textContent = 'add to watched';
    const newArr = arrCardWatched.filter(el => el.id !== parsedCardWatched.id);
    localStorage.removeItem('watched');

    console.log('newArr', newArr);
    localStorage.setItem('watchedFilter', JSON.stringify(newArr));
    const parseFilter = JSON.parse(localStorage.getItem('watchedFilter'));
    localStorage.setItem('watched', JSON.stringify(parseFilter));
  } else {
    refs.addWatchedBtn.textContent = 'remove';
    arrCardWatched.push(parsedCardWatched);
    console.log('saved', parsedCardWatched.id);
    localStorage.setItem('watched', JSON.stringify(arrCardWatched));
  }
}

function onClickAddQueueBtn(evt) {
  evt.preventDefault();
  const queue = JSON.parse(localStorage.getItem('queue'));
  const arrCardQueue = queue ? queue : [];
  const savedCardQueue = localStorage.getItem('movie');
  const parsedCardQueue = JSON.parse(savedCardQueue);

  if (refs.addQueueBtn.textContent === 'remove') {
    refs.addQueueBtn.textContent = 'add to queue';
    const newArr = arrCardQueue.filter(el => el.id !== parsedCardQueue.id);
    localStorage.removeItem('queue');

    console.log('newArr', newArr);
    localStorage.setItem('queueFilter', JSON.stringify(newArr));
    const parseFilter = JSON.parse(localStorage.getItem('queueFilter'));
    localStorage.setItem('queue', JSON.stringify(parseFilter));
  } else {
    refs.addQueueBtn.textContent = 'remove';
    arrCardQueue.push(parsedCardQueue);
    console.log('saved', parsedCardQueue.id);
    localStorage.setItem('queue', JSON.stringify(arrCardQueue));

    // queue = JSON.parse(localStorage.getItem('queue'));
  }
}

export function onClickWatchedBtn(evt) {
  evt.preventDefault();
  Notiflix.Loading.standard();
  const lang = localStorage.getItem('language');
  const arrObj = JSON.parse(localStorage.getItem('watched'));
  const obj = transformObj(arrObj, lang);
  const markup = renderFilmCart(obj);
  refs.filmList.innerHTML = markup;
  Notiflix.Loading.remove();
}

export function onClickQueueBtn(evt) {
  evt.preventDefault();
  Notiflix.Loading.standard();
  const lang = localStorage.getItem('language');
  const arrObj = JSON.parse(localStorage.getItem('queue'));
  const obj = transformObj(arrObj, lang);
  const markup = renderFilmCart(obj);
  refs.filmList.innerHTML = markup;
  Notiflix.Loading.remove();
}

function transformObj(arrObj, lang) {
  console.log('transform', arrObj);
  if (lang === 'en-US') {
    arrObj.map(el => {
      let i = 0;
      el.genre_ids = el.genres
        .map(el => {
          i += 1;
          return i >= 3 ? 'other' : el.name;
        })
        .slice(0, 3);
      el.release_date = el.release_date.slice(0, 4);
      el.poster_path = ` https://image.tmdb.org/t/p/w500${el.poster_path}`;
      el.vote_average = !el.vote_average ? '' : el.vote_average.toFixed(1);
      console.log(el.genre_ids);
    });
    return arrObj;
  }
  if (lang === 'uk-UA') {
    arrObj.map(el => {
      let i = 0;
      el.genre_ids = el.genres
        .map(el => {
          i += 1;
          return i >= 3 ? 'other' : el.name;
        })
        .slice(0, 3);
      el.release_date = el.release_date.slice(0, 4);
      el.poster_path = ` https://image.tmdb.org/t/p/w500${el.poster_path}`;
      el.vote_average = !el.vote_average ? '' : el.vote_average.toFixed(1);
    });
    console.log('TRANSFORM', arrObj);
    return arrObj;
  }
}
