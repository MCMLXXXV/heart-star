class Game extends Phaser.State {

  init (stageName) {
    this.controls = this.game.controls;

    this.stageName = stageName;

    this._playerCharacter = null;
    this._idleCharacter   = null;
  }

  create () {
    this._heartGroup = this.add.group();
    this._starGroup = this.add.group();

    this._heartGroup.add(
      new BackgroundPattern(this.game, BackgroundPattern.HEART));
    this._starGroup.add(
      new BackgroundPattern(this.game, BackgroundPattern.STAR));

    this._tilemap1 = this.add.tilemap('tilemaps');
    this._tilemap1.setCollisionBetween(1, 144, true, '05a');
    this._tilemap1.addTilesetImage('tileset');

    this._tilemap2 = this.add.tilemap('tilemaps');
    this._tilemap2.setCollisionBetween(1, 144, true, '05b');
    this._tilemap2.addTilesetImage('tileset');

    this._layer1 = this._heartGroup.add(this._tilemap1.createLayer('05a'));
    this._layer2 = this._starGroup.add(this._tilemap2.createLayer('05b'));

    this._goal = this.add.existing(new Goal(this.game, 120, 64));

    this._agents = this.add.existing(new Agents(this.game));
    this._agents.characterFellOff.add(this._fellOff, this);

    this._heart = this.add.existing(new Character(this.game, 200, 128, Character.HEART));
    this._star = this.add.existing(new Character(this.game, 40, 128, Character.STAR));

    this._setupPlayableCharacters(this._heart, this._star);

    this.controls.spacebar.onUp.add(this._togglePlayerCharacter, this);
    this.controls.backspace.onUp.add(this._restartCharacters, this);
  }

  update () {
    this._playerCharacter.collideCharacter(this._idleCharacter);
    this._goal.collideCharacters(this._playerCharacter, this._idleCharacter);

    this.physics.arcade.collide(this._heart, this._layer1);
    this.physics.arcade.collide(this._star,  this._layer2);

    this._agents.collide(this._playerCharacter);
    this._agents.collide(this._idleCharacter);

    if (this.controls.left.isDown) {
      this._playerCharacter.walkLeft();
    }
    else if (this.controls.right.isDown) {
      this._playerCharacter.walkRight();
    }
    else {
      this._playerCharacter.stop();
      this._idleCharacter.stop();
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

    this._heartGroup.alpha = this._playerCharacter === this._heart ? 1 : 0;
    this._starGroup.alpha  = this._playerCharacter === this._star  ? 1 : 0;

    this._heart.alpha = this._playerCharacter === this._heart ? 1 : 0.75;
    this._star.alpha  = this._playerCharacter === this._star  ? 1 : 0.75;
  }

  _togglePlayerCharacter () {
    if (!this._playerCharacter) return;

    this._setupPlayableCharacters(this._idleCharacter, this._playerCharacter);

    this._playerCharacter.stop();
    this._idleCharacter.stop();
  }

  _restartCharacters () {
    this._heart.reset(200, 128);
    this._star.reset(40, 128);
  }

  _fellOff () {
    this._restartCharacters();
  }

}


import Goal              from 'objects/Goal';
//import Trap              from 'objects/Trap';
import Agents            from 'objects/Agents';
//import Platform          from 'objects/Platform';
import Character         from 'objects/Character';
import BackgroundPattern from 'objects/BackgroundPattern';

export default Game;
