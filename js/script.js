const banner = document.querySelector("#banner");

let bannerText = `<h1 class="text-6xl text-white mb-10 font-light">Enjoy your <br> dream vacation</h1>
<p class="text-white">Quite and endlessly beautiful hideaway</p>
<div class="mt-5"> <button class="bg-white p-4 text-black">About Us </button>
 <button class="text-white ml-7">View Homestay</button></div>
`;

(function addContent() {
  // banner.style.background= "url(.)"
  document.querySelector(".left-text").innerHTML = bannerText;
})();

var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });