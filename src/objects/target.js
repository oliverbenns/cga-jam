import { ASSETS } from 'constants';

export default class Target extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.TARGET);

    game.physics.p2.enable(this, true)

    this.body.setCircle(45);
    game.debug.body(this);


    this.inputEnabled = true;
    this.events.onInputDown.add(this.listener, this);
  }

  listener (sprite, pointer) {
    if (pointer.button === Phaser.Mouse.RIGHT_BUTTON) {
      this.angle -= 45;
      return;
    }

    this.angle += 45;
  }
}

