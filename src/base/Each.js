
const Stream = require('./Stream');
const Guard = require('./Guard');

/**
*
* ```javascript
*  // should log:
*  // element 0 is 1
*  // element 1 is 2
*  // element 2 is 3
*  Count()
*    .pipe(Slice, 1, 4)
*    .pipe(Each, (val, i) => console.log(`element ${i} is ${val}`))
*    .pipe(Drain)
*    .read();
* ```
* Each is a stream constructor wraps a source stream, and when read is called it reads the entire stream and throws it away.
* Useful for streams with side-effects.
* @name Each
* @param {Stream} source - the source stream to drain
* @param {function} each - a function to get called for each value
* @returns {Stream}
* @memberof streamlike
*/
function Each(source, each) {
	const self = this instanceof Each ? this : Object.create(Each.prototype);

	self._source = source;
	self._each = each;
	self._index = 0;

	return Guard(self);
}

Each.prototype = Object.create(Stream.prototype);

Each.prototype.open = function open() { };

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
