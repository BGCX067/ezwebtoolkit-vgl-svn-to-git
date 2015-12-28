var Memento = Class.create({
	
	// variables
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	id: -1,	
	objectType:null,
	command:null,
	// methods
	initialize: function(id, x , y, w ,h,objectType) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.objectType = objectType;
		
	},
	getId:function(){
		return this.id;
	},
	getX:function(){
		return this.x;
	},
	getY:function(){
		return this.y;
	},
	getWidth:function(){
		return this.width;
	},
	getHeight:function(){
		return this.height;
	},
	getCommand:function(){
		return this.command;
	},
	getType:function(){
		return this.objectType;
	},
	setCommand:function(command){
		this.command = command;
	},
	toString:function(){
		return "[memento]x "+this.x+",y "+this.y;
	}
});