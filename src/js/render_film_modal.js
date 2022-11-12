import renderModal from '../templates/modal.hbs';
import FilmApiService from './movie_database_api';
import { refs } from './refs';
import renderFilmCart from '../templates/film_cart.hbs';
import { renderList } from './render_movie_list';
// import transformObj from './transformObject';
import Notiflix, { Notify } from 'notiflix';

const apiRequest = new FilmApiService();

refs.filmList.addEventListener('click', onClick);

function onClick(evt) {
  evt.preventDefault();
  if (watched) {
    const her = JSON.parse(localStorage.getItem('watched'));
    console.log(her.map(el => el.id).includes(+evt.path[2].id));
    console.log(her.map(el => el.id));
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
    console.log(her.map(el => el.id).includes(+evt.path[2].id));
    console.log(her.map(el => el.id));
    if (her.map(el => el.id).includes(+evt.path[2].id)) {
      refs.addQueueBtn.textContent = 'remove';
      refs.addQueueBtn.classList.add('button-remove');
    } else {
      refs.addQueueBtn.textContent = 'add to queue';
      refs.addQueueBtn.classList.remove('button-remove');
    }
  }
  console.log(evt.path[2].id);
  apiRequest.language = localStorage.getItem('language');
  const details = apiRequest.fetchMoviesDetails(evt.path[2].id);
  // console.log(details);
  details.then(res => render(res));
}

function onClickRemoveWathed(evt) {
  refs.addWatchedBtn.textContent = 'add to watched';
  console.log('remove', evt);
}

function render(movie) {
  refs.modal.innerHTML = '';
  console.log(movie);
  localStorage.setItem('movie', JSON.stringify(movie));
  const markup = renderModal(movie);

  refs.modal.insertAdjacentHTML('afterbegin', markup);
}
// apiRequest.incrementPage();
//   /////////////////\\\\\\\\\\\\\\\\\\\\

refs.addQueueBtn.addEventListener('click', onClickAddQueueBtn);
refs.addWatchedBtn.addEventListener('click', onClickAddWatchedBtn);

let watched = JSON.parse(localStorage.getItem('watched'));

console.log('watch', watched);

const arrCardWatched = watched ? watched : [];
console.log('arrCardWatch', arrCardWatched);

function onClickAddWatchedBtn(evt) {
  const savedCardWatched = localStorage.getItem('movie');
  const parsedCardWatched = JSON.parse(savedCardWatched);
  arrCardWatched.push(parsedCardWatched);
  localStorage.setItem('watched', JSON.stringify(arrCardWatched));
  watched = JSON.parse(localStorage.getItem('watched'));

  console.log(refs.addWatchedBtn.textContent === 'remove');
  if (refs.addWatchedBtn.textContent === 'remove') {
    refs.addWatchedBtn.textContent = 'add to watched';
  } else {
    refs.addWatchedBtn.textContent = 'remove';
  }
}

let queue = JSON.parse(localStorage.getItem('queue'));
console.log('queue', queue);
const arrCardQueue = queue ? queue : [];
console.log('arrCardQueue', arrCardQueue);

function onClickAddQueueBtn(evt) {
  const savedCardQueue = localStorage.getItem('movie');
  const parsedCardQueue = JSON.parse(savedCardQueue);
  arrCardQueue.push(parsedCardQueue);
  console.log('saved', parsedCardQueue.id);
  localStorage.setItem('queue', JSON.stringify(arrCardQueue));
  queue = JSON.parse(localStorage.getItem('queue'));

  if (refs.addQueueBtn.textContent === 'remove') {
    refs.addQueueBtn.textContent = 'add to queue';
    const newArr = queue.filter(el => el.id !== parsedCardQueue.id);
    localStorage.removeItem('queue');
    console.log(newArr);
    localStorage.setItem('queue', JSON.stringify(newArr));
    // queue.splice(indexDelElQueue, 1);
  } else {
    refs.addQueueBtn.textContent = 'remove';
  }
}

refs.headerLibrBtnWatched.addEventListener('click', onClickWatchedBtn);
refs.headerLibrBtnQueue.addEventListener('click', onClickQueueBtn);

function onClickWatchedBtn(evt) {
  Notiflix.Loading.standard();
  refs.filmList.innerHTML = '';
  const lang = localStorage.getItem('language');
  const obj = transformObj(watched, lang);

  const markup = renderFilmCart(obj);
  refs.filmList.insertAdjacentHTML('beforeend', markup);
  Notiflix.Loading.remove();
}

function onClickQueueBtn(evt) {
  Notiflix.Loading.standard();
  refs.filmList.innerHTML = '';
  const lang = localStorage.getItem('language');
  const obj = transformObj(queue, lang);
  const markup = renderFilmCart(obj);
  refs.filmList.insertAdjacentHTML('beforeend', markup);
  Notiflix.Loading.remove();
}

function transformObj(arrObj, lang) {
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
      el.vote_average = el.vote_average.toFixed(1);
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
      el.vote_average = el.vote_average.toFixed(1);
    });
    console.log('TRANSFORM', arrObj);
    return arrObj;
  }
}
