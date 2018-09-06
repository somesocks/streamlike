
const Stream = require('./Stream');
const Guard = require('./Guard');

function Slice(source, start, end) {
	const self = this instanceof Slice ? this : Object.create(Slice.prototype);

	self._source = source;
	self._start = start || 0;
	self._end = end || 9007199254740991; // max safe int
	self._index = 0;

	return Guard(self);
}

Slice.prototype = Object.create(Slice.prototype);

Slice.prototype.open = function open() {
};

Slice.prototype.close = function close() {
	this._start = null;
	this._end = null;
	this._index = null;

	this._source.close();
	this._source = null;
};

Slice.prototype.read = function read(recycle) {
	let val, loop;

	val = recycle;
	loop = (val !== Stream.END) && this._index < this._start;

	while(loop) {
		val = this._source.read(val);
		this._index++;
		loop = (val !== Stream.END) && this._index < this._start;
	}

	if (this._index < this._end) {
		val = this._source.read(val);
		this._index++;
		return val;
	} else {
		return Stream.END;
	}
}

module.exports = Slice;
