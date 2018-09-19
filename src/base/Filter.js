
const Stream = require('./Stream');
const Guard = require('./Guard');

function Filter(source, filter) {
	const self = this instanceof Filter ? this : Object.create(Filter.prototype);

	self._source = source;
	self._filter = filter;
	self._index = 0;

	return Guard(self);
}

Filter.prototype = Object.create(Stream.prototype);

Filter.prototype.open = function open() { };

Filter.prototype.close = function close() {
	this._filter = null;
	this._index = null;

	this._source.close();
	this._source = null;
};

Filter.prototype.read = function read(recycle) {

	let val, allow;

	val = this._source.read(recycle);

	allow = (val === Stream.END) || this._filter(val, this._index);

	while (!allow) {
		this._index++;
		val = this._source.read(val);
		allow = (val === Stream.END) || this._filter(val, this._index);
	}

	return val;
}

module.exports = Filter;
