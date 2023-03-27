const menubar = document.querySelector(".menu");
const list = document.querySelector(".list");

var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

menubar.addEventListener("click", () => {
  list.classList.toggle("hidden");
});
