var DEFAULT_JUMP_POWER = 10;


class Character extends Phaser.Sprite {

  constructor (game, x, y, character) {
    super(game, x, y, character);

    this.anchor.set(0.5, 1);

    this._setupPhysicsBody(10, 16);
    this._setupAnimations();

    this.stance = 'normal';
    this.idle = false;

    this._jumpPower = 0;
  }

  update () {
    if (this.jumping) {
      this.stance = (this.falling ? 'falling' : 'jumping');
    }
    else if (!this.walking) {
      if (this.idle) {
        this.facing = 1;
        this.stance = this.carrying ? 'carrying' : 'normal';
      }
      else {
        this.stance = this.carrying ? 'carrying-facing' : 'facing';
      }
    }

    if (this._carryingFriend && !this._carryingFriend.standing) {
      this._carryingFriend = null;
    }

    if (this.standing) {
      this._jumpPower = DEFAULT_JUMP_POWER;
    }
  }

  // --------------------------------------------------------------------------

  walkLeft () {
    this.facing              =   -1;
    this.body.acceleration.x = -600;
    this.stance              = this.carrying ? 'carrying-walking' : 'walking';
  }

  walkRight () {
    this.facing              =    1;
    this.body.acceleration.x =  600;
    this.stance              = this.carrying ? 'carrying-walking' : 'walking';
  }

  jump () {
    if (!this.carrying && (this.standing || this.canPowerJump)) {
      this.body.velocity.y = -120;
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

      this.body.drag.x = 600;
      this.body.maxVelocity.set(64, 180);
      this.body.gravity.y = 300;
    }

    this.body.setSize(width, height);
  }

  _setupAnimations () {
    this.animations.add('normal',           [  0,  1,  2,  3 ], 4, true);
    this.animations.add('happy',            [  4,  5,  6,  7 ], 4, true);
    this.animations.add('facing',           [  8,  9, 10, 11 ], 4, true);
    this.animations.add('walking',          [ 12, 13, 14, 15 ], 4, true);
    this.animations.add('carrying',                     [ 16 ], 0, false);
    this.animations.add('carrying-facing',  [ 17, 18, 19, 20 ], 4, true);
    this.animations.add('carrying-walking', [ 21, 22, 23, 24 ], 4, true);
    this.animations.add('jumping',                      [ 25 ], 0, false);
    this.animations.add('falling',                      [ 26 ], 0, false);
    this.animations.add('hurt',                         [ 27 ], 0, false);
    this.animations.add('scared',                       [ 28 ], 0, false);
    this.animations.add('cheering',                 [ 29, 30 ], 2, true);
  }

  _changeStance (stance) {
    this.animations.play(stance);
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

  get stance () {
    return this._stance;
  }

  set stance (newValue) {
    this._stance = newValue;
    this._changeStance(newValue);
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


Character.HEART = 'character-heart';
Character.STAR  = 'character-star';

export default Character;
