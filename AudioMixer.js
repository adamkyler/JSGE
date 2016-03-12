

/*
 * AudoMixer contains functions for preloading, playing, and looping
 * sounds and music.
 */
 
function AudioMixer(){
	
	//Dict that contains [AudioElement,loaded]
	this.sounds = {};
	this.cb = null;
}

//Preloads a list of sounds, calls back when they are all preloaded
AudioMixer.prototype.preload = function(sounds,cb){
	this.cb = cb;
	for(var i=0;i<sounds.length;i++){
		var aud = new Audio(sounds[i]);
		aud.oncanplay = this.audioLoaded.bind([this,sounds[i]]);
		console.log(aud);
		this.sounds[sounds[i]] = [aud,false];
	}
}

//Audio file has been loaded, bound with [AudioMixer,audio file name]
AudioMixer.prototype.audioLoaded = function(){
	this[0].sounds[this[1]][1] = true;
	this[0].checkAllPreloaded();
}

//Checks if cb should happen, called when each audio element loads
AudioMixer.prototype.checkAllPreloaded = function(){
	for(var i in this.sounds){
		if(this.sounds[i][1]==false){return;}
	}
	this.cb();
}


//Plays a sound
AudioMixer.prototype.play = function(sound){
	if(this.sounds[sound][1]){this.sounds[sound][0].play();}
}
//Stops a sound
AudioMixer.prototype.stop = function(sound){
	if(this.sounds[sound][1]){this.sounds[sound][0].stop();}
}
//Loops a sound
AudioMixer.prototype.loop = function(sound){
	if(this.sounds[sound][1]){
		this.sounds[sound][0].loop = true;
		this.sounds[sound][0].play();
	}
}
