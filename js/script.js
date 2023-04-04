const menuBar = document.querySelector(".menu");
const list = document.querySelector(".list");
const submitBtn = document.querySelector(".submitBtn");
const subscribeBtn = document.querySelector(".subscribe-btn");
const banner = document.querySelector("#banner");
const articleCards = document.querySelectorAll(".experience-cards .card");
const swiperCards = document.querySelectorAll(".swiper-slide");
const swiperText = document.querySelector(".swiper-text");
const swiperBtnNext = document.querySelector(".swiper-button-next");
const swiperBtnPrev = document.querySelector(".swiper-button-prev");

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
    fetch("http://localhost:5000/post-data", {
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

subscribeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let validRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (
    subscribeForm.email.value.trim().length > 0 &&
    subscribeForm.email.value.match(validRegex)
  ) {
    fetch("http://localhost:5000/newsletter", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: `id=${Date.now()}&email=${subscribeForm.email.value}`,
    }).then((res) => {
      console.log("Request complete! response:", res);

      subscribeForm.email.value = "";
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

  swiperText.querySelector(".subHeading").textContent =
    carouselData.data[0].subHeading;
  swiperText.querySelector(".heading").textContent =
    carouselData.data[0].heading;
  swiperText.querySelector(".rate").textContent = carouselData.data[0].rate;
  swiperText.querySelector(".description").textContent =
    carouselData.data[0].description;
  swiperText.querySelector(".bed").textContent = carouselData.data[0].bed;
  swiperText.querySelector(".capacity").textContent =
    carouselData.data[0].capacity;
  swiperText.querySelector(".roomSize").textContent =
    carouselData.data[0].roomSize;
  swiperText.querySelector(".view").textContent = carouselData.data[0].view;

  function swiperChange() {
    for (let index = 0; index < swiperCards.length; index++) {
      if (swiperCards[index].classList.contains("swiper-slide-active")) {
        console.log("hi");
        swiperText.querySelector(".subHeading").textContent =
          carouselData.data[index].subHeading;
        swiperText.querySelector(".heading").textContent =
          carouselData.data[index].heading;
        swiperText.querySelector(".rate").textContent =
          carouselData.data[index].rate;
        swiperText.querySelector(".description").textContent =
          carouselData.data[index].description;
        swiperText.querySelector(".bed").textContent =
          carouselData.data[index].bed;
        swiperText.querySelector(".capacity").textContent =
          carouselData.data[index].capacity;
        swiperText.querySelector(".roomSize").textContent =
          carouselData.data[index].roomSize;
        swiperText.querySelector(".view").textContent =
          carouselData.data[index].view;
      }
    }
  }
  swiperBtnNext.addEventListener("click", () => {
    swiperChange();
  });
  swiperBtnPrev.addEventListener("click", () => {
    swiperChange();
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

(() => {
  let today = new Date().toISOString().split("T")[0];
  document.querySelectorAll("[type=date]").forEach((item) => {
    item.setAttribute("min", today);
  });
})();

document.querySelectorAll("[type=date]")[1  ].addEventListener("click", () => {
  if (form.checkin.value.trim().length > 0) {
    console.log(form.checkin.value);
    document
      .querySelectorAll("[type=date]")[1]
      .setAttribute("min", form.checkin.value);
  }
});

document.querySelectorAll("[type=date]")[0].addEventListener("click", () => {
  if (form.checkout.value.trim().length > 0) {
    document
      .querySelectorAll("[type=date]")[0]
      .setAttribute("max", form.checkout.value);
  }
});
