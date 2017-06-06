import { STATES } from 'constants';
import fp from 'lodash/fp';

import Background from 'objects/background';
import Border from 'objects/border';
import Player from 'objects/player';
import Target from 'objects/target';
import { cell } from 'grid';

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
