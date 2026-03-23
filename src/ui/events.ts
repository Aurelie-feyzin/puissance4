import { playMove, resetGame } from "../game/gameState.js";
import { dropToken } from "../game/board.js";
import { checkWin } from "../game/rules.js";
import { renderBoard, renderStatus } from "./render.js";
// import { getRandomMove } from "../ai/aiRandom.js";
import { getSmartMove } from "../ai/aiSmart.js";
import { GameState } from "../game/types.js";


export function bindEvents(state: GameState): void {
  const boardElement = document.getElementById("board");
  const restartButton = document.getElementById("restart");

  if (!boardElement) {
    console.error("Element #board introuvable");
    return;
  }

  // 🎯 CLIC SUR LE BOARD
  boardElement.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (!target.classList.contains("cell")) return;

    const colAttr = target.dataset.col;
    if (!colAttr) return;

    const col = parseInt(colAttr, 10);

    handleTurn(state, col);
  });

  // 🔄 BOUTON RESTART
  if (restartButton) {
    restartButton.addEventListener("click", () => {
      resetGame(state);
      renderBoard(state.board);
      renderStatus(state.result);
    });
  }
}

function handleTurn(state: GameState, col: number): void {
  if (state.result !== null) return;

  // 🎯 Joueur
  const move = playMove(state, col);
  if (!move) return;

  renderBoard(state.board, move);
  renderStatus(state.result);

  if (state.result !== null) return;

  // 🤖 IA
  setTimeout(() => {
    const aiCol = getSmartMove(state.board);
    if (aiCol === null) return;

    const aiMove = playMove(state, aiCol);
    if (!aiMove) return;

    renderBoard(state.board, aiMove);
    renderStatus(state.result);
  }, 300);
}

/**
 * Gère le tour du joueur + IA avec animation
 */
function handlePlayerMove(state: GameState, col: number): void {
  if (state.result !== null) return;

  const currentPlayer = state.currentPlayer;

  // 🎯 Joueur joue
  const row = dropToken(state.board, col, currentPlayer);
  if (row === null) return;

  renderBoard(state.board, { row, col });

  // Vérifier victoire
  if (checkWin(state.board, currentPlayer)) {
    state.result = currentPlayer === 1 ? "win" : "lose";
    renderStatus(state.result);
    return;
  }

  // Vérifier match nul
  if (state.board[0].every((cell) => cell !== 0)) {
    state.result = "draw";
    renderStatus(state.result);
    return;
  }

  // Changer de joueur
  state.currentPlayer = 2;

  // 🤖 Tour IA
  setTimeout(() => {
    const aiPlayer = state.currentPlayer;
    const aiCol = getSmartMove(state.board);

    if (aiCol === null) return;

    const aiRow = dropToken(state.board, aiCol, aiPlayer);
    if (aiRow === null) return;

    renderBoard(state.board, { row: aiRow, col: aiCol });

    // Vérifier victoire IA
    if (checkWin(state.board, aiPlayer)) {
      state.result = "lose";
      renderStatus(state.result);
      return;
    }

    // Vérifier nul
    if (state.board[0].every((cell) => cell !== 0)) {
      state.result = "draw";
      renderStatus(state.result);
      return;
    }

    // Retour au joueur
    state.currentPlayer = 1;

    renderStatus(state.result);
  }, 300);
}
