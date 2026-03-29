import { playMove, resetGame } from "../game/gameState.js";
import { renderBoard, renderStatus } from "./render.js";
import { GameState } from "../game/types.js";
import { aiPlay } from "../ai/aiManager.js";
import { Difficulty } from "../ai/aiManager.js";

let difficulty: Difficulty;

export function bindEvents(state: GameState): void {
  const boardElement = document.getElementById("board");
  const restartButton = document.getElementById("restart");
  
  if (!boardElement) {
    console.error("Element #board introuvable");
    return;
  }

const difficultyInputs = document.querySelectorAll(
  'input[name="difficulty"]',
) as NodeListOf<HTMLInputElement>;

// 🔹 Initialisation depuis le DOM
const checkedInput = document.querySelector(
  'input[name="difficulty"]:checked',
) as HTMLInputElement;

if (checkedInput) {
  difficulty = checkedInput.value as Difficulty;
}

// 🔹 Écoute des changements
difficultyInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      difficulty = input.value as Difficulty;
      console.log("Nouvelle difficulté :", difficulty);
    }
  });
});
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
    console.log(difficulty);
    const aiCol = aiPlay(state, difficulty);

    const aiMove = playMove(state, aiCol);
    if (!aiMove) return;

    renderBoard(state.board, aiMove);
    renderStatus(state.result);
  }, 300);
}
