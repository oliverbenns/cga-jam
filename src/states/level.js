import { STATES } from 'constants';
import fp from 'lodash/fp';
import Player from 'objects/player';
import Pickup from 'objects/pickup';
import Platform from 'objects/platform';
import Floor from 'objects/floor';
import Background from 'objects/background';

export default class Level extends Phaser.State {
  constructor(number, data) {
    super();
    this.data = data;

    this.createPickup = this.createPickup.bind(this);
    this.number = number;
  }

  create() {
    const { data, game } = this;

    const background = new Background(game);
    const floor = new Floor(game);
    this.player = new Player(game);

    game.add.existing(background);
    game.add.existing(this.player);

    // Create groups - what are these for?
    this.platforms = game.add.group();
    this.pickups = game.add.group();

    this.platforms.add(floor);

    // No need for .call on constructor with Spread operator.
    // http://stackoverflow.com/a/32548260
    data.platforms
      .map(positions => new Platform(...[game, ...positions]))
      .forEach(platform => this.platforms.add(platform));

    // @NOTE: This is not using fp.forEach. For some reason
    // it's not capped https://github.com/lodash/lodash/issues/2316
    fp.times(this.createPickup)(data.pickupCount)
      .forEach(pickup => this.pickups.add(pickup));
  };

   createPickup(index) {
    const column = this.game.world.width / this.data.pickupCount;
    const pickup = new Pickup(this.game);
    pickup.x = column * (index + 1) - column / 2 - pickup.body.halfWidth;

    return pickup;
  }

  endGame() {
    const { state } = this.game;
    const nextLevelId = `LEVEL_0${this.number + 1}`;

    state.states[nextLevelId] ? state.start(nextLevelId) : state.start(STATES.END);
  }

  update() {
    this.game.physics.arcade.collide(this.pickups, this.platforms);

    const collectPickup = (player, pickup) => {
      pickup.kill()
      this.endGame();
    };

    this.game.physics.arcade.overlap(this.player, this.pickups, collectPickup, null, this);
  }
}
