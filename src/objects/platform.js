import { ASSETS } from 'constants';

export default class Platform extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.PLATFORM);

    game.physics.arcade.enable(this);

    this.body.immovable = true;
  }
}
