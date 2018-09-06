
const Stream = require('./Stream');
const Guard = require('./Guard');

function Map(source, mapper) {
	const self = this instanceof Map ? this : Object.create(Map.prototype);

	self._source = source;
	self._map = mapper;
	self._index = 0;

	return Guard(self);
}

Map.prototype = Object.create(Map.prototype);

Map.prototype.open = function open() {
};

Map.prototype.close = function close() {
	this._map = null;
	this._index = null;

	this._source.close();
	this._source = null;
};

Map.prototype.read = function read(recycle) {
	let val = this._source.read(recycle);

	if (val !== Stream.END) {
		val = this._map(val, this._index);
		this._index++;
	}

	return val;
}

module.exports = Map;
