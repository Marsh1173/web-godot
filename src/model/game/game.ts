import { NodeRegistry, type NodeRegistration } from "../node/node-registry";
import { GameNodeRegistration, GameNode, type GameNodeScene } from "../node/node.n";
import { RootNode } from "../node/root-node.n";
import { UiNode, UiNodeRegistration } from "../node/ui-node/ui-node.n";
import { UiTextNodeRegistration } from "../node/ui-node/ui-text-node.n";
import type { GameEnvironmentApis } from "./env/game-env-apis";
import type { UiRenderApi } from "./env/ui-render-api/ui-render-api";
import type { Ticker } from "./ticker/ticker";

const DEFAULT_NODES_TO_REGISTER: NodeRegistration[] = [
    GameNodeRegistration,
    UiNodeRegistration,
    UiTextNodeRegistration,
];

export class Game {
    public readonly root_node: RootNode;

    public readonly physics_ticker: Ticker;
    public readonly process_ticker: Ticker;
    public readonly ui_render_api: UiRenderApi;

    constructor(env_apis: GameEnvironmentApis, main_scene: GameNodeScene, nodes_to_register: NodeRegistration[]) {
        this.physics_ticker = env_apis.physics_ticker;
        this.process_ticker = env_apis.process_ticker;
        this.ui_render_api = env_apis.ui_render_api;

        for (const node_to_register of [...DEFAULT_NODES_TO_REGISTER, ...nodes_to_register]) {
            NodeRegistry.register(node_to_register);
        }

        this.root_node = new RootNode({ type: "RootNode", name: "Root" }, this);

        this.root_node.add_child(NodeRegistry.create(main_scene));
    }

    public start() {
        this.physics_ticker.start((delta) => this.root_node.inner_physics_process(delta));
        this.process_ticker.start((delta) => this.root_node.inner_process(delta));
    }
}
