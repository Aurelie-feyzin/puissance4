import { Board, Cell, GameResult } from "../game/types.js";

/**
 * Génère et affiche la grille dans le DOM
 */
export function renderBoard(board: Board): void {
  const boardElement = document.getElementById("board");

  if (!boardElement) {
    console.error("Element #board introuvable");
    return;
  }

  // Reset du contenu
  boardElement.innerHTML = "";

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const cellValue = board[row][col];

      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");

      // Ajouter info de colonne (utile pour clic plus tard)
      cellElement.dataset.col = col.toString();

      // Ajouter classe selon joueur
      cellElement.classList.add(getCellClass(cellValue));

      boardElement.appendChild(cellElement);
    }
  }
}

/**
 * Retourne la classe CSS selon la valeur de la cellule
 */
function getCellClass(cell: Cell): string {
  switch (cell) {
    case 1:
      return "player";
    case 2:
      return "ai";
    default:
      return "empty";
  }
}

/**
 * Affiche le statut de la partie
 */
export function renderStatus(result: GameResult): void {
  const statusElement = document.getElementById("status");

  if (!statusElement) return;

  if (result === null) {
    statusElement.textContent = "";
    return;
  }

  switch (result) {
    case "win":
      statusElement.textContent = "🎉 Tu as gagné !";
      break;
    case "lose":
      statusElement.textContent = "💻 L'ordinateur a gagné !";
      break;
    case "draw":
      statusElement.textContent = "🤝 Match nul !";
      break;
  }
}