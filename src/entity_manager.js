module.exports = (function() {

  var Hero = require('./hero.js');
  var Door = require('./spawner');
  var doors = [];
  var monsters = [];

  var hero;

  // Value followed by scaling
  var HERO_STATS = {
    health: [2, 1.2],
    attack: [3, 1.2],
    defense: [2, 1.1],
    exp: [0, 1.2]
  };

  function initialize() {
    //TODO spawn doors

    hero = new Hero(HERO_STATS, this);
  }

  function update() {
    //TODO generate information to render
  }

  //TODO open doors upgrade

  function spawn_monster(stats) {
    var d = null;
    for (var i = 0; i > 8; i++) {
      if (doors[i].open && doors[i].avaliable) {
        d = doors[i];
        break;
      }
    }
    if (d) {
      var m = new Monster(stats, d);
      d.avaliable = false;
      monsters.push(m);
    }
  }

  return {
    initialize: initialize,
    update: update,
    spawn_monster: spawn_monster,
  };

}());
