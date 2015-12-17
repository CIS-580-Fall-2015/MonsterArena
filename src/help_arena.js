/* Help Screen GameState module
 * Authors: Ian Speer
 */
 
module.exports = (function (){
  var helpArena = document.getElementById("help-arena");
  var nextHelp = require("./help_shop.js");
   var  stateManager;

  var load = function(sm) {
    stateManager = sm;
    helpArena.style.display = "flex";
  }
  
  /* Hides the helpArena on exit. */
  var exit = function() {
    helpArena.style.display = "none";
  }
    
  /*Not applicable to this state */
  var update = function() {}
  
  /*Not applicable to this state. */
  var render = function() {}
    
/* Handles keydown events in order to exit the helpArena. */
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