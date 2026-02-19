// game.js
import GoblinManager from "./goblinManager.js";
import Scoreboard from "./scoreboard.js";

class Game {
  constructor() {
    this.score = 0; // Количество попаданий
    this.misses = 0; // Количество промахов
    this.lastResult = 0; // Храним последний результат
    this.isGameOver = false;
    this.isPlaying = false; // Флаг, игра запущена или нет
    this.isPaused = false; // Флаг, игра на паузе или нет
    this.goblinManager = new GoblinManager(this, "#game-field");
    this.scoreboard = new Scoreboard();
    this.goblinManager.init(); // Инициализируем прослушиватели событий
    this.scoreboard.updateScore(this.score, this.misses, this.lastResult); // Первоначальное отображение значений
  }

  startGame() {
    if (this.isGameOver || this.isPlaying) return; // Игру нельзя начать повторно
    console.log("Игра началась!");
    this.isPlaying = true;
    this.isGameOver = false;
    this.goblinManager.spawnGoblin();
    this.interval = setInterval(() => this.goblinManager.spawnGoblin(), 1500); // Появление гоблинов каждые 1.5 секунды
  }

  pauseGame() {
    if (!this.isPlaying) return; // Нельзя поставить на паузу незапущенную игру
    console.log("Игра приостановлена.");
    clearInterval(this.interval); // Останавливаем появление гоблинов
    this.isPlaying = false; // Пауза игры
    this.isPaused = true; // Устанавливаем флаг паузы
    this.goblinManager.pauseGoblin(); // Приостанавливаем таймер текущего гоблина
  }

  continueGame() {
    if (!this.isPaused) return; // Нельзя возобновить игру, если она не на паузе
    console.log("Возобновление игры.");
    this.isPlaying = true;
    this.isPaused = false; // Снимаем флаг паузы
    this.goblinManager.resumeGoblin(); // Восстанавливаем таймер текущего гоблина
    setTimeout(() => {
      this.goblinManager.clearCurrentGoblin(); // Удаляем текущего гоблина
      this.interval = setInterval(() => this.goblinManager.spawnGoblin(), 1500); // Возобновляем появление гоблинов
    }, 1000); // Ждём 1 секунду, чтобы убедиться, что текущий гоблин исчез
  }

  resetGame() {
    if (this.isPlaying) return; // Нельзя сбросить активную игру
    console.log("Игра сброшена.");
    this.lastResult = { score: this.score, misses: this.misses };
    this.score = 0;
    this.misses = 0;
    this.isGameOver = false;
    this.scoreboard.updateScore(this.score, this.misses, this.lastResult); // Обновляем счёт, но последний результат остаётся
    this.isPaused = false;
    this.isPlaying = false;
    clearInterval(this.interval); // Останавливаем появление гоблинов
    this.goblinManager.clearCurrentGoblin(); // Чистим игровые ячейки
    this.goblinManager = new GoblinManager(this, "#game-field");
    this.goblinManager.init(); // Перезапускаем инициализацию
  }

  goblinClicked(cell) {
    if (this.isGameOver || !this.isPlaying || this.isPaused) return; // Игру нельзя продолжить, если она на паузе
    this.score += 1; // Засчитали попадание
    this.scoreboard.updateScore(this.score, this.misses, this.lastResult); // Обновляем счёт
    cell.classList.add("hit"); // Эффект успешного удара
    setTimeout(() => cell.classList.remove("hit"), 500); // Эффект длится 0.5 секунды
  }

  missedGoblin(cell) {
    if (this.isGameOver || !this.isPlaying || this.isPaused) return; // Игру нельзя продолжить, если она на паузе
    this.misses += 1; // Пропуск гоблина — промах
    this.scoreboard.updateScore(this.score, this.misses, this.lastResult); // Обновляем счёт
    cell.classList.add("miss"); // Эффект промаха
    setTimeout(() => cell.classList.remove("miss"), 500); // Эффект длится 0.5 секунды
    if (this.misses >= 5) {
      // Ограничение на пять промахов
      this.endGame();
    }
  }

  endGame() {
    clearInterval(this.interval); // Останавливаем появление гоблинов
    this.isGameOver = true;
    this.isPlaying = false;
    this.lastResult = this.score; // Сохраняем текущий результат как последний
    this.scoreboard.updateScore(this.score, this.misses, this.lastResult); // Обновляем все значения
    alert(
      `Игра окончена!\nПопаданий: ${this.score},\nПромахов: ${this.misses}`,
    ); // Результат игры
  }
}

export default Game;
