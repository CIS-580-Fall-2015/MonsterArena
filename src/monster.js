/* Base class for each monster.
 * It inherits from the generic entity class.
 */
module.exports = (function() {
  var Entity = require('./entity.js');

  Monster.prototype = new Entity();

  function Monster(stats, doorID) {
    this.health = stats.health;
    this.attack = stats.attack;
    this.defense = stats.defense;
    this.doorID = doorID;
    this.specials = stats.specials;
    this.state = 0;

    var cx = document.getElementById('svgArea').width.baseVal.value / 2.0;
    var cy = document.getElementById('svgArea').height.baseVal.value / 2.0;

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
    if (this.x == cx) {
      if (this.y > cy) {
        this.angle = 270;
      } else {
        this.angle = 90;
      }
    } else if (this.y == cy) {
      if (this.x > cx) {
        this.angle = 0;
      } else {
        this.angle = 180;
      }
    } else if (this.x < cx) {
      if (this.y < cy) {
        this.angle = 135;
      } else {
        this.angle = 225;
      }
    } else if (this.y < cy) {
      this.angle = 45;
    } else {
      this.angle = 315;
    }
    this.angle = this.angle * Math.PI / 180;
    if (this.angle === 0) {
      this.dx = -1;
      this.dy = 0;
    } else if (this.angle == 45) {
      this.dx = -Math.sqrt(2) / 2;
      this.dy = Math.sqrt(2) / 2;
    } else if (this.angle == 90) {
      this.dx = 0;
      this.dy = 1;
    } else if (this.angle == 135) {
      this.dx = Math.sqrt(2) / 2;
      this.dy = Math.sqrt(2) / 2;
    } else if (this.angle == 180) {
      this.dx = 1;
      this.dy = 0;
    } else if (this.angle == 225) {
      this.dx = Math.sqrt(2) / 2;
      this.dy = -Math.sqrt(2) / 2;
    } else if (this.angle == 270) {
      this.dx = 0;
      this.dy = -1;
    } else if (this.angle == 315) {
      this.dx = -Math.sqrt(2) / 2;
      this.dy = -Math.sqrt(2) / 2;
    }
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

  //n is the number of frames*numberofpixelsperframe since last update (dx & dy calculated for move of 1 pixel)
  Monster.prototype.doTurn = function(n) {
    //TODO MOVEMENT
    //TODO - Check if in bounding box of hero
    this.x += n * dx;
    this.y += n * dy;
    //TODO CHECK RANGE

    //TODO specials


  };

  return Monster;

}());
