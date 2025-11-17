import { Node, type NodeScene } from "./node.n";

export interface RootNodeScene extends NodeScene {
    type: "RootNode";
}

export class RootNode extends Node {
    public override parent: undefined = undefined;
    public override root: RootNode = this;

    constructor(data: RootNodeScene) {
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
        return {
            ...super.serialize(),
            type: "RootNode",
        };
    }
    public static override deserialize(data: RootNodeScene): RootNode {
        return new RootNode(data);
    }
}
