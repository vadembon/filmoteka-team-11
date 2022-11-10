import { renderList } from './render_movie_list';
import { refs } from './refs';
import FilmApiService from './movie_database_api';
import transformObj from './transformObject';
import genreSelectMarkupUk from '../templates/filter_genres_uk.hbs';
import genreSelectMarkupUa from '../templates/filter_genres_ua.hbs';

refs.genreSelect.addEventListener('change', onChange);
const apiRequest = new FilmApiService();
const lang = localStorage.getItem('language');

export default class GenresLanguage {
  constructor() {}

  renderGenresUk() {
    const markup = genreSelectMarkupUk();
    refs.genreSelect.innerHTML = '';
    refs.genreSelect.insertAdjacentHTML('afterbegin', markup);
  }
  renderGenresUa() {
    const markup = genreSelectMarkupUa();
    refs.genreSelect.innerHTML = '';
    refs.genreSelect.insertAdjacentHTML('afterbegin', markup);
  }
}
const genres = new GenresLanguage();
genres.renderGenresUk();

function onChange(evt) {
  refs.filmList.innerHTML = '';
  const genreId = evt.target.value;

  const genred = apiRequest.fetchMoviesWithGenre(genreId);
  genred.then(res => renderList(transformObj(res, lang)));
}
