import { CANVAS } from 'constants';

const levels = [
  {
    targets: [
      [4, 3],
      [4, 6],
    ],
  },
  {
    targets: [
      [5, 3],
      [5, 11],
    ],
  },
];

export default levels.map(level => ({
  ...level,
  player: level.player || {
    x: 0,
    y: 3
  },
  enemy: level.enemy || {
    x: CANVAS.CELL_COUNT_X - 1,
    y: 6
  },
}));
