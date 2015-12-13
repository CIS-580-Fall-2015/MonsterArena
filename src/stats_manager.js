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
	var specialList = ["critical_special", "magic_special", "taunt_special"];
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

	// 1 is up
	// -1 is down
	function UpdateSpecial(dir)
	{
		var current = document.getElementById(specialList[specialIndex]);
		current.setAttribute('opacity', '0');
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
	}

	function SpecialUp()
	{
		if (DEBUG) { console.log("StatsManager: Special Up Clicked."); }
		UpdateSpecial(1);
	}

	function SpecialDown()
	{
		if (DEBUG) { console.log("StatsManager: Special Down Clicked."); }
		UpdateSpecial(-1);
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
