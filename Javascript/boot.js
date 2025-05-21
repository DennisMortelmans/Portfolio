const bootLines = [
  "Booting system......",
  "Copyright Dennis.M",
  "All Rights Reserved",
  "",
  "Initializing Screen.",
  "Your Screen Size: Fine I Guess.....",
  "Keyboard Detected",
  "Detecting Motivation...   ",
  "Detecting Curiosity..",
  "SHUT UP......",
  "NO...",
  "Loading Avatar Hub",
  "Generating ideas...",
  "",
  "Booting from Somewhere...",
  "Wait I Am Not Ready Yet",
  "Inserting Avatar Overlay...",
  "",
  "Loading...",
];

const bootScreen = document.getElementById("boot-screen");
let i = 0;

function typeLine() {
  if (i < bootLines.length) {
    bootScreen.innerHTML += bootLines[i] + "\n";
    i++;
    setTimeout(typeLine, 300);
  } else {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  }
}

window.onload = typeLine;
