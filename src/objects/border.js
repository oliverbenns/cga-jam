import { ASSETS } from 'constants';
import Block from 'objects/block';

export default class Border extends Phaser.Group {
  constructor(game) {
    super(game);

    const block = new Block(game, 0, 0);
    const block2 = new Block(game, 40, 0);
    this.add(block);
    this.add(block2);
  }
}
