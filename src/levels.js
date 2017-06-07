const levels = [
  {
    targets: [
      [4, 1],
      [4, 10],
    ],
  },
  {
    targets: [
      [21, 3],
      [13, 7],
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
    x: 23,
    y: 11
  },
}));
