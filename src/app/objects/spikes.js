import { enableBody } from '../components/arcadePhysics';


export default function spikes (g, parent, owner) {
  const container = parent.add(g.add.group());

  const createSprite = () => enableBody(
    container.create(0, 0, 'sprites', `spike-${owner}`),
    (b) => {
      b.setSize(b.width - 2, 8, 1, 8);
      b.immovable = true;
    });
  const getSpike = () => container.getFirstDead() || createSprite();

  return {
    setup (spikes) {
      container.callAll('kill');
      spikes.forEach((o) => getSpike().reset(o.x, o.y));
    },

    collide (actor) {
      g.physics.arcade.collide(
        container,
        actor,
        () => actor.injure(),
        () => !actor.isInjured
      );
    }
  };
}
