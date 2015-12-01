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
    //Temporary
    this.health -= damage - this.defense;
    if (this.health >= 0) {
      //TODO die
    }
  };

  Entity.prototype.doTurn = function() {
    //TODO IN CLASSES
  };

   return Entity;

}());

},{}],2:[function(require,module,exports){
module.exports = (function (){

    // The width & height of the screen
    SCREEN_WIDTH = 1280;
    SCREEN_HEIGHT = 720;

    // Module variables
    var Hero = require('./hero.js'),
        Monster = require('./monster.js');


    var load = function(sm) {
        //TODO Menu/game state
        //TODO initialize world
        //TODO initialize hero
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

},{"./hero.js":3,"./monster.js":4}],3:[function(require,module,exports){
module.exports = (function(){
  var Entity = require('./entity.js');

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

},{"./entity.js":1}],4:[function(require,module,exports){
/* Base class for all game entities,
 * implemented as a common JS module
 */
module.exports = (function(){
  var Entity = require('./entity.js');

  Monster.prototype = new Entity();

  function Monster(health, attack, defense, door, specials){
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.door = door;
    this.specials = specials;
    this.state = 0;

    //TODO modify according to center of door.
    this.x = this.door.x;
    this.y = this.door.y;
    this.angle = undefined;
  }

  Monster.prototype.doTurn = function() {
    //TODO MOVEMENT

    //TODO CHECK RANGE

    //TODO specials


  };

   return Monster;

}());

},{"./entity.js":1}]},{},[2]);
