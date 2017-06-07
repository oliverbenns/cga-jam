import { ASSETS, MATERIALS, PHYSICS } from 'constants';
import { getMaterial } from 'utils';

export default class Target extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.TARGET);

    game.physics.p2.enable(this, true);

    this.body.clearShapes();
    this.body.loadPolygon(PHYSICS, 'target');

    this.body.static = true;
    game.debug.body(this);

    this.inputEnabled = true;
    this.events.onInputDown.add(this.listener, this);

    const targetMaterial = getMaterial(game, MATERIALS.TARGET);
    this.body.setMaterial(targetMaterial);
  }

  listener (sprite, pointer) {
    if (pointer.button === Phaser.Mouse.RIGHT_BUTTON) {
      this.body.angle -= 45;
      return;
    }

    this.body.angle += 45;
  }
}

