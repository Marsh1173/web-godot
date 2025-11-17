import type { Ticker } from "./ticker";

export class SetTimeoutTicker implements Ticker {
    private running = false;
    private paused = false;
    private frameDuration: number;
    private lastTime = 0;
    private target?: (delta: number) => void;

    constructor(target_fps: number) {
        this.frameDuration = 1000 / target_fps;
    }

    start(target: (delta: number) => void): void {
        this.target = target;
        this.running = true;
        this.paused = false;
        this.lastTime = performance.now();
        this.loop();
    }

    pause(): void {
        this.paused = true;
    }

    unpause(): void {
        if (!this.running || !this.paused) return;
        this.paused = false;
        this.lastTime = performance.now();
        this.loop();
    }

    private loop = () => {
        if (!this.running || this.paused) return;

        const start = Date.now();

        const delta = (start - this.lastTime) / 1000;
        this.lastTime = start;
        this.target?.(delta); // synchronous, guaranteed to finish

        const elapsed = Date.now() - start;
        const delay = Math.max(0, this.frameDuration - elapsed);

        // Ensures frame never overlaps another
        setTimeout(this.loop, delay);
    };
}
