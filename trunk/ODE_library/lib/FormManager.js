var FormManager = Class.create({
	
	// variables
	objectList: null,

	// methods
	/**
	 * @return void
	 * @param [string]
	 */
	initialize: function() {
		this.objectList = new Array();		
	},

	createObject: function(name) {

		var newObj;
		var newId = this.getNextFreeId();
		
		
		switch (name)
		{
			case "rectangle": newObj = new Rectangle(newId, 20, 20, 100, 100); break;
			case "triangle": newObj = new Triangle(newId, 20, 20, 100, 100); break;
			case "ellipse": newObj = new Ellipse(newId, 20, 20, 50, 50); break;
			default: alert("Error: This object does not exist!");	
		}
		
		//newObj.rect.node.addEventListener("mousedown", null, true);
		//newObj.getObject().attr("src", newId);
		this.objectList[newId] = newObj;
		newObj.decorator.bigRect.node.id= "dec_"+newId;
		newObj.decorator.topLeftCorner.node.id= "tlc_"+newId;
		newObj.decorator.topRightCorner.node.id= "trc_"+newId;
		newObj.decorator.bottomLeftCorner.node.id= "blc_"+newId;
		newObj.decorator.bottomRightCorner.node.id= "brc_"+newId;
		newObj.decorator.rotCircle.node.id= "rot_"+newId;
		
		
		return newId;
		
	},
	
	// THE CONNECT FUNCTION THIS IS THE NEW SHIT!!!!!!!!!!!
	connect: function(id1, id2) {
		var newObj;
		var newId = this.getNextFreeId();
		
		//newObj = new Line(newId, id1.x, id1.y, id2.x, id2.y);
		var x1 = this.objectList[id1].getX();
		var y1 = this.objectList[id1].getY();
		var x2 = this.objectList[id2].getX();
		var y2 = this.objectList[id2].getY();
		var w1 = this.objectList[id1].getWidth();
		var h1 = this.objectList[id1].getHeight();
		var w2 = this.objectList[id2].getWidth();
		var h2 = this.objectList[id2].getHeight();
		
		//alert(x1);
		
		var d19 = Math.sqrt( Math.pow( (x2+w2-x1), 2 ) + Math.pow( (y2+h2-y1), 2 ));
		var d28 = Math.sqrt( Math.pow( ((x2+w2/2)-(x1+w1/2)), 2 ) + Math.pow( (y2+h2-y1), 2 ));
		var d37 = Math.sqrt( Math.pow( (x2-(x1+w1)), 2 ) + Math.pow( (y2+h2-y1), 2 ));
		var d46 = Math.sqrt( Math.pow( (x2+w2-x1), 2 ) + Math.pow( (y2+h2/2-(y1+h1/2)), 2 ));
		var d64 = Math.sqrt( Math.pow( (x2-(x1+w1)), 2 ) + Math.pow( (y2+h2/2-(y1+h1/2)), 2 ));
		var d73 = Math.sqrt( Math.pow( (x2+w2-x1), 2 ) + Math.pow( (y2-(y1+h1)), 2 ));
		var d82 = Math.sqrt( Math.pow( ((x2+w2/2)-(x1+w1/2)), 2 ) + Math.pow( (y2-(y1+h1)), 2 ));
		var d91 = Math.sqrt( Math.pow( (x2-(x1+w1)), 2 ) + Math.pow( (y2-(y1+h1)), 2 ));
		
		//alert(d19);
		
		var min = 30000;
		var cc = 0;
		if (d19 < min) 
		{
			min = d19;
			cc = 1;
		}
		if (d28 < min) 
		{
			min = d28;
			cc = 2;
		}
		if (d37 < min) 
		{
			min = d37;
			cc = 3;
		}
		if (d46 < min) 
		{
			min = d46;
			cc = 4;
		}
		if (d64 < min) 
		{
			min = d64;
			cc = 6;
		}
		if (d73 < min) 
		{
			min = d73;
			cc = 7;
		}
		if (d82 < min) 
		{
			min = d82;
			cc = 8;
		}
		if (d91 < min) 
		{
			min = d91;
			cc = 9;
		}
		
		switch(cc)
		{
			case 1:
				newObj = new Line(newId, x1, y1, x2+w2, y2+h2);
				break;
			case 2:
				newObj = new Line(newId, x1+w1/2, y1, x2+w2/2, y2+h2);
				break;
			case 3:
				newObj = new Line(newId, x1+w1, y1, x2, y2+h2);
				break;
			case 4:
				newObj = new Line(newId, x1, y1+h1/2, x2+w2, y2+h2/2);
				break;
			case 6:
				newObj = new Line(newId, x1+w1, y1+h1/2, x2, y2+h2/2);
				break;	
			case 7:
				newObj = new Line(newId, x1, y1+h1, x2+w2, y2);
				break;
			case 8:
				newObj = new Line(newId, x1+w1/2, y1+h1, x2+w2/2, y2);
				break;
			case 9:
				newObj = new Line(newId, x1+w1, y1+h1, x2, y2);
				break;
			default:
				alert("probleme gogule");
				break;
		}
		
		this.objectList[newId] = newObj;
		
	
	},
	
	
	cloneObject: function() {
		
	},
	
	getObjectById: function(id) {
		return this.objectList[id];
	},

	setObject: function() {
		
		var command = arguments[0];
		var id = arguments[1];
		
		switch(command){
			case 'move' : this.objectList[id].move(arguments[2],arguments[3]); break;
			case 'setPosition': this.objectList[id].setPosition(arguments[2],arguments[3]); break;
		}
		
	},
	
	deleteObject: function(id) {
		this.objectList[id].deleteObject();
		delete this.objectList[id];
	},
	
	// returns a free id to use for a new object
	getNextFreeId: function() {
		
		for (i = 0; i < this.objectList.length; i++) {
			if (this.objectList[i] == undefined)
				return i;
		}
		
		return this.objectList.length;
		
	}

});


