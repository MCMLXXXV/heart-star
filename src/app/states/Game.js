import defaultLevels          from '../data/levels';
import parseLevelsFromTilemap from '../components/parseLevelsFromTilemap';
import tutorialCaption        from '../components/tutorialCaption';
import ObjectsManager         from '../managers/ObjectsManager';
import Goal                   from '../objects/Goal';
import Actor                  from '../objects/Actor';
import Agents                 from '../objects/Agents';


const resetObject = (o, { position: { x, y } }) => o.reset(x, y);
const resetActor = (actor, o) => (resetObject(actor, o), actor.sink());


export default {

  init (initialLevel = '01') {
    this.initialLevel   = initialLevel;
    this.levelCompleted = false;
    this.storage        = this.game.storage;
    this.controls       = this.game.controls;
    this.gameLevels     = parseLevelsFromTilemap(this.game, 'tilemaps');
    this.objectsManager = new ObjectsManager(this.game);
  },

  create (g) {
    const addObject = (F, ...a) => g.add.existing(new F(g, ...a));

    const goBackLevelSelection = () => g.state.start('Levels');

    // -- The collision agents ------------------------------------------------
    this.agents = addObject(Agents);

    // -- The game world features ---------------------------------------------
    this.heartLayer = this.objectsManager.createLayerFor('heart', true);
    this.starLayer  = this.objectsManager.createLayerFor('star',  true);
    this.moonLayer  = this.objectsManager.createLayerFor('both');

    // -- The tutorial caption ------------------------------------------------
    this.tutorialCaption = this.moonLayer.add(tutorialCaption(g));

    // -- The goal platform ---------------------------------------------------
    const goal = this.goal = addObject(Goal);
    goal.actorsLanded.add(() => this.winLevel());

    // -- The actors ----------------------------------------------------------
    const startle = (actor) => () => (this.loseLevel(), actor.startle());
    const heart   = this.heart = addObject(Actor, Actor.HEART);
    const star    = this.star  = addObject(Actor, Actor.STAR);

    heart.wasInjured.add(startle(star));
    star.wasInjured.add(startle(heart));

    this.prepareLevel(this.initialLevel);

    g.controls.spacebar.onUp.add(this.switchActiveActor, this);
    g.controls.esc.onUp.add(goBackLevelSelection);
    g.controls.backspace.onUp.add(this.resetLevel, this);

    g.storage
      .getItem('levels')
      .then((unlockedLevels) => {
        this.unlockedLevels = unlockedLevels || defaultLevels;
      });
  },

  update (g) {
    this.activeActor.collideActor(this.waitingActor);
    this.goal.collideActors(this.heart, this.star);

    this.heartLayer.collide(this.heart);
    this.starLayer.collide(this.star);
    this.moonLayer.collide([ this.heart, this.star ]);

    this.agents.collide(this.heart);
    this.agents.collide(this.star);

    if (this.inGame) {
      const { left, right, up } = g.controls;
      const xAxis = Number(right.isDown) - Number(left.isDown);

      this.activeActor.move(xAxis);
      this.activeActor.jump(up.isDown, up.repeats);

      Actor.updateAnimation(this.heart, (this.activeActor === this.heart));
      Actor.updateAnimation(this.star,  (this.activeActor === this.star));
    }
  },

  // --------------------------------------------------------------------------

  prepareLevel (level) {
    this.levelCompleted = false;
    this.levelDefinitions = this.gameLevels.getLevel(level);
    this.objectsManager.createObjects(this.levelDefinitions);

    this.tutorialCaption.show(this.levelDefinitions.meta.tutorial);

    resetObject(this.goal, this.levelDefinitions.goal);
    this.resetActors();
  },

  resetActors () {
    resetActor(this.heart, this.levelDefinitions.heart);
    resetActor(this.star, this.levelDefinitions.star);
    this.changeActiveActor(this.heart, this.star, true);
  },

  changeActiveActor (activeActor, waitingActor, resettingLevel = false) {
    const change = (actor) => {
      actor.stop();
      actor.alpha = (actor === waitingActor) ? 0.5 : 1;
      actor.play((actor !== waitingActor) ?
        (actor.isCarrying && !resettingLevel ? 'carrying+looking' : 'looking') :
        (actor.isCarrying && !resettingLevel ? 'carrying' : 'normal'));

      return actor;
    };

    this.waitingActor = change(waitingActor);
    this.activeActor  = change(activeActor);

    this.heartLayer.visible = (activeActor === this.heart);
    this.starLayer.visible  = (activeActor === this.star);
  },

  switchActiveActor () {
    if (!this.inGame) return;
    if (!this.activeActor.isStanding) return;

    this.changeActiveActor(this.waitingActor, this.activeActor);
  },

  resetLevel () {
    if (!this.inGame) return;

    this.resetActors();
    this.objectsManager.reset();
  },

  loseLevel () {
    this.time.events.add(1000, () => {
      this.resetActors();
      this.objectsManager.reset();
    });
  },

  winLevel () {
    const haltActor = (actor) => {
      actor.play('cheering');
      actor.float();
      actor.stop();
    };

    haltActor(this.heart);
    haltActor(this.star);

    this.time.events.add(
      1500, () => this.startLevel(this.levelDefinitions.meta.next));

    this.levelCompleted = true;
  },

  startLevel (nextLevel) {
    if (nextLevel === null) {
      this.state.start('Credits');
    }
    else {
      this.unlockLevel(nextLevel);
      this.prepareLevel(nextLevel);
    }
  },

  unlockLevel (level) {
    const nextLevel = this.unlockedLevels.find(({ name }) => name === level);

    if (nextLevel.locked) {
      nextLevel.locked = false;
      this.storage.setItem('levels', this.unlockedLevels);
    }
  },

  // --------------------------------------------------------------------------

  get inGame () {
    return !(this.levelCompleted ||
      this.activeActor.isInjured ||
      this.waitingActor.isInjured);
  }

};
