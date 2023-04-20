import { onClickTrending, renderList } from './render_movie_list';
import searchPanel from '../templates/search_panel.hbs';
import FilmApiService from './movie_database_api';
import transformObj from './transformObject';
import { refs } from './refs';
import { firstPage, currentPage } from './pagination';
import debounce from 'lodash.debounce';

import Notiflix from 'notiflix';
import { onClickGenre } from './render_genres';

const apiRequest = new FilmApiService();

refs.searchForm.addEventListener('submit', onSubmit);
refs.searchInput.addEventListener('input', debounce(onInput, 350));

function onSubmit(evt) {
  evt.preventDefault();
  refs.paginationRef.removeEventListener('click', onClickTrending);
  refs.paginationRef.removeEventListener('click', onClickGenre);
  refs.paginationRef.addEventListener('click', onClickSearch);
  firstPage();

  apiRequest.searchQuery = refs.searchInput.value;
  const searchRes = apiRequest.fetchSearchMovie();
  const lang = localStorage.getItem('language');

  searchRes.then(res => {
    if (!res.length) {
      Notiflix.Notify.failure('Sorry, film is not found. Please try again.');
      return;
    }
    renderList(transformObj(res, lang));
    refs.searchInput.value = '';
    refs.searchList.innerHTML = '';
  });
}

export function onClickSearch(evt) {
  evt.preventDefault();
  apiRequest.pageNumber = currentPage;

  apiRequest.fetchSearchMovie().then(res => {
    renderList(transformObj(res, apiRequest.language));
  });
}

function onInput(evt) {
  evt.preventDefault();
  const lang = localStorage.getItem('language');
  refs.searchBtn.removeAttribute('disabled');
  apiRequest.searchQuery = evt.target.value;
  const searchRes = apiRequest.fetchSearchMovie();
  searchRes.then(res => {
    if (!res) {
      refs.searchInput.value = '';
      refs.searchList.innerHTML = '';
      return;
    }
    if (!res.length) {
      Notiflix.Notify.failure('Sorry, film is not found. Please try again.');
      refs.searchList.innerHTML = '';
      return;
    }

    renderSearchPanel(transformObj(res, lang));
  });
}

function renderSearchPanel(arrObj) {
  refs.searchList.innerHTML = '';
  const markup = searchPanel(arrObj);
  refs.searchList.insertAdjacentHTML('beforeend', markup);
}
