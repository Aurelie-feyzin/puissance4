import { explosionDisplay, launchCounterDisplay, timerDisplay } from './dom';

function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0',
  )}`;
}

export function updateTimerDisplay(remainingMs: number): void {
  if (!timerDisplay) {
    return;
  }

  timerDisplay.textContent = formatTime(remainingMs);
}

export function showExplosion(): void {
  if (!explosionDisplay) {
    return;
  }

  explosionDisplay.textContent = '💥 BOUM 💥';
}

export function clearExplosion(): void {
  if (!explosionDisplay) {
    return;
  }

  explosionDisplay.textContent = '';
}

export function updateLaunchCounter(value: number): void {
  if (!launchCounterDisplay) {
    return;
  }

  launchCounterDisplay.textContent = `Lancements : ${value}`;
}
