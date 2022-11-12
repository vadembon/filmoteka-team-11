import renderFilmCart from '../templates/film_cart.hbs';
import FilmApiService from './movie_database_api';
import { firstPage, currentPage } from './pagination';
import { onClickGenre } from './render_genres';
import { refs } from './refs';
import transformObj from './transformObject';
import { onClickSearch } from './render_search';
import createTrailerMarkup from './addToLibrary';

const apiRequest = new FilmApiService();

export function renderTrendingList() {
  firstPage();
  refs.paginationRef.removeEventListener('click', onClickSearch);
  refs.paginationRef.removeEventListener('click', onClickGenre);
  refs.paginationRef.addEventListener('click', onClickTrending);

  apiRequest.language = localStorage.getItem('language');
  apiRequest.pageNumber = currentPage;

  console.log('page', apiRequest.pageNumber);

  const movieArr = apiRequest.fetchTrendingMovies();

  movieArr.then(res => {
    renderList(transformObj(res, apiRequest.language));
    console.log(apiRequest.language);
  });
}

export function onClickTrending() {
  apiRequest.pageNumber = currentPage;
  console.log('pagNum', apiRequest.pageNumber);
  apiRequest.fetchWeekTrendingMovies().then(res => {
    renderList(transformObj(res, apiRequest.language));
    console.log(apiRequest.language);
  });
}

export function renderList(movieArr) {
  refs.filmList.innerHTML = '';
  const markup = renderFilmCart(movieArr);
  refs.filmList.insertAdjacentHTML('afterbegin', markup);
  refs.searchBtn.setAttribute('disabled', 'disabled');
}

const arrMov = [];
const arr = [505642, 948276, 833097, 829280, 664469, 1037858];
arr.map(id => apiRequest.fetchMoviesDetails(id).then(res => arrMov.push(res)));
console.log('массив по ИНДЕКСУ', arrMov);

renderList(transformObj(arrMov, apiRequest.language));
