
class InputHelper
{
	constructor()
	{
		this.keyPressed = null;
		this.isShiftPressed = false;

		this.keysToPreventDefaultActionFor =
		[
			" ",
			"ArrowDown", "ArrowLeft", "ArrowRight","ArrowUp",
			"Enter"
		];
	}

	clear()
	{
		this.keyPressed = null;
		this.isShiftPressed = null;
	}

	initialize()
	{
		var body = document.body;
		body.onkeydown = this.handleEventKeyDown.bind(this);
		body.onkeyup = this.handleEventKeyUp.bind(this);
	}

	// events

	handleEventKeyDown(event)
	{
		var keyPressed = event.key;

		if (this.keysToPreventDefaultActionFor.indexOf(keyPressed) >= 0)
		{
			event.preventDefault();
		}

		this.keyPressed = keyPressed;
		this.isShiftPressed = event.shiftKey;

		var elementActive = document.activeElement;
		var elementActiveTypeName = elementActive.constructor.name;
		if (elementActiveTypeName == "HTMLCanvasElement")
		{
			Globals.Instance.session.update();
		}
	}

	handleEventKeyUp(event)
	{
		this.keyPressed = null;
	}
}
