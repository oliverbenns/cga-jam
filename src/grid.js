import { CANVAS } from 'constants';

export const cell = val => {
  return val * CANVAS.CELL_SIZE + CANVAS.CELL_SIZE / 2;
};
