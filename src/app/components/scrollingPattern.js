const SCROLL_SPEED = 16;

const HEART_STAR = 'pattern-heart-star';
const HEART      = 'pattern-heart';
const MOON       = 'pattern-moon';
const STAR       = 'pattern-star';

const scrollOptions = {
  [HEART_STAR]: [             0,  SCROLL_SPEED ],
  [HEART]:      [ -SCROLL_SPEED,  SCROLL_SPEED ],
  [MOON]:       [ -SCROLL_SPEED, -SCROLL_SPEED ],
  [STAR]:       [  SCROLL_SPEED, -SCROLL_SPEED ]
};

const scrollPattern = (o, key) => (o.autoScroll(...scrollOptions[key]), o);


export default function scrollingPattern (g, key = HEART_STAR) {
  return scrollPattern(g.add.tileSprite(0, 0, 240, 160, 'graphics', key), key);
}

scrollingPattern.HEART_STAR = HEART_STAR;
scrollingPattern.HEART      = HEART;
scrollingPattern.MOON       = MOON;
scrollingPattern.STAR       = STAR;
