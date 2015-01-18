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
    [ 'Boot'   , Boot    ],
    [ 'Preload', Preload ],
    [ 'Logo'   , Logo    ],
    [ 'Title'  , Title   ],
    [ 'Levels' , Levels  ],
    [ 'Credits', Credits ],
    [ 'Game'   , Game    ],
  ].map(([name, state]) => game.state.add(name, state));

  game.state.start('Boot');

  return game;
}
