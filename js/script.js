const confetti = document.getElementById("confetti");
const replay = document.getElementById("replay");


// =====================================================
// CONFETTI
// =====================================================

const colors = [
  "#ff4d91",
  "#ffb52e",
  "#7c4dff",
  "#00d9ff",
  "#ffffff",
  "#ff7a00"
];


function createConfetti() {

  confetti.innerHTML = "";

  for (let i = 0; i < 55; i++) {

    const piece = document.createElement("span");

    const color =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];

    const left =
      Math.random() * 100;

    const delay =
      Math.random() * 4;

    const duration =
      4 + Math.random() * 5;

    const rotation =
      Math.random() * 360;

    piece.style.left = `${left}%`;

    piece.style.background = color;

    piece.style.animationDuration =
      `${duration}s`;

    piece.style.animationDelay =
      `${delay}s`;

    piece.style.transform =
      `rotate(${rotation}deg)`;

    confetti.appendChild(piece);
  }
}


// =====================================================
// REPLAY
// =====================================================

function replayAnimation() {

  const elements = document.querySelectorAll(
    ".layer-1, .layer-2, .layer-3, .candle-wrap, .happy, .love"
  );

  elements.forEach((element) => {

    element.style.animation = "none";

    void element.offsetWidth;

    element.style.animation = "";

  });

  createConfetti();
}


// =====================================================
// BUTTON
// =====================================================

replay.addEventListener(
  "click",
  replayAnimation
);


// =====================================================
// START
// =====================================================

createConfetti();