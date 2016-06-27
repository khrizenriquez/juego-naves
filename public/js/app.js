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
	display.drawBackground(heroData.level)

	init()
	run()
}
function init () {
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
	let loop = function () {
		update()
		render()

		window.requestAnimationFrame(loop, display.canvas)
	}
	window.requestAnimationFrame(loop, display.canvas)
}
function update () {
	//frames++

	// update tank position depending on pressed keys
	if (input.isDown(37)) { // Left
		hero.x -= 4;
	}
	if (input.isDown(38)) { // Up
		hero.y -= 4;
	}
	if (input.isDown(39)) { // Right
		hero.x += 4;
	}
	if (input.isDown(40)) { // Down
		hero.y += 4;
	}

	// append new bullet to the bullet array if spacebar is
	// pressed
	if (input.isPressed(32)) {
		let buletColor = "#f1c40f"

		bullets.push(new Bullet(hero.x + (hero.sprite.w / 3), hero.y, -8, 6, 6, buletColor));
	}

	// update all bullets position and checks
	//let lenBullets = bullets.length;
	bullets.some(function (element, index, arr) {
		let b = element
		b.update()

		// remove bullets outside of the canvas
		if (b.y + b.height < 0 || b.y > display.height) {
			bullets.splice(index, 1)
			index--
		}
	})

	//	Keep the hero inside of the canvas
	hero.x = Math.max(Math.min(hero.x, display.width - (10 + heroData.w)), 10)
	hero.y = Math.max(Math.min(hero.y, display.height - (10 + heroData.h)), 10)
}
function render () {
	//	Clear game canvas
	//display.clear()
	display.drawBackground(heroData.level)

	display.drawScore(heroData.score, display.width)
	display.drawLevel(heroData.level, display.width)

	display.drawLifes(heroData.lifes)

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