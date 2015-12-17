module.exports = (function() {

  function Door(x, y) {
    this.x = x;
    this.y = y;
    this.avaliable = true;
  }

	function Door(x, y) {
		this.x = x;
		this.y = y;
		this.avaliable = true;
		this.open = false;
	}

	// Door.prototype.render = function(cntx)
	// {
	// 	var color;
	// 	if (this.open)
	// 	{
	// 		if (this.avaliable)
	// 		{
	// 			color = Colors.BLUE;
	// 		}
	// 		else
	// 		{
	// 			color = Colors.RED;
	// 		}
	// 	}
	// 	else
	// 	{
	// 		color = Colors.GREY;
	// 	}
	// 	cntx.save();
	// 	cntx.beginPath();
	// 	cntx.lineWidth = 5;
	// 	cntx.strokeStyle = color;
	// 	console.log("Stroke: " + cntx.strokeStyle);
	// 	cntx.arc(
	// 		this.x,
	// 		this.y,
	// 		32,
	// 		0,
	// 		2 * Math.PI
	// 		);
	// 	cntx.stroke();
	// 	cntx.closePath();
	// 	cntx.restore();
	// }

	return Door;

}());
