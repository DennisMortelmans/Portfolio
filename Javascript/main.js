/* Sidebar*/
function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("productimages").style.marginRight = "300px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("productimages").style.marginRight = "0";
}
/*comments*/
const reviewForm = document.querySelector("#review-form");
const reviews = document.querySelector("#feedbackrow");

console.log(reviewForm ?? "not found");
if (reviewForm) reviewForm.onsubmit = postReview;
function postReview(event) {
  const data = new FormData(reviewForm);
  let user = data.get("username");
  const review = data.get("feedback");
  console.log(user);

  let newReview = ` 
    <li>
        <h3 >${user}:</h3>
        <p>${review}</p>
    </li>
  `;

  reviews.innerHTML += newReview;
  event.preventDefault();
}

/* wishlister*/
let wishAdderButtons = document.getElementsByClassName("wishAdder");
for (const button of wishAdderButtons)
  button.addEventListener("click", toggleClicked);

function toggleClicked(event) {
  event.target.classList.toggle("wishAdderClicked");
}
/* product slider */
const images = ["../assets/images/packshot.Png", "../assets/images/Hero.png"];

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const productImage = document.getElementById("product-image");
  const nextBtn = document.getElementById("next-image");

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    productImage.src = images[currentIndex];
  });
});
