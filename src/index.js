import 'pixi';
import 'p2';
import 'phaser';

import { CANVAS, STATES } from 'constants';
import levelData from 'config/levels';

import Boot from 'states/boot';
import Level from 'states/level';
import End from 'states/end';
import Title from 'states/title';

const config = {
  width: CANVAS.WIDTH,
  height: CANVAS.HEIGHT,
  renderer: Phaser.AUTO,
  parent: '',
  state: null,
  transparent: false,
  antialias: false,
  physicsConfig: { p2: true },
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
