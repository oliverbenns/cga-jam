import { PALETTE } from 'constants';

export default class Timer extends Phaser.Text {
  constructor(game, x, y, seconds) {
    super(game, x, y, seconds, { font: '15px Pixeled', fill: PALETTE.PRIMARY.LIGHT_CYAN })

    this.anchor.setTo(0.5, 0.5);
    this.complete = false;

    this.timer = game.time.create(false);

    const ms = seconds * 1000;
    this.timer.add(ms, () => this.complete = true, this);

    this.timer.start();
  }

  update() {
    const { state } = this.game;
    const level = state.states[state.current];

    // I think this is bad for performance.
    this.setText((this.timer.duration / 1000).toFixed(1));

    if (this.complete) {
      level.endGame();
    }
  }
}
