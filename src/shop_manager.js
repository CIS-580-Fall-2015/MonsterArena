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