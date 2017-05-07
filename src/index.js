import 'pixi';
import 'p2';
import 'phaser';

import { palette } from 'constants';

const game = new Phaser.Game(1024, 768, Phaser.AUTO, '', { create });

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

function create() {
  const primary = createPaletteSquares(palette.primary);
  const secondary = createPaletteSquares(palette.secondary, game.world.centerY);

  primary.concat(secondary).forEach(square => game.debug.geom(square.rect, square.hex));
};
