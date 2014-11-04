class StageSelect extends Phaser.State {

  create () {
    this.add.existing(new BackgroundPattern(this.game));
    this.add.image(0, 0, 'background-stage-select');

    this.add.image(0, 32, 'label-stage-select');

    this.add.existing(new BackButton(this.game));

    this.add.existing(new StageButton(this.game,  48, 64, '01', 'button-stage-01', false));
    this.add.existing(new StageButton(this.game,  80, 64, '02', 'button-stage-02', true));
    this.add.existing(new StageButton(this.game, 112, 64, '03', 'button-stage-03', true));
    this.add.existing(new StageButton(this.game, 144, 64, '04', 'button-stage-04', true));
    this.add.existing(new StageButton(this.game, 176, 64, '05', 'button-stage-05', true));
    this.add.existing(new StageButton(this.game,  48, 96, '06', 'button-stage-06', true));
    this.add.existing(new StageButton(this.game,  80, 96, '07', 'button-stage-07', true));
    this.add.existing(new StageButton(this.game, 112, 96, '08', 'button-stage-08', true));
    this.add.existing(new StageButton(this.game, 144, 96, '09', 'button-stage-09', true));
    this.add.existing(new StageButton(this.game, 176, 96, '10', 'button-stage-10', true));
  }

  // --------------------------------------------------------------------------

}


import BackButton        from 'objects/BackButton';
import StageButton       from 'objects/StageButton';
import BackgroundPattern from 'objects/BackgroundPattern';

export default StageSelect;
