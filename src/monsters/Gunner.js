/* Gunner Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Gunner spritesheet
  var GunnerWalkRight = new Image();
  GunnerWalkRight.src = './img/monsters/Gunner/Gunner-Walk-Right.png';

  // The left walking Gunner spritesheet
  var GunnerWalkLeft = new Image();
  GunnerWalkLeft.src = "./img/monsters/Gunner/Gunner-Walk-Left.png";

  // The right attacking Gunner spritesheet
  var GunnerAttackRight = new Image();
  GunnerAttackRight.src = "./img/monsters/Gunner/Gunner-Attack-Right.png";

  // The left attacking Gunner spritesheet
  var GunnerAttackLeft = new Image();
  GunnerAttackLeft.src = "./img/monsters/Gunner/Gunner-Attack-Left.png";

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations.
  animations.right.push(new Animation(GunnerWalkRight, SIZE, SIZE, 0, 0, 8)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(GunnerAttackRight, SIZE, SIZE, 0, 0, 8)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(GunnerWalkLeft, SIZE, SIZE, 0, 0, 8)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(GunnerAttackLeft, SIZE, SIZE, 0, 0, 8)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());
