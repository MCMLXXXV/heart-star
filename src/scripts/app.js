import * as states from './app/states';


export default function app () {
  const game = new Phaser.Game(240, 160, Phaser.CANVAS);

  Object.keys(states)
    .map((key) => [ key, states[key] ])
    .forEach((args) => game.state.add(... args));

  game.state.start('Boot');

  return game;
}
