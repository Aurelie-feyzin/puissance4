// Une case : vide, joueur, ou IA
export type Cell = 0 | 1 | 2;

// Un joueur (humain ou IA)
export type Player = 1 | 2;

export enum CellValue {
  EMPTY = 0,
  PLAYER = 1,
  AI = 2,
}

// La grille complète
export type Board = Cell[][];

// Coordonnées dans la grille
export interface Position {
  row: number;
  col: number;
}

// Résultat de partie
export type GameResult = "win" | "lose" | "draw" | null;


export interface GameState {
  board: Board;
  currentPlayer: Player;
  result: GameResult;
}

export interface MoveResult {
  row: number;
  col: number;
  player: Player;
}
