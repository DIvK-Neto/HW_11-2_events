import GoblinManager from "./goblinManager.js";
import Scoreboard from "./scoreboard.js";

class Game {
  constructor() {
    this.score = 0;
    this.misses = 0;
    this.lastResult = { hits: 0, misses: 0 };
    this.isGameOver = false;
    this.isPlaying = false;
    this.isPaused = false;
    this.goblinManager = new GoblinManager(this, "#game-field");
    this.scoreboard = new Scoreboard();
    this.scoreboard.updateScore(this.score, this.misses, this.lastResult);
  }

  startGame() {
    if (this.isGameOver || this.isPlaying) return;
    this.isPlaying = true;
    this.isGameOver = false;
    this.goblinManager.spawnGoblin();
    this.interval = setInterval(() => this.goblinManager.spawnGoblin(), 1000);
  }

  pauseGame() {
    if (!this.isPlaying) return;
    clearInterval(this.interval);
    this.isPlaying = false;
    this.isPaused = true;
    this.goblinManager.pauseGoblin();
  }

  continueGame() {
    if (!this.isPaused) return;
    this.isPlaying = true;
    this.isPaused = false;
    this.goblinManager.resumeGoblin();
    this.interval = setInterval(() => this.goblinManager.spawnGoblin(), 1000);
  }

  resetGame() {
    if (this.isPlaying) return;
    clearInterval(this.interval);
    this.lastResult = { hits: this.score, misses: this.misses };
    this.score = 0;
    this.misses = 0;
    this.isGameOver = false;
    this.scoreboard.updateScore(this.score, this.misses, this.lastResult);
    this.isPaused = false;
    this.isPlaying = false;
    this.goblinManager.removeListeners();
    this.goblinManager.clearCurrentGoblin();
    this.goblinManager = new GoblinManager(this, "#game-field");
  }

  goblinClicked(cell) {
    if (this.isGameOver || !this.isPlaying || this.isPaused) return;
    this.score++;
    this.scoreboard.updateScore(this.score, this.misses, this.lastResult);
    cell.classList.add("hit");
    setTimeout(() => cell.classList.remove("hit"), 500);
  }

  missedGoblin(cell) {
    if (this.isGameOver || !this.isPlaying || this.isPaused) return;
    this.misses++;
    this.scoreboard.updateScore(this.score, this.misses, this.lastResult);
    cell.classList.add("miss");
    setTimeout(() => cell.classList.remove("miss"), 500);
    if (this.misses >= 5) {
      this.endGame();
    }
  }

  endGame() {
    clearInterval(this.interval);
    this.isGameOver = true;
    this.isPlaying = false;
    this.lastResult = { hits: this.score, misses: this.misses };
    this.scoreboard.updateScore(this.score, this.misses, this.lastResult);

    // Модальное окно вместо alert()
    const modal = document.querySelector("#modal");
    const message = document.querySelector("#modal-message");
    message.textContent = `Игра окончена!\nПопаданий: ${this.score},\nПромахов: ${this.misses}`;
    modal.classList.remove("hidden");
    modal.classList.add("visible");
    this.score = 0;
    this.misses = 0;

    // Закрытие модального окна
    const closeModalButton = document.querySelector(".close-modal");
    closeModalButton.addEventListener("click", () => {
      modal.classList.remove("visible");
      modal.classList.add("hidden");
    });
    document.querySelector("#reset-btn").style.display = "block";
    document.querySelector("#pause-btn").style.display = "none";
  }
}

export default Game;
