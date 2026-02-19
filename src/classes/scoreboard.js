// scoreboard.js
class Scoreboard {
  constructor() {
    this.hitsCountElement = document.querySelector("#hits-count");
    this.missesCountElement = document.querySelector("#misses-count");
    this.prevResultElement = document.querySelector("#prev-result");
  }

  updateScore(hits, misses, prevResult = "") {
    this.hitsCountElement.textContent = `Попадания: ${hits}`;
    this.missesCountElement.textContent = `Промахи: ${misses}`;
    let resultMessage = "";
    if (prevResult) {
      resultMessage = `Предыдущий результат: Попадания ${prevResult.score}\n Промахи ${prevResult.misses}`;
    } else {
      resultMessage = "Предыдущий результат: Нет данных"; // Сообщение по умолчанию
    }
    this.prevResultElement.textContent = resultMessage;
  }
}

export default Scoreboard;
