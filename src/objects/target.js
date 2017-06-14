import { ASSETS, COLLISION_GROUPS, MATERIALS } from 'constants';
import { getCollisionGroup, getMaterial } from 'lib/utils';
import fp from 'lodash/fp';

export default class Target extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.TARGET);

    game.physics.p2.enable(this);

    // Set random angle
    this.body.angle = fp.sample([45, 135]);
    this.body.clearShapes();

    this.body.setRectangle(60, 8);

    this.body.static = true;
    game.debug.body(this);

    // Input
    this.inputEnabled = true;
    this.events.onInputDown.add(this.listener, this);

    // Material
    const targetMaterial = getMaterial(game, MATERIALS.TARGET);
    this.body.setMaterial(targetMaterial);

    // Collision Group
    const targetGroup = getCollisionGroup(game, COLLISION_GROUPS.TARGET);
    const bulletGroup = getCollisionGroup(game, COLLISION_GROUPS.BULLET);

    this.body.setCollisionGroup(targetGroup);
    this.body.collides(bulletGroup);

    // Locking
    this.locked = false;
    this.lock = this.lock.bind(this);
  }

  listener (sprite, pointer) {
    if (pointer.button === Phaser.Mouse.LEFT_BUTTON && !this.locked) {
      this.body.angle += 90;
    }
  }

  lock() {
    this.locked = true;
    this.frame = 1;
  }
}
