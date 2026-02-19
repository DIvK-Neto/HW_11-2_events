// board.js
class Board {
  constructor(parentElementId, size) {
    this.parentElement = document.querySelector(parentElementId);
    this.size = size || 4; // Размер сетки по умолчанию 4x4
    this.cells = [];
    this.createGrid();
  }

  /**
   * Метод для создания сетки игрового поля
   */
  createGrid() {
    this.parentElement.innerHTML = "";
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      this.parentElement.appendChild(cell);
      this.cells.push(cell);
    }
  }

  /**
   * Возвращает случайную ячейку из сетки
   */
  getRandomCell() {
    return this.cells[Math.floor(Math.random() * this.cells.length)];
  }
}

export default Board;
