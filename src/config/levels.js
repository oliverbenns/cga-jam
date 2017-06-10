const levels = [
  {
    targets: [
      [4, 3],
      [4, 11],
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
    x: 23,
    y: 11
  },
}));
