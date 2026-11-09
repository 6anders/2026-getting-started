//import './style.css'

import { GuessingGame } from "./guessing-game";

const btnAnswer = document.getElementById("btnAnswer");
const userMessageDiv = document.getElementById("userMessage");
const errorDiv = document.getElementById("errorMessage");

const btnRestart = document.getElementById("btnRestart");

let game = new GuessingGame(10, 3);

let minGuess = 1;
let maxGuess = 10;

let gameState = {
  guesses: 3,
  remainingGuesses: 3,
  playerWon: false,
  isGameOver: false,
};

//move to class
function checkAnswer(guess: number): void {
  const userMessageDiv = document.getElementById("userMessage");
  gameState.remainingGuesses -= 1;

  if (guess == secretNumber) {
    userMessageDiv!.innerText = "You won!";
    gameState.playerWon = true;
    gameState.isGameOver = true;
  } else if (guess < secretNumber) {
    userMessageDiv!.innerText = `${guess} is too low!`;
  } else {
    userMessageDiv!.innerText = `${guess} is too high!`;
  }

  if (!gameState.playerWon && gameState.remainingGuesses == 0) {
    //no win and out of guesses
    userMessageDiv!.innerText = `You lose! The secret number was ${secretNumber}...`;
    gameState.isGameOver = true;
  }
}

// move to class
function validateGuess(guess: number | null): boolean {
  const errorDiv = document.getElementById("errorMessage");

  if (errorDiv == null) {
    // something wrong in the code
    console.error("errorDiv is null here! We broke something.");
    return true;
  }

  if (guess == null) {
    errorDiv!.innerText = "Please enter a number";
    return false;
  }

  if (guess < minGuess || guess > maxGuess) {
    errorDiv!.innerText = `Please enter a number between ${minGuess} and ${maxGuess}`;
    return false;
  }
  if (!Number.isInteger(guess)) {
    errorDiv!.innerText = "Please enter a whole number";
    return false;
  }

  return true;
}

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

  console.log("Answer clicked!", game.secret, answer);
}

//already is done in class
function getSecretNumber(maxNumber: number = 10): number {
  let r = Math.random();
  r = r * maxNumber + 1;
  r = Math.floor(r);
  return r;
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

//handled in our class
let secretNumber = getSecretNumber();

let userAnswer = 0;

btnAnswer?.addEventListener("click", handleAnswerClick);

function resetGame(): void {
  game = new GuessingGame(10, 3);

  userMessageDiv!.innerText = "";
  errorDiv!.innerText = "";

  console.log("Game has been reset. New instance created!");
}
btnRestart?.addEventListener("click", resetGame);