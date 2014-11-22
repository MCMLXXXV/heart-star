import Boot        from './states/Boot';
import Preload     from './states/Preload';
import Logo        from './states/Logo';
import Title       from './states/Title';
import StageSelect from './states/StageSelect';
import CreditsAI   from './states/CreditsAI';
import CreditsRB   from './states/CreditsRB';
import Game        from './states/Game';

export default {

  start () {
    var game = new Phaser.Game(240, 160, Phaser.WEBGL, 'game');

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

};
