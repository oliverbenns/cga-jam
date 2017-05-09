import { ASSETS } from 'constants';

export default class Background extends Phaser.Image {
  constructor(game) {
    super(game, 0, 0, ASSETS.BACKGROUND);
  }
}
