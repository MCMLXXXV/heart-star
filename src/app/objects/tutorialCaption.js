export default function tutorialLabel (g) {
  const image = g.add.image(0, 0, 'graphics');
  return {
    show (name=null) {
      image.visible = (name !== null);
      if (name) { image.frameName = name; }
    }
  };
}
