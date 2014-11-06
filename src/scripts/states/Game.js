class Game extends Phaser.State {

  init (stageName) {
    this.controls = this.game.controls;

    this.stageName = stageName;

    this._playerCharacter = null;
    this._idleCharacter   = null;
  }

  create () {
    this.add.existing(new BackgroundPattern(this.game, BackgroundPattern.MOON));

    this._tilemap = this.add.tilemap('tilemaps');
    this._tilemap.setCollisionBetween(1, 144, true, 'test');
    this._tilemap.addTilesetImage('tileset');

    this._layer = this._tilemap.createLayer('test');

    this._goal = this.add.existing(new Goal(this.game, 120, 72));
    this._goal.charactersLanded.addOnce(this._goalReached, this);

    this._platforms = this.add.group();
    this._platforms.add(new Platform(this.game,  16,  24, Platform.MEDIUM));
    this._platforms.add(new Platform(this.game, 192,  24, Platform.MEDIUM));
    this._platforms.add(new Platform(this.game,   0,  56, Platform.SMALL));
    this._platforms.add(new Platform(this.game, 224,  56, Platform.SMALL));
    this._platforms.add(new Platform(this.game,  32, 112, Platform.SMALL));
    this._platforms.add(new Platform(this.game, 192, 112, Platform.SMALL));

    this._heart = this.add.existing(new Character(this.game, 168, 32, Character.HEART));
    this._star = this.add.existing(new Character(this.game, 72, 32, Character.STAR));

    this._setupPlayableCharacters(this._star, this._heart);

    this.controls.spacebar.onUp.add(this._togglePlayerCharacter, this);
    this.controls.backspace.onUp.add(this._restartCharacters, this);
  }

  update () {
    this._playerCharacter.collideCharacter(this._idleCharacter);
    this._goal.collideCharacters(this._playerCharacter, this._idleCharacter);

    this.physics.arcade.collide(this._star,  this._layer);
    this.physics.arcade.collide(this._heart, this._layer);

    this.physics.arcade.collide(
      this._platforms,
      [ this._heart, this._star ]);


    if (this.controls.left.isDown) {
      this._playerCharacter.walkLeft();
    }
    else if (this.controls.right.isDown) {
      this._playerCharacter.walkRight();
    }
    else {
      this._playerCharacter.body.acceleration.x = 0;
      this._idleCharacter.body.acceleration.x = 0;
    }

    if (this.controls.up.isDown) {
      this._playerCharacter.jump();
    }
    else {
      this._playerCharacter.cancelPowerJump();
    }
  }

  // --------------------------------------------------------------------------

  _setupPlayableCharacters(playerCharacter, idleCharacter) {
    this._playerCharacter      = playerCharacter;
    this._playerCharacter.idle = false;

    this._idleCharacter      = idleCharacter;
    this._idleCharacter.idle = true;
  }

  _togglePlayerCharacter () {
    if (this._playerCharacter.standing) {
      this._setupPlayableCharacters(this._idleCharacter, this._playerCharacter);
    }
  }

  _restartCharacters () {
    this._heart.reset(168, 32);
    this._star.reset(72, 32);
  }

  _goalReached () {
    console.info('Yeah!!!');
  }

}


import Goal              from 'objects/Goal';
import Platform          from 'objects/Platform';
import Character         from 'objects/Character';
import BackgroundPattern from 'objects/BackgroundPattern';

export default Game;
