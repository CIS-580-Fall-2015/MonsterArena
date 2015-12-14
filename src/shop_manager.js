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
 *  	December 13, 2015:
 *  		-Whole bunch of stuff because i forgot to update this list
 *  		-Subtracting gold on purchase
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
			SPECIAL: 4,
			BOSS: 5,
		};
		Object.freeze(this.Upgrades);

		this.Strings = 
		{
			0: "DOOR",
			1: "ATTACK",
			2: "HEALTH",
			3: "DEFENSE",
			4: "SPECIAL",
			5: "BOSS",
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
		this.currentUpgrade  = undefined;
		this.totalGold       = 0;
		this.defaultAddition = 100;
		/* eslint-disable */
		this.specialProgression = [
									"shop_taunt_special", 
									"shop_defense_special", 
									"shop_critical_special", 
									"shop_magic_special",
									"shop_none_special",
									];
		/* eslint-enable */
		this.specialIndex = 0;

		//////////////////////////////////////
		// Flags for greying out shop items //
		//////////////////////////////////////
		this.defenseSelectable  = false;
		this.doorSelectable     = false;
		this.attackSelectable   = false;
		this.healthSelectable   = false;
		this.specialSelectable  = false;
		this.bossSelectable 	= false;
		this.purchaseClickable  = false;

		/////////////////////////////////////
		// Flags for finished upgrade path //
		/////////////////////////////////////
		this.doorDone     = false;
		this.defenseDone  = false;
		this.attackDone   = false;
		this.healthDone   = false; 
		this.specialDone  = false;
		this.bossDone = false;

		/////////////////////////////////////
		// Flags for determining if player //
		// has enough money 		       //
		/////////////////////////////////////
		this.doorEnoughMoney     = false;
		this.defenseEnoughMoney  = false;
		this.attackEnoughMoney   = false;
		this.healthEnoughMoney   = false;
		this.specialEnoughMoney  = false;
		this.bossEnoughMoney = false;

		////////////////////////////
		// Costs for each upgrade //
		////////////////////////////
		this.doorCost     = 0;
		this.defenseCost  = 0;
		this.attackCost   = 0;
		this.healthCost   = 0; 
		this.specialCost  = 0;
		this.bossCost = 0;

		///////////////////////////////////////////
		// Cost progressions for capped upgrades //
		///////////////////////////////////////////
		this.doorCostProgression    = [100, 1000, 2000, 3000, 4000, 5000, 6000];
		this.doorCostIndex          = 0;
		this.specialCostProgression = [300, 700, 1100, 1500];
		this.specialCostIndex       = 0;
		this.bossCostProgression    = [1500, 3000, 4500];
		this.bossCostIndex 			= 0;
		
		/////////////////////////////////////////
		// Multipliers and base costs for non  //
		// capped upgrades                     //
		/////////////////////////////////////////
		this.defenseBaseCost = 300;
		this.defenseCostMult = 1;
		
		this.attackBaseCost  = 300;
		this.attackCostMult  = 1;

		this.healthBaseCost  = 300;
		this.healthCostMult  = 1;


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

		this.special = document.getElementById("Special");
		this.special.selected = document.getElementById("Special_Selected");
		this.special.addEventListener("click", function(e)
		{
			self.Special();
		});

		this.boss = document.getElementById("Boss");
		this.boss.descText = "Upgrades leader stats";
		this.boss.selected = document.getElementById("Boss_Selected");
		this.boss.addEventListener("click", function(e)
		{
			self.Boss();
		});

		this.purchaseBtn = document.getElementById("Purchase_Button");
		this.purchaseBtn.addEventListener("click", function(e)
		{
			self.PurchaseBtn();
		});

		this.currentSpecial = document.getElementById(this.specialProgression[this.specialIndex]);


		// =-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

		
		this.descriptionText = document.getElementById("Description_Text");
		this.goldText        = document.getElementById("Gold_Text");
		this.doorText        = document.getElementById("Door_Cost");
		this.attackText      = document.getElementById("Attack_Cost");
		this.defenseText     = document.getElementById("Defense_Cost");
		this.healthText      = document.getElementById("Health_Cost");
		this.specialText     = document.getElementById("Special_Cost");
		this.bossText    	 = document.getElementById("Boss_Cost");
		
		this.doorGrey        = document.getElementById("Door_Grey");
		this.attackGrey      = document.getElementById("Attack_Grey");
		this.healthGrey      = document.getElementById("Health_Grey");
		this.defenseGrey     = document.getElementById("Defense_Grey");
		this.specialGrey     = document.getElementById("Special_Grey");
		this.bossGrey    	 = document.getElementById("Boss_Grey");
		this.purchaseGrey    = document.getElementById("Purchase_Grey");

		this.SetGoldText();
		this.UpdateCosts();

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

	////////////////////////////
	// Cost setting functions //
	////////////////////////////

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

	ShopManager.prototype.SetSpecialCost = function (val)
	{
		this.specialCost = val;
		this.specialText.textContent = this.specialCost;
	};

	ShopManager.prototype.SetBossCost = function (val)
	{
		this.bossCost = val;
		this.bossText.textContent = this.bossCost;
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
	 *           	this.defaultAddition of shop 
	 *            	manager
	 * 
	 */
	ShopManager.prototype.AddGold = function(amt)
	{
		var val = amt || this.defaultAddition;
		this.totalGold += val;
		this.UpdateItemGrey();
		this.SetGoldText();
	};


	ShopManager.prototype.SubtractGold = function(amt)
	{
		this.totalGold -= amt;
		this.SetGoldText();
	};

	ShopManager.prototype.UpdateAgainstWallet = function()
	{
		this.doorEnoughMoney     = this.totalGold >= this.doorCost;
		this.attackEnoughMoney   = this.totalGold >= this.attackCost;
		this.defenseEnoughMoney  = this.totalGold >= this.defenseCost;
		this.healthEnoughMoney   = this.totalGold >= this.healthCost;
		this.specialEnoughMoney  = this.totalGold >= this.specialCost;
		this.bossEnoughMoney 	 = this.totalGold >= this.bossCost;
	};

	ShopManager.prototype.UpdateSelectable = function()
	{
		this.doorSelectable     = this.doorEnoughMoney && !this.doorDone;
		this.attackSelectable   = this.attackEnoughMoney && !this.attackDone;
		this.defenseSelectable  = this.defenseEnoughMoney && !this.defenseDone;
		this.healthSelectable   = this.healthEnoughMoney && !this.healthDone;
		this.specialSelectable  = this.specialEnoughMoney && !this.specialDone;
		this.bossSelectable 	= this.bossEnoughMoney && !this.bossDone;
	};

	ShopManager.prototype.UpdateCosts = function()
	{
		// capped upgrades
		this.doorCost    = this.doorCostProgression[this.doorCostIndex];
		this.specialCost = this.specialCostProgression[this.specialCostIndex];
		this.bossCost  	 = this.bossCostProgression[this.bossCostIndex];
		
		// non capped
		this.attackCost  = this.attackBaseCost * this.attackCostMult;
		this.defenseCost = this.defenseBaseCost * this.defenseCostMult;
		this.healthCost  = this.healthBaseCost * this.healthCostMult;

		// Updating text
		this.doorText.textContent     = this.doorCost;
		this.attackText.textContent   = this.attackCost;
		this.defenseText.textContent  = this.defenseCost;
		this.healthText.textContent   = this.healthCost;
		this.specialText.textContent  = this.specialCost;
		this.bossText.textContent 	  = this.bossCost;
	};

	ShopManager.prototype.UpdateItemGrey = function()
	{
		this.UpdateCosts();
		this.UpdateAgainstWallet();
		this.UpdateSelectable();

		/* eslint-disable */
		switch (this.currentUpgrade)
		{
			case 0: // Door
				if (!this.doorSelectable)
				{
					this.purchaseClickable = false;
				}
				break;

			case 1: // Attack
				if (!this.attackSelectable)
				{
					this.purchaseClickable = false;
				}
				break;

			case 2: // Health
				if (!this.healthSelectable)
				{
					this.purchaseClickable = false;
				}
				break;

			case 3: // Defense
				if (!this.defenseSelectable)
				{
					this.purchaseClickable = false;
				}
				break;

			case 4: // Special
				if (!this.specialSelectable)
				{
					this.purchaseClickable = false;
				}
				break;

			case 5: // Boss
				if (!this.bossSelectable)
				{
					this.purchaseClickable = false;
				}
				break;
		}
		/* eslint-enable */
		this.UpdatePurchaseBtn();

		if (this.doorSelectable)
		{
			this.doorGrey.setAttribute("opacity", "0");
		}
		else
		{
			this.doorGrey.setAttribute("opacity", "0.65");
		}

		if (this.attackSelectable)
		{
			this.attackGrey.setAttribute("opacity", "0");
		}
		else
		{
			this.attackGrey.setAttribute("opacity", "0.65");
		}

		if (this.healthSelectable)
		{
			this.healthGrey.setAttribute("opacity", "0");
		}
		else
		{
			this.healthGrey.setAttribute("opacity", "0.65");
		}

		if (this.defenseSelectable)
		{
			this.defenseGrey.setAttribute("opacity", "0");
		}
		else
		{
			this.defenseGrey.setAttribute("opacity", "0.65");
		}

		if (this.specialSelectable)
		{
			this.specialGrey.setAttribute("opacity", "0");
		}
		else
		{
			this.specialGrey.setAttribute("opacity", "0.65");
		}

		if (this.bossSelectable)
		{
			this.bossGrey.setAttribute("opacity", "0");
		}
		else
		{
			this.bossGrey.setAttribute("opacity", "0.65");
		}
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


	ShopManager.prototype.SetStatsManagerDelegates = function(attack, defense, health, special)
	{
		if (this.DEBUG) { console.log("ShopManager: StatsManager delegates being set."); }
		this.increaseAttack = attack;
		this.increaseDefense = defense;
		this.increaseHealth = health;
		this.addSpecial = special;
	};

	////////////////////////
	// UI Update handlers //
	////////////////////////

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

	ShopManager.prototype.Special = function() 
	{
		if (this.DEBUG) { console.log("ShopManager: Special Clicked"); }
		this.descriptionText.textContent = this.currentSpecial.getAttribute("desc");
		this.currentUpgrade = this.Upgrades.SPECIAL;
		if (this.currentSelected != undefined)
		{
			this.currentSelected.setAttribute("stroke-opacity", "0");
			this.currentSelected = this.special.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			this.currentSelected = this.special.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (this.specialSelectable && !this.specialDone)
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

	ShopManager.prototype.Boss = function() 
	{
		if (this.DEBUG) { console.log("ShopManager: Boss Clicked"); }
		this.descriptionText.textContent = this.boss.descText;
		this.currentUpgrade = this.Upgrades.BOSS;
		if (this.currentSelected != undefined)
		{
			this.currentSelected.setAttribute("stroke-opacity", "0");
			this.currentSelected = this.boss.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		else
		{
			this.currentSelected = this.boss.selected;
			this.currentSelected.setAttribute("stroke-opacity", "100");
		}
		if (this.bossSelectable)
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
					// TODO: Enable new door
					this.SubtractGold(this.doorCost);
					this.doorCostIndex++;
					if (this.doorCostIndex == this.doorCostProgression.length)
					{
						this.doorDone = true;
						this.doorSelectable = false;
						this.purchaseClickable = false;
						this.UpdatePurchaseBtn();
					}
					break;

				case 1: // Attack
					this.increaseAttack();
					this.SubtractGold(this.attackCost);
					this.attackCostMult++;
					break;

				case 2: // Health
					this.increaseHealth();
					this.SubtractGold(this.healthCost);
					this.healthCostMult++;
					break;

				case 3: // Defense
					this.increaseDefense();
					this.SubtractGold(this.defenseCost);
					this.defenseCostMult++;
					break;

				case 4: // Special
					var spec = this.specialProgression[this.specialIndex];
					document.getElementById(this.specialProgression[this.specialIndex]).
							setAttribute("opacity", "0");
					this.specialIndex++;
					console.log(this.specialIndex);
					var s = document.getElementById(this.specialProgression[this.specialIndex]);
					s.setAttribute("opacity", "1");
					this.currentSpecial = s;
					this.descriptionText.textContent = s.getAttribute('desc');
					this.SubtractGold(this.specialCost);
					if (this.specialIndex == this.specialProgression.length - 1)
					{
						this.specialDone = true;
						this.specialSelectable = false;
						this.purchaseClickable = false;
						this.UpdatePurchaseBtn();	
					}
					this.specialCostIndex++;
					this.addSpecial("stats_" + spec.substring(5));
					break;

				case 5: // Boss
					// TODO: Upgrade boss stats
					this.SubtractGold(this.bossCost);
					this.bossCostIndex++;
					if (this.bossCostIndex == this.bossCostProgression.length)
					{
						document.getElementById("shop_leader").setAttribute("opacity", "0");
						document.getElementById("shop_leader_none").setAttribute("opacity", "1");
						this.boss.descText = "No more leader upgrades";
						this.descriptionText.textContent = this.boss.descText;
						this.bossDone = true;
						this.bossSelectable = false;
						this.purchaseClickable = false;
						this.UpdatePurchaseBtn();
					}
					break;
			}
			/* eslint-enable */
			this.UpdateItemGrey();
		}
		else
		{
			if (this.DEBUG) { console.log("ShopManager: PurchaseBtn not clickable."); }
		}
	};


	return new ShopManager();

})();
















