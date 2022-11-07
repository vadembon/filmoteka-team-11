import renderFilmCart from '../templates/film_cart.hbs';
import FilmApiService from './movie_database_api';
import { refs } from './refs';

const apiRequest = new FilmApiService();
const movieArr = apiRequest.fetchTrendingMovies();

movieArr.then(res => render(res));

export default function render(movieArr) {
  console.log(movieArr);
  const markup = movieArr.map(el => renderFilmCart(el)).join('');
  // console.log(markup);
  refs.filmList.insertAdjacentHTML('afterbegin', markup);
}
