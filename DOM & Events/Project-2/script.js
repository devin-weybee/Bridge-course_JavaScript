const show = document.querySelectorAll(".show-modal");
const close = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const overlayContent = document.querySelector(".overlay");

const openModal = function () {
  modal.classList.remove("hidden");
  overlayContent.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlayContent.classList.add("hidden");
};

for (let i = 0; i < show.length; i++){
    show[i].addEventListener("click", openModal);
}

close.addEventListener("click", closeModal);
overlayContent.addEventListener("click", closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});