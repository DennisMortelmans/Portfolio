const bootLines = [
  "Fazbear Security Terminal v1.0",
  "Booting up...",
  "",
  "",
  "",
  "Loading camera feed: 1A... ✓",
  "Loading camera feed: 1B... ✓",
  "",
  "",
  "Stage Lights... ONLINE",
  "Audio System... MALFUNCTION",
  "Code by: https://github.com/irv77/hd_fnaf/tree/main?tab=readme-ov-file",
  "",
  "PLEASE NOTE THIS IS BY ALL MEANS MEANT AS A EASTER EGG",
  "Timer reset: 12:00 AM",
  "",
  "Security Log Status: UNREAD ENTRIES",
  "AI Response: SILENT MODE ENABLED",
  "",
  "Note: Keep doors operational.",
  "",
  "Press CONTINUE to access security feed.",
];

const bootScreen = document.getElementById("boot-screen");
let i = 0;

function typeLine() {
  if (i < bootLines.length) {
    bootScreen.innerHTML += bootLines[i] + "\n";
    i++;
    setTimeout(typeLine, 100);
  } else {
    // After all lines are typed, show the button
    showContinueButton();
  }
}

function showContinueButton() {
  const button = document.createElement("button");
  button.textContent = "Continue";
  button.className = "glow-button";

  button.onclick = () => {
    window.location.href = "./games/1/index.html";
  };

  bootScreen.appendChild(document.createElement("br"));
  bootScreen.appendChild(button);
}

window.onload = typeLine;
