import { refs } from './refs';

refs.footerCloseBtn.addEventListener('click', onCloseBtn);
refs.footerModalBackdrop.addEventListener('click', onCloseBackdrop);

function onCloseBtn(e) {
  e.preventDefault();
  refs.footerModalBackdrop.classList.remove('is-hidden');
  refs.body.classList.add('modal-open');

  if (e.target !== e.currentTarget) {
    refs.footerModalBackdrop.classList.add('is-hidden');
    refs.body.classList.remove('modal-open');
  }
}

function onCloseBackdrop(e) {
  if (e.target === e.currentTarget) {
    refs.footerModalBackdrop.classList.add('is-hidden');
    refs.body.classList.remove('modal-open');
  }
}
