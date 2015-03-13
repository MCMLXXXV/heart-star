import StageButton       from '../objects/LevelButton';
import MenuOptionButton  from '../objects/MenuOptionButton';
import BackgroundPattern from '../objects/BackgroundPattern';


export default class Levels extends Phaser.State {

  init () {
    this.game.transitions.registerTransition('fade-from-black');
  }

  create () {
    this.game.transitions.doTransition();

    this.add.existing(new BackgroundPattern(this.game));
    this.add.image(0, 0, 'background-level-select');

    this.add.image(0, 32, 'labels', 'label-level-select');

    let backButton = new MenuOptionButton(this.game, 0, 0);
    backButton.onInputUp.addOnce(() => this._doTransition('Title'));
    this.add.existing(backButton);

    this.game.storage.getItem('levels', this._addStageButtons, this);
  }

  // --------------------------------------------------------------------------

  _addStageButtons (err, unlockedLevels) {
    for (var len = unlockedLevels.length, i = 0; i < len; ++i) {
      var { name, buttonFace, locked } = unlockedLevels[i];
      var x = 48 + 32 * (i % 5);
      var y = 64 + 32 * Math.floor(i / 5);

      this.add.existing(
        this._makeStageButton(x, y, name, buttonFace, locked));
    }
  }

  _makeStageButton (x, y, level, buttonFace, locked) {
    return new StageButton(this.game, x, y, level, locked);
  }

  _doTransition (stateName, ... params) {
    this.game.transitions.registerTransition('fade-to-black');
    this.game.transitions.registerTransitionCallback(
      () => this._goToState(stateName, ... params));
    this.game.transitions.doTransition();
  }

  _goToState (stateName, ... params) {
    this.game.state.start(stateName, true, false, ... params);
  }

}
