import { createCounter } from './game/counter';
import { createTimer } from './game/timer';

import {
  bindStartButton,
  bindStopButton,
  bindResetCounterButton,
  setResetCounterEnabled,
  setStartEnabled,
} from './ui/controls';

import {
  clearExplosion,
  showExplosion,
  updateLaunchCounter,
  updateTimerDisplay,
} from './ui/display';

const counter = createCounter();

const timer = createTimer({
  minDurationMs: 20_000,
  maxDurationMs: 90_000,

  onTick: (remainingMs) => {
    updateTimerDisplay(remainingMs);
  },

  onExplode: () => {
    showExplosion();

    setStartEnabled(true);
    setResetCounterEnabled(true);
  },
});

let isRunning = false;

function setRunning(state: boolean) {
  isRunning = state;

  setStartEnabled(!state);
  setResetCounterEnabled(!state);
}

bindStartButton(() => {
  if (isRunning) return;

  clearExplosion();

  timer.start();

  counter.increment();

  updateLaunchCounter(counter.getValue());

  setRunning(true);
});

bindStopButton(() => {
  timer.stop();

  setRunning(false);
});

bindResetCounterButton(() => {
  if (isRunning) return;

  counter.reset();

  updateLaunchCounter(0);
});

updateTimerDisplay(0);
updateLaunchCounter(0);

setStartEnabled(true);
setResetCounterEnabled(true);
