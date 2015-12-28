var Decorator = Class.create({
	
	
	bigRect : null,
	bottomLeftCorner : null,
	bottomRightCorner : null,
	topLeftCorner : null,
	topRightCorner : null,
	rotCircle : null,
	set : null,
	x : 0,
	y : 0,
	cx : 0,
	cy : 0,
	topLeftX : 0,
	topLeftY : 0,
	circleX : 0,
	circleY : 0,
	topRightX : 0,
	topRightY : 0,
	bottomRightX : 0,
	bottomRightY : 0,
	bottomLeftX : 0,
	bottomLeftY : 0,
	currentRotAngle : 0,
	currentAngle : 0,
	
	initialize: function(x, y, w, h){
		
		this.x = x;
		this.y = y;
		
		this.cx = x + w / 2.0;
		this.cy = y + h / 2.0;
		
		this.topLeftX = x;
		this.topLeftY = y;
		
		this.circleX = x + w / 2.0;
		this.circleY = y;
		
		this.topRightX = x + w;
		this.topRightY = y;
		
		this.bottomRightX = x + w;
		this.bottomRightY = y + h;
		
		this.bottomLeftX = x;
		this.bottomLeftY = y + h;
		
		this.bigRect = FormManager.canvas.rect(x, y, w, h);
		this.bigRect.attr("stroke-dasharray", "--");
		this.bigRect.attr("fill", "#5D8AA8");
		this.bigRect.attr("opacity", "0.4");
		
		this.rotCircle = FormManager.canvas.circle(x + w / 2, y, 10);
		this.rotCircle.attr("fill", "#5D8AA8");
	
		this.topLeftCorner = FormManager.canvas.rect(x - 5, y - 5, 10, 10);
		this.topLeftCorner.attr("fill", "#5D8AA8");
		
		this.bottomLeftCorner = FormManager.canvas.rect(x - 5, y + h - 5, 10, 10);
		this.bottomLeftCorner.attr("fill", "#5D8AA8");
	
		this.topRightCorner = FormManager.canvas.rect(x + w - 5, y - 5, 10, 10);
		this.topRightCorner.attr("fill", "#5D8AA8");
		
		this.bottomRightCorner = FormManager.canvas.rect(x + w - 5, y + h - 5, 10, 10);
		this.bottomRightCorner.attr("fill", "#5D8AA8");
		
		this.set = FormManager.canvas.set();
		this.set.push(this.bigRect, this.rotCircle, this.topLeftCorner, this.topRightCorner, this.bottomLeftCorner, this.bottomRightCorner);
		
		//this.set.attr("opacity", 0);//this is the default (in)visibility; change this on click
		
	}, 
	
	//this should be the function to call on click handler
	setVisible : function(isVisible){
		
		switch(isVisible)
		{
			case true:
				this.set.attr("opacity", 0.4);
				break;
				
			case false:
				this.set.attr("opacity", 0);
				break;
			
			default:
				break;
		}
	},
	
	remove : function(){
		this.set.remove();
	},
	
	resize_decorator: function(width,height, x, y)
	{
		this.bigRect.attr("width",width);
		this.bigRect.attr("height",height);
		this.bigRect.attr("x",x);
		this.bigRect.attr("y",y);
		
		this.topLeftCorner.attr("x",x-5);
		this.topLeftCorner.attr("y",y-5);
		
		this.topRightCorner.attr("x",x+width-5);
		this.topRightCorner.attr("y",y-5);
		
		this.bottomLeftCorner.attr("x",x-5);
		this.bottomLeftCorner.attr("y",y+height - 5);
		
		this.bottomRightCorner.attr("x",x+width-5);
		this.bottomRightCorner.attr("y",y+height-5);
		
		this.rotCircle.attr("cx",x + (width /2));
		this.rotCircle.attr("cy",y);
	},
	
	getXAfterRotate : function(angleRad, x, y, cx, cy){
		
		return Math.cos(angleRad) * (x - cx) - Math.sin(angleRad) * (y - cy)  + cx;
		},
	
	getYAfterRotate : function(angleRad, x, y, cx, cy){
		
		return Math.sin(angleRad) * (x - cx) + Math.cos(angleRad) * (y - cy) + cy;
	},
	
	rotate : function(){
		
		var argCount = arguments.length;
		
		var w = this.bigRect.attr("width");
		var h = this.bigRect.attr("height");
		
		if (argCount == 2) 
		{
			if(arguments[1] == true)
			{
				this.currentRotAngle = arguments[0] - this.currentAngle;
				this.currentAngle = arguments[0];
				
			}	
			
			else
			{
				this.currentRotAngle = arguments[0];
				this.currentAngle += arguments[0];
			}	
			
			this.bigRect.rotate(arguments[0], arguments[1]);
			
			
		}			
		else if (argCount == 3) 
		{
				
			this.currentRotAngle = arguments[0];
			this.bigRect.rotate(arguments[0], arguments[1], arguments[2]);
			
			this.cx = arguments[1];
			this.cy = arguments[2];
			
			
		}
		
		var angleRad = this.currentRotAngle * Math.PI / 180.0;
		
		/*we adjust the position of the top left corner*/
		var topLeftRotX = this.getXAfterRotate(angleRad, this.topLeftX, this.topLeftY, this.cx, this.cy);
		var topLeftRotY = this.getYAfterRotate(angleRad, this.topLeftX, this.topLeftY, this.cx, this.cy);
	    
	    this.topLeftX = topLeftRotX;
	    this.topLeftY = topLeftRotY;
		this.topLeftCorner.attr({x : this.topLeftX - 5 , y : this.topLeftY - 5});
		this.topLeftCorner.rotate(this.currentRotAngle,false);
		
		/*we adjust the position of the middle circle*/
		var circleXRot = this.getXAfterRotate(angleRad, this.circleX, this.circleY, this.cx, this.cy);
		var circleYRot = this.getYAfterRotate(angleRad, this.circleX, this.circleY, this.cx, this.cy);
		
		this.circleX = circleXRot;
		this.circleY = circleYRot;
		this.rotCircle.attr({cx : this.circleX, cy : this.circleY});
		
		/*we adjust the position of the top right corner*/
		var topRightRotX = this.getXAfterRotate(angleRad, this.topRightX, this.topRightY, this.cx, this.cy);
		var topRightRotY = this.getYAfterRotate(angleRad, this.topRightX, this.topRightY, this.cx, this.cy);
	    
	    this.topRightX = topRightRotX;
	    this.topRightY = topRightRotY;
		this.topRightCorner.attr({x : this.topRightX - 5 , y : this.topRightY - 5});
		this.topRightCorner.rotate(this.currentRotAngle,false);
		
		/*we adjust the position of the bottom right corner*/
		var bottomRightRotX = this.getXAfterRotate(angleRad, this.bottomRightX, this.bottomRightY, this.cx, this.cy);
		var bottomRightRotY = this.getYAfterRotate(angleRad, this.bottomRightX, this.bottomRightY, this.cx, this.cy);
	    
	    this.bottomRightX = bottomRightRotX;
	    this.bottomRightY = bottomRightRotY;
		this.bottomRightCorner.attr({x : this.bottomRightX - 5 , y : this.bottomRightY - 5});
		this.bottomRightCorner.rotate(this.currentRotAngle,false);
		
		/*we adjust the position of the bottom left corner*/
		var bottomLeftRotX = this.getXAfterRotate(angleRad, this.bottomLeftX, this.bottomLeftY, this.cx, this.cy);
		var bottomLeftRotY = this.getYAfterRotate(angleRad, this.bottomLeftX, this.bottomLeftY, this.cx, this.cy);
	    
	    this.bottomLeftX = bottomLeftRotX;
	    this.bottomLeftY = bottomLeftRotY;
		this.bottomLeftCorner.attr({x : this.bottomLeftX - 5 , y : this.bottomLeftY - 5});
		this.bottomLeftCorner.rotate(this.currentRotAngle,false);
		
	}
	
}
	
	
	
	
);
