import type { BaseNode, BaseNodeData } from "./basenode";

export type NodeConstructor<T extends BaseNode = BaseNode> = new (props: any) => T;

class NodeRegistryClass {
    private registry = new Map<string, NodeConstructor>();

    register(name: string, ctor: NodeConstructor) {
        if (this.registry.has(name)) {
            console.warn(`Node type "${name}" is already registered.`);
            return;
        }
        this.registry.set(name, ctor);
    }

    create(data: BaseNodeData): BaseNode {
        const ctor = this.registry.get(data.node_type);
        if (!ctor) throw new Error(`Unknown node type: ${data.node_type}`);
        const node = new ctor(data.props);
        for (const child of data.children ?? []) {
            node.add_child(this.create(child));
        }
        return node;
    }

    get(name: string) {
        return this.registry.get(name);
    }

    list_types() {
        return [...this.registry.keys()];
    }
}

export const NodeRegistry = new NodeRegistryClass();

// MARK: Decorators

export function register_node() {
    return function <T extends new (...args: any[]) => BaseNode>(ctor: T) {
        const node_name = ctor.name;
        NodeRegistry.register(node_name, ctor);
    };
}
