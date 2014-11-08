class Game extends Phaser.State {

  init (stageName) {
    this.controls = this.game.controls;

    this.stageName = stageName;

    this._objectsManager = new ObjectsManager(this.game);

    this._playerActor = null;
    this._idleActor   = null;
  }

  create () {
    this._objectsManager.actorTrapped.add(this._restartActors, this);

    var { heartLayer, starLayer } = stages.getRelatedLayerNames(this.stageName);

    this._heartGroup = this._objectsManager.createLayerFor('heart', true);
    this._starGroup  = this._objectsManager.createLayerFor('star', true);
    this._moonGroup  = this._objectsManager.createLayerFor('both');

    this._tilemap1 = this._makeTilemap(heartLayer);
    this._tilemap2 = this._makeTilemap(starLayer);

    var mapObjects  = objectsParser(this._tilemap1.objects[this.stageName]);
    this.heartCoordinates = mapObjects['positions']['heart']['position'];
    this.starCoordinates  = mapObjects['positions']['star']['position'];
    this.goalCoordinates  = mapObjects['positions']['goal']['position'];

    this._objectsManager.createObjects(mapObjects);

    this._layer1 = this._heartGroup.add(this._makeTilemapLayer(this._tilemap1, heartLayer));
    this._layer2 = this._starGroup.add(this._makeTilemapLayer(this._tilemap2, starLayer));

    this._agents = this.add.existing(new Agents(this.game));
    this._agents.actorFellOff.add(this._fellOff, this);

    this._goal = this.add.existing(
      new Goal(
        this.game,
        this.goalCoordinates.x,
        this.goalCoordinates.y));
    this._goal.actorsLanded.addOnce(this._goToNextStage, this);

    this._heart = this.add.existing(
      new Actor(
        this.game,
        this.heartCoordinates.x,
        this.heartCoordinates.y,
        Actor.HEART));
    this._star = this.add.existing(
      new Actor(
        this.game,
        this.starCoordinates.x,
        this.starCoordinates.y,
        Actor.STAR));

    this._setupPlayableActors(this._heart, this._star);

    this.controls.spacebar.onUp.add(this._togglePlayerActor, this);
    this.controls.backspace.onUp.add(this._restartActors, this);
  }

  update () {
    this._playerActor.collideActor(this._idleActor);
    this._goal.collideActors(this._playerActor, this._idleActor);

    this.physics.arcade.collide(this._heart, this._layer1);
    this.physics.arcade.collide(this._star,  this._layer2);

    this._heartGroup.collide(this._heart);
    this._starGroup.collide(this._star);
    this._moonGroup.collide([ this._heart, this._star ]);

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

  _makeTilemap (collisionLayerName) {
    var tilemap = this.add.tilemap('tilemaps');

    tilemap.setCollisionBetween(1, 144, true, collisionLayerName);
    tilemap.addTilesetImage('tileset');

    return tilemap;
  }

  _makeTilemapLayer (tilemap, layerName) {
    return tilemap.createLayer(layerName);
  }

  _setupPlayableActors(playerActor, idleActor) {
    this._playerActor      = playerActor;
    this._playerActor.idle = false;

    this._idleActor      = idleActor;
    this._idleActor.idle = true;

    this._heartGroup.toggle(this._playerActor === this._heart ? 1 : 0);
    this._starGroup.toggle(this._playerActor === this._star ? 1 : 0);

    this._heart.alpha = this._playerActor === this._heart ? 1 : 0.75;
    this._star.alpha  = this._playerActor === this._star  ? 1 : 0.75;
  }

  _togglePlayerActor () {
    if (!this._playerActor.standing) return;

    this._setupPlayableActors(this._idleActor, this._playerActor);

    this._playerActor.stop();
    this._idleActor.stop();
  }

  _restartActors () {
    this._heart.reset(this.heartCoordinates.x, this.heartCoordinates.y);
    this._star.reset(this.starCoordinates.x, this.starCoordinates.y);
  }

  _fellOff () {
    this._restartActors();
  }

  _goToNextStage () {
    var nextStage = stages.getNextStage(this.stageName);

    if (nextStage === null)
      this._restartActors();
    else
      this.state.start('Game', true, false, nextStage);
  }

}


import stages        from 'common/stages';
import objectsParser from 'common/objectsParser';

import ObjectsManager from 'managers/ObjectsManager';

import Goal   from 'objects/Goal';
import Actor  from 'objects/Actor';
import Agents from 'objects/Agents';

export default Game;
