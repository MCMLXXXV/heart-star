import ObjectsLayer from '../objects/ObjectsLayer';


export default function ObjectsManager (g) {
  const layers      = {};
  const getLayerFor = (k) => layers[k];

  return {
    createLayerFor (owner, enableBackground = false) {
      const layer = new ObjectsLayer(g, owner, { enableBackground });
      Object.defineProperty(layers, owner, { get () { return layer; } });
      return layer;
    },

    setup ({ meta: { layers }, objects: { heart, star, both }}) {
      getLayerFor('heart').setup(heart, layers.heart);
      getLayerFor('star').setup(star, layers.star);
      getLayerFor('both').setup(both);
    },

    reset () {
      [ 'heart', 'star', 'both' ].forEach((k) => getLayerFor(k).reset());
    }
  };
}
