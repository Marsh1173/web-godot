import type { Game } from "../game/game";
import { GameNode, type GameNodeScene } from "./node.n";

export class RootNode extends GameNode {
    public override parent: undefined = undefined;
    public override root: RootNode = this;

    constructor(data: GameNodeScene, public readonly game: Game) {
        super(data);
    }

    // MARK: Publicize methods
    public override inner_process(delta: number): void {
        super.inner_process(delta);
    }
    public override inner_physics_process(delta: number): void {
        super.inner_physics_process(delta);
    }
}
