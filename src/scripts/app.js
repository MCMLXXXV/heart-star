import * as states from './app/states';


export default function () {
  var game = new Phaser.Game(240, 160, Phaser.AUTO);

  Object.keys(states)
    .map((key) => [ key, states[key] ])
    .forEach((args) => game.state.add(... args));

  game.state.start('Boot');

  return game;
}
