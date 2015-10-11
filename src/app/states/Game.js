import levels from '../data/levels';

import parseLevelsFromTilemap from '../components/parseLevelsFromTilemap';
import tutorialCaption        from '../components/tutorialCaption';

import ObjectsManager from '../managers/ObjectsManager';

import Goal   from '../objects/Goal';
import Actor  from '../objects/Actor';
import Agents from '../objects/Agents';


export default class Game extends Phaser.State {

  init (level = '01') {
    this.level = level;

    this.storage     = this.game.storage;
    this.controls    = this.game.controls;
    this.transitions = this.game.transitions;

    this._levelManager   = parseLevelsFromTilemap(this.game, 'tilemaps');
    this._objectsManager = new ObjectsManager(this.game);

    this._waitingActor = null;
    this._activeActor  = null;

    this._unlockedLevels   = null;
    this._levelDefinitions = null;
  }

  create (g) {
    const addObject = (F, ...a) => this.add.existing(new F(this.game, ...a));

    const goBackLevelSelection =
      () => this.transitions.toState('Levels', 'blackout', 1000);

    this._agents = this.add.existing(new Agents(this.game));

    this._heartLayer = this._objectsManager.createLayerFor('heart', true);
    this._starLayer  = this._objectsManager.createLayerFor('star', true);
    this._moonLayer  = this._objectsManager.createLayerFor('both');

    this.controls.spacebar.onUp.add(this._switchActiveActor, this);
    this.controls.esc.onUp.add(goBackLevelSelection);
    this.controls.backspace.onUp.add(this._resetGameStage, this);

    // -- The tutorial caption ------------------------------------------------
    this.tutorialCaption = this._moonLayer.add(tutorialCaption(g));

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

  update (g) {
    this._activeActor.collideActor(this._waitingActor);
    this._goal.collideActors(this._activeActor, this._waitingActor);

    this._heartLayer.collide(this._heart);
    this._starLayer.collide(this._star);
    this._moonLayer.collide([ this._heart, this._star ]);

    this._agents.collide(this._activeActor);
    this._agents.collide(this._waitingActor);

    if (this.inGame) {
      const { left, right, up } = g.controls;
      const xAxis = Number(right.isDown) - Number(left.isDown);

      this._activeActor.move(xAxis);
      this._activeActor.jump(up.isDown, up.repeats);
    }
  }

  // --------------------------------------------------------------------------

  _prepareLevel (level) {
    this._levelDefinitions = this._levelManager.getLevel(level);
    this._objectsManager.createObjects(this._levelDefinitions);

    this.tutorialCaption.show(this._levelDefinitions.meta.tutorial);
    this._resetGoal(this._levelDefinitions.goal);
    this._resetActors();
  }

  _resetGoal ({ position: { x, y } }) {
    this._goal.reset(x, y);
  }

  _resetActors () {
    this._resetActor(this._heart, this._levelDefinitions.heart);
    this._resetActor(this._star, this._levelDefinitions.star);
    this._changeActiveActor(this._heart, this._star);
    this._switchLayers();
  }

  _resetActor (actor, { position: { x, y } }) {
    actor.reset(x, y);
    actor.sink();
  }

  _changeActiveActor (activeActor, waitingActor) {
    const change = (actor, isWaiting) => {
      actor.stop();
      actor.idle = isWaiting;

      return actor;
    };

    this._waitingActor = change(waitingActor, true);
    this._activeActor  = change(activeActor,  false);
  }

  _switchLayers () {
    this._heartLayer.visible = !this._heart.idle;
    this._starLayer.visible = !this._star.idle;
  }

  _switchActiveActor () {
    if (!this.inGame) return;
    if (!this._activeActor.standing) return;

    this.transitions.reveal(`blink-${ this._waitingActor.role }`, 400);
    this._changeActiveActor(this._waitingActor, this._activeActor);
    this._switchLayers();
  }

  _resetGameStage () {
    if (!this.inGame) return;

    this.transitions.reveal('copy', 500);
    this._resetActors();
    this._objectsManager.reset();
  }

  _loseLevel () {
    this.time.events.add(1000, () => {
      this.transitions.hide('blinds', 1000, () => {
        this._resetActors();
        this._objectsManager.reset();
        this.transitions.reveal('blinds', 1000);
      });
    });
  }

  _winLevel () {
    const haltActor = (actor) => {
      actor.emotion = 'cheering';
      actor.float();
      actor.stop();
    };

    haltActor(this._heart);
    haltActor(this._star);

    this.time.events.add(1500, () => this._startNextLevel());
  }

  _startNextLevel () {
    let nextLevel = this._levelDefinitions.meta.next;

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
    const nextLevel = this._unlockedLevels.find(({ name }) => name === level);

    if (nextLevel.locked) {
      nextLevel.locked = false;
      this.storage.setItem('levels', this._unlockedLevels);
    }
  }

  // --------------------------------------------------------------------------

  get inGame () {
    return !this.transitions.isRunning &&
      this._activeActor && this._activeActor.emotion === null;
  }

}
