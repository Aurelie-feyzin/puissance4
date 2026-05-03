import type { CounterController } from './types';

export function createCounter(): CounterController {
  let value = 0;

  function increment(): void {
    value += 1;
  }

  function reset(): void {
    value = 0;
  }

  function getValue(): number {
    return value;
  }

  return {
    increment,
    reset,
    getValue,
  };
}
