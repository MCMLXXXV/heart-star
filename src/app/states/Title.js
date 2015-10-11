import scrollingPattern from '../components/scrollingPattern';
import { menuButton }   from '../components/uiButtons';
import Actor            from '../objects/Actor';


function showMenuButtons (g) {
  const addButton = (y) => g.add.button(80, y, 'graphics');

  menuButton(addButton(110), 'start', 'Levels');
  menuButton(addButton(130), 'credits', 'Credits');
}


export default {

  create (g) {
    const image  = (x, y, k, s) => g.add.image(x, y, k, s);
    const object = (F, ...a) => g.add.existing(new F(g, ...a));

    const placeCharacter = (role, x) => object(Actor, role)
      .reset(x, 96)
      .play('happy');

    scrollingPattern(g);
    image(0, 0, 'graphics', 'background-title');
    image(240, 0, 'graphics', 'version').anchor.set(1, 0);

    g.add.tween(image(0, 18, 'graphics', 'title'))
      .to({ y: '+8' }, 1500, 'Quad.easeInOut')
      .to({ y: '-8' }, 1500, 'Quad.easeInOut')
      .loop()
      .start();

    placeCharacter('heart',  64);
    placeCharacter('star',  176);

    showMenuButtons(g);
  }

};
