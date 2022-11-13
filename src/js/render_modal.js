// import { refs } from './refs';

// const lang = localStorage.getItem('language');

// function transformModal(object, lang) {
//   // console.log('transform', arrObj);
//   if (lang === 'en-US') {
//     object.map(object => {
//       let i = 0;
//       object.genres_name = object.genres
//         .map(el => {
//           i += 1;
//           return i >= 3 ? 'Other' : el.name;
//         })
//         .slice(0, 3);
//       object.release_date = object.release_date.slice(0, 4);
//       object.poster_path = ` https://image.tmdb.org/t/p/w500${object.poster_path}`;
//       object.vote_average = !object.vote_average
//         ? ''
//         : object.vote_average.toFixed(1);
//       console.log(object.genres_name);
//       return object;
//     });
//   }

//   if (lang === 'uk-UA') {
//     let i = 0;
//     object.genres_name = object.genres
//       .map(el => {
//         i += 1;
//         return i >= 3 ? 'Інші' : el.name;
//       })
//       .slice(0, 3);
//     object.release_date = object.release_date.slice(0, 4);
//     object.poster_path = ` https://image.tmdb.org/t/p/w500${object.poster_path}`;
//     object.vote_average = !object.vote_average
//       ? ''
//       : object.vote_average.toFixed(1);

//     // console.log('TRANSFORM', arrObj);
//     return object;
//   }
// }

//  const removeString = lang === 'en-US' ? 'remove' : 'видалити';
//  const watchedString =
//   lang === 'en-US' ? 'add to watched' : 'додати до переглянутого';
//  const queueString =
//   lang === 'en-US' ? 'add to queue' : 'додати до черги';
