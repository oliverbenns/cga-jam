import { ASSETS, COLLISION_GROUPS, MATERIALS } from 'constants';
import { getCollisionGroup, getMaterial } from 'lib/utils';

export default class Bullet extends Phaser.Sprite {
  constructor(game, x, y) {
    const { state, world } = game;
    const level = state.states[state.current];

    super(game, x, y, ASSETS.BULLET);

    this.particleBurst = this.particleBurst.bind(this);

    game.physics.p2.enable(this);

    this.body.setRectangle(4, 4);

    this.body.fixedRotation = true;
    game.debug.body(this);

    // Material
    const material = getMaterial(game, MATERIALS.BULLET);
    this.body.setMaterial(material);

    // Collision group
    const bulletGroup = getCollisionGroup(game, COLLISION_GROUPS.BULLET);
    const enemyGroup = getCollisionGroup(game, COLLISION_GROUPS.ENEMY);
    const playerGroup = getCollisionGroup(game, COLLISION_GROUPS.PLAYER);
    const targetGroup = getCollisionGroup(game, COLLISION_GROUPS.TARGET);
    const { boundsCollisionGroup } = this.game.physics.p2;

    this.body.setCollisionGroup(bulletGroup);

    this.emitter = game.add.emitter(0, 0, 100);
    this.emitter.makeParticles(ASSETS.PARTICLE);
    this.emitter.gravity = 0;

    if (targetGroup) {
      this.body.collides(targetGroup, () => {
        this.particleBurst();
        this.game.sound.play(ASSETS.SFX_RICHOCHET);
      });
    }

    if (boundsCollisionGroup) {
      this.body.collides(boundsCollisionGroup, () => {
        level.endGame('You hit a wall');
        this.game.sound.play(ASSETS.SFX_EXPLODE);
      });
    }

    if (enemyGroup) {
      this.body.collides(enemyGroup, () => {
        level.end();
        this.game.sound.play(ASSETS.SFX_SUCCESS);
    });
    }

    if (playerGroup) {
      this.body.collides(playerGroup, () => {
        level.endGame('You shot yourself');
        this.game.sound.play(ASSETS.SFX_EXPLODE);
      });
    }


    this.body.damping = 0;
    this.body.mass = 0.1;
  }

  particleBurst() {
    this.emitter.x = this.x;
    this.emitter.y = this.y;

    this.emitter.start(true, 600, null, 8);
  }
}

