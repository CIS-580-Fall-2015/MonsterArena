/* Snappy Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Snappy spritesheet
  var SnappyWalkRight = new Image();
  SnappyWalkRight.src = './img/monsters/Snappy/Snappy-Walk-Right.png';

  // The left walking Snappy spritesheet
  var SnappyWalkLeft = new Image();
  SnappyWalkLeft.src = "./img/monsters/Snappy/Snappy-Walk-Left.png";

  // The right attacking Snappy spritesheet
  var SnappyAttackRight = new Image();
  SnappyAttackRight.src = "./img/monsters/Snappy/Snappy-Attack-Right.png";

  // The left attacking Snappy spritesheet
  var SnappyAttackLeft = new Image();
  SnappyAttackLeft.src = "./img/monsters/Snappy/Snappy-Attack-Left.png";

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations.
  animations.right.push(new Animation(SnappyWalkRight, SIZE, SIZE, 0, 0, 4)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(SnappyAttackRight, SIZE, SIZE, 0, 0, 5)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(SnappyWalkLeft, SIZE, SIZE, 0, 0, 4)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(SnappyAttackLeft, SIZE, SIZE, 0, 0, 5)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());
