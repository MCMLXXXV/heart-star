import { enableBody } from '../components/arcadePhysics';


export default function platforms (g, parent, owner) {
  const container = parent.add(g.add.group());

  const createSprite = () => {
    const sprite = enableBody(container.create(0, 0, 'sprites'), (b) => {
      b.offset.set(2, 0);
      b.checkCollision.left  = false;
      b.checkCollision.right = false;
      b.checkCollision.down  = false;
      b.immovable = true;
    });
    sprite.animations.add('short',  [ `stable-platform-${owner}-short`  ], 0);
    sprite.animations.add('medium', [ `stable-platform-${owner}-medium` ], 0);
    return sprite;
  };
  const getPlatform = () => container.getFirstDead() || createSprite();

  function setRange (o, size) {
    const sizes = {
      short:  (o) => o.body.setSize(12, 8),
      medium: (o) => o.body.setSize(28, 8)
    };

    o.play(size);
    sizes[size](o);

    return o;
  }

  return {
    setup (platforms) {
      container.callAll('kill');
      platforms.forEach((o) => setRange(getPlatform(), o.size).reset(o.x, o.y));
    },

    collide (actor) {
      g.physics.arcade.collide(container, actor);
    }
  };
}
