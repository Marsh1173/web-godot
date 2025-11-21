import { JsxFactory } from "src/model/game/env/ui-render-api/jsx-factory";
import { GameNode, type GameNodeScene } from "../node.n";
import type { RootNode } from "../root-node.n";
import type { NodeRegistration } from "../node-registry";

export interface UiNodeScene extends GameNodeScene {}

export const UiNodeRegistration: NodeRegistration = {
    name: "UiNode",
    validate_data_and_deserialize: (data: unknown) => new UiNode(data as UiNodeScene),
};

export class UiNode extends GameNode {
    // public readonly elem: HTMLElement;
    public readonly element: () => Node = () => <div></div>;

    constructor(data: UiNodeScene) {
        super(data);

        // this.elem = createElement('a')
    }

    public override _ready(root_node: RootNode): void {
        root_node.game.ui_render_api.append_element_to_root(this.element);
    }

    // MARK: Class-specific serialization
    public override serialize(): UiNodeScene {
        return UiNode.create_scene({
            ...super.serialize(),
        });
    }
    public static override create_scene(data: Omit<UiNodeScene, "type">): UiNodeScene {
        return {
            ...data,
            type: UiNodeRegistration.name,
        };
    }
}
