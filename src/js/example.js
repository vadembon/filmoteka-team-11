import FilmApiService from './movie_database_api';
import renderFilmCart from '../templates/film_cart.hbs';
import renderModal from '../templates/modal.hbs';

const refs = {
  filmList: document.querySelector('.film-list'),
  genreSelect: document.querySelector('.js-filter-genres'),
  modal: document.querySelector('.modal'),
};

const apiRequest = new FilmApiService();

const trend = apiRequest.fetchTrendingMovies();

// trend.then(res => render(res));

function renderM(ar) {
  const markupm = renderModal(ar);
  console.log(markupm);
  refs.modal.insertAdjacentHTML('afterbegin', markupm);
}

export function render(arobj) {
  console.log(arobj);
  const markup = renderFilmCart(arobj);
  // console.log(markup);
  refs.filmList.insertAdjacentHTML('afterbegin', markup);
  const link = document.querySelector('.cart__link');
  link.addEventListener('click', onClick);
  console.log(link);
}

function onClick(evt) {
  console.log(evt);
}

console.log('hfjkssk');

///////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

refs.genreSelect.addEventListener('change', onChange);

function onChange(evt) {
  refs.filmList.innerHTML = '';
  const genreId = evt.target.value;

  const genred = apiRequest.fetchMoviesWithGenre(genreId);
  genred.then(res => render(res));
}
