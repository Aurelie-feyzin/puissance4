import { transitionState } from './timerState';
import type { TimerConfig, TimerController, TimerState } from './types';

const TICK_RATE_MS = 100;

function getRandomDuration(minMs: number, maxMs: number): number {
  return Math.floor(Math.random() * (maxMs - minMs + 1) + minMs);
}

export function createTimer(config: TimerConfig): TimerController {
  let state: TimerState = 'idle';

  let intervalId: number | null = null;

  let startTime = 0;
  let endTime = 0;

  let remainingMs = 0;

  let targetDurationMs = getRandomDuration(
    config.minDurationMs,
    config.maxDurationMs,
  );

  function clearTimerInterval(): void {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  }

  function tick(): void {
    const now = performance.now();

    remainingMs = Math.max(0, endTime - now);

    config.onTick?.(remainingMs);

    if (remainingMs <= 0) {
      clearTimerInterval();

      state = transitionState(state, 'exploded');

      config.onExplode?.();
    }
  }

  function start(): void {
    if (state === 'running') {
      return;
    }

    targetDurationMs = getRandomDuration(
      config.minDurationMs,
      config.maxDurationMs,
    );

    remainingMs = targetDurationMs;

    startTime = performance.now();
    endTime = startTime + targetDurationMs;

    state = transitionState(state, 'running');

    config.onTick?.(remainingMs);

    intervalId = window.setInterval(tick, TICK_RATE_MS);
  }

  function stop(): void {
    if (state !== 'running') {
      return;
    }

    clearTimerInterval();

    remainingMs = Math.max(0, endTime - performance.now());

    state = transitionState(state, 'stopped');
  }

  function reset(): void {
    clearTimerInterval();

    remainingMs = 0;

    state = transitionState(state, 'idle');
  }

  return {
    start,
    stop,
    reset,

    getState: (): TimerState => state,

    getRemainingMs: (): number => remainingMs,

    getTargetDurationMs: (): number => targetDurationMs,
  };
}
