const gameDetails = document.querySelector('.game__details');
const gamePieces = document.querySelectorAll('.game__piece');
const resetBtn = document.querySelector('.restart__btn');
const startBtn = document.querySelector('.start__btn');

function gameBoard() {
    let board = ['', '', '', '', '', '', '', '', ''];
    const winConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Left-to-right diagonal
        [2, 4, 6], // Right-to-left diagonal
    ];
    let currentPlayer = 'X';
    let answersLeft = 9;

    const populateBoard = () => {
        gamePieces.forEach((piece) => {
            piece.addEventListener('click', updateBoard);
            board.forEach((el) => {
                piece.textContent = el;
            });
        });
    };

    const decrementAnswersLeft = () => answersLeft--;

    const resetAnswersLeft = () => (answersLeft = 9);

    const getAnswersLeft = () => answersLeft;

    const swapCurrentPlayer = () => {
        if (currentPlayer === 'X') {
            currentPlayer = 'O';
        } else {
            currentPlayer = 'X';
        }
    };

    const checkWin = () => {
        const isFull = board.some((val) => val !== '');
        const isWon = winConditions.some((condition) => {
            const [a, b, c] = condition;

            if (
                board[a] === currentPlayer &&
                board[b] === currentPlayer &&
                board[c] === currentPlayer
            ) {
                return true;
            }
            return false;
        });

        if (isFull && answersLeft !== 0) {
            throw new Error(
                console.error(
                    `For some reason you still have answers left but the board is showing full, go ahead and refresh the browser to fix this!!`
                )
            );
        }

        if (isWon) {
            console.log('You Won!');
            return true;
        } else if (!isWon && isFull) {
            console.log('Its a tie!!');
            return false;
        }
        console.log('You lose!!');
        return false;
    };

    const updateBoard = (e) => {
        const indexOfClick = e.target.closest('div').dataset.index;
        console.log(indexOfClick);
        if (board[indexOfClick] !== '') {
            throw new Error(
                console.error(`Hey make sure to select only available spaces!!`)
            );
        }

        board[indexOfClick] = currentPlayer;
        populateBoard();
        swapCurrentPlayer();
        decrementAnswersLeft();
        console.log('Board has been updated.');
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
        resetAnswersLeft();
        populateBoard();
        return console.log('Board has been reset.');
    };

    return {
        checkWin,
        updateBoard,
        resetBoard,
        populateBoard,
        getAnswersLeft,
    };
}

const newGame = gameBoard();

function startGame() {
    newGame.populateBoard();
}

function resetGame() {
    newGame.resetBoard();
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
