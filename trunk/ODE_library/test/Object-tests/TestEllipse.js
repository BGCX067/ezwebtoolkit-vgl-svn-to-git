EllipseTest = new TestCase("EllipseTest");

FormManager.canvas = new Raphael(900,900);
var ellipse = new Ellipse(-50, 50, 20, 20);

EllipseTest.prototype.testEllipseConstr = function(){	
	assertNoException("Exception expected",new Ellipse(59,45,-23,-34));
};

EllipseTest.prototype.testRx = function(){
	ellipse.setAttr("width",-20);
	assertEquals("Negative width",0,ellipse.getX());
};
EllipseTest.prototype.testX= function(){
	assertSame("Negative x",0,ellipse.getX());
};
EllipseTest.prototype.testScale = function(){
	var rx = ellipse.getX();
	assertNoException("No parameters provided to scale - exception expected",ellipse.scale());
};
RectangleTest.prototype.testTranslate = function(){
	ellipse.move(-20,-400);
	assertEquals("This object is not visible on the screen",0,rect.getY());
};

