import { enableBody } from '../components/arcadePhysics';
import { frames }     from '../components/animation';


const ACTOR_HEART = 'heart';
const ACTOR_STAR  = 'star';

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


function addAnimations (sprite, role) {
  const xs = (i, j=i) => frames(`actor-${role}-`, i, j, 2)
  sprite.animations.add('normal',           xs( 0,  3), 4, true);
  sprite.animations.add('happy',            xs( 4,  7), 4, true);
  sprite.animations.add('looking',          xs( 8, 11), 4, true);
  sprite.animations.add('walking',          xs(12, 15), 4, true);
  sprite.animations.add('carrying',         xs(16    ), 0, false);
  sprite.animations.add('carrying+looking', xs(17, 20), 4, true);
  sprite.animations.add('carrying+walking', xs(21, 24), 4, true);
  sprite.animations.add('rising',           xs(25    ), 0, false);
  sprite.animations.add('falling',          xs(26    ), 0, false);
  sprite.animations.add('injured',          xs(27    ), 0, false);
  sprite.animations.add('scared',           xs(28    ), 0, false);
  sprite.animations.add('cheering',         xs(29, 30), 2, true);
  return sprite;
}


class Actor extends Phaser.Sprite {

  static get HEART () {
    return ACTOR_HEART;
  }

  static get STAR () {
    return ACTOR_STAR;
  }

  static updateAnimation (sprite, active) {
    const { isWalking, isStanding, isRising, isCarrying } = sprite;

    const animation = active ? (isStanding ?
      (isCarrying ?
        (isWalking ? 'carrying+walking' : 'carrying+looking') :
        (isWalking ? 'walking' : 'looking')) :
        (isRising ? 'rising' : 'falling')
      ) : (isCarrying ? 'carrying' : 'normal');

    sprite.play(animation);
    sprite.facing = active ? Math.sign(sprite.body.velocity.x) : 1;
  }

  constructor (game, role) {
    super(game, 0, 0, 'sprites');
    this.anchor.set(0.5, 1);

    this.wasInjured = new Phaser.Signal();

    this.role = role;

    this.powerJumpFrames = 0;

    enableBody(this, (o) => {
      o.setSize(BODY_WIDTH, BODY_HEIGHT);
      o.drag.x = DRAG_WHEN_STANDING;
      o.maxVelocity.set(MAX_SPEED_X, MAX_SPEED_Y);
      o.deltaMax.set(2);
    });
    addAnimations(this, role);
  }

  // --------------------------------------------------------------------------

  move (xAxis) {
    this.body.acceleration.x = xAxis * ACCELERATION;
    this.body.drag.x = this.isRising ? DRAG_WHEN_JUMPING : DRAG_WHEN_STANDING;
    this.facing = xAxis !== 0 ? Math.sign(xAxis) : this.facing;
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
    const { isStanding, isCarrying } = this;

    if (this.powerJumpFrames > 0) {
      if (trigger) {
        this.fly();
        this.powerJumpFrames -= 1;
      }
      else {
        this.powerJumpFrames = 0;
      }
    }
    else if (trigger && triggerDuration < 4 && isStanding && !isCarrying) {
      this.powerJumpFrames = MAX_JUMPING_FRAMES;
    }
  }

  collideActor (actor) {
    this.game.physics.arcade.collide(
      actor,
      this,
      (o) => {
        if (o.isStanding) {
          o.body.x += this.deltaX;
          o.body.y += this.deltaY;
        }
      });
  }

  injure () {
    this.play('injured');
    this.stop();

    if (this.isStanding) {
      this.fly();
    }

    this.wasInjured.dispatch(this);
  }

  startle () {
    this.float();
    this.play('scared');
  }

  // --------------------------------------------------------------------------

  get facing () {
    return this.scale.x;
  }

  set facing (facing) {
    this.scale.x = facing !== 0 ? Math.sign(facing) : this.scale.x;
  }

  get isWalking () {
    return this.body.velocity.x !== 0;
  }

  get isStanding () {
    return this.body.touching.down || this.body.blocked.down;
  }

  get isRising () {
    return !this.isStanding && this.body.velocity.y < 0;
  }

  get isCarrying () {
    return this.body.touching.up || this.body.wasTouching.up;
  }

  get isInjured () {
    return this.animations.currentAnim.name === 'injured';
  }

}


export default Actor;
