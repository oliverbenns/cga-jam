import { ASSETS, STATES } from 'constants';

import Button from 'objects/button';

export default class Title extends Phaser.State {
  create() {
    const button = new Button(this.game, this.handleClick, 'Start Game');
    this.game.add.existing(button);
  }

  handleClick() {
    this.game.state.start(STATES.PLAY);
  }
}
