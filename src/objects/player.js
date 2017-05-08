import { ASSETS } from 'constants';

export default class Player extends Phaser.Sprite {
  constructor(game) {
    const { world } = game;

    super(game, world.centerX + 50, world.centerY, ASSETS.PLAYER, 1);

    game.physics.arcade.enable(this);

    this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;

    this.animations.add('left', [0, 1], 10, true);
    this.animations.add('right', [2, 1], 10, true);
  }
}
