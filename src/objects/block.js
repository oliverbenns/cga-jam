import { ASSETS, COLLISION_GROUPS } from 'constants';
import { getCollisionGroup } from 'lib/utils';

export default class Block extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.BLOCK);

    game.physics.p2.enable(this, true);
    this.body.setRectangleFromSprite(this);
    this.body.static = true;

    game.debug.body(this);

    // Collision Group
    const bulletGroup = getCollisionGroup(game, COLLISION_GROUPS.BULLET);
    const { boundsCollisionGroup } = this.game.physics.p2;

    this.body.setCollisionGroup(boundsCollisionGroup);
    this.body.collides(bulletGroup);
  }
}
