import { MATERIALS, STATES } from 'constants';
import fp from 'lodash/fp';

import Background from 'objects/background';
import Border from 'objects/border';
import Player from 'objects/player';
import Target from 'objects/target';
import { cell } from 'grid';
import { getMaterial } from 'utils';

import Bullet from 'objects/bullet';
export default class Level extends Phaser.State {
  constructor(number, data) {
    super();
    this.data = data;

    this.number = number;
  }

  create() {
    const { data, game } = this;

    const playerPosition = {
      x: 0,
      y: 1,
    };

    const background = new Background(game);
    game.add.existing(background);

    this.player = new Player(game, cell(playerPosition.x), cell(playerPosition.y));
    game.add.existing(this.player);

    // Create groups - what are these for?
    this.targets = game.add.group();
    this.pickups = game.add.group();

    data.targets
      .map(positions => {
        const cellPositions = positions.map(cell);
        return new Target(game, ...cellPositions)
      })
      .forEach(target => this.targets.add(target));

    const border = new Border(game, [playerPosition]);
    game.add.existing(border);

    const bulletMaterial = getMaterial(game, MATERIALS.BULLET);
    const targetMaterial = getMaterial(game, MATERIALS.TARGET);

    //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
    //  those 2 materials collide it uses the following settings.
    //  A single material can be used by as many different sprites as you like.
    var contactMaterial = game.physics.p2.createContactMaterial(bulletMaterial, targetMaterial);

    contactMaterial.friction = 1;     // Friction to use in the contact of these two materials.
    contactMaterial.restitution = 1.0;  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
    contactMaterial.stiffness = 1e7;    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
    contactMaterial.relaxation = 3;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
    contactMaterial.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
    contactMaterial.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
    contactMaterial.surfaceVelocity = 0;        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.
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
