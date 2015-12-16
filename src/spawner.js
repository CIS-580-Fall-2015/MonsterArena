module.exports = (function() {

	var Colors = {
		RED: "#ff0000",
		BLUE: "#0066ff",
		GREY: "#737373"
	};
	Object.freeze(Colors);

	function Door(x, y) {
		this.x = x;
		this.y = y;
		this.avaliable = true;
		this.open = false;
	}

	Door.prototype.render = function(cntx)
	{
		var color;
		if (this.open)
		{
			if (this.avaliable)
			{
				color = Colors.BLUE;
			}
			else
			{
				color = Colors.RED;
			}
		}
		else
		{
			color = Colors.GREY;
		}

		cntx.save();
		cntx.beginPath();
		cntx.lineWidth = 5;
		cntx.strokeStyle = color;
		cntx.arc(
			this.x,
			this.y,
			32,
			0,
			2 * Math.PI
			);
		cntx.stroke();
		cntx.restore();
	}

	return Door;

}());
