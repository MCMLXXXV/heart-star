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
