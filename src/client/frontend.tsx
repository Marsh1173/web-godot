import { make_browser_game_environment_apis } from "src/model/game/env/browser-env";
import { Game } from "src/model/game/game";
import type { NodeRegistration } from "src/model/node/node-registry";
import type { GameNodeScene } from "src/model/node/node.n";
import type { UiNodeScene } from "src/model/node/ui-node/ui-node.n";
import { UiTextNode, type UiTextNodeScene } from "src/model/node/ui-node/ui-text-node.n";

const root_element = document.getElementById("root")!;

const MY_NODES: NodeRegistration[] = [];

const main_scene: GameNodeScene = {
    type: "Node",
    name: "Node 1",
    children: [UiTextNode.create_scene({ text: "hello there", name: "Node 1-1" })],
};

const browser_apis = make_browser_game_environment_apis(60, root_element);
const game = new Game(browser_apis, main_scene, MY_NODES);

game.start();
