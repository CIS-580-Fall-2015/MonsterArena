/* Base class for each monster.
 * It inherits from the generic entity class.
 */
module.exports = (function() {
  var Entity = require('./entity.js');

  // States for the monster.
  const WALKING = 0;
  const ATTACKING = 1;

  // boss = animation {} for monsters\Boss.js
  var boss = require('./monsters/Boss.js'),
  bosser = require('./monsters/Bosser.js').
  bossest = require('./monsters/Bossest.js'),
  creepo = require('./monsters/Creepo.js')
  gunner = require('./monsters/Gunner.js'),
  puncher = require('./monsters/Puncher.js'),
  skully = require('./monsters/Skully.js'),
  snappy = require('./monsters/Snappy.js'),
  wingy = require('./monsters/Wingy.js');

  // An array containing all of the normal monsters (non-bosses).
  var availableRegMonsters = [];
  // An array containing all of the bosses (Only 3, larger than regular monsters).
  var availableBosses = [];

  Monster.prototype = new Entity();

  var BOSS = {attack: 8, defense: 2, health: 5};

  // Constructor
  function Monster(stats, door, isBoss) {
    //Use BOSS stats if it's the leader
    if (isBoss) {
      this.health = BOSS.health;
      this.attack = BOSS.attack;
      this.defense = BOSS.defense;
    } else {
      this.health = stats.health;
      this.attack = stats.attack;
      this.defense = stats.defense;
      this.specials = stats.specials;
    }

    this.door = door;
    this.door.avaliable = false;
    this.state = 0;
    this.x = this.door.x;
    this.y = this.door.y;
    this.isBoss = isBoss;
    this.inRange = false;

    this.cx = document.getElementById('monsters').width.baseVal.value / 2.0;
    this.cy = document.getElementById('monsters').height.baseVal.value / 2.0;

    // Create an animations property, with arrays for each direction of animations.
    this.animations = {
      left: [],
      right: []
    };

    //TODO modify according to center of door.
    this.x = this.door.x + 32;
    this.y = this.door.y + 32;
    this.angle = undefined;

    //determines change in x and y for every movment
    if (this.x == this.cx) {
      if (this.y > this.cy) {
        this.angle = 270;
        this.dx = 0;
        this.dy = -1;
      } else {
        this.angle = 90;
        this.dx = 0;
        this.dy = 1;
      }
    } else if (this.y == this.cy) {
      if (this.x > this.cx) {
        this.angle = 0 * Math.PI / 180;
        this.dx = -1;
        this.dy = 0;
      } else {
        this.angle = 180;
        this.dx = 1;
        this.dy = 0;
      }
    } else if (this.x < this.cx) {
      if (this.y < this.cy) {
        this.angle = 135;
        this.dx = Math.sqrt(2) / 2;
        this.dy = Math.sqrt(2) / 2;
      } else {
        this.angle = 225;
        this.dx = Math.sqrt(2) / 2;
        this.dy = -Math.sqrt(2) / 2;
      }
    } else if (this.y < this.cy) {
      this.angle = 45;
      this.dx = -Math.sqrt(2) / 2;
      this.dy = Math.sqrt(2) / 2;
    } else {
      this.angle = 315;
      this.dx = -Math.sqrt(2) / 2;
      this.dy = -Math.sqrt(2) / 2;
    }
  }

  // Handle monsters being attacked
  Monster.prototype.attacked = function(amount) {
    //Temporary
    this.health -= damage - this.defense;
    if (this.health >= 0) {
      //TODO die
      this.door.avaliable = true;
      if (this.isBoss) {
        return 0;
      } else {
        return this.health + this.attack + this.defense;
      }
    }
    return -1;
  };

  // Do the monsters turn
  //n is the number of frames*numberofpixelsperframe since last update (dx & dy calculated for move of 1 pixel)
  Monster.prototype.doTurn = function(n) {
    //Checks Range and does movment
    //Check if movement needed based on which direction it is coming in from.
    if (!this.inRange) {
      var a = math.floor(this.angle);
      if (a == 135 || a == 180 || a == 225) {
        if (this.x <= this.cx - 96) {
          this.x += n * this.dx;
          this.y += n * this.dy;
        }
      } else if (a == 45 || a == 0 || a == 315) {
        if (this.x >= this.cx + 32) {
          this.x += n * this.dx;
          this.y += n * this.dy;
        }
      } else if (a == 90) {
        if (this.y <= this.cy - 96) {
          this.x += n * this.dx;
          this.y += n * this.dy;
        }
      } else if (a == 270) {
        if (this.y >= this.cy + 32) {
          this.x += n * this.dx;
          this.y += n * this.dy;
        }
      }
      else {
        this.inRange = true;
      }
    }

    //TODO specials


  };

  return Monster;

}());
