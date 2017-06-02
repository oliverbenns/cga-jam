import { ASSETS, STATES } from 'constants';

export default class Boot extends Phaser.State {
  preload() {
    const { load } = this.game;



    load.image(ASSETS.BACKGROUND, 'assets/img/background.png');
    load.spritesheet(ASSETS.PLAYER, 'assets/img/player.png', 20, 32);
    load.spritesheet(ASSETS.BUTTON, 'assets/img/button.png', 190, 49);
    load.spritesheet(ASSETS.TARGET, 'assets/img/target.png', 80, 80);
    load.spritesheet(ASSETS.BLOCK, 'assets/img/block.png', 40, 40);
  }

  create() {
    this.game.state.start(STATES.TITLE);
  }
}
