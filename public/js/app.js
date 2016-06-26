'use strict'

var display, input, frames, speedFrame, 
	lvFrame, alSprite, heroData, ciSprite, 
	aliens, dir, hero, bullets, cities;

function main () {
	//	Game canvas
	display 	= new Screen(800, 600)
	//display 	= new Screen(window.innerWidth, window.innerHeight)
	input 		= new InputHandler()
	heroData 	= new Hero()
	display.drawBackground(1)

	init()
	run()
}
function init () {
	console.log('Init')
	//	Start settings
	frames 		= 0
	speedFrame 	= 0
	lvFrame 	= 60

	bullets = []

	dir = 1

	hero = {
		sprite: heroData, 
		x: (display.width - heroData.w) / 2,
		y: display.height - (30 + heroData.h)
	}
}
function run () {
	console.log('Run')
	let loop = function () {
		update()
		render()

		window.requestAnimationFrame(loop, display.canvas)
	}
	window.requestAnimationFrame(loop, display.canvas)
}
function update () {
	console.log('Update')
	//frames++

	// update tank position depending on pressed keys
	if (input.isDown(37)) { // Left
		hero.x -= 4;
		console.log('left')
	}
	if (input.isDown(39)) { // Right
		hero.x += 4;
		console.log('right')
	}

	// append new bullet to the bullet array if spacebar is
	// pressed
	if (input.isPressed(32)) {
		let buletColor = "#fff"
		bullets.push(new Bullet(hero.x + 10, hero.y, -8, 2, 6, buletColor));
	}

	//	Keep the hero inside of the canvas
	hero.x = Math.max(Math.min(hero.x, display.width - (30 + heroData.w)), 30)
}
function render () {
	console.log('Render')
	//	Clear game canvas
	//display.clear()
	display.drawBackground(1)

	//	Draw badass

	//	Bullets
	display.ctx.save()
	bullets.some(function (element, index, arr) {
		display.drawBullet(element);
	})

	display.ctx.restore()

	//	Draw hero sprite
	display.drawSprite(hero.sprite, hero.x, hero.y)
}

document.addEventListener('DOMContentLoaded', function () {
	main()
})