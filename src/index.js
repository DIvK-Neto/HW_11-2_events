// index.js
import "./css/style.css";
import Game from "./classes/game.js";

document.addEventListener("DOMContentLoaded", () => {
  const gameField = document.querySelector("#game-field");
  // Создаем ячейки динамически
  for (let i = 0; i < 16; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    gameField.appendChild(cell);
  }

  const game = new Game(); // Создаем экземпляр игры

  // Используем делегирование событий на документе для предотвращения потери обработчиков
  document.body.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button && button.id === "start-btn") game.startGame();
    else if (button && button.id === "pause-btn") {
      game.pauseGame();
      if (!game.isPaused) return;
      button.style.display = "none";
      document.querySelector("#resume-btn").style.display = "block";
    } else if (button && button.id === "resume-btn") {
      game.continueGame();
      if (game.isPaused) return;
      button.style.display = "none";
      document.querySelector("#pause-btn").style.display = "block";
    } else if (button && button.id === "reset-btn") {
      game.resetGame();
      document.querySelector("#resume-btn").style.display = "none";
      document.querySelector("#pause-btn").style.display = "block";
    }
  });
});
