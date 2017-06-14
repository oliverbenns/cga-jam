import { ASSETS, COLLISION_GROUPS } from 'constants';
import { getCollisionGroup } from 'lib/utils';

export default class Enemy extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.ENEMY, 1);

    game.physics.p2.enable(this);

    this.body.setRectangle(44, 60);

    this.body.static = true;

    // Collision Group
    const bulletGroup = getCollisionGroup(game, COLLISION_GROUPS.BULLET);
    const enemyGroup = getCollisionGroup(game, COLLISION_GROUPS.ENEMY);

    this.body.setCollisionGroup(enemyGroup);
    this.body.collides(bulletGroup);
  }
}
