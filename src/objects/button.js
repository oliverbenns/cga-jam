import { ASSETS, PALETTE } from 'constants';

export default class Button extends Phaser.Button {
  constructor(game, onClick, label) {
    const { world } = game;

    // Anchor is always centre so don't need to calculate half width/height.
    super(game, world.centerX, world.centerY * 1.25, ASSETS.BUTTON, onClick, null, 1, 1, 0);
    this.anchor.setTo(0.5, 0.5);

    if (label) {
      this.label = new Phaser.Text(game, 0, 0, label, { font: '16px Pixeled', fill: PALETTE.PRIMARY.BLACK });
      this.label.anchor.setTo(0.5, 0.5);
      this.addChild(this.label);
    }
  }

  update() {
    const active = this.frame === 0; // Is there a better way?

    this.label.position.y = active ? 3 : 0;
  }
}
