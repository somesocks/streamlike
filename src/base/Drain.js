
const Stream = require('./Stream');
const Guard = require('./Guard');

/**
*
* ```javascript
*  // returns Stream.END
*  Count()
*    .pipe(Slice, 0, 4)
*    .pipe(Drain)
*    .read();
* ```
* `Drain` is a stream constructor wraps a source stream, and when read is called it reads the entire stream and throws it away.
* Useful for streams with side-effects.
* @name Drain
* @param {Stream} source - the source stream to drain
* @returns {Stream}
* @memberof streamlike
*/
function Drain(source) {
	const self = this instanceof Drain ? this : Object.create(Drain.prototype);

	self._source = source;

	return Guard(self);
}

Drain.prototype = Object.create(Stream.prototype);

Drain.prototype.open = function open() { };

Drain.prototype.close = function close() {
	this._source.close();
	this._source = null;
};

Drain.prototype.read = function read(recycle) {
	let val, loop;

	val = recycle;
	loop = (val !== Stream.END);
	while (loop) {
		val = this._source.read(val);
		loop = (val !== Stream.END);
	}

	return Stream.END;
}

module.exports = Drain;
