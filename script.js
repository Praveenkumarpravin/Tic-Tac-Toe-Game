const tiles = document.querySelectorAll(".tiles");
const resultDisplay = document.getElementById("result");
const restartButton = document.getElementById("btn");

let currentPlayer = "❌";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle tile click
function handleTileClick(event) {
    const index = Array.from(tiles).indexOf(event.target);

    if (boardState[index] || !gameActive) return;

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
}

// Function to check for a winner
function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;       
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            resultDisplay.style.display = 'block'
            resultDisplay.innerHTML = `<h2>Player  ${currentPlayer}  is the Winner! 🥳🎉</h2>`;
            return;
        }
    }

    // Check for a draw
    if (!boardState.includes("")) {
        gameActive = false;
        resultDisplay.style.display = 'block'
        resultDisplay.innerHTML = `<h2>It's a Draw! 🤝</h2>`;
    }
}

// Function to restart the game
function restartGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "❌";
    resultDisplay.style.display = 'none';
    resultDisplay.innerHTML = `<h2></h2>`;
    tiles.forEach(tile => (tile.textContent = ""));
}

// Event listeners
tiles.forEach(tile => tile.addEventListener("click", handleTileClick));
restartButton.addEventListener("click", restartGame);

