
const Stream = require('./Stream');
const Guard = require('./Guard');

/**
*
* ```javascript
*  // res is [1, 2, 3, 4, 5, 6]:
*  let res = Splice(From(1, 2, 3), From(4, 5, 6))
*    .pipe(ToArray)
*    .read();
* ```
* Splice 'splices' several streams together, concatenating them into a single stream
* @name Splice
* @param {...Streams} sources - the source streams
* @returns {Stream}
* @memberof streamlike
*/
function Splice(...streams) {
	const self = this instanceof Splice ? this : Object.create(Splice.prototype);

	self._streams = streams;
	self._index = 0;

	return Guard(self);
}

Splice.prototype = Object.create(Stream.prototype);

Splice.prototype.open = function open() { };

Splice.prototype.close = function close() {
	if (!this._streams) { return; }

	for (let i = 0; i< this._streams.length; i++) {
		const stream = this._streams[i];
		if (stream) { stream.close(); }
	}

	this._index = 0;
	this._streams = null;
};

Splice.prototype.read = function read(recycle) {
	while (true) {
		if (this._index >= this._streams.length) {
			this.close();
			return Stream.END;
		}

		const stream = this._streams[this._index];
		const val = stream.read(recycle);

		if (val === Stream.END) {
			stream.close();
			this._index++;
		} else {
			return val;
		}

	}
}

module.exports = Splice;
