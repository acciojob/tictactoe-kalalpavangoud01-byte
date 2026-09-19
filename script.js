const player1 = document.getElementById("player-1");
const player2 = document.getElementById("player-2");
const submit = document.getElementById("submit");

const container = document.querySelector(".container");

let currentPlayer = "X";
let player1Name = "";
let player2Name = "";
let gameStarted = false;

submit.addEventListener("click", function () {
    player1Name = player1.value;
    player2Name = player2.value;

    if (player1Name === "" || player2Name === "") {
        return;
    }

    gameStarted = true;
    currentPlayer = "X";

    document.querySelector(".form-group").style.display = "none";

    const board = document.createElement("div");
    board.className = "board";

    const title = document.createElement("h1");
    title.textContent = "Tic Tac Toe";
    board.appendChild(title);

    const message = document.createElement("div");
    message.className = "message";
    message.textContent = player1Name + ", you're up";
    board.appendChild(message);

    const grid = document.createElement("div");
    grid.className = "grid";

    for (let i = 1; i <= 9; i++) {
        const cell = document.createElement("div");
        cell.id = i;
        cell.className = "cell";

        cell.addEventListener("click", function () {
            if (!gameStarted || cell.textContent !== "") {
                return;
            }

            cell.textContent = currentPlayer;

            if (checkWinner()) {
                const winner =
                    currentPlayer === "X" ? player1Name : player2Name;

                message.textContent = winner + ", congratulations you won!";
                gameStarted = false;
                return;
            }

            if (checkDraw()) {
                message.textContent = "It's a draw!";
                gameStarted = false;
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";

            message.textContent =
                (currentPlayer === "X" ? player1Name : player2Name) +
                ", you're up";
        });

        grid.appendChild(cell);
    }

    board.appendChild(grid);
    container.appendChild(board);
});

function checkWinner() {
    const winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;

        return (
            document.getElementById(a).textContent === currentPlayer &&
            document.getElementById(b).textContent === currentPlayer &&
            document.getElementById(c).textContent === currentPlayer
        );
    });
}

function checkDraw() {
    for (let i = 1; i <= 9; i++) {
        if (document.getElementById(i).textContent === "") {
            return false;
        }
    }

    return true;
}
