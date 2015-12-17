/* Help Screen GameState module
 * Authors: Ian Speer
 */
 
module.exports = (function (){
  var helpStats = document.getElementById("help-stats");
  var nextHelp = require("./help_arena.js");
   var  stateManager;

  var load = function(sm) {
    stateManager = sm;
    helpStats.style.display = "flex";
  }
  
  /* Hides the helpStats on exit. */
  var exit = function() {
    helpStats.style.display = "none";
  }
    
  /*Not applicable to this state */
  var update = function() {}
  
  /*Not applicable to this state. */
  var render = function() {}
    
/* Handles keydown events in order to exit the helpStats. */
  var keyDown = function(event) {
    switch(event.keyCode) {
      case 13: // ENTER
        event.preventDefault();
		stateManager.popState();
		stateManager.pushState(nextHelp);
        break;
	case 27: //ESC
		event.preventDefault();
		stateManager.popState();
		break;
    }
  }
  
  /* The keyUp() method handles the key up event */
  function keyUp(event) {}
  
  return {
    load: load,
    exit: exit,
    update: update,
    render: render,
    keyDown: keyDown,
    keyUp: keyUp
  }
  
})();