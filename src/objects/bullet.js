import { ASSETS, COLLISION_GROUPS, MATERIALS, PHYSICS } from 'constants';
import { getCollisionGroup, getMaterial } from 'lib/utils';

export default class Bullet extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.BULLET);

    game.physics.p2.enable(this, true);

    this.body.setCircle(6);

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
    this.body.collides(targetGroup, () => {
      console.log('Collided with a target woop woop')
    });

    this.body.collides(boundsCollisionGroup, () => {
      console.log('Collided with a bounds')
    });

    this.body.collides(enemyGroup, () => {
      console.log('Collided with enemy - END LEVEL.')
    });

    this.body.collides(playerGroup, () => {
      console.log('Collided with player - END GAME.')
    });
  }
}

