
class Tag
{
	constructor(text, color, pos, size)
	{
		this.text = text;
		this.color = color;
		this.pos = pos;
		this.size = size;
	}

	bounds()
	{
		return new Bounds(this.pos, this.pos.clone().add(this.size));
	}

	isValid()
	{
		return (this.size.magnitude() > 0);
	}

	// drawable

	drawToDisplay(display)
	{
		display.drawRectangle(this.pos, this.size, this.color);
		display.drawText(this.text, this.pos, this.color);
	}
}
