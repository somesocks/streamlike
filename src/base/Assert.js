
const Stream = require('./Stream');
const Guard = require('./Guard');

const DEFAULT_ASSERT = function (val, index) { return true; };

const DEFAULT_ERROR = function (val, index) { return new Error(`Assert: val ${val} at index ${index} failed assertion`); };

/**
*
* ```javascript
* // works
* const integers = From(1, 2, 3, 4)
*    .pipe(Slice, 0, 10)
*    .pipe(Assert, (val, i) => Number.isInteger(val))
*    .pipe(ToArray)
*    .read();
*
* // throws error
* const integers = From(1, 2, 3, "4")
*    .pipe(Assert, (val, i) => Number.isInteger(val))
*    .pipe(ToArray)
*    .read();
* ```
* `Assert` is a stream constructor that builds a stream to run an assertion against every value in the stream
* @name Assert
* @param {Stream} source - a source stream
* @param {function} assert - an assertion function
* @param {function} error - an error builder function
* @returns {Stream}
* @memberof streamlike
*/
function Assert(source, assert, error) {
	const self = this instanceof Assert ? this : Object.create(Assert.prototype);

	self._source = source;
	self._assert = assert || DEFAULT_ASSERT;
	self._error = error || DEFAULT_ERROR;
	self._index = 0;

	return Guard(self);
}

Assert.prototype = Object.create(Stream.prototype);

Assert.prototype.open = function open() { };

Assert.prototype.close = function close() {
	this._assert = null;
	this._index = null;

	this._source.close();
	this._source = null;
};

Assert.prototype.read = function read(recycle) {
	const val = this._source.read(recycle);

	if (val === Stream.END) { return val; }

	if (!this._assert(val, this._index)) {
		throw this._error(val, this._index);
	}

	this._index++;

	return val;
}

module.exports = Assert;
