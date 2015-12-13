module.exports = (function(){
  var Entity = require('./entity.js');

  Hero.prototype = new Entity();



  function Hero(stats, x, y, EntityManager){
    this.health = stats.health[0];
    this.health_scale = stats.health[1];
    this.attack = stats.attack[0];
    this.attack_scale = stats.attack[1];
    this.defene = stats.defense[0];
    this.defense_scale = stats.defense[1];
    this.exp_scale = stats.exp[1];
    this.EntityManager = EntityManager;

    this.exp = 0;
    this.req_exp = 10;
    this.level = 0;

    this.x = x;
    this.y = y;
	document.getElementById('health').max = this.health;
  }

  Hero.prototype.addExp = function(amount) {
    this.exp += amount;
  }

  Hero.prototype.levelup = function() {
    this.health *= this.health_scale;
    this.attack *= this.attack_scale;
    this.defense *= this.defense_scale;
    this.req_exp ^= this.exp_scale;
    this.exp = 0;
  };

  Hero.prototype.attacked = function(amount) {
	//testing health bar
	var bar = document.getElementById('health');
	//
    //Temporary
    var damage = amount - this.defense / 2;
    this.health -= damage;
	//testing health bar
	bar.value = this.health;
	//
    if (this.health >= 0) {
      //TODO die
    }
  };

  Hero.prototype.doTurn = function() {
    if (this.exp >= this.req_exp) {
      this.levelup();
    }
    //TODO TARGET MONSTER AND ATTACK
  };

   return Hero;

}());
