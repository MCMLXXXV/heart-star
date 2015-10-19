export const frames = (s, i, j=i, x=1) =>
  Phaser.Animation.generateFrameNames(s, i, j, '', x);
