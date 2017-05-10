import { ASSETS, STATES } from 'constants';

export default class Boot extends Phaser.State {
  preload() {
    const { load } = this.game;

    load.image(ASSETS.BACKGROUND, 'assets/img/background.png');
    load.image(ASSETS.PLATFORM, 'assets/img/platform.png');
    load.image(ASSETS.PICKUP, 'assets/img/pickup.png');
    load.spritesheet(ASSETS.PLAYER, 'assets/img/player.png', 20, 32);
    load.spritesheet(ASSETS.BUTTON, 'assets/img/button.png', 190, 49);
  }

  create() {
    this.game.state.start(STATES.TITLE);
  }
}
