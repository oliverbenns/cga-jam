import { ASSETS, COLLISION_GROUPS, MATERIALS, PHYSICS } from 'constants';
import { getCollisionGroup, getMaterial } from 'lib/utils';
import fp from 'lodash/fp';

const possibleAngles = [45, 135, 225, 315];

export default class Target extends Phaser.Sprite {
  constructor(game, x, y) {
    const { world } = game;

    super(game, x, y, ASSETS.TARGET);

    game.physics.p2.enable(this, true);

    // Set random angle
    this.body.angle = fp.sample(possibleAngles);

    this.body.clearShapes();
    this.body.loadPolygon(PHYSICS, 'target');

    this.body.static = true;
    game.debug.body(this);

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
  }

  listener (sprite, pointer) {
    if (pointer.button === Phaser.Mouse.LEFT_BUTTON) {
      this.body.angle += 90;
    }
  }
}
