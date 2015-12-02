module.exports = (function(){
  var Entity = require('./entity.js');

  Hero.prototype = new Entity();

  function Hero(health, attack, defense){
    this.health = health;
    this.attack = attack;
    this.defense = defense;
  }

  Hero.prototype.attacked = function(amount) {
    //Temporary
    this.health -= damage - this.defense;
    //TODO grant hero blood
    if (this.health >= 0) {
      //TODO die
    }
  };

  Hero.prototype.doTurn = function() {
    //TODO TARGET MONSTER AND ATTACK
  };

   return Hero;

}());
