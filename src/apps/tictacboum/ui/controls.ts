import { resetCounterButton, startButton, stopButton } from './dom';

export function bindStartButton(handler: () => void): void {
  startButton?.addEventListener('click', handler);
}

export function bindStopButton(handler: () => void): void {
  stopButton?.addEventListener('click', handler);
}

export function bindResetCounterButton(handler: () => void): void {
  resetCounterButton?.addEventListener('click', handler);
}

export function setStartEnabled(enabled: boolean): void {
  if (!startButton) return;
  startButton.disabled = !enabled;
}

export function setResetCounterEnabled(enabled: boolean): void {
  if (!resetCounterButton) return;
  resetCounterButton.disabled = !enabled;
}
