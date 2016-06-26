'use strict'

var display, input, frames, speedFrame, 
	lvFrame, alSprite, taSprite, ciSprite, 
	aliens, dir, hero, bullets, cities;

function main () {
	console.log('Main')
	//	Game canvas
	display = new Screen(504, 600)
	display.drawBackground(1)
}
function init () {
	console.log('Init')
	//	Start settings
	frames = 0
	speedFrame = 0
	lvFrame = 60
}
function run () {
	console.log('Run')
	let loop = function () {
		update()
		render()

		window.requestAnimationFrame(loop, display.canvas)
	}
}
function update () {
	console.log('Update')
}
function render () {
	console.log('Render')
	//	Clear game canvas
	display.clear()

	//	Draw badass

	display.ctx.restore()
}

document.addEventListener('DOMContentLoaded', function () {
	main()
})