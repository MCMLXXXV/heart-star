import {
  default as scrollingPattern,
  patternFor
}                      from '../components/scrollingPattern';
import createMap       from '../objects/map';
import createGate      from '../objects/gate';
import createButton    from '../objects/button';
import createSpikes    from '../objects/spikes';
import createPlatforms from '../objects/platforms';


export default function layer (g, role, { enableBackground=false }={}) {
  const container = g.add.group();
  const map       = createMap(g, container, 'tilemaps');
  const gate      = createGate(g, container, role);
  const button    = createButton(g, container, role, gate);
  const spikes    = createSpikes(g, container, role);
  const platforms = createPlatforms(g, container, role);

  if (enableBackground) {
    container.addAt(scrollingPattern(g, patternFor(role)), 0);
  }

  return {
    setup (objects, mapName=null) {
      if (mapName) { map.setup(mapName); }
      gate.setup(objects.gate);
      button.setup(objects.button);
      spikes.setup(objects.spikes);
      platforms.setup(objects.platforms);
    },

    reset () {
      gate.reset();
      button.reset();
    },

    collide (actor) {
      map.collide(actor);
      gate.collide(actor);
      button.collide(actor);
      spikes.collide(actor);
      platforms.collide(actor);
    },

    get visible () {
      return container.visible;
    },
    set visible (visible) {
      container.visible = visible;
    }
  };
}
