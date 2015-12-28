var AppGUI = Class.create({
	
	Active: null,
	Action: null,
	Selected: null,
	
	select_btn_handler: function() {
		if(this.Selected)
			$(this.Selected).id = this.Selected.split("_active").join("");
		$("select_btn").id = "select_btn_active";
		this.Selected = "select_btn_active"; 
		this.Action = "select";
		this.Active = "null";
	},
		
	rect_btn_handler: function(){
		if(this.Selected)
			$(this.Selected).id = this.Selected.split("_active").join("");
		$("rect_btn").id = "rect_btn_active";
		this.Selected = "rect_btn_active"; 
		this.Action = "create";
		this.Active = "rectangle";
	},
	
	trig_btn_handler: function(){
		if(this.Selected)
			$(this.Selected).id = this.Selected.split("_active").join("");
		$("trig_btn").id = "trig_btn_active";
		this.Selected = "trig_btn_active"; 
		this.Action = "create";
		this.Active = "triangle";
	},
	
	circ_btn_handler: function(){
		if(this.Selected)
			$(this.Selected).id = this.Selected.split("_active").join("");
		$("circ_btn").id = "circ_btn_active";
		this.Selected = "circ_btn_active"; 
		this.Action = "create";
		this.Active = "ellipse";
	},
	
	text_btn_handler: function(){
		if(this.Selected)
			$(this.Selected).id = this.Selected.split("_active").join("");
		$("text_btn").id = "text_btn_active";
		this.Selected = "text_btn_active"; 
		this.Action = "create";
		this.Active = "text";
	},
	
	line_btn_handler: function(){
		if(this.Selected)
			$(this.Selected).id = this.Selected.split("_active").join("");
		$("line_btn").id = "line_btn_active";
		this.Selected = "line_btn_active"; 
		this.Action = "connect";
		this.Active = "line";
	},
	
	init_left_meniu: function() {
		
		var d = root.$new("div");
    	d.id = "left_menu";
    	
    	var btn = root.$new("div");
    	btn.id = "select_btn";
    	btn.className = 'btn';
    	d.appendChild(btn);    	
    	root.addEventListener(btn, 'click', this.select_btn_handler, this);
    	
    	var btn = root.$new("div");
    	btn.id = "rect_btn";
    	btn.className = 'btn';
    	d.appendChild(btn);    	
    	root.addEventListener(btn,'click', this.rect_btn_handler, this);
    	
    	btn = root.$new("div");
    	btn.id = "circ_btn";
    	btn.className = 'btn';
    	d.appendChild(btn);
    	root.addEventListener(btn,'click', this.circ_btn_handler, this);
    	
    	btn = root.$new("div");
    	btn.id = "trig_btn";
    	btn.className = 'btn';
    	d.appendChild(btn);
    	root.addEventListener(btn,'click', this.trig_btn_handler, this);
    	
    	btn = root.$new("div");
    	btn.id = "line_btn";
    	btn.className = 'btn';
    	d.appendChild(btn);
    	root.addEventListener(btn,'click', this.line_btn_handler, this);
    	
    	btn = root.$new("div");
    	btn.id = "text_btn";
    	btn.className = 'btn';
    	d.appendChild(btn);
    	root.addEventListener(btn,'click', this.text_btn_handler, this);
    	
    	document.body.appendChild(d);
	},
	
	
	initialize: function() {
		
		this.init_left_meniu();
		
		root.STATUS = "AppGui Ready";
	}
	
});