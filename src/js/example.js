import FilmApiService from './movie_database_api';
import renderFilmCart from '../templates/film_cart.hbs';

const refs = {
  filmList: document.querySelector('.film-list'),
  genreSelect: document.querySelector('.js-filter-genres'),
};

const apiRequest = new FilmApiService();

const trend = apiRequest.fetchTrendingMovies();

// trend.then(res => render(res));

export function render(arobj) {
  console.log(arobj);
  const markup = renderFilmCart(arobj);
  // console.log(markup);
  refs.filmList.insertAdjacentHTML('afterbegin', markup);
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
