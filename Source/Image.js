
class Image
{
	constructor(systemImage)
	{
		this.systemImage = systemImage;

		this.size = new Coords
		(
			this.systemImage.width, this.systemImage.height
		);
	}

	drawToDisplay(display)
	{
		display.drawImage(this, Coords.Instances().Zeroes);
	}
}
