module.exports = (function() {

  var doors = [];
  var monsters = [];
  var Hero = require('./hero.js');
  var Door = require('./spawner');
  var stat_cap = {"attack": 2, "defense": 2, "health": 2};
  var stat_levels = [2, 3, 5, 7, 10, 12, 15];

  function initialize() {
    //TODO spawn doors

    //TODO spawn Hero
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

  //TODO currency stuff



  return {
    initialize: initialize,
    update: update,
    update_cap: update_cap,
  };

}());
