'use strict'

var Handler = function () {

}

Handler.prototype.getRandom = function(min, max) {
	return Math.round(Math.random() * (max - min) + min)
};

Handler.prototype.AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh) {
	return ax < bx+bw && bx < ax+aw && ay < by+bh && by < ay+ah;
};
