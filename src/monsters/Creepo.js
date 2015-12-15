/* Creepo Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Creepo spritesheet
  var CreepoWalkRight = new Image();
  CreepoWalkRight.src = './img/monsters/Creepo/Creepo-Walk-Right.png';

  // The left walking Creepo spritesheet
  var CreepoWalkLeft = new Image();
  CreepoWalkLeft.src = "./img/monsters/Creepo/Creepo-Walk-Left.png";

  // The right attacking Creepo spritesheet
  var CreepoAttackRight = new Image();
  CreepoAttackRight.src = "./img/monsters/Creepo/Creepo-Attack-Right.png";

  // The left attacking Creepo spritesheet
  var CreepoAttackLeft = new Image();
  CreepoAttackLeft.src = "./img/monsters/Creepo/Creepo-Attack-Left.png";

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations.
  animations.right.push(new Animation(CreepoWalkRight, SIZE, SIZE, 0, 0, 5)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(CreepoAttackRight, SIZE, SIZE, 0, 0, 6)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(CreepoWalkLeft, SIZE, SIZE, 0, 0, 5)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(CreepoAttackLeft, SIZE, SIZE, 0, 0, 6)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());
