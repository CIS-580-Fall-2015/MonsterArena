/* Puncher Monster Entity.
 */
module.exports = (function() {
  var Monster = require('./monster.js'),
  Animation = require('./animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Puncher spritesheet
  var PuncherWalkRight = new Image();
  PuncherWalkRight.src = './img/monsters/Puncher_Walk_Right.png';

  // The left walking Puncher spritesheet
  var PuncherWalkLeft = new Image();
  PuncherWalkLeft.src = "./img/monsters/Puncher_Walk_Left.png";

  // The right attacking Puncher spritesheet
  var PuncherAttackRight = new Image();
  PuncherAttackRight.src = "./img/monsters/Puncher_Attack_Right.png";

  // The left attacking Puncher spritesheet
  var PuncherAttackLeft = new Image();
  PuncherAttackLeft.src = "./img/monsters/Puncher_Attack_Left.png";

  function Puncher()
  {
    // TODO Needs Proper Parameters and Assignment of Properties

    // The right-facing animations.
    this.animations.right[WALKING] = new Animation(PuncherWalkRight, SIZE, SIZE, 0, 0, 8); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(PuncherAttackRight, SIZE, SIZE, 0, 0, 10); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(PuncherWalkLeft, SIZE, SIZE, 0, 0, 8); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(PuncherAttackLeft, SIZE, SIZE, 0, 0, 10); // TODO Specific Timing may need to be adjusted.
  }

  // Inherits from Monster.
  Puncher.prototype = new Monster();

  // TODO Add other functions/methods.


  return Puncher;

}());
