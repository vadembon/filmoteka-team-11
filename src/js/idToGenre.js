import { genres, genresUa } from './genres';
// import genresUa from './genres';

function idToGenre(id) {
  const ar = [];
  genres.map(el => {
    if (ar.length >= 2) return;
    if (id.includes(el.id)) ar.push(el.name);
  });
  return ar;
}

console.log(idToGenre([99, 18, 10751, 10402, 53]));

function idToGenreUa(id) {
  return genresUa.filter(el => {
    if (el.id === id) return el.name;
  })[0];
}

console.log(idToGenreUa(99).name);
