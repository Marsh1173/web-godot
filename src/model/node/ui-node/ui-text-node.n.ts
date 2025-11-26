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

    constructor(data: UiTextNodeScene) {
        super(data);
        this.text = data.text;
    }

    protected override create_element(root_node: RootNode, parent_id: string | undefined): string {
        return root_node.game.ui_render_api.create_element(
            "span",
            (el: HTMLElement) => {
                el.innerText = this.text;
            },
            parent_id
        );
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
