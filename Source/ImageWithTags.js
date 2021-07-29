
class ImageWithTags
{
	constructor(image, tags)
	{
		this.image = image;
		this.tags = tags;
	}

	tagsInBounds(boundsToCheck)
	{
		var returnValues = [];

		for (var i = 0; i < this.tags.length; i++)
		{
			var tag = this.tags[i];
			var tagBounds = tag.bounds();
			if (tagBounds.overlapWith(boundsToCheck) == true)
			{
				returnValues.push(tag);
			}
		}

		return returnValues;
	}

	// drawable

	drawToDisplay(display)
	{
		this.image.drawToDisplay(display);

		for (var i = 0; i < this.tags.length; i++)
		{
			var tag = this.tags[i];
			tag.drawToDisplay(display);
		}
	}

	// json

	static fromJSONObject(imageWithTagsAsJSONObject, callback)
	{
		var imageAsDataURL = imageWithTagsAsJSONObject["imageAsDataURL"];

		var tagsAsObjects = imageWithTagsAsJSONObject["tags"];
		var tags = []; // todo
		for (var i = 0; i < tagsAsObjects.length; i++)
		{
			var tagAsObject = tagsAsObjects[i];
			var text = tagAsObject.text;
			var color = tagAsObject.color;
			var posAsObject = tagAsObject.pos;
			var pos = new Coords(posAsObject.x, posAsObject.y);
			var sizeAsObject = tagAsObject.size;
			var size = new Coords(sizeAsObject.x, sizeAsObject.y);
			var tag = new Tag(text, color, pos, size);
			tags.push(tag);
		}

		var systemImage = document.createElement("img");
		systemImage.onload(event)
		{
			var image = new Image(systemImage);
			var returnValue = new ImageWithTags(image, tags);
			callback(returnValue);
		}
		systemImage.src = imageAsDataURL;

	}

	toJSON(imageWithTagsAsJSON)
	{
		var objectToStringify =
		{
			tags : this.tags,
			imageAsDataURL : this.image.systemImage.src
		};
		var returnValue = JSON.stringify(objectToStringify, null, 4);

		return returnValue;
	}
}
