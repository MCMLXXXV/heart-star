class BackgroundPattern extends Phaser.TileSprite {

  constructor (game, texture = BackgroundPattern.HEART_STAR) {
    super(game, 0, 0, 240, 160, texture);

    this._changeScroll(texture);
  }

  // --------------------------------------------------------------------------

  _getScrollSpeed (texture) {
    switch (texture) {
      case BackgroundPattern.HEART_STAR: return [   0,  15 ];
      case BackgroundPattern.HEART:      return [ -15,  15 ];
      case BackgroundPattern.MOON:       return [ -15, -15 ];
      case BackgroundPattern.STAR:       return [  15, -15 ];
    }
  }

  _changeScroll (texture) {
    this.autoScroll(... this._getScrollSpeed(texture));
  }

}


BackgroundPattern.HEART      = 'bg-pattern-heart';
BackgroundPattern.HEART_STAR = 'bg-pattern-heart-star';
BackgroundPattern.MOON       = 'bg-pattern-moon';
BackgroundPattern.STAR       = 'bg-pattern-star';

export default BackgroundPattern;
