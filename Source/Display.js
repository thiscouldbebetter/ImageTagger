
class Display
{
	constructor(size)
	{
		this.size = size;

		this.colorBack = "White";
		this.colorFore = "Black";

		this.fontHeightInPixels = 10;
		this.font = this.fontHeightInPixels + "px sans-serif";
	}

	drawImage(image, pos)
	{
		this.graphics.drawImage(image.systemImage, pos.x, pos.y);
	}

	drawRectangle(pos, size, color)
	{
		this.graphics.strokeStyle = color;
		this.graphics.strokeRect(pos.x, pos.y, size.x, size.y);
	}

	drawText(text, pos, color)
	{
		/*
		this.graphics.strokeStyle = (color == "Black" ? "White" : "Black");
		this.graphics.strokeText
		(
			" " + text,
			pos.x,
			pos.y + this.fontHeightInPixels
		);
		*/

		this.graphics.fillStyle = color;
		this.graphics.fillText
		(
			" " + text,
			pos.x,
			pos.y + this.fontHeightInPixels
		);
	}

	initialize()
	{
		this.canvas = document.createElement("canvas");
		this.canvas.style = "border:1px solid";
		this.canvas.width = this.size.x;
		this.canvas.height = this.size.y;

		var divDisplay = document.getElementById("divDisplay");
		divDisplay.innerHTML = "";
		divDisplay.appendChild(this.canvas);

		this.graphics = this.canvas.getContext("2d");
		this.graphics.font = this.font;

		this.canvas.tabIndex = 0; // If not set, a canvas can't get focus.
		this.canvas.focus();
	}
}
