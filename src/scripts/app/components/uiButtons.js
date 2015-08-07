const frameName = (name, state) => `button-${name}-${state}`;
const overFrame = (name) => frameName(name, 'over');
const outFrame = (name) => frameName(name, 'out');


export function menuButton (button, name, stateName, ... args) {
  const toState = (stateName) =>
    () => button.game.transitions.toState(stateName, 'blackout', 1000, ... args);

  button.setFrames(overFrame(name), outFrame(name));
  button.onInputUp.add(toState(stateName));

  return button;
}


export function linkButton (button, page, url) {
  const name = `link-${page}`;
  const goToURL = (url) => () => window.open(url);

  button.setFrames(overFrame(name), outFrame(name));
  button.anchor.set(0.5, 0);
  button.onInputUp.add(goToURL(url));

  return button;
}


export function levelButton (button, level, locked) {
  const LEVEL_LOCKED_FRAMENAME = 'button-level-locked';

  const name = `level-${level}`;
  const toState = (level) =>
    () => button.game.transitions.toState('Game', 'blackout', 1000, level);

  if (locked) {
    button.input.useHandCursor = false;
    button.setFrames(LEVEL_LOCKED_FRAMENAME, LEVEL_LOCKED_FRAMENAME);
  }
  else {
    button.onInputUp.add(toState(level));
    button.setFrames(overFrame(name), outFrame(name));
  }

  return button;
}
