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
