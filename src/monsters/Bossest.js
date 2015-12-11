/* Bossest Monster Entity.
 */
module.exports = (function() {
  var Monster = require('./monster.js'),
  Animation = require('./animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite HEIGHT (One frame).
  const HEIGHT = 100;
  // The sprite WIDTH (One frame).
  const WIDTH = 116;

  // The movement sprite sheet for the Bossest. It is simple, with walking and attacking being the same animation.
  var BossestMovement = new Image();
  BossestMovement.src = './img/monsters/Bossest/Bossest-Movement.png';

  function Bossest()
  {
    // TODO Needs Proper Parameters and Assignment of Properties

    // The right-facing animations. ALL OF THESE ANIMATIONS ARE THE SAME. IMPLEMENTED FOR THE SAKE OF CONSISTANCY.
    this.animations.right[WALKING] = new Animation(BossestMovement, WIDTH, HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(BossestMovement, WIDTH, HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(BossestMovement, WIDTH, HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(BossestMovement, WIDTH, HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
  }

  // Inherits from Monster.
  Bossest.prototype = new Monster();

  // TODO Add other functions/methods.


  return Bossest;

}());
