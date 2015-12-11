/* Snappy Monster Entity.
 */
module.exports = (function() {
  var Monster = require('./monster.js'),
  Animation = require('./animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Snappy spritesheet
  var SnappyWalkRight = new Image();
  SnappyWalkRight.src = './img/monsters/Snappy/Snappy_Walk_Right.png';

  // The left walking Snappy spritesheet
  var SnappyWalkLeft = new Image();
  SnappyWalkLeft.src = "./img/monsters/Snappy/Snappy_Walk_Left.png";

  // The right attacking Snappy spritesheet
  var SnappyAttackRight = new Image();
  SnappyAttackRight.src = "./img/monsters/Snappy/Snappy_Attack_Right.png";

  // The left attacking Snappy spritesheet
  var SnappyAttackLeft = new Image();
  SnappyAttackLeft.src = "./img/monsters/Snappy/Snappy_Attack_Left.png";

  function Snappy()
  {
    // TODO Needs Proper Parameters and Assignment of Properties

    // The right-facing animations.
    this.animations.right[WALKING] = new Animation(SnappyWalkRight, SIZE, SIZE, 0, 0, 4); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(SnappyAttackRight, SIZE, SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(SnappyWalkLeft, SIZE, SIZE, 0, 0, 4); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(SnappyAttackLeft, SIZE, SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.
  }

  // Inherits from Monster.
  Snappy.prototype = new Monster();

  // TODO Add other functions/methods.


  return Snappy;

}());
