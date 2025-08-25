const modalClass = document.querySelector(".modal");
const overlayContent = document.querySelector(".overlay");

const modal = () => {
  modalClass.classList.toggle("hidden");
  overlayContent.classList.toggle("hidden");
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalClass.classList.contains('hidden')) {
    modal();
  }
});