class Scoreboard {
  constructor() {
    this.hitsCountElement = document.querySelector("#hits-count");
    this.missesCountElement = document.querySelector("#misses-count");
    this.prevResultElement = document.querySelector("#prev-result");
  }

  updateScore(hits, misses, prevResult = { hits: 0, misses: 0 }) {
    this.hitsCountElement.textContent = `Попадания: ${hits}`;
    this.missesCountElement.textContent = `Промахи: ${misses}`;
    let resultMessage = "";
    if (prevResult.hits !== undefined && prevResult.misses !== undefined) {
      resultMessage = `Предыдущий результат:\nПопадания: ${prevResult.hits}, Промахи: ${prevResult.misses}`;
    } else {
      resultMessage = "Предыдущий результат: Нет данных";
    }
    this.prevResultElement.textContent = resultMessage;
  }
}

export default Scoreboard;
