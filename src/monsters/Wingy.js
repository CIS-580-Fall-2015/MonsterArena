/* Wingy Monster Entity.
 */
module.exports = (function() {
  var Monster = require('./monster.js'),
  Animation = require('./animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Wingy spritesheet
  var WingyWalkRight = new Image();
  WingyWalkRight.src = './img/monsters/Wingy_Walk_Right.png';

  // The left walking Wingy spritesheet
  var WingyWalkLeft = new Image();
  WingyWalkLeft.src = "./img/monsters/Wingy_Walk_Left.png";

  // The right attacking Wingy spritesheet
  var WingyAttackRight = new Image();
  WingyAttackRight.src = "./img/monsters/Wingy_Attack_Right.png";

  // The left attacking Wingy spritesheet
  var WingyAttackLeft = new Image();
  WingyAttackLeft.src = "./img/monsters/Wingy_Attack_Left.png";

  function Wingy()
  {
    // TODO Needs Proper Parameters and Assignment of Properties

    // The right-facing animations.
    this.animations.right[WALKING] = new Animation(WingyWalkRight, SIZE, SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(WingyAttackRight, SIZE, SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(WingyWalkLeft, SIZE, SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(WingyAttackLeft, SIZE, SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.
  }

  // Inherits from Monster.
  Wingy.prototype = new Monster();

  // TODO Add other functions/methods.


  return Wingy;

}());
