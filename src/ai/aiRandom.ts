import { Board } from "../game/types.js";
import { getValidColumns } from "../game/board.js";

/**
 * Retourne une colonne jouable aléatoire
 */
export function getRandomMove(board: Board): number | null {
  const validColumns = getValidColumns(board);

  if (validColumns.length === 0) {
    return null; // aucun coup possible
  }

  const randomIndex = Math.floor(Math.random() * validColumns.length);
  return validColumns[randomIndex];
}
