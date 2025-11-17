import { BaseNode } from "@/model/node/basenode";
import { register_node } from "old_src/model/node/registry";
import type { Scene } from "old_src/model/scene/scene.s";

@register_node()
export class TestNode extends BaseNode<{ value: string }> {
    protected override get_props() {
        return { value: "here" };
    }

    public override _process(delta: number): void {
        console.log(delta);
    }
}

const test_node_scene: Scene<TestNode> = {
    node_type: "TestNode",
    name: "my name",
    children: [],
    props: { value: "" },
};
