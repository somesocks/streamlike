
const Stream = require('./Stream');
const Guard = require('./Guard');

/**
*
* ```javascript
*  // res is [1, 2, 3]:
*  let res = From(1, 2, 3)
*    .pipe(ToArray)
*    .read();
* ```
* `From` builds a stream from its arguments.
* @name From
* @param {...*} values - values to return in the stream, in order
* @returns {Stream}
* @memberof streamlike
*/
function From(...values) {
	const self = this instanceof From ? this : Object.create(From.prototype);

	self._array = values;
	self._index = 0;

	return Guard(self);
}

From.prototype = Object.create(Stream.prototype);

From.prototype.open = function open() { };

From.prototype.close = function close() {
	this._array = null;
	this._index = null;
};

From.prototype.read = function read(recycle) {
	if (this._index < this._array.length) {
		const res = this._array[this._index];
		this._index++;
		return res;
	}

	return Stream.END;
}

module.exports = From;
