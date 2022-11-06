import FilmApiService from './js/movie_database_api';
import { render } from './js/example';

const apiRequest = new FilmApiService();

apiRequest.pageNumber = 1;

const genres = apiRequest.fetchGenres();
const trendingList = apiRequest.fetchTrendingMovies();

genres.then(res => console.log('Genres', res));

trendingList.then(res => render(res));

trendingList.then(res =>
  console.log('Trending', res, 'Page', apiRequest.pageNumber)
);
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
