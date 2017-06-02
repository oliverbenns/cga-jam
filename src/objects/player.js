// import Platform from 'objects/platform';
import { ASSETS } from 'constants';

export default class Player extends Phaser.Sprite {
  constructor(game) {
    const { world } = game;

    super(game, world.centerX + 50, world.centerY, ASSETS.PLAYER, 1);

    game.physics.arcade.enable(this);

    this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;

    this.animations.add('left', [0, 1], 10, true);
    this.animations.add('right', [2, 1], 10, true);
    this.anchor.setTo(.5,.5); // To allow for flipping on movement
    this.cursors = game.input.keyboard.createCursorKeys();
    this.hitPlatform = null;
  }

  updateMovement() {
    const { left, right, up } = this.cursors;

    // Reset player velocity

    if (left.isDown) {
      this.body.velocity.x = -150;
      this.scale.x = -1;
      this.animations.play('left');
    } else if (right.isDown) {
      this.body.velocity.x = 150;
      this.scale.x = 1;
      this.animations.play('right');
    } else {
      this.body.velocity.x = 0;
      this.animations.stop();
      this.frame = 1;
    }

    // Add jump seperately so that player can both jump and move.
    if (up.isDown && this.body.touching.down && this.hitPlatform) {
      this.body.velocity.y = -300;
    }
  }

  update() {
    // @TODO: this is bad. How about a recursive getAllByInstance on the game obj?
    // Does this also need to be called on every update? Is this expensive?
    // const platforms = this.game.world.children.find(child => child instanceof Phaser.Group && child.children[0] instanceof Platform);

    // this.hitPlatform = this.game.physics.arcade.collide(this, platforms);

    this.updateMovement();
  }
}
