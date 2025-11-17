import { NodeRegistry, type NodeRegistration } from "../node/node-registry";
import { Node, type NodeScene } from "../node/node.n";
import { RootNode } from "../node/root-node.n";
import type { GameEnvironmentApis } from "./env/game-env-apis";
import type { Ticker } from "./ticker/ticker";

const DEFAULT_NODES_TO_REGISTER: NodeRegistration[] = [
    ["RootNode", RootNode],
    ["Node", Node],
];

export class Game {
    public readonly root_node: RootNode = new RootNode({ type: "RootNode", name: "Root" });

    public readonly physics_ticker: Ticker;
    public readonly process_ticker: Ticker;

    constructor(env_apis: GameEnvironmentApis, main_scene: NodeScene, nodes_to_register: NodeRegistration[]) {
        this.physics_ticker = env_apis.physics_ticker;
        this.process_ticker = env_apis.process_ticker;

        for (const node_to_register of [...DEFAULT_NODES_TO_REGISTER, ...nodes_to_register]) {
            NodeRegistry.register(node_to_register);
        }

        this.root_node.add_child(NodeRegistry.create(main_scene));
    }

    public start() {
        this.physics_ticker.start((delta) => this.root_node.inner_physics_process(delta));
        this.process_ticker.start((delta) => this.root_node.inner_process(delta));
    }
}
