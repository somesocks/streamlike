
const Stream = require('./Stream');
const Guard = require('./Guard');

function Each(source, each) {
	const self = this instanceof Each ? this : Object.create(Each.prototype);

	self._source = source;
	self._each = each;
	self._index = 0;

	return Guard(self);
}

Each.prototype = Object.create(Each.prototype);

Each.prototype.open = function open() {
};

Each.prototype.close = function close() {
	this._each = null;
	this._index = null;

	this._source.close();
	this._source = null;
};

Each.prototype.read = function read(recycle) {
	const val = this._source.read(recycle);

	if (val !== Stream.END) {
		this._each(val, this._index);
		this._index++;
	}

	return val;
}

module.exports = Each;
