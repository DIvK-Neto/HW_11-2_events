import "./css/style.css";
import Game from "./classes/game.js";
import gif from "./images/GracefulMiniatureBustard-small.gif";

document.addEventListener("DOMContentLoaded", () => {
  const gameField = document.querySelector("#game-field");

  const game = new Game();

  const bgGif = () => {
    const image = document.createElement("img");
    image.className = "gameGif";
    image.src = gif;
    image.alt = "background animation"; // ← добавлен alt
    gameField.append(image);
  };
  bgGif();

  const startBtn = document.querySelector("#start-btn");
  const pauseBtn = document.querySelector("#pause-btn");
  const resumeBtn = document.querySelector("#resume-btn");
  const resetBtn = document.querySelector("#reset-btn");

  resumeBtn.style.display = "none";
  pauseBtn.style.display = "none";
  resetBtn.style.display = "none";

  startBtn.addEventListener("click", () => {
    document.querySelector(".gameGif").style.display = "none";
    game.startGame();
    startBtn.style.display = "none";
    pauseBtn.style.display = "block";
  });
  pauseBtn.addEventListener("click", () => {
    game.pauseGame();
    resumeBtn.style.display = "block";
    pauseBtn.style.display = "none";
    resetBtn.style.display = "block";
  });
  resumeBtn.addEventListener("click", () => {
    pauseBtn.style.display = "block";
    resumeBtn.style.display = "none";
    resetBtn.style.display = "none";
    game.continueGame();
  });
  resetBtn.addEventListener("click", () => {
    game.resetGame();
    bgGif();
    startBtn.style.display = "block";
    resumeBtn.style.display = "none";
    pauseBtn.style.display = "none";
    resetBtn.style.display = "none";
  });
});
