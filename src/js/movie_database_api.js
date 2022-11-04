import axios from 'axios';

// const axios = require('axios');
const API_KEY = 'ec34284630374f864ce40bf102f3f73e';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class FilmApiService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
  }

  async fetchTrendingMovies() {
    const url = `${BASE_URL}/trending/movie/day?`;

    try {
      const trendingData = await axios.get(url, {
        params: { api_key: API_KEY, language: 'en-US', page: this.pageNumber },
      });
      return trendingData;
    } catch {
      error => console.log(error);
    }
  }

  async fetchSearchMovie() {
    const url = `${BASE_URL}/search/movie/?`;

    try {
      const searchingData = await axios.get(url, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          query: this.searchQuery,
        },
      });
      return searchingData;
    } catch {
      error => console.log(error);
    }
  }

  async fetchMoviesDetails(id) {
    const url = `${BASE_URL}/movie/${id}?`;
    try {
      const details = await axios.get(url, {
        params: { api_key: API_KEY, language: 'en-US' },
      });
      return details;
    } catch {
      error => console.log(error);
    }
  }

  async fetchGenres() {
    const postBaseUrl = '/genre/movie/list?';
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      language: 'en-US',
    });
    try {
      const genres = await axios.get(
        `${BASE_URL}${postBaseUrl}${searchParams}`
      );
      return genres.then(res => {
        return res.data.genres;
      });
    } catch {
      error => console.log(error);
    }
  }

  incrementPage() {
    this.pageNumber += 1;
  }

  decrementPage() {
    this.pageNumber -= 1;
  }

  resetPage() {
    this.pageNumber = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
