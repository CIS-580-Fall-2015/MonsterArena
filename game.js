module.exports = (function (){

    // The width & height of the screen
    SCREEN_WIDTH = 1280;
    SCREEN_HEIGHT = 720;

    // Module variables
    var Hero = require('hero.js'),
        Monster = require('monster.js');


    var load = function(sm) {
        //TODO Menu/game state
        //TODO initialize world
        //TODO initialize hero
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
