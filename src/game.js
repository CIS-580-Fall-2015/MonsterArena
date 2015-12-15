module.exports = function()
{
  var load = function(sm)
  {
    var statemanager = sm;
    // The width & height of the screen
    SCREEN_WIDTH = 1280;
    SCREEN_HEIGHT = 720;

    // Module variables
    var Hero = require('./hero.js'),
    EntityManager = require('./entity_manager.js');
    ShopManager = require('./shop_manager.js');
    StatsManager = require('./stats_manager.js');
    AudioManager = require('./AudioManager.js');

    EntityManager.add_gold = ShopManager.AddGold;

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

  var update = function(elapsedTime) 
  {
    //EntityManager.update();
  };


  var render = function() 
  {
    //TODO
  };

  var keyUp = function(e)
  {
    // Do nothing
  };

  var keyDown = function(e)
  {
    // Do nothing
  };

  var exit = function()
  {
    // Any exit logic
  };

  return {
    load: load,
    update: update,
    render: render,
    keyUp: keyUp,
    keyDown: keyDown,
    exit: exit,
  }

}();
