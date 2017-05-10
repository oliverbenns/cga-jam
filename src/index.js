import 'pixi';
import 'p2';
import 'phaser';

import { STATES } from 'constants';

import Boot from 'states/boot';
import Play from 'states/play';
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
game.state.add(STATES.PLAY, Play);
game.state.add(STATES.END, End);

game.state.start(STATES.BOOT);
