
const Stream = require('./Stream');
const Guard = require('./Guard');

function Expand(expander) {
	const self = this instanceof Expand ? this : Object.create(Expand.prototype);

	self._expander = expander;
	self._index = 0;

	return Guard(self);
}

Expand.prototype = Object.create(Stream.prototype);

Expand.prototype.open = function open() { };

Expand.prototype.close = function close() {
	this._expander = null;
	this._index = null;
};

Expand.prototype.read = function read(recycle) {
	const res = this._expander(this._index, recycle);
	this._index++;
	return res;
}

module.exports = Expand;
