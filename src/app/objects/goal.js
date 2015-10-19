import { enableBody } from '../components/arcadePhysics';

const frames = Phaser.Animation.generateFrameNames('goal-', 1, 6, '', 1);

function isTouchingUpOnly ({ touching: { up, right, down, left }}) {
  return up && !(right || down || left);
}


export default function goal (g) {
  const actorsLanded = new Phaser.Signal();

  const sprite = enableBody(g.add.sprite(0, 0, 'sprites'), (b) => {
    b.immovable = true;
    b.setSize(32, 16, 0, 16);
  });
  sprite.animations.add('main', frames, 8, true).play();

  return {
    actorsLanded,

    reset (x, y) {
      sprite.reset(x, y);
    },

    collide (heart, star) {
      const heartStanding = g.physics.arcade.collide(heart, sprite);
      const starStanding  = g.physics.arcade.collide(star,  sprite);
      if (heartStanding && starStanding && isTouchingUpOnly(sprite.body)) {
        actorsLanded.dispatch();
      }
    }
  };
}
