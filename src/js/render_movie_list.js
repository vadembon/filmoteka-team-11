import renderFilmCart from '../templates/film_cart.hbs';
import FilmApiService from './movie_database_api';
import { refs } from './refs';
import { transformObjUa, transformObj } from './transformObject';

const apiRequest = new FilmApiService();
const movieArr = apiRequest.fetchTrendingMovies();

movieArr.then(res => {
  render(transformObj(res));
});

export default function render(movieArr) {
  refs.filmList.innerHTML = '';
  const markup = renderFilmCart(movieArr);
  refs.filmList.insertAdjacentHTML('afterbegin', markup);
  refs.searchBtn.setAttribute('disabled', 'disabled');
  const link = document.querySelector('.card__link');
}
