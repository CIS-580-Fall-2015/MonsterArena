/* Base class for each monster.
 * It inherits from the generic entity class.
 */
module.exports = (function() {
  var Entity = require('./entity.js'),
  Animation = require('./animation.js');;

  // States for the monster.
  const WALKING = 0;
  const ATTACKING = 1;

  // An array containing all of the normal monsters (non-bosses).
  var availableRegMonsters = [];
  // An array containing all of the bosses (Only 3, larger than regular monsters).
  var availableBosses = [];

  // The Boss Monster Entity.
  var Boss =
  {
    // Create an animations property, with arrays for each direction of animations.
    this.animations = {
      left: [],
      right: []
    };

    // The height and width for one frame.
    this.HEIGHT = 98;
    this.WIDTH = 124;

    // The movement sprite sheet for the boss. It is simple, with walking and attacking being the same animation.
    this.BossMovement = new Image();
    this.BossMovement.src = './img/monsters/Boss/Boss-Movement.png';

    // The right-facing animations. ALL OF THESE ANIMATIONS ARE THE SAME. IMPLEMENTED FOR THE SAKE OF CONSISTANCY.
    this.animations.right[WALKING] = new Animation(BossMovement, this.WIDTH, this.HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(BossMovement, this.WIDTH, this.HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(BossMovement, this.WIDTH, this.HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(BossMovement, this.WIDTH, this.HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.

  };
  availableBosses.push(Boss);

  // The Bosser Monster Entity.
  var Bosser =
  {
    // Create an animations property, with arrays for each direction of animations.
    this.animations = {
      left: [],
      right: []
    };

    // The height and width for one frame.
    this.HEIGHT = 100;
    this.WIDTH = 86;

    // The movement sprite sheet for the bosser. It is simple, with walking and attacking being the same animation.
    this.BosserMovement = new Image();
    this.BosserMovement.src = './img/monsters/Bosser/Bosser-Movement.png';

    // The right-facing animations. ALL OF THESE ANIMATIONS ARE THE SAME. IMPLEMENTED FOR THE SAKE OF CONSISTANCY.
    this.animations.right[WALKING] = new Animation(BosserMovement, this.WIDTH, this.HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(BosserMovement, this.WIDTH, this.HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(BosserMovement, this.WIDTH, this.HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(BosserMovement, this.WIDTH, this.HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.


  };
  availableBosses.push(Bosser);

  // The Bossest Monster Entity.
  var Bossest =
  {
    // Create an animations property, with arrays for each direction of animations.
    this.animations = {
      left: [],
      right: []
    };

    // The height and width for one frame.
    this.HEIGHT = 100;
    this.WIDTH = 116;

    // The movement sprite sheet for the Bossest. It is simple, with walking and attacking being the same animation.
    this.BossestMovement = new Image();
    this.BossestMovement.src = './img/monsters/Bossest/Bossest-Movement.png';

    // The right-facing animations. ALL OF THESE ANIMATIONS ARE THE SAME. IMPLEMENTED FOR THE SAKE OF CONSISTANCY.
    this.animations.right[WALKING] = new Animation(BossestMovement, this.WIDTH, this.HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(BossestMovement, this.WIDTH, this.HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(BossestMovement, this.WIDTH, this.HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(BossestMovement, this.WIDTH, this.HEIGHT, 0, 0, 2); // TODO Specific Timing may need to be adjusted.
  };
  availableBosses.push(Bossest);

  // The Creepo Monster Entity.
  var Creepo =
  {
    // Create an animations property, with arrays for each direction of animations.
    this.animations = {
      left: [],
      right: []
    };

    // The sprite size (It's a square 64 pixels x 64 pixels)
    this.SIZE = 64;

    // The right walking Creepo spritesheet
    this.CreepoWalkRight = new Image();
    this.CreepoWalkRight.src = './img/monsters/Creepo/Creepo_Walk_Right.png';

    // The left walking Creepo spritesheet
    this.CreepoWalkLeft = new Image();
    this.CreepoWalkLeft.src = "./img/monsters/Creepo/Creepo_Walk_Left.png";

    // The right attacking Creepo spritesheet
    this.CreepoAttackRight = new Image();
    this.CreepoAttackRight.src = "./img/monsters/Creepo/Creepo_Attack_Right.png";

    // The left attacking Creepo spritesheet
    this.CreepoAttackLeft = new Image();
    this.CreepoAttackLeft.src = "./img/monsters/Creepo/Creepo_Attack_Left.png";

    // The right-facing animations.
    this.animations.right[WALKING] = new Animation(CreepoWalkRight, this.SIZE, this.SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(CreepoAttackRight, this.SIZE, this.SIZE, 0, 0, 6); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(CreepoWalkLeft, this.SIZE, this.SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(CreepoAttackLeft, this.SIZE, this.SIZE, 0, 0, 6); // TODO Specific Timing may need to be adjusted.
  };
  availableRegMonsters.push(Creepo);

  // The Gunner Monster Entity.
  var Gunner =
  {
    // Create an animations property, with arrays for each direction of animations.
    this.animations = {
      left: [],
      right: []
    };

    // The sprite size (It's a square 64 pixels x 64 pixels)
    this.SIZE = 64;

    // The right walking Gunner spritesheet
    this.GunnerWalkRight = new Image();
    this.GunnerWalkRight.src = './img/monsters/Gunner/Gunner_Walk_Right.png';

    // The left walking Gunner spritesheet
    this.GunnerWalkLeft = new Image();
    this.GunnerWalkLeft.src = "./img/monsters/Gunner/Gunner_Walk_Left.png";

    // The right attacking Gunner spritesheet
    this.GunnerAttackRight = new Image();
    this.GunnerAttackRight.src = "./img/monsters/Gunner/Gunner_Attack_Right.png";

    // The left attacking Gunner spritesheet
    this.GunnerAttackLeft = new Image();
    this.GunnerAttackLeft.src = "./img/monsters/Gunner/Gunner_Attack_Left.png";

    // The right-facing animations.
    this.animations.right[WALKING] = new Animation(GunnerWalkRight, this.SIZE, this.SIZE, 0, 0, 8); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(GunnerAttackRight, this.SIZE, this.SIZE, 0, 0, 8); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(GunnerWalkLeft, this.SIZE, this.SIZE, 0, 0, 8); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(GunnerAttackLeft, this.SIZE, this.SIZE, 0, 0, 8); // TODO Specific Timing may need to be adjusted.
  };
  availableRegMonsters.push(Gunner);

  // The Puncher Monster Entity.
  var Puncher =
  {
    // Create an animations property, with arrays for each direction of animations.
    this.animations = {
      left: [],
      right: []
    };

    // The sprite size (It's a square 64 pixels x 64 pixels)
    this.SIZE = 64;

    // The right walking Puncher spritesheet
    this.PuncherWalkRight = new Image();
    this.PuncherWalkRight.src = './img/monsters/Puncher/Puncher_Walk_Right.png';

    // The left walking Puncher spritesheet
    this.PuncherWalkLeft = new Image();
    this.PuncherWalkLeft.src = "./img/monsters/Puncher/Puncher_Walk_Left.png";

    // The right attacking Puncher spritesheet
    this.PuncherAttackRight = new Image();
    this.PuncherAttackRight.src = "./img/monsters/Puncher/Puncher_Attack_Right.png";

    // The left attacking Puncher spritesheet
    this.PuncherAttackLeft = new Image();
    this.PuncherAttackLeft.src = "./img/monsters/Puncher/Puncher_Attack_Left.png";

    // The right-facing animations.
    this.animations.right[WALKING] = new Animation(PuncherWalkRight, this.SIZE, this.SIZE, 0, 0, 8); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(PuncherAttackRight, this.SIZE, this.SIZE, 0, 0, 10); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(PuncherWalkLeft, this.SIZE, this.SIZE, 0, 0, 8); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(PuncherAttackLeft, this.SIZE, this.SIZE, 0, 0, 10); // TODO Specific Timing may need to be adjusted.
  };
  availableRegMonsters.push(Puncher);

  // The Skully Monster Entity.
  var Skully =
  {
    // Create an animations property, with arrays for each direction of animations.
    this.animations = {
      left: [],
      right: []
    };

    // The sprite size (It's a square 64 pixels x 64 pixels)
    this.SIZE = 64;

    // The right walking Skully spritesheet
    this.SkullyWalkRight = new Image();
    this.SkullyWalkRight.src = './img/monsters/Skully/Skully_Walk_Right.png';

    // The left walking Skully spritesheet
    this.SkullyWalkLeft = new Image();
    this.SkullyWalkLeft.src = "./img/monsters/Skully/Skully_Walk_Left.png";

    // The right attacking Skully spritesheet
    this.SkullyAttackRight = new Image();
    this.SkullyAttackRight.src = "./img/monsters/Skully/Skully_Attack_Right.png";

    // The left attacking Skully spritesheet
    this.SkullyAttackLeft = new Image();
    this.SkullyAttackLeft.src = "./img/monsters/Skully/Skully_Attack_Left.png";

    // The right-facing animations.
    this.animations.right[WALKING] = new Animation(SkullyWalkRight, this.SIZE, this.SIZE, 0, 0, 4); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(SkullyAttackRight, this.SIZE, this.SIZE, 0, 0, 4); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(SkullyWalkLeft, this.SIZE, this.SIZE, 0, 0, 4); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(SkullyAttackLeft, this.SIZE, this.SIZE, 0, 0, 4); // TODO Specific Timing may need to be adjusted.
  };
  availableRegMonsters.push(Skully);

  // The Snappy Monster Entity.
  var Snappy =
  {
    // Create an animations property, with arrays for each direction of animations.
    this.animations = {
      left: [],
      right: []
    };

    // The sprite size (It's a square 64 pixels x 64 pixels)
    this.SIZE = 64;

    // The right walking Snappy spritesheet
    this.SnappyWalkRight = new Image();
    this.SnappyWalkRight.src = './img/monsters/Snappy/Snappy_Walk_Right.png';

    // The left walking Snappy spritesheet
    this.SnappyWalkLeft = new Image();
    this.SnappyWalkLeft.src = "./img/monsters/Snappy/Snappy_Walk_Left.png";

    // The right attacking Snappy spritesheet
    this.SnappyAttackRight = new Image();
    this.SnappyAttackRight.src = "./img/monsters/Snappy/Snappy_Attack_Right.png";

    // The left attacking Snappy spritesheet
    this.SnappyAttackLeft = new Image();
    this.SnappyAttackLeft.src = "./img/monsters/Snappy/Snappy_Attack_Left.png";

    // The right-facing animations.
    this.animations.right[WALKING] = new Animation(SnappyWalkRight, this.SIZE, this.SIZE, 0, 0, 4); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(SnappyAttackRight, this.SIZE, this.SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(SnappyWalkLeft, this.SIZE, this.SIZE, 0, 0, 4); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(SnappyAttackLeft, this.SIZE, this.SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.
  };
  availableRegMonsters.push(Snappy);

  // The Wingy Monster Entity.
  var Wingy =
  {
    // Create an animations property, with arrays for each direction of animations.
    this.animations = {
      left: [],
      right: []
    };

    // The sprite size (It's a square 64 pixels x 64 pixels)
    this.SIZE = 64;

    // The right walking Wingy spritesheet
    this.WingyWalkRight = new Image();
    this.WingyWalkRight.src = './img/monsters/Wingy/Wingy_Walk_Right.png';

    // The left walking Wingy spritesheet
    this.WingyWalkLeft = new Image();
    this.WingyWalkLeft.src = "./img/monsters/Wingy/Wingy_Walk_Left.png";

    // The right attacking Wingy spritesheet
    this.WingyAttackRight = new Image();
    this.WingyAttackRight.src = "./img/monsters/Wingy/Wingy_Attack_Right.png";

    // The left attacking Wingy spritesheet
    this.WingyAttackLeft = new Image();
    this.WingyAttackLeft.src = "./img/monsters/Wingy/Wingy_Attack_Left.png";

    // The right-facing animations.
    this.animations.right[WALKING] = new Animation(WingyWalkRight, this.SIZE, this.SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.
    this.animations.right[ATTACKING] = new Animation(WingyAttackRight, this.SIZE, this.SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.

    //The left-facing animations
    this.animations.left[WALKING] = new Animation(WingyWalkLeft, this.SIZE, this.SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.
    this.animations.left[ATTACKING] = new Animation(WingyAttackLeft, this.SIZE, this.SIZE, 0, 0, 5); // TODO Specific Timing may need to be adjusted.
  };
  availableRegMonsters.push(Wingy);

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
    this.state = WALKING;
    this.x = this.door.x;
    this.y = this.door.y;
    this.isBoss = isBoss;

    this.cx = document.getElementById('svgArea').width.baseVal.value / 2.0;
    this.cy = document.getElementById('svgArea').height.baseVal.value / 2.0;

    //TODO modify according to center of door.
    this.x = this.door.x + 32;
    this.y = this.door.y + 32;
    this.angle = undefined;

    // Set the direction of the monster.
    if (this.x < this.cx)
    {
      this.isLeft = false;
    }
    else if (this.x > this.cx)
    {
      this.isLeft = true;
    }
    else
    {
      var ranNum = Math.floor((Math.random() * 2));
      if (ranNum == 0)
      {
        this.isLeft = false;
      }
      else
      {
        this.isLeft = true;
      }
    }

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

    //TODO specials
  };

  // Renders the monster on the canvas via the animation engine.
  Monster.prototype.render = function(context)
  {
    // Draw the Monster (and the correct animation).
    if (this.isLeft)
    {
      this.animations.left[this.state].render(context, this.x, this.y);
    }
    else
    {
      this.animations.right[this.state].render(context, this.x, this.y);
    }
  };

  return Monster;

}());
