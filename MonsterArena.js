(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
module.exports = (function() {

  var Hero = require('./hero.js');
  var Door = require('./spawner');
  var doors = [];
  var monsters = [];

  var hero;

  // Value followed by scaling
  var HERO_STATS = {
    health: [2, 1.2],
    attack: [3, 1.2],
    defense: [2, 1.1],
    exp: [0, 1.2]
  };

  function initialize() {
    //TODO spawn doors

    hero = new Hero(HERO_STATS, this);
  }

  function update() {
    //TODO generate information to render
  }

  //TODO open doors upgrade

  function spawn_monster(stats) {
    var d = null;
    for (var i = 0; i > 8; i++) {
      if (doors[i].open && doors[i].avaliable) {
        d = doors[i];
        break;
      }
    }
    if (d) {
      var m = new Monster(stats, d);
      d.avaliable = false;
      monsters.push(m);
    }
  }

  return {
    initialize: initialize,
    update: update,
    spawn_monster: spawn_monster,
  };

}());

},{"./hero.js":4,"./spawner":7}],3:[function(require,module,exports){
window.onload = function()
{

    // The width & height of the screen
    SCREEN_WIDTH = 1280;
    SCREEN_HEIGHT = 720;

    // Module variables
    var Hero = require('./hero.js'),
        Monster = require('./monster.js');
        EntityManager = require('./entity_manager.js');
    ShopManager = require('./shop_manager.js');
    StatsManager = require('./stats_manager.js');

    ShopManager.SetStatsManagerDelegates(StatsManager.IncreaseAttackCap, 
                                    StatsManager.IncreaseDefenseCap, StatsManager.IncreaseHealthCap);


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

}

},{"./entity_manager.js":2,"./hero.js":4,"./monster.js":5,"./shop_manager.js":6,"./stats_manager.js":8}],4:[function(require,module,exports){
module.exports = (function(){
  var Entity = require('./entity.js');

  Hero.prototype = new Entity();



  function Hero(stats, EntityManager){
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
    //TODO place hero
    //this.x =
    //this.y =
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
    var damage = amount - this.defense;
    this.health -= damage;
    EntityManager.mod_blood(damage);
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

},{"./entity.js":1}],5:[function(require,module,exports){
/* Base class for each monster.
 * It inherits from the generic entity class.
 */
module.exports = (function() {
  var Entity = require('./entity.js');

  Monster.prototype = new Entity();

  function Monster(stats, door) {
    this.health = stats.health;
    this.attack = stats.attack;
    this.defense = stats.defense;
    this.door = door;
    this.specials = stats.specials;
    this.state = 0;

    var cx = document.getElementById('svgArea').width.baseVal.value / 2.0;
    var cy = document.getElementById('svgArea').height.baseVal.value / 2.0;

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
    if (this.x == cx) {
      if (this.y > cy) {
        this.angle = 270;
      } else {
        this.angle = 90;
      }
    } else if (this.y == cy) {
      if (this.x > cx) {
        this.angle = 0;
      } else {
        this.angle = 180;
      }
    } else if (this.x < cx) {
      if (this.y < cy) {
        this.angle = 135;
      } else {
        this.angle = 225;
      }
    } else if (this.y < cy) {
      this.angle = 45;
    } else {
      this.angle = 315
    }
    this.angle = this.angle * Math.PI / 180;
    if (this.angle == 0) {
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
    //TODO MOVEMENT
    //TODO - Check if in bounding box of hero
    this.x += n * dx;
    this.y += n * dy;
    //TODO CHECK RANGE

    //TODO specials


  };

  return Monster;

}());

},{"./entity.js":1}],6:[function(require,module,exports){
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
		this.attackText = document.getElementById("Attack_Cost");
		this.defenseText = document.getElementById("Defense_Cost");
		this.healthText = document.getElementById("Health_Cost");
		this.otherOneText = document.getElementById("Other1_Cost");
		this.otherTwoText = document.getElementById("Other2_Cost");

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

	/**
	 * Function: SetDoorText
	 * 
	 * Sets the cost text under the door upgrade
	 * 
	 * Parameters:
	 * 
	 *   val - string that cost needs to be set to
	 * 
	 */
	ShopManager.prototype.SetDoorText = function (val) 
	{
		this.doorText.textContent = val;
	};

	ShopManager.prototype.SetAttackText = function (val)
	{
		this.attackText.textContent = val;
	};

	ShopManager.prototype.SetDefenseText = function (val)
	{
		this.defenseText.textContent = val;
	};

	ShopManager.prototype.SetHealthText = function (val)
	{
		this.healthText.textContent = val;
	};

	ShopManager.prototype.SetOtherOneText = function (val)
	{
		this.otherOneText.textContent = val;
	};

	ShopManager.prototype.SetOtherTwoText = function (val)
	{
		this.otherTwoText.textContent = val;
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
	};

	ShopManager.prototype.PurchaseBtn = function() 
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
	};


	return new ShopManager();

})();

















},{}],7:[function(require,module,exports){
module.exports = (function() {

  function Door(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.open = false;
    this.avaliable = false;
  }

  return Door;

}());

},{}],8:[function(require,module,exports){
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
		if (spawnDelegate == undefined)
		{
			console.log("Spawn Delegate not set.");
		}
		else
		{
			spawnDelegate();
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










},{}]},{},[3]);
