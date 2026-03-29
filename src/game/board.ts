import { Board, Player } from "./types.js";
import { ROWS, COLS } from "./constants.js";

/**
 * Crée une grille vide
 */
export function createBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

/**
 * Vérifie si une colonne est pleine
 */
export function isColumnFull(board: Board, col: number): boolean {
  return board[0][col] !== 0;
}

/**
 * Trouve la ligne disponible la plus basse dans une colonne
 */
export function getAvailableRow(board: Board, col: number): number | null {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      return row;
    }
  }
  return null;
}

/**
 * Place un pion dans la colonne
 * Retourne true si le coup est valide
 */
export function dropToken(
  board: Board,
  col: number,
  player: Player,
): number | null {
  const row = getAvailableRow(board, col);

  if (row === null) return null;

  board[row][col] = player;
  return row; // 👈 IMPORTANT
}

/**
 * Retourne les colonnes jouables
 */
export function getValidColumns(board: Board): number[] {
  const valid: number[] = [];

  for (let col = 0; col < COLS; col++) {
    if (!isColumnFull(board, col)) {
      valid.push(col);
    }
  }

  return valid;
}

export function playMoveOnBoard(
  board: Board,
  col: number,
  player: Player,
): number {
  // on part du bas de la colonne (gravité)
  for (let row = board.length - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      board[row][col] = player;
      return row;
    }
  }

  // colonne pleine = erreur logique
  throw new Error(`Column ${col} is full`);
}

/**
 * Vérifie si la grille est pleine
 */
export function isBoardFull(board: Board): boolean {
  return getValidColumns(board).length === 0;
}

/**
 * Clone la grille (important pour l'IA)
 */
export function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}
