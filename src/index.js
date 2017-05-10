import 'pixi';
import 'p2';
import 'phaser';

import { STATES } from 'constants';
import levelData from 'levels';

import Boot from 'states/boot';
import Level from 'states/level';
import End from 'states/end';
import Title from 'states/title';

const config = {
  width: 960,
  height: 960 / 8 * 5, // Original CGA used 320 x 200, so aspect ratio is 8:5
  renderer: Phaser.AUTO,
  parent: '',
  state: null,
  transparent: false,
  antialias: false,
  physicsConfig: { arcade: true },
};

const game = new Phaser.Game(config);

game.state.add(STATES.BOOT, Boot);
game.state.add(STATES.TITLE, Title);
game.state.add(STATES.END, End);

levelData.forEach((level, index) => {
  const levelNum = index + 1;
  const state = new Level(levelNum, level);

  game.state.add(`LEVEL_0${levelNum}`, state);
});

game.state.start(STATES.BOOT);
