import { getRandomMove } from './aiRandom.js';
import { getHeuristicMove } from './aiHeuristic.js';
import { getBestMove } from './aiMinimax.js';
import type { GameState } from '../game/types.js';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export function aiPlay(state: GameState, difficulty: Difficulty): number {
  console.log(difficulty);
  switch (difficulty) {
    case 'easy':
      return getRandomMove(state);

    case 'medium':
      return getHeuristicMove(state);

    case 'hard':
      return getBestMove(state, 4);

    case 'expert':
      return getBestMove(state, 6);

    default:
      return getRandomMove(state);
  }
}
