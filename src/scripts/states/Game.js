class Game extends Phaser.State {

  init (stageName) {
    this.controls = this.game.controls;

    this.stageName = stageName;
  }

  create () {
    this.add.existing(new BackgroundPattern(this.game, BackgroundPattern.MOON));

    this._tilemap = this.add.tilemap('tilemaps');
    this._tilemap.setCollisionBetween(1, 144, true, 'test');
    this._tilemap.addTilesetImage('tileset');

    this._layer = this._tilemap.createLayer('test');

    this._heart = this.add.existing(new Character(this.game, 168, 32, Character.HEART));
    this._star = this.add.existing(new Character(this.game, 72, 32, Character.STAR));

    this._player = this._star;

    this.controls.spacebar.onUp.add(this._togglePlayerCharacter, this);
    this.controls.backspace.onUp.add(this._restartCharacters, this);

    this._star.animations.play('cheering');
  }

  update () {
    this.physics.arcade.collide(this._heart, this._star);
    this.physics.arcade.collide(this._star,  this._layer);
    this.physics.arcade.collide(this._heart, this._layer);

    this._heart.body.acceleration.x = 0;
    this._star.body.acceleration.x = 0;

    if (this.controls.left.isDown)
      this._player.walkLeft();
    else if (this.controls.right.isDown)
      this._player.walkRight();

    if (this.controls.up.isDown) {
      this._player.jump();
    }
    else {
      this._player.cancelPowerJump();
    }
  }

  // --------------------------------------------------------------------------

  _togglePlayerCharacter () {
    if (this._player.standing)
      this._player = this._player === this._heart ? this._star : this._heart;
  }

  _restartCharacters () {
    this._heart.reset(168, 32);
    this._star.reset(72, 32);
  }

}


import Character         from 'objects/Character';
import BackgroundPattern from 'objects/BackgroundPattern';

export default Game;
