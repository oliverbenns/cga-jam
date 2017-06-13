import { ASSETS, PALETTE } from 'constants';
import fp from 'lodash/fp';

export default class Timer extends Phaser.Text {
  constructor(game, x, y, seconds) {
    super(game, x, y, seconds, { font: '15px Pixeled', fill: PALETTE.PRIMARY.WHITE })
    this.total = seconds;
    this.anchor.setTo(0.5, 0.5);
    this.complete = false;

    this.timer = this.game.time.create(false);

    // this.tick = game.time.now;

    const ms = this.total * 1000;
    this.timer.add(ms, () => this.complete = true);
    fp.times((index) => {
      const time = ms - (index + 1) * 1000;

      this.timer.add(time, () => this.game.sound.play(ASSETS.SFX_COUNTDOWN));
    })(3);

    this.timer.start();
  }

  update() {
    const { state } = this.game;
    const level = state.states[state.current];

    const displayText = (this.total - this.timer.seconds).toFixed(1);
    // I think this is bad for performance.
    this.setText(displayText);

    if (this.complete) {
      level.endGame('You ran out of time');
    }
  }
}
