var Caretaker = Class.create({
	
	// variables

	mementoList:null,	
	// methods
	initialize: function(){
		this.mementoList = [];
	},
	addMemento:function(memento){
		this.mementoList.push(memento);
	},
	getMemento:function(){
		return this.mementoList.pop();
	}
});	