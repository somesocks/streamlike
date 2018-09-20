
const Stream = require('./Stream');
const Guard = require('./Guard');

/**
*
* ```javascript
*  // res is [1, 2, 3]:
*  let res = Count()
*    .pipe(Slice, 0, 4)
*    .pipe(Map, (val, i) => val + 1)
*    .pipe(ToArray)
*    .read();
* ```
* `Map` transforms each element in a stream.
* @name Map
* @param {Stream} source - a source stream
* @param {function} map - a map function
* @returns {Stream}
* @memberof streamlike
*/
function Map(source, mapper) {
	const self = this instanceof Map ? this : Object.create(Map.prototype);

	self._source = source;
	self._map = mapper;
	self._index = 0;

	return Guard(self);
}

Map.prototype = Object.create(Stream.prototype);

Map.prototype.open = function open() { };

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
