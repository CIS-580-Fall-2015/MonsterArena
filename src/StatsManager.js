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
	var attackText = document.getElementById('Attack_Text');
	attackText.textContent = attackVal;

	var defenseText = document.getElementById('Defense_Text');
	defenseText.textContent = defenseVal;

	var healthText = document.getElementById('Health_Text');
	healthText.textContent = healthVal;

	////////////////////////
	// Button Click Hooks //
	////////////////////////
	var attackPlus = document.getElementById('Attack_Plus');
	attackPlus.addEventListener('click', AttackPlus);

	var attackMinus = document.getElementById('Attack_Minus');
	attackMinus.addEventListener('click', AttackMinus);

	var defensePlus = document.getElementById('Defense_Plus');
	defensePlus.addEventListener('click', DefensePlus);

	var defenseMinus = document.getElementById('Defense_Minus');
	defenseMinus.addEventListener('click', DefenseMinus);

	var healthPlus = document.getElementById('Health_Plus');
	healthPlus.addEventListener('click', HealthPlus);

	var healthMinus = document.getElementById('Health_Minus');
	healthMinus.addEventListener('click', HealthMinus);

	var specialUp = document.getElementById('Special_Up');
	specialUp.addEventListener('click', SpecialUp);

	var specialDown = document.getElementById('Special_Down');
	specialDown.addEventListener('click', SpecialDown);

	var spawnButton = document.getElementById('Spawn_Button');
	spawnButton.addEventListener('click', SpawnMonster);

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
	}

	function AttackMinus() 
	{
		if (DEBUG) { console.log("StatsManager: Attack -1 Clicked"); }
		if (attackVal > attackFloor)
		{
			attackVal--;
			attackText.textContent = attackVal;
		}
	}

	function DefensePlus() 
	{
		if (DEBUG) { console.log("StatsManager: Defense +1 Clicked") }
		if (defenseVal < defenseCap)
		{
			defenseVal++;
			defenseText.textContent = defenseVal;
		}
	}

	function DefenseMinus() 
	{
		if (DEBUG) { console.log("StatsManager: Defense -1 Clicked") }
		if (defenseVal > defenseFloor)
		{
			defenseVal--;
			defenseText.textContent = defenseVal;
		}
	}

	function HealthPlus() 
	{
		if (DEBUG) { console.log("StatsManager: Health +1 Clicked"); }
		if (healthVal < healthCap)
		{
			healthVal++;
			healthText.textContent = healthVal;
		}
	}


	function HealthMinus() 
	{
		if (DEBUG) { console.log("StatsManager: Health -1 Clicked."); }
		if (healthVal > healthFloor)
		{
			healthVal--;
			healthText.textContent = healthVal;
		}
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
		if (DEBUG) { console.log('StatsManager: Polling Current Monster Stats'); }
		return {
			attack: attackVal,
			defense: defenseVal,
			health: healthVal,
			special: specialContent
		};
	}



	return {
		GetCurrentStats: GetCurrentStats,
		SpawnMonster: SpawnMonster,
		SetSpawnDelegate: SetSpawnDelegate
	}

})();









