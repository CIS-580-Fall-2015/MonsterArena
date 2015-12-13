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

    this.cx = document.getElementById('svgArea').width.baseVal.value / 2.0;
    this.cy = document.getElementById('svgArea').height.baseVal.value / 2.0;

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
        this.angle = 0*Math.PI/180;
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
	  //Checks Range and does movment
    //Check if movement needed based on which direction it is coming in from.
    var a = math.floor(this.angle);
	if(a==135||a==180||a==225){
		if(this.x <=this.cx-96){
			this.x += n * this.dx;
			this.y += n * this.dy;
		}
	}
	else if(a==45||a==0||a==315){
		if(this.x>=this.cx+32){
			this.x += n * this.dx;
			this.y += n * this.dy;
		}
	}
    else if(a==90){
		if(this.y<=this.cy-96){
			this.x += n * this.dx;
			this.y += n * this.dy;
		}
	}
	else if(a==270){
		if(this.y>=this.cy+32){
			this.x += n * this.dx;
			this.y += n * this.dy;
		}
	}

    //TODO specials


  };

  return Monster;

}());
