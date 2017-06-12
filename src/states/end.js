import { ASSETS, STATES } from 'constants';
import levels from 'config/levels';

import Button from 'objects/button';
import Heading from 'objects/heading';
import Subheading from 'objects/subheading';

export default class End extends Phaser.State {
  create() {
    const { game } = this;
    const objects = [
      new Heading(game, this.success ? 'You Win' : 'Game Over'),
      new Subheading(game, this.success ? this.message : `${this.message} And Reached Level ${this.levelNumber} / ${levels.length}`),
      new Button(game, this.handleClick, 'Retry'),
    ];

    objects.forEach(game.add.existing, this);
  }

  handleClick() {
    this.game.state.start('LEVEL_01');
  }
}
