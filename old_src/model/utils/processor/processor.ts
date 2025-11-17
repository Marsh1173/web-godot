export interface Processor {
  start(target: (delta: number) => void): void;
  pause(): void;
  unpause(): void;
}
