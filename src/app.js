import * as states from './app/states';


export default function app () {
  const game = new Phaser.Game(240, 160, Phaser.CANVAS);

  Object.keys(states).forEach((key) => game.state.add(key, states[key]));

  game.state.start('Boot');

  return game;
}
