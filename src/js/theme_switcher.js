import { refs } from './refs';

let themeStatus = localStorage.getItem('theme');
themeStatus = !themeStatus ? 'light' : themeStatus;
localStorage.setItem('theme', themeStatus);

refs.themeToggle.addEventListener('change', themeToggleHandler);

function themeToggleHandler(evt) {
  evt.preventDefault();
  const status = themeStatus;
  themeStatus = status === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', themeStatus);

  if (themeStatus === 'dark') {
    darkTheme();
  } else {
    lightTheme();
  }
}

export function lightTheme() {
  refs.themeToggle.removeAttribute('checked');

  refs.watchBtn.classList.remove('dark');
  refs.queueBtn.classList.remove('dark');
  refs.closeModalBtn.classList.remove('dark');
  refs.modalContainer.classList.remove('dark');
  refs.containerGallery.classList.remove('dark');
  refs.footer.classList.remove('dark');
  refs.body.classList.remove('dark');
  refs.filmList.classList.remove('dark');

  // refs.body.classList.add('light');
}

export function darkTheme() {
  refs.themeToggle.setAttribute('checked', 'checked');
  // refs.body.classList.remove('light');
  refs.watchBtn.classList.add('dark');
  refs.queueBtn.classList.add('dark');
  refs.closeModalBtn.classList.add('dark');
  refs.modalContainer.classList.add('dark');
  refs.containerGallery.classList.add('dark');
  refs.footer.classList.add('dark');
  refs.body.classList.add('dark');
  refs.filmList.classList.add('dark');
}
