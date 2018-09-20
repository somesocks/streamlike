
const Stream = require('./Stream');
const Guard = require('./Guard');

const Assert = require('./Assert');

const isBlock = function (val) { return Array.isArray(val); };

/**
*
* ```javascript
*  // res is [1, 2, 3, 4, 5, 6]:
*  let res = From([ 1, 2, 3 ], [4, 5, 6])
*    .pipe(FromBlocks)
*    .pipe(ToArray)
*    .read();
* ```
* FromBlocks 'flattens' a stream of arrays into a stream of elements.
* @name FromBlocks
* @param {Stream} source - a stream of arrays
* @returns {Stream}
* @memberof streamlike
*/
function FromBlocks(source) {
	const self = this instanceof FromBlocks ? this : Object.create(FromBlocks.prototype);

	source = Assert(source, isBlock);
	self._source = source;

	self._block = undefined;
	self._index = undefined;

	return Guard(self);
}

FromBlocks.prototype = Object.create(Stream.prototype);

//eslint-disable-next-line no-empty-function
FromBlocks.prototype.open = function open() { };

FromBlocks.prototype.close = function close() {
	this._block = null;
	this._index = null;

	this._source.close();
	this._source = null;
};

//eslint-disable-next-line no-unused-vars
FromBlocks.prototype.read = function read(recycle) {
	if (!this._block || this._index >= this._block.length) {
		this._block = this._source.read(this._block);
		this._index = 0;
	}

	if (this._block === Stream.END) { return Stream.END; }

	const val = this._block[this._index];
	this._index++;

	return val;
}

module.exports = FromBlocks;
