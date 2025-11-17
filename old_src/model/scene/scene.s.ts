import type { BaseNode } from "../node/basenode";

export type Scene<NodeType extends BaseNode<any>> = ReturnType<NodeType["serialize"]>;
