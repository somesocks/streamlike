
const Stream = require('./Stream');
const Guard = require('./Guard');

function ToBlocks(source, size, padding) {
	const self = this instanceof ToBlocks ? this : Object.create(ToBlocks.prototype);

	self._source = source;
	self._size = size || 1;
	self._padding = padding;

	return Guard(self);
}

ToBlocks.prototype = Object.create(Stream.prototype);

ToBlocks.prototype.open = function open() { };

ToBlocks.prototype.close = function close() {
	this._size = null;
	this._padding = null;

	this._source.close();
	this._source = null;
};

ToBlocks.prototype.read = function read(recycle) {
	let val, res;

	val = this._source.read(val);
	if (val === Stream.END) { return Stream.END; }

	if (Array.isArray(recycle)) {
		res = recycle;
		if (res.length !== this._size) { res.length = this._size; }
	} else {
		res = Array(this._size);
	}

	res[0] = val;

	for (let i = 1; i < this._size; i++) {
		val = (val !== Stream.END) ? this._source.read(val) : val;
		res[i] = (val !== Stream.END) ? val : this._padding;
	}

	return res;
}

module.exports = ToBlocks;
