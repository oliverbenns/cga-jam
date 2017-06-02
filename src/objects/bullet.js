import { ASSETS } from 'constants';

export default class Bullet extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.BULLET);

    game.physics.arcade.enable(this);

    this.body.bounce.x = 1;
    this.body.bounce.y = 1;

    // this.anchor.setTo(0.5);
    console.log('this.position.x', this.position.x);
    console.log('this.position.y', this.position.y);
  }
}

