'use strict'

var display, input, frames, speedFrame, 
	lvFrame, alSprite, heroData, ciSprite, 
	badass, dir, hero, bullets, cities;

function main () {
	//	Game canvas
	display 	= new Screen(800, 600)
	//display 	= new Screen(window.innerWidth, window.innerHeight)
	input 		= new InputHandler()
	heroData 	= new Hero()
	display.drawBackground(heroData.getLevel())

	hero = {
		sprite: heroData, 
		x: (display.width - heroData.w) / 2,
		y: display.height - (30 + heroData.h)
	}

	init()
	run()
}
function init () {
	//	Start settings
	frames 		= 0
	speedFrame 	= 0
	lvFrame 	= 20

	bullets = []
	badass 	= []

	console.log(`Nivel ${heroData.getLevel()}`)
	let badSize = new Handler().getRandom(10, 21)
	console.log(badSize)
	let i = 0
	for (i; i <= badSize; i++) {
		badass.push(new Badass(heroData.getLevel()))
	}

	dir = 1
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
	frames++

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

	// update the badass at the current movement frequence
	if (frames % lvFrame === 0) {
		//spFrame = (spFrame + 1) % 2;
		let _max = 0, _min = display.width
		// iterate through badass and update postition
		for (var i = 0, len = badass.length; i < len; i++) {
			var a = badass[i];
			a.x += new Handler().getRandom(20, 30) * dir;
			// find min/max values of all badass for direction
			// change test
			_max = Math.max(_max, a.x + a.w);
			_min = Math.min(_min, a.x);
		}
		// check if badass should move down and change direction
		if (_max > display.width - 30 || _min < 30) {
			// mirror direction and update position
			dir *= -1;
			for (var i = 0, len = badass.length; i < len; i++) {
				badass[i].x += new Handler().getRandom(20, 30) * dir;
				badass[i].y += new Handler().getRandom(0, 30);
			}
		}
	}

	// update the badass at the current movement frequence
	if (frames % lvFrame === 0) {
		//spFrame = (spFrame + 1) % 2;
		let _max = 0, _min = display.width
		// iterate through badass and update postition
		badass.some(function (element, index, arr) {
			var a = element;
			a.x += new Handler().getRandom(20, 30) * dir;
			// find min/max values of all badass for direction
			// change test
			_max = Math.max(_max, a.x + a.w);
			_min = Math.min(_min, a.x);
		})
		// check if badass should move down and change direction
		if (_max > display.width - 30 || _min < 30) {
			// mirror direction and update position
			dir *= -1;
			badass.some(function (ele, ind, ar) {
				ele.x += new Handler().getRandom(20, 30) * dir;
				ele.y += new Handler().getRandom(0, 30);
			})
		}
	}

	//	Keep the hero inside of the canvas
	hero.x = Math.max(Math.min(hero.x, display.width - (10 + heroData.w)), 10)
	hero.y = Math.max(Math.min(hero.y, display.height - (10 + heroData.h)), 10)
}
function render () {
	//	Clear game canvas
	//display.clear()
	display.drawBackground(heroData.getLevel())

	//	Level and score text
	display.drawText(`Nivel: ${heroData.getLevel()}`, (display.width - 250))
	display.drawText(`Puntaje: ${heroData.getScore()}`, (display.width - 150))

	//	Hero lifes
	display.drawLifes(heroData.getLife())

	//	Draw badass
	badass.some(function (element, index, arr) {
		display.drawBadass(element)
		//console.log(element)
	})

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
