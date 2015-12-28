/**
 * Root class
 * @type {root}
 */
var root =
{
    TAB_KEY: 9,
    SPACE_KEY: 32,
    ARROW_KEY_UP: 38,
    ARROW_KEY_DOWN: 40,
    ARROW_KEY_LEFT: 37,
    ARROW_KEY_RIGHT: 39,
    ENTER_KEY: 13,
    V_KEY: 86,
    Y_KEY: 89,
    Z_KEY: 90,

    ESCAPE_KEY: 27,

    /**
     * Status of the application
     * @type {String}
     */
    STATUS: '',
    CMENU: true,
    

    /**
     * Create <b>NEW</b> Element by type
     * @param {String} what 	Element type
     * @return {Object} 		Returns the new element
     */
    $new: function(what)
    {
        return document.createElement(what);
    },

    /**
     * STATUS Watch Handler
     * @param {Object} newP	The new Value
     */
    WatcHandler: function(newP)
    {
        $('status_text').innerHTML = newP;
        return newP;
    },

    /**
     * AddEventListener
     * @overrided
     */
    addEventListener: function(element, eventName, eventHandler, scope)
    {
        var scopedEventHandler = scope ? function(e)
        {
            eventHandler.apply(scope, [e]);
        } : eventHandler;

        if(document.addEventListener)
            element.addEventListener(eventName, scopedEventHandler, false);
        else
        if(document.attachEvent)
            element.attachEvent("on"+eventName, scopedEventHandler);
    },
    
    
    
    ContextMenu_handler: function(event)
    {
    	if(!this.CMENU)
    	{
    		this.STATUS = this.CMENU;
    		event.preventDefault();
    		this.CMENU = true;
    		return false;
    	}
    	else
    	{
    		this.STATUS = this.CMENU;
    		return true;
    	}
    	
    },
    
    Resize_handler: function(event)
    {
    	var width = window.innerWidth;
    	var height = window.innerHeight;
    	this.STATUS = height;
    	
    	FormManager.canvas.setSize((width*90)/100,height - 40);
    	$("canvas_container").style.height = height - 40+"px";
    },

    /**
     * Initialize the root application
     */
    Initialize: function()
    {
        this.__defineSetter__('STATUS',this.WatcHandler);
        this.STATUS = "Initializing root class";
        this.addEventListener(document,'contextmenu', this.ContextMenu_handler, this);
        
      	FormManager.canvas = new Raphael($("canvas_container"), $("canvas_container").offsetWidth , $("canvas_container").offsetHeight);
		this.addEventListener(window,'resize', this.Resize_handler, this);
		this.Resize_handler(null);
		
		var dode = new DODEApp();

			/*var fm = new FormManager();
			var id = fm.createObject("rectangle");
			
			fm.objectList[id].rotate(70, true);
			fm.objectList[id].rotate(20, false);
			fm.objectList[id].rotate(45, true);
			fm.objectList[id].rotate(-25, false);*/
			//var rect = new Rectangle(100, 100, 10, 50);
			//var rect2 = new Rectangle(100, 100, 10, 10);
			//rect.rotate(90, true);
			//rect.setPosition(0,0);
			
			//var ellipse = new Ellipse(100,100,40,20);
			
			//var fm = new FormManager();
			
			/*fm.createObject("rectangle");
			fm.createObject("rectangle");
			fm.createObject("rectangle");
			fm.deleteObject(1);
			fm.createObject("rectangle");
			*/
		//	var id = fm.createObject("rectangle");
			
			//fm.objectList[id].setText("Heeey");
			//alert("rotate");
			//fm.objectList[id].rotate(45,true);
		//	fm.objectList[id].dragR();
			
			//fm.createObject("ellipse");
		this.STATUS = "Ready";
    },

}
