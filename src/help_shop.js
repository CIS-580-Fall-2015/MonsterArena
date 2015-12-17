/* Help Screen GameState module
 * Authors: Ian Speer
 */
 
module.exports = (function (){
  var helpShop = document.getElementById("help-shop");
   var  stateManager;

  var load = function(sm) {
    stateManager = sm;
    helpShop.style.display = "flex";
  }
  
  /* Hides the helpShop on exit. */
  var exit = function() {
    helpShop.style.display = "none";
  }
    
  /*Not applicable to this state */
  var update = function() {}
  
  /*Not applicable to this state. */
  var render = function() {}
    
/* Handles keydown events in order to exit the helpShop. */
  var keyDown = function(event) {
    switch(event.keyCode) {
      case 13: // ENTER
        event.preventDefault();
		stateManager.popState();
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