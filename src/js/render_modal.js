import { refs } from './refs';

export function renderModal(obj) {
  // console.log('modal', obj);
  const lang = localStorage.getItem('language');
  const transObj = transformModal(obj, lang);
  console.log('modal', transObj);

  refs.modalImage.setAttribute('src', `${transObj.poster_path}`);
  refs.modalFilmTitle.textContent = transObj.title;
  refs.modalVoteAverage.textContent = transObj.vote_average;
  refs.modalVoteCount.textContent = transObj.vote_count;
  refs.modalPopularityValue.textContent = transObj.popularity;
  refs.modalOriginalTitleValue.textContent = transObj.original_title;
  refs.modalGenresValue.textContent = transObj.genres_name;
  refs.modalAboutValue.textContent = transObj.overview;
}

function transformModal(object, lang) {
  // console.log('transform', arrObj);
  if (lang === 'en-US') {
    let i = 0;
    object.genres_name = object.genres
      .map(el => {
        i += 1;
        return i >= 3 ? 'Other' : el.name;
      })
      .slice(0, 3);
    object.release_date = object.release_date.slice(0, 4);
    object.poster_path = ` https://image.tmdb.org/t/p/w500${object.poster_path}`;
    object.vote_average = !object.vote_average
      ? ''
      : object.vote_average.toFixed(1);
    console.log(object.genres_name);
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
    object.poster_path = ` https://image.tmdb.org/t/p/w500${object.poster_path}`;
    object.vote_average = !object.vote_average
      ? ''
      : object.vote_average.toFixed(1);

    // console.log('TRANSFORM', arrObj);
    return object;
  }
}
