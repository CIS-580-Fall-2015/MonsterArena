/* Author: Nic Johnson
 *
 * Title: StatManager.js
 *
 * Description: manages the monster stat's UI
 * 		for MonsterArena
 * 
 *
 * History:
 * 		December 06, 2015: 
 *  		-Date Created
 */
module.exports = (function ()
{
	function StatsManager()
	{
		//////////////////////////////////////
		// Value for outputting debug code. //
		//////////////////////////////////////
		this.DEBUG = true;

		//////////////////////////////////////
		// Default values for start of game //
		//////////////////////////////////////
		this.startingAttackVal = 5;
		this.startingDefenseVal = 5;
		this.startingHealthVal = 5;

		this.attackCap = 10;
		this.defenseCap = 10;
		this.healthCap = 10;

		this.attackFloor = 1;
		this.defenseFloor = 1;
		this.healthFloor = 1;

		///////////////////
		// Actual values //
		///////////////////
		this.attackVal = this.startingAttackVal;
		this.defenseVal = this.startingDefenseVal;
		this.healthVal = this.startingHealthVal;

		//////////////////////////////////////////////////////
		// Hooks to all the UI buttons in the stats manager //
		//////////////////////////////////////////////////////
		this.attackPlus = document.getElementById('Attack_Plus');
		this.attackPlus.addEventListener('click', this.AttackPlus);

		this.attackMinus = document.getElementById('Attack_Minus');
		this.attackMinus.addEventListener('click', this.AttackMinus);

		this.defensePlus = document.getElementById('Defense_Plus');
		this.defensePlus.addEventListener('click', this.DefensePlus);

		this.defenseMinus = document.getElementById('Defense_Minus');
		this.defenseMinus.addEventListener('click', this.DefenseMinus);

		this.healthPlus = document.getElementById('Health_Plus');
		this.healthPlus.addEventListener('click', this.HealthPlus);

		this.healthMinus = document.getElementById('Health_Minus');
		this.healthMinus.addEventListener('click', this.HealthMinus);

		this.specialUp = document.getElementById('Special_Up');
		this.specialUp.addEventListener('click', this.SpecialUp);

		this.specialDown = document.getElementById('Special_Down');
		this.specialDown.addEventListener('click', this.SpecialDown);

		//////////////////////////////
		// Assignment of the values //
		//////////////////////////////
		this.attackText = document.getElementById('Attack_Text');
		this.attackText.textContent = this.attackVal;

		this.defenseText = document.getElementById('Defense_Text');
		this.defenseText.textContent = this.defenseVal;

		this.healthText = document.getElementById('Health_Text');
		this.healthText.textContent = this.healthVal;

		this.healthText.textContent = 0;
	}

	StatsManager.prototype.AttackPlus = function() 
	{
		if (this.DEBUG) { console.log("Attack +1 Clicked"); }
		if (this.attackVal < this.attackCap)
		{
			this.attackVal++;
			this.attackText.textContent = this.attackVal;
		}
	}

	StatsManager.prototype.AttackMinus = function() 
	{
		if (this.DEBUG) { console.log("Attack -1 Clicked"); }
		if (this.attackVal > this.attackFloor)
		{
			this.attackVal--;
			this.attackText.textContent = this.attackVal;
		}
	}

	StatsManager.prototype.DefensePlus = function() 
	{
		if (this.DEBUG) { console.log("Defense +1 Clicked") }
		if (this.defenseVal < this.defenseCap)
		{
			this.defenseVal++;
			this.defenseText.textContent = this.defenseVal;
		}
	}

	StatsManager.prototype.DefenseMinus = function() 
	{
		if (this.DEBUG) { console.log("Defense -1 Clicked") }
		if (this.defenseVal > this.defenseFloor)
		{
			this.defenseVal--;
			this.defenseText.textContent = this.defenseVal;
		}
	}

	StatsManager.prototype.HealthPlus = function() 
	{
		if (this.DEBUG) { console.log("Health +1 Clicked"); }
		if (this.healthVal < this.healthCap)
		{
			this.healthVal++;
			this.healthText.textContent = this.healthVal;
		}
	}


	StatsManager.prototype.HealthMinus = function() 
	{
		if (this.DEBUG) { console.log("Health -1 Clicked."); }
		if (this.healthVal > this.healthFloor)
		{
			this.healthVal--;
			this.healthText.textContent = this.healthVal;
		}
	}

	StatsManager.prototype.SpecialUp = function()
	{
		if (this.DEBUG) { console.log("Special Up Clicked.") }
	}

	StatsManager.prototype.SpecialDown = function()
	{
		if (this.DEBUG) { console.log("Special Down Clicked.") }
	}

	StatsManager.prototype.IncreaseAttackCap = function(val)
	{
		if (this.DEBUG) { console.log("Increasing Attack Cap") }
		var amt = val || 1;
		this.attackCap += amt;
	}

	StatsManager.prototype.IncreaseDefenseCap = function(val)
	{
		if (this.DEBUG) { console.log("Increasing Defense Cap") }
		var amt = val || 1;
		this.defenseCap += amt;
	}

	StatsManager.prototype.IncreaseHealthCap = function(val)
	{
		if (this.DEBUG) { console.log("Increasing Health Cap") }
		var amt = val || 1;
		this.healthCap += amt;
	}

	return StatsManager;

})();

















