import Platform from 'objects/platform';
import { ASSETS } from 'constants';

export default class Floor extends Platform {
  constructor(game) {
    const { world } = game;

    super(game, 0, world.height - 20);

    // Scale it to fit the width of the game (the original sprite is half size)
    this.scale.setTo(2, 1);
  }
}
