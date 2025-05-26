const dataApp = (() => {
  let zIndex = 2000;
  let windowCount = 0;
  let dragData = null;
  const galleries = {};

  // ✅ Hardcoded image list with descriptions
  const images = [
    {
      src: "assets/images/data/berichten.png",
      title: "How many messages?",
    },
    {
      src: "assets/images/data/meldingen.png",
      title: "How many notifications?",
    },
    {
      src: "assets/images/data/work.png",
      title: "How many times do i loose track of time while working?",
    },
    { src: "assets/images/data/world.png", title: "Building a world?" },
    {
      src: "assets/images/data/youtube.png",
      title: "How much time do I spend on YouTube?",
    },
  ];
  function createWindow(title, content) {
    const desktop = document.getElementById("desktop");
    if (!desktop) return;

    const win = document.createElement("div");
    const windowId = `data-window-${windowCount++}`;
    win.classList.add("window", "data-window");
    win.id = windowId;
    win.style.right = `${120 + windowCount * 30}px`;
    win.style.top = `${120 + windowCount * 30}px`;
    win.style.zIndex = ++zIndex;

    win.innerHTML = `
      <div class="title-bar">
        <span>${title}</span>
        <div class="window-controls">
          <button onclick="dataApp.closeWindow(this)">×</button>
        </div>
      </div>
      <div class="window-content">${content}</div>
    `;

    win.querySelector(".title-bar").onmousedown = (e) => startDrag(e, win);
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
      setTimeout(() => win.remove(), 150);
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

  function createData(title = "Fun Facts!") {
    if (images.length === 0) return;
    const winId = `data-gallery-${Date.now()}`;

    const content = `
      <div class="gallery-window" id="${winId}">
        <div class="loading-bar-container"><div class="loading-bar"></div></div>
        <p class="loading-text">Loading...</p>
<div class="gallery-img-wrapper">
  <img src="" data-src="${images[0].src}" alt="" class="gallery-img" />
</div>
        <p class="gallery-title">${images[0].title}</p>
        <div class="gallery-controls">
          <button onclick="dataApp.prevImage('${winId}')">⬅</button>
          <button onclick="dataApp.nextImage('${winId}')">➡</button>
        </div>
      </div>
    `;

    createWindow(title, content);
    galleries[winId] = { index: 0, images };

    const img = document.querySelector(`#${winId} .gallery-img`);
    const loadingText = document.querySelector(`#${winId} .loading-text`);
    const bar = document.querySelector(`#${winId} .loading-bar-container`);

    setTimeout(() => {
      img.src = img.dataset.src;
      img.onload = () => {
        loadingText.textContent = "Loaded!";
        setTimeout(() => {
          loadingText.style.display = "none";
          bar.style.display = "none";
          img.style.display = "block";
        }, 500);
      };
    }, Math.random() * 0 + 0);
  }

  function update(winId) {
    const g = galleries[winId];
    const el = document.getElementById(winId);
    if (!g || !el) return;

    const image = g.images[g.index];
    el.querySelector(".gallery-img").src = image.src;
    el.querySelector(".gallery-title").textContent = image.title;
  }

  function prevImage(winId) {
    const g = galleries[winId];
    if (!g) return;
    g.index = (g.index - 1 + g.images.length) % g.images.length;
    update(winId);
  }

  function nextImage(winId) {
    const g = galleries[winId];
    if (!g) return;
    g.index = (g.index + 1) % g.images.length;
    update(winId);
  }

  // Optional avatar bubble for drawing gallery
  function setupDataAvatar() {
    const avatar = document.getElementById("avatar");
    const bubble = document.getElementById("data-speech-bubble");
    let timeout;
    let lastSound = 1;

    document.addEventListener("mouseover", (e) => {
      const img = e.target.closest(".gallery-img");
      if (!img || !img.closest(".data-window") || !avatar || !bubble) return;

      avatar.classList.add("talking");
      bubble.style.display = "block";

      const src = img.getAttribute("data-src") || img.getAttribute("src");
      const line = dataLines[src];
      bubble.textContent = line || "Just a sketch...";

      const sound = document.getElementById(`talk-sound-${lastSound}`);
      lastSound = lastSound === 3 ? 1 : lastSound + 1;
      if (sound) {
        sound.currentTime = 0;
        sound.play();
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        avatar.classList.remove("talking");
        bubble.style.display = "none";
      }, 8000);
    });

    document.addEventListener("mouseout", (e) => {
      if (
        e.target.closest(".gallery-img") &&
        e.target.closest(".data-window")
      ) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          avatar.classList.remove("talking");
          bubble.style.display = "none";
        }, 300);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", setupDataAvatar);

  return {
    createData,
    closeWindow,
    prevImage,
    nextImage,
  };
})();
