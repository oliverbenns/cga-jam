import { ASSETS } from 'constants';

export default class Block extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.BLOCK);

    game.physics.p2.enable(this, true);
    this.body.setRectangleFromSprite(this);
    this.body.static = true;

    game.debug.body(this);
  }
}
