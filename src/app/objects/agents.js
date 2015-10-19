import { enableBody } from '../components/arcadePhysics';

const createAgent = (parent, x, y, w, h) =>
  enableBody(parent.create(x, y), (b) => {
    b.immovable = true;
    b.setSize(w, h);
  });


export default function agents (g) {
  const container = g.add.group();
  const left      = createAgent(container,  -20,   0,  16, 160);
  const right     = createAgent(container,  244,   0,  16, 160);
  const bottom    = createAgent(container, -120, 240, 480,  16);

  return {
    collide (actors) {
      g.physics.arcade.collide([ left, right ], actors);
      g.physics.arcade.overlap(
        actors, bottom,
        (actor) => actor.injure(),
        (actor) => !actor.isInjured);
    }
  };
}
