export type TimerState = 'idle' | 'running' | 'stopped' | 'exploded';

export interface TimerConfig {
  minDurationMs: number;
  maxDurationMs: number;

  onTick?: (remainingMs: number) => void;
  onExplode?: () => void;
}

export interface TimerController {
  start: () => void;
  stop: () => void;
  reset: () => void;

  getState: () => TimerState;
  getRemainingMs: () => number;
  getTargetDurationMs: () => number;
}

export interface CounterController {
  increment: () => void;
  reset: () => void;
  getValue: () => number;
}
