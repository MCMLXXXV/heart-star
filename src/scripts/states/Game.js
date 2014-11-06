class Game extends Phaser.State {

  init (stageName) {
    this.controls = this.game.controls;

    this.stageName = stageName;

    this._playerActor = null;
    this._idleActor   = null;
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
    this._agents.actorFellOff.add(this._fellOff, this);

    this._heart = this.add.existing(new Actor(this.game, 200, 128, Actor.HEART));
    this._star = this.add.existing(new Actor(this.game, 40, 128, Actor.STAR));

    this._setupPlayableActors(this._heart, this._star);

    this.controls.spacebar.onUp.add(this._togglePlayerActor, this);
    this.controls.backspace.onUp.add(this._restartActors, this);
  }

  update () {
    this._playerActor.collideActor(this._idleActor);
    this._goal.collideActors(this._playerActor, this._idleActor);

    this.physics.arcade.collide(this._heart, this._layer1);
    this.physics.arcade.collide(this._star,  this._layer2);

    this._agents.collide(this._playerActor);
    this._agents.collide(this._idleActor);

    if (this.controls.left.isDown) {
      this._playerActor.walkLeft();
    }
    else if (this.controls.right.isDown) {
      this._playerActor.walkRight();
    }
    else {
      this._playerActor.stop();
      this._idleActor.stop();
    }

    if (this.controls.up.isDown) {
      this._playerActor.jump();
    }
    else {
      this._playerActor.cancelPowerJump();
    }
  }

  // --------------------------------------------------------------------------

  _setupPlayableActors(playerActor, idleActor) {
    this._playerActor      = playerActor;
    this._playerActor.idle = false;

    this._idleActor      = idleActor;
    this._idleActor.idle = true;

    this._heartGroup.alpha = this._playerActor === this._heart ? 1 : 0;
    this._starGroup.alpha  = this._playerActor === this._star  ? 1 : 0;

    this._heart.alpha = this._playerActor === this._heart ? 1 : 0.75;
    this._star.alpha  = this._playerActor === this._star  ? 1 : 0.75;
  }

  _togglePlayerActor () {
    if (!this._playerActor) return;

    this._setupPlayableActors(this._idleActor, this._playerActor);

    this._playerActor.stop();
    this._idleActor.stop();
  }

  _restartActors () {
    this._heart.reset(200, 128);
    this._star.reset(40, 128);
  }

  _fellOff () {
    this._restartActors();
  }

}


import Goal              from 'objects/Goal';
//import Trap              from 'objects/Trap';
import Actor             from 'objects/Actor';
import Agents            from 'objects/Agents';
//import Platform          from 'objects/Platform';
import BackgroundPattern from 'objects/BackgroundPattern';

export default Game;
