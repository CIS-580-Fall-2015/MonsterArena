/* Skully Monster Entity.
 */
module.exports = (function() {
  var Monster = require('./monster.js'),
  Animation = require('./animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Skully spritesheet
  var SkullyWalkRight = new Image();
  SkullyWalkRight.src = './img/monsters/Skully/Skully_Walk_Right.png';

  // The left walking Skully spritesheet
  var SkullyWalkLeft = new Image();
  SkullyWalkLeft.src = "./img/monsters/Skully/Skully_Walk_Left.png";

  // The right attacking Skully spritesheet
  var SkullyAttackRight = new Image();
  SkullyAttackRight.src = "./img/monsters/Skully/Skully_Attack_Right.png";

  // The left attacking Skully spritesheet
  var SkullyAttackLeft = new Image();
  SkullyAttackLeft.src = "./img/monsters/Skully/Skully_Attack_Left.png";

  function Skully()
  {
    // TODO Needs Proper Parameters and Assignment of Properties

    // The right-facing animations.
    this.animations.right[WALKING] = new Animation(SkullyWalkRight, SIZE, SIZE, 0, 0, 4); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(SkullyAttackRight, SIZE, SIZE, 0, 0, 4); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(SkullyWalkLeft, SIZE, SIZE, 0, 0, 4); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(SkullyAttackLeft, SIZE, SIZE, 0, 0, 4); // TODO Specific Timing may need to be adjusted.
  }

  // Inherits from Monster.
  Skully.prototype = new Monster();

  // TODO Add other functions/methods.


  return Skully;

}());
