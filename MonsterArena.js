(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Base class for all game entities,
 * implemented as a common JS module
 */
module.exports = (function(){


  SPAWNED = 0;
  MOVING = 1;
  IN_RANGE = 2;
  ATTACKING = 3;

  function Entity(){
    //TODO IN CLASSES
  }

  Entity.prototype.attacked = function(damage) {
    //TODO IN CLASSES
  }

  Entity.prototype.doTurn = function() {
    //TODO IN CLASSES
  };

   return Entity;

}());

},{}],2:[function(require,module,exports){
module.exports = (function() {

  var Hero = require('./hero.js');
  var Door = require('./spawner');
  var doors = [];
  var stat_cap = {"attack": 2, "defense": 2, "health": 2};
  var stat_levels = [2, 3, 5, 7, 10, 12, 15];
  var blood = 0;

  var hero;
  // Value followed by scaling
  var HERO_STATS = {health: [2, 1.2], attack: [3, 1.2], defense: [2, 1.1], exp: [0, 1.2]};
  var monsters = [];

  function initialize() {
    //TODO spawn doors

    hero = new Hero(HERO_STATS, this);
  }

  function update() {
    //TODO generate information to render
  }

  function update_cap(stat, level) {
    //TODO error catching
    stat_cap[stat] = stat_levels.indexOf(level);
  }

  //TODO open doors upgrade

  //TODO monster spawning

  function mod_blood(amount) {
    blood += amount;
    if (blood < 0) {
      blood = 0;
    }
  }

  function get_blood() {
    return blood;
  }



  return {
    initialize: initialize,
    update: update,
    update_cap: update_cap,
    mod_blood: mod_blood,
    get_blood: get_blood,
  };

}());

},{"./hero.js":4,"./spawner":6}],3:[function(require,module,exports){
module.exports = (function (){

    // The width & height of the screen
    SCREEN_WIDTH = 1280;
    SCREEN_HEIGHT = 720;

    // Module variables
    var Hero = require('./hero.js'),
        Monster = require('./monster.js');
        EntityManager = require('./entity_manager.js');


    var load = function(sm) {
      EntityManager.initialize();
        //TODO Menu/game state
        //TODO start game loop
    };

    var update = function(elapsedTime) {
        //TODO
    };


    var render = function() {
        //TODO
    };


    return {
      load: load,
      update: update,
      render: render,
    };

})();

},{"./entity_manager.js":2,"./hero.js":4,"./monster.js":5}],4:[function(require,module,exports){
module.exports = (function(){
  var Entity = require('./entity.js');

  Hero.prototype = new Entity();



  function Hero(stats, EntityManager){
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
    //TODO place hero
    //this.x =
    //this.y =
  }

  Hero.prototype.levelup = function() {
    this.health *= this.health_scale;
    this.attack *= this.attack_scale;
    this.defense *= this.defense_scale;
    this.req_exp ^= this.exp_scale;
    this.exp = 0;
  };

  Hero.prototype.attacked = function(amount) {
    //Temporary
    var damage = amount - this.defense;
    this.health -= damage;
    EntityManager.mod_blood(damage);
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

},{"./entity.js":1}],5:[function(require,module,exports){
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

},{"./entity.js":1}],6:[function(require,module,exports){
module.exports = (function(){

  function Door(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.open = false;
    this.monster = false;
  }

  return Door;

}());

},{}]},{},[3]);
