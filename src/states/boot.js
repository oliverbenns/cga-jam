import { ASSETS, MATERIALS, STATES } from 'constants';

export default class Boot extends Phaser.State {
  preload() {
    const { load } = this.game;

    load.image(ASSETS.BACKGROUND, 'assets/img/background.png');
    load.image(ASSETS.PARTICLE, 'assets/img/particle.png');

    load.spritesheet(ASSETS.BULLET, 'assets/img/bullet.png', 4, 4);
    load.spritesheet(ASSETS.BLOCK, 'assets/img/block.png', 60, 60);
    load.spritesheet(ASSETS.BUTTON, 'assets/img/button.png', 180, 60);
    load.spritesheet(ASSETS.ENEMY, 'assets/img/enemy.png', 20, 32);
    load.spritesheet(ASSETS.PLAYER, 'assets/img/player.png', 60, 60);
    load.spritesheet(ASSETS.TARGET, 'assets/img/target.png', 60, 60);

    // Audio provided by https://www.freesound.org/people/LittleRobotSoundFactory/packs/16681/
    load.audio(ASSETS.SFX_COUNTDOWN, 'assets/audio/countdown.mp3');
    load.audio(ASSETS.SFX_CLICK, 'assets/audio/click.mp3');
    load.audio(ASSETS.SFX_FIRE, 'assets/audio/fire.mp3');
    load.audio(ASSETS.SFX_RICHOCHET, 'assets/audio/ricochet.mp3');
    load.audio(ASSETS.SFX_SUCCESS, 'assets/audio/success.mp3');
    load.audio(ASSETS.SFX_EXPLODE, 'assets/audio/explode.mp3');
    load.audio(ASSETS.SFX_INTRO, 'assets/audio/intro.mp3');

    this.game.physics.p2.setImpactEvents(true);

    this.game.physics.p2.createMaterial(MATERIALS.BULLET);
    this.game.physics.p2.createMaterial(MATERIALS.TARGET);
  }

  create() {
    this.game.state.start(STATES.TITLE);
    this.game.canvas.oncontextmenu = e => e.preventDefault(); // Disables right click
  }
}
