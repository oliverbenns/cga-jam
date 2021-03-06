import { CANVAS } from 'constants';

const levels = [
  {
    timeLimit: 5,
    targets: [
      [7, 3],
      [7, 6],
    ],
  },
  {
    timeLimit: 5,
    targets: [
      [2, 3],
      [2, 6],
      [7, 6],
      [7, 3],
      [13, 3],
      [13, 6],
    ],
  },
  {
    timeLimit: 10,
    targets: [
      [4, 3],
      [4, 6],
      [5, 5],
      [5, 6],
      [6, 5],
      [6, 6],
      [7, 5],
      [7, 6],
      [8, 5],
      [8, 6],
      [9, 5],
      [9, 6],
      [10, 5],
      [10, 6],
    ],
  },
  {
    timeLimit: 5,
    targets: [
      [7, 3],
      [7, 6],
      [2, 6],
      [2, 8],
      [13, 8],
      [13, 6],
    ],
    blocks: [
      [11, 6]
    ],
  },
  {
    timeLimit: 5,
    targets: [
      [2, 3],
      [2, 7],
      [13, 7],
      [13, 2],
      [9, 2],
      [9, 6],
    ],
    blocks: [
      [10, 3],
      [11, 3],
      [12, 3],
      [10, 4],
      [11, 4],
      [12, 4],
      [10, 5],
      [11, 5],
      [12, 5],
    ],
  },
  {
    timeLimit: 7,
    targets: [
      [12, 3],
      [12, 1],
      [3, 1],
      [3, 2],
      [9, 2],
      [9, 6],
    ],
  },
  {
    timeLimit: 7,
    targets: [
      [4, 3],
      [4, 6],
      [7, 6],
      [7, 8],
      [11, 8],
      [11, 6],
      [11, 3],
    ],
    blocks: [
      [7, 3],
      [9, 6],
    ],
  },
  {
    timeLimit: 6,
    targets: [
      [10, 3],
      [10, 7],
      [8, 7],
      [8, 2],
      [4, 2],
      [4, 6],
    ],
    blocks: [
      [5, 4],
      [6, 4],
      [7, 4],
      [9, 4],
      [11, 4],
      [12, 4],
    ],
  },
  {
    timeLimit: 6,
    targets: [
      [2, 3],
      [2, 8],
      [11, 8],
      [11, 3],
      [5, 3],
      [5, 6],
    ],
    blocks: [
      [7, 1],
      [7, 2],
      [7, 4],
      [7, 5],
      [7, 7],
    ],
  },
  {
    timeLimit: 6,
    targets: [
      [2, 3],
      [2, 7],
      [13, 7],
      [13, 2],
      [3, 2],
      [3, 6],
    ],
    blocks: [
      [7, 1],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 8],
      [4, 1],
      [4, 4],
      [5, 4],
      [6, 4],
      [8, 4],
      [9, 4],
      [10, 4],
      [11, 4],
      [12, 4],
      [14, 4],
    ],
  },
  {
    timeLimit: 10,
    targets: [
      [2, 1],
      [2, 3],
      [14, 1],
      [14, 8],
      [3, 8],
      [3, 2],
      [13, 2],
      [13, 7],
      [4, 7],
      [4, 3],
      [12, 3],
      [12, 6],
    ],
  },
  {
    timeLimit: 6,
    targets: [
      [2, 3],
      [2, 8],
      [6, 8],
      [6, 1],
      [10, 1],
      [10, 8],
      [14, 8],
      [14, 6],
    ],
    blocks: [
      // C
      [3, 3],
      [4, 3],
      [5, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [4, 6],
      [5, 6],

      // G
      [7, 3],
      [8, 3],
      [9, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [8, 6],
      [9, 6],
      [9, 5],

      // A
      [11, 3],
      [12, 3],
      [13, 3],
      [11, 4],
      [13, 4],
      [11, 5],
      [12, 5],
      [13, 5],
      [11, 6],
      [13, 6],
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
  blocks: level.blocks || [],
}));
