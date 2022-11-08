import renderFilmCart from '../templates/film_cart.hbs';
import FilmApiService from './movie_database_api';
import { refs } from './refs';
import { transformObjUa, transformObj } from './transformObject';

const apiRequest = new FilmApiService();
const movieArr = apiRequest.fetchTrendingMovies();

movieArr.then(res => {
  render(transformObjUa(res));
});

export default function render(movieArr) {
  console.log(movieArr);
  refs.filmList.innerHTML = '';
  const markup = renderFilmCart(movieArr);
  // console.log(markup);
  refs.filmList.insertAdjacentHTML('afterbegin', markup);
  refs.searchBtn.setAttribute('disabled', 'disabled');
}
