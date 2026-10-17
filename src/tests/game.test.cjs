const assert = require('assert');

// 1. Rules Logic
const WINNING_COMBINATIONS = [
  { line: [0, 1, 2], direction: 'row-0' },
  { line: [3, 4, 5], direction: 'row-1' },
  { line: [6, 7, 8], direction: 'row-2' },
  { line: [0, 3, 6], direction: 'col-0' },
  { line: [1, 4, 7], direction: 'col-1' },
  { line: [2, 5, 8], direction: 'col-2' },
  { line: [0, 4, 8], direction: 'diag-main' },
  { line: [2, 4, 6], direction: 'diag-anti' },
];

function checkWinner(board) {
  for (const { line, direction } of WINNING_COMBINATIONS) {
    const [a, b, c] = line;
    const valA = board[a];
    if (valA && valA === board[b] && valA === board[c]) {
      return { winner: valA, line, direction };
    }
  }
  return null;
}

function isBoardFull(board) {
  return board.every(cell => cell !== null);
}

function getAvailableMoves(board) {
  const moves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) moves.push(i);
  }
  return moves;
}

// 2. Minimax AI
function minimax(board, depth, isMaximizing, aiMark, humanMark, alpha = -Infinity, beta = Infinity) {
  const win = checkWinner(board);
  if (win) {
    return { score: win.winner === aiMark ? 100 - depth : depth - 100 };
  }
  if (isBoardFull(board)) {
    return { score: 0 };
  }

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove = availableMoves[0];

    for (const move of availableMoves) {
      board[move] = aiMark;
      const result = minimax(board, depth + 1, false, aiMark, humanMark, alpha, beta);
      board[move] = null;

      if (result.score > bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) break;
    }
    return { score: bestScore, move: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove = availableMoves[0];

    for (const move of availableMoves) {
      board[move] = humanMark;
      const result = minimax(board, depth + 1, true, aiMark, humanMark, alpha, beta);
      board[move] = null;

      if (result.score < bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
      beta = Math.min(beta, bestScore);
      if (beta <= alpha) break;
    }
    return { score: bestScore, move: bestMove };
  }
}

function findImmediateWin(board, player) {
  const moves = getAvailableMoves(board);
  for (const m of moves) {
    board[m] = player;
    const win = checkWinner(board);
    board[m] = null;
    if (win && win.winner === player) return m;
  }
  return null;
}

function getComputerMove(board, computerMark, difficulty) {
  const moves = getAvailableMoves(board);
  if (moves.length === 0) return -1;
  const humanMark = computerMark === 'X' ? 'O' : 'X';

  if (difficulty === 'easy') {
    if (Math.random() < 0.1) {
      const w = findImmediateWin(board, computerMark);
      if (w !== null) return w;
    }
    return moves[Math.floor(Math.random() * moves.length)];
  }

  if (difficulty === 'medium') {
    const win = findImmediateWin(board, computerMark);
    if (win !== null) return win;
    const block = findImmediateWin(board, humanMark);
    if (block !== null) return block;
    if (board[4] === null && Math.random() < 0.7) return 4;
    return moves[Math.floor(Math.random() * moves.length)];
  }

  if (difficulty === 'hard') {
    if (Math.random() < 0.1) {
      return moves[Math.floor(Math.random() * moves.length)];
    }
    const { move } = minimax(board, 0, true, computerMark, humanMark);
    return move !== undefined ? move : moves[0];
  }

  // Expert
  const { move } = minimax(board, 0, true, computerMark, humanMark);
  return move !== undefined ? move : moves[0];
}

console.log('--- STARTING TIC TAC TOE TEST SUITE ---');

// Test 1: Win combinations
console.log('Testing win combinations...');
assert.strictEqual(checkWinner(['X', 'X', 'X', null, null, null, null, null, null])?.direction, 'row-0');
assert.strictEqual(checkWinner([null, null, null, 'O', 'O', 'O', null, null, null])?.direction, 'row-1');
assert.strictEqual(checkWinner([null, null, null, null, null, null, 'X', 'X', 'X'])?.direction, 'row-2');
assert.strictEqual(checkWinner(['X', null, null, 'X', null, null, 'X', null, null])?.direction, 'col-0');
assert.strictEqual(checkWinner([null, 'O', null, null, 'O', null, null, 'O', null])?.direction, 'col-1');
assert.strictEqual(checkWinner([null, null, 'X', null, null, 'X', null, null, 'X'])?.direction, 'col-2');
assert.strictEqual(checkWinner(['X', null, null, null, 'X', null, null, null, 'X'])?.direction, 'diag-main');
assert.strictEqual(checkWinner([null, null, 'O', null, 'O', null, 'O', null, null])?.direction, 'diag-anti');
console.log('✓ All 8 winning combinations verified!');

// Test 2: Draw detection
console.log('Testing draw condition...');
const drawBoard = [
  'X', 'O', 'X',
  'X', 'O', 'O',
  'O', 'X', 'X'
];
assert.strictEqual(checkWinner(drawBoard), null);
assert.strictEqual(isBoardFull(drawBoard), true);
console.log('✓ Draw detection verified!');

// Test 3: Medium AI immediate win & block
console.log('Testing Medium AI win & block...');
const blockTestBoard = [
  'X', 'X', null,
  null, 'O', null,
  null, null, null
];
const blockMove = getComputerMove(blockTestBoard, 'O', 'medium');
assert.strictEqual(blockMove, 2, 'Medium AI should block human at index 2');

const winTestBoard = [
  'O', 'O', null,
  'X', 'X', null,
  null, null, null
];
const winMove = getComputerMove(winTestBoard, 'O', 'medium');
assert.strictEqual(winMove, 2, 'Medium AI should win immediately at index 2');
console.log('✓ Medium AI immediate win and block verified!');

// Test 4: Expert Minimax NEVER Loses (Unbeatable Guarantee)
console.log('Testing Expert Minimax Unbeatable Guarantee over 100 simulated games...');

let humanWins = 0;
let aiWins = 0;
let ties = 0;

for (let game = 0; game < 50; game++) {
  const b = Array(9).fill(null);
  let turn = 'X';
  while (!checkWinner(b) && !isBoardFull(b)) {
    if (turn === 'X') {
      const avail = getAvailableMoves(b);
      const randMove = avail[Math.floor(Math.random() * avail.length)];
      b[randMove] = 'X';
      turn = 'O';
    } else {
      const aiMove = getComputerMove(b, 'O', 'expert');
      b[aiMove] = 'O';
      turn = 'X';
    }
  }
  const result = checkWinner(b);
  if (result) {
    if (result.winner === 'X') humanWins++;
    else aiWins++;
  } else {
    ties++;
  }
}
assert.strictEqual(humanWins, 0, `Expert AI as O must NEVER lose! Got ${humanWins} losses.`);
console.log(`✓ 50 games as O: AI Wins: ${aiWins}, Ties: ${ties}, Human Wins: ${humanWins} (ZERO losses!)`);

humanWins = 0;
aiWins = 0;
ties = 0;
for (let game = 0; game < 50; game++) {
  const b = Array(9).fill(null);
  let turn = 'X';
  while (!checkWinner(b) && !isBoardFull(b)) {
    if (turn === 'X') {
      const aiMove = getComputerMove(b, 'X', 'expert');
      b[aiMove] = 'X';
      turn = 'O';
    } else {
      const avail = getAvailableMoves(b);
      const randMove = avail[Math.floor(Math.random() * avail.length)];
      b[randMove] = 'O';
      turn = 'X';
    }
  }
  const result = checkWinner(b);
  if (result) {
    if (result.winner === 'O') humanWins++;
    else aiWins++;
  } else {
    ties++;
  }
}
assert.strictEqual(humanWins, 0, `Expert AI as X must NEVER lose! Got ${humanWins} losses.`);
console.log(`✓ 50 games as X: AI Wins: ${aiWins}, Ties: ${ties}, Human Wins: ${humanWins} (ZERO losses!)`);

// Test 5: Minimax vs Minimax (Self-play must always end in a tie)
console.log('Testing Expert AI vs Expert AI self-play...');
const selfPlayBoard = Array(9).fill(null);
let spTurn = 'X';
while (!checkWinner(selfPlayBoard) && !isBoardFull(selfPlayBoard)) {
  const move = getComputerMove(selfPlayBoard, spTurn, 'expert');
  selfPlayBoard[move] = spTurn;
  spTurn = spTurn === 'X' ? 'O' : 'X';
}
assert.strictEqual(checkWinner(selfPlayBoard), null, 'Optimal play against optimal play MUST be a tie');
assert.strictEqual(isBoardFull(selfPlayBoard), true);
console.log('✓ Expert vs Expert self-play ended in a perfect zero-sum Tie!');

console.log('--- ALL TEST SUITE ASSERTIONS PASSED PERFECTLY! ---');
