const DEFAULT_DRAG              = 600;
const DEFAULT_DRAG_WHEN_JUMPING = 250;
const DEFAULT_GRAVITY           = 350;
const DEFAULT_JUMP_POWER        = 14;
const DEFAULT_ACCELERATION      = 600;
const DEFAULT_SPEED_LIMITS      = [ 64, 180 ];
const DEFAULT_JUMP_VELOCITY     = -100;


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

    this._friendBeingCarried     = null;
    this._remainingJumpingFrames = 0;

    this._setupPhysicsBody(10, 16);
    addAnimations(this, role);
  }

  update () {
    this._updateDrag();
    this._updateAnimation();
    this._updateCarryingFriend();
  }

  // --------------------------------------------------------------------------

  reset (x, y) {
    super.reset(x, y);
    this.emotion = null;
  }

  move (xAxis) {
    this.body.acceleration.x = xAxis * DEFAULT_ACCELERATION;
    this.scale.x = xAxis !== 0 ? Math.sign(xAxis) : this.scale.x;
  }

  float () {
    this.body.gravity.y = 0;
  }

  sink () {
    this.body.gravity.y = DEFAULT_GRAVITY;
  }

  stop () {
    this.body.acceleration.x = 0;
  }

  jump (trigger, triggerDuration) {
    const { standing, carrying } = this;

    if (this._remainingJumpingFrames > 0) {
      if (trigger) {
        this.body.velocity.y = DEFAULT_JUMP_VELOCITY;
        this._remainingJumpingFrames -= 1;
      }
      else {
        this._remainingJumpingFrames = 0;
      }
    }
    else if (trigger && triggerDuration < 4 && standing && !carrying) {
      this._remainingJumpingFrames = DEFAULT_JUMP_POWER;
    }
  }

  collideActor (actor) {
    var hasCollided = this.game.physics.arcade.collide(
      actor,
      this,
      this._actorCollisionCallback,
      null,
      this);

    actor.carry(hasCollided && this.standing, this);
  }

  carry (condition, actor) {
    this._friendBeingCarried = condition ? actor : null;
  }

  harm (fromBelow = false) {
    this.emotion = 'injured';

    this.body.velocity.x = 0;

    if (fromBelow)
      this.body.velocity.y = -100;

    this.wasHurt.dispatch(this);
  }

  startle () {
    this.float();
    this.emotion = 'scared';
  }

  // --------------------------------------------------------------------------

  _setupPhysicsBody (width, height) {
    if (this.body === null) {
      this.game.physics.arcade.enableBody(this);
    }

    this.body.drag.x = DEFAULT_DRAG;
    this.body.maxVelocity.set(... DEFAULT_SPEED_LIMITS);

    this.body.setSize(width, height);
  }

  _updateDrag () {
    if (this.jumping) {
      this.body.drag.x = DEFAULT_DRAG_WHEN_JUMPING;
    }
    else {
      this.body.drag.x = DEFAULT_DRAG;
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

  _updateCarryingFriend () {
    if (this._friendBeingCarried && !this._friendBeingCarried.standing) {
      this._friendBeingCarried = null;
    }
  }

  _actorCollisionCallback (actor) {
    if (actor.standing) {
      actor.body.x += this.deltaX;
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
    return this._friendBeingCarried !== null && this.body.touching.up;
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
