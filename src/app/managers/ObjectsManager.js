import ObjectsLayer from '../objects/ObjectsLayer';


export default function ObjectsManager (g) {
  const layers      = {};
  const getLayerFor = (k) => layers[k];

  function setupMaps ({ heart, star }) {
    getLayerFor('heart').changeTilemapLayer(heart);
    getLayerFor('star').changeTilemapLayer(star);
  }

  function setupSpikes (spikes) {
    for (let { position: { x, y }, properties: { owner } } of spikes) {
      getLayerFor(owner).placeTrap(x, y);
    }
  }

  function setupPlatforms (platforms) {
    for (let { position: { x, y }, properties: { owner, type } } of platforms) {
      getLayerFor(owner).placePlatform(x, y, type);
    }
  }

  function setupGates (gates) {
    for (let { position: { x, y }, properties: { owner } } of gates) {
      getLayerFor(owner).placeGate(x, y);
    }
  }

  function setupButtons (buttons) {
    for (let { position: { x, y }, properties: { owner, orientation } } of buttons) {
      getLayerFor(owner).placeButton(x, y, orientation);
    }
  }

  return {
    createLayerFor (owner, enableBackground = false) {
      const layer = new ObjectsLayer(g, owner);

      if (enableBackground) {
        layer.enableBackground();
      }

      Object.defineProperty(layers, owner, { get () { return layer; } });

      return layer;
    },

    createObjects (objects) {
      [ 'heart', 'star', 'both' ].forEach((k) => getLayerFor(k).recycle());

      setupMaps(objects.meta.layers);
      setupSpikes(objects.traps);
      setupPlatforms(objects.platforms);
      setupGates(objects.gates);
      setupButtons(objects.buttons);
    },

    reset () {
      [ 'heart', 'star', 'both' ].forEach((k) => getLayerFor(k).reset());
    }
  };
}
