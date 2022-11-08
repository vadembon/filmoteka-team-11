
(() => {
    const refss = {
    //   openModalBtn: document.querySelector(".card__link"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]")
    };
  
    // refss.openModalBtn.addEventListener("click", toggleModal);
    refss.closeModalBtn.addEventListener("click", toggleModal);
  
    function toggleModal() {
      refss.modal.classList.toggle("is-hidden");
    }
  })();