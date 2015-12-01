/* Base class for all game entities,
 * implemented as a common JS module
 */
module.exports = (function(){
  var Entity = require('entity.js');

  Monster.prototype = new Entity();

  function Monster(health, attack, defense, door, specials){
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.door = door;
    this.specials = specials;
    this.state = 0;

    //TODO modify according to center of door.
    this.x = this.door.x;
    this.y = this.door.y;
    this.angle = undefined;
  }

  Monster.prototype.doTurn = function() {
    //TODO MOVEMENT

    //TODO CHECK RANGE

    //TODO specials


  };

   return Monster;

}());
