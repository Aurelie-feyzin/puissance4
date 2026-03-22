import { GameState, playMove } from "../game/gameState.js";
import { renderBoard } from "./render.js";
import { getRandomMove } from "../ai/aiRandom.js";
import { renderStatus } from "./render.js";

/**
 * Attache les événements au DOM
 */
export function bindEvents(state: GameState): void {
  const boardElement = document.getElementById("board");

  if (!boardElement) {
    console.error("Element #board introuvable");
    return;
  }

  boardElement.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    // Vérifie qu'on clique bien sur une cellule
    if (!target.classList.contains("cell")) return;

    const col = target.dataset.col;

    if (!col) return;

    handlePlayerMove(state, parseInt(col));
  });
}

/**
 * Gère le coup du joueur + IA
 */
function handlePlayerMove(state: GameState, col: number): void {
  // Joueur joue
  const success = playMove(state, col);
  if (!success) return;

  renderBoard(state.board);
  renderStatus(state.result);

  // Si fin de partie → stop
  if (state.result !== null) {
    console.log("Fin de partie :", state.result);
    return;
  }

  // Tour IA (petit délai pour UX)
  setTimeout(() => {
    const aiMove = getRandomMove(state.board);

    if (aiMove !== null) {
      playMove(state, aiMove);
      renderBoard(state.board);
      renderStatus(state.result);
    }

    if (state.result !== null) {
      console.log("Fin de partie :", state.result);
    }
  }, 300);
}
