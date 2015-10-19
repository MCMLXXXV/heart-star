import { enableBody } from '../components/arcadePhysics';

const frames = (s, i, j=i, x=1) =>
  Phaser.Animation.generateFrameNames(s, i, j, '', x);


export default function gate (g, parent, owner) {
  let isClosed = true;

  const sprite = parent.create(0, 0, 'sprites');

  enableBody(sprite, (b) => {
    b.setSize(16, 56);
    b.immovable = true;
  });
  sprite.animations.add('closed', frames(`gate-${owner}-`, 1   ),  0, false);
  sprite.animations.add('open',   frames(`gate-${owner}-`, 1, 5), 10, false);
  sprite.play('closed');

  return {
    open () {
      sprite.play('open');
      isClosed = false;
    },

    setup (gate) {
      sprite.kill();
      if (gate) {
        sprite.reset(gate.x, gate.y);
        this.reset();
      }
    },

    reset () {
      sprite.play('closed');
      isClosed = true;
    },

    collide (actor) {
      g.physics.arcade.collide(actor, sprite, null, () => isClosed);
    }
  };
}
