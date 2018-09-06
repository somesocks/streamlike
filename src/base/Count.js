
const Stream = require('./Stream');
const Guard = require('./Guard');

function Count(start) {
	const self = this instanceof Count ? this : Object.create(Count.prototype);

	self._index = start || 0;

	return Guard(self);
}

Count.prototype = Object.create(Count.prototype);

Count.prototype.open = function open() {
};

Count.prototype.close = function close() {
};

Count.prototype.read = function read(recycle) {
	const val = this._index;
	this._index++;

	return val;
}

module.exports = Count;
