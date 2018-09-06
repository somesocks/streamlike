
const Stream = require('./Stream');
const Guard = require('./Guard');

function Drain(source) {
	const self = this instanceof Drain ? this : Object.create(Drain.prototype);

	self._source = source;

	return Guard(self);
}

Drain.prototype = Object.create(Drain.prototype);

Drain.prototype.open = function open() {
};

Drain.prototype.close = function close() {
	this._source.close();
	this._source = null;
};

Drain.prototype.read = function read(recycle) {
	let val, loop;

	val = recycle;
	loop = (val !== Stream.END);
	while (loop) {
		val = this._source.read(val);
		loop = (val !== Stream.END);
	}

	return Stream.END;
}

module.exports = Drain;
