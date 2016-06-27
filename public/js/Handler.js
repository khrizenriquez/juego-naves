'use strict'

var Handler = function () {
	
}

Handler.prototype.getRandom = function(min, max) {
	return Math.round(Math.random() * (max - min) + min)
};
