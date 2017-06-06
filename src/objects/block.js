import { ASSETS } from 'constants';

export default class Block extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.BLOCK);

    game.physics.p2.enable(this, true);
    this.body.setRectangleFromSprite(this);
    this.body.static = true;

    // http://www.html5gamedevs.com/topic/8686-enabling-p2-physics-moves-the-sprite-to-the-left-and-top-exactly-half-the-sprite-size/
    // @TODO: I think I need to define the grid cells to be off centre axis now.
    this.body.x += this.width / 2;
    this.body.y += this.height / 2;

    game.debug.body(this);
  }
}
