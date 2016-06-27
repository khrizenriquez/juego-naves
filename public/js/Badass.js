'use strict'

var Badass = function (level) {
	this.img 		= window.location.href + 'img/badass/badAss_[number].png'

	//	Transparente
	this.imgTransp 	= window.location.href + 'img/badass/Badass-up-transp.png'

	this.x 			= new Handler().getRandom(20, 750)
	this.y 			= new Handler().getRandom(10, 30)
	this.w 			= 30
	this.h 			= 30
	this.level 		= level || 1
	this.life 		= (this.level * 5)
}

/**
 * Life setters and getters 
 * 
 * @param {number} life     Badass life
 */
Badass.prototype.getLife = function () {
	return this.life
};

Badass.prototype.setLife = function (life) {
	this.life = life || 0
};

/**
 * Level setters and getters 
 * 
 * @param {number} leve     Badass level
 */
Badass.prototype.getLevel = function () {
	return this.level
};

Badass.prototype.setLevel = function (level) {
	this.level = level || 1
};

//	Badass image
Badass.prototype.getImg = function() {
	let l = this.level || 1

	if (isNaN(l)) l = 1

	return this.img.replace('[number]', l)
};

