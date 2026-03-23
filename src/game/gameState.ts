import { Board, Player, GameResult, GameState, MoveResult } from "./types.js";
import { createBoard, dropToken, isBoardFull } from "./board.js";
import { checkWin } from "./rules.js";

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
export function playMove(state: GameState, col: number): MoveResult | null {
  if (state.result !== null) return null;

  const player = state.currentPlayer;
  const row = dropToken(state.board, col, player);

  if (row === null) return null;

  // Vérifier victoire
  if (checkWin(state.board, player)) {
    state.result = player === 1 ? "win" : "lose";
  } else if (isBoardFull(state.board)) {
    state.result = "draw";
  } else {
    // Changer de joueur uniquement si la partie continue
    state.currentPlayer = player === 1 ? 2 : 1;
  }

  return { row, col, player };
}

/**
 * Réinitialise la partie
 */
export function resetGame(state: GameState): void {
  state.board = createBoard();
  state.currentPlayer = 1;
  state.result = null;
}
