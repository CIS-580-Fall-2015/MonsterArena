window.onload = function() {

  // The width & height of the screen
  SCREEN_WIDTH = 1280;
  SCREEN_HEIGHT = 720;

  // Module variables
  var Hero = require('./hero.js'),
  EntityManager = require('./entity_manager.js');
  ShopManager = require('./shop_manager.js');
  StatsManager = require('./stats_manager.js');
  AudioManager = require('./AudioManager.js');

  StatsManager.SetSpawnDelegate = EntityManager.spawn_monster;


  ShopManager.SetStatsManagerDelegates(StatsManager.IncreaseAttackCap,
    StatsManager.IncreaseDefenseCap, StatsManager.IncreaseHealthCap);

  AudioManager.playIdleMusic();


  var load = function(sm) {
    EntityManager.initialize();
    //TODO Menu/game state
    //TODO start game loop
  };

  var update = function(elapsedTime) {
    EntityManager.update();
  };


  var render = function() {
    //TODO
  };

}
