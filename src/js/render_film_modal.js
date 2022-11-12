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

const apiRequest = new FilmApiService();

refs.filmList.addEventListener('click', onClick);
function onClick(evt) {
  evt.preventDefault();
  console.log(evt.path[2].id);
  const details = apiRequest.fetchMoviesDetails(evt.path[2].id);
  console.log(details);
  details.then(res => render(res));
}

function render(movie) {
  refs.modal.innerHTML = '';
  console.log(movie);
  localStorage.setItem('movie', JSON.stringify(movie));
  const markup = renderModal(movie);

  refs.modal.insertAdjacentHTML('afterbegin', markup);
}
apiRequest.incrementPage();
//   /////////////////\\\\\\\\\\\\\\\\\\\\

const addWatchedBtn = document.querySelector('.watch_btn');
const adddQueueBtn = document.querySelector('.queue_btn');
console.log(adddQueueBtn);
adddQueueBtn.addEventListener('click', onClickQueueBtn);
addWatchedBtn.addEventListener('click', onClickWotchedBtn);
function onClickWotchedBtn(evt) {
  //   render(details);
  refs.modal.removeAttribute('hidden');
  const movie = apiRequest.fetchMoviesDetails('829280');
  movie.then(res => render(res));
  function render(movie) {
    console.log(movie);
    localStorage.setItem('movie', JSON.stringify(movie));
  }
}
refs.addQueueBtn.addEventListener('click', onClickQueueBtn);
refs.addWatchedBtn.addEventListener('click', onClickWatchedBtn);

const watched = JSON.parse(localStorage.getItem('watched'));
console.log(watched);

const arrCardWatched = watched ? watched : [''];
function onClickWatchedBtn(evt) {
  const savedCardWatched = localStorage.getItem('movie');
  const parsedCardWatched = JSON.parse(savedCardWatched);

  arrCardWatched.push(parsedCardWatched);
  localStorage.setItem('watched', JSON.stringify(arrCardWatched));
  // console.log(arrCardWatched);
}

const queue = JSON.parse(localStorage.getItem('queue'));
console.log(queue);

const arrCardQueue = queue ? queue : [''];
function onClickQueueBtn(evt) {
  const savedCardQueue = localStorage.getItem('movie');
  const parsedCardQueue = JSON.parse(savedCardQueue);

  arrCardQueue.push(parsedCardQueue);

  localStorage.setItem('queue', JSON.stringify(arrCardQueue));
}

function transformObj(arrObj, lang) {
  if (lang === 'en-US') {
    arrObj.map(el => {
      // el.genre_ids = idToGenre(el.genre_ids);
      el.release_date = el.release_date.slice(0, 4);
      el.poster_path = ` https://image.tmdb.org/t/p/w500${el.poster_path}`;
    });
    return arrObj;
  }
  if (lang === 'uk-UA') {
    arrObj.map(el => {
      // el.genre_ids = idToGenreUa(el.genre_ids);
      el.release_date = el.release_date.slice(0, 4);
      el.poster_path = ` https://image.tmdb.org/t/p/w500${el.poster_path}`;
    });
    console.log('TRANSFORM', arrObj);
    return arrObj;
  }
}

const watchedBtn = document.querySelector('#watched');
console.log(watchedBtn);
watchedBtn.addEventListener('click', onClickWatchedBtn);
// const obj = [];

function onClickWatchedBtn(evt) {
  const lang = localStorage.getItem('language');
  const obj = transformObj(queue, lang);
  const markup = renderFilmCart(obj);
  refs.filmList.insertAdjacentHTML('beforeend', markup);
}
