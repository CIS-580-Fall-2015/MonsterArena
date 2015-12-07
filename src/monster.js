/* Base class for each monster.
 * It inherits from the generic entity class.
 */
module.exports = (function() {
  var Entity = require('./entity.js');

  Monster.prototype = new Entity();

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  function Monster(health, attack, defense, door, specials) {
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.door = door;
    this.specials = specials;
    this.state = 0;

    // Create an animations property, with arrays for each direction of animations.
    this.animations = {
      left: [],
      right: []
    };

    //TODO modify according to center of door.
    this.x = this.door.x;
    this.y = this.door.y;
    this.angle = undefined;
  }

  Monster.prototype.attacked = function(amount) {
    //Temporary
    this.health -= damage - this.defense;
    if (this.health >= 0) {
      //TODO die
      return this.health + this.attack + this.defense;
    }
    return 0;
  };

  Monster.prototype.doTurn = function() {
    //TODO MOVEMENT

    //TODO CHECK RANGE

    //TODO specials


  };

  return Monster;

}());
