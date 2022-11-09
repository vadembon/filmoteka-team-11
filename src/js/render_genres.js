import renderList from './render_movie_list';
import { refs } from './refs';
import FilmApiService from './movie_database_api';
import transformObj from './transformObject';
import genreSelectMarkup from '../templates/filter_genres_uk.hbs';

refs.genreSelect.addEventListener('change', onChange);
const apiRequest = new FilmApiService();
const transform = new transformObj();

function renderGenres() {
  const markup = genreSelectMarkup();
  refs.genreSelect.insertAdjacentHTML('afterbegin', markup);
}

renderGenres();

function onChange(evt) {
  refs.filmList.innerHTML = '';
  const genreId = evt.target.value;

  const genred = apiRequest.fetchMoviesWithGenre(genreId);
  genred.then(res => renderList(transform.transformObjUa(res)));
}
