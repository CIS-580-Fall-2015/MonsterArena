module.exports = function() {

  var Hero = require('./hero.js'),
    EntityManager = require('./entity_manager.js'),
    ShopManager = require('./shop_manager.js'),
    StatsManager = require('./stats_manager.js'),
    AudioManager = require('./AudioManager.js'),
    canvas,
    ctx;

  var load = function(sm) {
    var statemanager = sm;
    // The width & height of the screen
    SCREEN_WIDTH = 1280;
    SCREEN_HEIGHT = 720;

    EntityManager.add_gold = ShopManager.AddGold;
    // Module variables

    StatsManager.SetSpawnDelegate = EntityManager.spawn_monster;

    ShopManager.SetStatsManagerDelegates(
      StatsManager.IncreaseAttackCap,
      StatsManager.IncreaseDefenseCap,
      StatsManager.IncreaseHealthCap,
      StatsManager.AddSpecial,
      EntityManager.open_door,
      EntityManager.upgrade_boss
    );

    AudioManager.playIdleMusic();
    EntityManager.initialize();
  }


  var update = function(elapsedTime) {
    //EntityManager.update();
  };

  var load = function(sm) {
    EntityManager.initialize();

    // Get the canvas and grab the context.
    canvas = document.getElementById("monsters");
    ctx = canvas.getContext("2d");

    //TODO Menu/game state
    //TODO start game loop
  };

  var keyUp = function(e) {
    // Do nothing
  };

  var keyDown = function(e) {
    // Do nothing
  };

  var exit = function() {
    // Any exit logic
  }
  var render = function() {
    //TODO
    EntityManager.render(ctx);
  };

  return {
    load: load,
    update: update,
    render: render,
    keyUp: keyUp,
    keyDown: keyDown,
    exit: exit
  }

}();
