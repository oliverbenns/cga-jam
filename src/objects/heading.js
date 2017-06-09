import { ASSETS, PALETTE } from 'constants';

export default class Heading extends Phaser.Text {
  constructor(game, text) {
    const { world } = game;

    super(game, world.centerX, world.centerY * 0.75, text, { font: '48px Pixeled', fill: PALETTE.PRIMARY.LIGHT_CYAN })

    this.anchor.setTo(0.5, 0.5);
  }
}
