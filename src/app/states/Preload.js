import assets from '../data/assets';


function splashScreen (g) {
  g.add.image(0, 0, 'splash-screen');
  g.load.setPreloadSprite(g.add.image(60, 130, 'progress-bar'));
}


export default {

  preload (g) {
    splashScreen(g);
    g.load.pack('graphics', null, assets);
  },

  create (g) {
    g.state.start('Logo');
  }

};
