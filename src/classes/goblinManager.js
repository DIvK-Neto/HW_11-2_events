import Board from "./board.js";
import goblinImg from "../images/goblin.png";

class GoblinManager {
  constructor(game, parentElementId) {
    this.game = game;
    this.board = new Board(parentElementId);
    this.cells = this.board.cells;
    this.currentGoblin = null;
    this.clicked = false;
    this.gameField = document.querySelector(parentElementId);
    this.timerID = null;
    this.isPaused = false;
    this.boundHandleFieldClick = this.handleFieldClick.bind(this);
    this.init();
  }
  handleFieldClick(event) {
    const cell = event.target.closest(".cell");
    if (cell && !cell.contains(this.currentGoblin)) {
      this.handleMiss(cell);
    }
  }

  initListeners() {
    this.gameField.addEventListener("click", this.boundHandleFieldClick);
  }

  removeListeners() {
    this.gameField.removeEventListener("click", this.boundHandleFieldClick);
  }

  handleMiss(cell) {
    if (!this.isPaused) {
      this.game.missedGoblin(cell);
    }
  }

  spawnGoblin() {
    const randomCell = this.board.getRandomCell();
    const existingGoblins = randomCell.querySelectorAll(".goblin");
    existingGoblins.forEach((goblin) => goblin.remove());

    const goblinElement = document.createElement("img");
    goblinElement.src = goblinImg;
    goblinElement.className = "goblin";
    randomCell.append(goblinElement);

    this.timerID = setTimeout(() => {
      if (randomCell.contains(goblinElement) && !this.clicked) {
        goblinElement.remove();
        this.game.missedGoblin(randomCell);
      }
      this.clicked = false;
    }, 1000);

    goblinElement.onclick = () => {
      if (!this.isPaused) {
        this.clicked = true;
        this.game.goblinClicked(randomCell);
        goblinElement.remove();
      }
    };

    this.currentGoblin = goblinElement;
  }

  pauseGoblin() {
    if (this.timerID) {
      clearTimeout(this.timerID);
    }
    this.isPaused = true;
  }

  resumeGoblin() {
    if (this.currentGoblin) {
      const randomCell = this.currentGoblin.parentElement;
      this.timerID = setTimeout(() => {
        if (randomCell.contains(this.currentGoblin) && !this.clicked) {
          this.currentGoblin.remove();
          this.game.missedGoblin(randomCell);
        }
        this.clicked = false;
      }, 1000);
    }
    this.isPaused = false;
  }

  clearCurrentGoblin() {
    if (this.currentGoblin) {
      const currentCell = this.currentGoblin.parentElement;
      if (currentCell && currentCell.contains(this.currentGoblin)) {
        this.currentGoblin.remove();
      }
      this.currentGoblin = null;
    }
  }

  init() {
    this.initListeners();
  }
}

export default GoblinManager;
