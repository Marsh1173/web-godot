import type { Ticker } from "../ticker/ticker";

export interface GameEnvironmentApis {
    physics_ticker: Ticker;
    process_ticker: Ticker;
    // ui_render_api
    // 2d_world_api
    // 3d_world_api
    // network_api
}
