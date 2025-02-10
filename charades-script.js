const startTimerButton = document.getElementById("startTimer");
const stopTimerButton = document.getElementById("stopTimer");
const resetTimerButton = document.getElementById("resetTimer");
const timerMinutesInput = document.getElementById("timerMinutes");
const timerDisplay = document.getElementById("time");
const wordSection = document.getElementById("wordSection");
const wordDisplay = document.getElementById("wordDisplay");
const successButton = document.getElementById("successButton");
const passButton = document.getElementById("passButton");
const resultsSection = document.getElementById("resultsSection");
const successCountDisplay = document.getElementById("successCount");
const playAgainButton = document.getElementById("playAgain");
const timerControls = document.getElementById("timerControls");
const liveSuccessNumber = document.getElementById("liveSuccessNumber");

let timer;
let timeRemaining;
let successCount = 0;
let currentWordIndex = 0;
let words = []; // Initialize an empty array for words

// Fetch the words from the JSON file
fetch('words.json')
  .then(response => response.json())
  .then(data => {
    words = data.words; // Assign the words from the JSON file
  })
  .catch(error => console.error('Error loading words:', error));

// Start the timer
startTimerButton.addEventListener("click", () => {
  const minutes = parseInt(timerMinutesInput.value);

  if (!minutes || minutes < 1 || minutes > 5) {
    alert("Please enter a valid number of minutes (1–5).");
    return;
  }

  timeRemaining = minutes * 60; // Convert minutes to seconds
  startTimerButton.style.display = "none"; // Hide Start Timer button
  timerControls.style.display = "flex"; // Show Stop and Reset buttons
  timerMinutesInput.disabled = true;
  wordSection.style.display = "block";

  // Shuffle the words array
  shuffleArray(words);

  startTimer();
  showNextWord();
});

// Stop the timer
stopTimerButton.addEventListener("click", () => {
  clearInterval(timer);
  startTimerButton.style.display = "block"; // Show Start Timer button
  timerControls.style.display = "none"; // Hide Stop and Reset buttons
});

// Reset the timer
resetTimerButton.addEventListener("click", () => {
  clearInterval(timer);
  timeRemaining = 0;
  timerDisplay.textContent = "00:00";
  startTimerButton.style.display = "block"; // Show Start Timer button
  timerControls.style.display = "none"; // Hide Stop and Reset buttons
  timerMinutesInput.disabled = false;
  wordSection.style.display = "none";
  resultsSection.style.display = "none";
  successCount = 0;
  currentWordIndex = 0;
});

// Timer logic
function startTimer() {
  timer = setInterval(() => {
    timeRemaining--;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    // Blink timer at 15 seconds
    if (timeRemaining <= 15) {
      timerDisplay.classList.add("blink");
    } else {
      timerDisplay.classList.remove("blink"); // Remove blinking when time is above 15 seconds
    }

    if (timeRemaining <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Show the next word
function showNextWord() {
  if (currentWordIndex >= words.length) {
    currentWordIndex = 0; // Restart the word list if we reach the end
  }
  wordDisplay.textContent = words[currentWordIndex];
}

// Handle Success button click
successButton.addEventListener("click", () => {
  successCount++;
  liveSuccessNumber.textContent = successCount; // Update live success counter
  currentWordIndex++;
  showNextWord();
});

// Handle Pass button click
passButton.addEventListener("click", () => {
  currentWordIndex++;
  showNextWord();
});

// End the game
function endGame() {
  clearInterval(timer);
  wordSection.style.display = "none";
  resultsSection.style.display = "block";
  successCountDisplay.textContent = successCount;
  timerDisplay.classList.remove("blink"); // Stop blinking
}

// Play again
playAgainButton.addEventListener("click", () => {
  successCount = 0;
  currentWordIndex = 0;
  resultsSection.style.display = "none";
  startTimerButton.style.display = "block"; // Show Start Timer button
  timerControls.style.display = "none"; // Hide Stop and Reset buttons
  timerMinutesInput.disabled = false;
  timerDisplay.textContent = "00:00";
});

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}