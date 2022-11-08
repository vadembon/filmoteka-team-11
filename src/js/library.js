// import renderModal from '../templates/modal.hbs';
import FilmApiService from './movie_database_api';
import { refs } from './refs';
// import renderList from './render_movie_list';

export default function trem(link) {
  console.log(link);
}

console.log('hhfhfj');

// refs.filmList.addEventListener('click', e => {
//   if (e.target.getAttribute('class')?.includes('test-modal')) {
//     modal.classList.remove('is-hidden');
//     modalClose.addEventListener('click', e => {
//       modal.classList.add('is-hidden');
//     });
//   }
// });

// const openModal = async e => {
//   e.preventDefault();
//   if (e.target.closest('.collection__item')?.dataset.id) {
//     const resp = await fetchFilmDetails(
//       e.target.closest('.collection__item').dataset.id
//     );
//     createFilmDetailsMarkup(resp);
//     modal.classList.remove('hidden');
//     body.style.overflow = 'hidden';
//     modalClose.addEventListener('click', closeModal);
//     document.addEventListener('keydown', escModal);
//     modal.addEventListener('click', closeModalOutsideWindow);

//     ChangeColorText();

//     const modal_text = document.querySelectorAll('.details-list_title');
//     const LS = JSON.parse(localStorage.getItem('theme'));
//     if (LS) {
//       modal_text.forEach(el => (el.style.color = '#ffffff'));
//       return;
//     }
//   } else {
//     return;
//   }
// };
