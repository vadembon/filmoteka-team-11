import FilmApiService from './js/movie_database_api';

const apiRequest = new FilmApiService();

apiRequest.pageNumber = 3;

const genres = apiRequest.fetchGenres();
const trendingList = apiRequest.fetchTrendingMovies();
console.log(genres);

// genres.then(res => console.log(res.data.genres));
trendingList.then(res => console.log(res.data));
console.log('fgtryhju');

trendingList.then(res => {
  const id = res.data.results[1].id;
  const details = apiRequest.fetchMoviesDetails(id);
  details.then(res => console.log(res.data));
});

apiRequest.searchQuery = 'titanic';
const search = apiRequest.fetchSearchMovie();

search.then(res => console.log(res.data.results[0].overview));
