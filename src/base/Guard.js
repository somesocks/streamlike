
const Stream = require('./Stream');

function Guard(source) {
	const self = this instanceof Guard ? this : Object.create(Guard.prototype);

	self._source = source;
	self._open = false;
	self._closed = false;

	return self;
}

Guard.NO_OPEN_CLOSED = new Error('cannot open a closed stream');

Guard.NO_CLOSE_UNOPEN = new Error('cannot close an unopened stream');

Guard.prototype = Object.create(Stream.prototype);

Guard.prototype.open = function open() {
	if (this._closed) { throw Guard.NO_OPEN_CLOSED; }
	if (this._open) { return; }

	this._open = true;
	this._source.open();
};

Guard.prototype.close = function close() {
	if (!this._open) { return; }
	if (this._closed) { return; }

	this._closed = true;
	this._source.close();
	this._source = null;
};

Guard.prototype.read = function read(recycle) {
	if (this._closed) { return Stream.END; }
	if (!this._open) { this.open(); }

	try {
		const res = this._source.read(recycle);
		if (res === Stream.END) { this.close(); }
		return res;
	} catch (err) {
		this.close();
		throw err;
	}

}

module.exports = Guard;
