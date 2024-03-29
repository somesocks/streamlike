
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
* `ToArray` converts a stream into an array
* @name ToArray
* @param {Stream} source - the source stream
* @returns {Stream}
* @memberof streamlike
*/
function ToArray(source) {
	const self = this instanceof ToArray ? this : Object.create(ToArray.prototype);

	self._source = source;

	return Guard(self);
}

ToArray.prototype = Object.create(Stream.prototype);

ToArray.prototype.open = function open() { };

ToArray.prototype.close = function close() {
	if (this._source) {
		this._source.close();
		this._source = null;
	}
};

ToArray.prototype.read = function read(recycle) {
	let val, res, loop;

	if (Array.isArray(recycle)) {
		res = recycle;
		if (res.length > 0) { res.length = 0; }
	} else {
		res = [];
	}

	loop = (val !== Stream.END);

	while (loop) {
		val = this._source.read(val);
		if (val !== Stream.END) {
			res.push(val)
		} else {
			loop = false;
		}
	}

	res = res.length === 0 ? Stream.END : res;

	if (res === Stream.END) { this.close(); }

	return res;
}

module.exports = ToArray;
