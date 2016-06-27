'use strict'

var Hero = function () {
	this.img 		= window.location.href + 'img/hero/hero-up.png'

	//	Transparente
	this.imgTransp 	= window.location.href + 'img/hero/hero-up-transp.png'

	this.x 			= 0
	this.y 			= 0
	this.w 			= 62
	this.h 			= 62
	this.power  	= 10
	this.life 		= 3
	this.level  	= 1
	this.userName 	= ''
	this.score 		= 0
}

/**
 * Life setters and getters 
 * 
 * @param {number} life     hero life
 */
Hero.prototype.getLife = function () {
	return this.life
};

Hero.prototype.setLife = function (life) {
	this.life = life || 0
};

Hero.prototype.addLife = function () {
	this.life++
};

/**
 * Score setters and getters 
 * 
 * @param {number} score     hero score
 */

Hero.prototype.getScore = function () {
	return this.score
};

Hero.prototype.setScore = function (score) {
	this.score = score || 0
};

/**
 * Level setters and getters 
 * 
 * @param {number} leve    	hero current level
 */

Hero.prototype.getLevel = function () {
	return this.level
};

Hero.prototype.setLevel = function (level) {
	this.level = level || 1
};
