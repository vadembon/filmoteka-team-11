import renderList from './render_movie_list';
import { refs } from './refs';
import FilmApiService from './movie_database_api';
import { transformObjUa, transformObj } from './transformObject';

refs.genreSelect.addEventListener('change', onChange);
const apiRequest = new FilmApiService();

function onChange(evt) {
  refs.filmList.innerHTML = '';
  const genreId = evt.target.value;

  const genred = apiRequest.fetchMoviesWithGenre(genreId);
  genred.then(res => renderList(transformObjUa(res)));
}
