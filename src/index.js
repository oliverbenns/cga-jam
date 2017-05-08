import 'pixi';
import 'p2';
import 'phaser';

import { ASSETS, PALETTE } from 'constants';
import fp from 'lodash/fp';
import Player from 'objects/player';
import Pickup from 'objects/pickup';
import Platform from 'objects/platform';
import Floor from 'objects/floor';

// Original CGA used 320 x 200, so aspect ratio is 8:5
const game = new Phaser.Game(960, 600, Phaser.AUTO, '', { create, preload, update });

const createPaletteSquares = (palette, y = 0) => {
  const height = game.height * 0.5;
  const width = game.width * 0.25;

  return Object
    .values(palette)
    .map((hex, index) => ({
      hex,
      rect: new Phaser.Rectangle(index * width, y, width, height),
    }))
};

function preload() {
  game.load.image(ASSETS.BACKGROUND, 'assets/img/background.png');
  game.load.image(ASSETS.PLATFORM, 'assets/img/platform.png');
  game.load.image(ASSETS.PICKUP, 'assets/img/pickup.png');
  game.load.spritesheet(ASSETS.PLAYER, 'assets/img/player.png', 20, 32);
}

let platforms;
let player;
let cursors;
let pickups;

function create() {
  const primary = createPaletteSquares(PALETTE.PRIMARY);
  const secondary = createPaletteSquares(PALETTE.SECONDARY, game.world.centerY);

  // primary.concat(secondary).forEach(square => game.debug.geom(square.rect, square.hex));

  //
  // GAME WORLD
  //

  // We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // A simple background for our game
  game.add.sprite(0, 0, ASSETS.BACKGROUND);

  // Create groups - what are these for?
  platforms = game.add.group();
  pickups = game.add.group();


  const floor = new Floor(game);
  platforms.add(floor);

  // This stops it from falling away when you jump on it
  // ground.body.immovable = true;

  const platformData = [
    [0, game.world.centerY],
    [game.world.centerX, game.world.centerY * 1.5]
  ];

  // No need for .call on constructor with Spread operator.
  // http://stackoverflow.com/a/32548260
  platformData
    .map(positions => new Platform(...[game, ...positions]))
    .forEach(platform => platforms.add(platform));

  //
  // PLAYER
  //

  player = new Player(game);

  game.add.existing(player);

  // Create cursors
  cursors = game.input.keyboard.createCursorKeys();

  //
  // PICKUPS
  //

  const pickupCount = 10;

  const createPickup = index => {
    const column = game.world.width / pickupCount;
    const pickup = new Pickup(game);

    pickup.x = column * (index + 1) - column / 2 - pickup.body.halfWidth;

    return pickup;
  };

  // @NOTE: This is not using fp.forEach. For some reason
  // it's not capped https://github.com/lodash/lodash/issues/2316
  fp.times(createPickup)(pickupCount)
    .forEach(pickup => pickups.add(pickup));
};


function update() {
  //
  // PLAYER MOVEMENT
  //

  const hitPlatform = game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(pickups, platforms);

  const collectPickup = (player, star) => star.kill();

  game.physics.arcade.overlap(player, pickups, collectPickup, null, this);

  // Reset the players velocity (movement)
  player.body.velocity.x = 0;
  // Centre anchor to allow for flipping
  player.anchor.setTo(.5,.5);

  if (cursors.left.isDown) {
    // Move to the left
    player.body.velocity.x = -150;
    player.scale.x = -1;
    player.animations.play('left');

  } else if (cursors.right.isDown) {
    // Move to the right
    player.body.velocity.x = 150;
    player.scale.x = 1;

    player.animations.play('right');
  } else {
    // Stand still
    player.animations.stop();

    player.frame = 1;
  }

  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
    player.body.velocity.y = -300;
  }
}
