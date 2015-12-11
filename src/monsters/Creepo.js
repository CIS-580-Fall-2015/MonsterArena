/* Creepo Monster Entity.
 */
module.exports = (function() {
  var Monster = require('./monster.js'),
  Animation = require('./animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Creepo spritesheet
  var CreepoWalkRight = new Image();
  CreepoWalkRight.src = './img/monsters/Creepo/Creepo_Walk_Right.png';

  // The left walking Creepo spritesheet
  var CreepoWalkLeft = new Image();
  CreepoWalkLeft.src = "./img/monsters/Creepo/Creepo_Walk_Left.png";

  // The right attacking Creepo spritesheet
  var CreepoAttackRight = new Image();
  CreepoAttackRight.src = "./img/monsters/Creepo/Creepo_Attack_Right.png";

  // The left attacking Creepo spritesheet
  var CreepoAttackLeft = new Image();
  CreepoAttackLeft.src = "./img/monsters/Creepo/Creepo_Attack_Left.png";

  function Creepo()
  {
    // TODO Needs Proper Parameters and Assignment of Properties

    // The right-facing animations.
    this.animations.right[WALKING] = new Animation(CreepoWalkRight, SIZE, SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(CreepoAttackRight, SIZE, SIZE, 0, 0, 6); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(CreepoWalkLeft, SIZE, SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(CreepoAttackLeft, SIZE, SIZE, 0, 0, 6); // TODO Specific Timing may need to be adjusted.
  }

  // Inherits from Monster.
  Creepo.prototype = new Monster();

  // TODO Add other functions/methods.


  return Creepo;

}());
