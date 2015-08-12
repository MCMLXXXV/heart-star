import Gate              from '../objects/Gate';
import Trap              from '../objects/Trap';
import Button            from '../objects/Button';
import Platform          from '../objects/Platform';
import BackgroundPattern from '../objects/BackgroundPattern';


class ObjectsLayer extends Phaser.Group {

  constructor (game, owner) {
    super(game);

    this._owner = owner;

    this._tilemap = this._makeTilemap('tilemaps');
    this._tilemapLayer = null;

    this._tilemapGroup = this.add(game.make.group());

    this._gateGroup = this.add(game.make.group());
    this._gate = this._gateGroup.add(new Gate(game, owner));
    this._button = this._gateGroup.add(new Button(game, owner));
    this._gate.bindTo(this._button);

    this._trapsGroup = this.add(game.make.group());
    this._platformsGroup = this.add(game.make.group());
  }

  // --------------------------------------------------------------------------

  changeTilemapLayer (layerName) {
    if (this._tilemapLayer !== null)
      this._tilemapLayer.destroy();

    this._tilemapLayer = this._makeTilemapLayer(this._tilemap, layerName);

    this._tilemapGroup.add(this._tilemapLayer);
  }

  placeTrap (x, y) {
    this._addObject(x, y, this._trapsGroup, Trap, this._owner);
  }

  placePlatform (x, y, range) {
    const platform = this._addObject(
      x, y, this._platformsGroup,
      Platform, this._owner);

    platform.range = range;
  }

  placeGate (x, y) {
    this._gate.reset(x, y);
  }

  placeButton (x, y, orientation) {
    this._button.reset(x, y);
    this._button.orientation = orientation;
  }

  enableBackground () {
    this.addAt(new BackgroundPattern(this.game, this.preferedBackground), 0);
  }

  collide (actor) {
    const collide = (o, f = null, g = null) =>
      this.game.physics.arcade.collide(o, actor, f, g);

    const harmActor = () => actor.harm(true);
    const actorIsNotHurt = () => !actor.hurt;
    const switchButtonOn = () => this._button.switchOn();
    const buttonIsNotTriggered = () => !(this._button.triggered || actor.hurt);
    const gateIsNotOpen = () => !(this._gate.open || actor.hurt);

    collide(this._tilemapLayer, null, actorIsNotHurt);
    collide(this._button, switchButtonOn, buttonIsNotTriggered);
    collide(this._gate, null, gateIsNotOpen);
    collide(this._trapsGroup, harmActor, actorIsNotHurt);
    collide(this._platformsGroup);
  }

  reset () {
    this._gate.close();
    this._button.switchOff();
  }

  recycle () {
    this._tilemapGroup.callAll('kill');
    this._gateGroup.callAll('kill');
    this._trapsGroup.callAll('kill');
    this._platformsGroup.callAll('kill');
  }

  // --------------------------------------------------------------------------

  _makeTilemap (tilemapKey) {
    const tilemap = this.game.make.tilemap(tilemapKey);

    tilemap.addTilesetImage('tileset');

    return tilemap;
  }

  _makeTilemapLayer (tilemap, layerName) {
    const tilemapLayer = tilemap.createLayer(layerName);

    tilemap.setCollisionBetween(1, 144, true, layerName);

    return tilemapLayer;
  }

  _addObject (x, y, group, factory, ...features) {
    const object = group.getFirstDead() ||
      group.add(new factory(this.game, ...features));

    return object.reset(x, y);
  }

  // --------------------------------------------------------------------------

  get preferedBackground () {
    switch (this._owner) {
      case 'heart': return BackgroundPattern.HEART;
      case 'star':  return BackgroundPattern.STAR;
      case 'both':  return BackgroundPattern.HEART_STAR;
    }
  }

}


export default ObjectsLayer;
