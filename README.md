Heart Star
===============================================================================

A game originally created by [Jussi Simpanen][advi] for [Ludum Dare 30][ld-g],
Theme: "Connected Worlds".


Story
-------------------------------------------------------------------------------

> Two friends want to reach the same place together but they have a little
> problem: They live in completely different worlds! Help the friends reach the
> common goal while swapping between the red and blue world. While the friends
> might not be able to see each others worlds, they can still interact by
> serving as a platform or carrying each other.


Motivations and Objectives
-------------------------------------------------------------------------------

'Heart Star' is a Flash game, designed and created using the game authoring
software Stencyl.

For learning purposes, I took the opportunity and wrote this HTML/JavaScript
port, using [Phaser][phsr].

This port is a remake of the Ludum Dare version, aiming to be accurate as the
original game as possible. None of the subsequent updates of the original game
are planned to be ported, though.

WIP: [Play a preview of the game.][demo] See below for planned updates.


Game Controls
-------------------------------------------------------------------------------

Use arrow keys no move and jump the platforms. To switch worlds, hit
'SPACEBAR'. Use 'BACKSPACE' to restart the level. Use 'ESC' to quit and return
to the stage selection screen.


Development Instructions
-------------------------------------------------------------------------------

You can either [play the pre-built version of the game][demo], or clone this
project locally, provided you meet the following pre-requisites:

*   You already have [Node.js][node] properly installed and configured.

*   You also have [Gulp][gulp] installed globally in your system.

*   Optionally: you have [Git][gscm] installed in your system, as well.
    Alternatively, you can download the [packaged project's source 
    code][dwnl].

Either way, you have to issue the following commands on a terminal:

```sh
npm install
bower install
gulp
```

Then, a tab in your prefered browser should open, pointed to the address
`http://localhost:3000/`.


### Project Features ##########################################################

*   Game ported with [Phaser][phsr] framework.

*   Game levels and some background images composed usign [Tiled Map
    Editor][tled].

*   [localForage][lfor], responsible for in game data storage management—mainly
    the unlockable levels!

*   All program code is written using the ECMAScript 6 dialect of JavaScript.
    [Traceur Compiler][trcr] is used to make it compatible with today's 
    browsers.

*   [BrowserSync][bsnc] as development server.

*   [Node.js][node] development environment; [Gulp][gulp] task manager.


Planned Updates
-------------------------------------------------------------------------------

### Fixes #####################################################################

*   Proper reuse of resources (i.e. less `this.state.start` calls in game 
    levels).
*   Make friends carry each other while falling (bug).
*   Rewrite the Transitions plugin (it's ugly!).
*   Huge code clean up.

### Improvements ##############################################################

*   Sound effects.
*   Mobile controls (still being considered).
*   Make game playable offline (offline-cache & webapp manifest review).
*   Make a Texture Atlas of all the graphical assets used in the game.


Licensing
-------------------------------------------------------------------------------

Source code distributed under the terms of the [MIT License][mitl].

Original game project by Jussi Simpanen, shared under a [Creative Commons 3.0
Atribution—Non-Commercial—Share-Alike Unported][cc-l] license. All remixed
artwork used in this version of the game is redistributed under the [same
license][cc-l].


<!-- ---------------------------------------------------------------------- -->

[phsr]: http://phaser.io/
[gulp]: http://gulpjs.com/
[gulp]: http://gulpjs.com/
[node]: http://nodejs.org/
[gscm]: http://git-scm.com/
[bsnc]: http://browsersync.io/
[tled]: http://www.mapeditor.org/
[advi]: http://simpanen.carbonmade.com/
[demo]: http://rblopes.github.io/heart-star/
[lfor]: http://mozilla.github.io/localForage/
[dwnl]: /rblopes/heart-star/archive/master.zip
[mitl]: /rblopes/heart-star/blob/master/LICENSE
[trcr]: https://github.com/google/traceur-compiler
[cc-l]: http://creativecommons.org/licenses/by-nc-sa/3.0/
[ld-g]: http://ludumdare.com/compo/ludum-dare-30/?action=preview&uid=11391
