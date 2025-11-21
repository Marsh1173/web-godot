import type { UiRenderApi } from "./ui-render-api";

export class ServerUiRenderApi implements UiRenderApi {
    public append_element_to_root(_el: () => Node) {
        // Server-side: do nothing with the element
    }
}
