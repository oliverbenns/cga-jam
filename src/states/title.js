import { ASSETS, CANVAS, COLLISION_GROUPS, MATERIALS, STATES } from 'constants';
import { getMaterial, createCollisionGroup } from 'lib/utils';
import { bounce } from 'config/materials';
import fp from 'lodash/fp';

import Button from 'objects/button';
import Bullet from 'objects/bullet';
import Heading from 'objects/heading';

export default class Title extends Phaser.State {
  preload() {
    // @TODO: Lots of duplicate code here.
    const bulletMaterial = getMaterial(this.game, MATERIALS.BULLET);
    const targetMaterial = getMaterial(this.game, MATERIALS.TARGET);

    this.game.physics.p2.createContactMaterial(bulletMaterial, targetMaterial, bounce);

    // Docs say these params are true by default. But without these it doesn't work.
    this.game.physics.p2.setBoundsToWorld(true, true, true, true, true);

    this.game.physics.p2.setWorldMaterial(targetMaterial, true, true, true, true);

    createCollisionGroup(this.game, COLLISION_GROUPS.BULLET);
  }

  create() {
    const { game } = this;
    this.createBullet = this.createBullet.bind(this);

    const bullets = fp.times(this.createBullet)(15);

    const objects = [
      new Heading(game, 'CGA Richochet'),
      new Button(game, () => this.handleClick(), 'Start game'),
      ...bullets,
    ];

    objects.forEach(game.add.existing, this);
  }

  handleClick() {
    this.game.state.start('LEVEL_01');
  }

  createBullet() {
    const x = fp.random(0, CANVAS.WIDTH);
    const y = fp.random(0, CANVAS.HEIGHT);

    const bullet = new Bullet(this.game, x , y);

    bullet.body.velocity.x = fp.random(300, 500) * (fp.random(0, 1) ? 1 : -1);
    bullet.body.velocity.y = fp.random(300, 500) * (fp.random(0, 1) ? 1 : -1);

    return bullet;
  }
}
