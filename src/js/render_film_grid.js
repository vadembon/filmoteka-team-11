import renderMovieList from './js/render_movie_list';
import FilmApiService from './movie_database_api';

const apiRequest = new FilmApiService();
const movieArr = apiRequest.fetchTrendingMovies();

apiRequest.incrementPage();
