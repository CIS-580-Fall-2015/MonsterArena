/* Skully Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Skully spritesheet
  var SkullyWalkRight = new Image();
  SkullyWalkRight.src = './img/monsters/Skully/Skully-Walk-Right.png';

  // The left walking Skully spritesheet
  var SkullyWalkLeft = new Image();
  SkullyWalkLeft.src = "./img/monsters/Skully/Skully-Walk-Left.png";

  // The right attacking Skully spritesheet
  var SkullyAttackRight = new Image();
  SkullyAttackRight.src = "./img/monsters/Skully/Skully-Attack-Right.png";

  // The left attacking Skully spritesheet
  var SkullyAttackLeft = new Image();
  SkullyAttackLeft.src = "./img/monsters/Skully/Skully-Attack-Left.png";

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations.
  animations.right.push(new Animation(SkullyWalkRight, SIZE, SIZE, 0, 0, 4)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(SkullyAttackRight, SIZE, SIZE, 0, 0, 4)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(SkullyWalkLeft, SIZE, SIZE, 0, 0, 4)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(SkullyAttackLeft, SIZE, SIZE, 0, 0, 4)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());
