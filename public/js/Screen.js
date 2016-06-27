'use strict'

var Screen = function (width, height) {
	this.canvas 		= document.createElement('canvas')
	this.canvas.width 	= this.width 	= width
	this.canvas.height 	= this.height 	= height

	this.ctx = this.canvas.getContext('2d')

	//	Append canvas to body
	document.body.appendChild(this.canvas)
}

//	Clear the canvas
Screen.prototype.clear = function () {
	this.ctx.clearRect(0, 0, this.width, this.height)
}

/**
* Draw a sprite instance to the canvas
* 
* @param  {Sprite} sp the sprite to draw
* @param  {number} x  x-coordinate to draw sprite
* @param  {number} y  y-coordinate to draw sprite
*/
Screen.prototype.drawSprite = function(sp, x, y) {
	let img = new Image()
	img.src = sp.img
	let ctx = this.ctx
	img.onload = function () {
		ctx.drawImage(this, sp.x, sp.y, sp.w, sp.h, x, y, sp.w, sp.h)
	}
}

/**
 * Draw a bullet instance to the canvas
 * @param  {Bullet} bullet the bullet to draw
 */
Screen.prototype.drawBullet = function(bullet) {
	// set the current fillstyle and draw bullet
	this.ctx.fillStyle = bullet.color
	this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
};

Screen.prototype.drawBackground = function (level) {
	let ctx 			= this.ctx
	let route 			= window.location.href
	let arrBackgrounds 	= ['img/stage/stage1.jpg', 'img/stage/stage2.jpg', 'img/stage/stage3.jpg', 
							'img/stage/stage4.jpg', 'img/stage/stage5.jpg', 'img/stage/stage6.jpg']
	let imageNumber = level - 1
	
	var img = new Image()
	img.src = route + arrBackgrounds[imageNumber]
	img.onload = function () {
		ctx.drawImage(img, 0, 0)
	}
}

