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

const words = [
  // Easy and common nouns
  "Elephant", "Pizza", "Bicycle", "Candle", "Sunflower", "Rainbow", "Dragon", "Coconut", 
  "Mountain", "Jellyfish", "Volcano", "Robot", "Banana", "Backpack", "Mermaid", "Whale",
  "Croissant", "Lasagna", "Milkshake", "Espresso", "Sushi", "Lemonade", "Avocado", "Cinnamon", 
  
  // Abstract concepts & actions
  "Friendship", "Dream", "Fear", "Victory", "Jealousy", "Peace", "Revolution", "Invention", 
  "Freedom", "Curiosity", "Dance", "Meditation", "Silence", "Adventure", "Regret", "Hope",
  "Wisdom", "Chaos", "Kindness", "Patience", "Destiny", "Truth", "Harmony", "Courage",

  // Historical & cultural references
  "Pyramid", "Gladiator", "Samurai", "Renaissance", "Viking", "Jazz", "Carnival", "Myth", 
  "Tornado", "Telescope", "Parade", "Lantern", "Alchemy", "Opera", "Mosaic", "Goddess", 
  "Crusader", "Dynasty", "Catapult", "Colosseum", "Monk", "Pharaoh", "Citadel", "Bazaar",
  
  // Fantasy & mythology
  "Unicorn", "Wizard", "Phoenix", "Griffin", "Castle", "Potion", "Sorcerer", "Labyrinth", 
  "Sphinx", "Fairy", "Chimera", "Giant", "Genie", "Wand", "Oracle", "Goblin", "Elf", 
  "Werewolf", "Mermaid", "Knight", "Pegasus", "Dragon", "Dwarf", "Rune", "Chant", 
  
  // Technology & modern life
  "Internet", "Smartphone", "Drone", "Satellite", "Laser", "Hologram", "Selfie", "Hashtag", 
  "Password", "Laptop", "Emoji", "Headphones", "Podcast", "Avatar", "Cloud", "WiFi", 
  "Gadget", "Bluetooth", "Joystick", "Screenshot", "Algorithm", "Firewall", "Inbox", "Backup", 
  
  // Difficult & unique words (to increase challenge)
  "Origami", "Palindrome", "Kaleidoscope", "Silhouette", "Quicksand", "Echo", "Symphony", "Paradox", 
  "Constellation", "Eclipse", "Mirage", "Espionage", "Geyser", "Camouflage", "Oasis", "Quarantine", 
  "Zenith", "Labyrinth", "Monolith", "Renaissance", "Cipher", "Prophecy", "Epitome", "Antique", 
  
  // Nature & geography
  "Canyon", "Savanna", "Glacier", "Lagoon", "Tundra", "Coral", "Waterfall", "Mangrove", 
  "Desert", "Oasis", "Horizon", "Typhoon", "Jungle", "Monsoon", "Cave", "Fjord", "Geyser", 
  "Volcano", "Meadow", "Blizzard", "Archipelago", "Delta", "Cliff", "Prairie", "Dune",
  
  // Everyday objects & actions
  "Umbrella", "Suitcase", "Parachute", "Swing", "Wheelbarrow", "Ladder", "Mailbox", "Lantern", 
  "Teapot", "Flashlight", "Magnifying Glass", "Hammock", "Trampoline", "Fishing Rod", "Compass", 
  "Shoelace", "Notebook", "Calendar", "Helmet", "Scissors", "Backpack", "Binoculars", "Rope", 
  
  // Animals & nature
  "Platypus", "Toucan", "Armadillo", "Hedgehog", "Koala", "Chameleon", "Octopus", "Peacock", 
  "Flamingo", "Parrot", "Panther", "Swan", "Lynx", "Walrus", "Otter", "Cobra", "Seahorse", 
  "Pelican", "Stingray", "Giraffe", "Meerkat", "Badger", "Salmon", "Wombat", "Sloth", 
  
  // More fun and random words
  "Mimicry", "Odyssey", "Carnivore", "Fossil", "Nomad", "Riddle", "Zodiac", "Dystopia", 
  "Metaphor", "Alchemy", "Chronicle", "Catacomb", "Artifact", "Galaxy", "Talisman", "Meteor", 
  "Crown", "Parrot", "Badge", "Trophy", "Canoe", "Feather", "Lantern", "Monument", 

  // Historical figures (optional fun twist)
  "Einstein", "Cleopatra", "Napoleon", "Shakespeare", "Tesla", "Da Vinci", "Beethoven", "Gandhi"
];

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

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