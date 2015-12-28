var DObject = Class.create({
	
	// variables
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	id: -1,
	text: null,	
	set : null,
	type: null,
	decorator : null,
	currentAngle : null,
	
	// methods, type is used for undo 
	initialize: function(id, x , y, w ,h,type) {
		
		this.id = id;
		this.set = FormManager.canvas.set();
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.type = type;
		
	},
	createUndo:function(){
		return new Memento(this.id,this.x,this.y,this.w,this.h,this.type);
	
	},
	/* 
	 * dx : Pixels of translation by X axis
     * dy : Pixels of translation by Y axis
	 */
	move: function(dx, dy) {
		
	},
	
	
	rotate: function() {
		
	},
	
	scale: function() {
		
	},
		
	getId: function() {
		return this.id;
	},
	
	getDepth: function() {
		
	},
	
	setDepth: function() {
		
	},
	
	createObject: function() {
		
	},
	
	getObject: function() {
		
	},
	
	deleteObject: function() {
			
	},
	
	setText: function(txt) {
		
	}
	
});

