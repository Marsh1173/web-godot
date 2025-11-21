import { JsxFactory } from "src/model/game/env/ui-render-api/jsx-factory";
import { type NodeRegistration } from "../node-registry";
import type { RootNode } from "../root-node.n";
import { UiNode, type UiNodeScene } from "./ui-node.n";

export interface UiTextNodeScene extends UiNodeScene {
    text: string;
}

export const UiTextNodeRegistration: NodeRegistration = {
    name: "UiTextNode",
    validate_data_and_deserialize: (data: unknown) => new UiTextNode(data as UiTextNodeScene),
};

export class UiTextNode extends UiNode {
    public text: string;
    public override readonly element: () => Node = () => (
        <span>
            <div style={{ color: "red" }}>asdf</div>
            {this.text}
        </span>
    );

    constructor(data: UiTextNodeScene) {
        super(data);
        this.text = data.text;
    }

    // MARK: Class-specific serialization
    public override serialize(): UiTextNodeScene {
        return UiTextNode.create_scene({
            ...super.serialize(),
            text: this.text,
        });
    }
    public static override create_scene(data: Omit<UiTextNodeScene, "type">): UiTextNodeScene {
        return {
            ...data,
            type: UiTextNodeRegistration.name,
        };
    }
}
