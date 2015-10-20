const toStateCallback = (g, k, ...a) => () =>
  g.transitions.isRunning || g.transitions.blackout.hide({
    duration: 1000
  }, () => g.state.start(k, true, false, ...a));
const frameName = (name, state) => `button-${name}-${state}`;
const overFrame = (name) => frameName(name, 'over');
const outFrame = (name) => frameName(name, 'out');


export function menuButton (button, name, stateName, ...args) {
  button.setFrames(overFrame(name), outFrame(name));
  button.onInputUp.add(toStateCallback(button.game, stateName, ...args));

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
  if (locked) {
    button.input.useHandCursor = false;
    button.setFrames(LEVEL_LOCKED_FRAMENAME, LEVEL_LOCKED_FRAMENAME);
  }
  else {
    button.onInputUp.add(toStateCallback(button.game, 'Game', level));
    button.setFrames(overFrame(name), outFrame(name));
  }

  return button;
}
