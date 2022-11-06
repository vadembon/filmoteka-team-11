import FilmApiService from './movie_database_api';
import renderFilmCart from '../templates/film_cart.hbs';

const refs = {
  filmList: document.querySelector('.film-list'),
};

const apiRequest = new FilmApiService();

const trend = apiRequest.fetchTrendingMovies();

trend.then(res => render(res));

function render(arobj) {
  const markup = renderFilmCart(arobj);
  // console.log(markup);
  refs.filmList.insertAdjacentHTML('afterbegin', markup);
}

console.log('hfjkssk');
