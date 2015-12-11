/* Gunner Monster Entity.
 */
module.exports = (function() {
  var Monster = require('./monster.js'),
  Animation = require('./animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Gunner spritesheet
  var GunnerWalkRight = new Image();
  GunnerWalkRight.src = './img/monsters/Gunner/Gunner_Walk_Right.png';

  // The left walking Gunner spritesheet
  var GunnerWalkLeft = new Image();
  GunnerWalkLeft.src = "./img/monsters/Gunner/Gunner_Walk_Left.png";

  // The right attacking Gunner spritesheet
  var GunnerAttackRight = new Image();
  GunnerAttackRight.src = "./img/monsters/Gunner/Gunner_Attack_Right.png";

  // The left attacking Gunner spritesheet
  var GunnerAttackLeft = new Image();
  GunnerAttackLeft.src = "./img/monsters/Gunner/Gunner_Attack_Left.png";

  function Gunner()
  {
    // TODO Needs Proper Parameters and Assignment of Properties

    // The right-facing animations.
    this.animations.right[WALKING] = new Animation(GunnerWalkRight, SIZE, SIZE, 0, 0, 8); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(GunnerAttackRight, SIZE, SIZE, 0, 0, 8); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(GunnerWalkLeft, SIZE, SIZE, 0, 0, 8); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(GunnerAttackLeft, SIZE, SIZE, 0, 0, 8); // TODO Specific Timing may need to be adjusted.
  }

  // Inherits from Monster.
  Gunner.prototype = new Monster();

  // TODO Add other functions/methods.


  return Gunner;

}());
