module.exports = (function(){
  var Entity = require('entity.js');

  Hero.prototype = new Entity();

  function Hero(health, attack, defense){
    this.health = health;
    this.attack = attack;
    this.defense = defense;
  }

  Hero.prototype.doTurn = function() {
    //TODO TARGET MONSTER AND ATTACK
  };

   return Hero;

}());
