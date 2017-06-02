import { STATES } from 'constants';
import fp from 'lodash/fp';

import Background from 'objects/background';
import Player from 'objects/player';
import Target from 'objects/target';

export default class Level extends Phaser.State {
  constructor(number, data) {
    super();
    this.data = data;

    this.number = number;
  }

  create() {
    const { data, game } = this;

    const background = new Background(game);
    this.player = new Player(game);

    game.add.existing(background);
    game.add.existing(this.player);

    // Create groups - what are these for?
    this.targets = game.add.group();
    this.pickups = game.add.group();

    data.targets
      .map(positions => new Target(game, ...positions))
      .forEach(target => this.targets.add(target));
  };

  endGame() {
    const { state } = this.game;
    const nextLevelId = `LEVEL_0${this.number + 1}`;

    state.states[nextLevelId] ? state.start(nextLevelId) : state.start(STATES.END);
  }

  update() {
    // const collectPickup = (player, pickup) => {
    //   pickup.kill()
    //   this.endGame();
    // };

    // this.game.physics.arcade.overlap(this.player, this.pickups, collectPickup, null, this);
  }
}
