(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * ==============
 * Script ID Data
 * ==============
 * File Name: AudioManager.js
 * Version Date: ad-2015-12-15 16:44:00
 * Contributors: Kyle Brown
 *
 * Documentation Language: English  (en){lkB-000-001}
 *
 * ===========
 * Description
 * ===========
 * This script implements an audio manager in JavaScript and HTML5.  
 * Uses the browserify module.exports design pattern.
 * 
 * ==========
 * How to Use
 * ==========
 * In the script that needs to use music and sound effects, add the following line of code to 
 * reference the audio manager; given that both scripts are in src folder:
 * var audiomanager = require('./AudioManager.js');		
 * 
 * 
 * Then you can use the prototype functions in this class. 
 * For music, call play music functions (i.e. audiomanager.playIdleMusic()).
 * It will stop the current music, and play the new music.
 * For sound FX, call play soundFX functions (i.e. audiomanager.playUpgradeSFX()).
 * It will just play the sound effect into the sound effects bus.
 * // NEED TO DO... currently 1 sfx.  This implementation has a 1-music, 2-sound effect bus for one track of music and two independent sound effects to be playing.
 *
 * Also, add necessary HTML5 elements in the html file.
 * =========
 * HTML5 Code
 * =========
 * div>
 *  <audio id="bgmusic">Audio:Canvas Not Supported</audio>
 * </div>
 * <div>
 *  <audio id="soundfx1">Audio:Canvas Not Supported</audio>
 * </div> 
 * <div>
 *  <audio id="soundfx2">Audio:Canvas Not Supported</audio>
 * </div> 
 *
 * ===============
 * Version History
 * ===============
 * Version Date				Version Number kb-4RGB-pixels() 	Comment
 * -----------				---------------------------------	-------
 * ad-2015-12-09 23:50:00	(0,0,1)(0,7,231)(1,12,9)(23,50,0)	AudioManager created
 *			00-00-01 | 00-07-E7 | 01-0C-09 | 17-32-00 
 *
 * ad-2015-12-10 20:07:00	(0,0,1)(0,7,231)(1,12,10)(20,7,0)	Design outline
 *			00-00-01 | 00-07-E7 | 01-0C-0A | 14-07-00 
 *
 * ad-2015-12-11 19:17:00	(0,0,1)(0,7,231)(1,12,11)(19,17,0)	Working Version
 *			00-00-01 | 00-07-E7 | 01-0C-0b | 13-10-00
 *
 * ad-2015-12-12 17:49:00	(0,0,1)(0,7,231)(1,12,12)(17,49,0)	Clean up
 *			00-00-01 | 00-07-E7 | 01-0C-0C | 11-31-00
 *
 * ad-2015-12-12 20:10:00   (0,0,1)(0,7,231)(1,12,12)(20,10,0)	Naming fixes
 *			0-00-01 | 00-07-E7 | 01-0C-0C | 14-01-00
 *
 * ad-2015-12-15 16:44:00	(0,0,1)(0,7,231)(1,12,15)(16,44,0)	Spawn Sound
 * 			0-00-01 | 00-07-E7 | 01-0C-0F | 10-2C-00
 * =================
 * File Dependencies
 * =================
 * For playing audio, it requires the following audio files in audio/ folder:
 * File Name					Description
 * ---------					-----------
 * MAIdleMusic.wav				The idle music
 * MABattleMusic.wav			The battle scene music
 * MAWinMusic.wav 				The win music
 * MALoseMusic.wav				The lose music
 * MALevelUpSound.wav			The level up sound
 * MAUpgradeSound.wav			The upgrade sound
 * MABuffSound.wav				The buff sound
 * MADebuffSound.wav			The debuff sound
 * MAClickSound.wav				The click sound
 * MASpawnSound.wav				The spawning sound
 *
 *
 * ==================================
 * Double Slash Commenting Convention
 * ==================================
 * LEGEND
 * $L$L$L
 * COMMENT                  MEANING
 * -------                  -------
 * BEGIN OF Xxx Yyy ZZZ   	Indicates the beginning of a section of related functions where Xxx Yyy is the Catagory Name, ZZZ is type like Variables, Functions, Sets, Gets...
 * !END OF Xxx Yyy ZZZ    	Indicates the end       of a section of related functions  ""   ""  "" ""   ""      "" ... 
 * Normal Xxx Convention    This Convention Means a Name or Title of Some Xxx Functionality or Related Section of Code
 * lower case convention    this convention means a comment describing how some section of code works
 * camelCaseConvention      thisIsTheConventionForNamingVariables (where private variables the first char is '_')
 * 
 * 
 * =========
 * Functions
 * =========
 * AudioManager Functions
 * ----------------------
 * Function Name            Description
 * -------------            -----------
 * playIdleMusic			Plays the idle music (by ...  sets path source and starts musics)
 * playBattleMusic			Plays the battle music (by ... "^^")
 * playWinMusic				Plays the win music (by ... "^^")
 * playLoseMusic			Plays the lose music (by ... "^^")
 * playLevelUpSFX			Plays the Level Up sound (by ...starts)
 * playUpgradeSFX			Plays the Upgrade sound (by ..."^^")
 * playBuffSFX				Plays the Buff sound (by ..."^^")
 * playDebuffSFX			Plays the Debuff sound (by ..."^^")
 * playClickSFX				Plays the Click Sound sound (by ... "^^")
 * playSpawnSFX				Plays the Spawning sound(by ... "^^")
 *
 * toggleMusic				Turns the music on or off based on current volume.
 * toggleEffects			Turns the sound effects on or off based on current volume.
 *
 *
 * =========
 * Variables
 * =========
 * ~Public
 * ~Private
 *  _curMusic = 0; // the current music number that is playing
 *  _curSFX = 4;	// the current sound effects number that is playing
 *  _curSFX1 = 5;	// the current sound effects 1 number that is playing
 * ~Constants
 *	MAX_MUSIC_CNT = 9;	// the maximum number of music files (to not extend beyond array bounds).
 *	MAX_VOLUME_LVL = .9; // The level that the max volume should be (.9 = 90%).
 *	MIN_VOLUME_LVL = .1; // The level that tests if it is on volume should be (.1 = 10%).
 *	ZERO_VOLUME_LVL = 0; // the level that means zero volume (no sound playing).
 * 
 * ~Enumerations
 *	AudioSounds - Numbers that correspond with audio sounds
 *		IDLEMUSIC: 0,
 *		BATTLEMUSIC: 1,
 *		WINMUSIC: 2,
 *		LOSEMUSIC: 3,
 *		LEVELUPSOUND: 4,
 *		UPGRADESOUND: 5,
 *		BUFFSOUND: 6,
 *		DEBUFFSOUND: 7,
 *		CLICKSOUND: 8,
 * 		SPAWNSOUND: 9
 *	Strings - The corresponding string names
 *		0: "IDLEMUSIC",
 *		1: "BATTLEMUSIC",
 *		2: "WINMUSIC",
 *		3: "LOSEMUSIC",
 *		4: "LEVELUPSOUND",
 *		5: "UPGRADESOUND",
 *		6: "BUFFSOUND",
 *		7: "DEBUFFSOUND",
 *		8: "CLICKSOUND",
 *		9: "SPAWNSOUND"
 *	MusicFiles - The file paths for the music files
 *		0: "audio/MAIdleMusic.wav",
 *		1: "audio/MABattleMusic.wav",
 *		2: "audio/MAWinMusic.wav",
 *		3: "audio/MALoseMusic.wav",
 *		4: "audio/MALevelUpSound.wav",
 *		5: "audio/MAUpgradeSound.wav",
 *		6: "audio/MABuffSound.wav", 
 *		7: "audio/MADebuffSound.wav", *
 *		8: "audio/MAClickSound.wav",
 *		9: "audio/MASpawnSound.wav"
 *
 * =================
 * MAIdleMusic.wav
 * =================
 * =================
 * MABattleMusic.wav
 * =================
 *
 * ==============
 * MAWinMusic.wav
 * ==============
 *
 * ===============
 * MALoseMusic.wav
 * ===============
 * ==================
 * MALevelUpSound.wav
 * ==================
 *
 * ==================
 * MAUpgradeSound.wav
 * ==================
  * ==============
 * MABuffSound.wav
 * ===============
 *
 * =================
 * MADebuffSound.wav
 * =================
 * ================
 * MAClickSound.wav
 * ================
 *
 * ================
 * MASpawnSound.wav
 * ================
 *
 */


module.exports = (function()
{
  // BEGIN OF Audio Manager CLASS FUNCTION
  function AudioManager()
  {
	this.DEBUG = true; // prints debug statements
	
	// Audio Enumerations
	this.AudioSounds = 
	{
		IDLEMUSIC: 0,
		BATTLEMUSIC: 1,
		WINMUSIC: 2,
		LOSEMUSIC: 3,
		LEVELUPSOUND: 4,
		UPGRADESOUND: 5,
		BUFFSOUND: 6,
		DEBUFFSOUND: 7,
		CLICKSOUND: 8,
		SPAWNSOUND: 9
	};
	Object.freeze(this.AudioSounds);

	// Audio Strings
	this.Strings = 
	{
		0: "IDLEMUSIC",
		1: "BATTLEMUSIC",
		2: "WINMUSIC",
		3: "LOSEMUSIC",
		4: "LEVELUPSOUND",
		5: "UPGRADESOUND",
		6: "BUFFSOUND",
		7: "DEBUFFSOUND",
		8: "CLICKSOUND",
		9: "SPAWNSOUND"
	}
	Object.freeze(this.Strings);
	
	// Audio File-paths
	this.MusicFiles = 
	{
		0: "audio/MAIdleMusic.wav",
		1: "audio/MABattleMusic.wav",
		2: "audio/MAWinMusic.wav",
		3: "audio/MALoseMusic.wav",
		4: "audio/MALevelUpSound.wav",
		5: "audio/MAUpgradeSound.wav",
		6: "audio/MABuffSound.wav",
		7: "audio/MADebuffSound.wav",
		8: "audio/MAClickSound.wav",
		9: "audio/MASpawnSound.wav"
	}
	Object.freeze(this.MusicFiles);
	
	
	// Global DOM Elements
	this.musicElm = document.getElementById("bgmusic"); // music element
	this.soundElm = document.getElementById("soundfx"); // sound effects element
	//this.soundElm1 = document.getElementById("soundfx1"); // sound effects 1 element

	// Event Listener for Looping Music
	this.musicElm.addEventListener('ended',function(){
		this.currentTime = 0;
		this.play();
	}, false);
	
	// Private Variables
	this._curMusic = 0; // the current music number that is playing
	this._curSFX = 4;	// the current sound effects number that is playing
	//this._curSFX1 = 5;	// the current sound effects 1 number that is playing
	// ~Constants
	this.MAX_MUSIC_CNT = 9;	// the maximum number of music files (to not extend beyond array bounds).
	this.MAX_VOLUME_LVL = .9; // The level that the max volume should be (.9 = 90%).
	this.MIN_VOLUME_LVL = .1; // The level that the max volume should be (.1 = 90%).
	this.ZERO_VOLUME_LVL = 0; // the level that means zero volume (no sound playing).

	
	
  } // !END OF Audio Manager CLASS FUNCTION  
  
  
	// BEGIN OF General Audio Playing FUNCTIONS
	// Toggle  Volume Functions
	function toggleMusic(musicElm, maxVolLvl, minVolLvl, zeroVolLvl){
		if (musicElm.volume >= minVolLvl)
		{
			musicElm.volume = zeroVolLvl;	
		} else
		{
			musicElm.volume = maxVolLvl;
		}				
	}
	
	function playMusic(musicElm, musicPath) {
		//console.log("AudioManager: General Play Music-debug")
		musicElm.src = musicPath;	// sets the file path
		musicElm.play();			// plays the music
	}
	function pauseMusic(musicElm) {
		musicElm.pause();			// pauses the music
	}
	
	// !END OF General Audio Playing FUNCTIONS
	
	
	// BEGIN OF Game Specific Audio FUNCTIONS
	// Music Play Functions
	AudioManager.prototype.playIdleMusic = function ()
	{
		if (this.DEBUG) { console.log("AudioManager: IdleMusic-Play"); }
		this._curMusic = 0;
		playMusic(this.musicElm,this.MusicFiles[this._curMusic]);
	}
	AudioManager.prototype.playBattleMusic = function ()
	{
		if (this.DEBUG) { console.log("AudioManager: BattleMusic-Play"); }
		this._curMusic = 1;
		playMusic(this.musicElm,this.MusicFiles[this._curMusic]);
	}

	AudioManager.prototype.playWinMusic = function ()
	{
		if (this.DEBUG) { console.log("AudoManager: WinMusic-Play"); }
		this._curMusic = 2;
		playMusic(this.musicElm, this.MusicFiles[this._curMusic]);
	}
	
	// Sound FX Play Functions
	AudioManager.prototype.playLevelUpSFX = function ()
	{
		if (this.DEBUG) { console.log("AudioManager: LevelUpFX-Play"); }
		this._curSFX = 4;
		playMusic(this.soundElm,this.MusicFiles[this._curSFX]);
	}
	AudioManager.prototype.playUpgradeSFX = function ()
	{
		if (this.DEBUG) { console.log("AudioManager: UpgradeFX-Play"); }
		this._curSFX = 5;
		playMusic(this.soundElm,this.MusicFiles[this._curSFX]);
	}
	AudioManager.prototype.playBuffSFX = function ()
	{
		if (this.DEBUG) { console.log("AudioManager: BuffSFX-Play"); }
		this._curSFX = 6;
		playMusic(this.soundElm,this.MusicFiles[this._curSFX]);
	}
	AudioManager.prototype.playDebuffSFX = function ()
	{
		if (this.DEBUG) { console.log("AudioManager: DebuffSFX-Play"); }
		this._curSFX = 7;
		playMusic(this.soundElm,this.MusicFiles[this._curSFX]);
	}
	AudioManager.prototype.playClickSFX = function ()
	{
		if (this.DEBUG) { console.log("AudioManager: ClickFX-Play"); }
		this._curSFX = 8;
		playMusic(this.soundElm,this.MusicFiles[this._curSFX]);
	}
	AudioManager.prototype.playSpawnSFX = function ()
	{
		if (this.DEBUG) { console.log("AudioManager: SpawnSFX-Play"); }
		this._curSFX = 9;
		playMusic(this.soundElm,this.MusicFiles[this._curSFX]);
	}
	
	// Volume Control Functions
	AudioManager.prototype.toggleMusic = function ()
	{
		if (this.DEBUG) { console.log("AudioManager: ToggleMusicVolume"); }
		toggleMusic(this.musicElm, this.MAX_VOLUME_LVL, this.MIN_VOLUME_LVL, this.ZERO_VOLUME_LVL);
	}
	AudioManager.prototype.toggleEffects = function ()
	{
		if (this.DEBUG) { console.log("AudioManager: ToggleEffectsVolume"); }
		toggleMusic(this.soundElm, this.MAX_VOLUME_LVL, this.MIN_VOLUME_LVL, this.ZERO_VOLUME_LVL);
	}
	// !END OF Game Specific Audio FUNCTIONS

	
	return new AudioManager();	// returns a new AudioManager()
})();




},{}],2:[function(require,module,exports){
/* Sprite sheet animation engine. Ported from DiggyHole, an open source game located at:
   https://github.com/CIS-580-Fall-2015/diggy-hole
*/

module.exports = function () {


  function Animation(image, width, height, top, left, numberOfFrames, half, secondsPerFrame, playItOnce, donePlayingCallback, reverse) {
    this.frameIndex = 0,
        this.time = 0,
        this.secondsPerFrame = secondsPerFrame || (1 / 16),
        this.numberOfFrames = numberOfFrames || 1;

    this.width = width;
    this.height = height;
    this.image = image;
    this.half = half || false;

    this.drawLocationX = top || 0;
    this.drawLocationY = left || 0;

    this.playItOnce = playItOnce;
    this.donePlayingCallback = donePlayingCallback;
    this.reversalFactor = 1;
    if(reverse) this.reversalFactor = -1;
  }

  Animation.prototype.setStats = function (frameCount, locationX, locationY) {
    this.numberOfFrames = frameCount;
    this.drawLocationY = locationY;
    this.drawLocationX = locationX;
  };

  Animation.prototype.update = function (elapsedTime, tilemap) {
    this.time += elapsedTime;

    // Update animation
    if (this.time > this.secondsPerFrame) {
      if (this.time > this.secondsPerFrame) this.time -= this.secondsPerFrame;

      // If the current frame index is in range
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex += 1;
      } else {
        if (!this.playItOnce)
          this.frameIndex = 0;

        if (this.donePlayingCallback) {
          this.donePlayingCallback();

          //once we call the callback, destroy it so it cannot be called again
          this.donePlayingCallback = null;
        }
      }
    }
  };

  Animation.prototype.render = function (ctx, x, y) {

    // Draw the current frame
    if (!this.half)
    {
      ctx.drawImage(
        this.image,
        this.drawLocationX + (this.frameIndex * this.reversalFactor * this.width),
        this.drawLocationY,
        this.width,
        this.height,
        x,
        y,
        this.width,
        this.height);
    }
    else
    {
      ctx.drawImage(
        this.image,
        this.drawLocationX + (this.frameIndex * this.reversalFactor * this.width),
        this.drawLocationY,
        this.width,
        this.height,
        x,
        y,
        this.width / 2,
        this.height / 2);
    }
  };

  return Animation;

}();

},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
/* Base class for all game entities,
 * implemented as a common JS module
 */
