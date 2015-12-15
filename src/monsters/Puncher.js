/* Puncher Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Puncher spritesheet
  var PuncherWalkRight = new Image();
  PuncherWalkRight.src = './img/monsters/Puncher/Puncher-Walk-Right.png';

  // The left walking Puncher spritesheet
  var PuncherWalkLeft = new Image();
  PuncherWalkLeft.src = "./img/monsters/Puncher/Puncher-Walk-Left.png";

  // The right attacking Puncher spritesheet
  var PuncherAttackRight = new Image();
  PuncherAttackRight.src = "./img/monsters/Puncher/Puncher-Attack-Right.png";

  // The left attacking Puncher spritesheet
  var PuncherAttackLeft = new Image();
  PuncherAttackLeft.src = "./img/monsters/Puncher/Puncher-Attack-Left.png";

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations.
  animations.right.push(new Animation(PuncherWalkRight, SIZE, SIZE, 0, 0, 8)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(PuncherAttackRight, SIZE, SIZE, 0, 0, 10)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(PuncherWalkLeft, SIZE, SIZE, 0, 0, 8)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(PuncherAttackLeft, SIZE, SIZE, 0, 0, 10)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());
