import { enableBody } from '../components/arcadePhysics';


const ACCELERATION       =  600;
const BODY_HEIGHT        =   16;
const BODY_WIDTH         =   10;
const DRAG_WHEN_JUMPING  =  250;
const DRAG_WHEN_STANDING =  600;
const GRAVITY            =  350;
const RISING_SPEED       = -100;
const MAX_JUMPING_FRAMES =   16;
const MAX_SPEED_X        =   64;
const MAX_SPEED_Y        =  180;


export function addAnimations (sprite, role) {
  const frames = (i, j = i) =>
    Phaser.Animation.generateFrameNames(`actor-${role}-`, i, j, '', 2);

  sprite.animations.add('normal',           frames( 0,  3), 4, true);
  sprite.animations.add('happy',            frames( 4,  7), 4, true);
  sprite.animations.add('looking',          frames( 8, 11), 4, true);
  sprite.animations.add('walking',          frames(12, 15), 4, true);
  sprite.animations.add('carrying',         frames(16    ), 0, false);
  sprite.animations.add('carrying+looking', frames(17, 20), 4, true);
  sprite.animations.add('carrying+walking', frames(21, 24), 4, true);
  sprite.animations.add('rising',           frames(25    ), 0, false);
  sprite.animations.add('falling',          frames(26    ), 0, false);
  sprite.animations.add('injured',          frames(27    ), 0, false);
  sprite.animations.add('scared',           frames(28    ), 0, false);
  sprite.animations.add('cheering',         frames(29, 30), 2, true);

  return sprite;
}


class Actor extends Phaser.Sprite {

  constructor (game, role) {
    super(game, 0, 0, 'sprites');
    this.anchor.set(0.5, 1);

    this.wasHurt = new Phaser.Signal();

    this.role      = role;
    this.idle      = true;
    this.emotion   = null;
    this.animation = 'normal';

    this.powerJumpFrames = 0;

    enableBody(this, (o) => {
      o.setSize(BODY_WIDTH, BODY_HEIGHT);
      o.drag.x = DRAG_WHEN_STANDING;
      o.maxVelocity.set(MAX_SPEED_X, MAX_SPEED_Y);
      o.deltaMax.set(2);
    });
    addAnimations(this, role);
  }

  update () {
    this._updateDrag();
    this._updateAnimation();
  }

  // --------------------------------------------------------------------------

  reset (x, y) {
    super.reset(x, y);
    this.emotion = null;
  }

  move (xAxis) {
    this.body.acceleration.x = xAxis * ACCELERATION;
    this.scale.x = xAxis !== 0 ? Math.sign(xAxis) : this.scale.x;
  }

  float () {
    this.body.gravity.y = 0;
  }

  sink () {
    this.body.gravity.y = GRAVITY;
  }

  stop () {
    this.body.velocity.set(0);
    this.body.acceleration.set(0);
  }

  fly () {
    this.body.velocity.y = RISING_SPEED;
  }

  jump (trigger, triggerDuration) {
    const { standing, carrying } = this;

    if (this.powerJumpFrames > 0) {
      if (trigger) {
        this.fly();
        this.powerJumpFrames -= 1;
      }
      else {
        this.powerJumpFrames = 0;
      }
    }
    else if (trigger && triggerDuration < 4 && standing && !carrying) {
      this.powerJumpFrames = MAX_JUMPING_FRAMES;
    }
  }

  collideActor (actor) {
    this.game.physics.arcade.collide(
      actor,
      this,
      (o) => {
        if (o.standing) {
          o.body.x += this.deltaX;
          o.body.y += this.deltaY;
        }
      });
  }

  harm (fromBelow = false) {
    this.emotion = 'injured';

    this.stop();

    if (fromBelow) {
      this.fly();
    }

    this.wasHurt.dispatch(this);
  }

  startle () {
    this.float();
    this.emotion = 'scared';
  }

  // --------------------------------------------------------------------------

  _updateDrag () {
    if (this.jumping) {
      this.body.drag.x = DRAG_WHEN_JUMPING;
    }
    else {
      this.body.drag.x = DRAG_WHEN_STANDING;
    }
  }

  _updateAnimation () {
    if (this.emotion === null) {
      if (this.idle) {
        this.facing = Actor.FACE_RIGHT;
        this.animation = this.carrying ? 'carrying' : 'normal';
      }
      else if (this.jumping) {
        this.animation = this.falling ? 'falling' : 'rising';
      }
      else if (this.walking) {
        this.animation = this.carrying ? 'carrying+walking' : 'walking';
      }
      else if (this.standing) {
        this.animation = this.carrying ? 'carrying+looking' : 'looking';
      }
    }
  }

  // --------------------------------------------------------------------------

  get facing () {
    return this.scale.x;
  }

  set facing (newValue) {
    this.scale.x = newValue;
  }

  get animation () {
    return this.animations.currentAnim;
  }

  set animation (newValue) {
    this.animations.play(newValue);
  }

  get standing () {
    return this.body.blocked.down || this.body.touching.down;
  }

  get walking () {
    return this.standing && this.body.velocity.x !== 0;
  }

  get jumping () {
    return !this.standing;
  }

  get falling () {
    return this.jumping && this.body.velocity.y > 0;
  }

  get carrying () {
    return this.body.touching.up;
  }

  get idle () {
    return this._idle;
  }

  set idle (newValue) {
    this._idle = newValue;

    this.alpha = this._idle ? 0.50 : 1;
  }

  get emotion () {
    return this._emotion;
  }

  set emotion (newValue) {
    if (newValue !== null)
      this.animation = newValue;

    this._emotion = newValue;
    this.facing = Actor.FACE_RIGHT;
  }

  get hurt () {
    return this.emotion === 'injured';
  }

}


Actor.FACE_LEFT  = -1;
Actor.FACE_RIGHT =  1;

Actor.HEART = 'heart';
Actor.STAR  = 'star';

export default Actor;
