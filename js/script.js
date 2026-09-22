const confetti = document.getElementById("confetti");
const replay = document.getElementById("replay");

const nameInput = document.getElementById("nameInput");
const startBtn = document.getElementById("startBtn");
const nameBox = document.getElementById("nameBox");
const birthdayName = document.getElementById("birthdayName");

const shareBox = document.getElementById("shareBox");
const copyBtn = document.getElementById("copyBtn");
const copyMessage = document.getElementById("copyMessage");

const card = document.querySelector(".card");


// =====================================================
// URL থেকে নাম নেওয়া
// =====================================================

const params = new URLSearchParams(window.location.search);
const savedName = params.get("name");


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
      colors[Math.floor(Math.random() * colors.length)];

    const left = Math.random() * 100;
    const delay = Math.random() * 4;
    const duration = 4 + Math.random() * 5;
    const rotation = Math.random() * 360;

    piece.style.left = `${left}%`;
    piece.style.background = color;
    piece.style.animationDuration = `${duration}s`;
    piece.style.animationDelay = `${delay}s`;
    piece.style.transform = `rotate(${rotation}deg)`;

    confetti.appendChild(piece);
  }
}


// =====================================================
// BIRTHDAY START
// =====================================================

function startBirthday(name) {

  birthdayName.textContent = `${name} ♥ ♥`;

  nameBox.style.display = "none";

  birthdayName.style.display = "block";

  card.classList.remove("waiting");

  createConfetti();
}


// =====================================================
// CREATE BUTTON
// =====================================================

startBtn.addEventListener("click", () => {

  const name = nameInput.value.trim();

  if (!name) {
    nameInput.focus();
    return;
  }

  // URL তৈরি
  const newUrl =
    `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(name)}`;

  // Browser URL পরিবর্তন
  window.history.pushState({}, "", newUrl);

  // Birthday শুরু
  startBirthday(name);

  // Copy section দেখাবে
  shareBox.style.display = "flex";
});


// =====================================================
// COPY LINK
// =====================================================

copyBtn.addEventListener("click", async () => {

  try {

    await navigator.clipboard.writeText(
      window.location.href
    );

    copyMessage.textContent = "✅ Link copied!";

    setTimeout(() => {
      copyMessage.textContent = "";
    }, 2000);

  } catch (error) {

    copyMessage.textContent =
      "Copy করা যায়নি। URL থেকে copy করো।";
  }
});


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


replay.addEventListener(
  "click",
  replayAnimation
);


// =====================================================
// INITIAL STATE
// =====================================================

if (savedName) {

  // URL-এ নাম থাকলে সরাসরি Birthday দেখাবে
  startBirthday(savedName);

} else {

  // URL-এ নাম না থাকলে animation বন্ধ থাকবে
  card.classList.add("waiting");

  confetti.innerHTML = "";
}