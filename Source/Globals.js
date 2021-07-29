
class Globals
{
	// instance

	static Instance = new Globals();

	// methods

	initialize(session)
	{
		this.session = session;
		this.session.initialize();

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();
	}
}
