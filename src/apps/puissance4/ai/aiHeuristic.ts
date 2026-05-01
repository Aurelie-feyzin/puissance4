import { getValidColumns, cloneBoard, dropToken } from "../game/board";
import { checkWin } from "../game/rules";
import type { Player, GameState } from "../game/types";


const AI_PLAYER: Player = 2;
const HUMAN_PLAYER: Player = 1;

/**
 * IA intelligente simple
 */
export function getHeuristicMove(state: GameState): number {
  const board = state.board;
  const validColumns = getValidColumns(board);

  if (validColumns.length === 0) {
    throw new Error("No valid moves available");
  }

  // 1️⃣ Gagner immédiatement
  for (const col of validColumns) {
    const tempBoard = cloneBoard(board);
    dropToken(tempBoard, col, AI_PLAYER);

    if (checkWin(tempBoard, AI_PLAYER)) {
      return col;
    }
  }

  // 2️⃣ Bloquer le joueur
  for (const col of validColumns) {
    const tempBoard = cloneBoard(board);
    dropToken(tempBoard, col, HUMAN_PLAYER);

    if (checkWin(tempBoard, HUMAN_PLAYER)) {
      return col;
    }
  }

  // 3️⃣ Privilégier le centre
  const center = 3;
  if (validColumns.includes(center)) {
    return center;
  }

  // 4️⃣ Sinon aléatoire
  const randomIndex = Math.floor(Math.random() * validColumns.length);
  return validColumns[randomIndex];
}
