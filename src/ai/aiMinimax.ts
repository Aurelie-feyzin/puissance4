import { Board, Player, GameState } from "../game/types.js";
import { ROWS, COLS } from "../game/constants.js";
import { checkWin, isDraw } from "../game/rules.js";
import { cloneBoard, getValidColumns, playMoveOnBoard } from "../game/board.js";

const AI_PLAYER: Player = 2;
const HUMAN_PLAYER: Player = 1;

const MAX_SCORE = 1000000;
const MIN_SCORE = -1000000;

export function getBestMove(state: GameState, depth: number): number {
  const validMoves = getValidColumns(state.board);

  let bestScore = MIN_SCORE;
  let bestCol = validMoves[Math.floor(Math.random() * validMoves.length)];

  for (const col of orderMoves(validMoves)) {
    const newBoard = cloneBoard(state.board);
    playMoveOnBoard(newBoard, col, AI_PLAYER);

    const score = minimax(newBoard, depth - 1, false, MIN_SCORE, MAX_SCORE);

    if (score > bestScore) {
      bestScore = score;
      bestCol = col;
    }
  }

  return bestCol;
}

function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number,
): number {

if (checkWin(board, AI_PLAYER)) return MAX_SCORE;
if (checkWin(board, HUMAN_PLAYER)) return MIN_SCORE;
  if (isDraw(board)) return 0;
  if (depth === 0) return evaluateBoard(board);

  const validMoves = getValidColumns(board);

  if (isMaximizing) {
    let maxEval = MIN_SCORE;

    for (const col of orderMoves(validMoves)) {
      const newBoard = cloneBoard(board);
      playMoveOnBoard(newBoard, col, AI_PLAYER);

      const evalScore = minimax(newBoard, depth - 1, false, alpha, beta);
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);

      if (beta <= alpha) break; // ✂️ pruning
    }

    return maxEval;
  } else {
    let minEval = MAX_SCORE;

    for (const col of orderMoves(validMoves)) {
      const newBoard = cloneBoard(board);
      playMoveOnBoard(newBoard, col, HUMAN_PLAYER);

      const evalScore = minimax(newBoard, depth - 1, true, alpha, beta);
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);

      if (beta <= alpha) break; // ✂️ pruning
    }

    return minEval;
  }
}

function evaluateBoard(board: Board): number {
  let score = 0;

  // 🎯 priorité centre
  const centerCol = Math.floor(COLS / 2);
  let centerCount = 0;

  for (let row = 0; row < ROWS; row++) {
    if (board[row][centerCol] === AI_PLAYER) centerCount++;
  }

  score += centerCount * 3;

  // 🧩 analyser toutes les fenêtres de 4
  score += evaluateLines(board, AI_PLAYER);
  score -= evaluateLines(board, HUMAN_PLAYER);

  return score;
}

function evaluateLines(board: Board, player: Player): number {
  let score = 0;

  // Horizontal
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const window = [
        board[row][col],
        board[row][col + 1],
        board[row][col + 2],
        board[row][col + 3],
      ];
      score += evaluateWindow(window, player);
    }
  }

  // Vertical
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS - 3; row++) {
      const window = [
        board[row][col],
        board[row + 1][col],
        board[row + 2][col],
        board[row + 3][col],
      ];
      score += evaluateWindow(window, player);
    }
  }

  // Diagonale /
  for (let row = 3; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const window = [
        board[row][col],
        board[row - 1][col + 1],
        board[row - 2][col + 2],
        board[row - 3][col + 3],
      ];
      score += evaluateWindow(window, player);
    }
  }

  // Diagonale \
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const window = [
        board[row][col],
        board[row + 1][col + 1],
        board[row + 2][col + 2],
        board[row + 3][col + 3],
      ];
      score += evaluateWindow(window, player);
    }
  }

  return score;
}

function evaluateWindow(window: number[], player: Player): number {
  const opponent = player === 2 ? 1 : 2;

  const countPlayer = window.filter((c) => c === player).length;
  const countOpponent = window.filter((c) => c === opponent).length;
  const countEmpty = window.filter((c) => c === 0).length;

  // 🎯 IA
  if (countPlayer === 4) return 10000;
  if (countPlayer === 3 && countEmpty === 1) return 100;
  if (countPlayer === 2 && countEmpty === 2) return 10;

  // 🛑 BLOQUAGE (TRÈS IMPORTANT)
  if (countOpponent === 3 && countEmpty === 1) return -1000;

  return 0;
}

function orderMoves(moves: number[]): number[] {
  const center = Math.floor(COLS / 2);

  return moves.sort((a, b) => {
    return Math.abs(a - center) - Math.abs(b - center);
  });
}