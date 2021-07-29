class Session
{
	constructor(imageWithTags)
	{
		this.imageWithTags = imageWithTags;
	}

	colorSelected()
	{
		var selectTagSelectedColor = document.getElementById("selectTagSelectedColor");
		var returnValue = selectTagSelectedColor.value;
		return returnValue;
	}

	initialize()
	{
		if (this.imageWithTags != null)
		{
			var image = this.imageWithTags.image;
			var display = new Display(image.size);
			display.initialize();
			Globals.Instance.display = display;
			this.cursor = new Cursor(image.size.clone().divideScalar(2), Cursor.Size);

			this.update();
		}	
	}

	update()
	{
		if (this.cursor == null || this.imageWithTags == null)
		{
			return;
		}

		var inputHelper = Globals.Instance.inputHelper;
		var keyPressed = inputHelper.keyPressed;
		var tagSelected = this.cursor.tagSelected;
		var tagAlreadyExisted = (this.imageWithTags.tags.indexOf(tagSelected) >= 0);

		if (this.cursor == null || keyPressed == null)
		{
			// do nothing
		}
		else if (keyPressed == "Enter")
		{
			if (tagSelected == null || tagAlreadyExisted == true)
			{
				var cursorBounds = this.cursor.bounds();
				var tagsAtPos = this.imageWithTags.tagsInBounds(cursorBounds);

				if (tagsAtPos.length == 0 || inputHelper.isShiftPressed == true)
				{
					tagSelected = new Tag
					(
						"", // text
						this.colorSelected(),
						this.cursor.pos.clone(),
						new Coords(0, 0) // size
					);
				}
				else
				{	
					var indexOfTagSelected = tagsAtPos.indexOf(tagSelected);
					indexOfTagSelected++;
				
					if (indexOfTagSelected < tagsAtPos.length)
					{
						tagSelected = tagsAtPos[indexOfTagSelected];
					}
					else
					{
						tagSelected = null;
					}
				}
			}
			else
			{
				if (tagSelected.isValid() == true)
				{
					this.imageWithTags.tags.push(tagSelected);
				}
			}

			this.cursor.tagSelect(tagSelected);
		}
		else if (keyPressed == "Escape")
		{
			if (tagSelected != null)
			{
				this.cursor.tagSelected = null;
			}
		}
		else if (keyPressed.startsWith("Arrow") == true)
		{
			if (tagAlreadyExisted == false)
			{
				var cursorMove;

				if (keyPressed == "ArrowDown")
				{
					cursorMove = new Coords(0, 1);
				}
				else if (keyPressed == "ArrowLeft")
				{
					cursorMove = new Coords(-1, 0);
				}
				else if (keyPressed == "ArrowRight")
				{
					cursorMove = new Coords(1, 0);
				}
				else if (keyPressed == "ArrowUp")
				{
					cursorMove = new Coords(0, -1);
				}

				if (inputHelper.isShiftPressed == true)
				{
					cursorMove.multiplyScalar(8);
				}

				this.cursor.pos.add(cursorMove);

				if (tagSelected != null)
				{
					tagSelected.size.add(cursorMove);
				}
			}
		}
		else if (keyPressed == "Delete")
		{
			if (tagSelected != null)
			{
				this.imageWithTags.tags.remove(tagSelected);
				this.cursor.tagSelected = null;
			}
		}
		else if (keyPressed == "Backspace")
		{
			if (tagSelected != null)
			{
				var text = tagSelected.text;
				tagSelected.text = text.substr(0, text.length - 1);
			}
		}
		else if (keyPressed.length == 1)
		{
			if (tagSelected != null)
			{
				tagSelected.text += keyPressed;
			}
		}

		inputHelper.clear();

		this.drawToDisplay(Globals.Instance.display);
	}

	// drawable

	drawToDisplay(display)
	{
		if (this.imageWithTags != null)
		{
			this.imageWithTags.drawToDisplay(display);
			this.cursor.drawToDisplay(display);
		}
	}
}
