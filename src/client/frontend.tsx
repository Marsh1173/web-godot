import { make_browser_game_environment_apis } from "src/model/game/env/browser-env";
import { Game } from "src/model/game/game";
import type { NodeRegistration } from "src/model/node/node-registry";
import type { UiNodeScene } from "src/model/node/ui-node/ui-node.n";
import { MyNode, type MyNodeScene } from "./my-node.n";
import { NewNode, type NewNodeScene } from "./new-node.n";

const root_element = document.getElementById("root")!;

const MY_NODES: NodeRegistration[] = [
    ["MyNode", MyNode],
    ["NewNode", NewNode],
];

const main_scene: MyNodeScene = {
    type: "MyNode",
    name: "Node 1",
    children: [
        { type: "NewNode", name: "Node 1-1" } as NewNodeScene,
        { type: "UiNode", name: "Node 1-2 (UI)" } as UiNodeScene,
    ],
};

const browser_apis = make_browser_game_environment_apis(60, root_element);
const game = new Game(browser_apis, main_scene, MY_NODES);

game.start();
