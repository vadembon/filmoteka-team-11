footerCloseBtn.addEventListener('click', onCloseBtn);
footerModalBackdrop.addEventListener('click', onCloseBackdrop);

function onCloseBtn (e) {
    e.prevent.Default();
    footerModalBackdrop.classList.remove('is-hidden');
    body.classList.add('modal-open');

    if (e.target !== e.currentTarget) {
    footerModalBackdrop.classList.add('is-hidden');
    body.classList.remove('modal-open');
    }
}


function onCloseBackdrop (e) {
    if (e.target === e.currentTarget) {
    footerModalBackdrop.classList.add('is-hidden');
    body.classList.remove('modal-open');
}
}
