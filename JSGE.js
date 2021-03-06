

/*
 * JSGE interacts between game code and the outside world
 * It provides an interface for:
 *  Drawing to the canvas
 *  Loading images
 *  Loading and playing sounds
 *  Detecting and binding keypresses, mouse movements, etc
 */


var JSGE_MAX_TICK_DISTANCE = 10;

function JSGE(canvas){
	
	//Get a handle on the canvas, create context
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	
	//Add event listeners to the canvas
	document.addEventListener("keydown",this.keyDown.bind(this));
	document.addEventListener("keyup",this.keyUp.bind(this));
	
	//Initialize list of pressed keys
	this.keys = [];
	
	//Initialize alerts
	this.alerts = []
	
	
	this.lastTime = null;
	this.timer = null;
	this.tickCb = null;
	
}

//Sets a recurring timer
JSGE.prototype.setTimer = function(cb,dur){
	this.tickCb = cb;
	this.lastTime = new Date().getTime();
	this.timer = setInterval(this.tick.bind(this),dur);
}
//Called after timer is set, passes elapsed time to callback function
JSGE.prototype.tick = function(){
	var cTime = new Date().getTime();
	var dif = cTime-this.lastTime;
	this.lastTime = cTime;
	
	//Skip if there is a large enough time difference
	if(dif>JSGE_MAX_TICK_DISTANCE){return;}
	
	//Else pass through to the callback
	this.tickCb(dif);
	
}


//Global alert, recieves JSON and stores in buffer
JSGE.prototype.alert = function(alt){
	this.alerts.push(alt);
}
//Gets the next alert from the queue
JSGE.prototype.getAlert = function(){
	return this.alerts.shift();
}
//Returns true if there is an alert in the queue
JSGE.prototype.hasAlert = function(){
	return this.alerts.length>0;
}


//Returns the context for drawing 
JSGE.prototype.getCtx = function(){
	return this.ctx;
}
JSGE.prototype.expandCanvas = function(){
	this.canvas.style.width ='100%';
	this.canvas.style.height='100%';
	this.canvas.width = this.canvas.offsetWidth;
	this.canvas.height = this.canvas.offsetHeight;
}


//Functions bound to event listeners
JSGE.prototype.keyDown = function(e){
	this.keys[e.keyCode] = true;
}
JSGE.prototype.keyUp = function(e){
	this.keys[e.keyCode] = false;
}
