import FilmApiService from './js/movie_database_api';

const apiRequest = new FilmApiService();

apiRequest.pageNumber = 3;

const genres = apiRequest.fetchGenres();
const trendingList = apiRequest.fetchTrendingMovies();

genres.then(res => console.log('Genres', res));

// genres.then(res => console.log(res.data.genres));

trendingList.then(res =>
  console.log('Trending', res, 'Page', apiRequest.pageNumber)
);
// console.log('fgtryhju');

trendingList.then(res => {
  const id = res[1].id;
  const details = apiRequest.fetchMoviesDetails(id);
  details.then(res => console.log(res.data));
});

apiRequest.searchQuery = 'titanic';
const search = apiRequest.fetchSearchMovie();

search.then(res => render(res));

function render(obj) {
  const img = document.querySelector('.movie');
  const marcup = `<img src="https://image.tmdb.org/t/p/w500${obj[0].poster_path}" alt="poster path of ${obj[0].title}">
	<img src="https://image.tmdb.org/t/p/w300${obj[0].backdrop_path}" alt="poster path of ${obj[0].title}">
		<img src="https://image.tmdb.org/t/p/w500${obj[0].backdrop_path}" alt="poster path of ${obj[0].title}">
		<img src="https://image.tmdb.org/t/p/w1280${obj[0].backdrop_path}" alt="poster path of ${obj[0].title}">`;
  img.insertAdjacentHTML('beforeend', marcup);
}
