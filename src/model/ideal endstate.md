## Declaring nodes

```typescript
interface MyNodeScene extends NodeScene {
  type: "MyNode";
}

@register_node(MyNode.deserialize)
class MyNode extends Node {
  constructor(data: MyNodeScene) {
    super(data);
  }

  public override process(delta: number) {
    /** ... */
  }

  public serialize(): MyNodeScene {
    return {
      type: "MyNode",
      /** data */
    };
  }

  public static deserialize(data: MyNodeScene): MyNode {
    return new MyNode(data);
  }
}
```

## Declaring scenes

```typescript
const scene_data: MyNodeScene = {
  type: "MyNode",
  name: "thing",
  children: [],
};
```

## Initializing scenes or nodes

```typescript
const my_node = new MyNode(scene_data);

const scene_node = NodeRegistry.instantiate(scene_data);
```

## RPC

```typescript
class Player extends Node {
  @rpc()
  wave() {
    console.log("Player locally waves.");
  }

  @rpc("authority", "remote_only", "whatever", { msg_validator })
  shout(msg: string) {
    console.log("LOCAL SHOUT:", msg);
  }
}

const p = new Player();

p.wave();
p.wave.rpc();
p.shout("hello!");
p.shout.rpc("yo!");
```

## Mounting a game

```typescript
const environment_apis = {
  /** ... */
};

const game = mount_game(environment_apis);
game.start();
```
