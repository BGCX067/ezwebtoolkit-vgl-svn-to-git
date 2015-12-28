var Container = Class.create(DObject,{
	
	// variables
	objectList: null,

	initialize: function() {
		this.objectList = new Array();		
	},
	
	addObject: function(objectForm){
		
		this.objectList.push(objectForm);
		
	},
	
	findObject: function(objectForm){
	
	  
	    for(var i=0; i < this.objectList.length; i++){
	    	
	    	if(this.objectList[i] == objectForm){
	    		
	    		return i;
	    	}
	    }	
		
	},
	
	removeLastObject: function(objectForm){
		
		this.objectList.pop(objectForm);
	},
	
	removeObject: function(objectForm){
		
		
		for(var i=0; i < this.objectList.length; i++){
	    	
	    	if(this.objectList[i] == objectForm){
	    		
	    		this.objectList.splice(i,1);
	    	}
	    }	
	},
	
	getWidth: function()
	{
		return this.rect.attr("width");
	},
	
	getHeight: function()
	{
		return this.rect.attr("height");
	},
	
	move: function(x,y){
		
		  for(var i=0; i < this.objectList.length; i++){
		  	
		  	 this.objectList[i].move(x,y);
		  	 
		  }
	},
	
	rotate: function(x,y) {
		
		for(var i=0; i < this.objectList.length; i++){
		  	
		  	 this.objectList[i].rotate(x,y);
		  	 
		  }
	},
	
	scale: function(x,y) {
		
		for(var i=0; i < this.objectList.length; i++){
		  	
		  	 this.objectList[i].scale(x,y);
		  	 
		  }
	},
	
	// trebe tinuta minte pozitia veche a containerului
	setPosition: function(dx, dy) {
		
		
		for(var i=0; i < this.objectList.length; i++){
		  	
		  	 this.objectList[i].setPosition(dx,dy);
		  	 
		  }
	},
	
	deleteObject: function() {
		
		for(var i=0; i < this.objectList.length; i++){
		  	
		  	 this.objectList[i].deleteObject();
		  	 
		  }
		  
		objectList = null;
	}

});


