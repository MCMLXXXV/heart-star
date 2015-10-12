const noop          = () => {};
const bitmap        = (g) => g.make.bitmapData(g.width, g.height);
const renderTexture = (g) => new Phaser.RenderTexture(g, g.width, g.height);


function tweenTransition (g, i, j, duration, process) {
  return g.make.tween({
    get k ()  { return i;   },
    set k (v) { process(v); }
  }).to({ k: j }, duration);
}


function transition (g, { img, tex }, { beforeReveal=noop, beforeHide=noop, process=noop, x=0, y=1, z=0 }={}) {
  let t1, t2;

  const isRunning = () => (t1 && t1.isRunning || t2 && t2.isRunning);

  const showImg = () => {
    img.alpha = 1;
    img.visible = true;
    img.loadTexture(tex);
  };

  const hideImg = () => setTimeout(() => {
    if (!isRunning()) { img.visible = false; }
  }, 20);

  hideImg();

  return {
    reveal ({ duration=1000, delay=0 }={}, callback=noop) {
      if (!this.isRunning) {
        t1 = tweenTransition(g, x, y, duration, process);

        t1.delay(delay, 0);
        t1.onComplete.add(callback);
        t1.onComplete.add(hideImg);

        showImg();
        beforeReveal();
        t1.start();
      }
    },

    hide ({ duration=1000, delay=0 }={}, callback=noop) {
      if (!this.isRunning) {
        t2 = tweenTransition(g, y, z, duration, process);

        t2.delay(delay, 0);
        t2.onComplete.add(hideImg);
        t2.onComplete.add(callback);

        showImg();
        beforeHide();
        t2.start();
      }
    },

    chain ({ duration=1000, delay=0 }={}, callback=noop) {
      if (!this.isRunning) {
        t1 = tweenTransition(g, y, z, duration / 2, process);
        t2 = tweenTransition(g, x, y, duration / 2, process);

        t1.delay(delay, 0);
        t1.onComplete.add(callback);
        t2.onComplete.add(hideImg);

        showImg();
        beforeHide();
        t1.chain(t2).start();
      }
    },

    get isRunning () {
      return isRunning();
    }
  };
}


function iris (g, img) {
  const tex        = bitmap(g);
  const radius     = Math.hypot(tex.width, tex.height) / 2;
  const halfWidth  = tex.width / 2;
  const halfHeight = tex.height / 2;

  return transition(g, { img, tex }, {
    beforeReveal: () => tex.fill(0, 0, 0),
    beforeHide: () => tex.clear(),
    process: (k) => {
      tex.blendSourceOver();
      tex.fill(0, 0, 0);
      tex.blendDestinationOut();
      tex.circle(halfWidth, halfHeight, radius * k);
    }
  });
}


function blinds (g, img) {
  const tex = bitmap(g);

  return transition(g, { img, tex }, {
    beforeReveal: () => tex.fill(0, 0, 0),
    beforeHide: () => tex.clear(),
    process: (k) => {
      tex.clear();

      for (let i = 0; i < 11; ++i) {
        tex.rect(24 * i, 0, 24 * k, tex.height);
      }
    },
    x: -1,
    y: 0,
    z: 1
  });
}


function blackout (g, img) {
  const tex = bitmap(g).fill(0, 0, 0);

  return transition(g, { img, tex }, {
    beforeReveal: () => img.alpha = 1,
    beforeHide: () => img.alpha = 0,
    process: (k) => img.alpha = k,
    x: 1,
    y: 0,
    z: 1
  });
}


function heart (g, img) {
  const tex = bitmap(g).fill(255, 122, 122);

  return transition(g, { img, tex }, {
    beforeReveal: () => img.alpha = 1,
    beforeHide: () => img.alpha = 0,
    process: (k) => img.alpha = k,
    x: 1,
    y: 0,
    z: 1
  });
}


function star (g, img) {
  const tex = bitmap(g).fill(107, 175, 245);

  return transition(g, { img, tex }, {
    beforeReveal: () => img.alpha = 1,
    beforeHide: () => img.alpha = 0,
    process: (k) => img.alpha = k,
    x: 1,
    y: 0,
    z: 1
  });
}

function copy (g, img) {
  const tex = renderTexture(g);

  return transition(g, { img, tex }, {
    beforeReveal: () => {
      tex.renderXY(g.world, 0, 0, true);
      img.loadTexture(tex);
      img.alpha = 1;
    },
    process: (k) => img.alpha = k,
    x: 1,
    y: 0,
    z: 1
  });
}


function register (o, g, img, name, effect) {
  const e = effect(g, img);

  Object.defineProperty(o, name, {
    get () { return o.last = e; }
  });
}


export default {
  init () {
    const g   = this.game;
    const img = g.stage.addChild(g.make.image(0, 0));

    register(this, g, img, 'iris',     iris);
    register(this, g, img, 'blinds',   blinds);
    register(this, g, img, 'blackout', blackout);
    register(this, g, img, 'heart',    heart);
    register(this, g, img, 'star',     star);
    register(this, g, img, 'copy',     copy);

    this.last = null;
  },

  render () { /* noop */ },

  get isRunning () {
    return this.last && this.last.isRunning;
  }
};
