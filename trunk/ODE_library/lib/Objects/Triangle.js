var Triangle = Class.create(DObject, {
	

	// the triangle
	triangle: null,
	
	//decorator
	decorator: null,
	
	// methods
	
	initialize: function($super, id, x, y, w, h) {
		
		$super(id, x, y, w ,h,"triangle");
		
		var x = this.x;
		var y = this.y;
		var w = this.width;
		var h = this.height;
		
		root.STATUS = "x: " + x + " y: " + y + " w: " + w + " h: " + h;
		
		this.triangle = FormManager.canvas.path("M "+ (x+(w/2)) +" "+y+"  L "+x+" "+ (y+h) +"L"+ (x+w) + " " + (y+h) + " L " + (x+(w/2))+ " " + y + "z");
		this.decorator = new Decorator(x,y,w,h);
		
		
	}, 
	
	createTrig: function() {
		
		var x = this.x;
		var y = this.y;
		var w = this.width;
		var h = this.height;
		
		root.STATUS = "x: " + x + " y: " + y + " w: " + w + " h: " + h;
		
		this.triangle = FormManager.canvas.path("M "+ (x+(w/2)) +" "+y+"  L "+x+" "+ (y+h) +"L"+ (x+w) + " " + (y+h) + " L " + (x+(w/2))+ " " + y + "z");
		this.decorator = new Decorator(x,y,w,h);
		
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
			
			this.triangle.rotate(arguments[0], arguments[1]);
			this.decorator.set.rotate(arguments[0], arguments[1]);
			
			
			if(this.text != null)
				this.text.rotate(arguments[0], arguments[1]);
					
			
			var cx = this.x + this.width / 2.0;
			var cy = this.y + this.height / 2.0;
			
			
		}			
		
		else if (argCount == 3) 
		{
			this.currentAngle = arguments[0];
			this.triangle.rotate(arguments[0], arguments[1], arguments[2]);
			this.decorator.set.rotate(arguments[0], arguments[1], arguments[2]);
			
			var cx = arguments[1];
			var cy = arguments[2];
			if(this.text != null)
				this.text.rotate(arguments[0], cx, cy);
			
		}
		
		
		var angleRad = this.currentAngle * Math.PI / 180.0;
		var newX = Math.cos(angleRad) * (this.x - cx) - Math.sin(angleRad) * (this.y - cy)  + cx;
		var newY = Math.sin(angleRad) * (this.x - cx) + Math.cos(angleRad) * (this.y - cy) + cy;
		
	
		this.x = newX;
		this.y = newY;		
	},
	
	getWidth: function()
	{
		return this.triangle.attr("width");
	},
	
	getHeight: function()
	{
		return this.triangle.attr("height");
	},
	getX: function()
	{
		return this.triangle.attr("x");
	},
	getY: function()
	{
		return this.triangle.attr("y");
	},
	resize: function(width,height) {
		this.triangle.attr("width",width);
		this.triangle.attr("height",height);
		this.width = width;
		this.height = height;
		this.decorator.resize_decorator(this.getWidth(), this.getHeight(), this.getX(), this.getY());
	},
	
	move: function(dx, dy) {
		this.triangle.translate(dx, dy);
		this.decorator.set.translate(dx, dy);
		this.x += dx;
		this.y += dy;
	},
	
	setPosition: function(dx, dy) {
		
		this.decorator.set.translate(dx - this.x, dy - this.y);
		this.x = dx;
		this.y = dy;
				
		this.deleteObject(false);
		this.createTrig();
		
		console.log(this.triangle.attr("x"));
		/*
		this.triangle.attr("x", dx);
		this.triangle.attr("y", dy);
		this.x = dx;
		this.y = dy; */
		
	},
	
	scale: function(x, y) {
		
		this.triangle.scale(x, y);
		this.decorator.set.scale(x, y);
			
		//this.height = this.ellipse.getBBox().height;
		//this.width = this.ellipse.getBBox().width;
		
	},
	
	// deletes the object
	deleteObject: function() {

		this.triangle.remove();
		
		this.decorator.remove();
	},
	
	toString:function() {
		return "x "+this.x+",y "+this.y;
	},
	
	undo:function(memento) {
		console.log(memento.toString());
		//old values restored
		this.width = memento.getWidth();
		this.height = memento.getHeight();
		
		//move back to old position
		this.move(memento.getX()-this.x,memento.getY()-this.y);
		
		this.x = memento.getX();
		this.y = memento.getY();
		
		this.triangle.attr("width", this.width);
		this.triangle.attr("height", this.height);
	}
	
});