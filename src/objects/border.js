import { ASSETS, CANVAS } from 'constants';
import Block from 'objects/block';
import fp from 'lodash/fp';

import { cell } from 'grid';

// We are drawing multiple blocks here at times (in the canvas corners).
// This should be refactored to prevent this.
export default class Border extends Phaser.Group {
  constructor(game) {
    super(game);

    this.drawXLines();
    this.drawYLines();
  }


  addBlock(x, y) {
    const block = new Block(this.game, x, y);
    this.add(block);
  }

  drawXLines() {
    const yPositions = [cell(0), cell(CANVAS.CELL_COUNT_Y - 1)];

    yPositions.forEach(y => {
      fp.times(x => {
        this.addBlock(cell(x), y);
      })(CANVAS.CELL_COUNT_X);
    });
  }

  drawYLines() {
    const xPositions = [cell(0), cell(CANVAS.CELL_COUNT_X - 1)];

    xPositions.forEach(x => {
      fp.times(y => {
        this.addBlock(x, cell(y));
      })(CANVAS.CELL_COUNT_Y);
    });
  }
}


