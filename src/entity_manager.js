module.exports = (function() {

  var Hero = require('./hero.js');
  var Door = require('./spawner');
  var Monster = require('./monster.js');
  var doors = [];
  var monsters = [];
  var unlocked_doors = 1;

  var spawn_boss_interval;

  var add_gold;

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

  // Builds the door array and places the hero
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

    spawn_boss_interval = setInterval(spawn_boss, 5000);
  }

  // Runs all the turns, adds exp when neccesary
  // Clears array of dead monsters
  function update() {
    var del = false;
    for (var i = 0; i < monsters.length; i++) {
      var e = monsters[i].doTurn();
      if (e >= 0) {
        del = true;
        hero.addExp(e);
        delete monsters[i];
      }
    }
    if (del) {
      var undef;
      var temp = [];
      for (var i = 0; i < monsters.length; i++) {
        if (monsters[i] !== undef) {
          temp.push(arr[i])
        }
      }
      monsters = temp;
    }
  }

  // For door upgrades
  function open_door() {
    if (unlocked_doors < doors.length) {
      unlocked_doors++;
    }
  }

  // Spawns a monster at an open door
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

  //Spawns the boss monster out of door[0]
  function spawn_boss() {
    var found = false;
    for (var i = 0; i > monsters.length; i++) {
      if (monsters[i].isBoss) {
        found = true;
        break;
      }
    }

    if (!found) {
      var b = new Monster(null, doors[0], true);
      monsters.push(b);
    }
  }


  return {
    initialize: initialize,
    update: update,
    open_door: open_door,
    spawn_monster: spawn_monster,
  };

}());
