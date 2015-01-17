import Boot    from './app/states/Boot';
import Preload from './app/states/Preload';
import Logo    from './app/states/Logo';
import Title   from './app/states/Title';
import Levels  from './app/states/Levels';
import Credits from './app/states/Credits';
import Game    from './app/states/Game';

export function start () {
  var game = new Phaser.Game(240, 160, Phaser.AUTO);

  [
    Boot,
    Preload,
    Logo,
    Title,
    Levels,
    Credits,
    Game
  ].map(state => game.state.add(state.name, state));

  game.state.start('Boot');

  return game;
}
