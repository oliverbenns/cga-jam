import { COLLISION_GROUPS, MATERIALS, STATES } from 'constants';
import fp from 'lodash/fp';

import Background from 'objects/background';
import Border from 'objects/border';
import Player from 'objects/player';
import Enemy from 'objects/enemy';
import Target from 'objects/target';
import { cell } from 'grid';
import { createCollisionGroup, getMaterial } from 'utils';

import Bullet from 'objects/bullet';

export default class Level extends Phaser.State {
  constructor(number, data) {
    super();
    this.data = data;

    this.number = number;
  }

  preload() {
    const bulletMaterial = getMaterial(this.game, MATERIALS.BULLET);
    const targetMaterial = getMaterial(this.game, MATERIALS.TARGET);

    // @TODO: Why can't I add this to states/boot preload?
    this.game.physics.p2.createContactMaterial(bulletMaterial, targetMaterial, {
      friction: 0.3,     // Friction to use in the contact of these two materials.
      restitution: 1,  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
      stiffness: 1e7,    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
      relaxation: 3,     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
      frictionStiffness: 1e7,    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
      frictionRelaxation: 3,     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
      surfaceVelocity: 0,        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.
    });

    // Docs say these params are true by default. But without these it doesn't work.
    this.game.physics.p2.setBoundsToWorld(true, true, true, true, true);

    createCollisionGroup(this.game, COLLISION_GROUPS.BULLET);
    createCollisionGroup(this.game, COLLISION_GROUPS.ENEMY);
    createCollisionGroup(this.game, COLLISION_GROUPS.PLAYER);
    createCollisionGroup(this.game, COLLISION_GROUPS.TARGET);
  }

  create() {
    const { data, game } = this;

    const background = new Background(game);
    game.add.existing(background);

    this.player = new Player(game, cell(data.player.x), cell(data.player.y));
    game.add.existing(this.player);

    this.enemy = new Enemy(game, cell(data.enemy.x), cell(data.enemy.y));
    game.add.existing(this.enemy);

    // Create groups - what are these for?
    this.targets = game.add.group();

    data.targets
      .map(positions => {
        const cellPositions = positions.map(cell);
        return new Target(game, ...cellPositions)
      })
      .forEach(target => this.targets.add(target));

    const border = new Border(game, [data.player, data.enemy]);
    game.add.existing(border);
  };

  endGame() {
    const { state } = this.game;
    const nextLevelId = `LEVEL_0${this.number + 1}`;

    state.states[nextLevelId] ? state.start(nextLevelId) : state.start(STATES.END);
  }

  update() {
    // this.game.physics.arcade.collide(this.player.bullet, this.targets);
    // const collectPickup = (player, pickup) => {
    //   pickup.kill()
    //   this.endGame();
    // };

    // this.game.physics.arcade.overlap(this.player, this.pickups, collectPickup, null, this);
  }
}
