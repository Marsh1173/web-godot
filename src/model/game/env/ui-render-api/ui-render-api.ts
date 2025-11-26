export interface UiRenderApi {
    create_element: (tag: string, set_props: (el: HTMLElement) => void, parent_id?: string) => string;
    remove_element: (id: string) => void;
}
