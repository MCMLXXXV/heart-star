import { enableBody } from '../components/arcadePhysics';


function setOrientation (o, orientation) {
  const orientations = {
    north (o) {
      o.angle         =   0;
      o.body.offset.y =   4;
    },
    south (o) {
      o.angle         = 180;
      o.body.offset.y =  -4;
    }
  };

  orientations[orientation](o);
  return o;
}


export default function button (g, parent, owner, gate) {
  let isOn = false;

  const sprite = enableBody(parent.create(0, 0, 'sprites'), (b) => {
    b.setSize(16, 8);
    b.immovable = true;
  });
  sprite.anchor.set(0.5);
  sprite.animations.add('off', [ `button-${owner}-off` ], 0, false);
  sprite.animations.add('on',  [ `button-${owner}-on` ],  0, false);
  sprite.play('off');

  const turnOn = () => {
    if (gate) { gate.open(); }
    sprite.play('on');
    isOn = true;
  };

  return {
    setup (button) {
      sprite.kill();
      if (button) {
        setOrientation(sprite, button.orientation).reset(button.x, button.y);
        this.reset();
      }
    },

    reset () {
      sprite.play('off');
      isOn = false;
    },

    collide (actor) {
      g.physics.arcade.collide(actor, sprite, turnOn, () => !isOn);
    }
  };
}
