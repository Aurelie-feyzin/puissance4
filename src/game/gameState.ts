import { Board, Player, GameResult } from "./types.js";
import { createBoard, dropToken, isBoardFull } from "./board.js";
import { checkWin } from "./rules.js";

export interface GameState {
  board: Board;
  currentPlayer: Player;
  result: GameResult;
}

/**
 * Initialise une nouvelle partie
 */
export function createGameState(): GameState {
  return {
    board: createBoard(),
    currentPlayer: 1,
    result: null,
  };
}

/**
 * Joue un coup
 */
export function playMove(state: GameState, col: number): boolean {
  // Partie déjà terminée
  if (state.result !== null) return false;

  const success = dropToken(state.board, col, state.currentPlayer);
  if (!success) return false;

  // Vérifier victoire
  if (checkWin(state.board, state.currentPlayer)) {
    state.result = state.currentPlayer === 1 ? "win" : "lose";
    return true;
  }

  // Vérifier match nul
  if (isBoardFull(state.board)) {
    state.result = "draw";
    return true;
  }

  // Changer de joueur
  state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;

  return true;
}

/**
 * Réinitialise la partie
 */
export function resetGame(state: GameState): void {
  state.board = createBoard();
  state.currentPlayer = 1;
  state.result = null;
}
