import { enableBody } from '../components/arcadePhysics';


export default function spikes (g, parent, owner) {
  const container = parent.add(g.add.group());

  const createSprite = () => {
    const sprite = enableBody(
      container.create(0, 0, 'sprites', `spike-${owner}`),
      (b) => {
        b.setSize(14, 8, 1, 8);
        b.immovable = true;
      });
    sprite.crop(new Phaser.Rectangle(0, 0, 16, 16));
    return sprite;
  };
  const getSpike = () => container.getFirstDead() || createSprite();

  function setWidth (o, width) {
    o.body.setSize(width - 2, 8, 1, 8);
    o.cropRect.width = width;
    o.updateCrop();
    return o;
  }

  return {
    setup (spikes) {
      container.callAll('kill');
      spikes.forEach((o) => setWidth(getSpike(), o.width).reset(o.x, o.y));
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
