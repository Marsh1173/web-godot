export interface UiRenderApi {
    append_element_to_root: (el: () => Node | undefined) => void;
}
