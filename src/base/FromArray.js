
const Stream = require('./Stream');
const Guard = require('./Guard');

/**
*
* ```javascript
*  // res is [1, 2, 3]:
*  let res = FromArray([ 1, 2, 3 ])
*    .pipe(ToArray)
*    .read();
* ```
* FromArray builds a stream from its arguments.
* @name FromArray
* @param {array} values - values to return in the stream, in order
* @returns {Stream}
* @memberof streamlike
*/
function FromArray(array) {
	const self = this instanceof FromArray ? this : Object.create(FromArray.prototype);

	self._array = array;
	self._index = 0;

	return Guard(self);
}

FromArray.prototype = Object.create(Stream.prototype);

FromArray.prototype.open = function open() { };

FromArray.prototype.close = function close() {
	this._array = null;
	this._index = null;
};

FromArray.prototype.read = function read(recycle) {
	if (this._index < this._array.length) {
		const res = this._array[this._index];
		this._index++;
		return res;
	}

	return Stream.END;
}

module.exports = FromArray;
