

function Stream () {
	return this;
}

Stream.prototype.open = function open() { };

Stream.prototype.close = function close() { };

Stream.prototype.read = function read(recycle) { };

Stream.prototype.pipe = function pipe(streamConstructor, ...args) {
	return streamConstructor(this, ...args);
};

// Stream.END should be a locally-unique object
Stream.END = {};

module.exports = Stream;
