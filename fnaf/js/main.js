document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".scroll-container");
  const officeImage = document.querySelector(".office-image");

  officeImage.onload = () => {
    const imageWidth = officeImage.clientWidth;
    const containerWidth = scrollContainer.clientWidth;

    scrollContainer.scrollLeft = (imageWidth - containerWidth) / 2;
  };

  let scrollSpeed = 0;

  function updateScroll() {
    scrollContainer.scrollLeft += scrollSpeed;
    requestAnimationFrame(updateScroll);
  }

  document.addEventListener("mousemove", (e) => {
    const edgeSize = 100;
    const maxSpeed = 2700;
    const mouseX = e.clientX;
    const width = window.innerWidth;

    if (mouseX < edgeSize) {
      scrollSpeed = -((edgeSize - mouseX) / edgeSize) * maxSpeed;
    } else if (mouseX > width - edgeSize) {
      scrollSpeed = ((mouseX - (width - edgeSize)) / edgeSize) * maxSpeed;
    } else {
      scrollSpeed = 0;
    }
  });
  updateScroll();

  window.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("ambience1");
    if (audio) {
      audio.volume = 0.6; // Set volume between 0.0 and 1.0
    }
  });
});
