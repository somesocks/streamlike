
const Stream = require('./Stream');
const Guard = require('./Guard');

function FromArray(array) {
	const self = this instanceof FromArray ? this : Object.create(FromArray.prototype);

	self._array = array;
	self._index = 0;

	return Guard(self);
}

FromArray.prototype = Object.create(FromArray.prototype);

FromArray.prototype.open = function open() {
};

FromArray.prototype.close = function close() {
	this._array = null;
	this._index = null;
};

FromArray.prototype.read = function read(recycle) {
	if (this._index < this._array.length) {
		const res = this._array[this._index];
		this._index++;
		return res;
	} else {
		return Stream.END;
	}
}

module.exports = FromArray;
