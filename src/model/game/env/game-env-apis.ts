import type { Ticker } from "../ticker/ticker";
import type { UiRenderApi } from "./ui-render-api/ui-render-api";

export interface GameEnvironmentApis {
    physics_ticker: Ticker;
    process_ticker: Ticker;
    ui_render_api: UiRenderApi;
    // 2d_world_api
    // 3d_world_api
    // network_api
}
