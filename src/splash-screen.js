/* MainMenu GameState module
 * Authors:
 * - Ian Speer, Austin Boerger
 */
module.exports = (function (){
  var credits = require('./credits.js');
  var help = require("./help_stats.js");
  var menu = document.getElementById("splash-screen"),
      stateManager;

  /*
   * The load() method initializes the menu 
   * and tells the DOM to render the menu HTML
   * parameters:
   * - sm the state manager
   */
  var load = function(sm) {
    stateManager = sm;
    menu.style.display = "flex";
  }
  
  /*
   * The exit() method hides the menu
   */
  var exit = function() {
    menu.style.display = "none";
  }
    
  /* 
   * The update() method updates the menu
   * (in this case, a no-op)
   */
  var update = function() {}
  
  /* 
   * The render() method renders the menu
   * (in this case, a no-op as the menu is 
   * HTML elements renderd by the DOM)
   */
  var render = function() {}
    
  /* 
   * The keyDown() method handles 
   * the key down event for the menu.
   */
  var keyDown = function(event) {
    switch(event.keyCode) {
      case 32: // Space
      case 13: // ENTER
        event.preventDefault();
		    stateManager.popState();
        break;

      case 67: // C
        event.preventDefault();
        stateManager.pushState(credits);
        break;

       case 72: // H
         event.preventDefault();
         stateManager.pushState(help);
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