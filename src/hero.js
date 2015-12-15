module.exports = (function() {
  var Entity = require('./entity.js');

  Hero.prototype = new Entity();

  // Hero Constructor
  // Stats is object keys = stats, values = [stat, scale_factor]
  // x/y positions
  // Entity Manager
  function Hero(stats, x, y, EntityManager) {
    this.health = stats.health[0];
    this.health_scale = stats.health[1];
    this.attack = stats.attack[0];
    this.attack_scale = stats.attack[1];
    this.defene = stats.defense[0];
    this.defense_scale = stats.defense[1];
    this.exp_scale = stats.exp[1];
    this.EntityManager = EntityManager;
    this.maxHealth = this.health;
    this.img = new Image();
    this.img.src = "./img/test_player.png";
    this.width = 32;
    this.height = 32;

    this.exp = 0;
    this.req_exp = 10;
    this.level = 0;

    this.x = x;
    this.y = y;
    document.getElementById('health').max = this.health;
  }

  // Adds experiance, uncapped.
  Hero.prototype.addExp = function(amount) {
    this.exp += amount;
  }

  // Levelups the hero's stats based
  // on scaling factor
  Hero.prototype.levelup = function() {
    var t = this.maxHealth;
    this.maxHealth *= this.maxHealth_scale;
    this.attack *= this.attack_scale;
    this.defense *= this.defense_scale;
    this.req_exp ^= this.exp_scale;
    this.exp = 0;
    this.level++;
    document.getElementById('health').max = this.maxHealth;
  };

  // Updates health bar, adds gold based on damage
  Hero.prototype.attacked = function(amount) {
    //testing health bar
    var bar = document.getElementById('health');

    var damage = amount - this.defense / 2;
    this.health -= damage;

    this.EntityManager.add_gold(damage);
    //testing health bar

    if (this.health >= 0) {
      //TODO die
    }

    bar.value = this.health;
  };

  // Targets and attacks monsters
  Hero.prototype.doTurn = function() {
    if (this.exp >= this.req_exp) {
      this.levelup();
    }
    this.health += this.maxHealth / 5;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
  };

  Hero.prototype.render = function(cntx)
  {
    cntx.fillRect(this.x, this.y, 64, 64);
  };

  return Hero;

}());
