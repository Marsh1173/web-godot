import { get_random_node_id } from "src/model/utils/get-random-node-id";
import type { UiRenderApi } from "./ui-render-api";

export class BrowserUiRenderApi implements UiRenderApi {
    constructor(private readonly root: HTMLElement) {}

    private create_element_id = () => get_random_node_id().toString();

    public create_element = (tag: string, set_props: (el: HTMLElement) => void, parent_id?: string) => {
        const element = document.createElement(tag);

        const element_id = this.create_element_id();
        element.id = element_id;

        set_props(element);

        if (parent_id) {
            const parent = this.root.querySelector(`[id="${parent_id}"]`);
            if (parent) {
                parent.appendChild(element);
            } else {
                throw new Error(`Could not find element parent with id ${parent_id}`);
            }
        } else {
            this.root.appendChild(element);
        }

        return element_id;
    };

    public remove_element(id: string) {
        const element = this.root.querySelector(`[id="${id}"]`);
        element?.remove();
    }
}
