

/*
 * SpriteSheet can contain a single sprite, and multiple
 * named subimages
 */


function SpriteSheet(img,cb){
	this.img = new Image();
	this.img.src = img;
	this.cb = cb;
	this.ready = false;
	this.images = {};
	
	//Call back when finished loading
	this.img.onload = function(){
		this.ready = true;
		this.cb();
	}.bind(this);
}

//Creates a named subimage
//Returns true on failure
SpriteSheet.prototype.setImage = function(name,x,y,w,h){
	
	if(!this.ready){return true};
	
	var img = document.createElement("canvas");
	img.width = w;
	img.height = h;
	var ctx = img.getContext("2d");
	ctx.drawImage(this.img,-x,-y);
	
	this.images[name] = img;
	
	return false;
}

//Request a subimage by name
//Returns null if the main image has not been loaded yet
SpriteSheet.prototype.getImage = function(name){
	if(!this.ready){return null};
	return this.images[name];
}
