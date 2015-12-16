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



