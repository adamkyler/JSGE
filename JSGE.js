

/*
 * JSGE interacts between game code and the outside world
 * It provides an interface for:
 *  Drawing to the canvas
 *  Loading images
 *  Loading and playing sounds
 *  Detecting and binding keypresses, mouse movements, etc
 */

function JSGE(canvas){
	
	//Get a handle on the canvas, create context
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	
	//Add event listeners to the canvas
	document.addEventListener("keydown",this.keyDown.bind(this));
	document.addEventListener("keyup",this.keyUp.bind(this));
	
	//Initialize list of pressed keys
	this.keys = [];
	
}


JSGE.prototype.keyDown = function(e){
	this.keys[e.keyCode] = true;
}
JSGE.prototype.keyUp = function(e){
	this.keys[e.keyCode] = false;
}
