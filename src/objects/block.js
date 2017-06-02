import { ASSETS } from 'constants';

export default class Block extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.BLOCK);

    game.physics.arcade.enable(this);

    this.body.immovable = true;
  }
}
