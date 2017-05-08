import 'pixi';
import 'p2';
import 'phaser';

import { ASSETS, PALETTE } from 'constants';

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

  // The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();

  // We will enable physics for any object that is created in this group
  platforms.enableBody = true;

  // Here we create the ground.
  const ground = platforms.create(0, game.world.height - 20, ASSETS.PLATFORM);

  // Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.scale.setTo(2, 1);

  // This stops it from falling away when you jump on it
  ground.body.immovable = true;

  // Now let's create two ledges
  const leftPlatform = platforms.create(0, game.world.centerY, ASSETS.PLATFORM);
  leftPlatform.body.immovable = true;

  const rightPlatform = platforms.create(game.world.centerX, game.world.centerY * 1.5, ASSETS.PLATFORM);
  rightPlatform.body.immovable = true;

  //
  // PLAYER
  //

  // The player and its settings
  player = game.add.sprite(game.world.centerX - 10, game.world.centerY, ASSETS.PLAYER, 1);

  // We need to enable physics on the player
  game.physics.arcade.enable(player);

  // Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  // Our two animations, walking left and right.
  player.animations.add('left', [0, 1], 10, true);
  player.animations.add('right', [2, 1], 10, true);

  // Create cursors
  cursors = game.input.keyboard.createCursorKeys();
};


function update() {
  //
  // PLAYER MOVEMENT
  //

  const hitPlatform = game.physics.arcade.collide(player, platforms);

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

    player.frame = 4;
  }

  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
    player.body.velocity.y = -300;
  }
}
