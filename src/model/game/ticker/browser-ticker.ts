import type { Ticker } from "./ticker";

export class BrowserTicker implements Ticker {
    private running = false;
    private paused = false;
    private lastTime = 0;
    private target?: (delta: number) => void;

    start(target: (delta: number) => void): void {
        this.target = target;
        this.running = true;
        this.paused = false;
        this.lastTime = performance.now();
        requestAnimationFrame(this.loop);
    }

    pause(): void {
        this.paused = true;
    }

    unpause(): void {
        if (!this.running || !this.paused) return;
        this.paused = false;
        this.lastTime = performance.now();
        requestAnimationFrame(this.loop);
    }

    private loop = (time: number) => {
        if (!this.running || this.paused) return;

        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;
        this.target?.(delta);

        requestAnimationFrame(this.loop);
    };
}
