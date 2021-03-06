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
	let img = new Image(), 
		ctx = this.ctx

	img.src = sp.img
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

	//context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
};

Screen.prototype.drawText = function (text, xPos) {
	let context = this.ctx

	context.font = "16px arial"
  	context.fillText(`${text}`, xPos, 30)
}

Screen.prototype.drawLifes = function(userLifes) {
	let l 		= userLifes, 
		ctx 	= this.ctx, 
		img 	= new Image(),
		hero  	= new Hero()
	if (isNaN(l)) l = 0

	img.src = hero.imgTransp
	img.onload = function () {
		let i = 0
		for (i; i < l; i++) {
			//ctx.drawImage(this, sp.x, sp.y, sp.w, sp.h, x, y, 20, 20)
			ctx.drawImage(this, (10 + (i * 25)), 10, (hero.w / 3), (hero.h / 2))
		}
	}
}

Screen.prototype.drawBackground = function (level) {
	let ctx 			= this.ctx, 
		route 			= window.location.href, 
		arrBackgrounds 	= ['img/stage/stage1.jpg', 'img/stage/stage2.jpg', 'img/stage/stage3.jpg', 
							'img/stage/stage4.jpg', 'img/stage/stage5.jpg', 'img/stage/stage6.jpg',
							'img/stage/stage7.jpg', 'img/stage/stage8.jpg', 'img/stage/stage9.jpg'], 
		maxStages = 9

	if (level > maxStages) level = 1
	let imageNumber = level - 1
	
	var img = new Image()
	img.src = route + arrBackgrounds[imageNumber]
	img.onload = function () {
		ctx.drawImage(img, 0, 0)
	}
}

Screen.prototype.drawBadass = function(badass) {
	let img = new Image(), 
		ctx = this.ctx

	img.src = badass.getImg()
	img.onload = function () {
		let random = new Handler().getRandom(10, 30)
		ctx.drawImage(this, badass.x, badass.y, badass.w, badass.h)
	}
}

Screen.prototype.centerText = function(text, score, level) {
	let context = this.ctx

	context.font = "28px arial"
  	//context.fillText(`${text}`, 200, 200)
  	context.fillText(`${score}`, 200, 300)
  	context.fillText(`${level}`, 200, 400)
};

Screen.prototype.gameOver = function(score, level) {
	let context = this.ctx

	context.font = "28px arial"
  	context.fillText(`Juego finalizado`, 200, 200)
  	context.fillText(`Tú puntaje: ${score}`, 200, 300)
  	context.fillText(`Tú nivel: ${level}`, 200, 400)
};
