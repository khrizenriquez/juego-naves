'use strict'

var display, input, frames, speedFrame, 
	lvFrame, alSprite, heroData, ciSprite, 
	badass, dir, hero, bullets, cities, animation;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame

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
}

var initFunctions = function () {
	//	Start settings
	frames 		= 0
	speedFrame 	= 0
	lvFrame 	= 20

	bullets = []
	badass 	= []

	let badSize = new Handler().getRandom(10, 21)

	let i = 0
	for (i; i <= badSize; i++) badass.push(new Badass(heroData.getLevel()))

	dir = 1

	//	Start the loop game
	run()
}

function init () {
	window.cancelAnimationFrame(animation)
	setTimeout(function () {
		display.centerText(`Bienvenido ${heroData.userName}`, 
						`Puntaje: ${heroData.getScore()}`, 
						`Nivel: ${heroData.getLevel()}`)

		setTimeout(function () {
			initFunctions()
			infinityLoop()
		}, 3000)
	}, 100)
}

function run () {
	let loop = function () {
		update()
		render()

		animation = window.requestAnimationFrame(loop, display.canvas)
	}
	animation = window.requestAnimationFrame(loop, display.canvas)
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

		// check if bullet hit any badass
		for (var j = 0, len2 = badass.length; j < len2; j++) {
			var a = badass[j];
			if (new Handler().AABBIntersect(b.x, b.y, b.width, b.height, a.x, a.y, a.w, a.h)) {
				let remaining = (a.getLife() - heroData.getPower())
				if (remaining <= 0) {
					badass.splice(j, 1)
					j--
					len2--
					bullets.splice(i, 1)
					i--
					len--
					//	Increase hero score
					heroData.setScore(heroData.getScore() + 
									(heroData.getLevel() * 5))
				} else {
					a.setLife(remaining)
				}
				
				// increase the movement frequence of the badass
				// when there are less of them
				/*switch (len2) {
					case 30: {
						this.lvFrame = 40;
						break;
					}
					case 10: {
						this.lvFrame = 20;
						break;
					}
					case 5: {
						this.lvFrame = 15;
						break;
					}
					case 1: {
						this.lvFrame = 6;
						break;
					}
				}*/

				//break
			}
		}
	})

	// update the badass at the current movement frequence
	if (frames % lvFrame === 0) {
		//spFrame = (spFrame + 1) % 2;
		let _max = 0, 
			_min = display.width, 
			_hMax = display.height
		// iterate through badass and update postition
		badass.some(function (element, index, arr) {
			var a = element
			a.x += new Handler().getRandom(20, 30) * dir
			// find min/max values of all badass for direction
			// change test
			_max = Math.max(_max, a.x + a.w)
			_min = Math.min(_min, a.x)
		})
		// check if badass should move down and change direction
		if (_max > display.width - 30 || _min < 30) {
			// mirror direction and update position
			dir *= -1
			badass.some(function (ele, ind, ar) {
				ele.x += new Handler().getRandom(20, 30) * dir
				ele.y += new Handler().getRandom(0, 30)

				if (ele.y >= (display.height - 50)) {
					ele.y = 10
				}
			})
		}
	}

	badass.some(function (element, index, arr) {

	})

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

	//	If the badass are eliminated, restart the badass array
	/*if (badass.length === 0) {
		window.cancelAnimationFrame(animation)
		setTimeout(function () {
			window.cancelAnimationFrame(animation)
			animation = null
			//console.log('Dentro de settimeout')
			//heroData.addLevel()
			//init()
			if (animation === null) {
				console.log('Es nulo :D')
				console.log(animation)
				//heroData.addLevel()
				//init()
			}
			return
		}, 1000)
		window.cancelAnimationFrame(animation)
		//init()
		return
	}*/

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

function infinityLoop () {
	let interval = setInterval(function () {
		try	{
			if (badass.length <= 0) {
				window.cancelAnimationFrame(animation)

				//	Adding hero level
				heroData.addLevel()
				init()

				clearInterval(interval)
			}
		} catch (exception) {

		}
	}, 1000)
}

document.addEventListener('DOMContentLoaded', function () {
	main()
	//infinityLoop()
})
