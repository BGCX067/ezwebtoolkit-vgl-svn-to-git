var AppController = Class.create(
{

	//variables
	formManager: null,
	GuiApp: null,
	objects: [],
	isDrag: null,
	focus_id:null,
	focus_connect:null,
	// methods
	addEventListener: function(element, eventName, eventHandler, scope) {
		var scopedEventHandler = scope ? function(e) {
			eventHandler.apply(scope, [e]);
		} : eventHandler;
		if(document.addEventListener)
			element.addEventListener(eventName, scopedEventHandler, false);
		else if(document.attachEvent)
			element.attachEvent("on"+eventName, scopedEventHandler);
	},
	initialize: function(fm,ga) {

		this.formManager = fm;
		this.GuiApp = ga;
		this.addEventListener($("canvas_container"),'mousedown', this.respondToMouseDown, this);
		this.addEventListener($("canvas_container"),'mousemove', this.respondToMouseMove, this);
		this.addEventListener($("canvas_container"),'mouseup', this.respondToMouseUp, this);

		//touch events
		this.addEventListener($("canvas_container"),'touchstart', this.touchHandler, this);
		this.addEventListener($("canvas_container"),'touchmove', this.touchHandler, this);
		this.addEventListener($("canvas_container"),'touchend', this.touchHandler, this);
		this.addEventListener($("canvas_container"),'touchcancel', this.touchHandler, this);
		//this.addEventListener($("canvas_container"),'touchend', this.respondToMouseUp, this);
	},
	touchHandler: function(event) {
		var touches = event.changedTouches,
		first = touches[0],
		type = "";

		switch(event.type) {
			case "touchstart":
				type = "mousedown";
				break;
			case "touchmove":
				type="mousemove";
				break;
			case "touchend":
				type="mouseup";
				break;
			default:
				return;
		}

		//initMouseEvent(type, canBubble, cancelable, view, clickCount,
		//           screenX, screenY, clientX, clientY, ctrlKey,
		//           altKey, shiftKey, metaKey, button, relatedTarget);

		var simulatedEvent = document.createEvent("MouseEvent");
		simulatedEvent.initMouseEvent(type, true, true, window, 1,
		first.screenX, first.screenY,
		first.clientX, first.clientY, false,
		false, false, false, 0/*left*/, null);

		first.target.dispatchEvent(simulatedEvent);
		event.preventDefault();
	},
	respondToMouseDown: function(event) {

		var x = event.clientX - $("canvas_container").offsetLeft;
		var y = event.clientY - $("canvas_container").offsetTop;
		//event.preventDefault();

		//event.target.style.display = "none";

		var rafaelObject = this.objects["dec_"+event.target.id.split("_")[1]];

		if(rafaelObject == null) {
			//alert("not a rafael object");
		} else {
			//alert("rafael");
			//rafaelObject.move(80,80);
			this.isDrag = rafaelObject;
			this.isDrag.dx = x;
			this.isDrag.dy = y;
			//alert(this.isDrag);
		}

		switch (this.GuiApp.Action) {

			case "select":
				{

				if(this.focus_id)
					this.objects["dec_"+this.focus_id.split("_")[1]].decorator.setVisible(false);
				this.focus_id = event.target.id;
				this.isDrag.decorator.setVisible(true);

				var m = event.target.id.split("_")[0];
				switch(m) {
					case "dec":
						{
						this.isDrag.move(x-this.isDrag.dx,y-this.isDrag.dy);
						FormManager.canvas.safari();
						this.isDrag.dx = x;
						this.isDrag.dy = y;
						this.isDrag.m = m;
						}
						break;
					case "tlc":
						{
						this.isDrag.move(x-this.isDrag.dx,y-this.isDrag.dy);
						this.isDrag.resize(Math.abs(x - this.isDrag.getX()), Math.abs(y - this.isDrag.getY()));
						this.isDrag.dx = x;
						this.isDrag.dy = y;
						FormManager.canvas.safari();
						this.isDrag.m = m;
						}
						break;
					case "trc":
						{
						this.isDrag.move(this.isDrag.getX(),y-this.isDrag.dy);
						this.isDrag.resize(Math.abs(x - this.isDrag.getX()), Math.abs(y - this.isDrag.getY()));
						this.isDrag.dx = x;
						this.isDrag.dy = y;
						FormManager.canvas.safari();
						this.isDrag.m = m;
						}
						break;
					case "blc":
						{
						this.isDrag.move(x-this.isDrag.dx,this.isDrag.getY());
						this.isDrag.resize(Math.abs(x - this.isDrag.getX()), Math.abs(y - this.isDrag.getY()));
						this.isDrag.dx = x;
						this.isDrag.dy = y;
						FormManager.canvas.safari();
						this.isDrag.m = m;
						}
						break;
					case "brc":
						{
						this.isDrag.resize(x - this.isDrag.getX(), y - this.isDrag.getY());
						FormManager.canvas.safari();
						this.isDrag.m = m;
						}
						break;
					case "rot":
						break;
				}

				}
				break;

			case "create":

				a = this.formManager.createObject(this.GuiApp.Active);
				a = this.formManager.getObjectById(a);

				a.setPosition(x, y);
				a.decorator.setVisible(false);

				this.objects[a.decorator.bigRect.node.id] = a;
				console.log(a.decorator.bigRect.node);
				break;
				
			case "connect":
				{
					if(this.focus_id && (this.focus_id.split("_")[1]) != event.target.id.split("_")[1] )
					{
						this.formManager.connect(this.focus_id.split("_")[1],event.target.id.split("_")[1]);
						this.objects["dec_"+this.focus_id.split("_")[1]].decorator.setVisible(false);
						this.objects["dec_"+event.target.id.split("_")[1]].decorator.setVisible(false);
						this.focus_id = null;
					}
					else
					{	
					this.focus_id = event.target.id;
					this.isDrag.decorator.setVisible(true);
					}
					break;
				}

		}

		/*
 		console.log("down");
 		x = event.clientX - $("canvas_container").offsetLeft;
 		y = event.clientY - $("canvas_container").offsetTop;

 		//event.target.style.display = "none";
 		//alert(event.target===myrect);
 		rafaelObject = this.objects[event.target];
 		if(rafaelObject == null){
 		//alert("not a rafael object");
 		}
 		else{
 		//alert("rafael");
 		//rafaelObject.move(80,80);
 		this.isDrag = rafaelObject;
 		this.isDrag.dx = x;
 		this.isDrag.dy = y;
 		//alert(this.isDrag);
 		}*/

	},
	respondToMouseUp: function(event) {
		//event.preventDefault();
		if(event.which == 3) {
			root.CMENU = false;
		} else {
			this.isDrag = null;
		}

	},
	respondToMouseMove: function(event) {
		x = event.clientX - $("canvas_container").offsetLeft;
		y = event.clientY - $("canvas_container").offsetTop;
		event.preventDefault();
		if(this.isDrag) {

			var m = event.target.id.split("_")[0];
			switch(m) {
				case "dec":
					{
					if(event.target === this.isDrag.decorator.bigRect.node) {
						this.isDrag.move(x-this.isDrag.dx,y-this.isDrag.dy);
						FormManager.canvas.safari();
						this.isDrag.dx = x;
						this.isDrag.dy = y;
						this.isDrag.m = m;
					}}
					break;
				case "tlc":
					{
					if(event.target === this.isDrag.decorator.topLeftCorner.node) {
						this.isDrag.move(x-this.isDrag.dx,y-this.isDrag.dy);
						this.isDrag.resize(Math.abs(x - this.isDrag.getX()), Math.abs(y - this.isDrag.getY()));
						this.isDrag.dx = x;
						this.isDrag.dy = y;
						FormManager.canvas.safari();
						this.isDrag.m = m;
					}}
					break;
				case "trc":
					{
					if(event.target === this.isDrag.decorator.topRightCorner.node) {
						this.isDrag.move(this.isDrag.getX(),y-this.isDrag.dy);
						this.isDrag.resize(Math.abs(x - this.isDrag.getX()), Math.abs(y - this.isDrag.getY()));
						this.isDrag.dx = x;
						this.isDrag.dy = y;
						FormManager.canvas.safari();
						this.isDrag.m = m;
					}}
					break;
				case "blc":
					{
					if(event.target === this.isDrag.decorator.bottomLeftCorner.node) {
						this.isDrag.move(x-this.isDrag.dx,this.isDrag.getY());
						this.isDrag.resize(Math.abs(x - this.isDrag.getX()), Math.abs(y - this.isDrag.getY()));
						this.isDrag.dx = x;
						this.isDrag.dy = y;
						FormManager.canvas.safari();
						this.isDrag.m = m;
					}}
					break;
				case "brc":
					{
					if(event.target === this.isDrag.decorator.bottomRightCorner.node) {
						this.isDrag.resize(x-this.isDrag.getX(), y-this.isDrag.getY());
						FormManager.canvas.safari();
						this.isDrag.m = m;
					}
					}
					break;
				case "rot":
					break;
			}
		}

	}
});