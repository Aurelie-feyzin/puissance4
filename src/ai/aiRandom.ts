import { GameState } from "../game/types.js";
import { getValidColumns } from "../game/board.js";

/**
 * Retourne une colonne jouable aléatoire
 */
export function getRandomMove(state: GameState): number {
  const validColumns = getValidColumns(state.board);

  if (validColumns.length === 0) {
    throw new Error("No valid moves available");
  }

  const randomIndex = Math.floor(Math.random() * validColumns.length);
  return validColumns[randomIndex];
}
