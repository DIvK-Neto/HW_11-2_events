class Board {
  constructor(parentElementId, size) {
    this.parentElement = document.querySelector(parentElementId);
    this.size = size || 4;
    this.cells = [];
    this.createGrid();
  }

  createGrid() {
    this.parentElement.innerHTML = "";
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      this.parentElement.append(cell);
      this.cells.push(cell);
    }
  }

  getRandomCell() {
    const indices = Array.from(Array(this.cells.length).keys());
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return this.cells[indices.pop()];
  }
}

export default Board;
