const menuBar = document.querySelector(".menu");
const list = document.querySelector(".list");
const submitBtn = document.querySelector(".submitBtn");
const banner = document.querySelector("#banner");
const articleCards = document.querySelectorAll(".experience-cards .card");
const swiperCards = document.querySelectorAll(".swiper-slide");
const swiperText = document.querySelectorAll(".swiper-text");
const carousel = document.querySelector(".carousel");

var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

menuBar.addEventListener("click", () => {
  list.classList.toggle("hidden");
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    form.checkin.value.trim().length > 0 &&
    form.checkout.value.trim().length > 0 &&
    form.adults.value.trim().length > 0 &&
    form.children.value.trim().length > 0
  ) {
    fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: `id=${Date.now()}&checkInDate=${form.checkin.value}&checkOutDate=${
        form.checkout.value
      }&noOfAdults=${form.adults.value}&noOfchildren=${form.children.value}`,
    }).then((res) => {
      console.log("Request complete! response:", res);
      submitBtn.textContent = "✓";
      form.checkin.value = "";
      form.checkout.value = "";
      form.adults.value = "";
      form.children.value = "";
      setTimeout(() => {
        submitBtn.textContent = "Submit";
      }, 5000);
    });
  } else {
    alert("fields are empty");
  }
});

function addBanner(bannerData) {
  banner.style.backgroundImage = ` url(${bannerData.data[0].imageSource.toString()})`;
  banner.querySelector("h1").textContent = bannerData.data[0].heading;
  banner.querySelector("p").textContent = bannerData.data[0].description;
}

function addArticles(articleData) {
  articleCards.forEach((card, index) => {
    card.querySelector("img").src = articleData.data[index].imageURL;
    card.querySelector(".heading").textContent =
      articleData.data[index].cardSubHeading;
    card.querySelector(".subheading").textContent =
      articleData.data[index].cardHeading;
    card.querySelector(".content").textContent =
      articleData.data[index].cardContent;
  });
}

function addCarousel(carouselData) {
  swiperCards.forEach((card, index) => {
    card.querySelector("img").src = carouselData.data[index].imageURL;
  });

  swiperText.forEach((text, index) => {
    text.querySelector(".subHeading").textContent =
      carouselData.data[index].subHeading;
    text.querySelector(".heading").textContent =
      carouselData.data[index].heading;
    text.querySelector(".rate").textContent = carouselData.data[index].rate;
    text.querySelector(".description").textContent =
      carouselData.data[index].description;
    text.querySelector(".bed").textContent = carouselData.data[index].bed;
    text.querySelector(".capacity").textContent =
      carouselData.data[index].capacity;
    text.querySelector(".roomSize").textContent =
      carouselData.data[index].roomSize;
    text.querySelector(".view").textContent = carouselData.data[index].view;
  });
}

(async () => {
  await fetch("http://localhost:5000/landing")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      addBanner(data);
    });
})();

(async () => {
  await fetch("http://localhost:5000/article")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      addArticles(data);
    });
})();

(async () => {
  await fetch("http://localhost:5000/carousel")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      addCarousel(data);
    });
})();

carousel.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("swiper-button-next") ||
    e.target.classList.contains("swiper-button-prev")
  ) {
    swiperText.forEach((text) => {
      text.classList.toggle("hidden");
    });
  }
});
