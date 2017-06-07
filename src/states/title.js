import { ASSETS, STATES } from 'constants';

import Button from 'objects/button';
import Heading from 'objects/heading';

export default class Title extends Phaser.State {
  create() {
    const { game } = this;
    const objects = [
      new Heading(game, 'CGA Jam'),
      new Button(game, this.handleClick, 'Start game'),
    ];

    objects.forEach(game.add.existing, this);
    // tmp start level 1 for dev.
    this.game.state.start('LEVEL_01');
  }

  handleClick() {
    this.game.state.start('LEVEL_01');
  }
}
