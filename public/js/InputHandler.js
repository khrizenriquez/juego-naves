'use strict'

/**
 * InputHandler class, handle and log pressed keys
 */
var InputHandler = function () {
	this.down = {};
	this.pressed = {};
	// capture key presses
	var _this = this;
	document.addEventListener("keydown", function(evt) {
		_this.down[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete _this.down[evt.keyCode];
		delete _this.pressed[evt.keyCode];
	});
};

/**
 * Returns whether a key is pressod down
 * @param  {number}  code the keycode to check
 * @return {bool}         the result from check
 */
InputHandler.prototype.isDown = function(code) {
	return this.down[code];
};

/**
 * Return wheter a key has been pressed
 * @param  {number}  code the keycode to check
 * @return {bool}         the result from check
 */
InputHandler.prototype.isPressed = function(code) {
	// if key is registred as pressed return false else if
	// key down for first time return true else return false
	if (this.pressed[code]) {
		return false;
	} else if (this.down[code]) {
		return this.pressed[code] = true;
	}
	return false;
};