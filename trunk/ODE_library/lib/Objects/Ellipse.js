var Ellipse = Class.create(DObject, {
	
	//variables
	id: 0,
	
	// the ellipse
	ellipse: null,
	x:null,
	y:null,
	width:null,
	height:null,
	
	// methods
	
	initialize: function($super, id, x, y, rx, ry) {
		
		$super(id,x , y, rx, ry,"ellipse");
		
		this.ellipse = FormManager.canvas.ellipse(x, y, rx, ry);
		this.decorator = new Decorator(x - rx, y - ry , 2 * rx, 2 * ry);
		this.set.push(this.ellipse, this.decorator);
		this.x = x;
		this.y = y;
		
	}, 
	
	rotate: function() {	
			
		var argCount = arguments.length;
		
		
		if (argCount == 2) 
		{
			if(arguments[1] == true)
			{
				this.currentAngle = arguments[0];
			}	
			
			else
			{
				this.currentAngle += arguments[0];
			}	
			this.ellipse.rotate(arguments[0], arguments[1]);
			this.decorator.set.rotate(arguments[0], arguments[1]);
			
			
			if(this.text != null)
				this.text.rotate(arguments[0], arguments[1]);
					
			
			var cx = this.ellipse.attr("cx") + this.ellipse.attr("rx");
			var cy = this.ellipse.attr("cy") + this.ellipse.attr("ry");
			
			
		}			
		else if (argCount == 3) {
				
			this.currentAngle = arguments[0];
			this.ellipse.rotate(arguments[0], arguments[1], arguments[2]);
			this.decorator.set.rotate(arguments[0], arguments[1], arguments[2]);
			
			var px = arguments[1];
			var py = arguments[2];
			if(this.text != null)
				this.text.rotate(arguments[0], px, py);
			
		}
		
		var angleRad = this.currentAngle * Math.PI / 180.0;
		var newX = Math.cos(angleRad) * (this.ellipse.attr("cx") - px) - Math.sin(angleRad) * (this.ellipse.attr("cy") - py)  + px;
		var newY = Math.sin(angleRad) * (this.ellipse.attr("cx") - px) + Math.cos(angleRad) * (this.ellipse.attr("cy") - py) + py;
		
	
		this.x = newX;
		this.y = newY;		
	},
	
	toString:function(){
		return "x "+this.x+",y "+this.y;
	},
	
	getWidth: function()
	{
		return 2*this.ellipse.attr("rx");
	},
	
	getHeight: function()
	{
		return 2*this.ellipse.attr("ry");
	},
	
	getX: function()
	{
		return this.ellipse.attr("cx")-this.ellipse.attr("rx");
	},
	getY: function()
	{
		return this.ellipse.attr("cy")-this.ellipse.attr("ry");
	},
	resize: function(width,height) {
		this.ellipse.attr("rx",width/2);
		this.ellipse.attr("ry",height/2);
		this.width = width;
		this.height = height;
		console.log(this.getWidth());
		this.decorator.resize_decorator(this.getWidth(), this.getHeight(), this.getX(), this.getY());
	},
	
	move: function(dx, dy) {
		this.ellipse.translate(dx, dy);
		this.decorator.set.translate(dx, dy);
		this.x += dx;
		this.y += dy;
	},
	
	setPosition: function(dx, dy) {
		
		this.ellipse.translate(dx - this.x, dy - this.y);
		this.decorator.set.translate(dx - this.x, dy - this.y);
		
		this.x = dx;
		this.y = dy;
		
	},
	
	scale: function(x, y) {
		
		this.ellipse.scale(x, y);
		this.decorator.set.scale(x, y);
			
		//this.height = this.ellipse.getBBox().height;
		//this.width = this.ellipse.getBBox().width;
		
	},
	// deletes rafael object
	deleteObject: function() {
		
		this.ellipse.remove();
		this.decorator.remove();
		
	},
	undo:function(memento){
		//old values restored
		
		this.width = memento.getWidth();
		this.height = memento.getHeight();
		//move back to old position
		this.move(memento.getX()-this.x,memento.getY()-this.y);
		
		this.x = memento.getX();
		this.y = memento.getY();
		
		this.ellipse.attr("rx", this.width);
		this.ellipse.attr("ry", this.height);
		
	},
	setAttr:function(prop,value){
		this.ellipse.attr(prop,value);
	}
	
});