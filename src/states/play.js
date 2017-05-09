import { ASSETS, STATES, PALETTE } from 'constants';
import fp from 'lodash/fp';
import Player from 'objects/player';
import Pickup from 'objects/pickup';
import Platform from 'objects/platform';
import Floor from 'objects/floor';
import Background from 'objects/background';

let platforms;
let player;
let pickups;
const pickupCount = 10;

export default class Play extends Phaser.State {
  constructor() {
    super();
    this.createPickup = this.createPickup.bind(this);
  }

  create() {
    const background = new Background(this.game);
    const floor = new Floor(this.game);
    player = new Player(this.game);

    this.game.add.existing(background);
    this.game.add.existing(player);

    // Create groups - what are these for?
    platforms = this.game.add.group();
    pickups = this.game.add.group();

    platforms.add(floor);

    const platformData = [
      [0, this.game.world.centerY],
      [this.game.world.centerX, this.game.world.centerY * 1.5]
    ];

    // No need for .call on constructor with Spread operator.
    // http://stackoverflow.com/a/32548260
    platformData
      .map(positions => new Platform(...[this.game, ...positions]))
      .forEach(platform => platforms.add(platform));

    // @NOTE: This is not using fp.forEach. For some reason
    // it's not capped https://github.com/lodash/lodash/issues/2316
    fp.times(this.createPickup)(pickupCount)
      .forEach(pickup => pickups.add(pickup));
  };

  createPickup(index) {
    const column = this.game.world.width / pickupCount;
    const pickup = new Pickup(this.game);

    pickup.x = column * (index + 1) - column / 2 - pickup.body.halfWidth;

    return pickup;
  }

  update() {
    this.game.physics.arcade.collide(pickups, platforms);

    const collectPickup = (player, pickup) => pickup.kill();

    this.game.physics.arcade.overlap(player, pickups, collectPickup, null, this);
  }
}
