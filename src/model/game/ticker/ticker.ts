export interface Ticker {
  start(target: (delta: number) => void): void;
  pause(): void;
  unpause(): void;
}
