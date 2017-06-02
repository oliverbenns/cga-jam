import { ASSETS, CANVAS } from 'constants';
import Block from 'objects/block';
import fp from 'lodash/fp';

import { cell } from 'grid';

// We are drawing multiple blocks here at times (in the canvas corners).
// This should be refactored to prevent this.
export default class Border extends Phaser.Group {
  constructor(game, blankPositions) {
    super(game);

    this.blankPositions = blankPositions;
    this.drawXLines();
    this.drawYLines();
  }


  addBlock(x, y) {
    const block = new Block(this.game, cell(x), cell(y));
    this.add(block);
  }

  isForbidden(x, y) {
    return this.blankPositions.some(pos => pos.x === x && pos.y === y);
  }

  drawXLines() {
    const yPositions = [0, CANVAS.CELL_COUNT_Y - 1];

    yPositions.forEach(y => {
      fp.times(x => {
        !this.isForbidden(x, y) ? this.addBlock(x, y) : null;
      })(CANVAS.CELL_COUNT_X);
    });
  }

  drawYLines() {
    const xPositions = [0, CANVAS.CELL_COUNT_X - 1];

    xPositions.forEach(x => {
      fp.times(y => {
        !this.isForbidden(x, y) ? this.addBlock(x, y) : null;
      })(CANVAS.CELL_COUNT_Y);
    });
  }
}


