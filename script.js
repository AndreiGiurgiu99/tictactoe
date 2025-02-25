const container = document.querySelector(".gameboard");
const footer = document.querySelector(".reset");
const winningChoices = [
    [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]
];

// Game board setup (creates the board and handles button creation)
const gameBoard = (function() {
    const totalElements = 9; // Number of buttons (9 tiles for Tic-Tac-Toe)
    const buttons = {};

    // Reset button creation
    let rst = document.createElement("button");
    rst.setAttribute('id', 'resetBtn');
    rst.textContent = "Reset";
    footer.appendChild(rst);

    // Function to create a new game board (buttons)
    const createBoard = function() {
        for (let i = 0; i < totalElements; i++) {
            let btn = document.createElement("button");
            btn.classList.add('tile');
            btn.setAttribute('id', i);

            // Event listener for player clicks
            btn.addEventListener('click', () => handlePlayerClick(i, btn));

            container.appendChild(btn);
            buttons[i] = btn;
        }
    };

    // Handle player's move (mark "X" on the board)
    const handlePlayerClick = function(id, button) {
        if (!humanPlayer.humanChoice.includes(id) && 
            !robotPlayer.choices.includes(id) && 
            humanPlayer.winnerFlag === 0) {
                
            humanPlayer.humanChoice.push(id);
            button.textContent = "X";
            button.disabled = true;  // Disable the button after selection

            if (playGame.gameWinner(humanPlayer.humanChoice)) {
                console.log("Player wins!");
                humanPlayer.winnerFlag = 1;
            } else {
                robotPlayer.robotChoice();  // Robot takes a turn
            }
        }
    };

    // Reset the game (clear choices and re-enable buttons)
    const resetGame = function() {
        humanPlayer.humanChoice.length = 0;
        robotPlayer.choices.length = 0;
        humanPlayer.winnerFlag = 0;
        
        // Reset button states
        Object.values(buttons).forEach(button => {
            button.textContent = "";
            button.disabled = false;
        });
        console.log("Game has been reset!");
    };

    // Attach reset functionality to the reset button
    rst.addEventListener('click', resetGame);

    // Initialize the game board
    createBoard();

    return { buttons, rst };
})();

// Robot player logic
const robotPlayer = (function() {
    const choices = [];

    // Function to handle robot's choice (make a random move)
    const robotChoice = function() {
        let temp;
        do {
            temp = Math.floor(Math.random() * 9); // Random move between 0 and 8
        } while (humanPlayer.humanChoice.includes(temp) || choices.includes(temp));

        choices.push(temp);
        gameBoard.buttons[temp].textContent = "O";
        gameBoard.buttons[temp].disabled = true;

        if (playGame.gameWinner(choices)) {
            console.log("Computer wins!");
            humanPlayer.winnerFlag = 1;
        }
    };

    return { robotChoice, choices };
})();

// Game logic (win check)
const playGame = (function() {
    // Function to check if a player has won
    const gameWinner = function(choices) {
        return winningChoices.some(combination =>
            combination.every(index => choices.includes(index))
        );
    };

    return { gameWinner };
})();

// Human player logic
const humanPlayer = (function() {
    let humanChoice = [];
    let winnerFlag = 0;

    return { humanChoice, winnerFlag };
})();
