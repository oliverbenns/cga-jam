import { COLLISION_GROUPS, MATERIALS, STATES } from 'constants';
import fp from 'lodash/fp';

import Background from 'objects/background';
import Block from 'objects/block';
import Border from 'objects/border';
import Player from 'objects/player';
import Enemy from 'objects/enemy';
import Target from 'objects/target';
import { cell } from 'lib/grid';
import { createCollisionGroup, getMaterial } from 'lib/utils';
import { bounce } from 'config/materials';

import Bullet from 'objects/bullet';

export default class Level extends Phaser.State {
  constructor(number, data) {
    super();
    this.data = data;

    this.number = number;
    this.end = this.end.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  preload() {
    const bulletMaterial = getMaterial(this.game, MATERIALS.BULLET);
    const targetMaterial = getMaterial(this.game, MATERIALS.TARGET);

    // @TODO: Why can't I add this to states/boot preload?
    this.game.physics.p2.createContactMaterial(bulletMaterial, targetMaterial, bounce);

    // Docs say these params are true by default. But without these it doesn't work.
    this.game.physics.p2.setBoundsToWorld(true, true, true, true, true);

    createCollisionGroup(this.game, COLLISION_GROUPS.BULLET);
    createCollisionGroup(this.game, COLLISION_GROUPS.ENEMY);
    createCollisionGroup(this.game, COLLISION_GROUPS.PLAYER);
    createCollisionGroup(this.game, COLLISION_GROUPS.TARGET);
  }

  create() {
    const { data, game } = this;

    const background = new Background(game);
    game.add.existing(background);

    this.player = new Player(game, cell(data.player.x), cell(data.player.y));
    game.add.existing(this.player);

    this.enemy = new Enemy(game, cell(data.enemy.x), cell(data.enemy.y));
    game.add.existing(this.enemy);

    // Create groups - what are these for?
    this.targets = game.add.group();
    this.blocks = game.add.group();

    data.targets
      .map(positions => {
        const cellPositions = positions.map(cell);
        return new Target(game, ...cellPositions)
      })
      .forEach(target => this.targets.add(target));
    data.blocks
      .map(positions => {
        const cellPositions = positions.map(cell);
        return new Block(game, ...cellPositions)
      })
      .forEach(target => this.targets.add(target));

    const border = new Border(game, [data.player, data.enemy]);
    game.add.existing(border);

    console.log('this.game', this.game);
  };

  end() {
    const { state } = this.game;
    const nextLevelId = `LEVEL_0${this.number + 1}`;

    state.states[nextLevelId] ? state.start(nextLevelId) : this.endGame();
  }

  endGame() {
    const { state } = this.game;

    state.start(STATES.END)
  }
}
