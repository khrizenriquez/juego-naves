'use strict'

var Hero = function () {
	this.img 		= window.location.href + 'img/hero/hero-up.png'

	//	Transparente
	this.imgTransp 	= window.location.href + 'img/hero/hero-up-transp.png'

	this.gameOver  	= false

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
}

Hero.prototype.setLife = function (life) {
	this.life = life || 0
}

Hero.prototype.addLife = function () {
	this.life++
}

/**
 * Score setters and getters 
 * 
 * @param {number} score     hero score
 */

Hero.prototype.getScore = function () {
	return this.score
}

Hero.prototype.setScore = function (score) {
	this.score = score || 0
}

Hero.prototype.isGameOver = function() {
	return this.gameOver
}

/**
 * Power setters and getters 
 * 
 * @param {number} power    	hero current power
 */
Hero.prototype.getPower = function() {
	return this.power
}
Hero.prototype.setPower = function(power) {
	let p = power || 0

	if (isNaN(p)) p = 0

	this.power = p
}

 /**
 * Level setters and getters 
 * 
 * @param {number} level    	hero current level
 */

Hero.prototype.getLevel = function () {
	return this.level
}

Hero.prototype.setLevel = function (level) {
	this.level = level || 1
}

Hero.prototype.addLevel = function () {
	this.level++
}
