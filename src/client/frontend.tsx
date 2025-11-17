import { make_browser_game_environment_apis } from "src/model/game/env/browser-env";
import { Game } from "src/model/game/game";
import type { NodeRegistration } from "src/model/node/node-registry";
import { MyNode, type MyNodeScene } from "./my-node.n";
import { NewNode, type NewNodeScene } from "./new-node.n";

const MY_NODES: NodeRegistration[] = [
    ["MyNode", MyNode],
    ["NewNode", NewNode],
];

const main_scene: MyNodeScene = {
    type: "MyNode",
    name: "My node",
    children: [{ type: "NewNode", name: "New node" } as NewNodeScene],
};

const browser_apis = make_browser_game_environment_apis(60);
const game = new Game(browser_apis, main_scene, MY_NODES);

game.start();
