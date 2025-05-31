document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("easterEggForm");
  const input = document.getElementById("interactInput");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const value = input.value.trim().toLowerCase();

    handleCommand(value);
    input.value = "";
  });

  function handleCommand(command) {
    switch (command) {
      case "hello":
        speakAsAvatar("Hi there!");
        break;
      case "hi barbie":
        speakAsAvatar("Hi Ken!");
        break;
      case "scooby doo":
        speakAsAvatar("Where are you?");
        break;
      case "execute order 66":
        speakAsAvatar("Good soldier, follow orders.");
        break;
      case "ripley":
        speakAsAvatar("I Got You, You Son Of A Bitch!");
        break;
      case "springtrap":
        speakAsAvatar("I always Come back!");
        break;
      case "are you an ai?":
        speakAsAvatar(
          "Mate , he can barely write my code. let alone write an entire ai "
        );
        break;
      case "who are you?":
        speakAsAvatar(
          "I am an unown mythical being, HE calls me Project:Dalo .But i disagree, i dont need a name."
        );
        break;
      case "who's helih?":
        speakAsAvatar(
          "Why did you have to bring up my ex wife? She's still a good friend however."
        );
        break;
      case "paimon":
        speakAsAvatar("did you mean: emergency food?");
        break;
      case "horror":
        triggerHorrorMode();
        speakAsAvatar("Something feels... wrong.");
        break;

      default:
        speakAsAvatar("I don't know that , try something again.");
        break;
    }
  }

  function speakAsAvatar(text) {
    const avatar = document.getElementById("avatar");
    const bubble = document.getElementById("speech-bubble");
    const sound1 = document.getElementById("talk-sound-1");
    const sound2 = document.getElementById("talk-sound-2");
    const sound3 = document.getElementById("talk-sound-3");
    const eyeImg = document.getElementById("avatar-eyes");
    const buddyImg = document.getElementById("avatar-mobile");

    if (!avatar || !bubble) return;

    avatar.classList.add("talking");
    eyeImg?.classList.add("talking");
    buddyImg?.classList.add("talking");
    bubble.style.display = "block";
    bubble.textContent = text;

    const sounds = [sound1, sound2, sound3].filter(Boolean);
    const sound = sounds[Math.floor(Math.random() * sounds.length)];

    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }

    setTimeout(() => {
      avatar.classList.remove("talking");
      eyeImg?.classList.remove("talking");
      buddyImg?.classList.remove("talking");
      bubble.style.display = "none";
    }, 5000);
  }
  function triggerHorrorMode() {
    const horrorOverlay = document.createElement("div");
    horrorOverlay.id = "horror-overlay";
    Object.assign(horrorOverlay.style, {
      position: "fixed",
      top: "-50px",
      left: "-50px",
      width: "1000vw",
      height: "1000vh",
      backgroundColor: "black",
      zIndex: "9998",
      opacity: "0",
      transition: "opacity 0.5s ease",
      pointerEvents: "none",
      mixBlendMode: "difference",
    });

    const scareImage = document.createElement("img");
    scareImage.src = "assets/scare.png";
    scareImage.alt = "Scary Face";
    Object.assign(scareImage.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "80%",
      maxHeight: "80%",
      zIndex: "10000",
      opacity: "0",
      transition: "opacity 0.2s ease",
      pointerEvents: "none",
    });

    document.body.appendChild(horrorOverlay);

    const horrorSound = document.getElementById("horror-sound");
    if (horrorSound) {
      horrorSound.currentTime = 0;
      horrorSound.play();
    }

    requestAnimationFrame(() => {
      horrorOverlay.style.opacity = "0.95";
      scareImage.style.opacity = "1";
      document.body.classList.add("screen-shake");
    });

    setTimeout(() => {
      scareImage.style.opacity = "0";
      horrorOverlay.style.opacity = "0";
      document.body.classList.remove("screen-shake");

      setTimeout(() => {
        scareImage.remove();
        horrorOverlay.remove();
      }, 500);
    }, 3500);
  }
});
