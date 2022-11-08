import renderList from './render_movie_list';
import FilmApiService from './movie_database_api';
import { refs } from './refs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const apiRequest = new FilmApiService();

refs.searchForm.addEventListener('submit', onSubmit);
refs.searchInput.addEventListener('input', debounce(onInput), 300);

function onSubmit(evt) {
  evt.preventDefault();
  console.log(evt, refs.searchInput.value);
  apiRequest.searchQuery = refs.searchInput.value;
  const searchRes = apiRequest.fetchSearchMovie();

  searchRes.then(res => {
    console.log(res);
    if (!res.length) {
      Notiflix.Notify.failure('Sorry, film is not found. Please try again.');
      return;
    }
    renderList(res);
    refs.searchInput.value = '';
  });
}

function onInput(evt) {
  evt.preventDefault();
  refs.searchBtn.removeAttribute('disabled');
}
