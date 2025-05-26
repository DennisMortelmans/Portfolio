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
    }, 5000); // shorter time for command response
  }
});
