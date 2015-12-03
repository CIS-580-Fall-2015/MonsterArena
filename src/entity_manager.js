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
