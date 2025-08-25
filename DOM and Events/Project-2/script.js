const modal = document.querySelector(".modal");
const overlayContent = document.querySelector(".overlay");

const openModal = () => {
  modal.classList.remove("hidden");
  overlayContent.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlayContent.classList.add("hidden");
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});