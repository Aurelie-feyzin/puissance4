import { createGameState } from "./game/gameState.js";
import { renderBoard } from "./ui/render.js";
import { bindEvents } from "./ui/events.js";

const game = createGameState();

renderBoard(game.board);
bindEvents(game);
