(function () {
  const imageUrls = [
    "assets/images/effects/neolight.png",
    "assets/images/effects/neosquare.png",
    "assets/images/effects/neosun.png",
    "assets/images/effects/neosunset.png",
    "assets/images/effects/neowarp.png",
    "assets/images/effects/neocity.png",
    "assets/images/effects/neoframe.png",
    "assets/images/effects/neogrid.png",
    "assets/images/effects/neosuncity.png",
    "assets/images/effects/neotunnel.png",
    "assets/images/effects/neowave.png",
    "assets/images/effects/neowave2.png",
    "assets/images/effects/neococktail.png",
    "assets/images/effects/neoface.png",
    "assets/images/effects/neoerror.png",
    "assets/images/effects/neogrid2.png",
    "assets/images/effects/neoheart.png",
    "assets/images/effects/neomusic.png",
    "assets/images/effects/neotriangle.png",
    "assets/images/effects/neotriangle2.png",
    "assets/images/effects/neosun2.png",
    "assets/images/effects/neoswirl.png",
  ];

  const bg1 = document.createElement("div");
  const bg2 = document.createElement("div");
  bg1.className = bg2.className = "floating-vaporwave";
  document.body.appendChild(bg1);
  document.body.appendChild(bg2);

  function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  function flicker() {
    const current = Math.random() > 0.5 ? bg1 : bg2;
    const img = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    const tx = randomFloat(-10, 10);
    const ty = randomFloat(-10, 10);
    const scale = randomFloat(1.01, 1.05);

    current.style.backgroundImage = `url('${img}')`;
    current.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    current.style.opacity = randomFloat(0.45, 0.7);
    current.style.transition = "opacity 3s ease";
    setTimeout(() => {
      current.style.opacity = 0;
    }, randomFloat(4000, 6000));

    setTimeout(flicker, randomFloat(4000, 5000));
  }

  flicker();
})();
