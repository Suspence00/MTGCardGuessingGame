const API_URL = 'https://api.scryfall.com/cards/random';
const CARD_CONTAINER = document.getElementById('card-container');
const BUTTONS_CONTAINER = document.getElementById('buttons-container');
const SCORE_CONTAINER = document.getElementById('score-container');
const CARD_IMAGE = document.getElementById('card-image');
const START_BUTTON = document.getElementById('start-button');

let currentCardName;
let currentCardUrl;
let currentScore = 0;
let highestScore = 0;

// Function to start the game
function startGame() {
  currentScore = 0;
  getRandomCard();
}

// Function to fetch a random card from the API
function getRandomCard() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      currentCardName = data.name;
      currentCardUrl = data.image_uris.png;
      CARD_IMAGE.src = currentCardUrl;
      CARD_IMAGE.style.height = '20%';
      // Masking the bottom half of the card
      CARD_IMAGE.style.clipPath = 'polygon(0 0, 100% 0, 100% 50%, 0 50%)';
      CARD_IMAGE.style.WebkitClipPath = 'polygon(0 0, 100% 0, 100% 50%, 0 50%)';
      generateButtons();
    });
}

// Function to generate buttons
function generateButtons() {
  BUTTONS_CONTAINER.innerHTML = '';

  // Generating the correct answer button
  let correctButton = document.createElement('button');
  correctButton.innerText = currentCardName;
  correctButton.classList.add('correct-button');
  correctButton.addEventListener('click', handleGuess);
  BUTTONS_CONTAINER.appendChild(correctButton);

  // Generating the incorrect answer buttons
  for (let i = 0; i < 3; i++) {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        let incorrectButton = document.createElement('button');
        incorrectButton.innerText = data.name;
        incorrectButton.classList.add('incorrect-button');
        incorrectButton.addEventListener('click', handleGuess);
        BUTTONS_CONTAINER.appendChild(incorrectButton);
      });
  }
}

// Function to handle button clicks
function handleGuess(event) {
  let button = event.target;
  if (button.innerText === currentCardName) {
    currentScore++;
    if (currentScore > highestScore) {
      highestScore = currentScore;
    }
    SCORE_CONTAINER.innerText = `Current Score: ${currentScore} | Highest Score: ${highestScore}`;
    alert('Correct!');
  } else {
    currentScore = 0;
    SCORE_CONTAINER.innerText = `Current Score: ${currentScore} | Highest Score: ${highestScore}`;
    alert('Incorrect!')
  }
  getRandomCard();
}
