export default function tutorialLabel (g) {
  return Object.assign(g.add.image(0, 0, 'graphics'), {
    show (name = null) {
      this.visible = (name !== null);

      if (name) {
        this.frameName = name;
      }
    }
  });
}
