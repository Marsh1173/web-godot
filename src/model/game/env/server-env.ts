import { SetTimeoutTicker } from "../ticker/set-timout-ticker";
import type { GameEnvironmentApis } from "./game-env-apis";
import { ServerUiRenderApi } from "./ui-render-api/server-ui-render-api";

export const make_server_game_environment_apis = (
    target_physics_fps: number,
    target_process_fps: number
): GameEnvironmentApis => {
    return {
        physics_ticker: new SetTimeoutTicker(target_physics_fps),
        process_ticker: new SetTimeoutTicker(target_process_fps),
        ui_render_api: new ServerUiRenderApi(),
    };
};
