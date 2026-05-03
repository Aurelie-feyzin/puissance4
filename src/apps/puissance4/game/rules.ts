import { ROWS, COLS } from './constants.js';
import type { Board, Player } from './types.js';

/**
 * Vérifie si un joueur a gagné
 */
export function checkWin(board: Board, player: Player): boolean {
  // Parcours de toute la grille
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] !== player) continue;

      if (
        checkDirection(board, row, col, 0, 1, player) || // →
        checkDirection(board, row, col, 1, 0, player) || // ↓
        checkDirection(board, row, col, 1, 1, player) || // ↘
        checkDirection(board, row, col, 1, -1, player) // ↗
      ) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Vérifie 4 cases dans une direction donnée
 */
function checkDirection(
  board: Board,
  startRow: number,
  startCol: number,
  rowStep: number,
  colStep: number,
  player: Player,
): boolean {
  for (let i = 0; i < 4; i++) {
    const currentRow = startRow + rowStep * i;
    const currentCol = startCol + colStep * i;

    // Hors grille
    if (
      currentRow < 0 ||
      currentRow >= ROWS ||
      currentCol < 0 ||
      currentCol >= COLS
    ) {
      return false;
    }

    if (board[currentRow][currentCol] !== player) {
      return false;
    }
  }

  return true;
}

/**
 * Vérifie si la partie est nulle
 */
export function isDraw(board: Board): boolean {
  return board[0].every((cell) => cell !== 0);
}
