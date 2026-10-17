import type { BoardState, Difficulty, Player } from '../types';
import { checkWinner, getAvailableMoves, isBoardFull } from './gameLogic';

/**
 * Returns the best move index using Minimax algorithm.
 * Evaluates terminal states with depth discounting to prioritize faster wins.
 */
function minimax(
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
  aiMark: Player,
  humanMark: Player,
  alpha = -Infinity,
  beta = Infinity
): { score: number; move?: number } {
  const win = checkWinner(board);
  if (win) {
    return {
      score: win.winner === aiMark ? 100 - depth : depth - 100,
    };
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
      if (beta <= alpha) {
        break; // Alpha-beta pruning
      }
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
      if (beta <= alpha) {
        break; // Alpha-beta pruning
      }
    }
    return { score: bestScore, move: bestMove };
  }
}

/**
 * Finds if either player has an immediate winning move on the current board.
 */
function findImmediateWin(board: BoardState, player: Player): number | null {
  const availableMoves = getAvailableMoves(board);
  for (const move of availableMoves) {
    board[move] = player;
    const win = checkWinner(board);
    board[move] = null;
    if (win && win.winner === player) {
      return move;
    }
  }
  return null;
}

/**
 * Generates an AI move based on the selected difficulty.
 */
export function getComputerMove(
  board: BoardState,
  computerMark: Player,
  difficulty: Difficulty
): number {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) {
    return -1;
  }

  const humanMark: Player = computerMark === 'X' ? 'O' : 'X';

  // Easy Difficulty:
  // Makes mostly random moves (90% random, 10% takes immediate win if available)
  if (difficulty === 'easy') {
    if (Math.random() < 0.1) {
      const immediateWin = findImmediateWin(board, computerMark);
      if (immediateWin !== null) return immediateWin;
    }
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  // Medium Difficulty:
  // 1. Takes immediate winning move
  // 2. Blocks immediate opponent winning move
  // 3. Takes center if available (70% probability)
  // 4. Takes random move
  if (difficulty === 'medium') {
    const immediateWin = findImmediateWin(board, computerMark);
    if (immediateWin !== null) return immediateWin;

    const immediateBlock = findImmediateWin(board, humanMark);
    if (immediateBlock !== null) return immediateBlock;

    if (board[4] === null && Math.random() < 0.7) {
      return 4;
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  // Hard Difficulty:
  // Plays near-optimal strategy with a 10% human mistake probability matching Gametable
  if (difficulty === 'hard') {
    if (Math.random() < 0.1) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[randomIndex];
    }
    // Otherwise use minimax
    const { move } = minimax(board, 0, true, computerMark, humanMark);
    return move !== undefined ? move : availableMoves[0];
  }

  // Expert Difficulty (Minimax - Unbeatable):
  // Never loses against an optimal opponent. Always ties or wins.
  const { move } = minimax(board, 0, true, computerMark, humanMark);
  return move !== undefined ? move : availableMoves[0];
}
