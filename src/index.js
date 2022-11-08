import FilmApiService from './js/movie_database_api';
import { render } from './js/example';
// import renderModal from './templates/modal.hbs';
import renderMovieList from './js/render_movie_list';

import { refs } from './js/refs';
import * as footer_modal from './js/footer_modal';
import * as render_search from './js/render_search';
import * as renderGenre from './js/renderGenres';
import idToGenre from './js/idToGenre';
import renderModal from './js/render_film_modal';

// import { renderM } from './js/example';

// renderMovieList();
// const apiRequest = new FilmApiService();

// const refs = {
//   filmList: document.querySelector('.film-list'),
//   genreSelect: document.querySelector('.js-filter-genres'),
//   modal: document.querySelector('.modal'),
// };

// function renderM(ar) {
//   const markupm = renderModal(ar);
//   console.log(markupm);
//   refs.modal.insertAdjacentHTML('afterbegin', markupm);
// }

// apiRequest.pageNumber = 1;

// const genres = apiRequest.fetchGenres();
// const trendingList = apiRequest.fetchTrendingMovies();

// genres.then(res => console.log('Genres', res));

// trendingList.then(res => render(res));

// trendingList.then(res => renderM(res[0]));
// trendingList.then(res =>
//   console.log('Trending', res[0], 'Page', apiRequest.pageNumber)
// );
// console.log('fgtryhju');

//////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// trendingList.then(res => {
//   const id = res[1].id;
//   const details = apiRequest.fetchMoviesDetails(id);
//   details.then(res => console.log('Movie Details', res.data));
// });

//////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// apiRequest.searchQuery = 'titanic';
// const search = apiRequest.fetchSearchMovie();
// search.then(res => render(res));

// function render(obj) {
//   const img = document.querySelector('.movie');
//   const markup = `<img src="https://image.tmdb.org/t/p/w500${obj[0].poster_path}" alt="poster path of ${obj[0].title}">
// 	<img src="https://image.tmdb.org/t/p/w300${obj[0].backdrop_path}" alt="poster path of ${obj[0].title}">
// 		<img src="https://image.tmdb.org/t/p/w500${obj[0].backdrop_path}" alt="poster path of ${obj[0].title}">
// 		<img src="https://image.tmdb.org/t/p/w1280${obj[0].backdrop_path}" alt="poster path of ${obj[0].title}">`;
//   img.insertAdjacentHTML('beforeend', markup);
// }
