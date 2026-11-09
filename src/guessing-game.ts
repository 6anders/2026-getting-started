import { GuessResult } from "./guess-result";

export class GuessingGame {
  readonly minRange: number = 1;
  readonly maxRange: number;

  readonly maxGuesses: number;
  readonly secret: number;

  readonly lastGuess: number = 0;
  private remainingGuesses: number;

  playerWon: boolean = false;
  isGameOver: boolean = false;

  constructor(maxRange: number, numberOfGuesses: number) {
    this.maxRange = maxRange;
    this.maxGuesses = numberOfGuesses;
    this.remainingGuesses = this.maxGuesses;

    this.secret = this.generateSecret();
  }

  private generateSecret(): number {
    let r = Math.random();
    r = r * this.maxRange + this.minRange;
    r = Math.floor(r);
    return r;
  }

  guess(guess: number | null): GuessResult {
    //debugger;
    let validationResult = this.validate(guess);
    if (validationResult.isError) {
      return validationResult;
    }

    return this.checkAnswer(guess!);
  }

  private validate(answer: number | null): GuessResult {
    if (answer == null) {
      return new GuessResult(true, "Please enter a number");
    }

    if (answer < this.minRange || answer > this.maxRange) {
      return new GuessResult(
        true,
        `Please enter a number between ${this.minRange} and ${this.maxRange}`,
      );
    }
    if (!Number.isInteger(answer)) {
      return new GuessResult(true, "Please enter a number");
    }

    return new GuessResult(false, "");
  }

  private checkAnswer(guess: number): GuessResult {
    this.remainingGuesses -= 1;
    let message = "";
    if (guess == this.secret) {
      message = `You won! ${this.secret} was correct!`;
      this.playerWon = true;
      this.isGameOver = true;
    } else if (guess < this.secret) {
      message = `${guess} is too low!`;
    } else {
      message = `${guess} is too high!`;
    }
    if (!this.playerWon && this.remainingGuesses == 0) {
      //no win and out of guesses
      message = `You lose! The secret number was ${this.secret}...`;
      this.isGameOver = true;
    } 
    //debugger;
    return new GuessResult(false, message);
  }
  validateGuess(guess: number | null): boolean {
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

    if (guess < this.minRange || guess > this.maxRange) {
      errorDiv!.innerText = `Please enter a number between ${this.minRange} and ${this.maxRange}`;
      return false;
    }
    if (!Number.isInteger(guess)) {
      errorDiv!.innerText = "Please enter a whole number";
      return false;
    }

    return true;
  }


}
