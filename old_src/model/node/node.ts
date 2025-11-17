import { BaseNode } from "./basenode";
import { register_node } from "./registry";

@register_node()
export class Node extends BaseNode {
    protected override get_props() {
        return {};
    }
}
