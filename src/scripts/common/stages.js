export default {

  stages: {
    '01': { heartLayer: '01a', starLayer: '01b', nextStage: '02' },
    '02': { heartLayer: '02a', starLayer: '02b', nextStage: '03' },
    '03': { heartLayer: '03a', starLayer: '03b', nextStage: '04' },
    '04': { heartLayer: '04a', starLayer: '04b', nextStage: '05' },
    '05': { heartLayer: '05a', starLayer: '05b', nextStage: '06' },
    '06': { heartLayer: '06a', starLayer: '06b', nextStage: '07' },
    '07': { heartLayer: '07a', starLayer: '07b', nextStage: '08' },
    '08': { heartLayer: '08a', starLayer: '08b', nextStage: '09' },
    '09': { heartLayer: '09a', starLayer: '09b', nextStage: '10' },
    '10': { heartLayer: '10a', starLayer: '10b', nextStage: null }
  },

  getRelatedLayerNames (key) {
    var { heartLayer, starLayer } = this.stages[key];

    return { heartLayer, starLayer };
  },

  getNextStage (key) {
    return this.stages[key].nextStage;
  }

};
