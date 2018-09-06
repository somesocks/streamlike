
const Stream = require('./Stream');
const Guard = require('./Guard');

function Reduce(source, reducer, state) {
	const self = this instanceof Reduce ? this : Object.create(Reduce.prototype);

	self._source = source;
	self._reducer = reducer;
	self._index = 0;
	self._state = state;

	return Guard(self);
}

Reduce.prototype = Object.create(Reduce.prototype);

Reduce.prototype.open = function open() {
	this._source.open();
};

Reduce.prototype.close = function close() {
	this._reducer = null;
	this._index = null;
	this._state = null;

	this._source.close();
	this._source = null;
};

Reduce.prototype.read = function read(recycle) {
	let val = this._source.read();

	while (val !== Stream.END) {
		this._state = this._reducer(this._state, val, this._index);
		this._index++;
		val = this._source.read(val);
	}

	const res = this._state;
	this.close();
	return res;
}

module.exports = Reduce;
