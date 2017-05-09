import { STATES } from 'constants';

export default class Title extends Phaser.State {
  init() {
    console.log('No title screen right now. So starting game...')
    this.game.state.start(STATES.PLAY);
  }
}
