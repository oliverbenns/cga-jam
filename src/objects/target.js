import { ASSETS } from 'constants';

export default class Target extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.TARGET);

    game.physics.arcade.enable(this);

    this.body.immovable = true;
  }
}
