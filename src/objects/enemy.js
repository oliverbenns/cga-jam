import { ASSETS } from 'constants';

export default class Enemy extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.ENEMY, 1);

    game.physics.p2.enable(this, true);

    this.body.setRectangle(20);
    this.body.static = true;
    game.debug.body(this);
  }
}
