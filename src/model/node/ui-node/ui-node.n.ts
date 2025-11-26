import { GameNode, type GameNodeScene } from "../node.n";
import type { RootNode } from "../root-node.n";

export interface UiNodeScene extends GameNodeScene {
    element_base_styles?: Partial<CSSStyleDeclaration>;
}

// export const UiNodeRegistration: NodeRegistration = {
//     name: "UiNode",
//     validate_data_and_deserialize: (data: unknown) => new UiNode(data as UiNodeScene),
// };

export abstract class UiNode extends GameNode {
    /**
     * This will always be defined when this UiNode is in the scene tree, and undefined when not.
     */
    protected element_id: string | undefined = undefined;
    protected readonly element_base_styles: Partial<CSSStyleDeclaration> = {};

    constructor(data: UiNodeScene) {
        super(data);

        if (data.element_base_styles) {
            this.element_base_styles = data.element_base_styles;
        }
    }

    protected abstract create_element(root_node: RootNode, parent_id: string | undefined): string;

    public override _ready(root_node: RootNode): void {
        let parent = this.parent;
        let parent_id: string | undefined = undefined;
        while (parent !== undefined && parent_id === undefined) {
            if (parent instanceof UiNode && parent.element_id !== undefined) {
                parent_id = parent.element_id;
            }
            parent = parent.parent;
        }

        this.element_id = this.create_element(root_node, parent_id);
    }

    public override _before_leave_scene_tree(root_node: RootNode): void {
        if (this.element_id) {
            root_node.game.ui_render_api.remove_element(this.element_id);
        }

        this.element_id = undefined;
    }

    // MARK: Class-specific serialization
    public override serialize(): UiNodeScene {
        return UiNode.create_scene({
            ...super.serialize(),
            element_base_styles: this.element_base_styles,
        });
    }
    public static override create_scene(data: Omit<UiNodeScene, "type">): UiNodeScene {
        return {
            ...data,
            type: "UiNode",
        };
    }
}
