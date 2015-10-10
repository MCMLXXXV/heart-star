import scrollingPattern from '../components/scrollingPattern';
import { menuButton } from '../components/uiButtons';
import { addAnimations } from '../objects/Actor';


function showMenuButtons (g) {
  const addButton = (y) => g.add.button(80, y, 'graphics');

  menuButton(addButton(110), 'start', 'Levels');
  menuButton(addButton(130), 'credits', 'Credits');
}


export default {

  init (effectName = 'iris') {
    this.game.transitions.reveal(
      effectName, 1000, () => showMenuButtons(this.game));
  },

  create () {
    const image = (x, y, k, s) => this.add.image(x, y, k, s);
    const anchorXY = (x, y, o) => (o.anchor.set(x, y), o);

    const placeCharacter = (s, x) =>
      addAnimations(anchorXY(0.5, 1, image(x, 96, 'sprites')), s)
        .play('happy');

    scrollingPattern(this.game);
    image(0, 0, 'graphics', 'background-title');
    anchorXY(1, 0, image(240, 0, 'graphics', 'version'));

    this.add.tween(image(0, 18, 'graphics', 'title'))
      .to({ y: '+8' }, 1500, 'Quad.easeInOut')
      .to({ y: '-8' }, 1500, 'Quad.easeInOut')
      .loop()
      .start();

    placeCharacter('heart',  64);
    placeCharacter('star',  176);
  }

};
