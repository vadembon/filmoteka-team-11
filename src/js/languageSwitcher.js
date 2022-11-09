import { refs } from './refs';
import FilmApiService from './movie_database_api';
import GenresLanguage from './render_genres';

const apiRequest = new FilmApiService();
const genresSelect = new GenresLanguage();

refs.uaLanguageBtn.addEventListener('click', onClickUa);
refs.ukLanguageBtn.addEventListener('click', onClickUk);

function onClickUa() {
  genresSelect.renderGenresUa();
  refs.searchInput.setAttribute('placeholder', 'Пошук фильмів');
  refs.headerLibrary.innerHTML = 'Бібліотека';
  refs.headerHome.innerHTML = 'головна';
  refs.themeDark.innerHTML = 'темна';
  refs.themeLight.innerHTML = 'світла';
}

function onClickUk() {
  genresSelect.renderGenresUk();
  refs.searchInput.setAttribute('placeholder', 'Movie search');
  refs.headerLibrary.innerHTML = 'library';
  refs.headerHome.innerHTML = 'home';
  refs.themeDark.innerHTML = 'dark';
  refs.themeLight.innerHTML = 'light';
}
