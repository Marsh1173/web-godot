import type { GameNode, GameNodeScene } from "./node.n";

export interface NodeRegistration {
    name: string;
    validate_data_and_deserialize: (data: unknown) => GameNode | undefined;
}

class NodeRegistryClass {
    private registry = new Map<string, NodeRegistration>();

    public register(registration: NodeRegistration) {
        if (this.registry.has(registration.name)) {
            console.warn(`Node type "${registration.name}" is already registered.`);
            return;
        }
        this.registry.set(registration.name, registration);
    }

    public create(data: GameNodeScene): GameNode {
        const node_type: string | undefined = data["type"];
        const registration = node_type ? this.registry.get(node_type) : undefined;
        if (registration === undefined)
            throw new Error(`Did you forget to register node type ${node_type}?\nData: ${data}`);

        const node = registration.validate_data_and_deserialize(data);

        if (node === undefined) {
            throw new Error(`Invalid data for node type ${node_type}. Validation failed.\nData: ${data}`);
        }

        return node;
    }

    public get(name: string): NodeRegistration | undefined {
        return this.registry.get(name);
    }

    public list_types(): string[] {
        return [...this.registry.keys()];
    }
}

export const NodeRegistry = new NodeRegistryClass();
