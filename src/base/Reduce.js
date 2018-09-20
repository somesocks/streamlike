
const Stream = require('./Stream');
const Guard = require('./Guard');

/**
*
* ```javascript
*  // res is 6:
*  let res = Count()
*    .pipe(Slice, 0, 4)
*    .pipe(Reduce, (state, val, i) => state + val)
*    .read();
* ```
* Reduce 'reduces' a stream of elements to a single result
* @name Reduce
* @param {Stream} source - a source stream
* @param {function} reduce - a reduce function
* @param {*} state - the initial value of the state
* @returns {Stream}
* @memberof streamlike
*/
function Reduce(source, reducer, state) {
	const self = this instanceof Reduce ? this : Object.create(Reduce.prototype);

	self._source = source;
	self._reducer = reducer;
	self._index = 0;
	self._state = state;

	return Guard(self);
}

Reduce.prototype = Object.create(Stream.prototype);

Reduce.prototype.open = function open() { };

Reduce.prototype.close = function close() {
	this._reducer = null;
	this._index = null;
	this._state = null;

	if (this._source) {
		this._source.close();
		this._source = null;
	}
};

Reduce.prototype.read = function read(recycle) {
	if (!this._source) { return Stream.END; }

	let val = this._source.read();

	while (val !== Stream.END) {
		this._state = this._reducer(this._state, val, this._index);
		this._index++;
		val = this._source.read(val);
	}

	const res = this._state;
	this.close();
	return res;
}

module.exports = Reduce;
