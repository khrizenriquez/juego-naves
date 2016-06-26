'use strict'

var display, input, frames, speedFrame, 
	lvFrame, alSprite, heroData, ciSprite, 
	aliens, dir, hero, bullets, cities;

function main () {
	//	Game canvas
	display 	= new Screen(504, 600)
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
	}
	window.requestAnimationFrame(loop, display.canvas)
}
function update () {
	console.log('Update')

	//	Keep the hero inside of the canvas
	hero.x = Math.max(Math.min(hero.x, display.width - (30 + heroData.w)), 30)
}
function render () {
	console.log('Render')
	//	Clear game canvas
	display.clear()

	//	Draw badass

	display.ctx.restore()

	//	Draw hero sprite
	console.log(hero.sprite)
	display.drawSprite(hero.sprite, hero.x, hero.y)
}

document.addEventListener('DOMContentLoaded', function () {
	main()
})