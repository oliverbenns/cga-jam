import { ASSETS } from 'constants';

export default class Pickup extends Phaser.Sprite {
  constructor(game) {
    const { world } = game;
    const size = 24;

    super(game, world.centerX - size / 2, world.centerY - size / 2, ASSETS.PICKUP);

    game.physics.arcade.enable(this);

    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;
    this.body.bounce.y = 0.2 + Math.random() * 0.15;
  }
}
