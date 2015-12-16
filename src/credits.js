/* Author: Nic Johnson
 *
 * Title: credits.js
 *
 * Description: 
 * 
 *
 * History:
 * 	December 16, 2015: 
 * 		-Date Created
 */
module.exports = (function()
{
	var menu = document.getElementById("credits");
	var stateManager;
	var back = document.getElementById("cred_go_back");
	/*
	* The load() method initializes the menu 
	* and tells the DOM to render the menu HTML
	* parameters:
	* - sm the state manager
	*/
	var load = function(sm) 
	{
		stateManager = sm;
		menu.style.display = "flex";
	}

	/*
	* The exit() method hides the menu
	*/
	var exit = function() 
	{
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

	back.onclick = function(event)
	{
		event.preventDefault();
		console.log("BACK");
		stateManager.popState();
	}

	/* 
	* The keyDown() method handles 
	* the key down event for the menu.
	*/
	var keyDown = function(event) 
	{
		// switch(event.keyCode) {
		//   case 13: // ENTER
		//     event.preventDefault();
		// 	    stateManager.popState();
		//     break;
		// }
	}

	/* The keyUp() method handles the key up event */
	function keyUp(event) {}

	return {
	    load: load,
	    exit: exit,
	    update: update,
	    render: render,
	    keyDown: keyDown,
	    keyUp: keyUp,
    }

})();