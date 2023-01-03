// get random number between 0 and 2
// 0 = rock, 1 = paper; 2 = scissors
function calcCpuChoice() {
  const calc = Math.floor(Math.random() * 3);
  return calc;
}

// add functionality to buttons for player choice
const choices = document.querySelectorAll(".rps");
choices.forEach((ch) => ch.addEventListener("click", buttonEvent));

function buttonEvent() {
  play(Number(this.dataset.value));
}

function choiceEvent(arg) {
  play(Number(arg));
}

function checkRound(cpu, player) {
  const result = cpu - player;
  switch (result) {
    case 0:
      return "tie";
    case -1:
    case 2:
      return "player";
    case 1:
    case -2:
      return "cpu";
    default:
      return "error";
  }
}

function updateText(winner) {
  const textBoard = document.querySelector(".plchoice-text");

  if (winner === "tie") {
    textBoard.textContent = "It's a tie!";
  } else if (winner === "player") {
    textBoard.textContent = "You Win!";
  } else if (winner === "cpu") {
    textBoard.textContent = "CPU Wins!";
  } else if (winner === "reset") {
    textBoard.textContent = "Choose!";
  } else {
    textBoard.textContent = "ERROR: Something went wrong!";
  }
}

function updateChoiceTable(cpuChoice, playerChoice) {
  const cpuText = document.querySelector(".cpu-choice-text");
  const playerText = document.querySelector(".player-choice-text");
  cpuText.textContent = "";
  playerText.textContent = "";

  const playerEmoji = document.querySelector(".player-emoji");
  const cpuEmoji = document.querySelector(".cpu-emoji");

  playerEmoji.src = `${choiceToEmoji(playerChoice)}.png`;
  cpuEmoji.src = `${choiceToEmoji(cpuChoice)}.png`;
}

function choiceToEmoji(choice) {
  switch (Number(choice)) {
    case 0:
      return "g1594";
    case 1:
      return "g1452";
    case 2:
      return "g1490";
  }
}

function updateScore(winner) {
  const cpuScore = document.querySelector(".sc-cpu-val");
  const playerScore = document.querySelector(".sc-pl-val");

  if (winner === "player") {
    playerScore.textContent = Number(playerScore.textContent) + 1;
  } else if (winner === "cpu") {
    cpuScore.textContent = Number(cpuScore.textContent) + 1;
  }
}

function play(playerVal) {
  const playerSelect = playerVal;
  const cpuSelect = calcCpuChoice();
  const result = checkRound(cpuSelect, playerSelect);

  disableButtons();

  setTimeout(function () {
    updateText(result);
    updateChoiceTable(cpuSelect, playerSelect);
    updateScore(result);
  }, 500);

  setTimeout(function () {
    enableButtons();
  }, 1000);

  setTimeout(function () {
    updateText("reset");
    buildEndPage(checkWinCondition());
  }, 1100);
}

function disableButtons() {
  choices.forEach((ch) => ch.removeEventListener("click", buttonEvent));
  choices.forEach((ch) => ch.classList.add("disabled"));
}

function enableButtons() {
  choices.forEach((ch) => ch.addEventListener("click", buttonEvent));
  choices.forEach((ch) => ch.classList.remove("disabled"));
}

function checkWinCondition() {
  const cpuScore = document.querySelector(".sc-cpu-val");
  const playerScore = document.querySelector(".sc-pl-val");

  if (cpuScore.textContent === "5") {
    return "cpu";
  } else if (playerScore.textContent === "5") {
    return "player";
  } else {
    return null;
  }
}

function buildEndPage(result) {
  if (result === null) {
    return;
  }

  const body = document.querySelector("body");
  const footer = document.querySelector("footer");

  // clean up
  body.removeChild(document.querySelector(".info"));
  body.removeChild(document.querySelector(".score"));
  body.removeChild(document.querySelector(".choice-box"));
  body.removeChild(document.querySelector(".player-choice"));

  // add Elements
  const endText = document.createElement("div");
  endText.classList.add("endText");
  const endInfo = document.createElement("div");
  endInfo.classList.add("endInfo");

  if (result === "player") {
    endText.textContent = "Victory!";
  } else if (result === "cpu") {
    endText.textContent = "Defeat!";
  }

  endInfo.textContent = "Refresh to play again.";

  body.insertBefore(endText, footer);
  body.insertBefore(endInfo, footer);
}
