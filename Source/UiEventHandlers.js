
class UiEventHandlers
{
	static inputImageFile_Changed(inputImageFile)
	{
		var imageFileToLoad = inputImageFile.files[0];
		var fileReader = new FileReader();
		fileReader.onload = (event2) =>
		{
			var imageLoadedAsDataURL = event2.target.result;
			var imageLoadedAsDOMElement = document.createElement("img");
			imageLoadedAsDOMElement.onload = (event3) =>
			{
				var imageLoaded = new Image(imageLoadedAsDOMElement);
				var imageWithTags = new ImageWithTags(imageLoaded, []);
				var session = Globals.Instance.session;
				session.imageWithTags = imageWithTags;
				session.initialize();
			}
			imageLoadedAsDOMElement.src = imageLoadedAsDataURL;
		}
		fileReader.readAsDataURL(imageFileToLoad);
	}

	static buttonImageWithTagsFromJSON_Clicked()
	{
		var textareaImageWithTagsAsJSON = document.getElementById
		(
			"textareaImageWithTagsAsJSON"
		);
		var imageWithTagsAsJSON = textareaImageWithTagsAsJSON.value;
		var imageWithTagsAsJSONObject;
		try
		{
			imageWithTagsAsJSONObject = JSON.parse(imageWithTagsAsJSON);
			var imageWithTags = ImageWithTags.fromJSONObject
			(
				imageWithTagsAsJSONObject,
				// callback
				function (imageWithTags)
				{
					var session = Globals.Instance.session;
					session.imageWithTags = imageWithTags;
					session.initialize();
				}
			);
		}
		catch (err)
		{
			alert("Invalid format!");
		}
	}

	static buttonImageWithTagsToJSON_Clicked()
	{
		var imageWithTags = Globals.Instance.session.imageWithTags;
		if (imageWithTags == null)
		{
			alert("No image loaded!");
		}
		else
		{
			var imageWithTagsAsJSON = imageWithTags.toJSON();
			var textareaImageWithTagsAsJSON = document.getElementById
			(
				"textareaImageWithTagsAsJSON"
			);
			textareaImageWithTagsAsJSON.value = imageWithTagsAsJSON;
		}
	}

	static inputTagSelectedText_Changed()
	{
		var session = Globals.Instance.session;
		var imageWithTags = session.imageWithTags;
		if (imageWithTags != null)
		{
			var tagSelected = session.cursor.tagSelected;
			if (tagSelected != null)
			{
				var inputTagSelectedText = document.getElementById("inputTagSelectedText");
				var text = inputTagSelectedText.value;
				tagSelected.text = text;
				session.update();
			}
		}
	}

	static selectTagSelectedColor_Changed()
	{
		var session = Globals.Instance.session;
		var imageWithTags = session.imageWithTags;
		if (imageWithTags != null)
		{
			var tagSelected = session.cursor.tagSelected;
			if (tagSelected != null)
			{
				var selectTagSelectedColor = document.getElementById("selectTagSelectedColor");
				var color = selectTagSelectedColor.value;
				tagSelected.color = color;
				session.update();
			}
		}
	}
}
