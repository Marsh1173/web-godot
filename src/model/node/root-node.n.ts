import type { Game } from "../game/game";
import { Node, type NodeScene } from "./node.n";

export interface RootNodeScene extends NodeScene {
    type: "RootNode";
}

export class RootNode extends Node {
    public override parent: undefined = undefined;
    public override root: RootNode = this;

    constructor(data: RootNodeScene, public readonly game: Game) {
        super(data);
    }

    // MARK: Publicize methods
    public override inner_process(delta: number): void {
        super.inner_process(delta);
    }
    public override inner_physics_process(delta: number): void {
        super.inner_physics_process(delta);
    }

    // MARK: Class-specific serialization
    public override serialize(): RootNodeScene {
        throw new Error("Tried to serialize a root node");
    }
    public static override deserialize(data: RootNodeScene): RootNode {
        throw new Error("Tried to deserialize a root node");
    }
}
