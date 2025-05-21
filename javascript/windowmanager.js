const windowManager = (() => {
  let zIndex = 1000;
  let windowCount = 0;
  let dragData = null;
  const galleries = {};
  let avatarLines = {};

  fetch("assets/json/avatar-lines.json")
    .then((res) => res.json())
    .then((data) => {
      avatarLines = data;
    })
    .catch((err) => {
      console.error("Failed to load avatar lines:", err);
    });

  function createWindow(title, content) {
    const desktop = document.getElementById("desktop");
    const win = document.createElement("div");
    const windowId = `window-${windowCount++}`;
    win.classList.add("window");
    win.id = windowId;
    win.style.left = `${100 + windowCount * 30}px`;
    win.style.top = `${100 + windowCount * 30}px`;
    win.style.zIndex = ++zIndex;
    win.setAttribute("data-window-id", windowId);

    win.innerHTML = `
      <div class="title-bar">
        <span>${title}</span>
        <div class="window-controls">
          <button onclick="windowManager.closeWindow(this)">×</button>
        </div>
      </div>
      <div class="window-content">${content}</div>
    `;

    const titleBar = win.querySelector(".title-bar");
    titleBar.onmousedown = (e) => startDrag(e, win);

    desktop.appendChild(win);
  }

  function closeWindow(btn) {
    const win = btn.closest(".window");

    const sound = document.getElementById("close-sound");
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }

    if (win) {
      // Slight delay to let the sound finish if needed
      setTimeout(() => {
        win.remove();
      }, 150); // adjust delay to match sound length
    }
  }

  function startDrag(e, win) {
    dragData = {
      el: win,
      offsetX: e.clientX - win.offsetLeft,
      offsetY: e.clientY - win.offsetTop,
    };
    win.style.zIndex = ++zIndex;
    document.onmousemove = doDrag;
    document.onmouseup = stopDrag;
  }

  function doDrag(e) {
    if (!dragData) return;
    dragData.el.style.left = `${e.clientX - dragData.offsetX}px`;
    dragData.el.style.top = `${e.clientY - dragData.offsetY}px`;
  }

  function stopDrag() {
    document.onmousemove = null;
    document.onmouseup = null;
    dragData = null;
  }

  function createGalleryWindow(
    title = "Gallery <br> hover over the image for more info!",
    imageList = null
  ) {
    const images = imageList || [
      { src: "assets/images/packshot.png", title: "MIPA Packshot" },
      { src: "assets/images/hero.png", title: "MIPA Hero" },
      { src: "assets/images/instagram.png", title: "Typography Poster" },
      { src: "assets/images/MRC1.png", title: "Mobile Repair Center logo 1" },
      { src: "assets/images/MRC2.png", title: "Mobile Repair Center logo 2" },
      {
        src: "assets/images/footbal1.png",
        title: "Anti-discrimination poster",
      },
    ];

    const winId = `gallery-${Date.now()}`;

    // Gallery window structure with loading text and loading bar
    const content = `
    <div class="gallery-window" id="${winId}">
      <div class="loading-bar-container">
        <div class="loading-bar"></div>
      </div>
      <p class="loading-text">Loading images...</p>
<div class="gallery-img-wrapper">
  <img src="" data-src="${images[0].src}" alt="" class="gallery-img" />
</div>
      <p class="gallery-title">${images[0].title}</p>
      <div class="gallery-controls">
        <button onclick="windowManager.prevImage('${winId}')">⬅</button>
        <button onclick="windowManager.nextImage('${winId}')">➡</button>
      </div>
    </div>
  `;

    createWindow(title, content);
    galleries[winId] = { index: 0, images };

    const imgElement = document.querySelector(`#${winId} .gallery-img`);
    const loadingBar = document.querySelector(`#${winId} .loading-bar`);
    const loadingContainer = document.querySelector(
      `#${winId} .loading-bar-container`
    );
    const loadingText = document.querySelector(`#${winId} .loading-text`);

    // Simulate loading of the image with a delay
    setTimeout(() => {
      imgElement.src = imgElement.getAttribute("data-src");
      imgElement.onload = () => {
        loadingText.textContent = "";
        setTimeout(() => {
          loadingText.style.display = "none"; // Hide loading text
          loadingBar.style.display = "none"; // Hide loading bar
          loadingContainer.style.display = "none"; // Hide loading bar
          imgElement.style.display = "block"; // Show the image
        }, 500); // Delay to show "Image Loaded!" message
      };
    }, Math.random() * 0 + 0); // Random delay between 2 and 5 seconds
  }

  function updateGallery(winId) {
    const gallery = galleries[winId];
    const el = document.getElementById(winId);
    if (!gallery || !el) return;

    const { index, images } = gallery;
    el.querySelector(".gallery-img").src = images[index].src;
    el.querySelector(".gallery-title").textContent = images[index].title;
  }

  function prevImage(winId) {
    const gallery = galleries[winId];
    if (!gallery) return;
    gallery.index =
      (gallery.index - 1 + gallery.images.length) % gallery.images.length;
    updateGallery(winId);
  }

  function nextImage(winId) {
    const gallery = galleries[winId];
    if (!gallery) return;
    gallery.index = (gallery.index + 1) % gallery.images.length;
    updateGallery(winId);
  }
  document.addEventListener("DOMContentLoaded", () => {
    const clickSound = document.getElementById("open-sound");

    document.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (clickSound) {
          clickSound.currentTime = 0;
          clickSound.play();
        }
      });
    });
  });
  function setupAvatarInteraction() {
    const avatar = document.getElementById("avatar");
    const bubble = document.getElementById("speech-bubble");
    const sound1 = document.getElementById("talk-sound-1");
    const sound2 = document.getElementById("talk-sound-2");
    const sound3 = document.getElementById("talk-sound-3");
    const eyeImg = document.getElementById("avatar-eyes"); // Eyes element
    let talkingTimeout;
    let lastSoundPlayed = 0;
    let eyeMovementActive = true; // Flag to control eye movement

    // Only respond to gallery images
    document.addEventListener("mouseover", (e) => {
      const img = e.target.closest(".gallery-img");
      if (img) {
        avatar.classList.add("talking");
        eyeImg.classList.add("talking");
        bubble.style.display = "block";

        // Get the image title
        const imgSrc = img.getAttribute("src");
        const line = avatarLines[imgSrc];
        bubble.textContent = line || "Intresting...";

        // Alternate between three sounds
        const sound =
          lastSoundPlayed === 1
            ? sound2
            : lastSoundPlayed === 2
            ? sound3
            : sound1;

        lastSoundPlayed =
          lastSoundPlayed === 1 ? 2 : lastSoundPlayed === 2 ? 3 : 1;

        if (sound) {
          sound.currentTime = 0;
          sound.play();
        }

        // Clear and restart timeout
        clearTimeout(talkingTimeout);
        talkingTimeout = setTimeout(() => {
          avatar.classList.remove("talking");
          bubble.style.display = "none";
        }, 20000);
      }
    });

    // Stop animation when mouse leaves the gallery image
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(".gallery-img")) {
        clearTimeout(talkingTimeout);
        talkingTimeout = setTimeout(() => {
          avatar.classList.remove("talking");
          eyeImg.classList.remove("talking");
          bubble.style.display = "none";
        }, 500);
      }
    });

    document.addEventListener("mousemove", (e) => {
      if (!eyeImg || !avatar) return;

      // Get the center of the avatar's eyes
      const rect = eyeImg.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Get angle between mouse and center of the eyes (avatar)
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const degrees = angle * (180 / Math.PI);

      // If eye movement is active, rotate the eyes
      if (eyeMovementActive) {
        eyeImg.style.transform = `rotate(${degrees}deg)`;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", setupAvatarInteraction);

  return {
    createWindow,
    closeWindow,
    createGalleryWindow,
    prevImage,
    nextImage,
  };
})();
