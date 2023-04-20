import FilmApiService from './movie_database_api';
import { refs } from './refs';
import comingSoon from '../images/coming_soon.jpg';
import { renderLibrary } from './render_library';

const apiRequest = new FilmApiService();

refs.filmList.addEventListener('click', onCartClick);
refs.sliderGlide.addEventListener('click', onSliderClick);
refs.searchList.addEventListener('click', onSearchClick);

function onCartClick(evt) {
  evt.preventDefault();
  openModal(evt.target.id);
}

function onSearchClick(evt) {
  evt.preventDefault();
  openModal(evt.target.id);
}

function onSliderClick(evt) {
  evt.preventDefault();
  openModal(evt.target.id);
}

function openModal(id) {
  const lang = localStorage.getItem('language');
  const removeString = lang === 'en-US' ? 'remove' : 'видалити';
  const watchedString =
    lang === 'en-US' ? 'add to watched' : 'додати до переглянутого';
  const queueString = lang === 'en-US' ? 'add to queue' : 'додати до черги';

  refs.addQueueBtn.addEventListener('click', onClickAddQueueBtn);
  refs.addWatchedBtn.addEventListener('click', onClickAddWatchedBtn);
  refs.closeModalBtn.addEventListener('click', closeModal);
  document.body.addEventListener('keydown', onEscButton);
  document.body.addEventListener('click', onBackdropClick);
  refs.backdrop.classList.remove('is-hidden');
  setTimeout(openModalContainer, 800);
  const queue = JSON.parse(localStorage.getItem('queue'));
  const watched = JSON.parse(localStorage.getItem('watched'));
  refs.addWatchedBtn.textContent = watchedString;
  refs.addQueueBtn.textContent = queueString;
  if (watched) {
    const her = JSON.parse(localStorage.getItem('watched'));
    if (her.map(el => el.id).includes(+id)) {
      refs.addWatchedBtn.textContent = removeString;
    } else {
      refs.addWatchedBtn.textContent = watchedString;
    }
  }

  if (queue) {
    const her = JSON.parse(localStorage.getItem('queue'));

    if (her.map(el => el.id).includes(+id)) {
      refs.addQueueBtn.textContent = removeString;
    } else {
      refs.addQueueBtn.textContent = queueString;
    }
  }
  apiRequest.language = localStorage.getItem('language');
  const details = apiRequest.fetchMoviesDetails(id);
  details.then(res => {
    refs.backdrop.setAttribute(
      'style',
      `background-image: url("https://image.tmdb.org/t/p/original/${res.backdrop_path}"); background-size: cover; background-position: 50% 50%;`
    );

    renderModal(res);
  });
}

function closeModal(evt) {
  document.body.removeEventListener('keydown', onEscButton);
  document.body.removeEventListener('click', onBackdropClick);
  refs.backdrop.classList.add('is-hidden');
  refs.modalContainer.classList.add('is-hidden-modal');
  refs.addQueueBtn.removeEventListener('click', onClickAddQueueBtn);
  refs.addWatchedBtn.removeEventListener('click', onClickAddWatchedBtn);
}

function onBackdropClick(evt) {
  if (evt.target.classList.contains('backdrop')) {
    closeModal();
  }
}

