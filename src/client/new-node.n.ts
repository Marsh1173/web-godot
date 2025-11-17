import { Node, type NodeScene } from "src/model/node/node.n";

export interface NewNodeScene extends NodeScene {
    type: "NewNode";
}

export class NewNode extends Node {
    constructor(data: NewNodeScene) {
        super(data);
    }

    // MARK: Class-specific serialization
    public override serialize(): NewNodeScene {
        return {
            ...super.serialize(),
            type: "NewNode",
        };
    }
    public static override deserialize(data: NewNodeScene): NewNode {
        return new NewNode(data);
    }
}
