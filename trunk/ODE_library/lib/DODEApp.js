var DODEApp = Class.create({
	
	//variables
	
	// this object manages all the forms in DODE lib
	formManager: null,
	
	// the app controller handles all mouse events
	appcontroller: null,
	appGui: null,
	
	
	// methods
	
	initialize: function() {
		
		this.formManager = new FormManager();
		this.appGui = new AppGUI();
		this.appcontroller = new AppController(this.formManager,this.appGui);
		
		
		
		
	
		
	}
	
});