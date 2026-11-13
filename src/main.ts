//import './style.css'

import { GuessingGame } from "./guessing-game";

const btnAnswer = document.getElementById("btnAnswer");
const userMessageDiv = document.getElementById("userMessage");
const errorDiv = document.getElementById("errorMessage");

const btnRestart = document.getElementById("btnRestart");

const spanWins = document.getElementById("winCount");
const spanLosses = document.getElementById("lossCount");
const spanElo = document.getElementById("eloCount");
const spanGuess = document.getElementById("guessCount");

const gameModeSelect = document.getElementById(
  "gameModes",
) as HTMLSelectElement | null;

let game = new GuessingGame(10, 3);

let gameHistory = {
  wins: 0,
  losses: 0,
  guesses: 3,

  maxRange: 10,

  elo: function () {
    return Math.max(this.wins - this.losses, 0) * 10;
  },
};

// leave  here
function handleAnswerClick() {
  if (game.isGameOver) {
    return;
  }

  let answer = getUserAnswer();

  let result = game.guess(answer);

  if (result.isError) {
    errorDiv!.innerText = result.message;
  } else {
    userMessageDiv!.innerText = result.message;
  }

  if (game.isGameOver) {
    if (game.playerWon) {
      gameHistory.wins += 1;
    } else {
      gameHistory.losses += 1;
    }

    

    spanElo!.innerText = gameHistory.elo().toString();

    spanWins!.innerText = gameHistory.wins.toString();
    spanLosses!.innerText = gameHistory.losses.toString();
  }

  spanGuess!.innerText = game.remainingGuesses.toString()

  console.log("Answer clicked!", game.secret, answer);
}

// leave here
function getUserAnswer(): number | null {
  const answerElement = document.getElementById(
    "userAnswer",
  ) as HTMLInputElement | null;

  if (answerElement == null) {
    return null;
  }

  let answer = Number(answerElement.value);

  if (Number.isNaN(answer) || answer == 0) {
    return null;
  }

  answerElement.value = "";
  answerElement.focus();
  return answer;
}

btnAnswer?.addEventListener("click", handleAnswerClick);

function resetGame(): void {

  userMessageDiv!.innerText = "";
  errorDiv!.innerText = "";

  console.log("Game has been reset. New instance created!");

  createGame();

  spanGuess!.innerText = game.remainingGuesses.toString();
}
btnRestart?.addEventListener("click", resetGame);

function handleGameModeChange() {
  const mode = gameModeSelect!.value;

  let range = 10;
  let guesses = 3;

  switch (mode) {
    case "level 2":
      range = 50;
      guesses = 5;
      break;
    case "level 3":
      range = 100;
      guesses = 10;
      break;
    case "level 4":
      range = 150;
      guesses = 12;
      break;
  }
  gameHistory.guesses = guesses
  gameHistory.maxRange = range

  createGame();
  spanGuess!.innerText = game.remainingGuesses.toString();

  userMessageDiv!.innerText = `New game started with ${guesses} guesses and a range of 1-${range}`;
}
gameModeSelect?.addEventListener("change", handleGameModeChange);

function createGame() {
  game = new GuessingGame(gameHistory.maxRange, gameHistory.guesses)
}