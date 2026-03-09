const gameDetails = document.querySelector('.game__details');
const gamePieces = document.querySelectorAll('.game__piece');
const resetBtn = document.querySelector('.restart__btn');
const startBtn = document.querySelector('.start__btn');
const nameForm = document.querySelector('#player_name_form');
const nameModal = document.querySelector('#name__modal');
const gameModal = document.querySelector('#game__modal');

function gameBoard(player1 = 'Player 1', player2 = 'Player 2') {
    let board = ['', '', '', '', '', '', '', '', ''];

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let currentPlayer = 'X';
    let answersLeft = 9;

    const populateBoard = () => {
        gameDetails.textContent = `${player1}'s turn`;

        gamePieces.forEach((piece, index) => {
            piece.textContent = board[index];
            piece.addEventListener('click', updateBoard);
        });
    };

    const decrementAnswersLeft = () => answersLeft--;
    const resetAnswersLeft = () => (answersLeft = 9);

    const swapCurrentPlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const checkWin = () => {
        const isWon = winConditions.some((condition) => {
            const [a, b, c] = condition;

            return (
                board[a] === currentPlayer &&
                board[b] === currentPlayer &&
                board[c] === currentPlayer
            );
        });

        const isFull = board.every((val) => val !== '');

        if (isWon) {
            gameDetails.textContent =
                currentPlayer === 'X'
                    ? `${player1} has Won!!`
                    : `${player2} has Won!!`;

            gamePieces.forEach((piece) =>
                piece.removeEventListener('click', updateBoard)
            );

            return true;
        }

        if (isFull) {
            gameDetails.textContent = 'Its a tie!!';
            return true;
        }

        return false;
    };

    const updateBoard = (e) => {
        const indexOfClick = e.target.dataset.index;

        if (board[indexOfClick] !== '') {
            console.error(`Hey make sure to select only available spaces!!`);
            return;
        }

        board[indexOfClick] = currentPlayer;
        e.target.textContent = currentPlayer;

        decrementAnswersLeft();

        if (checkWin()) return;

        swapCurrentPlayer();

        gameDetails.textContent =
            currentPlayer === 'X' ? `${player1}'s turn` : `${player2}'s turn`;
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        resetAnswersLeft();
        currentPlayer = 'X';

        gamePieces.forEach((piece) => {
            piece.textContent = '';
        });

        gameDetails.textContent = `${player1}'s turn`;
    };

    return {
        checkWin,
        updateBoard,
        resetBoard,
        populateBoard,
    };
}

let newGame = gameBoard();

function startGame(e) {
    e.preventDefault();
    nameModal.classList.toggle('hidden');
    gameModal.classList.toggle('hidden');
    newGame = gameBoard(e.target[0].value, e.target[1].value);
    newGame.populateBoard();
}

function resetGame() {
    newGame.resetBoard();
    newGame.populateBoard();
}

nameForm.addEventListener('submit', startGame);
resetBtn.addEventListener('click', resetGame);
