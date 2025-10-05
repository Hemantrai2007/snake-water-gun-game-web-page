const choices = {
  snake: -1,
  water: 1,
  gun: 0
};

const reverseChoices = {
  "-1": "snake",
  "1": "water",
  "0": "gun"
};

let userScore = 0;
let computerScore = 0;
let round = 1;

function playGame(userChoiceStr) {
  if (round > 10) {
    alert("Game over! Please reset to play again.");
    return;
  }

  const userChoice = choices[userChoiceStr];
  const computerChoice = randomComputerChoice();

  document.getElementById("user-choice").textContent = `You chose: ${userChoiceStr}`;
  document.getElementById("computer-choice").textContent = `Computer chose: ${reverseChoices[computerChoice]}`;

  const result = determineWinner(userChoice, computerChoice);
  document.getElementById("outcome").textContent = result;

  playSound(result);
  updateScores(result);

  round++;
  document.getElementById("round").textContent = round;

  if (round > 10) {
    setTimeout(() => {
      let finalMessage = userScore > computerScore ? "🏆 You won the game!" :
                         userScore < computerScore ? "😢 Computer won the game!" :
                         "🤝 It's a draw!";
      alert(finalMessage);
    }, 500);
  }
}

function randomComputerChoice() {
  const values = [1, 0, -1];
  return values[Math.floor(Math.random() * values.length)];
}

function determineWinner(user, computer) {
  if (user === computer) {
    return "It's a tie!";
  } else if (
    (user === 1 && computer === -1) ||
    (user === 0 && computer === 1) ||
    (user === -1 && computer === 0)
  ) {
    return "🎉 You win!";
  } else {
    return "💻 Computer wins!";
  }
}

function updateScores(result) {
  if (result.includes("You win")) {
    userScore++;
    document.getElementById("user-score").textContent = userScore;
  } else if (result.includes("Computer wins")) {
    computerScore++;
    document.getElementById("computer-score").textContent = computerScore;
  }
}

function playSound(result) {
  if (result.includes("You win")) {
    document.getElementById("win-sound").play();
  } else if (result.includes("Computer wins")) {
    document.getElementById("lose-sound").play();
  } else {
    document.getElementById("tie-sound").play();
  }
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  round = 1;
  document.getElementById("user-score").textContent = userScore;
  document.getElementById("computer-score").textContent = computerScore;
  document.getElementById("round").textContent = round;
  document.getElementById("outcome").textContent = "";
  document.getElementById("user-choice").textContent = "";
  document.getElementById("computer-choice").textContent = "";
}