RectangleTest = new TestCase("RectangleTest");

FormManager.canvas = new Raphael(900,900);
var rect = new Rectangle(-50, 100, 250, 100);
	
RectangleTest.prototype.testRectangleConstr = function(){	
	assertNoException("Exception expected",new Rectangle(59,45,-23,-34));
};

RectangleTest.prototype.testX = function(){	
	assertEquals("The object is not visible on the screen",0,rect.getX());
};
RectangleTest.prototype.testScale = function(){
	var height = rect.getHeight();
	assertNoException("Exception expected",rect.scale());
	
};
RectangleTest.prototype.testTranslate1 = function(){
	rect = new Rectangle(10,10,20,20);
	rect.setPosition(-20,20);
	assertSame("The object is not visible on the screen",0,rect.getX());
};
RectangleTest.prototype.testTranslate2 = function(){
	rect = new Rectangle(10,10,20,20);
	rect.move(20,20);
	assertSame("The object is not moved",30,rect.getAttr("x"));
};
RectangleTest.prototype.testTranslate3 = function(){
	rect = new Rectangle(10,10,20,20);
	rect.move(20000,20);
	assertNotSame("User moved object way out of screen",20010,rect.getX());
};
RectangleTest.prototype.testWidth = function(){	
	//rect.setAttr({"width":-20});
	assertEquals("Width can't be negative",0,rect.getWidth());
};