const DEFAULT_DRAG              = 600;
const DEFAULT_DRAG_WHEN_JUMPING = 250;
const DEFAULT_GRAVITY           = 350;
const DEFAULT_JUMP_POWER        = 14;
const DEFAULT_ACCELERATION      = 600;
const DEFAULT_SPEED_LIMITS      = [ 64, 180 ];
const DEFAULT_JUMP_VELOCITY     = -100;


class Actor extends Phaser.Sprite {

  constructor (game, role) {
    super(game, 0, 0, 'characters');
    this.anchor.set(0.5, 1);

    this.wasHurt = new Phaser.Signal();

    this.role      = role;
    this.idle      = true;
    this.emotion   = null;
    this.animation = 'idle';

    this._friendBeingCarried     = null;
    this._remainingJumpingFrames = 0;

    this._setupPhysicsBody(10, 16);
    this._setupAnimations();
  }

  update () {
    this._updateDrag();
    this._updateAnimation();
    this._updateCarryingFriend();
    this._updateJumpPower();
  }

  // --------------------------------------------------------------------------

  reset(x, y) {
    super.reset(x, y);
    this.emotion = null;
  }

  walkLeft () {
    this._move(Actor.FACE_LEFT,  DEFAULT_ACCELERATION);
  }

  walkRight () {
    this._move(Actor.FACE_RIGHT, DEFAULT_ACCELERATION);
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

  jump () {
    if (this.canJump) {
      this.body.velocity.y = DEFAULT_JUMP_VELOCITY;
      this._remainingJumpingFrames -= 1;
    }
  }

  cancelPowerJump () {
    if (this.jumping) {
      this._remainingJumpingFrames = 0;
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
    this.emotion = 'hurt';

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

  _setupAnimations () {
    const frames = (i, j = i) =>
      Phaser.Animation.generateFrameNames(`${this.role}-`, i, j, '', 2);

    this.animations.add('idle',             frames( 0,  3), 4, true);
    this.animations.add('happy',            frames( 4,  7), 4, true);
    this.animations.add('facing',           frames( 8, 11), 4, true);
    this.animations.add('walking',          frames(12, 15), 4, true);
    this.animations.add('carrying-idle',    frames(16    ), 0, false);
    this.animations.add('carrying-facing',  frames(17, 20), 4, true);
    this.animations.add('carrying-walking', frames(21, 24), 4, true);
    this.animations.add('jumping',          frames(25    ), 0, false);
    this.animations.add('falling',          frames(26    ), 0, false);
    this.animations.add('hurt',             frames(27    ), 0, false);
    this.animations.add('scared',           frames(28    ), 0, false);
    this.animations.add('cheering',         frames(29, 30), 2, true);
  }

  _move (direction, speed) {
    this.facing              = direction;
    this.body.acceleration.x = direction * speed;
  }

  _updateDrag () {
    if (this.jumping)
      this.body.drag.x = DEFAULT_DRAG_WHEN_JUMPING;
    else
      this.body.drag.x = DEFAULT_DRAG;
  }

  _updateAnimation () {
    if (this.emotion === null) {
      if (this.idle) {
        this.facing = Actor.FACE_RIGHT;
        this.animation = this.carrying ? 'carrying-idle' : 'idle';
      }
      else if (this.jumping) {
        this.animation = this.falling ? 'falling' : 'jumping';
      }
      else if (this.walking) {
        this.animation = this.carrying ? 'carrying-walking' : 'walking';
      }
      else if (this.standing) {
        this.animation = this.carrying ? 'carrying-facing' : 'facing';
      }
    }
  }

  _updateCarryingFriend () {
    if (this._friendBeingCarried && !this._friendBeingCarried.standing) {
      this._friendBeingCarried = null;
    }
  }

  _updateJumpPower () {
    if (this.standing) {
      this._remainingJumpingFrames = DEFAULT_JUMP_POWER;
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

  get canJump () {
    return !this.carrying && (this.standing || this.canPowerJump);
  }

  get canPowerJump () {
    return this.jumping && this._remainingJumpingFrames > 0;
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
    return this.emotion === 'hurt';
  }

}


Actor.FACE_LEFT  = -1;
Actor.FACE_RIGHT =  1;

Actor.HEART = 'heart';
Actor.STAR  = 'star';

export default Actor;
