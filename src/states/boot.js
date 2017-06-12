import { ASSETS, PHYSICS, MATERIALS, STATES } from 'constants';

export default class Boot extends Phaser.State {
  preload() {
    const { load } = this.game;

    load.image(ASSETS.BACKGROUND, 'assets/img/background.png');
    load.image(ASSETS.PARTICLE, 'assets/img/particle.png');
    load.spritesheet(ASSETS.BULLET, 'assets/img/bullet.png', 4, 4);
    load.spritesheet(ASSETS.BLOCK, 'assets/img/block.png', 60, 60);
    load.spritesheet(ASSETS.BUTTON, 'assets/img/button.png', 190, 49);
    load.spritesheet(ASSETS.ENEMY, 'assets/img/enemy.png', 20, 32);
    load.spritesheet(ASSETS.PLAYER, 'assets/img/player.png', 20, 32);
    load.spritesheet(ASSETS.TARGET, 'assets/img/target.png', 60, 60);

    this.game.load.physics(PHYSICS, 'assets/physics.json');
    this.game.physics.p2.setImpactEvents(true);

    this.game.physics.p2.createMaterial(MATERIALS.BULLET);
    this.game.physics.p2.createMaterial(MATERIALS.TARGET);
  }

  create() {
    this.game.state.start(STATES.TITLE);
    this.game.canvas.oncontextmenu = e => e.preventDefault(); // Disables right click
  }
}
