var DEFAULT_DRAG          = 600;
var DEFAULT_GRAVITY       = 300;
var DEFAULT_JUMP_POWER    = 10;
var DEFAULT_ACCELERATION  = 600;
var DEFAULT_SPEED_LIMITS  = [ 64, 180 ];
var DEFAULT_JUMP_VELOCITY = -120;


class Character extends Phaser.Sprite {

  constructor (game, x, y, character) {
    super(game, x, y, character);

    this.anchor.set(0.5, 1);

    this._setupPhysicsBody(10, 16);
    this._setupAnimations();

    this.animation = 'idle';
    this.idle      = true;

    this._jumpPower      = 0;
    this._carryingFriend = null;
  }

  update () {
    this._updateStance();
    this._updateCarryingFriend();
    this._updateJumpPower();
  }

  // --------------------------------------------------------------------------

  walkLeft () {
    this._move(Character.FACE_LEFT,  DEFAULT_ACCELERATION);
  }

  walkRight () {
    this._move(Character.FACE_RIGHT, DEFAULT_ACCELERATION);
  }

  jump () {
    if (this.canJump) {
      this.body.velocity.y = DEFAULT_JUMP_VELOCITY;
      this._jumpPower -= 1;
    }
  }

  cancelPowerJump () {
    if (this.standing) return;

    this._jumpPower = 0;
  }

  collideCharacter (character) {
    var hasCollided = this.game.physics.arcade.collide(
      character,
      this,
      this._characterCollisionCallback,
      null,
      this);

    character.carry(hasCollided && this.standing, this);
  }

  carry (condition, character) {
    this._carryingFriend = condition ? character : null;
  }

  // --------------------------------------------------------------------------

  _setupPhysicsBody (width, height) {
    if (this.body === null) {
      this.game.physics.arcade.enableBody(this);

      this.body.drag.x = DEFAULT_DRAG;
      this.body.gravity.y = DEFAULT_GRAVITY;
      this.body.maxVelocity.set(... DEFAULT_SPEED_LIMITS);
    }

    this.body.setSize(width, height);
  }

  _setupAnimations () {
    this.animations.add('idle',             [  0,  1,  2,  3 ], 4, true);
    this.animations.add('happy',            [  4,  5,  6,  7 ], 4, true);
    this.animations.add('facing',           [  8,  9, 10, 11 ], 4, true);
    this.animations.add('walking',          [ 12, 13, 14, 15 ], 4, true);
    this.animations.add('carrying-idle',                [ 16 ], 0, false);
    this.animations.add('carrying-facing',  [ 17, 18, 19, 20 ], 4, true);
    this.animations.add('carrying-walking', [ 21, 22, 23, 24 ], 4, true);
    this.animations.add('jumping',                      [ 25 ], 0, false);
    this.animations.add('falling',                      [ 26 ], 0, false);
    this.animations.add('hurt',                         [ 27 ], 0, false);
    this.animations.add('scared',                       [ 28 ], 0, false);
    this.animations.add('cheering',                 [ 29, 30 ], 2, true);
  }

  _move (direction, speed) {
    this.facing              = direction;
    this.body.acceleration.x = direction * speed;
  }

  _changeAnimation (animation) {
    this.animations.play(animation);

    this._animation = animation;
  }

  _updateStance () {
    if (this.idle) {
      this.facing = Character.FACE_RIGHT;
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

  _updateCarryingFriend () {
    if (this._carryingFriend && !this._carryingFriend.standing) {
      this._carryingFriend = null;
    }
  }

  _updateJumpPower () {
    if (this.standing) {
      this._jumpPower = DEFAULT_JUMP_POWER;
    }
  }

  _characterCollisionCallback (character) {
    if (character.standing) {
      character.body.x += this.body.deltaX();
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
    return this._animation;
  }

  set animation (newValue) {
    this._changeAnimation(newValue);
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
    return this.jumping && this._jumpPower > 0;
  }

  get falling () {
    return this.jumping && this.body.velocity.y > 0;
  }

  get carrying () {
    return this._carryingFriend;
  }

}


Character.FACE_LEFT  = -1;
Character.FACE_RIGHT =  1;

Character.HEART = 'character-heart';
Character.STAR  = 'character-star';

export default Character;
