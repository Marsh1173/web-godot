import type { UiRenderApi } from "./ui-render-api";

export class BrowserUiRenderApi implements UiRenderApi {
    constructor(private readonly root: HTMLElement) {}

    public append_element_to_root(el: () => Node | undefined) {
        const node = el();
        if (node) {
            this.root.appendChild(node);
        }
    }
}
