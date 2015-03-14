const SCROLL = 16;

class BackgroundPattern extends Phaser.TileSprite {

  constructor (game, texture = BackgroundPattern.HEART_STAR) {
    super(game, 0, 0, 240, 160, texture);

    this._changeScroll(texture);
  }

  // --------------------------------------------------------------------------

  _getScrollSpeed (texture) {
    switch (texture) {
      case BackgroundPattern.HEART_STAR: return [       0,  SCROLL ];
      case BackgroundPattern.HEART:      return [ -SCROLL,  SCROLL ];
      case BackgroundPattern.MOON:       return [ -SCROLL, -SCROLL ];
      case BackgroundPattern.STAR:       return [  SCROLL, -SCROLL ];
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
