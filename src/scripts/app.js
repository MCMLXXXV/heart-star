import Boot        from './app/states/Boot';
import Preload     from './app/states/Preload';
import Logo        from './app/states/Logo';
import Title       from './app/states/Title';
import StageSelect from './app/states/StageSelect';
import CreditsAI   from './app/states/CreditsAI';
import CreditsRB   from './app/states/CreditsRB';
import Game        from './app/states/Game';

export function start () {
  var game = new Phaser.Game(240, 160, Phaser.AUTO);

  game.state.add('Boot',        Boot);
  game.state.add('Preload',     Preload);
  game.state.add('Logo',        Logo);
  game.state.add('Title',       Title);
  game.state.add('StageSelect', StageSelect);
  game.state.add('CreditsAI',   CreditsAI);
  game.state.add('CreditsRB',   CreditsRB);
  game.state.add('Game',        Game);

  game.state.start('Boot');

  return game;
}
