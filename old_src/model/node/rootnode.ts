import { BaseNode } from "./basenode";
import { register_node } from "./registry";

@register_node()
export class RootNode extends BaseNode<{}> {
    public override parent: undefined = undefined;

    protected override get_props() {
        return {};
    }
}
