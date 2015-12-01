/* Base class for all game entities,
 * implemented as a common JS module
 */
module.exports = (function(){


  SPAWNED = 0;
  MOVING = 1;
  IN_RANGE = 2;
  ATTACKING = 3;

  function Entity(){
    //TODO IN CLASSES
  }

  Entity.prototype.attacked = function(damage) {
    //Temporary
    this.health -= damage - this.defense;
    if (this.health >= 0) {
      //TODO die
    }
  };

  Entity.prototype.doTurn = function() {
    //TODO IN CLASSES
  };

   return Entity;

}());
