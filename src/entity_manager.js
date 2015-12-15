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
    health: [40, 1.05],
    attack: [5, 1.2],
    defense: [3, 1.1],
    exp: [0, 1.2]
  };

  var ARENA_WIDTH = document.getElementById('monsters').width;
  var ARENA_HEIGHT = document.getElementById('monsters').height;
  var OFFSET = 64;

  // Builds the door array and places the hero
  function initialize() {
    doors.push(new Door(ARENA_WIDTH / 2, OFFSET)); // North
    doors.push(new Door(ARENA_WIDTH - OFFSET, ARENA_HEIGHT / 2)); // East
    doors.push(new Door(ARENA_WIDTH / 2, ARENA_HEIGHT - OFFSET)); //South
    doors.push(new Door(OFFSET, ARENA_HEIGHT / 2)); // West
    doors.push(new Door(ARENA_WIDTH * 0.75, ARENA_HEIGHT * 0.25)); // North-East
    doors.push(new Door(ARENA_WIDTH * 0.75, ARENA_HEIGHT * 0.75)); // South-East
    doors.push(new Door(ARENA_WIDTH * 0.25, ARENA_HEIGHT * 0.75)); // South-West
    doors.push(new Door(ARENA_WIDTH * 0.25, ARENA_HEIGHT * 0.25)); // North-West

    hero = new Hero(HERO_STATS, ARENA_WIDTH / 2 - 32, ARENA_HEIGHT / 2 - 32, this);

    spawn_boss_interval = setInterval(spawn_boss, 5000);
  }

  // Runs all the turns, adds exp when neccesary
  // Clears array of dead monsters
  function update() {
    var del = false;

    // Hero level and regeneration
    hero.doTurn();
    if (monsters.length != 0) {
      //All monsters attack hero
      for (var i = 0; i < monsters.length; i++) {
        if (monsters[i].range) {
          //Heal
          damage = monsters[i].attack;

          if (monsters[i].special = "heal") {
            monsters[0].health += damage;
            continue;
          }

          r = Math.random();

          //Check crit
          if (monsters[i].special = "crit") {
            if (r > .9) {
              damage *= 2;
            }
          }
          hero.attacked(damage);

          //Check Taunt
          if (monsters[i].special = "taunt") {
            if (r > .5) {
              monsters.unshft(monsters[i]);
              del = true;
              delete monsters[i];
            }
          }
        }
      }


      if (monsters[0].special = "dodge") {
        var r = Math.random()
        if (r < .85) {
          var e = monsters[0].attacked(hero.attack);
          if (e >= 0) {
            del = true;
            hero.addExp(e);
            delete monsters[i];
          }
        }
      }

      if (del) {
        var undef;
        var temp = [];
        for (i = 0; i < monsters.length; i++) {
          if (monsters[i] !== undef) {
            temp.push(monsters[i]);
          }
        }
        monsters = temp;
      }
    }
  }

  // For door upgrades
  function open_door() {
    if (unlocked_doors < doors.length) {
      unlocked_doors++;
    }
    console.log("EM Doors open: " + unlocked_doors);
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
      console.log("Spawning monster at door " + i);
    } else {
      console.log("EM no doors avaliable");
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

  function upgrade_boss() {
    monster.BOSS.attack *= 2;
    monster.BOSS.defense *= 2;
    monster.BOSS.health *= 2;
    if (monster.BOSS.animations = monster.boss) {
      monster.BOSS.animations = monster.bosser;
    } else {
      monster.BOSS.animations = monster.bossest;
    }
  }

  // Renders all the monsters with the given context.
  function render(ctx) {
    for (var i = 0; i < monsters.length; i++) {
      if (monsters[i]) {
        monsters[i].render(ctx);
      }
    }
  }


  return {
    initialize: initialize,
    update: update,
    open_door: open_door,
    spawn_monster: spawn_monster,
    upgrade_boss: upgrade_boss,
    render: render,
    monsters: monsters
  };

}());
