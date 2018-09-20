
const Stream = require('./Stream');
const Guard = require('./Guard');

/**
*
* ```javascript
* // array of [ 0, 1, 2, 3 ]
* const integers = Count()
*    .pipe(Slice, 0, 4)
*    .pipe(ToArray)
*    .read();
* ```
* Count is a stream constructor that builds a stream that counts integers upward
* Count never terminates, so make sure to add a terminating stream like a Slice somewhere after it.
* @name Count
* @param {number} start - the number to start counting from
* @returns {Stream}
* @memberof streamlike
*/
function Count(start) {
	const self = this instanceof Count ? this : Object.create(Count.prototype);

	self._index = start || 0;

	return Guard(self);
}

Count.prototype = Object.create(Stream.prototype);

Count.prototype.open = function open() { };

Count.prototype.close = function close() { };

Count.prototype.read = function read(recycle) {
	const val = this._index;
	this._index++;

	return val;
}

module.exports = Count;
