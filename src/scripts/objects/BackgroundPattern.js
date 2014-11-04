class BackgroundPattern extends Phaser.TileSprite {

  constructor (game, texture = BackgroundPattern.HEART_STAR) {
    super(game, 0, 0, 240, 160);

    this.change(texture);
  }

  change (texture = BackgroundPattern.HEART_STAR) {
    this.loadTexture(texture);
    this._changeScroll(texture);
  }

  // --------------------------------------------------------------------------

  _changeScroll (texture) {
    var scrollSpeed = [ 0, 15 ];

    if (texture === BackgroundPattern.HEART_STAR) {
      scrollSpeed = [   0,  15 ];
    }
    else if (texture === BackgroundPattern.HEART) {
      scrollSpeed = [ -15,  15 ];
    }
    else if (texture === BackgroundPattern.MOON) {
      scrollSpeed = [ -15, -15 ];
    }
    else if (texture === BackgroundPattern.STAR) {
      scrollSpeed = [  15, -15 ];
    }

    this.autoScroll(... scrollSpeed);
  }

}


BackgroundPattern.HEART      = 'bg-pattern-heart';
BackgroundPattern.HEART_STAR = 'bg-pattern-heart-star';
BackgroundPattern.MOON       = 'bg-pattern-moon';
BackgroundPattern.STAR       = 'bg-pattern-star';

export default BackgroundPattern;
