class Game extends Phaser.State {

  init (stageName) {
    this.controls = this.game.controls;

    this.stageName = stageName;
  }

  create () {
    this.add.existing(new BackgroundPattern(this.game, BackgroundPattern.MOON));

    this._tilemap = this.add.tilemap('tilemaps');
    this._tilemap.setCollisionBetween(1, 144, true, 'test');
    this._tilemap.addTilesetImage('tileset');

    this._layer = this._tilemap.createLayer('test');

    this._star = this.add.sprite(72, 32, 'character-star');
    this._star.animations.add('main', [ 0, 1, 2, 3 ], 4, true).play();
    this._star.anchor.set(0.5, 1);
    this.physics.arcade.enableBody(this._star);
    this._star.body.setSize(10, 16);
    this._star.body.gravity.y = 300;
  }

  update () {
    this.physics.arcade.collide(this._star, this._layer);

    this._star.body.velocity.x = 0;

    if (this.controls.left.isDown)
      this._star.body.velocity.x = -64;
    else if (this.controls.right.isDown)
      this._star.body.velocity.x =  64;

    if (this._star.body.blocked.down) {
      if (this.controls.up.isDown) {
        this._star.body.velocity.y = -120;
      }
    }
  }

  render () {
    // this.game.debug.body(this._star);
  }

  // --------------------------------------------------------------------------

}


import BackgroundPattern from 'objects/BackgroundPattern';

export default Game;
