import type { Node, NodeScene } from "./node.n";

class NodeRegistryClass {
    private registry = new Map<string, NodeConstructor>();

    public register([node_name, ctor]: NodeRegistration) {
        // const node_name = ctor.name;
        if (this.registry.has(node_name)) {
            console.warn(`Node type "${node_name}" is already registered.`);
            return;
        }
        this.registry.set(node_name, ctor);
    }

    public create(data: NodeScene): Node {
        const node_type: string | undefined = (data as any)["type"];
        const ctor = node_type ? this.get(node_type) : undefined;
        if (ctor === undefined) throw new Error(`Did you forget to register node type ${node_type}?\nData: ${data}`);
        const node = new ctor(data);
        return node;
    }

    public get(name: string) {
        return this.registry.get(name);
    }

    public list_types() {
        return [...this.registry.keys()];
    }
}

export const NodeRegistry = new NodeRegistryClass();

export type NodeConstructor = new (...args: any[]) => Node;
export type NodeRegistration = [string, NodeConstructor];
