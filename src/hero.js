module.exports = (function() {
  var Entity = require('./entity.js');

  const DEBUG = false;

  Hero.prototype = new Entity();

  // Hero Constructor
  // Stats is object keys = stats, values = [stat, scale_factor]
  // x/y positions
  // Entity Manager
  function Hero(stats, x, y, EntityManager) {
    this.health = stats.health[0];
    this.maxHealth_scale = stats.health[1];
    this.attack = stats.attack[0];
    this.attack_scale = stats.attack[1];
    this.defense = stats.defense[0];
    this.defense_scale = stats.defense[1];
    this.exp_scale = stats.exp[1];
    this.EntityManager = EntityManager;
    this.maxHealth = this.health;
    this.img = new Image();
    this.img.src = "./img/hero/heropeasantfront.png";
    this.width = 64;
    this.height = 64;

    this.exp = 0;
    this.req_exp = 10;
    this.level = 1;

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
    if (this.level <= 10) {
      var t = this.maxHealth;
      this.maxHealth *= this.maxHealth_scale;
      this.attack *= this.attack_scale;
      this.defense *= this.defense_scale;
      this.req_exp *= this.exp_scale;
      this.exp = 0;
      this.level++;
      document.getElementById('health').max = Math.floor(this.maxHealth);
      document.getElementById('level').innerHTML = "Hero level: " + this.level;

      if (DEBUG) {
        console.log("Hero leveled up! Level: " +this.level);
      }
    }
  };

  // Updates health bar, adds gold based on damage
  Hero.prototype.attacked = function(amount) {
    //testing health bar
    var alive = true;
    var bar = document.getElementById('health');

    if (DEBUG) {
      console.log("Hero attacked for " + amount);
    }

    var damage = amount - this.defense / 2;
    if (damage < 1) {
      damage = 1;
    }
    this.health -= damage;

    this.EntityManager.add_gold(damage);

    if (this.health <= 0) {
      alive = false;
    }

    bar.value = this.health;
    return alive;
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

    document.getElementById('health').value = Math.floor(this.health);

    if (DEBUG) {
      console.log("Hero healed");
    }
  };

  Hero.prototype.render = function(cntx)
  {
    cntx.drawImage(
      this.img, // image
      0, // source x
      0, // source y
      this.width, // source width
      this.height, // source height
      this.x, // destination x
      this.y, // destination y
      this.width, // destination width
      this.height // destination height
     );
  };

  return Hero;

}());
