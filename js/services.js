const articleCards = document.querySelectorAll(".experience-cards .card");

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

(async () => {
  await fetch("http://localhost:5000/article")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      addArticles(data);
    });
})();
