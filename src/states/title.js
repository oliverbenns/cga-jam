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
  }

  handleClick() {
    this.game.state.start(STATES.PLAY);
  }
}
