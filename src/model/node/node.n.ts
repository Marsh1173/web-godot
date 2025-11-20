import { get_random_node_id } from "../utils/get-random-node-id";
import { NodeRegistry } from "./node-registry";
import type { RootNode } from "./root-node.n";

export interface NodeScene {
    type: string;
    name: string;
    node_id?: number;
    children?: NodeScene[];
}

export class Node {
    public name: string;
    public node_id: number;
    private readonly inner_children: Node[] = [];
    public get children(): ReadonlyArray<Node> {
        return this.inner_children;
    }

    public parent: Node | undefined = undefined;
    public root: RootNode | undefined = undefined;

    constructor(data: NodeScene) {
        this.name = data.name;
        this.node_id = data.node_id ?? get_random_node_id();

        if (data.children) {
            for (const child of data.children) {
                try {
                    const instantiated_node = NodeRegistry.create(child);
                    this.add_child(instantiated_node);
                } catch (e) {
                    console.error(`Could not instantiate node's child: ${child}`);
                }
            }
        }
    }

    // MARK: Children

    public add_child(node: Node) {
        // Cannot add a child node that already has a parent.
        if (node.parent !== undefined) {
            throw new Error(`Node ${node.name} attempted to be added to ${this.name} but already had a parent.`);
        }

        // Cannot create cyclical hierarchies
        let parent = this.parent;
        while (parent !== undefined) {
            if (parent === node) {
                throw new Error("Attempted to create a cyclical hierarchy by adding an ancestor node as a child");
            }
            parent = parent.parent;
        }

        this.inner_children.push(node);
        node.parent = this;

        if (this.root !== undefined) {
            node.inner_ready(this.root);
        }
    }

    public remove_child(node: Node) {
        if (node.parent !== this) {
            return;
        }

        const child_index = this.children.findIndex((child) => child === node);
        if (child_index === -1) {
            return;
        }

        if (this.root) {
            node.inner_before_leave_scene_tree();
        }

        this.inner_children.splice(child_index, 1);
        node.parent = undefined;

        if (this.root) {
            node.inner_on_leave_scene_tree();
        }
    }

    public find_child(name: string): Node | undefined {
        return this.inner_children.find((node) => node.name === name);
    }

    // MARK: Ready

    /**
     * Called after this node is added to the scene tree.
     * This method is meant to be overriden by inheriting classes.
     */
    public _ready(root_node: RootNode) {}
    private inner_ready(root_node: RootNode) {
        this.root = root_node;
        this._ready(root_node);

        for (const child of this.children) {
            child.inner_ready(root_node);
        }
    }

    // MARK: Before leave scene tree

    /**
     * Called just before this node is removed from the scene tree.
     * This node still has access to its parent and the root node.
     *
     * This method is meant to be overriden by inheriting classes.
     */
    public _before_leave_scene_tree() {}
    private inner_before_leave_scene_tree() {
        this._before_leave_scene_tree();

        for (const child of this.children) {
            child.inner_before_leave_scene_tree();
        }
    }

    // MARK: On leave scene tree

    /**
     * Called after this node is removed from the scene tree, when
     * it no longer has a root or a parent.
     *
     * This method is meant to be overriden by inheriting classes.
     */
    public _on_leave_scene_tree() {}
    private inner_on_leave_scene_tree() {
        this.root = undefined;
        this._on_leave_scene_tree();

        for (const child of this.children) {
            child.inner_on_leave_scene_tree();
        }
    }

    // MARK: Process

    /**
     * Called every frame.
     * This method is meant to be overriden by inheriting classes.
     */
    public _process(delta: number) {}
    protected inner_process(delta: number) {
        this._process(delta);

        for (const child of this.children) {
            child.inner_process(delta);
        }
    }

    // MARK: Physics process
    /**
     * Called every physics frame.
     * This method is meant to be overriden by inheriting classes.
     */
    public _physics_process(delta: number) {}
    protected inner_physics_process(delta: number) {
        this._physics_process(delta);

        for (const child of this.children) {
            child.inner_physics_process(delta);
        }
    }

    // MARK: Class-specific serialization
    public serialize(): NodeScene {
        return {
            type: "Node",
            node_id: this.node_id,
            name: this.name,
            children: this.children.map((child) => child.serialize()),
        };
    }
    public static deserialize(data: NodeScene) {
        return new Node(data);
    }
}