function onEscButton(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

function openModalContainer() {
  refs.modalContainer.classList.remove('is-hidden-modal');
}

function onClickAddWatchedBtn(evt) {
  evt.preventDefault();

  const lang = localStorage.getItem('language');
  const removeString = lang === 'en-US' ? 'remove' : 'видалити';
  const watchedString =
    lang === 'en-US' ? 'add to watched' : 'додати до переглянутого';
  const watched = JSON.parse(localStorage.getItem('watched'));
  const arrCardWatched = watched ? watched : [];
  const savedCardWatched = localStorage.getItem('movie');
  const parsedCardWatched = JSON.parse(savedCardWatched);

  if (refs.addWatchedBtn.textContent === removeString) {
    refs.addWatchedBtn.textContent = watchedString;
    const newArr = arrCardWatched.filter(el => el.id !== parsedCardWatched.id);
    localStorage.removeItem('watched');

    localStorage.setItem('watchedFilter', JSON.stringify(newArr));
    const parseFilter = JSON.parse(localStorage.getItem('watchedFilter'));
    localStorage.setItem('watched', JSON.stringify(parseFilter));
  } else {
    refs.addWatchedBtn.textContent = removeString;
    arrCardWatched.push(parsedCardWatched);
    localStorage.setItem('watched', JSON.stringify(arrCardWatched));
  }
  if (localStorage.getItem('page') === 'library') {
    closeModal();
    renderLibrary('watched');
    refs.headerLibrBtnQueue.classList.remove('is-active');
    refs.headerLibrBtnWatched.classList.add('is-active');
  }
}

function onClickAddQueueBtn(evt) {
  evt.preventDefault();
  const lang = localStorage.getItem('language');
  const removeString = lang === 'en-US' ? 'remove' : 'видалити';
  const queueString = lang === 'en-US' ? 'add to queue' : 'додати до черги';
  const queue = JSON.parse(localStorage.getItem('queue'));
  const arrCardQueue = queue ? queue : [];
  const savedCardQueue = localStorage.getItem('movie');
  const parsedCardQueue = JSON.parse(savedCardQueue);

  if (refs.addQueueBtn.textContent === removeString) {
    refs.addQueueBtn.textContent = queueString;
    const newArr = arrCardQueue.filter(el => el.id !== parsedCardQueue.id);
    localStorage.removeItem('queue');

    localStorage.setItem('queueFilter', JSON.stringify(newArr));
    const parseFilter = JSON.parse(localStorage.getItem('queueFilter'));
    localStorage.setItem('queue', JSON.stringify(parseFilter));
  } else {
    refs.addQueueBtn.textContent = removeString;
    arrCardQueue.push(parsedCardQueue);
    localStorage.setItem('queue', JSON.stringify(arrCardQueue));
  }
  if (localStorage.getItem('page') === 'library') {
    closeModal();
    renderLibrary('queue');
    refs.headerLibrBtnWatched.classList.remove('is-active');
    refs.headerLibrBtnQueue.classList.add('is-active');
  }
}

function renderModal(obj) {
  const lang = localStorage.getItem('language');
  const transObj = transformModal(obj, lang);

  refs.modalImage.setAttribute('src', `${transObj.poster_path}`);
  refs.modalFilmTitle.textContent = transObj.title;
  refs.modalVoteAverage.textContent = transObj.vote_average;
  refs.modalVoteCount.textContent = transObj.vote_count;
  refs.modalPopularityValue.textContent = transObj.popularity;
  refs.modalOriginalTitleValue.textContent = transObj.original_title;
  refs.modalGenresValue.textContent = transObj.genres_name;
  refs.modalAboutValue.textContent = transObj.overview;
  localStorage.setItem('movie', JSON.stringify(obj));
}

export function transformModal(object, lang) {
  if (lang === 'en-US') {
    let i = 0;
    object.genres_name = object.genres
      .map(el => {
        i += 1;
        return i >= 3 ? 'Other' : el.name;
      })
      .slice(0, 3);
    object.release_date = object.release_date.slice(0, 4);
    object.poster_path = !object.poster_path
      ? comingSoon
      : ` https://image.tmdb.org/t/p/w500${object.poster_path}`;
    object.vote_average = !object.vote_average
      ? ''
      : object.vote_average.toFixed(1);

    return object;
  }

  if (lang === 'uk-UA') {
    let i = 0;
    object.genres_name = object.genres
      .map(el => {
        i += 1;
        return i >= 3 ? 'Інші' : el.name;
      })
      .slice(0, 3);
    object.release_date = object.release_date.slice(0, 4);
    object.poster_path = !object.poster_path
      ? comingSoon
      : ` https://image.tmdb.org/t/p/w500${object.poster_path}`;
    object.vote_average = !object.vote_average
      ? ''
      : object.vote_average.toFixed(1);

    return object;
  }
}
