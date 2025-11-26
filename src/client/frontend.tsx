import { make_browser_game_environment_apis } from "src/model/game/env/browser-env";
import { Game } from "src/model/game/game";
import type { NodeRegistration } from "src/model/node/node-registry";
import type { GameNodeScene } from "src/model/node/node.n";
import { UiContainerNode } from "src/model/node/ui-node/ui-container-node.n";
import { UiTextNode } from "src/model/node/ui-node/ui-text-node.n";

const root_element = document.getElementById("root")!;

const MY_NODES: NodeRegistration[] = [];

const main_scene: GameNodeScene = {
    type: "Node",
    name: "Node 1",
    children: [
        UiTextNode.create_scene({ text: "hello there", name: "Node 1-1" }),
        UiContainerNode.create_scene({
            name: "Node 1-2",
            element_base_styles: {
                width: "10px",
                height: "10px",
                backgroundColor: "black",
            },
            children: [UiTextNode.create_scene({ name: "Node 1-2-1", text: "hows this" })],
        }),
    ],
};

const browser_apis = make_browser_game_environment_apis(60, root_element);
const game = new Game(browser_apis, main_scene, MY_NODES);

game.start();
