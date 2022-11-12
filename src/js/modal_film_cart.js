import { refs } from './refs';
import FilmApiService from './movie_database_api';
const apiRequest = new FilmApiService();

refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.backdrop.classList.add('visually-hidden');
}

refs.filmList.addEventListener('click', onClick);

function onClick(evt) {
  evt.preventDefault();
  console.log(evt.path[2]);
  const details = apiRequest.fetchMoviesDetails(evt.path[2].id);
  details.then(res =>
    refs.backdrop.setAttribute(
      'style',
      `background-image: url("https://image.tmdb.org/t/p/original/${res.backdrop_path}"); background-size: cover; background-position: 50% 50%;`
    )
  );
  refs.backdrop.classList.remove('visually-hidden');
}

// Закрытие по клику вне поля модального окна
// const backdropik = document.querySelector(‘.backdrop’);
// const box = document.querySelector(‘.modal-container’);
// document.addEventListener(‘click’, e => {
//   const click = e.composedPath().includes(box, backdropik);
//   if (!click) {
//     box.style.display = ‘none’;
//     backdropik.style.display = ‘none’;
//   }
// });
