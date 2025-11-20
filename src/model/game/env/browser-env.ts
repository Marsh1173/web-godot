import { BrowserTicker } from "../ticker/browser-ticker";
import { SetTimeoutTicker } from "../ticker/set-timout-ticker";
import type { GameEnvironmentApis } from "./game-env-apis";
import { BrowserUiRenderApi } from "./ui-render-api/browser-ui-render-api";

export const make_browser_game_environment_apis = (
    target_physics_fps: number,
    html_root: HTMLElement
): GameEnvironmentApis => {
    return {
        physics_ticker: new SetTimeoutTicker(target_physics_fps),
        process_ticker: new BrowserTicker(),
        ui_render_api: new BrowserUiRenderApi(html_root),
    };
};
