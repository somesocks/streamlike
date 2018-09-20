
const Stream = require('./Stream');
const Guard = require('./Guard');

/**
*
* ```javascript
*  // res is [ [1, 2, 3], [4, 5, 6] ]:
*  let res = From(1, 2, 3, 4, 5, 6)
*    .pipe(ToBlocks, 3)
*    .pipe(ToArray)
*    .read();
* ```
* `ToBlocks` converts a stream into a stream of 'blocks' (fixed-size arrays of the elements)
* @name ToBlocks
* @param {Stream} source - the source stream
* @param {number} size - the size of blocks to emit
* @param {*} padding - the padding for partial blocks
* @returns {Stream}
* @memberof streamlike
*/
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
