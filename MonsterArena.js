(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * ==============
 * Script ID Data
 * ==============
 * File Name: AudioManager.js
 * Version Date: ad-2015-12-12 20:10:00
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
 * ad-2015-12-12 20:10:00   	(0,0,1)(0,7,231)(1,12,12)(20,10,0)	Naming fixes
 *			0-00-01 | 00-07-E7 | 01-0C-0C | 14-01-00
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
 * playLevelUpSFX		Plays the Level Up sound (by ...starts)
 * playUpgradeSFX			Plays the Upgrade sound (by ..."^^")
 * playBuffSFX			Plays the Buff sound (by ..."^^")
 * playDebuffSFX			Plays the Debuff sound (by ..."^^")
 * playClickSFX			Plays the Click Sound sound (by ... "^^")
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
 *		CLICKSOUND: 8
 *	Strings - The corresponding string names
 *		0: "IDLEMUSIC",
 *		1: "BATTLEMUSIC",
 *		2: "WINMUSIC",
 *		3: "LOSEMUSIC",
 *		4: "LEVELUPSOUND",
 *		5: "UPGRADESOUND",
 *		6: "BUFFSOUND",
 *		7: "DEBUFFSOUND",
 *		8: "CLICKSOUND"
 *	MusicFiles - The file paths for the music files
 *		0: "audio/MAIdleMusic.wav",
 *		1: "audio/MABattleMusic.wav",
 *		2: "audio/MAWinMusic.wav",
 *		3: "audio/MALoseMusic.wav",
 *		4: "audio/MALevelUpSound.wav",
 *		5: "audio/MAUpgradeSound.wav",
 *		6: "audio/MABuffSound.wav", 
 *		7: "audio/MADebuffSound.wav", *
 *		8: "audio/MAClickSound.wav"
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
		CLICKSOUND: 8
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
		8: "CLICKSOUND"
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
		8: "audio/MAClickSound.wav"
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

},{}],3:[function(require,module,exports){
module.exports = (function() {

  var Hero = require('./hero.js');
  var Door = require('./spawner');
  var Monster = require('./monster.js');
  var doors = [];
  var monsters = [];
  var unlocked_doors = 1;

  var hero;

  // Value followed by scaling
  var HERO_STATS = {
    health: [2, 1.2],
    attack: [3, 1.2],
    defense: [2, 1.1],
    exp: [0, 1.2]
  };

  var ARENA_WIDTH; //TODO
  var ARENA_HEIGHT; //TODO
  var OFFSET = 64;

  function initialize() {
    doors[0] = new Door(ARENA_WIDTH / 2, OFFSET); // North
    doors[1] = new Door(ARENA_WIDTH - OFFSET, ARENA_HEIGHT / 2); // East
    doors[2] = new Door(ARENA_WIDTH / 2, ARENA_HEIGHT - OFFSET); //South
    doors[3] = new Door(OFFSET, ARENA_HEIGHT / 2); // West
    doors[4] = new Door(ARENA_WIDTH * 0.75, ARENA_HEIGHT * 0.25); // North-East
    doors[5] = new Door(ARENA_WIDTH * 0.75, ARENA_HEIGHT * 0.75); // South-East
    doors[6] = new Door(ARENA_WIDTH * 0.25, ARENA_HEIGHT * 0.75); // South-West
    doors[7] = new Door(ARENA_WIDTH * 0.25, ARENA_HEIGHT * 0.25); // North-West

    hero = new Hero(HERO_STATS, ARENA_WIDTH / 2 - 32, ARENA_HEIGHT / 2 - 32, this);
  }

  function update() {
    for (var i = 0; i < monsters.length; i++) {
      monsters[i].doTurn();
    }
  }

  function open_door() {
    if (unlocked_doors < doors.length) {
      unlocked_doors++;
    }
  }

  function spawn_monster(stats) {
    var d = null;
    for (var i = 1; i > unlocked_doors; i++) {
      if (doors[i].avaliable) {
        d = doors[i];
        break;
      }
    }
    if (d) {
      var m = new Monster(stats, i);
      d.avaliable = false;
      monsters.push(m);
    }
  }

  return {
    initialize: initialize,
    update: update,
    open_door: open_door,
    spawn_monster: spawn_monster,
  };

}());

},{"./hero.js":5,"./monster.js":6,"./spawner":8}],4:[function(require,module,exports){
window.onload = function() {

  // The width & height of the screen
  SCREEN_WIDTH = 1280;
  SCREEN_HEIGHT = 720;

  // Module variables
  var Hero = require('./hero.js'),
  EntityManager = require('./entity_manager.js');
  ShopManager = require('./shop_manager.js');
  StatsManager = require('./stats_manager.js');
  AudioManager = require('./AudioManager.js');

  StatsManager.SetSpawnDelegate = EntityManager.spawn_monster;


  ShopManager.SetStatsManagerDelegates(StatsManager.IncreaseAttackCap,
    StatsManager.IncreaseDefenseCap, StatsManager.IncreaseHealthCap);

  AudioManager.playIdleMusic();


  var load = function(sm) {
    EntityManager.initialize();
    //TODO Menu/game state
    //TODO start game loop
  };

  var update = function(elapsedTime) {
    EntityManager.update();
  };


  var render = function() {
    //TODO
  };

}

},{"./AudioManager.js":1,"./entity_manager.js":3,"./hero.js":5,"./shop_manager.js":7,"./stats_manager.js":9}],5:[function(require,module,exports){
module.exports = (function(){
  var Entity = require('./entity.js');

  Hero.prototype = new Entity();



  function Hero(stats, x, y, EntityManager){
    this.health = stats.health[0];
    this.health_scale = stats.health[1];
    this.attack = stats.attack[0];
    this.attack_scale = stats.attack[1];
    this.defene = stats.defense[0];
    this.defense_scale = stats.defense[1];
    this.exp_scale = stats.exp[1];
    this.EntityManager = EntityManager;

    this.exp = 0;
    this.req_exp = 10;
    this.level = 0;

    this.x = x;
    this.y = y;
  }

  Hero.prototype.levelup = function() {
    this.health *= this.health_scale;
    this.attack *= this.attack_scale;
    this.defense *= this.defense_scale;
    this.req_exp ^= this.exp_scale;
    this.exp = 0;
  };

  Hero.prototype.attacked = function(amount) {
    //Temporary
    var damage = amount - this.defense / 2;
    this.health -= damage;
    if (this.health >= 0) {
      //TODO die
    }
  };

  Hero.prototype.doTurn = function() {
    if (this.exp >= this.req_exp) {
      this.levelup();
    }
    //TODO TARGET MONSTER AND ATTACK
  };

   return Hero;

}());

},{"./entity.js":2}],6:[function(require,module,exports){
/* Base class for each monster.
 * It inherits from the generic entity class.
 */
module.exports = (function() {
  var Entity = require('./entity.js');

  Monster.prototype = new Entity();

  function Monster(stats, doorID) {
    this.health = stats.health;
    this.attack = stats.attack;
    this.defense = stats.defense;
    this.doorID = doorID;
    this.specials = stats.specials;
    this.state = 0;

    this.cx = document.getElementById('svgArea').width.baseVal.value / 2.0;
    this.cy = document.getElementById('svgArea').height.baseVal.value / 2.0;

    // Create an animations property, with arrays for each direction of animations.
    this.animations = {
      left: [],
      right: []
    };

    //TODO modify according to center of door.
    this.x = this.door.x + 32;
    this.y = this.door.y + 32;
    this.angle = undefined;

    //determines change in x and y for every movment
    if (this.x == this.cx) {
      if (this.y > this.cy) {
        this.angle = 270;
      } else {
        this.angle = 90;
      }
    } else if (this.y == this.cy) {
      if (this.x > this.cx) {
        this.angle = 0;
      } else {
        this.angle = 180;
      }
    } else if (this.x < this.cx) {
      if (this.y < this.cy) {
        this.angle = 135;
      } else {
        this.angle = 225;
      }
    } else if (this.y < this.cy) {
      this.angle = 45;
    } else {
      this.angle = 315;
    }
    this.angle = this.angle * Math.PI / 180;
    if (this.angle === 0) {
      this.dx = -1;
      this.dy = 0;
    } else if (this.angle == 45) {
      this.dx = -Math.sqrt(2) / 2;
      this.dy = Math.sqrt(2) / 2;
    } else if (this.angle == 90) {
      this.dx = 0;
      this.dy = 1;
    } else if (this.angle == 135) {
      this.dx = Math.sqrt(2) / 2;
      this.dy = Math.sqrt(2) / 2;
    } else if (this.angle == 180) {
      this.dx = 1;
      this.dy = 0;
    } else if (this.angle == 225) {
      this.dx = Math.sqrt(2) / 2;
      this.dy = -Math.sqrt(2) / 2;
    } else if (this.angle == 270) {
      this.dx = 0;
      this.dy = -1;
    } else if (this.angle == 315) {
      this.dx = -Math.sqrt(2) / 2;
      this.dy = -Math.sqrt(2) / 2;
    }
  }

  Monster.prototype.attacked = function(amount) {
    //Temporary
    this.health -= damage - this.defense;
    if (this.health >= 0) {
      //TODO die
      return this.health + this.attack + this.defense;
    }
    return 0;
  };

  //n is the number of frames*numberofpixelsperframe since last update (dx & dy calculated for move of 1 pixel)
  Monster.prototype.doTurn = function(n) {
    //Check if movement needed based on which direction it is coming in from.
    var a = math.floor(this.angle*180/Math.PI);
	if(a==135||a==180||a==225){
		if(this.x <=this.cx-96){
			this.x += n * dx;
			this.y += n * dy;
		}
	}
	else if(a==45||a==0||a==315){
		if(this.x>=this.cx+32){
			this.x += n * dx;
			this.y += n * dy;
		}
	}
    else if(a==90){
		if(this.y<=this.cy-96){
			this.x += n * dx;
			this.y += n * dy;
		}
	}
	else if(a==270){
		if(this.y>=this.cy+32){
			this.x += n * dx;
			this.y += n * dy;
		}
	}
    //TODO CHECK RANGE

    //TODO specials


  };

  return Monster;

}());

},{"./entity.js":2}],7:[function(require,module,exports){
/* Author: Nic Johnson
 *
 * Title: ShopManager.js
 *
 * Description: manages the upgrade shop for 
 * 		MonsterArena
 * 
 *
 * History:
 * 		December 08, 2015: 
 *  		-Date Created
 */

module.exports = (function()
{
	function ShopManager()
	{
		/////////////////////////////////
		// Prints all debug statements //
		/////////////////////////////////
		this.DEBUG = true;

		///////////
		// Enums //
		///////////
		this.Upgrades = 
		{
			DOOR: 0,
			ATTACK: 1,
			HEALTH: 2,
			DEFENSE: 3,
			OTHER1: 4,
			OTHER2: 5,
		};
		Object.freeze(this.Upgrades);

		this.Strings = 
		{
			0: "DOOR",
			1: "ATTACK",
			2: "HEALTH",
			3: "DEFENSE",
			4: "OTHER1",
			5: "OTHER2",
		};
		Object.freeze(this.Strings);

		////////////////////////////////
		// Assignment of this to fix  //
		// scope stuff for event      //
		// handlers                   //
		////////////////////////////////
		var self = this;

		////////////////
		// Properties //
		////////////////
		this.currentSelected = undefined;
		this.currentUpgrade = undefined;
		this.totalGold = 0;
		this.defaultAddition = 100;

		// Flags for greying out shop items
		this.defenseSelectable = false;
		this.doorSelectable = false;
		this.attackSelectable = false;
		this.healthSelectable = false;
		this.otherOneSelectable = false;
		this.otherTwoSelectable = false;
		this.purchaseClickable = false;

		// Costs for each upgrade
		this.doorCost = 501;
		this.defenseCost = 500;
		this.attackCost = 500;
		this.healthCost = 500; 
		this.otherOneCost = 500;
		this.otherTwoCost = 500;


		//////////////////////
		// Hooks to the DOM //
		//////////////////////
		this.doorPlus = document.getElementById("Door_Plus");
		this.doorPlus.descText = "Adds another door.";
		this.doorPlus.selected = document.getElementById("Door_Selected");
		this.doorPlus.addEventListener("click", function(e)
		{
			self.DoorPlus();
		});

		this.attackPlus = document.getElementById("AttackCap_Plus");
		this.attackPlus.descText = "Increases attack cap.";
		this.attackPlus.selected = document.getElementById("Attack_Selected");
		this.attackPlus.addEventListener("click", function(e)
		{
			self.AttackPlus();
		});

		this.healthPlus = document.getElementById("HealthCap_Plus");
		this.healthPlus.descText = "Increases health cap.";
		this.healthPlus.selected = document.getElementById("Health_Selected");
		
		this.healthPlus.addEventListener("click", function(e)
		{
			self.HealthPlus();
		});

		this.defensePlus = document.getElementById("DefenseCap_Plus");
		this.defensePlus.descText = "Increases defense cap.";
		this.defensePlus.selected = document.getElementById("Defense_Selected");
		this.defensePlus.addEventListener("click", function(e)
		{
			self.DefensePlus();
		});

		this.otherOne = document.getElementById("Other1");
		this.otherOne.descText = "Desc of Other 1";
		this.otherOne.selected = document.getElementById("Other1_Selected");
		this.otherOne.addEventListener("click", function(e)
		{
			self.OtherOne();
		});

		this.otherTwo = document.getElementById("Other2");
		this.otherTwo.descText = "Desc of Other 2";
		this.otherTwo.selected = document.getElementById("Other2_Selected");
		this.otherTwo.addEventListener("click", function(e)
		{
			self.OtherTwo();
		});

		this.purchaseBtn = document.getElementById("Purchase_Button");
		this.purchaseBtn.addEventListener("click", function(e)
		{
			self.PurchaseBtn();
		});


		// =-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

		
		this.descriptionText = document.getElementById("Description_Text");
		
		this.goldText = document.getElementById("Gold_Text");

		this.doorText = document.getElementById("Door_Cost");
		this.doorText.textContent = this.doorCost;

		this.attackText = document.getElementById("Attack_Cost");
		this.attackText.textContent = this.attackCost;

		this.defenseText = document.getElementById("Defense_Cost");
		this.defenseText.textContent = this.defenseCost;

		this.healthText = document.getElementById("Health_Cost");
		this.healthText.textContent = this.healthCost;

		this.otherOneText = document.getElementById("Other1_Cost");
		this.otherOneText.textContent = this.otherOneCost;

		this.otherTwoText = document.getElementById("Other2_Cost");
		this.otherTwoText.textContent = this.otherTwoCost;

		this.doorGrey = document.getElementById("Door_Grey");
		this.attackGrey = document.getElementById("Attack_Grey");
		this.healthGrey = document.getElementById("Health_Grey");
		this.defenseGrey = document.getElementById("Defense_Grey");
		this.otherOneGrey = document.getElementById("Other1_Grey");
		this.otherTwoGrey = document.getElementById("Other2_Grey");
		this.purchaseGrey = document.getElementById("Purchase_Grey");

		this.SetGoldText();

	}

	/**
	 * Function: SetGoldText
	 * 
	 * Sets the total gold text. essentially updates 
	 * 		the player wallet
	 *   
	 */
	ShopManager.prototype.SetGoldText = function()
	{	
		this.goldText.textContent = "Gold: " + this.totalGold;
	};

	ShopManager.prototype.SetDoorCost = function (val) 
	{
		this.doorCost = val;
		this.doorText.textContent = this.doorCost;
	};

	ShopManager.prototype.SetAttackCost = function (val)
	{
		this.attackCost = val;
		this.attackText.textContent = this.attackCost;
	};

	ShopManager.prototype.SetDefenseCost = function (val)
	{
		this.defenseCost = val;
		this.defenseText.textContent = this.defenseCost;
	};

	ShopManager.prototype.SetHealthCost = function (val)
	{
		this.healthCost = val;
		this.healthText.textContent = this.healthCost;
	};

	ShopManager.prototype.SetOtherOneCost = function (val)
	{
		this.otherOneCost = val;
		this.otherOneText.textContent = this.otherOneCost;
	};

	ShopManager.prototype.SetOtherTwoCost = function (val)
	{
		this.otherTwoCost = val;
		this.otherTwoText.textContent = this.otherTwoCost;
	};

	/**
	 * Function: AddGold
	 * 
	 * Essentially adds currency to player wallet.
	 * 
	 * Parameters:
	 * 
	 *   amt - {optional} the amount to be added, if not
	 *         		supplied then it defaults to 
	 *           	this.defaultAddition of shop 
	 *            	manager
	 * 
	 */
	ShopManager.prototype.AddGold = function(amt)
	{
		var val = amt || this.defaultAddition;
		this.totalGold += val;
		if (this.totalGold >= this.doorCost)
		{
			this.doorGrey.setAttribute("opacity", "0");
			this.doorSelectable = true;
		}
		if (this.totalGold >= this.attackCost)
		{
			this.attackGrey.setAttribute("opacity", "0");
			this.attackSelectable = true;
		}
		if (this.totalGold >= this.healthCost)
		{
			this.healthGrey.setAttribute("opacity", "0");
			this.healthSelectable = true;
		}
		if (this.totalGold >= this.defenseCost)
		{
			this.defenseGrey.setAttribute("opacity", "0");
			this.defenseSelectable = true;
		}
		if (this.totalGold >= this.otherOneCost)
		{
			this.otherOneGrey.setAttribute("opacity", "0");
			this.otherOneSelectable = true;
		}
		if (this.totalGold >= this.otherTwoCost)
		{
			this.otherTwoGrey.setAttribute("opacity", "0");
			this.otherTwoSelectable = true;
		}
		this.SetGoldText();
	};

	ShopManager.prototype.UpdatePurchaseBtn = function()
	{
		if (this.purchaseClickable)
		{
			this.purchaseGrey.setAttribute("opacity", "0");
		}
		else
		{
			this.purchaseGrey.setAttribute("opacity", "0.65");
		}
	};


	ShopManager.prototype.SetStatsManagerDelegates = function(attack, defense, health)
	{
		if (this.DEBUG) { console.log("ShopManager: StatsManager delegates being set."); }
		this.increaseAttack = attack;
		this.increaseDefense = defense;
		this.increaseHealth = health;
	};

	ShopManager.prototype.DoorPlus = function() 
	{
		if (this.DEBUG) { console.log("ShopManager: Door Plus Clicked"); }
		this.descriptionText.textContent = this.doorPlus.descText;
		this.currentUpgrade = this.Upgrades.DOOR;
		if (this.currentSelected != undefined)
		{
			this.currentSelected.setAttribute("stroke-opacity", "0");
			this.currentSelected = this.doorPlus.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			this.currentSelected = this.doorPlus.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (this.doorSelectable)
		{
			this.purchaseClickable = true;
			this.UpdatePurchaseBtn();
		}
		else
		{
			this.purchaseClickable = false;
			this.UpdatePurchaseBtn();
		}
	};

	ShopManager.prototype.AttackPlus = function() 
	{
		if (this.DEBUG) { console.log("ShopManager: Attack Plus Clicked"); }
		this.descriptionText.textContent = this.attackPlus.descText;
		this.currentUpgrade = this.Upgrades.ATTACK;
		if (this.currentSelected != undefined)
		{
			this.currentSelected.setAttribute("stroke-opacity", "0");
			this.currentSelected = this.attackPlus.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			this.currentSelected = this.attackPlus.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (this.attackSelectable)
		{
			this.purchaseClickable = true;
			this.UpdatePurchaseBtn();
		}
		else
		{
			this.purchaseClickable = false;
			this.UpdatePurchaseBtn();
		}
	};

	ShopManager.prototype.HealthPlus = function() 
	{
		if (this.DEBUG) { console.log("ShopManager: Health Plus Clicked"); }
		this.descriptionText.textContent = this.healthPlus.descText;
		this.currentUpgrade = this.Upgrades.HEALTH;
		if (this.currentSelected != undefined)
		{
			this.currentSelected.setAttribute("stroke-opacity", "0");
			this.currentSelected = this.healthPlus.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			this.currentSelected = this.healthPlus.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (this.healthSelectable)
		{
			this.purchaseClickable = true;
			this.UpdatePurchaseBtn();
		}
		else
		{
			this.purchaseClickable = false;
			this.UpdatePurchaseBtn();
		}
	};

	ShopManager.prototype.DefensePlus = function() 
	{
		if (this.DEBUG) { console.log("ShopManager: Defense Plus Clicked"); }
		this.descriptionText.textContent = this.defensePlus.descText;
		this.currentUpgrade = this.Upgrades.DEFENSE;
		if (this.currentSelected != undefined)
		{
			this.currentSelected.setAttribute("stroke-opacity", "0");
			this.currentSelected = this.defensePlus.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			this.currentSelected = this.defensePlus.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (this.defenseSelectable)
		{
			this.purchaseClickable = true;
			this.UpdatePurchaseBtn();
		}
		else
		{
			this.purchaseClickable = false;
			this.UpdatePurchaseBtn();
		}
	};

	ShopManager.prototype.OtherOne = function() 
	{
		if (this.DEBUG) { console.log("ShopManager: Other1 Clicked"); }
		this.descriptionText.textContent = this.otherOne.descText;
		this.currentUpgrade = this.Upgrades.OTHER1;
		if (this.currentSelected != undefined)
		{
			this.currentSelected.setAttribute("stroke-opacity", "0");
			this.currentSelected = this.otherOne.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			this.currentSelected = this.otherOne.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (this.otherOneSelectable)
		{
			this.purchaseClickable = true;
			this.UpdatePurchaseBtn();
		}
		else
		{
			this.purchaseClickable = false;
			this.UpdatePurchaseBtn();
		}
	};

	ShopManager.prototype.OtherTwo = function() 
	{
		if (this.DEBUG) { console.log("ShopManager: Other2 Clicked"); }
		this.descriptionText.textContent = this.otherTwo.descText;
		this.currentUpgrade = this.Upgrades.OTHER2;
		if (this.currentSelected != undefined)
		{
			this.currentSelected.setAttribute("stroke-opacity", "0");
			this.currentSelected = this.otherTwo.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			this.currentSelected = this.otherTwo.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (this.otherTwoSelectable)
		{
			this.purchaseClickable = true;
			this.UpdatePurchaseBtn();
		}
		else
		{
			this.purchaseClickable = false;
			this.UpdatePurchaseBtn();
		}
	};

	ShopManager.prototype.PurchaseBtn = function() 
	{
		if (this.purchaseClickable)
		{
			if (this.DEBUG) { console.log("ShopManager: PurchaseBtn Clicked"); }
			console.log("Upgrade: " + this.Strings[this.currentUpgrade]);

			/* eslint-disable */
			switch (this.currentUpgrade)
			{
				case 0: // Door

					break;

				case 1: // Attack
					this.increaseAttack();
					break;

				case 2: // Health
					this.increaseHealth();
					break;

				case 3: // Defense
					this.increaseDefense();
					break;

				case 4: // Other1

					break;

				case 5: // Other2
					break;
			}
			/* eslint-enable */
		}
		else
		{
			if (this.DEBUG) { console.log("ShopManager: PurchaseBtn not clickable."); }
		}
	};


	return new ShopManager();

})();

















},{}],8:[function(require,module,exports){
module.exports = (function() {

  function Door(x, y) {
    this.x = x;
    this.y = y;
    this.avaliable = false;
  }

  return Door;

}());

},{}],9:[function(require,module,exports){
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
 */
module.exports = (function()
{

	//////////////////////////////////////
	// Value for outputting debug code. //
	//////////////////////////////////////
	var DEBUG = true;

	//////////////////////////////////////
	// Default values for start of game //
	//////////////////////////////////////
	var startingAttackVal = 5;
	var startingDefenseVal = 5;
	var startingHealthVal = 5;

	var attackCap = 10;
	var defenseCap = 10;
	var healthCap = 10;

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

	////////////////
	// Text hooks //
	////////////////
	var attackText = document.getElementById("Attack_Text");
	attackText.textContent = attackVal;

	var defenseText = document.getElementById("Defense_Text");
	defenseText.textContent = defenseVal;

	var healthText = document.getElementById("Health_Text");
	healthText.textContent = healthVal;

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
	}

	function SpecialUp()
	{
		if (DEBUG) { console.log("StatsManager: Special Up Clicked."); }
	}

	function SpecialDown()
	{
		if (DEBUG) { console.log("StatsManager: Special Down Clicked."); }
	}

	function IncreaseAttackCap(val)
	{
		if (DEBUG) { console.log("StatsManager: Increasing Attack Cap"); }
		var amt = val || 1;
		attackCap += amt;
	}

	function IncreaseDefenseCap(val)
	{
		if (DEBUG) { console.log("StatsManager: Increasing Defense Cap"); }
		var amt = val || 1;
		defenseCap += amt;
	}

	function IncreaseHealthCap(val)
	{
		if (DEBUG) { console.log("StatsManager: Increasing Health Cap"); }
		var amt = val || 1;
		healthCap += amt;
	}

	/////////////////////
	// Getters/Setters //
	/////////////////////
	function SetSpawnDelegate(val)
	{
		spawnDelegate = val;
	}


	///////////////////////
	// Exposed Functions //
	///////////////////////
	function SpawnMonster()
	{
		if (DEBUG) { console.log("StatsManager: SpawnMonster Clicked"); }
		if (spawnDelegate === undefined)
		{
			console.log("Spawn Delegate not set.");
		}
		else
		{
			spawnDelegate(GetCurrentStats());
		}
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
		GetCurrentStats: GetCurrentStats,
		SpawnMonster: SpawnMonster,
		SetSpawnDelegate: SetSpawnDelegate,
		GetCurrentCaps: GetCurrentCaps,
		IncreaseAttackCap: IncreaseAttackCap,
		IncreaseDefenseCap: IncreaseDefenseCap,
		IncreaseHealthCap: IncreaseHealthCap,
	};

})();

},{}]},{},[4]);
