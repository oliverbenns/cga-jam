import { ASSETS, COLLISION_GROUPS, MATERIALS, PHYSICS } from 'constants';
import { getCollisionGroup, getMaterial } from 'lib/utils';

export default class Bullet extends Phaser.Sprite {
  constructor(game, x, y) {
    const { state, world } = game;
    const level = state.states[state.current];

    super(game, x, y, ASSETS.BULLET);

    game.physics.p2.enable(this, true);

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

    if (targetGroup) {
      this.body.collides(targetGroup, () => {
        console.log('Collided with a target woop woop')
      });
    }

    if (boundsCollisionGroup) {
      this.body.collides(boundsCollisionGroup, level.endGame);
    }

    if (enemyGroup) {
      this.body.collides(enemyGroup, level.end);
    }

    if (playerGroup) {
      this.body.collides(playerGroup, level.endGame);
    }
  }
}

