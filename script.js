const generateCardsButton = document.getElementById("generateCards");
const playerCountInput = document.getElementById("playerCount");
const cardsContainer = document.getElementById("cardsContainer");

const wordGroups = [
 ["Cat", "Tiger"], ["Frog", "Toad"], ["Burger", "Sandwich"], ["Coffee", "Tea"], 
  ["City", "Town"], ["Dolphin", "Whale"], ["Superman", "Batman"], ["Cake", "Pie"], 
  ["Phone", "Tablet"], ["Teacher", "Professor"], ["Love", "Like"], ["Orange", "Tangerine"], 
  ["Island", "Peninsula"], ["Lawyer", "Judge"], ["Netflix", "Hulu"], ["Smart", "Wise"], 
  ["Mountain", "Hill"], ["Forest", "Jungle"], ["Hope", "Dream"], ["Beach", "Pool"], 

  // Fun and unique word pairs start here
  ["Fart", "Hiccup"], ["Sneaker", "Flip-Flop"], ["Bubble", "Foam"], ["Dragon", "Unicorn"], 
  ["Jelly", "Jam"], ["Pickle", "Cucumber"], ["Pirate", "Ninja"], ["Banana", "Potato"], 
  ["Zombie", "Vampire"], ["Magic", "Miracle"], ["Penguin", "Flamingo"], ["Muffin", "Cupcake"], 
  ["Robot", "Alien"], ["Rainbow", "Aurora"], ["Tornado", "Hurricane"], ["Turtle", "Snail"], 
  ["Slime", "Goo"], ["Frost", "Chill"], ["Glitter", "Sparkle"], ["Cactus", "Succulent"], 
  ["Puzzle", "Riddle"], ["Rocket", "Spaceship"], ["Snowman", "Snowflake"], ["Yawn", "Sneeze"], 
  ["Marshmallow", "Cotton Candy"], ["Cheese", "Chocolate"], ["Alien", "Martian"], ["Octopus", "Squid"], 
  ["Pancake", "Waffle"], ["Bubblegum", "Lollipop"], ["Cloud", "Rainbow"], ["Shadow", "Silhouette"], 
  ["Ghost", "Phantom"], ["Banana", "Plantain"], ["Glacier", "Iceberg"], ["Lava", "Magma"], 
  ["Taco", "Burrito"], ["Soap", "Shampoo"], ["Mirror", "Reflection"], ["Seal", "Otter"], 
  ["Chill", "Freeze"], ["Feather", "Quill"], ["Lightning", "Thunder"], ["Cotton", "Silk"], 
  ["Socks", "Gloves"], ["Bunny", "Hamster"], ["Rain", "Fog"], ["Cereal", "Granola"], 
  ["Eclipse", "Shadow"], ["Pillow", "Cushion"], ["Mushroom", "Truffle"], ["Hat", "Helmet"], 
  ["Fire", "Spark"], ["Bubble", "Droplet"], ["Bee", "Butterfly"], ["Coconut", "Pineapple"], 
  ["Garlic", "Onion"], ["Book", "Scroll"], ["Trophy", "Medal"], ["Beach", "Lagoon"], 
  ["Balloon", "Kite"], ["Map", "Compass"], ["Storm", "Blizzard"], ["Ant", "Beetle"], 
  ["Cloud", "Mist"], ["Hammock", "Tent"], ["Popcorn", "Nachos"], ["Puzzle", "Maze"], 
  ["Beard", "Mustache"], ["Jellyfish", "Starfish"], ["Honey", "Nectar"], ["Sponge", "Loofah"], 
  ["Paper", "Parchment"], ["Lion", "Panther"], ["Skyscraper", "Tower"], ["Candle", "Lantern"], 
  ["Nut", "Seed"], ["Keyboard", "Piano"], ["Doughnut", "Bagel"], ["Puppy", "Kitten"], 
  ["Radio", "Speaker"], ["Rocket", "Satellite"], ["Chili", "Pepper"], ["Fairy", "Elf"], 
  ["Clown", "Jester"], ["Sneeze", "Cough"], ["Witch", "Wizard"], ["Frog", "Newt"], 
  ["Spider", "Scorpion"], ["Cave", "Cavern"], ["Pie", "Tart"], ["Sword", "Dagger"], 
  ["Crown", "Tiara"], ["River", "Brook"], ["Volcano", "Crater"], ["Toast", "Bagel"]
];

generateCardsButton.addEventListener("click", () => {
  const playerCount = parseInt(playerCountInput.value);

  if (!playerCount || playerCount < 3 || playerCount > 20) {
    alert("Please enter a valid number of players (3-20).");
    return;
  }

  cardsContainer.innerHTML = ""; // Clear previous cards

  // Randomize word group selection
  const selectedGroup = wordGroups[Math.floor(Math.random() * wordGroups.length)];

  // Determine the number of spies based on player count
  let numberOfSpies = 1;
  if (playerCount >= 6 && playerCount <= 10) {
    numberOfSpies = 2;
  } else if (playerCount >= 11) {
    numberOfSpies = 3;
  }

  // Generate cards with the selected word group
  const cardWords = [];
  for (let i = 0; i < playerCount; i++) {
    const word = i < numberOfSpies ? selectedGroup[0] : selectedGroup[1]; // Assign the spy word to the first 'numberOfSpies' cards
    cardWords.push(word);
  }

  // Shuffle the card words
  cardWords.sort(() => Math.random() - 0.5);

  // Create and display cards
  cardWords.forEach((word, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Create a hidden div to hold the word
    const wordDiv = document.createElement("div");
    wordDiv.classList.add("word");
    wordDiv.innerText = word;

    // Add a number on the card
    const numberDiv = document.createElement("div");
    numberDiv.classList.add("card-number");
    numberDiv.innerText = index + 1; // Display a number starting from 1

    card.appendChild(numberDiv); // Add number div to the card
    card.appendChild(wordDiv); // Add word div to the card

    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });

    cardsContainer.appendChild(card);
  });
});