class StageSelect extends Phaser.State {

  init () {
    this.game.transitions.registerTransition('fade-from-black');
  }

  create () {
    this.game.transitions.doTransition();

    this.add.existing(new BackgroundPattern(this.game));
    this.add.image(0, 0, 'background-stage-select');

    this.add.image(0, 32, 'label-stage-select');

    this.add.existing(new BackButton(this.game));

    this.game.storage.fetch('stages', this._addStageButtons, this);
  }

  // --------------------------------------------------------------------------

  _addStageButtons (err, unlockedStages) {
    for (var len = unlockedStages.length, i = 0; i < len; ++i) {
      var { stage, buttonFace, locked } = unlockedStages[i];
      var x = 48 + 32 * (i % 5);
      var y = 64 + 32 * Math.floor(i / 5);

      this.add.existing(
        this._makeStageButton(x, y, stage, buttonFace, locked));
    }
  }

  _makeStageButton (x, y, stage, buttonFace, locked) {
    return new StageButton(this.game, x, y, stage, locked);
  }

}


import BackButton        from 'objects/BackButton';
import StageButton       from 'objects/StageButton';
import BackgroundPattern from 'objects/BackgroundPattern';

export default StageSelect;
