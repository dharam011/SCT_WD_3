const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
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

const handleClick = (e) => {
  const cell = e.target;
  const currentClass = currentPlayer === 'X' ? 'X' : 'O';

  if (cell.textContent === '' && gameActive) {
    cell.textContent = currentClass;
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
    }
  }
};

const checkWin = (currentClass) => {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
};

const isDraw = () => {
  return [...cells].every(cell => {
    return cell.textContent === 'X' || cell.textContent === 'O';
  });
};

const endGame = (draw) => {
  if (draw) {
    messageElement.textContent = 'Draw!';
  } else {
    messageElement.textContent = `${currentPlayer} Wins!`;
  }
  gameActive = false;
};

const swapTurns = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const restartGame = () => {
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
  });
  messageElement.textContent = '';
};

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
