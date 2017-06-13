import { ASSETS, PALETTE } from 'constants';

export default class Button extends Phaser.Button {
  constructor(game, onClick, label) {
    const { world } = game;

    const fn = () => {
      game.sound.play(ASSETS.SFX_CLICK);
      onClick();
    };

    // Anchor is always centre so don't need to calculate half width/height.
    super(game, world.centerX, world.centerY * 1.25, ASSETS.BUTTON, fn, null, 1, 1, 0);
    this.anchor.setTo(0.5, 0.5);

    if (label) {
      this.label = new Phaser.Text(game, 0, 0, label.toUpperCase(), { font: '10px Pixeled', fill: PALETTE.PRIMARY.LIGHT_MAGENTA });
      this.label.anchor.setTo(0.5, 0.5);
      this.addChild(this.label);
    }
  }
}
