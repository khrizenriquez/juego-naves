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
	this.lifes 		= 3
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
	return this.lifes
};

Hero.prototype.setLife = function (life) {
	this.lifes = life || 0
};

Hero.prototype.addLife = function () {
	this.lifes++
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
	this.lifes = score || 0
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
