import { ASSETS, CANVAS, PALETTE } from 'constants';

export default class Instructions extends Phaser.Text {
  constructor(game) {
    const { world } = game;

    const text = 'Kill the enemy by guiding your bullet to them. Click panels to rotate them. When you\'re ready to fire, press space.\nMake sure to fire before the timer runs out!';

    console.log('world', world);
    const style = {
      wordWrap: true,
      align: 'center',
      wordWrapWidth: CANVAS.WIDTH / 2,
      font: '8px Pixeled',
      fill: PALETTE.PRIMARY.WHITE,
    };

    super(game, world.centerX, world.centerY * 1.5625, text.toUpperCase(), style)

    this.anchor.setTo(0.5, 0.5);
  }
}
