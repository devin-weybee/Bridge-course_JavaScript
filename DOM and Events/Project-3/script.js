let num, currentScore = 0, activePlayer = 0;

let scores0 = 0;
let scores1 = 0;

const player0 = document.querySelector(".player--0");
const playerl = document.querySelector(".player--1");

function rollDice() {
  num = Math.trunc(Math.random() * 6) + 1;
  document.querySelector(".dice").src = `./images/Dice-${num}.png`;
  if (num == 1) {
    switchPlayer();
  } else {
    currentScore += num;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
  return num;
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  if (activePlayer === 0) {
    player0.classList.remove("player--active");
    playerl.classList.add("player--active");
  } else {
    playerl.classList.remove("player--active");
    player0.classList.add("player--active");
  }
  activePlayer = activePlayer == 0 ? 1 : 0;
}

function holdDice() {
  if (activePlayer == 0) {
    scores0 += currentScore;
    document.getElementById("score--0").textContent = scores0;
    if (scores0 >= 10) {
      document.querySelector(".player--0").classList.add("player--winner");
    } else {
      switchPlayer();
    }
  } else {
    scores1 += currentScore;
    document.getElementById("score--1").textContent = scores1;
    if (scores1 >= 10) {
      document.querySelector(".player--1").classList.add("player--winner");
    } else {
      switchPlayer();
    }
  }
}

function newGame() {
  scores0 = 0;
  scores1 = 0;
  currentScore = 0;
  activePlayer = 0;

  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;

  player0.classList.remove("player--winner");
  playerl.classList.remove("player--winner");

  player0.classList.add("player--active");
  playerl.classList.remove("player--active");
}
