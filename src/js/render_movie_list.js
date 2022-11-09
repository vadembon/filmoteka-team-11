import renderFilmCart from '../templates/film_cart.hbs';
import FilmApiService from './movie_database_api';
import { refs } from './refs';
import transformObj from './transformObject';

export default function renderFilmList(lang) {
  const apiRequest = new FilmApiService();
  apiRequest.language = lang;

  const movieArr = apiRequest.fetchTrendingMovies();

  movieArr.then(res => {
    render(transformObj(res, lang));
    console.log(apiRequest.language);
  });
}
function render(movieArr) {
  refs.filmList.innerHTML = '';
  const markup = renderFilmCart(movieArr);
  refs.filmList.insertAdjacentHTML('afterbegin', markup);
  refs.searchBtn.setAttribute('disabled', 'disabled');
}

renderFilmList('en-US');
