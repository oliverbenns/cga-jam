import { CANVAS } from 'constants';

export const cell = val => {
  return val * CANVAS.CELL_SIZE;
};

export const outofRange = val => {
  return val * CANVAS.CELL_SIZE;
};
