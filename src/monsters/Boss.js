/* Boss Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite HEIGHT (One frame).
  const HEIGHT = 98;
  // The sprite WIDTH (One frame).
  const WIDTH = 124;

  // The movement sprite sheet for the boss. It is simple, with walking and attacking being the same animation.
  var BossMovement = new Image();
  BossMovement.src = './img/monsters/Boss/Boss-Movement.png';
  var animations = {};

  // The right-facing animations. ALL OF THESE ANIMATIONS ARE THE SAME. IMPLEMENTED FOR THE SAKE OF CONSISTANCY.
  animations.right[WALKING] = new Animation(BossMovement, WIDTH, HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
  animations.right[ATTACKING] = new Animation(BossMovement, WIDTH, HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left[WALKING] = new Animation(BossMovement, WIDTH, HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
  animations.left[ATTACKING] = new Animation(BossMovement, WIDTH, HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.

  return animations;

}());
