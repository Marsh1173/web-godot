import { serve } from "bun";
import { make_server_game_environment_apis } from "src/model/game/env/server-env";
import { Game } from "src/model/game/game";
import type { NodeRegistration } from "src/model/node/node-registry";
import myHomePage from "../client/index.html";

const server = serve({
    routes: {
        "/": myHomePage,
    },
});

console.log(`Server running at ${server.url}`);

// const MY_NODES: NodeRegistration[] = [];

// const main_scene: MyNodeScene = {
//     type: "MyNode",
//     name: "My node",
// };

// const server_apis = make_server_game_environment_apis(60, 60);
// const game = new Game(server_apis, main_scene, MY_NODES);

// game.start();
