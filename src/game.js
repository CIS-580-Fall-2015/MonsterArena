// module.exports = function() {
window.onload = function()
{ 
    gameTime = 0;
    canvas = document.getElementById("monsters");
    canvas.width = 590;
    canvas.height = 560;
    Hero = require('./hero.js'),
    EntityManager = require('./entity_manager.js'),
    ShopManager = require('./shop_manager.js'),
    StatsManager = require('./stats_manager.js'),
    AudioManager = require('./AudioManager.js')
    ctx = canvas.getContext("2d");

  var load = function(sm) {

    var statemanager = sm;
    // The width & height of the screen
    SCREEN_WIDTH = 1280;
    SCREEN_HEIGHT = 720;

    EntityManager.add_gold = ShopManager.AddGold;
    // Module variables

    StatsManager.SetSpawnDelegate(EntityManager.spawn_monster);
    StatsManager.SetAudioManager(AudioManager);

    ShopManager.SetStatsManagerDelegates(
      StatsManager.IncreaseAttackCap,
      StatsManager.IncreaseDefenseCap,
      StatsManager.IncreaseHealthCap,
      StatsManager.AddSpecial,
      EntityManager.open_door,
      EntityManager.upgrade_boss
    );
    ShopManager.SetAudioManager(AudioManager);

    ShopManager.AddGold(150000);

    EntityManager.initialize();

    //AudioManager.playIdleMusic();
    EntityManager.initialize();

    window.requestAnimationFrame(loop);
  }


  var update = function(elapsedTime) {
    EntityManager.update(elapsedTime);
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

  var loop = function(newTime)
  {
    var elapsedTime = (newTime - gameTime) / 1000;
    gameTime = newTime;
    update(elapsedTime);
    render();
    window.requestAnimationFrame(loop);
  }
  load();
  window.requestAnimationFrame(loop);
}
//   return {
//     load: load,
//     update: update,
//     render: render,
//     keyUp: keyUp,
//     keyDown: keyDown,
//     exit: exit
//   }

// }();
