export default function map (g, parent, levels) {
  let layer;

  const tilemap   = g.add.tilemap(levels);
  const container = parent.add(g.add.group());

  tilemap.addTilesetImage('tileset');

  return {
    setup (name) {
      if (layer) { layer.destroy(); }
      layer = container.add(tilemap.createLayer(name));
      tilemap.setCollisionBetween(1, 144, true, name);
    },

    collide (actor) {
      g.physics.arcade.collide(actor, layer, null, () => !actor.isInjured);
    }
  };
}
