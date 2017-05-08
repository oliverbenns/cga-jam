import 'pixi';
import 'p2';
import 'phaser';

import { PALETTE } from 'constants';

// Original CGA used 320 x 200, so aspect ratio is 8:5
const game = new Phaser.Game(960, 600, Phaser.AUTO, '', { create });

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
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
  const primary = createPaletteSquares(PALETTE.PRIMARY);
  const secondary = createPaletteSquares(PALETTE.SECONDARY, game.world.centerY);

  primary.concat(secondary).forEach(square => game.debug.geom(square.rect, square.hex));
};
