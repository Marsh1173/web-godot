import { serve } from "bun";
import { make_server_game_environment_apis } from "src/model/game/env/server-env";
import { Game } from "src/model/game/game";
import type { NodeRegistration } from "src/model/node/node-registry";
import type { GameNodeScene } from "src/model/node/node.n";
import { UiContainerNode } from "src/model/node/ui-node/ui-container-node.n";
import { UiTextNode } from "src/model/node/ui-node/ui-text-node.n";
import myHomePage from "../client/index.html";

const server = serve({
    routes: {
        "/": myHomePage,
    },
});

console.log(`Server running at ${server.url}`);

const MY_NODES: NodeRegistration[] = [];

const main_scene: GameNodeScene = {
    type: "Node",
    name: "Node 1",
    children: [
        UiTextNode.create_scene({ text: "hello there", name: "Node 1-1" }),
        UiContainerNode.create_scene({
            name: "Node 1-2",
            children: [UiTextNode.create_scene({ name: "Node 1-2-1", text: "hows this" })],
        }),
    ],
};

const server_apis = make_server_game_environment_apis(60, 60);
const game = new Game(server_apis, main_scene, MY_NODES);

game.start();
