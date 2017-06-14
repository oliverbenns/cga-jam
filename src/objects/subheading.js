import { PALETTE } from 'constants';

export default class Subheading extends Phaser.Text {
  constructor(game, text) {
    const { world } = game;

    super(game, world.centerX, world.centerY, text.toUpperCase(), { font: '12px Pixeled', fill: PALETTE.WHITE })

    this.anchor.setTo(0.5, 0.5);
  }
}
