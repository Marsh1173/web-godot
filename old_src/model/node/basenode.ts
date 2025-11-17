import { NodeRegistry } from "./registry";

export interface BaseNodeData<Props extends {} = {}> {
  node_type: string;
  name: string;
  props: Props;
  children: BaseNodeData[];
}

export abstract class BaseNode<Props extends {} = {}> {
  public name: string;
  public parent: BaseNode | undefined = undefined;
  public children: BaseNode[];

  constructor(data: BaseNodeData<Props>) {
    this.name = data.name;

    for (const child of data.children) {
    }

    this.children = data.children.map((data) => NodeRegistry.create(data));
  }

  // MARK: Handling children

  public add_child(child: BaseNode) {
    if (child.parent !== undefined) {
      throw new Error(
        `Node ${child.name} attempted to be added to ${this.name} as a child but already had parent ${child.parent.name}`
      );
    }
    child.parent = this;
    this.children.push(child);
  }

  public remove_child(child: BaseNode) {
    this.children = this.children.filter((c) => c !== child);
    child.parent = undefined;
  }

  // MARK: Ready

  protected ready_inner(): void {
    this._ready();
    for (const child of this.children) {
      child.ready_inner();
    }
  }
  public _ready(): void {}

  // MARK: Process

  protected process_inner(delta: number): void {
    this._process(delta);
    for (const child of this.children) {
      child.process_inner(delta);
    }
  }
  public _process(delta: number): void {}

  // MARK: Serialize

  protected abstract get_props(): Props;

  public serialize(): BaseNodeData<Props> {
    return {
      node_type: this.constructor.name,
      name: this.name,
      props: this.get_props(),
      children: this.children.map((child) => child.serialize()),
    };
  }
}
