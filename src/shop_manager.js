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
			OTHER2: 5,
		};
		Object.freeze(this.Upgrades);

		this.Strings = 
		{
			0: "DOOR",
			1: "ATTACK",
			2: "HEALTH",
			3: "DEFENSE",
			4: "SPECIAL",
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
		this.specialProgression = [
									"shop_taunt_special", 
									"shop_defense_special", 
									"shop_critical_special", 
									"shop_magic_special",
									"shop_none_special",
									];
		this.specialIndex = 0;

		// Flags for greying out shop items
		this.defenseSelectable = false;
		this.doorSelectable = false;
		this.attackSelectable = false;
		this.healthSelectable = false;
		this.specialSelectable = false;
		this.otherTwoSelectable = false;
		this.purchaseClickable = false;

		// Flags for finished upgrade path
		this.doorDone = false;
		this.defenseDone = false;
		this.attackDone = false;
		this.healthDone = false; 
		this.specialDone = false;
		this.otherTwoDone = false;

		// Costs for each upgrade
		this.doorCost = 501;
		this.defenseCost = 500;
		this.attackCost = 500;
		this.healthCost = 500; 
		this.specialCost = 500;
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

		this.special = document.getElementById("Special");
		this.special.selected = document.getElementById("Special_Selected");
		this.special.addEventListener("click", function(e)
		{
			self.Special();
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

		this.currentSpecial = document.getElementById(this.specialProgression[this.specialIndex]);


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

		this.specialText = document.getElementById("Special_Cost");
		this.specialText.textContent = this.specialCost;

		this.otherTwoText = document.getElementById("Other2_Cost");
		this.otherTwoText.textContent = this.otherTwoCost;

		this.doorGrey = document.getElementById("Door_Grey");
		this.attackGrey = document.getElementById("Attack_Grey");
		this.healthGrey = document.getElementById("Health_Grey");
		this.defenseGrey = document.getElementById("Defense_Grey");
		this.specialGrey = document.getElementById("Special_Grey");
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

	ShopManager.prototype.SetSpecialCost = function (val)
	{
		this.specialCost = val;
		this.specialText.textContent = this.specialCost;
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
		if (this.totalGold >= this.doorCost && !this.doorDone)
		{
			this.doorSelectable = true;
		}
		if (this.totalGold >= this.attackCost && !this.attackDone)
		{
			this.attackSelectable = true;
		}
		if (this.totalGold >= this.healthCost && !this.healthDone)
		{
			this.healthSelectable = true;
		}
		if (this.totalGold >= this.defenseCost && !this.defenseDone)
		{
			this.defenseSelectable = true;
		}
		if (this.totalGold >= this.specialCost && !this.specialDone)
		{
			this.specialSelectable = true;
		}
		if (this.totalGold >= this.otherTwoCost && !this.otherTwoDone)
		{
			this.otherTwoSelectable = true;
		}
		this.UpdateItemGrey();
		this.SetGoldText();
	};

	ShopManager.prototype.UpdateItemGrey = function()
	{
		if (this.doorSelectable && !this.doorDone)
		{
			this.doorGrey.setAttribute("opacity", "0");
		}
		else
		{
			this.doorGrey.setAttribute("opacity", "0.65");
		}

		if (this.attackSelectable && !this.attackDone)
		{
			this.attackGrey.setAttribute("opacity", "0");
		}
		else
		{
			this.attackGrey.setAttribute("opacity", "0.65");
		}

		if (this.healthSelectable && !this.healthDone)
		{
			this.healthGrey.setAttribute("opacity", "0");
		}
		else
		{
			this.healthGrey.setAttribute("opacity", "0.65");
		}

		if (this.defenseSelectable && !this.defenseDone)
		{
			this.defenseGrey.setAttribute("opacity", "0");
		}
		else
		{
			this.defenseGrey.setAttribute("opacity", "0.65");
		}

		if (this.specialSelectable && !this.specialDone)
		{
			this.specialGrey.setAttribute("opacity", "0");
		}
		else
		{
			this.specialGrey.setAttribute("opacity", "0.65");
		}

		if (this.otherTwoSelectable && !this.otherTwoDone)
		{
			this.otherTwoGrey.setAttribute("opacity", "0");
		}
		else
		{
			this.otherTwoGrey.setAttribute("opacity", "0.65");
		}
	}

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
		this.descriptionText.textContent = this.currentSpecial.getAttribute('desc');
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

	ShopManager.prototype.SubtractGold = function(amt)
	{
		this.totalGold -= amt;
		if (this.totalGold < this.doorCost && !this.doorDone)
		{
			this.doorSelectable = false;
		}
		if (this.totalGold < this.attackCost && !this.attackDone)
		{
			this.attackSelectable = false;
		}
		if (this.totalGold < this.healthCost && !this.healthDone)
		{
			this.healthSelectable = false;
		}
		if (this.totalGold < this.defenseCost && !this.defenseDone)
		{
			this.defenseSelectable = false;
		}
		if (this.totalGold < this.specialCost && !this.specialDone)
		{
			this.specialSelectable = false;
		}
		if (this.totalGold < this.otherTwoCost && !this.otherTwoDone)
		{
			this.otherTwoSelectable = false;
		}
		this.UpdateItemGrey();
		this.SetGoldText();
	}

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
					this.SubtractGold(this.attackCost);
					// @TODO: increment cost
					break;

				case 2: // Health
					this.increaseHealth();
					this.SubtractGold(this.healthCost);
					// @TODO: increment cost
					break;

				case 3: // Defense
					this.increaseDefense();
					this.SubtractGold(this.defenseCost);
					// @TODO: increment cost
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
					// @TODO: increment cost
					if (this.specialIndex == this.specialProgression.length - 1)
					{
						this.specialDone = true;
						this.specialSelectable = false;
						this.purchaseClickable = false;
						this.UpdatePurchaseBtn();	
					}
					this.UpdateItemGrey();
					this.addSpecial("stats_" + spec.substring(5));
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
















