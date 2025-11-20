// Universal h function that works on both server and browser

// JSX Namespace for TypeScript
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [key: string]: any;
        }
        type Element = Node | DocumentFragment | undefined;
    }
}

// 1. The Factory Function
export function JsxFactory(tag: any, props: any, ...children: any[]) {
    // Check if we're in a browser environment
    if (typeof document === "undefined") {
        // Server-side: return undefined (no DOM operations)
        return undefined;
    }

    // A. Handling Functional Components (e.g., <MyComponent />)
    if (typeof tag === "function") {
        return tag({ ...props, children });
    }

    // B. Handling HTML Tags (e.g., <div />)
    const element = document.createElement(tag);

    // C. Assign Props (Attributes and Events)
    if (props) {
        Object.entries(props).forEach(([key, value]) => {
            if (key.startsWith("on") && typeof value === "function") {
                // Convert onClick -> click
                element.addEventListener(key.substring(2).toLowerCase(), value as EventListener);
            } else if (key === "className") {
                element.className = value as string;
            } else if (key === "style" && typeof value === "object") {
                Object.assign(element.style, value);
            } else {
                element.setAttribute(key, value as string);
            }
        });
    }

    // D. Append Children
    children.forEach((child) => appendChild(element, child));

    return element;
}

// Fragment component for handling JSX fragments
export const JsxFragment = (props: any) => {
    if (typeof document === "undefined") {
        return undefined;
    }
    const fragment = document.createDocumentFragment();
    const children = props.children || [];
    const childArray = Array.isArray(children) ? children : [children];
    childArray.forEach((child: any) => appendChild(fragment, child));
    return fragment;
};

// Helper to handle text nodes and nested arrays
function appendChild(parent: Node, child: any) {
    if (Array.isArray(child)) {
        child.forEach((nested) => appendChild(parent, nested));
    } else if (typeof child === "string" || typeof child === "number") {
        parent.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
        parent.appendChild(child);
    }
    // Ignore null/undefined/boolean
}
