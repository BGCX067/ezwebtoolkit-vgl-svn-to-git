var Rectangle = Class.create(DObject, {

	//variables

	// the effective rectangle, specified by raphael js library
	rect: null,
	ox : 0,
	oy : 0,
	decorator:null,
	width: null,
	height: null,
	// methods

	initialize: function($super, id, x , y, w, h, roundedCorners) {

		$super(id,x , y, w ,h,"rectangle");

		// roundedCorners radius may or may not be defined

		this.rect = FormManager.canvas.rect(x, y, w, h, roundedCorners);

		this.decorator = new Decorator(x,y,w,h);
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;

	},
	toString: function() {
		return "x "+this.x+",y "+this.y;
	},
	rotate: function() {

		var argCount = arguments.length;

		if (argCount == 2) {
			if(arguments[1] == true) {
				this.currentAngle = arguments[0];
			} else {
				this.currentAngle += arguments[0];
			}

			this.rect.rotate(arguments[0], arguments[1]);
			this.decorator.rotate(arguments[0], arguments[1]);

			if(this.text != null)
				this.text.rotate(arguments[0], arguments[1]);

			var cx = this.rect.attr("x") + this.rect.attr("width") / 2.0;
			var cy = this.rect.attr("y") + this.rect.attr("height") / 2.0;

		} else if (argCount == 3) {

			this.currentAngle = arguments[0];

			this.rect.rotate(arguments[0], arguments[1], arguments[2]);
			this.decorator.rotate(arguments[0], arguments[1], arguments[2]);

			var cx = arguments[1];
			var cy = arguments[2];

			if(this.text != null)
				this.text.rotate(arguments[0], cx, cy);

		}

		var angleRad = this.currentAngle * Math.PI / 180.0;
		var newX = Math.cos(angleRad) * (this.rect.attr("x") - cx) - Math.sin(angleRad) * (this.rect.attr("y") - cy) + cx;
		var newY = Math.sin(angleRad) * (this.rect.attr("x") - cx) + Math.cos(angleRad) * (this.rect.attr("y") - cy) + cy;

		this.x = newX;
		this.y = newY;

	},
	// moves this rectangle relative to the actual position
	move: function(dx, dy) {

		this.rect.translate(dx, dy);
		this.decorator.set.translate(dx, dy);

		this.x += dx;
		this.y += dy;

	},
	// moves the rectangle to this absolute position
	setPosition: function(dx, dy) {

		this.rect.translate(dx - this.x, dy - this.y);
		this.decorator.set.translate(dx - this.x, dy - this.y);//You have to call decorator.set.any-function to obtain the desired result

		this.x = dx;
		this.y = dy;
	},
	setText : function(txt) {

		if (txt.length == 0) {
			// delete from raphael
			this.text.remove();
			// set text with null
			this.text = null;

			return;
		}
		var cx = this.rect.attr("x") + this.rect.attr("width") / 2.0;
		var cy = this.rect.attr("y") + this.rect.attr("height") / 2.0;
		this.text = FormManager.canvas.text(cx, cy, txt);

	},
	getWidth: function() {
		return this.rect.attr("width");
	},
	getHeight: function() {
		return this.rect.attr("height");
	},
	getX: function()
	{
		return this.rect.attr("x");
	},
	getY: function()
	{
		return this.rect.attr("y");
	},
	resize: function(width,height) {
		this.rect.attr("width",width);
		this.rect.attr("height",height);
		this.width = width;
		this.height = height;
		this.decorator.resize_decorator(this.getWidth(), this.getHeight(), this.getX(), this.getY());
	},
	
	scale: function() {

		var argCount = arguments.length;

		if (argCount == 2) {
			console.log(arguments[0]);
			console.log(arguments[1]);

			this.rect.scale(arguments[0], arguments[1]);
			this.decorator.set.scale(arguments[0], arguments[1]);
		} else if (argCount == 4) {
			this.rect.scale(arguments[0], arguments[1], arguments[2], arguments[3]);
			this.decorator.set.scale(arguments[0], arguments[1], arguments[2], arguments[3]);
		}
		/*
 		this.height = this.rect.getBBox().height;
 		this.width = this.rect.getBBox().width;
 		*/
	},
	
	getObject: function() {
		return this.set;
	},
	// deletes the rectangle
	deleteObject: function() {

		this.rect.remove();
		this.decorator.remove();

	},
	undo: function(memento) {
		//old values restored
		this.x = memento.getX();
		this.y = memento.getY();
		this.width = memento.getWidth();
		this.height = memento.getHeight();

		//move back to old position
		this.rect.attr("x", this.x);
		this.rect.attr("y", this.y);

		this.rect.attr("width", this.width);
		this.rect.attr("height", this.height);

	},
	setAttr:function(prop,value){
		this.ellipse.attr(prop,value);
	}
});