module.exports = (function (){

    // The width & height of the screen
    SCREEN_WIDTH = 1280;
    SCREEN_HEIGHT = 720;

    // Module variables
    var Hero = require('./hero.js'),
        Monster = require('./monster.js');
        EntityManager = require('./entity_manager.js');


    var load = function(sm) {
      EntityManager.initialize();
        //TODO Menu/game state
        //TODO start game loop
    };

    var update = function(elapsedTime) {
        //TODO
    };


    var render = function() {
        //TODO
    };


    return {
      load: load,
      update: update,
      render: render,
    };

})();
