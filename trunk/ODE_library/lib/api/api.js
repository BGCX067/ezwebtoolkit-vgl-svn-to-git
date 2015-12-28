/**
 * @author Ionut
 */
var fm ;
var objects;
window.onload = function()
		{
			FormManager.canvas = new Raphael(document.getElementById("canvas_container"), 700,700);

			//var rect = new Rectangle(100, 100, 10, 50);
			//var rect2 = new Rectangle(100, 100, 10, 10);
			//rect.rotate(90, true);
			//rect.setPosition(0,0);
			
			//var ellipse = new Ellipse(100,100,40,20);
			
			fm = new FormManager();
			
			objects = [];
			/*
			fm.createObject("rectangle");
			fm.createObject("rectangle");
			fm.deleteObject(1);
			fm.createObject("rectangle");
			fm.createObject("rectangle");
			*/
			//fm.createObject("ellipse");
			

		}

document.onkeydown = function(evt) {
		//alert('you pressed ');
		var keyP;
		if (evt) {
			keyP = evt.which;
		}
		else{
			keyP = window.event.keyCode;
		}
		if(keyP == 13){

			processCommand();
		
		}
		
	}
processCommand = function(){
	var command = document.getElementById('text_area').value;
	var com = command.split(' ');
	//alert(com[1]);
	switch(com[0]){
	    case 'var':
			var id = fm.createObject(com[2]);
			objects[com[1]] = id;
			break;
		default:	
			fm.setObject(com[0],objects[com[1]],com[2],com[3]);
			
		}
	document.getElementById('text_area').value = '';

	return null;
}
