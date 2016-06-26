'use strict'

/**
 * Bullet class 
 * 
 * @param {number} x     start x position
 * @param {number} y     start y position
 * @param {number} vely  velocity in y direction
 * @param {number} w     width of the bullet in pixels
 * @param {number} h     height of the bullet in pixels
 * @param {string} color hex-color of bullet
 */
var Bullet = function (x, y, vely, w, h, color) {
	this.x 		= x
	this.y 		= y
	this.vely 	= vely
	this.width 	= w
	this.height = h
	this.color 	= color
}

/**
 * Update bullet position
 */
Bullet.prototype.update = function() {
	this.y += this.vely
}
