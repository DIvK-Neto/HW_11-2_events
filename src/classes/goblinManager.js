// goblinManager.js
import Board from "./board.js";

class GoblinManager {
  constructor(game, parentElementId) {
    this.game = game;
    this.board = new Board(parentElementId);
    this.cells = this.board.cells;
    this.currentGoblin = null; // Текущий активный гоблин
    this.clicked = false; // Был ли клик по гоблину
    this.gameField = document.querySelector(parentElementId); // Родительский элемент
    this.timerID = null; // Таймер для удаления гоблина
    this.isPaused = false; // Флаг, игра на паузе или нет
  }

  initListeners() {
    // Общесистемный обработчик кликов на игровом поле
    this.gameField.addEventListener("click", (event) => {
      const cell = event.target.closest(".cell"); // Определяем ближайшую ячейку
      if (cell && !cell.contains(this.currentGoblin)) {
        this.handleMiss(cell); // Обрабатываем промах
      }
    });
  }

  handleMiss(cell) {
    if (!this.isPaused) {
      this.game.missedGoblin(cell); // Регистрируем промах
    }
  }

  spawnGoblin() {
    const randomCell = this.board.getRandomCell();
    // Проверяем наличие предыдущих гоблинов в случайной клетке и удаляем их
    const existingGoblins = randomCell.querySelectorAll(".goblin");
    existingGoblins.forEach((goblin) => {
      if (randomCell.contains(goblin)) {
        randomCell.removeChild(goblin); // Безопасное удаление
      }
    });

    const goblinElement = document.createElement("div");
    goblinElement.className = "goblin";
    randomCell.appendChild(goblinElement);

    // Таймаут на удаление гоблина через 1 сек., если не успели кликнуть
    this.timerID = setTimeout(() => {
      if (randomCell.contains(goblinElement) && !this.clicked) {
        randomCell.removeChild(goblinElement); // Проверяем наличие перед удалением
        this.game.missedGoblin(randomCell); // Регистрируем промах
      }
      this.clicked = false; // Сбрасываем флаг клика
    }, 1000);

    // Добавляем обработчик клика на гоблина
    goblinElement.onclick = () => {
      if (!this.isPaused) {
        // Обрабатываем клик только если игра не на паузе
        this.clicked = true; // Фиксируем факт клика
        this.game.goblinClicked(randomCell); // Регистрация попадания
        randomCell.removeChild(goblinElement); // Удаляем гоблина немедленно
      }
    };

    this.currentGoblin = goblinElement; // Сохраняем ссылку на текущего гоблина
  }

  pauseGoblin() {
    // Останавливаем таймер текущего гоблина
    if (this.timerID) {
      clearTimeout(this.timerID); // Остановка текущего таймера
    }
    this.isPaused = true; // Устанавливаем флаг паузы
    // this.clearCurrentGoblin(); // Удаляем текущего гоблина после паузы
  }

  resumeGoblin() {
    // Запускаем таймер заново
    if (this.currentGoblin) {
      const randomCell = this.currentGoblin.parentElement;
      this.timerID = setTimeout(() => {
        if (randomCell.contains(this.currentGoblin) && !this.clicked) {
          randomCell.removeChild(this.currentGoblin); // Проверяем наличие перед удалением
          this.game.missedGoblin(randomCell); // Регистрируем промах
        }
        this.clicked = false; // Сбрасываем флаг клика
      }, 1000); // Стандартный таймер в 1 секунду
    }
    this.isPaused = false; // Снимаем флаг паузы
  }

  clearCurrentGoblin() {
    if (this.currentGoblin) {
      const currentCell = this.currentGoblin.parentElement;
      if (currentCell && currentCell.contains(this.currentGoblin)) {
        currentCell.removeChild(this.currentGoblin); // Безопасное удаление гоблина
      }
      this.currentGoblin = null;
    }
  }

  init() {
    this.initListeners(); // Настройка слушателей событий
  }
}

export default GoblinManager;
