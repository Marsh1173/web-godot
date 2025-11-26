import { type NodeRegistration } from "../node-registry";
import type { RootNode } from "../root-node.n";
import { UiNode, type UiNodeScene } from "./ui-node.n";

export interface UiContainerNodeScene extends UiNodeScene {}

export const UiContainerNodeRegistration: NodeRegistration = {
    name: "UiContainerNode",
    validate_data_and_deserialize: (data: unknown) => new UiContainerNode(data as UiContainerNodeScene),
};

export class UiContainerNode extends UiNode {
    constructor(data: UiContainerNodeScene) {
        super(data);
    }

    protected override create_element(root_node: RootNode, parent_id: string | undefined): string {
        return root_node.game.ui_render_api.create_element(
            "div",
            (el: HTMLElement) => {
                for (const [style_key, style_value] of Object.entries(this.element_base_styles)) {
                    el.style[style_key as any] = style_value as any;
                }
            },
            parent_id
        );
    }

    // MARK: Class-specific serialization
    public override serialize(): UiContainerNodeScene {
        return UiContainerNode.create_scene({
            ...super.serialize(),
        });
    }
    public static override create_scene(data: Omit<UiContainerNodeScene, "type">): UiContainerNodeScene {
        return {
            ...data,
            type: UiContainerNodeRegistration.name,
        };
    }
}
