/* Bosser Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite HEIGHT (One frame).
  const HEIGHT = 100;
  // The sprite WIDTH (One frame).
  const WIDTH = 86;

  // The movement sprite sheet for the bosser. It is simple, with walking and attacking being the same animation.
  var BosserMovement = new Image();
  BosserMovement.src = './img/monsters/Bosser/Bosser-Movement.png';
  var animations = {};

  // The right-facing animations. ALL OF THESE ANIMATIONS ARE THE SAME. IMPLEMENTED FOR THE SAKE OF CONSISTANCY.
  animations.right[WALKING] = new Animation(BosserMovement, WIDTH, HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
  animations.right[ATTACKING] = new Animation(BosserMovement, WIDTH, HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left[WALKING] = new Animation(BosserMovement, WIDTH, HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
  animations.left[ATTACKING] = new Animation(BosserMovement, WIDTH, HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.

  return animations;

}());
