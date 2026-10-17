import type { BoardState, WinDirection, WinInfo } from '../types';

export const WINNING_COMBINATIONS: Array<{
  line: [number, number, number];
  direction: WinDirection;
}> = [
  { line: [0, 1, 2], direction: 'row-0' },
  { line: [3, 4, 5], direction: 'row-1' },
  { line: [6, 7, 8], direction: 'row-2' },
  { line: [0, 3, 6], direction: 'col-0' },
  { line: [1, 4, 7], direction: 'col-1' },
  { line: [2, 5, 8], direction: 'col-2' },
  { line: [0, 4, 8], direction: 'diag-main' },
  { line: [2, 4, 6], direction: 'diag-anti' },
];

/**
 * Checks if there is a winner on the board.
 * Returns the winning player, line indices, and direction, or null if no winner yet.
 */
export function checkWinner(board: BoardState): WinInfo | null {
  for (const { line, direction } of WINNING_COMBINATIONS) {
    const [a, b, c] = line;
    const valA = board[a];
    if (valA && valA === board[b] && valA === board[c]) {
      return {
        winner: valA,
        line,
        direction,
      };
    }
  }
  return null;
}

/**
 * Returns true if all 9 cells are occupied.
 */
export function isBoardFull(board: BoardState): boolean {
  return board.every((cell) => cell !== null);
}

/**
 * Returns an array of indices for all empty cells on the board.
 */
export function getAvailableMoves(board: BoardState): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}
