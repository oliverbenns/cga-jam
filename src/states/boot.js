import { ASSETS, PHYSICS, MATERIALS, STATES } from 'constants';

export default class Boot extends Phaser.State {
  preload() {
    const { load } = this.game;

    load.image(ASSETS.BACKGROUND, 'assets/img/background.png');
    load.spritesheet(ASSETS.BULLET, 'assets/img/bullet.png', 4, 4);
    load.spritesheet(ASSETS.BLOCK, 'assets/img/block.png', 40, 40);
    load.spritesheet(ASSETS.BUTTON, 'assets/img/button.png', 190, 49);
    load.spritesheet(ASSETS.PLAYER, 'assets/img/player.png', 20, 32);
    load.spritesheet(ASSETS.TARGET, 'assets/img/target.png', 80, 80);

    this.game.load.physics(PHYSICS, 'assets/physics.json');

    const bulletMaterial = this.game.physics.p2.createMaterial(MATERIALS.BULLET);
    const targetMaterial = this.game.physics.p2.createMaterial(MATERIALS.TARGET);
  }

  create() {
    this.game.state.start(STATES.TITLE);
    this.game.canvas.oncontextmenu = e => e.preventDefault(); // Disables right click
  }
}
