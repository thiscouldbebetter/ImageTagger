
class Cursor
{
	constructor(pos, size)
	{
		this.pos = pos;
		this.size = size;

		this.sizeHalf = this.size.clone().divideScalar(2);

		this.tagSelected = null;
	}

	// constants

	static Size = new Coords(8, 8);

	// methods

	bounds()
	{
		return new Bounds(this.pos, this.pos.clone().add(this.size));
	}

	color()
	{
		return (this.tagSelected == null ? "Red" : "Green");
	}

	tagSelect(tagToSelect)
	{
		this.tagSelected = tagToSelect;

		if (this.tagSelected != null)
		{
			var inputTagSelectedText = document.getElementById("inputTagSelectedText");
			var selectTagSelectedColor = document.getElementById("selectTagSelectedColor");
	
			inputTagSelectedText.value = this.tagSelected.text;
			selectTagSelectedColor.value = this.tagSelected.color;
		}
	}

	// drawable

	drawToDisplay(display)
	{
		display.drawRectangle
		(
			this.pos.clone().subtract(this.sizeHalf),
			this.size,
			this.color()
		);

		if (this.tagSelected != null)
		{
			this.tagSelected.drawToDisplay(display);
			display.drawRectangle
			(
				this.tagSelected.pos.clone().subtract(this.sizeHalf),
				this.size,
				"Green"
			)
		}
	}
}
