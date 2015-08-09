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

    this._levelManager   = new LevelManager(this.game);
    this._objectsManager = new ObjectsManager(this.game);

    this._idleActor    = null;
    this._activePlayer = null;

    this._unlockedLevels   = null;
    this._levelDefinitions = null;
  }

  create () {
    const addObject = (F, ...a) => this.add.existing(new F(this.game, ...a));

    this._agents = this.add.existing(new Agents(this.game));

    this._heartGroup = this._objectsManager.createLayerFor('heart', true);
    this._starGroup  = this._objectsManager.createLayerFor('star', true);
    this._moonGroup  = this._objectsManager.createLayerFor('both');

    this.controls.spacebar.onUp.add(this._switchActiveActor, this);
    this.controls.esc.onUp.add(this._goToLevelState, this);
    this.controls.backspace.onUp.add(this._resetGameStage, this);

    // -- The tutorial caption ------------------------------------------------
    this._tutorialLabel = this.make.image(0, 0, 'graphics');
    this._tutorialLabel.visible = false;
    this._moonGroup.add(this._tutorialLabel);

    // -- The goal platform ---------------------------------------------------
    this._goal = addObject(Goal);
    this._goal.actorsLanded.add(() => this._winLevel());

    // -- The actors ----------------------------------------------------------
    this._heart = addObject(Actor, Actor.HEART);
    this._heart.wasHurt.add(() => this._loseLevel());

    this._star = addObject(Actor, Actor.STAR);
    this._star.wasHurt.add(() => this._loseLevel());

    this._heart.wasHurt.add(() => this._star.startle());
    this._star.wasHurt.add(() => this._heart.startle());

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

  _prepareLevel (level) {
    this._levelDefinitions = this._levelManager.getLevel(level);
    this._objectsManager.createObjects(this._levelDefinitions.objects);

    this._showTutorialCaption(this._levelDefinitions.tutorial);
    this._resetGoal(this._levelDefinitions.goal);
    this._placeActors();
  }

  _showTutorialCaption (name) {
    this._tutorialLabel.visible = (name !== null);
    if (name !== null) {
      this._tutorialLabel.frameName = name;
    }
  }

  _resetGoal ({ x, y }) {
    this._goal.reset(x, y);
  }

  _placeActors () {
    this._restartActor(this._heart, this._levelDefinitions.actors.heart);
    this._restartActor(this._star, this._levelDefinitions.actors.star);
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

  get inGame () {
    return !this.transitions.isRunning &&
      this._activePlayer && this._activePlayer.emotion === null;
  }

}
