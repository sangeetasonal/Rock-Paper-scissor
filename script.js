
const computerScore = document.querySelector(".computerScore");
const playerScore = document.querySelector(".your.Score");
const keys = document.querySelectorAll(".choice-card");
const playingZone = document.querySelector(".choices");
const resultZone = document.querySelector(".result-zone");
const winText = document.querySelector("#win-text");
const lostText = document.querySelector("#lost-text");
const tieText = document.querySelector("#tie-text");
const subText = document.querySelector(".sub-text");
const playAgainBtn = document.querySelector(".playBtn");
const replayBtn = document.querySelector(".replayBtn");
const userRock = document.querySelector("#user-rock");
const pcRock = document.querySelector("#pc-rock");
const userPaper = document.querySelector("#user-paper");
const pcPaper = document.querySelector("#pc-paper");
const userScissor = document.querySelector("#user-scissor");
const pcScissor = document.querySelector("#pc-scissor");
const userIcon = document.querySelector(".user-side-icon");
const pcIcon = document.querySelector(".pc-side-icon");
const rulesBtn = document.querySelector(".rules-btn");
const nextBtn = document.querySelector(".next-btn");
const modal = document.getElementById('rulesModal');
const closeBtn = document.querySelector('.close-btn');

// Open the modal when rules button click
rulesBtn.onclick = function () {
  modal.style.display = 'block';
}

// Close 
closeBtn.onclick = function () {
  modal.style.display = 'none';
}



// Convert the list of keys (rock, paper, scissors) into an array
const keysArray = Array.from(keys);

// Function to get scores from local storage
function updateScoreDisplay() {
  const scoresJSON = localStorage.getItem("scores");
  const updatedScores = scoresJSON
    ? JSON.parse(scoresJSON)
    : { user: 0, computer: 0 };
  computerScore.innerText = updatedScores.computer;
  playerScore.innerText = updatedScores.user;
}
updateScoreDisplay();

// Convert choice to numerical value
const valueOfKey = (name) => {
  let keyVal = 0;
  if (name === "rock") {
    keyVal = 1;
  } else if (name === "paper") {
    keyVal = 2;
  } else if (name === "scissors") {
    keyVal = 3;
  }
  return keyVal;
};

// Random number generator for computer's choice
const getRandomNumber = () => {
  const randomDecimal = Math.random();
  const randomNumber = Math.floor(randomDecimal * 3) + 1;
  return randomNumber;
};

// Function to play Rock, Paper, Scissors and determine the winner
const playRockPaperScissors = (userChoice, compChoice) => {
  if (userChoice === compChoice) {
    return "tie";
  } else if (
    (userChoice === 1 && compChoice === 3) ||
    (userChoice === 2 && compChoice === 1) ||
    (userChoice === 3 && compChoice === 2)
  ) {
    return "user";
  } else {
    return "comp";
  }
};

// Update scores in local storage and on the scoreboard
const updateScores = (result) => {
  const scoresJSON = localStorage.getItem("scores");
  const scores = scoresJSON ? JSON.parse(scoresJSON) : { user: 0, computer: 0 };

  if (result === "user") {
    scores.user += 1;
  } else if (result === "comp") {
    scores.computer += 1;
  }

  localStorage.setItem("scores", JSON.stringify(scores));
  updateScoreDisplay();
};

// Update the display of the user's and computer's choices
const updateResultSides = (userChoice, compChoice) => {
  if (userChoice === 1) {
    userRock.style.display = "block";
    userPaper.style.display = "none";
    userScissor.style.display = "none";
  } else if (userChoice === 2) {
    userRock.style.display = "none";
    userPaper.style.display = "block";
    userScissor.style.display = "none";
  } else if (userChoice === 3) {
    userRock.style.display = "none";
    userPaper.style.display = "none";
    userScissor.style.display = "block";
  }

  if (compChoice === 1) {
    pcRock.style.display = "block";
    pcPaper.style.display = "none";
    pcScissor.style.display = "none";
  } else if (compChoice === 2) {
    pcRock.style.display = "none";
    pcPaper.style.display = "block";
    pcScissor.style.display = "none";
  } else if (compChoice === 3) {
    pcRock.style.display = "none";
    pcPaper.style.display = "none";
    pcScissor.style.display = "block";
  }
};

// Update the result zone with the outcome of the game
const updateResultZone = (result, userChoice, compChoice) => {
  playingZone.style.display = "none";
  resultZone.style.display = "flex";
  // Remove the animation class from both icons initially
  userRock.classList.remove("winner-animation");
  pcRock.classList.remove("winner-animation");
  userPaper.classList.remove("winner-animation");
  pcPaper.classList.remove("winner-animation");
  userScissor.classList.remove("winner-animation");
  pcScissor.classList.remove("winner-animation");

  if (result === "tie") {
    winText.style.display = "none";
    lostText.style.display = "none";
    subText.style.display = "none";
    playAgainBtn.style.display = "none";
    replayBtn.style.display = "block";
    tieText.style.display = "block";
    nextBtn.style.display = "none";
    

    updateResultSides(userChoice, compChoice);
    
  } else if (result === "user") {
    lostText.style.display = "none";
    tieText.style.display = "none";
    replayBtn.style.display = "none";
    nextBtn.style.display = "inline";

    winText.style.display = "block";
    subText.style.display = "block";
    playAgainBtn.style.display = "block";

    
    if (userChoice === 1) userRock.classList.add("winner-animation");
        if (userChoice === 2) userPaper.classList.add("winner-animation");
        if (userChoice === 3) userScissor.classList.add("winner-animation");
  } else if (result === "comp") {
    winText.style.display = "none";
    tieText.style.display = "none";
    replayBtn.style.display = "none";
    nextBtn.style.display = "none";

    lostText.style.display = "block";
    subText.style.display = "block";
    playAgainBtn.style.display = "block";

    updateResultSides(userChoice, compChoice);
    
      if (compChoice === 1) pcRock.classList.add("winner-animation");
      if (compChoice === 2) pcPaper.classList.add("winner-animation");
      if (compChoice === 3) pcScissor.classList.add("winner-animation");
  
  }
};

// Handler for when a choice is clicked
const keyClickHander = (event) => {
  const parentDiv = event.target.closest(".choice-card");
  if (parentDiv) {
    const keyClicked = parentDiv.id;
    const userChoice = valueOfKey(keyClicked);

    const compChoice = getRandomNumber();

    const result = playRockPaperScissors(userChoice, compChoice);

    updateScores(result);
    updateResultZone(result, userChoice, compChoice);
  }
};

// Handler for Play Again or Replay
const playAgainHandler = () => {
  playingZone.style.display = "flex";
  resultZone.style.display = "none";
};



// Event listeners for choices and play again button
keysArray.forEach((key) => key.addEventListener("click", keyClickHander));
replayBtn.addEventListener("click", playAgainHandler);
playAgainBtn.addEventListener("click", playAgainHandler);


