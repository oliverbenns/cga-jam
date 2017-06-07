import { ASSETS, MATERIALS, PHYSICS } from 'constants';
import { getMaterial } from 'utils';

export default class Bullet extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.BULLET);

    game.physics.p2.enable(this, true);

    this.body.setCircle(6);

    this.body.fixedRotation = true;
    game.debug.body(this);

    const material = getMaterial(game, MATERIALS.BULLET);
    this.body.setMaterial(material);
  }
}

