import levels from '../data/levels';

import ObjectsManager from '../managers/ObjectsManager';
import LevelManager   from '../managers/LevelManager';

import Goal   from '../objects/Goal';
import Actor  from '../objects/Actor';
import Agents from '../objects/Agents';


export default class Game extends Phaser.State {

  init (level = '01') {
    this.level = level;

    this.storage     = this.game.storage;
    this.controls    = this.game.controls;
    this.transitions = this.game.transitions;

    this._levelManager   = this._makeManager(LevelManager);
    this._objectsManager = this._makeManager(ObjectsManager);

    this._goal         = null;
    this._star         = null;
    this._heart        = null;
    this._idleActor    = null;
    this._activePlayer = null;

    this._tutorialLabel    = null;
    this._unlockedLevels   = null;
    this._levelDefinitions = null;
  }

  create () {
    this._agents = this.add.existing(new Agents(this.game));

    this._heartGroup = this._objectsManager.createLayerFor('heart', true);
    this._starGroup  = this._objectsManager.createLayerFor('star', true);
    this._moonGroup  = this._objectsManager.createLayerFor('both');

    this.controls.spacebar.onUp.add(this._switchActiveActor, this);
    this.controls.esc.onUp.add(this._goToLevelState, this);
    this.controls.backspace.onUp.add(this._resetGameStage, this);

    this.transitions.reveal('blackout', 1000);
    this._prepareLevel(this.level);

    this.storage
      .getItem('levels')
      .then((unlockedLevels) => {
        this._unlockedLevels = unlockedLevels || levels;
      });
  }

  update () {
    this._activePlayer.collideActor(this._idleActor);
    this._goal.collideActors(this._activePlayer, this._idleActor);

    this._heartGroup.collide(this._heart);
    this._starGroup.collide(this._star);
    this._moonGroup.collide([ this._heart, this._star ]);

    this._agents.collide(this._activePlayer);
    this._agents.collide(this._idleActor);

    if (this.inGame) {
      if (this.controls.left.isDown) {
        this._activePlayer.walkLeft();
      }
      else if (this.controls.right.isDown) {
        this._activePlayer.walkRight();
      }
      else {
        this._activePlayer.stop();
        this._idleActor.stop();
      }

      if (this.controls.up.isDown) {
        this._activePlayer.jump();
      }
      else {
        this._activePlayer.cancelPowerJump();
      }
    }
    else {
      this._activePlayer.stop();
      this._idleActor.stop();
    }
  }

  // --------------------------------------------------------------------------

  _makeManager (factory, ... args) {
    return new factory(this.game, ... args);
  }

  _makeActor (roleName) {
    let actor = new Actor(this.game, roleName);

    actor.wasHurt.add(() => this._loseLevel());

    return actor;
  }

  _prepareLevel (level) {
    this._levelDefinitions = this._getLevelDefinitions(level);
    this._objectsManager.createObjects(this._levelDefinitions.objects);

    this._placeTutorialLabel();
    this._placeGoal();
    this._placeActors();
  }

  _getLevelDefinitions (level) {
    return this._levelManager.getLevel(level);
  }

  _placeTutorialLabel () {
    const name = this._tutorialLabelName;

    if (this._tutorialLabel === null) {
      this._tutorialLabel = this.make.image(0, 0, 'graphics');
      this._moonGroup.add(this._tutorialLabel);
    }

    if (name === null) {
      this._tutorialLabel.alpha = 0;
    }
    else {
      this._tutorialLabel.alpha = 1;
      this._tutorialLabel.frameName = name;
    }
  }

  _placeGoal () {
    const { x, y } = this.goalCoordinates;

    if (this._goal === null) {
      this._goal = this.add.existing(new Goal(this.game));
      this._goal.actorsLanded.add(this._winLevel, this);
    }

    this._goal.reset(x, y);
  }

  _placeActors () {
    if (this._heart === null && this._star === null) {
      this._heart = this.add.existing(this._makeActor(Actor.HEART));
      this._star  = this.add.existing(this._makeActor(Actor.STAR));

      this._heart.wasHurt.add(this._star.startle, this._star);
      this._star.wasHurt.add(this._heart.startle, this._heart);
    }

    this._restartActor(this._heart, this.heartCoordinates);
    this._restartActor(this._star, this.starCoordinates);
    this._switchActors(this._heart, this._star);
  }

  _restartActor (actor, { x, y }) {
    actor.reset(x, y);
    actor.sink();
  }

  _switchActors (playerActor, idleActor) {
    this._activePlayer      = playerActor;
    this._activePlayer.idle = false;
    this._activePlayer.stop();

    this._idleActor      = idleActor;
    this._idleActor.idle = true;
    this._idleActor.stop();

    this._switchLayers();
  }

  _switchLayers () {
    this._heartGroup.toggle(!this._heart.idle);
    this._starGroup.toggle(!this._star.idle);
  }

  _switchActiveActor () {
    if (!this.inGame) return;
    if (!this._activePlayer.standing) return;

    this._doActorSwitchEffect(this._idleActor.role);
    this._switchActors(this._idleActor, this._activePlayer);
  }

  _doActorSwitchEffect (role) {
    let effectName;

    if (role === 'heart') {
      effectName = 'pink';
    }
    else if (role === 'star') {
      effectName = 'sky-blue';
    }

    this.transitions.reveal(effectName, 400);
  }

  _resetGameStage () {
    if (!this.inGame) return;

    this.transitions.reveal('copy', 500);
    this._placeActors();
    this._objectsManager.reset();
  }

  _loseLevel () {
    this.time.events.add(1000, () => {
      this.transitions.hide('blinds', 1000, () => {
        this._placeActors();
        this._objectsManager.reset();
        this.transitions.reveal('blinds', 1000);
      });
    });
  }

  _winLevel () {
    this._heart.emotion = 'cheering';
    this._heart.float();
    this._heart.stop();

    this._star.emotion  = 'cheering';
    this._star.float();
    this._star.stop();

    this.time.events.add(1500, () => this._startNextLevel());
  }

  _startNextLevel () {
    let nextLevel = this._levelDefinitions.next;

    if (nextLevel === null) {
      this.transitions.toState('Credits', 'blackout', 1000);
    }
    else {
      this.transitions.hide('blinds', 1000, () => {
        this._unlockLevel(nextLevel);
        this._prepareLevel(nextLevel);
        this.transitions.reveal('blinds', 1000);
      });
    }
  }

  _unlockLevel (level) {
    let lvl = this._unlockedLevels
      .find((lvl) => lvl.name === level);

    if (lvl.locked) {
      lvl.locked = false;

      this.storage.setItem('levels', this._unlockedLevels);
    }
  }

  _goToLevelState () {
    this.transitions.toState('Levels', 'blackout', 1000);
  }

  // --------------------------------------------------------------------------

  get _tutorialLabelName () {
    return this._levelDefinitions.tutorial;
  }

  get goalCoordinates () {
    return this._levelDefinitions.goal;
  }

  get heartCoordinates () {
    return this._levelDefinitions.actors.heart;
  }

  get starCoordinates () {
    return this._levelDefinitions.actors.star;
  }

  get inGame () {
    return !this.transitions.isRunning &&
      this._activePlayer && this._activePlayer.emotion === null;
  }

}
