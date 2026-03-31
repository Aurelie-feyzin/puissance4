import { getBestMove } from "../ai/aiMinimax.js";
import { checkWin } from "../game/rules.js";
import type { Board } from "../game/types.js";

const testBoard: Board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 0, 0, 0],
  [0, 0, 1, 2, 0, 0, 0],
  [1, 1, 2, 1, 0, 0, 0],
];

// IA doit jouer colonne 3 pour gagner ou optimiser
const move = getBestMove({ board: testBoard } as any, 4);

console.log("Best move:", move);
console.log(checkWin(testBoard, 1));
console.log(checkWin(testBoard, 2));

const board2 = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 2, 0, 0],
  [0, 1, 1, 1, 2, 0, 0],
];

const move2 = getBestMove({ board: board2 } as any, 6);

console.log("Best move:", move2);

const board3 = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 0, 0],
  [0, 1, 1, 1, 2, 0, 0],
];

const move3 = getBestMove({ board: board3 } as any, 6);

console.log("Best move:", move3);