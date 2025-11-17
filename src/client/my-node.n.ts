import { Node, type NodeScene } from "src/model/node/node.n";

export interface MyNodeScene extends NodeScene {
    type: "MyNode";
}

export class MyNode extends Node {
    constructor(data: MyNodeScene) {
        super(data);
    }

    public override _physics_process(delta: number): void {
        // console.log(`physics_process: ${delta}`);
    }

    public override _process(delta: number): void {
        // console.log(`process: ${delta}`);
    }

    // MARK: Class-specific serialization
    public override serialize(): MyNodeScene {
        return {
            ...super.serialize(),
            type: "MyNode",
        };
    }
    public static override deserialize(data: MyNodeScene): MyNode {
        return new MyNode(data);
    }
}
