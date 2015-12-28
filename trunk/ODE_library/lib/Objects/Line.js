var Line = Class.create(DObject, {
	
	line: null,
	
	//methods
	
	initialize: function($super, id, x1 , y1, x2, y2) {

		$super(id);
	
		// roundedCorners radius may or may not be defined
		
		
		this.line = FormManager.canvas.path("M"+ x1 +" "+y1+"L" + x2+" "+y2);
		
		this.line.attr({"stroke-width": 3});
		
		
	}, 
	
	deleteObject: function() {
		this.line.remove();
		
	},
	
});