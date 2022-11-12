// ////////////////     функція розмітки  \\\\\\\\\\\\

// export default function createTrailerMarkup(element, key) {
//   element.insertAdjacentHTML(
//     'afterbegin',
//     `<iframe
//           class="trailer__video"
//           src="https://www.youtube.com/embed/${key}?&autoplay=1"
//           title="YouTube video player"
//           frameborder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// 					allowautoplay
//           allowfullscreen
//         ></iframe>`
//   );
// }

// /////////////    запит на сервер  664469 це id фильму \\\\\\\\\\\\\\\

// function fetchTrailerVideo()

// {	apiRequest.fetchTrailerVideo(664469).then(res => {
// 		createTrailerMarkup(refs.filmList, res.data.results[0].key);
// 		console.log(res.data.results[0].key);
// 	});}

// ///////////////  функція  відкриття  вікна і тд  \\\\\\\\\\\\\\\\\\

// import Notiflix from 'notiflix';
// import fetchTrailerVideo from './fetchTrailerVideo';
// import createTrailerMarkup from './markups/createTrailerMarkup';

// export default async function viewTrailer(trailerId) {
//   const refs = {
//     btnViewTrailer: document.querySelector('.trailer-button--view'),
//     btnCloseTrailer: document.querySelector('.trailer-button--close'),
//     trailer: document.querySelector('.trailer'),
//   };

//   refs.btnViewTrailer.addEventListener('click', onClickTrailerBtnView);
//   refs.btnCloseTrailer.addEventListener('click', onClickTrailerBtnClose);

//   async function onClickTrailerBtnView() {
//     try {
//       const resp = await fetchTrailerVideo(trailerId);
//       const { results } = resp.data;

//       if (results.length === 0) {
//         Notiflix.Notify.info('Sorry, no trailer found!');
//         return;
//       }

//       const keyVideo = results[0].key;
//       refs.trailer.classList.add('is-view');
//       refs.btnCloseTrailer.classList.remove('is-hidden');
//       refs.btnViewTrailer.classList.add('is-hidden');

//       createTrailerMarkup(refs.trailer, keyVideo);
//     } catch (error) {
//       Notiflix.Notify.failure(error.message);
//     }
//   }

//   async function onClickTrailerBtnClose() {
//     try {
//       refs.trailer.classList.remove('is-view');
//       refs.trailer.innerHTML = '';
//       refs.btnCloseTrailer.classList.add('is-hidden');
//       refs.btnViewTrailer.classList.remove('is-hidden');
//     } catch (error) {
//       Notiflix.Notify.failure(error.message);
//     }
//   }
// }
