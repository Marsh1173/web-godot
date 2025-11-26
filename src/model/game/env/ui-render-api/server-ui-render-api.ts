import type { UiRenderApi } from "./ui-render-api";

export class ServerUiRenderApi implements UiRenderApi {
    create_element = (tag: string, set_props: (el: HTMLElement) => void, parent_id?: string) => "";
    remove_element = (id: string) => {};
}
