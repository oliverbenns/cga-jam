import { ASSETS, STATES } from 'constants';

import Button from 'objects/button';
import Heading from 'objects/heading';

export default class End extends Phaser.State {
  create() {
    const { game } = this;
    const objects = [
      new Heading(game, 'Game Over'),
      new Button(game, this.handleClick, 'Retry'),
    ];

    objects.forEach(game.add.existing, this);
  }

  handleClick() {
    this.game.state.start('LEVEL_01');
  }
}
