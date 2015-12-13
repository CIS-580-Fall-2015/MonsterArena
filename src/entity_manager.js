module.exports = (function() {

  var Hero = require('./hero.js');
  var Door = require('./spawner');
  var Monster = require('./monster.js');
  var doors = [];
  var monsters = [];
  var unlocked_doors = 1;

  var hero;

  // Value followed by scaling
  var HERO_STATS = {
    health: [2, 1.2],
    attack: [3, 1.2],
    defense: [2, 1.1],
    exp: [0, 1.2]
  };

  var ARENA_WIDTH; //TODO
  var ARENA_HEIGHT; //TODO
  var OFFSET = 64;

  function initialize() {
    doors[0] = new Door(ARENA_WIDTH / 2, OFFSET); // North
    doors[1] = new Door(ARENA_WIDTH - OFFSET, ARENA_HEIGHT / 2); // East
    doors[2] = new Door(ARENA_WIDTH / 2, ARENA_HEIGHT - OFFSET); //South
    doors[3] = new Door(OFFSET, ARENA_HEIGHT / 2); // West
    doors[4] = new Door(ARENA_WIDTH * 0.75, ARENA_HEIGHT * 0.25); // North-East
    doors[5] = new Door(ARENA_WIDTH * 0.75, ARENA_HEIGHT * 0.75); // South-East
    doors[6] = new Door(ARENA_WIDTH * 0.25, ARENA_HEIGHT * 0.75); // South-West
    doors[7] = new Door(ARENA_WIDTH * 0.25, ARENA_HEIGHT * 0.25); // North-West

    hero = new Hero(HERO_STATS, ARENA_WIDTH / 2 - 32, ARENA_HEIGHT / 2 - 32, this);
  }

  function update() {
    for (var i = 0; i < monsters.length; i++) {
      monsters[i].doTurn();
    }
  }

  function open_door() {
    if (unlocked_doors < doors.length) {
      unlocked_doors++;
    }
  }

  function spawn_monster(stats) {
    var d = null;
    for (var i = 1; i > unlocked_doors; i++) {
      if (doors[i].avaliable) {
        d = doors[i];
        break;
      }
    }
    if (d) {
      var m = new Monster(stats, d);
      monsters.push(m);
    }
  }

  return {
    initialize: initialize,
    update: update,
    open_door: open_door,
    spawn_monster: spawn_monster,
  };

}());
