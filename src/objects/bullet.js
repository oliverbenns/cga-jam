import { ASSETS, COLLISION_GROUPS, MATERIALS, PHYSICS } from 'constants';
import { getCollisionGroup, getMaterial } from 'utils';

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
    const targetGroup = getCollisionGroup(game, COLLISION_GROUPS.TARGET);

    this.body.setCollisionGroup(bulletGroup);
    this.body.collides(targetGroup, () => {
      console.log('Collided with a target woop woop')
    });
  }
}

