// import renderModal from '../templates/modal.hbs';
// import FilmApiService from './movie_database_api';
// import { refs } from './refs';

// const apiRequest = new FilmApiService();
// const movie = apiRequest.fetchMoviesDetails('829280');

// movie.then(res => render(res));

// export default function render(movie) {
//   console.log(movie);
//   const markup = renderModal(movie);
//   // console.log(markup);
//   refs.modal.insertAdjacentHTML('afterbegin', markup);
// }

// apiRequest.incrementPage();

//////////////////\\\\\\\\\\\\\\\\\\\\\\
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
  console.log(evt.path[2].id);
  apiRequest.language = localStorage.getItem('language');
  const details = apiRequest.fetchMoviesDetails(evt.path[2].id);
  // console.log(details);
  details.then(res => render(res));
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

// const addWatchedBtn = document.querySelector('.watch_btn');
// const adddQueueBtn = document.querySelector('.queue_btn');
// console.log(adddQueueBtn);
// adddQueueBtn.addEventListener('click', onClickQueueBtn);
// addWatchedBtn.addEventListener('click', onClickWotchedBtn);
// function onClickWotchedBtn(evt) {
//   //   render(details);
//   refs.modal.removeAttribute('hidden');
//   const movie = apiRequest.fetchMoviesDetails('829280');
//   movie.then(res => render(res));
//   function render(movie) {
//     console.log(movie);
//     localStorage.setItem('movie', JSON.stringify(movie));
//   }
// }
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

  // console.log(arrCardWatched);
}

let queue = JSON.parse(localStorage.getItem('queue'));
console.log('queue', queue);

const arrCardQueue = queue ? queue : [];
console.log('arrCardQueue', arrCardQueue);
function onClickAddQueueBtn(evt) {
  const savedCardQueue = localStorage.getItem('movie');
  const parsedCardQueue = JSON.parse(savedCardQueue);

  arrCardQueue.push(parsedCardQueue);
  localStorage.setItem('queue', JSON.stringify(arrCardQueue));
  queue = JSON.parse(localStorage.getItem('queue'));
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
  refs.filmList.innerHTML = '';
  const lang = localStorage.getItem('language');
  const obj = transformObj(queue, lang);
  const markup = renderFilmCart(obj);
  refs.filmList.insertAdjacentHTML('beforeend', markup);
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
    });
    console.log('TRANSFORM', arrObj);
    return arrObj;
  }
}