module.exports = (function(){


  SPAWNED = 0;
  MOVING = 1;
  IN_RANGE = 2;
  ATTACKING = 3;

  function Entity(){
    //TODO IN CLASSES
  }

  Entity.prototype.attacked = function(damage) {
    //TODO IN CLASSES
  }

  Entity.prototype.doTurn = function() {
    //TODO IN CLASSES
  };

   return Entity;

}());

},{}],5:[function(require,module,exports){
module.exports = (function() {

  var Hero = require('./hero.js');
  var Door = require('./spawner');
  var Monster = require('./monster.js');
  //TODO replace this?
  var boss = require('./monsters/Boss.js'),
    bosser = require('./monsters/Bosser.js'),
    bossest = require('./monsters/Bossest.js')
  var doors = [];
  var monsters = [];
  var unlocked_doors = 1;

  var spawn_boss_interval;
  var do_turns_interval;

  var add_gold;

  var hero;

  // Value followed by scaling
  var HERO_STATS = {
    health: [40, 1.05],
    attack: [5, 1.2],
    defense: [3, 1.1],
    exp: [0, 1.2]
  };

  var BOSS = {
    attack: 8,
    defense: 2,
    health: 5,
    animations: boss
  };



    var ARENA_WIDTH = document.getElementById('monsters').width;
  var ARENA_HEIGHT = document.getElementById('monsters').height;
  var openedDoorsText = document.getElementById("available_doors");
  var OFFSET = 64;
  var DEBUG = true;

  var heroAlive = true;

  // Builds the door array and places the hero
  function initialize() {
    doors.push(new Door(ARENA_WIDTH / 2, OFFSET)); // North
    doors.push(new Door(ARENA_WIDTH - OFFSET, ARENA_HEIGHT / 2)); // East
    doors.push(new Door(ARENA_WIDTH / 2, ARENA_HEIGHT - OFFSET)); //South
    doors.push(new Door(OFFSET, ARENA_HEIGHT / 2)); // West
    doors.push(new Door(ARENA_WIDTH * 0.75, ARENA_HEIGHT * 0.25)); // North-East
    doors.push(new Door(ARENA_WIDTH * 0.75, ARENA_HEIGHT * 0.75)); // South-East
    doors.push(new Door(ARENA_WIDTH * 0.25, ARENA_HEIGHT * 0.75)); // South-West
    doors.push(new Door(ARENA_WIDTH * 0.25, ARENA_HEIGHT * 0.25)); // North-West

    hero = new Hero(HERO_STATS, ARENA_WIDTH / 2 - 32, ARENA_HEIGHT / 2 - 32, this);


    spawn_boss();
    spawn_boss_interval = setInterval(spawn_boss, 5000);
    do_turns_interval = setInterval(do_turns, 1000);
  }

  // Runs all the turns, adds exp when neccesary
  // Clears array of dead monsters
  function update(elapsedTime) {
    for (var i = 0; i < monsters.length; i++) {
      monsters[i].update(elapsedTime);
      monsters[i].doTurn(1);
    }
    if (heroAlive)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  function do_turns() {
    var del = false;

    // Hero level and regeneration
    hero.doTurn();

    if (monsters.length != 0) {
      //All monsters attack hero
      for (var i = 0; i < monsters.length; i++) {
        if (monsters[i].inRange) {
          //Heal
          damage = monsters[i].attack;

          if (monsters[i].special == "heal") {
            monsters[0].health += damage/3;
            if (monsters[0].health > monsters[0].maxHealth) {
              monsters[0].health = monsters[0].maxHealth;
            }
            continue;
          }

          r = Math.random();

          //Check crit
          if (monsters[i].special == "crit") {
            if (r > .9) {
              damage *= 2;
            }
          }
          var alive = hero.attacked(damage);
          if (!alive)
          {
            heroAlive = false;
          }

          //Check Taunt
          if (monsters[i].special == "taunt") {
            if (r > .5) {
              if (DEBUG) {
                console.log("Taunting!");
              }
              var t = monsters[0];
              monsters[0] = monsters[i];
              monsters[i] = t;
              monsters[i].special = "none";
            }
          }
        }
      }

      //Check dodge
      var dodge = false;
      if (monsters[0].special == "dodge") {
        var r = Math.random()
        if (r > .85) {
          dodge = true;
        }
      }

      //Hero attacks
      if (monsters[0].inRange) {
        if (!dodge) {
          var e = monsters[0].attacked(hero.attack);
          if (e >= 0) {
            del = true;
            hero.addExp(e);
            delete monsters[0];
          }
        }
      }

      if (del) {
        var undef;
        var temp = [];
        for (i = 0; i < monsters.length; i++) {
          if (monsters[i] !== undef) {
            temp.push(monsters[i]);
          }
        }
        monsters = temp;
      }
    }
  }

  // For door upgrades
  function open_door() {
    if (unlocked_doors < doors.length) {
      openedDoorsText.innerHTML = "Purchased Doors: " + unlocked_doors;
      unlocked_doors++;
    }
    console.log("EM Doors open: " + unlocked_doors);
  }

  // Spawns a monster at an open door
  function spawn_monster(stats) {
    var d = null;
    for (var i = 1; i < unlocked_doors; i++) {
      if (doors[i].avaliable) {
        d = doors[i];
        break;
      }
    }
    if (d) {
      var m = new Monster(stats, d);
      monsters.push(m);
      console.log("Spawning monster at door " + i);
    } else {
      console.log("EM no doors avaliable");
    }
  }

  //Spawns the boss monster out of door[0]
  function spawn_boss() {
    var found = false;
    for (var i = 0; i < monsters.length; i++) {
      if (monsters[i].isBoss) {
        found = true;
        break;
      }
    }

    if (!found) {
      var b = new Monster(null, doors[0], BOSS);
      monsters.push(b);
    }
  }

  function upgrade_boss() {
    BOSS.attack *= 2;
    BOSS.defense *= 2;
    BOSS.health *= 2;
    if (BOSS.animations == boss) {
      BOSS.animations = bosser;
    } else {
      BOSS.animations = bossest;
    }
  }

  // Renders all the monsters with the given context.
  function render(ctx) {
    ctx.clearRect(0, 0, 590, 560);
    for (var i = 0; i < monsters.length; i++) {
      if (monsters[i]) {
        monsters[i].render(ctx);
      }
    }
    hero.render(ctx);
    // for (var i = 0; i < doors.length; i++)
    // {
    //   doors[i].render(ctx);
    // }
  }


  return {
    initialize: initialize,
    update: update,
    open_door: open_door,
    spawn_monster: spawn_monster,
    upgrade_boss: upgrade_boss,
    render: render,
    monsters: monsters,
    doors: doors
  };

}());

},{"./hero.js":11,"./monster.js":13,"./monsters/Boss.js":14,"./monsters/Bosser.js":15,"./monsters/Bossest.js":16,"./spawner":24}],6:[function(require,module,exports){
module.exports = function() {
//window.onload = function()
//{ 
    // Module variables
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
    var game_over = require("./game_over.js");
    var stateManager;

  var load = function(sm) {

    stateManager = sm;
    // The width & height of the screen
    SCREEN_WIDTH = 1280;
    SCREEN_HEIGHT = 720;

    EntityManager.add_gold = ShopManager.AddGold;

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

    //ShopManager.AddGold(150000);

    EntityManager.initialize();

    AudioManager.playIdleMusic();
    EntityManager.initialize();

    //window.requestAnimationFrame(loop);
  }


  var update = function(elapsedTime) {
    var heroAlive = EntityManager.update(elapsedTime);
    if (!heroAlive)
    {
      AudioManager.playWinMusic();
      stateManager.pushState(game_over);
    }
  };

  var keyUp = function(e) {
    // Do nothing
  };

  var keyDown = function(e) {}

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
  //load();
  //window.requestAnimationFrame(loop);
//}
  return {
    load: load,
    update: update,
    render: render,
    keyUp: keyUp,
    keyDown: keyDown,
    exit: exit
  }

}();

},{"./AudioManager.js":1,"./entity_manager.js":5,"./game_over.js":7,"./hero.js":11,"./shop_manager.js":23,"./stats_manager.js":26}],7:[function(require,module,exports){
/* Author: Nic Johnson
 *
 * Title: game_over.js
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
	var menu = document.getElementById("game_over");
	var stateManager;
	var credits = document.getElementById("GO_credits_btn");
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

	credits.onclick = function(e)
	{
		e.preventDefault();
		var c = require('./credits.js');
		stateManager.pushState(c);
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
},{"./credits.js":3}],8:[function(require,module,exports){
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
},{"./help_shop.js":9}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{"./help_arena.js":8}],11:[function(require,module,exports){
module.exports = (function() {
  var Entity = require('./entity.js');

  const DEBUG = false;

  Hero.prototype = new Entity();

  // Hero Constructor
  // Stats is object keys = stats, values = [stat, scale_factor]
  // x/y positions
  // Entity Manager
  function Hero(stats, x, y, EntityManager) {
    this.health = stats.health[0];
    this.maxHealth_scale = stats.health[1];
    this.attack = stats.attack[0];
    this.attack_scale = stats.attack[1];
    this.defense = stats.defense[0];
    this.defense_scale = stats.defense[1];
    this.exp_scale = stats.exp[1];
    this.EntityManager = EntityManager;
    this.maxHealth = this.health;
    this.img = new Image();
    this.img.src = "./img/hero/heropeasantfront.png";
    this.width = 64;
    this.height = 64;

    this.exp = 0;
    this.req_exp = 10;
    this.level = 1;

    this.x = x;
    this.y = y;
    document.getElementById('health').max = this.health;
  }

  // Adds experiance, uncapped.
  Hero.prototype.addExp = function(amount) {
    this.exp += amount;
  }

  // Levelups the hero's stats based
  // on scaling factor
  Hero.prototype.levelup = function() {
    if (this.level <= 10) {
      var t = this.maxHealth;
      this.maxHealth *= this.maxHealth_scale;
      this.attack *= this.attack_scale;
      this.defense *= this.defense_scale;
      this.req_exp *= this.exp_scale;
      this.exp = 0;
      this.level++;
      document.getElementById('health').max = Math.floor(this.maxHealth);
      document.getElementById('level').innerHTML = "Hero level: " + this.level;

      if (DEBUG) {
        console.log("Hero leveled up! Level: " +this.level);
      }
    }
  };

  // Updates health bar, adds gold based on damage
  Hero.prototype.attacked = function(amount) {
    //testing health bar
    var alive = true;
    var bar = document.getElementById('health');

    if (DEBUG) {
      console.log("Hero attacked for " + amount);
    }

    var damage = amount - this.defense / 2;
    if (damage < 1) {
      damage = 1;
    }
    this.health -= damage;

    this.EntityManager.add_gold(damage);

    if (this.health <= 0) {
      alive = false;
    }

    bar.value = this.health;
    return alive;
  };

  // Targets and attacks monsters
  Hero.prototype.doTurn = function() {
    if (this.exp >= this.req_exp) {
      this.levelup();
    }
    this.health += this.maxHealth / 5;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }

    document.getElementById('health').value = Math.floor(this.health);

    if (DEBUG) {
      console.log("Hero healed");
    }
  };

  Hero.prototype.render = function(cntx)
  {
    cntx.drawImage(
      this.img, // image
      0, // source x
      0, // source y
      this.width, // source width
      this.height, // source height
      this.x, // destination x
      this.y, // destination y
      this.width, // destination width
      this.height // destination height
     );
  };

  return Hero;

}());

},{"./entity.js":4}],12:[function(require,module,exports){
// Wait for the window to load completely
window.onload = function() {
  
  var gameTime = 0,
      gameState = [];
    
  var pushState = function(state) {
    state.load({pushState: pushState, popState: popState});
    gameState.push(state);
  }
  
  var popState = function() {
    state = gameState.pop(); 
    if(state) state.exit();
    return state;
  }

  var game = require('./game');
  pushState(game);
  
  var splashScreen = require('./splash-screen');
  pushState(splashScreen);
  
  // Event handlers for key events
  window.onkeydown = function(event) {
    gameState[gameState.length-1].keyDown(event);
  }
  window.onkeyup = function(event) {
    gameState[gameState.length-1].keyUp(event);
  }
  
  function loop(newTime) {
    var elapsedTime = (newTime - gameTime) / 1000;
    gameTime = newTime;
    gameState[gameState.length-1].update(elapsedTime);
    gameState[gameState.length-1].render(elapsedTime);
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
  
};
},{"./game":6,"./splash-screen":25}],13:[function(require,module,exports){
/* Base class for each monster.
 * It inherits from the generic entity class.
 */
module.exports = (function() {
  var Entity = require('./entity.js');

  // States for the monster.
  const WALKING = 0;
  const ATTACKING = 1;

  const DEBUG = true;

  // boss = animation {} for monsters\Boss.js
  var boss = require('./monsters/Boss.js'),
    bosser = require('./monsters/Bosser.js'),
  bossest = require('./monsters/Bossest.js'),
    creepo = require('./monsters/Creepo.js'),
  gunner = require('./monsters/Gunner.js'),
    puncher = require('./monsters/Puncher.js'),
    skully = require('./monsters/Skully.js'),
    snappy = require('./monsters/Snappy.js'),
    wingy = require('./monsters/Wingy.js');

  // An array containing all of the normal monsters (non-bosses).
  var availableRegMonsters = [];
  availableRegMonsters.push(creepo);
  availableRegMonsters.push(gunner);
  availableRegMonsters.push(puncher);
  availableRegMonsters.push(skully);
  availableRegMonsters.push(snappy);
  availableRegMonsters.push(wingy);
  // An array containing all of the bosses (Only 3, larger than regular monsters).
  //var availableBosses = [];

  Monster.prototype = new Entity();



  // Constructor
  function Monster(stats, door, BOSS) {
    var undef;
    //Use BOSS stats if it's the leader
    if (BOSS != undef) {
      this.health = BOSS.health;
      this.attack = BOSS.attack;
      this.defense = BOSS.defense;
      this.animations = BOSS.animations;
      this.isBoss = true;
    } else {
      this.health = stats.health;
      this.attack = stats.attack;
      this.defense = stats.defense;
      this.special = stats.special;
      this.animations = availableRegMonsters[Math.floor(Math.random() * (availableRegMonsters.length) )]; // Pick one of the six regular sprites at random.
      this.isBoss = false;
    }
    this.maxHealth = this.health;
    this.door = door;
    this.door.avaliable = false;
    this.state = WALKING;
    this.x = this.door.x;
    this.y = this.door.y;
    this.inRange = false;
    this.inRangex = false;
    this.inRangey = false;

    this.cx = document.getElementById('monsters').width / 2.0;
    this.cy = document.getElementById('monsters').height / 2.0;

    //TODO modify according to center of door.
    this.x = this.door.x;
    this.y = this.door.y;
    this.angle = undefined;

    // Set the direction of the monster.
    if (this.x < this.cx) {
      this.isLeft = false;
    } else if (this.x > this.cx) {
      this.isLeft = true;
    } else {
      var ranNum = Math.floor((Math.random() * 2));
      if (ranNum == 0) {
        this.isLeft = false;
      } else {
        this.isLeft = true;
      }
    }

    //determines change in x and y for every movment
    if (this.x == this.cx) {
      if (this.y > this.cy) {
        this.angle = 270;
        this.dx = 0;
        this.dy = -1;
      } else {
        this.angle = 90;
        this.dx = 0;
        this.dy = 1;
      }
    } else if (this.y == this.cy) {
      if (this.x > this.cx) {
        this.angle = 0 * Math.PI / 180;
        this.dx = -1;
        this.dy = 0;
      } else {
        this.angle = 180;
        this.dx = 1;
        this.dy = 0;
      }
    } else if (this.x < this.cx) {
      if (this.y < this.cy) {
        this.angle = 135;
        this.dx = Math.sqrt(2) / 2;
        this.dy = Math.sqrt(2) / 2;
      } else {
        this.angle = 225;
        this.dx = Math.sqrt(2) / 2;
        this.dy = -Math.sqrt(2) / 2;
      }
    } else if (this.y < this.cy) {
      this.angle = 45;
      this.dx = -Math.sqrt(2) / 2;
      this.dy = Math.sqrt(2) / 2;
    } else {
      this.angle = 315;
      this.dx = -Math.sqrt(2) / 2;
      this.dy = -Math.sqrt(2) / 2;
    }
	this.x -= 32;
	this.y -= 32;
  }

  // Handle monsters being attacked
  Monster.prototype.attacked = function(amount) {
    //Temporary
    var damage = amount - this.defense / 2;
    if (damage < 1) {
      damage = 1;
    }
    this.health -= damage;
    if (DEBUG) {
      console.log("Monster attacked! Health: " + this.health);
    }
    if (this.health <= 0) {
      if (DEBUG) {
        console.log("It died!");
      }
      this.door.avaliable = true;
      if (this.isBoss) {
        return 0;
      } else {
        return this.maxHealth + this.attack + this.defense;
      }
    }
    return -1;
  };

  // Do the monsters turn
  //n is the number of frames*numberofpixelsperframe since last update (dx & dy calculated for move of 1 pixel)
  Monster.prototype.doTurn = function(n) {
    //Checks Range and does movment
    //Check if movement needed based on which direction it is coming in from.

    if (!this.inRange) {
		var a = this.angle;
		var x = this.x;
		var y = this.y;
		if(a==135||a==225){
			if(this.x<199||this.y>344){
				this.x += n*this.dx;
				this.y += n*this.dy;
			} else{
				this.inRangex = true;
				this.inRangey = true;
			}
		}else if(a==45||a==315){
			if(this.x>327||this.y>312){
				this.x += n*this.dx;
				this.y += n*this.dy;
			}
			else{
				this.inRangex = true;
				this.inRangey = true;
			}
		}else if(a==0||a==180){
			if(x<199||x>312)
			{
				this.x += n*this.dx;
				this.y += n*this.dy;
			}
			else{
				this.inRangex = true;
				this.inRangey = true;
			}
		}else if(a==90||a==270){
			if(y<184||y>312){
				this.x += n*this.dx;
				this.y += n*this.dy;
			}
			else{
				this.inRangex = true;
				this.inRangey = true;
			}
		}
    }
    if (this.inRangex && this.inRangey)
    {
      this.inRange = true;
      this.state = ATTACKING;
    }
    // if (this.inRange)
    // {
    //   this.state = ATTACKING;
    // }

  };

  // Renders the monster on the canvas via the animation engine.
  Monster.prototype.render = function(context) {
    // Draw the Monster (and the correct animation).
    if (this.isLeft) {
      this.animations.left[this.state].render(context, this.x, this.y);
    } else {
      this.animations.right[this.state].render(context, this.x, this.y);
    }
  };

  Monster.prototype.update = function(elapsedTime)
  {
    if(this.isLeft)
    {
      this.animations.left[this.state].update(elapsedTime);
    }
    else
    {
      this.animations.right[this.state].update(elapsedTime);
    }
  };

  return Monster;

}());

},{"./entity.js":4,"./monsters/Boss.js":14,"./monsters/Bosser.js":15,"./monsters/Bossest.js":16,"./monsters/Creepo.js":17,"./monsters/Gunner.js":18,"./monsters/Puncher.js":19,"./monsters/Skully.js":20,"./monsters/Snappy.js":21,"./monsters/Wingy.js":22}],14:[function(require,module,exports){
/* Boss Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite HEIGHT (One frame).
  const HEIGHT = 98;
  // The sprite WIDTH (One frame).
  const WIDTH = 124;

  // The movement sprite sheet for the boss. It is simple, with walking and attacking being the same animation.
  var BossMovement = new Image();
  BossMovement.src = './img/monsters/Boss/Boss-Movement.png';

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations. ALL OF THESE ANIMATIONS ARE THE SAME. IMPLEMENTED FOR THE SAKE OF CONSISTANCY.
  animations.right.push(new Animation(BossMovement, WIDTH, HEIGHT, 0, 0, 2, true)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(BossMovement, WIDTH, HEIGHT, 0, 0, 2, true)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(BossMovement, WIDTH, HEIGHT, 0, 0, 2, true)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(BossMovement, WIDTH, HEIGHT, 0, 0, 2, true)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());

},{"../animation.js":2}],15:[function(require,module,exports){
/* Bosser Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite HEIGHT (One frame).
  const HEIGHT = 100;
  // The sprite WIDTH (One frame).
  const WIDTH = 86;

  // The movement sprite sheet for the bosser. It is simple, with walking and attacking being the same animation.
  var BosserMovement = new Image();
  BosserMovement.src = './img/monsters/Bosser/Bosser-Movement.png';

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations. ALL OF THESE ANIMATIONS ARE THE SAME. IMPLEMENTED FOR THE SAKE OF CONSISTANCY.
  animations.right.push(new Animation(BosserMovement, WIDTH, HEIGHT, 0, 0, 2, true)); // WALKING // @TODO: Specific Timing may need to be adjusted.
  animations.right.push(new Animation(BosserMovement, WIDTH, HEIGHT, 0, 0, 2, true)); // ATTACKING // @TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(BosserMovement, WIDTH, HEIGHT, 0, 0, 2, true)); // WALKING // @TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(BosserMovement, WIDTH, HEIGHT, 0, 0, 2, true)); // ATTACKING // @TODO Specific Timing may need to be adjusted.

  return animations;

}());

},{"../animation.js":2}],16:[function(require,module,exports){
/* Bossest Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite HEIGHT (One frame).
  const HEIGHT = 100;
  // The sprite WIDTH (One frame).
  const WIDTH = 116;

  // The movement sprite sheet for the Bossest. It is simple, with walking and attacking being the same animation.
  var BossestMovement = new Image();
  BossestMovement.src = './img/monsters/Bossest/Bossest-Movement.png';

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations. ALL OF THESE ANIMATIONS ARE THE SAME. IMPLEMENTED FOR THE SAKE OF CONSISTANCY.
  animations.right.push(new Animation(BossestMovement, WIDTH, HEIGHT, 0, 0, 2, true)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(BossestMovement, WIDTH, HEIGHT, 0, 0, 2, true)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(BossestMovement, WIDTH, HEIGHT, 0, 0, 2, true)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(BossestMovement, WIDTH, HEIGHT, 0, 0, 2, true)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());

},{"../animation.js":2}],17:[function(require,module,exports){
/* Creepo Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Creepo spritesheet
  var CreepoWalkRight = new Image();
  CreepoWalkRight.src = './img/monsters/Creepo/Creepo-Walk-Right.png';

  // The left walking Creepo spritesheet
  var CreepoWalkLeft = new Image();
  CreepoWalkLeft.src = "./img/monsters/Creepo/Creepo-Walk-Left.png";

  // The right attacking Creepo spritesheet
  var CreepoAttackRight = new Image();
  CreepoAttackRight.src = "./img/monsters/Creepo/Creepo-Attack-Right.png";

  // The left attacking Creepo spritesheet
  var CreepoAttackLeft = new Image();
  CreepoAttackLeft.src = "./img/monsters/Creepo/Creepo-Attack-Left.png";

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations.
  animations.right.push(new Animation(CreepoWalkRight, SIZE, SIZE, 0, 0, 5)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(CreepoAttackRight, SIZE, SIZE, 0, 0, 6)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(CreepoWalkLeft, SIZE, SIZE, 0, 0, 5)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(CreepoAttackLeft, SIZE, SIZE, 0, 0, 6)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());

},{"../animation.js":2}],18:[function(require,module,exports){
/* Gunner Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Gunner spritesheet
  var GunnerWalkRight = new Image();
  GunnerWalkRight.src = './img/monsters/Gunner/Gunner-Walk-Right.png';

  // The left walking Gunner spritesheet
  var GunnerWalkLeft = new Image();
  GunnerWalkLeft.src = "./img/monsters/Gunner/Gunner-Walk-Left.png";

  // The right attacking Gunner spritesheet
  var GunnerAttackRight = new Image();
  GunnerAttackRight.src = "./img/monsters/Gunner/Gunner-Attack-Right.png";

  // The left attacking Gunner spritesheet
  var GunnerAttackLeft = new Image();
  GunnerAttackLeft.src = "./img/monsters/Gunner/Gunner-Attack-Left.png";

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations.
  animations.right.push(new Animation(GunnerWalkRight, SIZE, SIZE, 0, 0, 8)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(GunnerAttackRight, SIZE, SIZE, 0, 0, 8)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(GunnerWalkLeft, SIZE, SIZE, 0, 0, 8)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(GunnerAttackLeft, SIZE, SIZE, 0, 0, 8)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());

},{"../animation.js":2}],19:[function(require,module,exports){
/* Puncher Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Puncher spritesheet
  var PuncherWalkRight = new Image();
  PuncherWalkRight.src = './img/monsters/Puncher/Puncher-Walk-Right.png';

  // The left walking Puncher spritesheet
  var PuncherWalkLeft = new Image();
  PuncherWalkLeft.src = "./img/monsters/Puncher/Puncher-Walk-Left.png";

  // The right attacking Puncher spritesheet
  var PuncherAttackRight = new Image();
  PuncherAttackRight.src = "./img/monsters/Puncher/Puncher-Attack-Right.png";

  // The left attacking Puncher spritesheet
  var PuncherAttackLeft = new Image();
  PuncherAttackLeft.src = "./img/monsters/Puncher/Puncher-Attack-Left.png";

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations.
  animations.right.push(new Animation(PuncherWalkRight, SIZE, SIZE, 0, 0, 8)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(PuncherAttackRight, SIZE, SIZE, 0, 0, 10)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(PuncherWalkLeft, SIZE, SIZE, 0, 0, 8)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(PuncherAttackLeft, SIZE, SIZE, 0, 0, 10)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());

},{"../animation.js":2}],20:[function(require,module,exports){
/* Skully Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Skully spritesheet
  var SkullyWalkRight = new Image();
  SkullyWalkRight.src = './img/monsters/Skully/Skully-Walk-Right.png';

  // The left walking Skully spritesheet
  var SkullyWalkLeft = new Image();
  SkullyWalkLeft.src = "./img/monsters/Skully/Skully-Walk-Left.png";

  // The right attacking Skully spritesheet
  var SkullyAttackRight = new Image();
  SkullyAttackRight.src = "./img/monsters/Skully/Skully-Attack-Right.png";

  // The left attacking Skully spritesheet
  var SkullyAttackLeft = new Image();
  SkullyAttackLeft.src = "./img/monsters/Skully/Skully-Attack-Left.png";

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations.
  animations.right.push(new Animation(SkullyWalkRight, SIZE, SIZE, 0, 0, 4)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(SkullyAttackRight, SIZE, SIZE, 0, 0, 4)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(SkullyWalkLeft, SIZE, SIZE, 0, 0, 4)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(SkullyAttackLeft, SIZE, SIZE, 0, 0, 4)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());

},{"../animation.js":2}],21:[function(require,module,exports){
/* Snappy Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Snappy spritesheet
  var SnappyWalkRight = new Image();
  SnappyWalkRight.src = './img/monsters/Snappy/Snappy-Walk-Right.png';

  // The left walking Snappy spritesheet
  var SnappyWalkLeft = new Image();
  SnappyWalkLeft.src = "./img/monsters/Snappy/Snappy-Walk-Left.png";

  // The right attacking Snappy spritesheet
  var SnappyAttackRight = new Image();
  SnappyAttackRight.src = "./img/monsters/Snappy/Snappy-Attack-Right.png";

  // The left attacking Snappy spritesheet
  var SnappyAttackLeft = new Image();
  SnappyAttackLeft.src = "./img/monsters/Snappy/Snappy-Attack-Left.png";

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations.
  animations.right.push(new Animation(SnappyWalkRight, SIZE, SIZE, 0, 0, 4)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(SnappyAttackRight, SIZE, SIZE, 0, 0, 5)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(SnappyWalkLeft, SIZE, SIZE, 0, 0, 4)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(SnappyAttackLeft, SIZE, SIZE, 0, 0, 5)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());

},{"../animation.js":2}],22:[function(require,module,exports){
/* Wingy Monster Entity.
 */
module.exports = (function() {
  var Animation = require('../animation.js');

  // States for the monster
  const WALKING = 0;
  const ATTACKING = 1;

  // The sprite size (It's a square 64 pixels x 64 pixels)
  const SIZE = 64;

  // The right walking Wingy spritesheet
  var WingyWalkRight = new Image();
  WingyWalkRight.src = './img/monsters/Wingy/Wingy-Walk-Right.png';

  // The left walking Wingy spritesheet
  var WingyWalkLeft = new Image();
  WingyWalkLeft.src = "./img/monsters/Wingy/Wingy-Walk-Left.png";

  // The right attacking Wingy spritesheet
  var WingyAttackRight = new Image();
  WingyAttackRight.src = "./img/monsters/Wingy/Wingy-Attack-Right.png";

  // The left attacking Wingy spritesheet
  var WingyAttackLeft = new Image();
  WingyAttackLeft.src = "./img/monsters/Wingy/Wingy-Attack-Left.png";

  var animations = {};
  animations.right = [];
  animations.left = [];

  // The right-facing animations.
  animations.right.push(new Animation(WingyWalkRight, SIZE, SIZE, 0, 0, 5)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.right.push(new Animation(WingyAttackRight, SIZE, SIZE, 0, 0, 5)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  //The left-facing animations
  animations.left.push(new Animation(WingyWalkLeft, SIZE, SIZE, 0, 0, 5)); // WALKING // TODO Specific Timing may need to be adjusted.
  animations.left.push(new Animation(WingyAttackLeft, SIZE, SIZE, 0, 0, 5)); // ATTACKING // TODO Specific Timing may need to be adjusted.

  return animations;

}());

},{"../animation.js":2}],23:[function(require,module,exports){
module.exports = (function()
{
	/////////////////////////////////
	// Prints all debug statements //
	/////////////////////////////////
	DEBUG = false;

	///////////
	// Enums //
	///////////
	Upgrades =
	{
		DOOR: 0,
		ATTACK: 1,
		HEALTH: 2,
		DEFENSE: 3,
		SPECIAL: 4,
		BOSS: 5,
	};
	Object.freeze(Upgrades);

	Strings =
	{
		0: "DOOR",
		1: "ATTACK",
		2: "HEALTH",
		3: "DEFENSE",
		4: "SPECIAL",
		5: "BOSS",
	};
	Object.freeze(Strings);

	// ////////////////////////////////
	// // Assignment of to fix  //
	// // scope stuff for event      //
	// // handlers                   //
	// ////////////////////////////////
	// var self = 

	////////////////
	// Properties //
	////////////////
	currentSelected = undefined;
	currentUpgrade  = undefined;
	totalGold       = 100;
	defaultAddition = 100;
	/* eslint-disable */
	specialProgression = [
								"shop_taunt_special",
								"shop_dodge_special",
								"shop_critical_special",
								"shop_heal_special",
								"shop_none_special",
								];
	/* eslint-enable */
	specialIndex = 0;
	
	///////////////////
	// Audio Manager //
	///////////////////
	am = undefined;

	//////////////////////////////////////
	// Flags for greying out shop items //
	//////////////////////////////////////
	defenseSelectable  = false;
	doorSelectable     = false;
	attackSelectable   = false;
	healthSelectable   = false;
	specialSelectable  = false;
	bossSelectable 	   = false;
	purchaseClickable  = false;

	/////////////////////////////////////
	// Flags for finished upgrade path //
	/////////////////////////////////////
	doorDone     = false;
	defenseDone  = false;
	attackDone   = false;
	healthDone   = false;
	specialDone  = false;
	bossDone 	  = false;

	/////////////////////////////////////
	// Flags for determining if player //
	// has enough money 		       //
	/////////////////////////////////////
	doorEnoughMoney     = false;
	defenseEnoughMoney  = false;
	attackEnoughMoney   = false;
	healthEnoughMoney   = false;
	specialEnoughMoney  = false;
	bossEnoughMoney 	= false;

	////////////////////////////
	// Costs for each upgrade //
	////////////////////////////
	doorCost     = 0;
	defenseCost  = 0;
	attackCost   = 0;
	healthCost   = 0;
	specialCost  = 0;
	bossCost 	 = 0;

	///////////////////////////////////////////
	// Cost progressions for capped upgrades //
	///////////////////////////////////////////
	doorCostProgression    = [ 100, 1000, 2000, 3000, 4000, 5000, 6000 ];
	doorCostIndex          = 0;
	specialCostProgression = [ 300, 700, 1100, 1500 ];
	specialCostIndex       = 0;
	bossCostProgression    = [ 3000, 4500 ];
	bossCostIndex 		   = 0;

	/////////////////////////////////////////
	// Multipliers and base costs for non  //
	// capped upgrades                     //
	/////////////////////////////////////////
	defenseBaseCost = 300;
	defenseCostMult = 1;

	attackBaseCost  = 300;
	attackCostMult  = 1;

	healthBaseCost  = 300;
	healthCostMult  = 1;


	//////////////////////
	// Hooks to the DOM //
	//////////////////////
	doorPlus = document.getElementById("Door_Plus");
	doorPlus.descText = "Adds another door.";
	doorPlus.selected = document.getElementById("Door_Selected");
	doorPlus.addEventListener("click", function(e)
	{
		DoorPlus();
	});

	attackPlus = document.getElementById("AttackCap_Plus");
	attackPlus.descText = "Increases attack cap.";
	attackPlus.selected = document.getElementById("Attack_Selected");
	attackPlus.addEventListener("click", function(e)
	{
		AttackPlus();
	});

	healthPlus = document.getElementById("HealthCap_Plus");
	healthPlus.descText = "Increases health cap.";
	healthPlus.selected = document.getElementById("Health_Selected");

	healthPlus.addEventListener("click", function(e)
	{
		HealthPlus();
	});

	defensePlus = document.getElementById("DefenseCap_Plus");
	defensePlus.descText = "Increases defense cap.";
	defensePlus.selected = document.getElementById("Defense_Selected");
	defensePlus.addEventListener("click", function(e)
	{
		DefensePlus();
	});

	special = document.getElementById("Special");
	special.selected = document.getElementById("Special_Selected");
	special.addEventListener("click", function(e)
	{
		Special();
	});

	boss = document.getElementById("Boss");
	boss.descText = "Upgrades leader stats";
	boss.selected = document.getElementById("Boss_Selected");
	boss.addEventListener("click", function(e)
	{
		Boss();
	});

	purchaseBtn = document.getElementById("Purchase_Button");
	purchaseBtn.addEventListener("click", function(e)
	{
		PurchaseBtn();
	});

	currentSpecial = document.getElementById(specialProgression[specialIndex]);


	// =-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


	descriptionText = document.getElementById("Description_Text");
	goldText        = document.getElementById("Gold_Text");
	doorText        = document.getElementById("Door_Cost");
	attackText      = document.getElementById("Attack_Cost");
	defenseText     = document.getElementById("Defense_Cost");
	healthText      = document.getElementById("Health_Cost");
	specialText     = document.getElementById("Special_Cost");
	bossText    	 = document.getElementById("Boss_Cost");

	doorGrey        = document.getElementById("Door_Grey");
	attackGrey      = document.getElementById("Attack_Grey");
	healthGrey      = document.getElementById("Health_Grey");
	defenseGrey     = document.getElementById("Defense_Grey");
	specialGrey     = document.getElementById("Special_Grey");
	bossGrey    	 = document.getElementById("Boss_Grey");
	purchaseGrey    = document.getElementById("Purchase_Grey");

	SetGoldText();
	UpdateCosts();

	/**
	 * Function: SetGoldText
	 *
	 * Sets the total gold text. essentially updates
	 * 		the player wallet
	 *
	 */
	function SetGoldText()
	{
		goldText.textContent = "Gold: " + totalGold;
	};

	////////////////////////////
	// Cost setting functions //
	////////////////////////////

	function SetDoorCost(val)
	{
		doorCost = val;
		doorText.textContent = doorCost;
	};

	function SetAttackCost(val)
	{
		attackCost = val;
		attackText.textContent = attackCost;
	};

	function SetDefenseCost(val)
	{
		defenseCost = val;
		defenseText.textContent = defenseCost;
	};

	function SetHealthCost(val)
	{
		healthCost = val;
		healthText.textContent = healthCost;
	};

	function SetSpecialCost(val)
	{
		specialCost = val;
		specialText.textContent = specialCost;
	};

	function SetBossCost(val)
	{
		bossCost = val;
		bossText.textContent = bossCost;
	};

	/////////////////////////////////////////
	// Gold addition/subtraction functions //
	/////////////////////////////////////////

	/**
	 * Function: AddGold
	 *
	 * Essentially adds currency to player wallet.
	 *
	 * Parameters:
	 *
	 *   amt - {optional} the amount to be added, if not
	 *         		supplied then it defaults to
	 *           	defaultAddition of shop
	 *            	manager
	 *
	 */
	function AddGold(amt)
	{
		var val = amt || defaultAddition;
		val = Math.floor(val);
		totalGold += val;
		UpdateItemGrey();
		SetGoldText();
	};


	function SubtractGold(amt)
	{
		totalGold -= amt;
		SetGoldText();
	};

	function UpdateAgainstWallet()
	{
		doorEnoughMoney     = totalGold >= doorCost;
		attackEnoughMoney   = totalGold >= attackCost;
		defenseEnoughMoney  = totalGold >= defenseCost;
		healthEnoughMoney   = totalGold >= healthCost;
		specialEnoughMoney  = totalGold >= specialCost;
		bossEnoughMoney 	 = totalGold >= bossCost;
	};

	function UpdateSelectable()
	{
		doorSelectable     = doorEnoughMoney && !doorDone;
		attackSelectable   = attackEnoughMoney && !attackDone;
		defenseSelectable  = defenseEnoughMoney && !defenseDone;
		healthSelectable   = healthEnoughMoney && !healthDone;
		specialSelectable  = specialEnoughMoney && !specialDone;
		bossSelectable 	= bossEnoughMoney && !bossDone;
	};

	function UpdateCosts()
	{
		// capped upgrades
		doorCost    = doorCostProgression[doorCostIndex];
		specialCost = specialCostProgression[specialCostIndex];
		bossCost  	 = bossCostProgression[bossCostIndex];

		// non capped
		attackCost  = attackBaseCost * attackCostMult;
		defenseCost = defenseBaseCost * defenseCostMult;
		healthCost  = healthBaseCost * healthCostMult;

		// Updating text
		doorText.textContent     = doorCost;
		attackText.textContent   = attackCost;
		defenseText.textContent  = defenseCost;
		healthText.textContent   = healthCost;
		specialText.textContent  = specialCost;
		bossText.textContent 	  = bossCost;
	};

	function UpdateItemGrey()
	{
		UpdateCosts();
		UpdateAgainstWallet();
		UpdateSelectable();

		switch (currentUpgrade)
		{
			case 0: // Door
				if (!doorSelectable)
				{
					purchaseClickable = false;
				}
				break;

			case 1: // Attack
				if (!attackSelectable)
				{
					purchaseClickable = false;
				}
				break;

			case 2: // Health
				if (!healthSelectable)
				{
					purchaseClickable = false;
				}
				break;

			case 3: // Defense
				if (!defenseSelectable)
				{
					purchaseClickable = false;
				}
				break;

			case 4: // Special
				if (!specialSelectable)
				{
					purchaseClickable = false;
				}
				break;

			case 5: // Boss
				if (!bossSelectable)
				{
					purchaseClickable = false;
				}
				break;
		}
		UpdatePurchaseBtn();

		if (doorSelectable)
		{
			doorGrey.setAttribute("opacity", "0");
		}
		else
		{
			doorGrey.setAttribute("opacity", "0.65");
		}

		if (attackSelectable)
		{
			attackGrey.setAttribute("opacity", "0");
		}
		else
		{
			attackGrey.setAttribute("opacity", "0.65");
		}

		if (healthSelectable)
		{
			healthGrey.setAttribute("opacity", "0");
		}
		else
		{
			healthGrey.setAttribute("opacity", "0.65");
		}

		if (defenseSelectable)
		{
			defenseGrey.setAttribute("opacity", "0");
		}
		else
		{
			defenseGrey.setAttribute("opacity", "0.65");
		}

		if (specialSelectable)
		{
			specialGrey.setAttribute("opacity", "0");
		}
		else
		{
			specialGrey.setAttribute("opacity", "0.65");
		}

		if (bossSelectable)
		{
			bossGrey.setAttribute("opacity", "0");
		}
		else
		{
			bossGrey.setAttribute("opacity", "0.65");
		}
	};

	function UpdatePurchaseBtn()
	{
		if (purchaseClickable)
		{
			purchaseGrey.setAttribute("opacity", "0");
		}
		else
		{
			purchaseGrey.setAttribute("opacity", "0.65");
		}
	};


	function SetStatsManagerDelegates(attack, defense, health, special, door, boss)
	{
		if (DEBUG) { console.log("ShopManager: StatsManager delegates being set."); }
		increaseAttack = attack;
		increaseDefense = defense;
		increaseHealth = health;
		addSpecial = special;
		openDoor = door;
		upgradeBoss = boss;
	};

	function SetAudioManager(val)
	{
		am = val;
	}

	////////////////////////
	// UI Update handlers //
	////////////////////////

	function DoorPlus()
	{
		if (DEBUG) { console.log("ShopManager: Door Plus Clicked"); }
		descriptionText.textContent = doorPlus.descText;
		currentUpgrade = Upgrades.DOOR;
		am.playClickSFX();
		if (currentSelected != undefined)
		{
			currentSelected.setAttribute("stroke-opacity", "0");
			currentSelected = doorPlus.selected;
			currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			currentSelected = doorPlus.selected;
			currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (doorSelectable)
		{
			purchaseClickable = true;
			UpdatePurchaseBtn();
		}
		else
		{
			purchaseClickable = false;
			UpdatePurchaseBtn();
		}
	};

	function AttackPlus()
	{
		if (DEBUG) { console.log("ShopManager: Attack Plus Clicked"); }
		descriptionText.textContent = attackPlus.descText;
		currentUpgrade = Upgrades.ATTACK;
		am.playClickSFX();
		if (currentSelected != undefined)
		{
			currentSelected.setAttribute("stroke-opacity", "0");
			currentSelected = attackPlus.selected;
			currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			currentSelected = attackPlus.selected;
			currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (attackSelectable)
		{
			purchaseClickable = true;
			UpdatePurchaseBtn();
		}
		else
		{
			purchaseClickable = false;
			UpdatePurchaseBtn();
		}
	};

	function HealthPlus()
	{
		if (DEBUG) { console.log("ShopManager: Health Plus Clicked"); }
		descriptionText.textContent = healthPlus.descText;
		currentUpgrade = Upgrades.HEALTH;
		am.playClickSFX();
		if (currentSelected != undefined)
		{
			currentSelected.setAttribute("stroke-opacity", "0");
			currentSelected = healthPlus.selected;
			currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			currentSelected = healthPlus.selected;
			currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (healthSelectable)
		{
			purchaseClickable = true;
			UpdatePurchaseBtn();
		}
		else
		{
			purchaseClickable = false;
			UpdatePurchaseBtn();
		}
	};

	function DefensePlus()
	{
		if (DEBUG) { console.log("ShopManager: Defense Plus Clicked"); }
		descriptionText.textContent = defensePlus.descText;
		currentUpgrade = Upgrades.DEFENSE;
		am.playClickSFX();
		if (currentSelected != undefined)
		{
			currentSelected.setAttribute("stroke-opacity", "0");
			currentSelected = defensePlus.selected;
			currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			currentSelected = defensePlus.selected;
			currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (defenseSelectable)
		{
			purchaseClickable = true;
			UpdatePurchaseBtn();
		}
		else
		{
			purchaseClickable = false;
			UpdatePurchaseBtn();
		}
	};

	function Special()
	{
		if (DEBUG) { console.log("ShopManager: Special Clicked"); }
		descriptionText.textContent = currentSpecial.getAttribute("desc");
		currentUpgrade = Upgrades.SPECIAL;
		am.playClickSFX();
		if (currentSelected != undefined)
		{
			currentSelected.setAttribute("stroke-opacity", "0");
			currentSelected = special.selected;
			currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			currentSelected = special.selected;
			currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (specialSelectable && !specialDone)
		{
			purchaseClickable = true;
			UpdatePurchaseBtn();
		}
		else
		{
			purchaseClickable = false;
			UpdatePurchaseBtn();
		}
	};

	function Boss()
	{
		if (DEBUG) { console.log("ShopManager: Boss Clicked"); }
		descriptionText.textContent = boss.descText;
		currentUpgrade = Upgrades.BOSS;
		am.playClickSFX();
		if (currentSelected != undefined)
		{
			currentSelected.setAttribute("stroke-opacity", "0");
			currentSelected = boss.selected;
			currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			currentSelected = boss.selected;
			currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (bossSelectable)
		{
			purchaseClickable = true;
			UpdatePurchaseBtn();
		}
		else
		{
			purchaseClickable = false;
			UpdatePurchaseBtn();
		}
	};

	function PurchaseBtn()
	{
		if (purchaseClickable)
		{
			if (DEBUG) { console.log("ShopManager: PurchaseBtn Clicked"); }
			console.log("Upgrade: " + Strings[currentUpgrade]);

			am.playClickSFX();
			/* eslint-disable */
			switch (currentUpgrade)
			{
				case 0: // Door
					if (DEBUG) { console.log("ShopManager: Opening new door."); }
					openDoor();
					SubtractGold(doorCost);
					doorCostIndex++;
					if (doorCostIndex == doorCostProgression.length)
					{
						doorDone = true;
						doorSelectable = false;
						purchaseClickable = false;
						UpdatePurchaseBtn();
					}
					break;

				case 1: // Attack
					if (DEBUG) { console.log("ShopManager: Increasing attack cap."); }
					increaseAttack();
					SubtractGold(attackCost);
					attackCostMult++;
					break;

				case 2: // Health
					if (DEBUG) { console.log("ShopManager: Increasing health cap."); }
					increaseHealth();
					SubtractGold(healthCost);
					healthCostMult++;
					break;

				case 3: // Defense
					if (DEBUG) { console.log("ShopManager: Increasing defense cap."); }
					increaseDefense();
					SubtractGold(defenseCost);
					defenseCostMult++;
					break;

				case 4: // Special
					if (DEBUG) { console.log("ShopManager: Buying new special."); }
					var spec = specialProgression[specialIndex];
					document.getElementById(specialProgression[specialIndex]).
							setAttribute("opacity", "0");
					specialIndex++;
					console.log(specialIndex);
					var s = document.getElementById(specialProgression[specialIndex]);
					s.setAttribute("opacity", "1");
					currentSpecial = s;
					descriptionText.textContent = s.getAttribute('desc');
					SubtractGold(specialCost);
					if (specialIndex == specialProgression.length - 1)
					{
						specialDone = true;
						specialSelectable = false;
						purchaseClickable = false;
						UpdatePurchaseBtn();
					}
					specialCostIndex++;
					addSpecial("stats_" + spec.substring(5));
					break;

				case 5: // Boss
					if (DEBUG) { console.log("ShopManager: Upgrading Boss"); }
					upgradeBoss();
					SubtractGold(bossCost);
					bossCostIndex++;
					if (bossCostIndex == bossCostProgression.length)
					{
						document.getElementById("shop_leader").setAttribute("opacity", "0");
						document.getElementById("shop_leader_none").setAttribute("opacity", "1");
						boss.descText = "No more leader upgrades";
						descriptionText.textContent = boss.descText;
						bossDone = true;
						bossSelectable = false;
						purchaseClickable = false;
						UpdatePurchaseBtn();
					}
					break;
			}
			/* eslint-enable */
			UpdateItemGrey();
		}
		else
		{
			if (DEBUG) { console.log("ShopManager: PurchaseBtn not clickable."); }
		}
	};

	return {
		AddGold                  : AddGold,
		SetStatsManagerDelegates : SetStatsManagerDelegates,
		SetAudioManager          : SetAudioManager,
	};
})();
},{}],24:[function(require,module,exports){
module.exports = (function() {

  function Door(x, y) {
    this.x = x;
    this.y = y;
    this.avaliable = true;
  }

	function Door(x, y) {
		this.x = x;
		this.y = y;
		this.avaliable = true;
		this.open = false;
	}

	// Door.prototype.render = function(cntx)
	// {
	// 	var color;
	// 	if (this.open)
	// 	{
	// 		if (this.avaliable)
	// 		{
	// 			color = Colors.BLUE;
	// 		}
	// 		else
	// 		{
	// 			color = Colors.RED;
	// 		}
	// 	}
	// 	else
	// 	{
	// 		color = Colors.GREY;
	// 	}
	// 	cntx.save();
	// 	cntx.beginPath();
	// 	cntx.lineWidth = 5;
	// 	cntx.strokeStyle = color;
	// 	console.log("Stroke: " + cntx.strokeStyle);
	// 	cntx.arc(
	// 		this.x,
	// 		this.y,
	// 		32,
	// 		0,
	// 		2 * Math.PI
	// 		);
	// 	cntx.stroke();
	// 	cntx.closePath();
	// 	cntx.restore();
	// }

	return Door;

}());

},{}],25:[function(require,module,exports){
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
},{"./credits.js":3,"./help_stats.js":10}],26:[function(require,module,exports){
/* Author: Nic Johnson
 *
 * Title: StatsManager.js
 *
 * Description: StatsManger for monster stats UI
 * 			in Monster Arena for CIS 580 final
 * 			project
 *
 *
 * History:
 * 		December 06, 2015:
 *  		-Date Created
 *  	December 7, 2015:
 *  		-Redid implementation away from Entity-style
 *  			because javascript scope is stupid.
 *     December 13, 2015:
 *     		- Whole bunch of stuff because i forgot to update this list
 */
module.exports = (function()
{

	//////////////////////////////////////
	// Value for outputting debug code. //
	//////////////////////////////////////
	var DEBUG = false;

	//////////////////////////////////////
	// Default values for start of game //
	//////////////////////////////////////
	var startingAttackVal = 1;
	var startingDefenseVal = 1;
	var startingHealthVal = 1;

	var attackCap = 3;
	var defenseCap = 3;
	var healthCap = 3;

	var attackFloor = 1;
	var defenseFloor = 1;
	var healthFloor = 1;

	///////////////////
	// Actual values //
	///////////////////
	var attackVal = startingAttackVal;
	var defenseVal = startingDefenseVal;
	var healthVal = startingHealthVal;
	var specialContent = undefined;
	var spawnDelegate = undefined;
	
	///////////////////
	// Audio Manager //
	///////////////////
	var am = undefined;

	/* eslint-disable */
	var specialList = [
						"stats_none_special",
					];
	/* eslint-enable */
	var specialIndex = 0;

	////////////////
	// Text hooks //
	////////////////
	var attackText = document.getElementById("Attack_Text");
	attackText.textContent = attackVal;

	var defenseText = document.getElementById("Defense_Text");
	defenseText.textContent = defenseVal;

	var healthText = document.getElementById("Health_Text");
	healthText.textContent = healthVal;

	var specialText = document.getElementById("Special_Desc");
	specialText.textContent = "No special";

	////////////////////////
	// Button Click Hooks //
	////////////////////////
	var attackPlus = document.getElementById("Attack_Plus");
	var attackPlus1 = document.getElementById("attackPlus1");
	var attackPlus2 = document.getElementById("attackPlus2");
	attackPlus.addEventListener("click", AttackPlus);

	var attackMinus = document.getElementById("Attack_Minus");
	var attackMinus1 = document.getElementById("attackMinus1");
	attackMinus.addEventListener("click", AttackMinus);

	var defensePlus = document.getElementById("Defense_Plus");
	var defensePlus1 = document.getElementById("defensePlus1");
	var defensePlus2 = document.getElementById("defensePlus2");
	defensePlus.addEventListener("click", DefensePlus);

	var defenseMinus = document.getElementById("Defense_Minus");
	var defenseMinus1 = document.getElementById("defenseMinus1");
	defenseMinus.addEventListener("click", DefenseMinus);

	var healthPlus = document.getElementById("Health_Plus");
	var healthPlus1 = document.getElementById("healthPlus1");
	var healthPlus2 = document.getElementById("healthPlus2");
	healthPlus.addEventListener("click", HealthPlus);

	var healthMinus = document.getElementById("Health_Minus");
	var healthMinus1 = document.getElementById("healthMinus1");
	healthMinus.addEventListener("click", HealthMinus);

	var specialUp = document.getElementById("Special_Up");
	specialUp.addEventListener("click", SpecialUp);

	var specialDown = document.getElementById("Special_Down");
	specialDown.addEventListener("click", SpecialDown);

	var spawnButton = document.getElementById("Spawn_Button");
	spawnButton.addEventListener("click", SpawnMonster);

	///////////////////////
	// Handler Functions //
	///////////////////////
	function AttackPlus()
	{
		if (DEBUG) { console.log("StatsManager: Attack +1 Clicked"); }
		if (attackVal < attackCap)
		{
			attackVal++;
			attackText.textContent = attackVal;
		}

		if (attackVal == attackCap)
		{
			attackPlus1.setAttribute("stroke", "#b3b3b3");
			attackPlus2.setAttribute("stroke", "#b3b3b3");
		}

		attackMinus1.setAttribute("stroke", "#000000");
		am.playClickSFX();
	}

	function AttackMinus()
	{
		if (DEBUG) { console.log("StatsManager: Attack -1 Clicked"); }
		if (attackVal > attackFloor)
		{
			attackVal--;
			attackText.textContent = attackVal;
		}

		if (attackVal == attackFloor)
		{
			attackMinus1.setAttribute("stroke", "#b3b3b3");
		}

		attackPlus1.setAttribute("stroke", "#000000");
		attackPlus2.setAttribute("stroke", "#000000");
		am.playClickSFX();
	}

	function DefensePlus()
	{
		if (DEBUG) { console.log("StatsManager: Defense +1 Clicked"); }
		if (defenseVal < defenseCap)
		{
			defenseVal++;
			defenseText.textContent = defenseVal;
		}

		if (defenseVal == defenseCap)
		{
			defensePlus1.setAttribute("stroke", "#b3b3b3");
			defensePlus2.setAttribute("stroke", "#b3b3b3");
		}

		defenseMinus1.setAttribute("stroke", "#000000");
		am.playClickSFX();
	}

	function DefenseMinus()
	{
		if (DEBUG) { console.log("StatsManager: Defense -1 Clicked"); }
		if (defenseVal > defenseFloor)
		{
			defenseVal--;
			defenseText.textContent = defenseVal;
		}

		if (defenseVal == defenseFloor)
		{
			defenseMinus1.setAttribute("stroke", "#b3b3b3");
		}

		defensePlus1.setAttribute("stroke", "#000000");
		defensePlus2.setAttribute("stroke", "#000000");
		am.playClickSFX();
	}

	function HealthPlus()
	{
		if (DEBUG) { console.log("StatsManager: Health +1 Clicked"); }
		if (healthVal < healthCap)
		{
			healthVal++;
			healthText.textContent = healthVal;
		}

		if (healthVal == healthCap)
		{
			healthPlus1.setAttribute("stroke", "#b3b3b3");
			healthPlus2.setAttribute("stroke", "#b3b3b3");
		}

		healthMinus1.setAttribute("stroke", "#000000");
		am.playClickSFX();
	}


	function HealthMinus()
	{
		if (DEBUG) { console.log("StatsManager: Health -1 Clicked."); }
		if (healthVal > healthFloor)
		{
			healthVal--;
			healthText.textContent = healthVal;
		}

		if (healthVal == healthFloor)
		{
			healthMinus1.setAttribute("stroke", "#b3b3b3");
		}

		healthPlus1.setAttribute("stroke", "#000000");
		healthPlus2.setAttribute("stroke", "#000000");
		am.playClickSFX();
	}

	// 1 is up
	// -1 is down
	function UpdateSpecial(dir)
	{
		var current = document.getElementById(specialList[specialIndex]);
		current.setAttribute("opacity", "0");
		if (dir == 1)
		{
			if (specialIndex < specialList.length - 1)
			{
				specialIndex++;
			}
			else
			{
				specialIndex = 0;
			}
		}
		if (dir == -1)
		{
			if (specialIndex > 0)
			{
				specialIndex--;
			}
			else
			{
				specialIndex = specialList.length - 1;
			}
		}
		current = document.getElementById(specialList[specialIndex]);
		current.setAttribute("opacity", "1");
		switch(specialList[specialIndex])
		{
			case "stats_none_special":
				specialContent = "none";
				break;

			case "stats_dodge_special":
				specialContent = "dodge";
				break;

			case "stats_critical_special":
				specialContent = "crit";
				break;

			case "stats_heal_special":
				specialContent = "heal";
				break;

			case "stats_taunt_special":
				specialContent = "taunt";
				break;
		}
		specialText.textContent = current.getAttribute("desc");
	}

	function SpecialUp()
	{
		if (DEBUG) { console.log("StatsManager: Special Up Clicked."); }
		am.playClickSFX();
		UpdateSpecial(1);
	}

	function SpecialDown()
	{
		if (DEBUG) { console.log("StatsManager: Special Down Clicked."); }
		am.playClickSFX();
		UpdateSpecial(-1);
	}

	///////////////////////
	// Exposed Functions //
	///////////////////////

	function IncreaseAttackCap(val)
	{
		if (DEBUG) { console.log("StatsManager: Increasing Attack Cap"); }
		var amt = val || 1;
		attackCap += amt;
		RefreshButtonGrey();
	}

	function IncreaseDefenseCap(val)
	{
		if (DEBUG) { console.log("StatsManager: Increasing Defense Cap"); }
		var amt = val || 1;
		defenseCap += amt;
		RefreshButtonGrey();
	}

	function IncreaseHealthCap(val)
	{
		if (DEBUG) { console.log("StatsManager: Increasing Health Cap"); }
		var amt = val || 1;
		healthCap += amt;
		RefreshButtonGrey();
	}

	function RefreshButtonGrey()
	{
		if (healthVal < healthCap)
		{
			healthPlus1.setAttribute("stroke", "#000000");
			healthPlus2.setAttribute("stroke", "#000000");
		}
		if (attackVal < attackCap)
		{
			attackPlus1.setAttribute("stroke", "#000000");
			attackPlus2.setAttribute("stroke", "#000000");
		}
		if (defenseVal < defenseCap)
		{
			defensePlus1.setAttribute("stroke", "#000000");
			defensePlus2.setAttribute("stroke", "#000000");
		}
	}

	function SetSpawnDelegate(val)
	{
		spawnDelegate = val;
	}

	function SetAudioManager(val)
	{
		am = val;
	}

	function SpawnMonster()
	{
		if (DEBUG) { console.log("StatsManager: SpawnMonster Clicked"); }
		if (spawnDelegate === undefined)
		{
			console.log("Spawn Delegate not set.");
		}
		else
		{
			am.playClickSFX();
			spawnDelegate(GetCurrentStats());
		}
	}

	function AddSpecial(specialName)
	{
		specialList.push(specialName);
	}

	function GetCurrentStats()
	{
		if (DEBUG) { console.log("StatsManager: Polling Current Monster Stats"); }
		return {
			attack: attackVal,
			defense: defenseVal,
			health: healthVal,
			special: specialContent,
		};
	}

	function GetCurrentCaps()
	{
		return "Attack: " + attackCap +
				"\nDefense: " + defenseCap +
				"\nHealth: " + healthCap;
	}

	return {
		GetCurrentStats    : GetCurrentStats,
		SpawnMonster       : SpawnMonster,
		SetSpawnDelegate   : SetSpawnDelegate,
		GetCurrentCaps     : GetCurrentCaps,
		IncreaseAttackCap  : IncreaseAttackCap,
		IncreaseDefenseCap : IncreaseDefenseCap,
		IncreaseHealthCap  : IncreaseHealthCap,
		AddSpecial         : AddSpecial,
		SetAudioManager    : SetAudioManager,
	};

})();

},{}]},{},[12]);
