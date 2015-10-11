export function enableBody (sprite, callback = () => {}) {
  sprite.game.physics.arcade.enableBody(sprite);
  callback(sprite.body);

  return sprite;
}
