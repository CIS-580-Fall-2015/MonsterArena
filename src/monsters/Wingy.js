/* Wingy Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Wingy spritesheet
  var WingyWalkRight = new Image();
  WingyWalkRight.src = './img/monsters/Wingy/Wingy-Walk-Right.png';

  // The left walking Wingy spritesheet
  var WingyWalkLeft = new Image();
  WingyWalkLeft.src = "./img/monsters/Wingy/Wingy-Walk-Left.png";

  // The right attacking Wingy spritesheet
  var WingyAttackRight = new Image();
  WingyAttackRight.src = "./img/monsters/Wingy/Wingy-Attack-Right.png";

  // The left attacking Wingy spritesheet
  var WingyAttackLeft = new Image();
  WingyAttackLeft.src = "./img/monsters/Wingy/Wingy-Attack-Left.png";

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations.
  animations.right.push(new Animation(WingyWalkRight, SIZE, SIZE, 0, 0, 5)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(WingyAttackRight, SIZE, SIZE, 0, 0, 5)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(WingyWalkLeft, SIZE, SIZE, 0, 0, 5)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(WingyAttackLeft, SIZE, SIZE, 0, 0, 5)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());
