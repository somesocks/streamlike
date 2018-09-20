
const Stream = require('./Stream');
const Guard = require('./Guard');

/**
*
* ```javascript
*  // should log:
*  // element 0 is 1
*  // element 1 is 2
*  // element 2 is 3
*  Expand((i) => i)
*    .pipe(Slice, 1, 4)
*    .pipe(Each, (val, i) => console.log(`element ${i} is ${val}`))
*    .pipe(Drain)
*    .read();
* ```
* Expand is useful when you need custom code to expand something into a stream.
* Keep in mind you'll need to return Stream.END at some point
* @name Expand
* @param {function} expander - a function to get called for each value
* @returns {Stream}
* @memberof streamlike
*/
function Expand(expander) {
	const self = this instanceof Expand ? this : Object.create(Expand.prototype);

	self._expander = expander;
	self._index = 0;

	return Guard(self);
}

Expand.prototype = Object.create(Stream.prototype);

Expand.prototype.open = function open() { };

Expand.prototype.close = function close() {
	this._expander = null;
	this._index = null;
};

Expand.prototype.read = function read(recycle) {
	const res = this._expander(this._index, recycle);
	this._index++;
	return res;
}

module.exports = Expand;
