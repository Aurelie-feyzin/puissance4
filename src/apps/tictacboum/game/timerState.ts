import type { TimerState } from './types';

const ALLOWED_TRANSITIONS: Record<TimerState, TimerState[]> = {
  idle: ['running'],
  running: ['stopped', 'exploded', 'idle'],
  stopped: ['running', 'idle'],
  exploded: ['idle', 'running'],
};

export function canTransition(from: TimerState, to: TimerState): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}

export function transitionState(
  current: TimerState,
  next: TimerState,
): TimerState {
  if (!canTransition(current, next)) {
    throw new Error(`Invalid timer transition: ${current} -> ${next}`);
  }

  return next;
}
