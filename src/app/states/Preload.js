import assets from '../data/assets';

function splashScreen (g) {
  g.add.image(0, 0, 'splash-screen');
  g.load.setPreloadSprite(
    g.add.bitmapData(120, 10)
      .fill(255, 184, 184)
      .addToWorld(60, 130));
}


export default {

  preload () {
    splashScreen(this.game);
    this.load.pack('graphics', null, assets);
  },

  create () {
    this.state.start('Logo');
  }

};
