class Game extends Phaser.State {

  init (stageName, transitionName = 'fade-from-black') {
    this.game.transitions.registerTransition(transitionName);

    this.controls = this.game.controls;

    this.stageName = stageName;

    this._gameStageManager = this._makeManager(GameStageManager);
    this._objectsManager   = this._makeManager(ObjectsManager);

    this._playerActor = null;
    this._idleActor   = null;
  }

  create () {
    this.game.transitions.doTransition();

    this._stageDefinitions = this._getStageDefinitions(this.stageName);

    this._agents = this.add.existing(new Agents(this.game));

    this._heartGroup = this._objectsManager.createLayerFor('heart', true);
    this._starGroup  = this._objectsManager.createLayerFor('star', true);
    this._moonGroup  = this._objectsManager.createLayerFor('both');

    this._objectsManager.createObjects(this._stageDefinitions.objects);

    this._goal = this.add.existing(new Goal(this.game));
    this._goal.reset(this.goalCoordinates.x, this.goalCoordinates.y);
    this._goal.actorsLanded.addOnce(this._celebrate, this);

    this._heart = this.add.existing(this._makeActor(Actor.HEART));
    this._star  = this.add.existing(this._makeActor(Actor.STAR));

    this._heart.wasHurt.add(this._star.startle, this._star);
    this._star.wasHurt.add(this._heart.startle, this._heart);
    this._heart.wasHurt.add(this._actorHurt, this);
    this._star.wasHurt.add(this._actorHurt, this);

    this._restartActors();
    this._changeActors(this._heart, this._star);

    this.controls.spacebar.onUp.add(this._togglePlayerActor, this);
    this.controls.backspace.onUp.add(this._preRestartActors, this);
  }

  update () {
    this._playerActor.collideActor(this._idleActor);
    this._goal.collideActors(this._playerActor, this._idleActor);

    this._heartGroup.collide(this._heart);
    this._starGroup.collide(this._star);
    this._moonGroup.collide([ this._heart, this._star ]);

    this._agents.collide(this._playerActor);
    this._agents.collide(this._idleActor);

    if (this.inGame) {
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
    else {
      this._playerActor.stop();
      this._idleActor.stop();
    }
  }

  // --------------------------------------------------------------------------

  _makeManager (factory, ... args) {
    return new factory(this.game, ... args);
  }

  _getStageDefinitions (stageName) {
    return this._gameStageManager.getStage(stageName);
  }

  _makeActor (roleName) {
    return new Actor(this.game, roleName);
  }

  _changeActors (playerActor, idleActor) {
    this._playerActor      = playerActor;
    this._playerActor.idle = false;
    this._playerActor.stop();

    this._idleActor      = idleActor;
    this._idleActor.idle = true;
    this._idleActor.stop();

    this._toggleLayers();
  }

  _toggleLayers () {
    this._heartGroup.toggle(!this._heart.idle);
    this._starGroup.toggle(!this._star.idle);
  }

  _blink () {
    if (this._heart.idle)
      this.game.transitions.registerTransition('blink-blue');

    else if (this._star.idle)
      this.game.transitions.registerTransition('blink-pink');

    this.game.transitions.doTransition();
  }

  _closeBlinds () {
    this.game.transitions.registerTransition('blinds-close');
    this.game.transitions.registerTransitionCallback(this._goToNextStage, this);
    this.game.transitions.doTransition();
  }

  _togglePlayerActor () {
    if (!this.inGame) return;
    if (this.game.transitions.transitionRunning) return;
    if (!this._playerActor.standing) return;

    this._changeActors(this._idleActor, this._playerActor);

    this._blink();
  }

  _preRestartActors () {
    this.game.transitions.registerTransition('blinds-close');
    this.game.transitions.registerTransitionCallback(this._restartActors, this);
    this.game.transitions.doTransition();
  }

  _restartActors () {
    this._restartActor(this._heart, this.heartCoordinates);
    this._restartActor(this._star, this.starCoordinates);

    this.game.transitions.registerTransition('blinds-open');
    this.game.transitions.doTransition();

    this._changeActors(this._heart, this._star);
  }

  _restartActor(actor, { x, y }) {
    actor.reset(x, y);
    actor.sink();
  }

  _actorHurt () {
    this.time.events.add(1500, this._preRestartActors, this);
  }

  _celebrate () {
    this._heart.emotion = 'cheering';
    this._star.emotion  = 'cheering';

    this.time.events.add(1000, this._closeBlinds, this);
  }

  _goToNextStage () {
    var nextStage = this._stageDefinitions.next;

    if (nextStage === null)
      this.state.start('Credits');
    else
      this.state.start('Game', true, false, nextStage, 'blinds-open');
  }

  // --------------------------------------------------------------------------

  get heartCoordinates () {
    return this._stageDefinitions.actors.heart;
  }

  get starCoordinates () {
    return this._stageDefinitions.actors.star;
  }

  get goalCoordinates () {
    return this._stageDefinitions.actors.goal;
  }

  get inGame () {
    return this._playerActor && this._playerActor.emotion === null;
  }

}


import ObjectsManager   from 'managers/ObjectsManager';
import GameStageManager from 'managers/GameStageManager';

import Goal   from 'objects/Goal';
import Actor  from 'objects/Actor';
import Agents from 'objects/Agents';

export default Game;
